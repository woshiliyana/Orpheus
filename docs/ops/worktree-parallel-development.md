# Worktree Parallel Development

> Status: active
> Role: execution policy
> Normative for product rules: no
> Canonical owner: engineering lead + delivery owner
> Depends on: `AGENTS.md`, `docs/ops/agent-execution-policy.md`, `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
> Last reviewed: 2026-04-23

## Purpose

Define the default Orpheus flow for parallel agent work without letting multiple lanes stomp on each other, skip review, or merge half-debugged code into `main`.

## Core rules

1. Keep at most **3 concurrent non-main worktrees**.
2. Every lane starts with a written task brief before code changes.
3. Every task brief gets a plan review before implementation begins.
4. `debug / stabilize` is a mandatory stage. “Code compiles” is not a merge criterion.
5. Live smoke is required for any phase gate that touches real provider behavior, artifact integrity, or release confidence.
6. If a lane is marked `requiresUserAcceptance`, the agent may keep developing inside the lane but must stop at `awaiting_user_acceptance` until a human explicitly accepts the stage.
7. `main` only receives work that has already passed branch-local checks, required smoke, and final review.
8. After merge, the lane is not complete until the local worktree has been removed and any lane-specific stale worktree metadata has been checked or pruned.

## Stage model

Use this exact stage order unless the controller explicitly narrows it for a docs-only or review-only lane:

1. `plan`
2. `review`
3. `implementation`
4. `self_test`
5. `debug`
6. `live_smoke` when required
7. `pr_prep`
8. `awaiting_user_acceptance` when required
9. `merge_ready`
10. `merged`
11. `cleaned_up`

## Runtime task brief

Each worktree owns one untracked runtime file:

```text
.agent/task-brief.json
```

Minimum fields:

- `taskId`
- `branch`
- `worktreePath`
- `stage`
- `status`
- `reviewStatus`
- `requiresUserAcceptance`
- `userAcceptanceStatus`
- `liveSmokeRequired`
- `liveSmokeStatus`
- `allowedPaths`
- `forbiddenPaths`
- `requiredChecks`

Use `docs/templates/worktree-task-brief.json` as the starting schema.

## Create a lane

Always create lanes with the wrapper so the concurrency cap and task-brief bootstrap are enforced:

```bash
./scripts/worktree/create.sh ORP-042-A feat/orp-042-inworld ../orpheus-wt-inworld \
  --title "Inworld adapter hardening" \
  --acceptance yes \
  --live-smoke yes \
  --allow 'src/providers/inworld.ts' \
  --allow 'src/pipeline/**' \
  --allow 'tests/**'
```

Default behavior is to create the lane from the current `HEAD`. If a controller intentionally wants another base, pass `--base-ref <ref>`.

After creation:

1. fill in any missing `allowedPaths`
2. review the plan
3. update the brief to `reviewStatus=approved stage=implementation status=in_progress`

Example:

```bash
./scripts/worktree/update-status.sh reviewStatus=approved stage=implementation status=in_progress
```

## Required checks before PR or merge

Run the shared wrapper unless a lane explicitly needs more:

```bash
./scripts/checks/run-required.sh
```

This is the baseline for `self_test` and again before `merge_ready`.

## Live smoke gate

If `liveSmokeRequired=true`, run the provider-backed smoke before the lane can become `merge_ready`:

```bash
./scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-medium.txt
```

Capture and review:

- final audio
- `artifact-manifest.json`
- `metrics.json`
- seam quality note
- timing / warning note

Before moving out of `live_smoke`, promote the selected evidence packet out of ignored `runs/` output and into a merge-tracked evidence directory such as:

```text
docs/plans/phase-02-core-render/evidence-artifacts/<attempt_id>/
```

The promoted packet should include the final audio when it is small enough for normal Git, or a large-artifact manifest with hash / size / retention path when it is not. It should also include artifact manifest, metrics, splice / subtitle / timing artifacts when present, probe metadata, and the short human review note. Do not leave the only copy of smoke evidence inside a disposable worktree.

Then update the task brief:

```bash
./scripts/worktree/update-status.sh liveSmokeStatus=passed stage=pr_prep
```

## User acceptance gate

For lanes that require human signoff:

1. set `stage=awaiting_user_acceptance`
2. keep the branch open
3. do not mark the task complete
4. do not merge to `main`

After acceptance:

```bash
./scripts/worktree/update-status.sh userAcceptanceStatus=accepted stage=merge_ready status=merge_ready
```

## Merge and cleanup

After review and merge:

```bash
./scripts/worktree/update-status.sh stage=merged status=completed
./scripts/worktree/cleanup.sh ../orpheus-wt-inworld
```

Then return to `main`, pull, and rerun the required checks.

Cleanup is mandatory for merged lanes. Do not hand off a merged lane as finished while its local worktree directory still exists. If cleanup is blocked, leave the lane in a tail debt state and name the blocker, the path, and the next cleanup command.

After cleanup, verify that the lane is gone from the local worktree registry:

```bash
git worktree list --porcelain
git worktree prune --dry-run --verbose
```

Cleanup is blocked if required live-smoke artifacts still exist only under ignored `runs/`, `benchmark-results/`, or another worktree-local path. Either merge the promoted evidence packet first or write an explicit closeout waiver naming why that artifact is not retained.

## Hook enforcement

Three layers enforce this flow:

1. `.claude/settings.json` project hooks for Claude Code sessions
2. `.githooks/` for git commit / push enforcement
3. `scripts/lib/task_brief.py` as the shared policy checker

If the hooks and the docs disagree, update the docs and the scripts in the same change.
