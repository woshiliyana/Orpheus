# Phase 2 Live Smoke

> Status: ready
> Role: execution checklist
> Normative for product rules: no
> Canonical owner: delivery owner + engineering lead
> Depends on: `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`, `docs/ops/worktree-parallel-development.md`
> Last reviewed: 2026-04-23

## Purpose

Provide one repeatable live-provider smoke path after automated checks pass and before a lane is treated as merge-ready for the current Phase 2 narration slice.

## Preconditions

1. `reviewStatus=approved`
2. automated checks pass locally
3. provider credentials are present in the shell, this repo's shared env file `.git/orpheus.server.env`, or repo-root `.env.local`
4. one chosen script and voice are recorded in the lane brief
5. the lane already passed `debug`

## Default smoke command

```bash
./scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-medium.txt
```

## Evidence packet to keep

- stdout JSON from the smoke run
- final audio file
- `artifact-manifest.json`
- `metrics.json`
- one short seam-quality note
- one short timing / warning note

## Pass criteria

1. command returns success
2. final audio is generated
3. `artifact-manifest.json` exists
4. `metrics.json` exists
5. no unexpected fatal warnings
6. subjective seam review is acceptable for the tested script

## Hold criteria

Treat the lane as held, not merge-ready, if any of these happen:

- provider credentials fail
- audio generation succeeds but artifacts are incomplete
- warnings indicate broken timing integrity
- stitched output has audible seam regressions
- observed retry behavior is materially worse than expected

## After smoke

If the smoke passes:

```bash
./scripts/worktree/update-status.sh liveSmokeStatus=passed stage=pr_prep
```

If the lane also needs founder signoff:

```bash
./scripts/worktree/update-status.sh stage=awaiting_user_acceptance status=awaiting_user_acceptance
```

Do not mark the lane complete until acceptance, when required, is explicit.
