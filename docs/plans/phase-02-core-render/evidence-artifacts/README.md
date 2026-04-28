# Phase 2 Evidence Artifacts

> Status: active
> Role: merge-tracked evidence archive
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/ops/phase2-live-smoke.md`, `/docs/ops/worktree-parallel-development.md`
> Last reviewed: 2026-04-27

This directory is the default merge-tracked home for selected Phase 2 provider-backed evidence packets.

## Current Closeouts

- [`narration-pacing-closeout-20260427.md`](./narration-pacing-closeout-20260427.md) records the Inworld `exact` vs `natural_basic` listening verdict across short and structure-stress EN / ES evidence.
- [`live-smoke-cartesia-medium-20260428/cartesia-medium-listening-timing-closeout-20260428.md`](./live-smoke-cartesia-medium-20260428/cartesia-medium-listening-timing-closeout-20260428.md) records the Cartesia medium timing spot-check, listening closeout, provider scorecard, and second-provider decision.
- [`../08-provider-decision-scorecard-2026-04-28.md`](../08-provider-decision-scorecard-2026-04-28.md) synthesizes the retained Inworld and Cartesia packets into the staged Phase 2 provider decision.
- [`../09-inworld-product-readiness-closeout-2026-04-28.md`](../09-inworld-product-readiness-closeout-2026-04-28.md) synthesizes retained Inworld packets into a product-readiness evidence-gap closeout and names EN manual review as the next no-new-provider-call lane.

## Rules

1. Live-smoke outputs must not remain only in ignored `runs/` folders or temporary worktrees.
2. Before a live-smoke lane is marked `merge_ready`, copy the selected evidence packet into a subdirectory named after the stable `attempt_id`.
3. Keep enough files to re-open the test result after worktree cleanup:
   - source script or an explicit pointer to the immutable source snapshot
   - final audio when the file is small enough for normal Git
   - large-artifact manifest entries with `sha256`, size, format, retention path, and verdict when audio is too large for normal Git
   - `artifact-manifest.json`
   - `metrics.json`
   - input adapter evidence: `source-script.md`, `spoken-script.md`, `provider-input.<provider>.txt`, `provider-input.chunks.json`, `pacing-plan.json`, and `input-quality-report.json`
   - splice report when present
   - subtitle and timing artifacts when present
   - audio probe metadata
   - `final-evaluation.json` or an equivalent evaluation note using the canonical `tts_ux_readiness_scorecard`
   - one short review note
4. Raw provider responses may be retained only after checking that they do not contain credentials, private account tokens, or unrelated sensitive payloads.
5. Large binaries must not be committed through normal Git when they exceed GitHub's repository file limits or make the repo costly to clone.
6. If an artifact is too large for normal Git history, stop before cleanup and choose an explicit durable storage path plus a tracked manifest. Do not silently delete it with the worktree.
7. Commercial delivery audio belongs in product storage, not GitHub. Repo evidence should retain the manifest needed to verify the product-storage object.
8. Future packets must record hard-gate verdict, per-dimension coverage status, missing evidence, manual review requirements, and final verdict before any weighted score is interpreted.
9. Missing artifacts must be named as `blocked_by_missing_evidence` when they are required for product readiness. A healthy decode or loudness probe is not enough to claim UX readiness.
10. Future packets using `natural_basic` must preserve the adapter evidence needed to prove source-token preservation and provider break-tag budget compliance.
