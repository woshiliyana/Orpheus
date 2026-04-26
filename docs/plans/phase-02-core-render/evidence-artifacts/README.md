# Phase 2 Evidence Artifacts

> Status: active
> Role: merge-tracked evidence archive
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/ops/phase2-live-smoke.md`, `/docs/ops/worktree-parallel-development.md`
> Last reviewed: 2026-04-25

This directory is the default merge-tracked home for selected Phase 2 provider-backed evidence packets.

## Rules

1. Live-smoke outputs must not remain only in ignored `runs/` folders or temporary worktrees.
2. Before a live-smoke lane is marked `merge_ready`, copy the selected evidence packet into a subdirectory named after the stable `attempt_id`.
3. Keep enough files to re-open the test result after worktree cleanup:
   - source script or an explicit pointer to the immutable source snapshot
   - final audio when the file is small enough for normal Git
   - large-artifact manifest entries with `sha256`, size, format, retention path, and verdict when audio is too large for normal Git
   - `artifact-manifest.json`
   - `metrics.json`
   - splice report when present
   - subtitle and timing artifacts when present
   - audio probe metadata
   - one short review note
4. Raw provider responses may be retained only after checking that they do not contain credentials, private account tokens, or unrelated sensitive payloads.
5. Large binaries must not be committed through normal Git when they exceed GitHub's repository file limits or make the repo costly to clone.
6. If an artifact is too large for normal Git history, stop before cleanup and choose an explicit durable storage path plus a tracked manifest. Do not silently delete it with the worktree.
7. Commercial delivery audio belongs in product storage, not GitHub. Repo evidence should retain the manifest needed to verify the product-storage object.
