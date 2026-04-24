#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./scripts/worktree/create.sh <task-id> <branch> <worktree-path> [--base-ref <ref>] [--title "..."] [--acceptance yes|no] [--live-smoke yes|no] [--allow <glob>] [--forbid <glob>]
EOF
}

if [ "$#" -lt 3 ]; then
  usage >&2
  exit 2
fi

TASK_ID="$1"
BRANCH="$2"
WORKTREE_PATH="$3"
shift 3

TITLE=""
BASE_REF="HEAD"
REQUIRES_ACCEPTANCE="false"
LIVE_SMOKE_REQUIRED="false"
ALLOWED_ARGS=()
FORBIDDEN_ARGS=()

while [ "$#" -gt 0 ]; do
  case "$1" in
    --base-ref)
      BASE_REF="$2"
      shift 2
      ;;
    --title)
      TITLE="$2"
      shift 2
      ;;
    --acceptance)
      REQUIRES_ACCEPTANCE="$2"
      shift 2
      ;;
    --live-smoke)
      LIVE_SMOKE_REQUIRED="$2"
      shift 2
      ;;
    --allow)
      ALLOWED_ARGS+=("--allowed-path" "$2")
      shift 2
      ;;
    --forbid)
      FORBIDDEN_ARGS+=("--forbidden-path" "$2")
      shift 2
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if ! git fetch origin; then
  echo "Warning: could not fetch origin. Continuing with local refs." >&2
fi

if ! git rev-parse --verify --quiet "${BASE_REF}^{commit}" >/dev/null; then
  echo "Blocked: base ref '$BASE_REF' does not resolve to a commit." >&2
  exit 2
fi

active_feature_count=$(git worktree list --porcelain | awk '
  /^worktree / { wt=$2; next }
  /^branch refs\/heads\// { branch=$2; sub(/^refs\/heads\//, "", branch); if (branch != "main") count++ }
  END { print count+0 }
')

if [ "$active_feature_count" -ge 3 ]; then
  echo "Blocked: Orpheus allows at most 3 concurrent non-main worktrees." >&2
  exit 2
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "Blocked: local branch '$BRANCH' already exists." >&2
  exit 2
fi

git worktree add -b "$BRANCH" "$WORKTREE_PATH" "$BASE_REF"

python3 "$repo_root/scripts/lib/task_brief.py" init \
  --output "$WORKTREE_PATH/.agent/task-brief.json" \
  --task-id "$TASK_ID" \
  --title "$TITLE" \
  --branch "$BRANCH" \
  --worktree-path "$WORKTREE_PATH" \
  --requires-user-acceptance "$REQUIRES_ACCEPTANCE" \
  --live-smoke-required "$LIVE_SMOKE_REQUIRED" \
  "${ALLOWED_ARGS[@]}" \
  "${FORBIDDEN_ARGS[@]}"

cat <<EOF
Created worktree: $WORKTREE_PATH
Branch: $BRANCH
Base ref: $BASE_REF
Task brief: $WORKTREE_PATH/.agent/task-brief.json

Next steps:
1. Fill in allowedPaths in the task brief if you did not pass --allow.
2. Review and approve the plan before implementation.
3. Move stage to implementation only after review approval.
EOF
