# Agent Build and Test Brief for Phase 2

> Status: ready
> Role: execution brief
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on truth docs: `/docs/prd/source-of-truth-index.md`, `/docs/prd/prd.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/prd/specs/distribution-and-growth-surface.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`, `/docs/plans/phase-02-core-render/02-development-entry-checklist.md`
> Last reviewed: 2026-04-23

## Purpose

Give the first build / test agent one bounded implementation slice that proves Orpheus can ingest a long-form script through an English-first workspace, render stable hosted audio through a backend-owned pipeline, persist evidence, and hand back enough bilingual quality and cost data to make a go / hold / fallback decision.

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
11. `/docs/ops/phase2-live-smoke.md`
12. Supporting benchmark input only: `/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`

## Goal

Build the smallest Phase 2 slice that can move one user-visible project from submission to downloadable final audio while keeping orchestration hidden, lifecycle states canonical, pricing / evidence traces audit-friendly, and provider-cost reality measurable enough to judge whether `Pro = $20 / 90 min` is still a defensible working package.

## In Scope

1. Minimal authenticated project creation and project-detail retrieval
2. English-first script paste and supported file ingest
3. Basic voice-selection path covering the approved first-gate English and Spanish corpus voices
4. Server-owned provider adapter for `Inworld TTS 1.5 Max` as the primary implementation path
5. Same-corpus benchmark path for `Cartesia` during the first benchmark cycle
6. Hidden chunk planning with deterministic chunk IDs and retry tracking
7. Asynchronous render execution with canonical run statuses
8. Final audio storage plus server-owned delivery path
9. Successful-run `artifact_manifest` persistence
10. Internal alignment-asset job or placeholder record tied to final audio
11. UI / API exposure of status, warnings, and download link
12. Audio-format policy evidence covering default `MP3` delivery and `WAV` / Linear PCM production-master readiness
13. Provider run-log capture and cost-snapshot update for the frozen `EN + ES` corpus
14. One short benchmark note against the prevailing public self-serve long-form workflow, with `ElevenLabs` as the reference point
15. One explicit `EN + ES` output / timing readiness note for the first gate

## Out of Scope

1. Public pricing page launch
2. Public `SRT` export
3. Segment repair UI
4. Public no-login trial
5. Video automation
6. Self-serve private clone
7. Full multilingual workspace support
8. Full provider marketplace or runtime multi-provider routing

## Acceptance Gates

1. One user-visible project maps to one canonical run history even when the backend fans out into many provider sub-requests.
2. No browser or public client directly calls TTS, STT, or storage providers.
3. Long-form requests above provider request limits are handled only through backend-owned orchestration.
4. Successful runs persist final audio plus an `artifact_manifest` with provider, orchestration, billing, and alignment references.
5. Successful runs record an `audio_format_policy` or equivalent evidence entry that names requested format, observed container / codec, sample rate, bitrate when relevant, delivery verdict, and production-master verdict.
6. `audio success + alignment failure` resolves to `completed_with_warnings` / `succeeded_with_warnings`, not a full failed rerun state.
7. Billing records bill audio only, never the entire project again for alignment retry or segment repair semantics.
8. The benchmark packet covers the frozen `en-control-short`, `en-control-medium`, `en-control-long`, `es-control-short`, `es-control-medium`, and `es-control-long` corpus and yields explicit `ready` / `warning` / `blocked` output and timing verdicts for English and Spanish, or the agent produces an explicit hold memo naming the blocked language and limiting envelope.
9. The benchmark packet includes one second-provider cost / quality scenario, not just the primary provider.
10. A pricing review snapshot is updated using observed `cost_per_completed_audio_minute`, retry overhead, and fallback behavior.

## Required Deliverables

1. Implemented code or tested stubs for the workflow slice above
2. One successful-run artifact packet
3. Provider run log for the frozen `EN + ES` corpus
4. Updated pricing / unit-economics snapshot
5. One audio-format verdict table that says whether `MP3` is ready for default delivery, whether `WAV` / Linear PCM is ready for internal master use, and whether user-facing `WAV` export remains held
6. One provider-scenario table showing how the result looks under at least:
   - current primary scenario
   - one higher-cost fallback scenario
   - one second-provider scenario
7. One `EN + ES` readiness summary showing output / timing verdicts per language
8. One live-smoke evidence packet when the slice touches real provider behavior
9. Go / hold / fallback memo
10. Truth-doc backfill list for any semantic mismatches discovered during implementation
11. One short benchmark note explaining whether the current Orpheus slice is differentiated enough from the prevailing self-serve long-form workflow
12. One explicit recommendation on whether the team should keep `Inworld-first`, switch primary provider, or keep the current mix but tighten packaging

Provider-backed evidence must be promoted into a merge-tracked artifact packet before worktree cleanup. A local-only path under `runs/` is not a completed deliverable.

## Minimum Automated Tests

- Chunk-ID determinism and retry-idempotency tests
- Lifecycle transition tests for `queued -> validating -> rendering -> aligning -> packaging -> success/warning/failure`
- Billing tests for full render success, segment repair success, and `audio success + alignment failure`
- Artifact-manifest persistence tests
- Audio-format policy tests for requested format, observed asset metadata, delivery verdict, and production-master verdict
- Provider-boundary tests proving the client never calls providers directly
- Cost-calculation tests that fail when a provider scenario drops below the target margin floor without an explicit doc update

## Manual Review Tasks

- Audible seam review on long-form stitched outputs
- Audio-format review comparing default `MP3` delivery against zero-cost WAV derivative packaging when possible; use provider-native `WAV` / Linear PCM only when the lane explicitly needs production-master quality evidence
- Spot-check English and Spanish final-audio timing against internal alignment assets
- Spot-check English and Spanish subtitle-text fidelity against source and normalized text
- Review cost snapshot against the plan assumptions in the pricing spec
- Compare operator burden against the current public self-serve reference workflow, using `ElevenLabs` as the default market benchmark
- Write one short note on whether `Paste the whole script once. Get stable narration with subtitle-ready timing.` is now honestly supported by the observed workflow

## Suggested Task Order

1. Freeze the `EN + ES` corpus and selected voices.
2. Implement the project / run data model plus lifecycle enums.
3. Add the `Inworld` provider adapter behind an Orpheus-owned server boundary.
4. Implement hidden chunk planning, retry tracking, and orchestration summary capture.
5. Persist final audio and the `artifact_manifest`.
6. Add the internal alignment-asset job / record path.
7. Expose project status and download in UI or API.
8. Run the frozen corpus on `Inworld`, then run the same corpus on `Cartesia`.
9. Update the scorecard, workbook snapshot, `EN + ES` readiness note, and decision memo.
10. Write the public-market comparison note before any broader pricing or trial decision.

## Backfill Required

1. If implementation discovers missing lifecycle meaning, update `project-run-lifecycle.md` before proceeding.
2. If implementation discovers a narrower stable envelope, update `capability-entitlements.md`, `distribution-and-growth-surface.md`, and PRD pricing summary before broadening the promise.
3. If implementation changes effective cost materially, update `pricing-packaging-and-unit-economics.md` and the workbook snapshot in the same change set.
4. If provider-cost evidence shows `Pro $20 / 90 min` does not clear the guardrail, do not leave the package untouched out of convenience. Update the package or mark public rollout blocked.
5. If English and Spanish do not both achieve the required output / timing evidence, record that constraint explicitly instead of silently degrading the gate back to English-only.

## Validation

1. The build can complete at least one full successful run with downloadable audio.
2. The evidence packet contains audio, manifest, alignment-ready traces, and `EN + ES` readiness notes.
3. The run log and memo are sufficient for a founder to make a go / hold / fallback decision without re-reading raw provider logs.
4. The benchmark packet is sufficient for pricing and distribution decisions without redoing basic provider math.

## Execution Notes

1. Do not spend the first build cycle on public marketing surfaces.
2. Do not solve public subtitle export before internal alignment truth exists.
3. Do not treat provider request limits as permission to push chunking work to users.
4. When in doubt, preserve evidence and make the failure stage explicit.
5. `Inworld-first` is the current implementation choice, not a religious belief. The build is allowed to keep that choice only if the benchmark packet justifies it.
6. English-first workspace UI remains the default in this phase even though the evidence packet must cover English and Spanish output / timing readiness.
