# Phase 2: Core Render Workflow

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/voice-metadata-schema.md`, `/docs/prd/specs/mksaas-boundary-contract.md`, `/docs/prd/specs/distribution-and-growth-surface.md`
> Last reviewed: 2026-04-23

## Goal

Prove the first real product value chain for the narrowed V1 slice: create a project, run hosted long-form audio generation asynchronously, persist runs, and let the user download stable audio without user-side manual chunking.

## Why This Phase Comes Here

This is the first phase where Orpheus stops being a shell and must prove it can actually deliver stable long-form audio for the educational-explainer wedge.

## Tracks Involved

- Workflow
- Experience

## Entry Criteria

1. Experience shell and platform shell are ready.
2. Hosted provider assumptions are concrete enough to run a feasibility spike.

## In-Phase Focus

1. Project creation
2. Text paste and supported file upload
3. Basic English voice selection baseline sufficient for the first gate
4. Hosted-first feasibility spike:
   - one shorter control case
   - one ~20 minute script
   - one ~30 minute script
5. Provider comparison:
   - `Inworld TTS 1.5 Max`
   - `Cartesia`
6. Full asynchronous render run
7. Project and run persistence
8. Audio artifact storage and download
9. Front-end status rendering based on canonical lifecycle states
10. Feasibility decision memo with go / hold / fallback outcome

## Parallel Guidance

1. Upload UX and render pipeline wiring can overlap.
2. Project/run semantics and provider comparison must stay in one coordinated stream.

## Exit Criteria

1. A registered user can create a project and receive final audio.
2. At least one hosted provider can complete representative long-form scripts with repeatable behavior.
3. The product does not rely on user-side manual chunk splitting.
4. The first gate includes a basic English voice-selection path rather than one hidden internal voice.
5. Project and run states match the lifecycle spec.
6. Downloaded audio is stored and retrievable through the product shell.
7. The team has a written go / hold / fallback decision for the next build step.

## Deliverables

1. End-to-end audio generation workflow
2. First real project detail experience
3. Basic English voice-selection baseline
4. Hosted provider comparison and feasibility evidence
5. Canonical persisted run history

## Backfill Required

1. Any new lifecycle or artifact rule must be added to `docs/prd/specs/project-run-lifecycle.md` before broad implementation expands.
2. Any change to the first public promise must be reflected back into `docs/prd/prd.md` and `distribution-and-growth-surface.md`.
