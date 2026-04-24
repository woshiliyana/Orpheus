#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from fnmatch import fnmatch
from pathlib import Path
from typing import Any

DEFAULT_FORBIDDEN = [
    ".env",
    ".env.*",
    "secrets/**",
    ".agent/**",
    ".claude/settings.local.json",
    "runs/**",
    "benchmark-results/**",
]
DEFAULT_CHECKS = [
    "./scripts/checks/run-required.sh",
]
FINAL_STAGES = {"merge_ready", "merged", "cleaned_up", "completed"}


def repo_root(cwd: str | None = None) -> Path:
    out = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], cwd=cwd, text=True)
    return Path(out.strip())


def brief_path(root: Path, explicit: str | None = None) -> Path:
    return Path(explicit) if explicit else root / ".agent" / "task-brief.json"


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def normalize_bool(value: str | bool) -> bool:
    if isinstance(value, bool):
        return value
    lowered = value.strip().lower()
    return lowered in {"1", "true", "yes", "y", "on"}


def normalize_path(path: str, root: Path) -> str:
    candidate = Path(path)
    if candidate.is_absolute():
        rel = candidate.resolve().relative_to(root.resolve())
        return rel.as_posix()
    return candidate.as_posix().lstrip("./")


def is_path_allowed(rel_path: str, allowed: list[str], forbidden: list[str]) -> tuple[bool, str | None]:
    normalized = rel_path.lstrip("./")
    for pattern in forbidden:
        if fnmatch(normalized, pattern):
            return False, f"path '{normalized}' matches forbidden pattern '{pattern}'"
    if normalized == ".agent/task-brief.json":
        return True, None
    if not allowed:
        return False, f"path '{normalized}' is outside task scope because allowedPaths is empty"
    for pattern in allowed:
        if fnmatch(normalized, pattern):
            return True, None
    return False, f"path '{normalized}' is outside allowedPaths"


def cmd_init(args: argparse.Namespace) -> int:
    root = repo_root()
    target = brief_path(root, args.output)
    data = {
        "taskId": args.task_id,
        "title": args.title or "",
        "branch": args.branch,
        "worktreePath": args.worktree_path,
        "stage": "plan",
        "status": "draft",
        "reviewStatus": "pending",
        "requiresUserAcceptance": normalize_bool(args.requires_user_acceptance),
        "userAcceptanceStatus": "pending" if normalize_bool(args.requires_user_acceptance) else "not_required",
        "liveSmokeRequired": normalize_bool(args.live_smoke_required),
        "liveSmokeStatus": "pending" if normalize_bool(args.live_smoke_required) else "not_required",
        "allowedPaths": args.allowed_path or [],
        "forbiddenPaths": (args.forbidden_path or []) + [item for item in DEFAULT_FORBIDDEN if item not in (args.forbidden_path or [])],
        "requiredChecks": args.required_check or DEFAULT_CHECKS,
        "notes": [],
    }
    save_json(target, data)
    return 0


def load_brief_or_fail(path: Path) -> dict[str, Any]:
    if not path.exists():
        print(f"Missing task brief: {path}", file=sys.stderr)
        raise SystemExit(2)
    return load_json(path)


def cmd_show_context(args: argparse.Namespace) -> int:
    root = repo_root()
    path = brief_path(root, args.path)
    if not path.exists():
        print("No active .agent/task-brief.json found.")
        return 0
    brief = load_json(path)
    allowed = ", ".join(brief.get("allowedPaths", [])) or "<none>"
    print(
        f"task={brief.get('taskId','')} branch={brief.get('branch','')} stage={brief.get('stage','')} "
        f"review={brief.get('reviewStatus','')} live_smoke={brief.get('liveSmokeStatus','')} "
        f"user_acceptance={brief.get('userAcceptanceStatus','')} allowed={allowed}"
    )
    return 0


def cmd_assert_paths(args: argparse.Namespace) -> int:
    root = repo_root()
    path = brief_path(root, args.path)
    if not path.exists():
        if args.require_brief:
            print("Missing .agent/task-brief.json. Initialize the lane before editing or committing.", file=sys.stderr)
            return 2
        return 0
    brief = load_json(path)
    allowed = brief.get("allowedPaths", [])
    forbidden = brief.get("forbiddenPaths", DEFAULT_FORBIDDEN)
    violations: list[str] = []
    for file_path in args.files:
        rel = normalize_path(file_path, root)
        ok, reason = is_path_allowed(rel, allowed, forbidden)
        if not ok and reason is not None:
            violations.append(reason)
    if violations:
        print("Task brief boundary violation:", file=sys.stderr)
        for violation in violations:
            print(f"- {violation}", file=sys.stderr)
        return 2
    return 0


def cmd_assert_push_ready(args: argparse.Namespace) -> int:
    root = repo_root()
    path = brief_path(root, args.path)
    if not path.exists():
        return 0
    brief = load_json(path)

    review = brief.get("reviewStatus", "pending")
    if review != "approved":
        print("Cannot push this lane yet: task brief plan has not been approved.", file=sys.stderr)
        return 2

    stage = brief.get("stage", "plan")
    if stage in {"plan", "review", "implementation"}:
        print(f"Cannot push this lane yet: current stage '{stage}' is too early.", file=sys.stderr)
        return 2

    if args.pushing_main:
        if brief.get("liveSmokeRequired", False) and brief.get("liveSmokeStatus") != "passed":
            print("Cannot push/merge to main: live smoke is required and has not passed.", file=sys.stderr)
            return 2
        if brief.get("requiresUserAcceptance", False) and brief.get("userAcceptanceStatus") != "accepted":
            print("Cannot push/merge to main: user acceptance is still pending.", file=sys.stderr)
            return 2
        if stage not in FINAL_STAGES:
            print(f"Cannot push/merge to main: lane stage '{stage}' is not merge-ready.", file=sys.stderr)
            return 2
    return 0


def cmd_assert_task_complete(args: argparse.Namespace) -> int:
    root = repo_root()
    path = brief_path(root, args.path)
    if not path.exists():
        return 0
    brief = load_json(path)

    if brief.get("reviewStatus", "pending") != "approved":
        print("Task cannot be marked complete: plan review is not approved.", file=sys.stderr)
        return 2

    if brief.get("liveSmokeRequired", False) and brief.get("liveSmokeStatus") != "passed":
        print("Task cannot be marked complete: required live smoke has not passed.", file=sys.stderr)
        return 2

    if brief.get("requiresUserAcceptance", False) and brief.get("userAcceptanceStatus") != "accepted":
        print("Task cannot be marked complete: this lane still requires user acceptance.", file=sys.stderr)
        return 2

    stage = brief.get("stage", "plan")
    if stage not in FINAL_STAGES:
        print(
            "Task cannot be marked complete: move the lane through debug, PR prep, and merge-ready before finishing.",
            file=sys.stderr,
        )
        return 2
    return 0


def cmd_set(args: argparse.Namespace) -> int:
    root = repo_root()
    path = brief_path(root, args.path)
    brief = load_brief_or_fail(path)
    for item in args.assignment:
        if "=" not in item:
            print(f"Invalid assignment '{item}'. Use key=value.", file=sys.stderr)
            return 2
        key, value = item.split("=", 1)
        if key not in brief:
            print(f"Unknown task brief field '{key}'.", file=sys.stderr)
            return 2
        current = brief[key]
        if isinstance(current, bool):
            brief[key] = normalize_bool(value)
        elif isinstance(current, list):
            brief[key] = [part for part in value.split(",") if part]
        else:
            brief[key] = value
    save_json(path, brief)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Orpheus task brief helper")
    subparsers = parser.add_subparsers(dest="command", required=True)

    init = subparsers.add_parser("init")
    init.add_argument("--output")
    init.add_argument("--task-id", required=True)
    init.add_argument("--title")
    init.add_argument("--branch", required=True)
    init.add_argument("--worktree-path", required=True)
    init.add_argument("--requires-user-acceptance", default="false")
    init.add_argument("--live-smoke-required", default="false")
    init.add_argument("--allowed-path", action="append")
    init.add_argument("--forbidden-path", action="append")
    init.add_argument("--required-check", action="append")
    init.set_defaults(func=cmd_init)

    show = subparsers.add_parser("show-context")
    show.add_argument("--path")
    show.set_defaults(func=cmd_show_context)

    assert_paths = subparsers.add_parser("assert-paths")
    assert_paths.add_argument("files", nargs="+")
    assert_paths.add_argument("--path")
    assert_paths.add_argument("--require-brief", action="store_true")
    assert_paths.set_defaults(func=cmd_assert_paths)

    assert_push = subparsers.add_parser("assert-push-ready")
    assert_push.add_argument("--path")
    assert_push.add_argument("--pushing-main", action="store_true")
    assert_push.set_defaults(func=cmd_assert_push_ready)

    assert_task = subparsers.add_parser("assert-task-complete")
    assert_task.add_argument("--path")
    assert_task.set_defaults(func=cmd_assert_task_complete)

    set_parser = subparsers.add_parser("set")
    set_parser.add_argument("assignment", nargs="+")
    set_parser.add_argument("--path")
    set_parser.set_defaults(func=cmd_set)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
