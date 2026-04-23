# Agent Build and Test Brief for Phase 2

> Status: ready
> Role: execution brief
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on truth docs: `/docs/prd/source-of-truth-index.md`, `/docs/prd/prd.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/prd/specs/distribution-and-growth-surface.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`, `/docs/plans/phase-02-core-render/02-development-entry-checklist.md`
> Last reviewed: 2026-04-23

## Purpose

Give the first build / test agent one bounded implementation slice that proves Orpheus can ingest an English long-form script, render stable hosted audio through a backend-owned pipeline, persist evidence, and hand back enough quality and cost data to make a go / hold / fallback decision.

## Read Order

1. `/docs/prd/source-of-truth-index.md`
2. `/docs/prd/prd.md`
3. `/docs/prd/specs/project-run-lifecycle.md`
4. `/docs/prd/specs/capability-entitlements.md`
5. `/docs/prd/specs/billing-usage-semantics.md`
6. `/docs/prd/specs/pricing-packaging-and-unit-economics.md`
7. `/docs/prd/specs/distribution-and-growth-surface.md`
8. `/docs/prd/specs/quality-ops-and-automation.md`
9. `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
10. `/docs/plans/phase-02-core-render/02-development-entry-checklist.md`

## Goal

Build the smallest Phase 2 slice that can move one user-visible project from submission to downloadable final audio while keeping orchestration hidden, lifecycle states canonical, and pricing / evidence traces audit-friendly.

## In Scope

1. Minimal authenticated project creation and project-detail retrieval
2. English script paste and supported file ingest
3. Basic English voice-selection path
4. Server-owned provider adapter for `Inworld TTS 1.5 Max` as the primary test path
5. Secondary benchmark path for `Cartesia` during feasibility testing
6. Hidden chunk planning with deterministic chunk IDs and retry tracking
7. Asynchronous render execution with canonical run statuses
8. Final audio storage plus server-owned delivery path
9. Successful-run `artifact_manifest` persistence
10. Internal alignment-asset job or placeholder record tied to final audio
11. UI / API exposure of status, warnings, and download link
12. Provider run-log capture and cost-snapshot update for the frozen corpus

## Out of Scope

1. Public pricing page launch
2. Public `SRT` export
3. Segment repair UI
4. Public no-login trial
5. Video automation
6. Self-serve private clone
7. Full multilingual workspace support

## Acceptance Gates

1. One user-visible project maps to one canonical run history even when the backend fans out into many provider sub-requests.
2. No browser or public client directly calls TTS, STT, or storage providers.
3. Long-form requests above provider request limits are handled only through backend-owned orchestration.
4. Successful runs persist final audio plus an `artifact_manifest` with provider, orchestration, billing, and alignment references.
5. `audio success + alignment failure` resolves to `completed_with_warnings` / `succeeded_with_warnings`, not a full failed rerun state.
6. Billing records bill audio only, never the entire project again for alignment retry or segment repair semantics.
7. At least one provider completes the frozen `control-short`, `control-medium`, and `control-long` corpus with repeatable behavior, or the agent produces an explicit hold memo naming the limiting envelope.
8. A pricing review snapshot is updated using observed `cost_per_completed_audio_minute`, retry overhead, and fallback behavior.

## Required Deliverables

1. Implemented code or tested stubs for the workflow slice above
2. One successful-run artifact packet
3. Provider run log for the frozen corpus
4. Updated pricing / unit-economics snapshot
5. Go / hold / fallback memo
6. Truth-doc backfill list for any semantic mismatches discovered during implementation
7. One short benchmark note explaining whether the current Orpheus slice is differentiated enough from the prevailing self-serve long-form workflow

## Minimum Automated Tests

- Chunk-ID determinism and retry-idempotency tests
- Lifecycle transition tests for `queued -> validating -> rendering -> aligning -> packaging -> success/warning/failure`
- Billing tests for full render success, segment repair success, and `audio success + alignment failure`
- Artifact-manifest persistence tests
- Provider-boundary tests proving the client never calls providers directly

## Manual Review Tasks

- Audible seam review on long-form stitched outputs
- Spot-check final-audio timing against internal alignment assets
- Spot-check subtitle-text fidelity against source and normalized text
- Review cost snapshot against the plan assumptions in the pricing spec
- Write a short comparison note on whether the observed Orpheus flow actually reduces operator burden versus the prevailing self-serve long-form workflow

## Suggested Task Order

1. Freeze the three-script corpus and selected voices.
2. Implement the project / run data model plus lifecycle enums.
3. Add the provider adapter behind an Orpheus-owned server boundary.
4. Implement hidden chunk planning, retry tracking, and orchestration summary capture.
5. Persist final audio and the `artifact_manifest`.
6. Add the internal alignment-asset job / record path.
7. Expose project status and download in UI or API.
8. Run the frozen corpus, update the scorecard, and write the decision memo.

## Backfill Required

1. If implementation discovers missing lifecycle meaning, update `project-run-lifecycle.md` before proceeding.
2. If implementation discovers a narrower stable envelope, update `capability-entitlements.md`, `distribution-and-growth-surface.md`, and PRD pricing summary before broadening the promise.
3. If implementation changes effective cost materially, update `pricing-packaging-and-unit-economics.md` and the workbook snapshot in the same change set.

## Validation

1. The build can complete at least one full successful run with downloadable audio.
2. The evidence packet contains audio, manifest, and alignment-ready traces.
3. The run log and memo are sufficient for a founder to make a go / hold / fallback decision without re-reading raw provider logs.

## Execution Notes

1. Do not spend the first build cycle on public marketing surfaces.
2. Do not solve public subtitle export before internal alignment truth exists.
3. Do not treat provider request limits as permission to push chunking work to users.
4. When in doubt, preserve evidence and make the failure stage explicit.
