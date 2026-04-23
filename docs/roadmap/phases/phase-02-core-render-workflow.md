# Phase 2: Core Render Workflow

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/voice-metadata-schema.md`, `/docs/prd/specs/mksaas-boundary-contract.md`, `/docs/prd/specs/distribution-and-growth-surface.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`
> Last reviewed: 2026-04-23

## Goal

Prove the first real product value chain for the narrowed V1 slice: create a project, run hosted long-form audio generation asynchronously, persist runs, let the user download stable audio without user-side manual chunking, and capture explicit English-and-Spanish output and timing-readiness evidence under an English-first workspace shell.

## Why This Phase Comes Here

This is the first phase where Orpheus stops being a shell and must prove it can actually deliver hosted-first stable long-form audio for the English-first educational-explainer wedge while capturing `EN + ES` output / timing readiness evidence for the first gate.

## Tracks Involved

- Workflow
- Experience

## Entry Criteria

1. Experience shell and platform shell are ready.
2. Hosted provider assumptions, the frozen `EN + ES` feasibility corpus, the approved first-gate voices, and the output / timing readiness rubric are concrete enough to run a feasibility spike.
3. `Phase 2` P0 items in the development-entry checklist are owner-assigned.

## In-Phase Focus

1. Project creation
2. English-first text paste and supported file upload
3. Basic voice-selection baseline sufficient for the first gate across the approved English and Spanish corpus voices
4. Frozen `EN + ES` hosted-first feasibility corpus:
   - `en-control-short`
   - `en-control-medium`
   - `en-control-long`
   - `es-control-short`
   - `es-control-medium`
   - `es-control-long`
5. Provider comparison:
   - `Inworld TTS 1.5 Max` primary implementation path
   - `Cartesia` required same-cycle benchmark
6. Backend-only orchestration with deterministic chunk tracking and retry absorption
7. Full asynchronous render run
8. Project and run persistence
9. Internal alignment asset production for successful runs, even before public `SRT` export
10. Audio artifact storage, artifact manifest, and download
11. Front-end status rendering based on canonical lifecycle states
12. Initial `EN + ES` subtitle timing / subtitle-text-fidelity QA evidence for successful long-form runs
13. Feasibility decision memo with go / hold / fallback outcome and explicit blocked-language naming if needed
14. Pricing review snapshot and `v0.41` planning workbook updated with observed cost for the preferred path
15. One provider-scenario table covering primary, fallback, and second-provider cases
16. One short benchmark note against the prevailing public self-serve long-form workflow

## Parallel Guidance

1. Upload UX and render pipeline wiring can overlap.
2. Project/run semantics and provider comparison must stay in one coordinated stream.

## Exit Criteria

1. A registered user can create a project and receive final audio.
2. The evidence packet covers the frozen `EN + ES` corpus. English-only evidence is insufficient for this phase gate.
3. At least one hosted provider can complete representative long-form scripts with repeatable behavior, or the phase produces an explicit hold memo naming the blocked language and limiting envelope.
4. The product does not rely on user-side manual chunk splitting.
5. Successful runs persist final audio plus an internal artifact manifest with enough data for later alignment and export work.
6. Internal alignment assets exist for successful runs even if public `SRT` export is not yet enabled.
7. The first gate includes a basic voice-selection path rather than one hidden internal voice, and it records explicit `EN + ES` output / timing readiness evidence.
8. Project and run states match the lifecycle spec.
9. Downloaded audio is stored and retrievable through the product shell.
10. The team has a written go / hold / fallback decision for the next build step.
11. A pricing review snapshot, provider-scenario table, and the `v0.41` planning workbook exist for the provider / configuration that passed the gate.

## Deliverables

1. End-to-end audio generation workflow
2. First real project detail experience
3. Basic English-first voice-selection baseline for the approved first-gate voices
4. Hosted provider comparison and frozen `EN + ES` feasibility evidence
5. Canonical persisted run history
6. Internal artifact manifest and alignment-ready traces for successful runs
7. Updated pricing review snapshot and `v0.41` planning workbook
8. Provider-scenario table
9. Benchmark comparison note

## Backfill Required

1. Any new lifecycle or artifact rule must be added to `docs/prd/specs/project-run-lifecycle.md` before broad implementation expands.
2. Any change to the first public promise must be reflected back into `docs/prd/prd.md` and `distribution-and-growth-surface.md`.
3. Any change to the first paid single-project envelope must be reflected back into `capability-entitlements.md` before pricing work expands.
4. Any material cost change discovered in this phase must be reflected back into `pricing-packaging-and-unit-economics.md` before a public pricing page moves forward.
5. If English and Spanish do not both achieve the planned output / timing readiness evidence, record the narrower supported scope explicitly before public language promises expand.
