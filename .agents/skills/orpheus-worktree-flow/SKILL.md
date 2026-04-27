---
name: orpheus-worktree-flow
description: Use before creating or advancing a worktree lane. Enforces the Orpheus stage model, max-3 concurrent worktree cap, task-brief review before implementation, mandatory debug, optional live smoke, and human acceptance gates.
---

# Orpheus Worktree Flow

## Goal

Keep multi-lane implementation predictable. No free-form “just open another branch and vibe” workflow.

## When to use

- before creating a new worktree lane
- before moving a lane from planning into implementation
- before declaring a lane merge-ready
- before asking for acceptance on a gated stage

## Rules

1. Max 3 concurrent non-main worktrees.
2. Every lane owns `.agent/task-brief.json`.
3. `reviewStatus=approved` is required before `implementation`.
4. `debug` is mandatory after `self_test`.
5. If provider-backed behavior matters, `live_smoke` is mandatory before `merge_ready`.
6. If the lane requires founder or user signoff, stop at `awaiting_user_acceptance` until acceptance is explicit.
7. After merge, run the local worktree cleanup and verify the lane no longer appears in `git worktree list --porcelain`; the lane is not complete until it reaches `cleaned_up`.

## Default lane sequence

`plan -> review -> implementation -> self_test -> debug -> live_smoke? -> pr_prep -> awaiting_user_acceptance? -> merge_ready -> merged -> cleaned_up`

## Expected outputs

- lane plan
- file ownership
- required checks
- smoke requirement
- acceptance requirement
- merge order note

## Commands

Create lane:

```bash
./scripts/worktree/create.sh <task-id> <branch> <worktree-path> --allow 'src/**'
```

By default the lane starts from the current `HEAD`. If you intentionally want a different base, pass:

```bash
./scripts/worktree/create.sh <task-id> <branch> <worktree-path> --base-ref origin/main --allow 'src/**'
```

Advance status:

```bash
./scripts/worktree/update-status.sh reviewStatus=approved stage=implementation status=in_progress
```

Run required checks:

```bash
./scripts/checks/run-required.sh
```

Run live smoke:

```bash
./scripts/live-smoke/phase2-live-smoke.sh --provider inworld --voice Ashley --script fixtures/frozen-corpus/scripts/en-control-medium.txt
```

Clean up after merge:

```bash
./scripts/worktree/cleanup.sh <worktree-path>
git worktree list --porcelain
git worktree prune --dry-run --verbose
```

## Stop conditions

Do not mark the lane complete if:

- review is still pending
- live smoke is required and not passed
- user acceptance is required and not accepted
- the lane has not reached `merge_ready`
- the merged lane's local worktree has not been removed
