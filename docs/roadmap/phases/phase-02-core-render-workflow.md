# Phase 2: Core Render Workflow

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/voice-metadata-schema.md`, `/docs/prd/specs/mksaas-boundary-contract.md`
> Last reviewed: 2026-04-22

## Goal

Deliver the first real product value chain: create a project, render long-form audio asynchronously, persist runs, and let the user download audio.

## Why This Phase Comes Here

This is the first phase where Orpheus stops being a shell and becomes a real creator workflow product.

## Tracks Involved

- Workflow
- Experience

## Entry Criteria

1. Experience shell and platform shell are ready.
2. Voice catalog truth is available for public voices.

## In-Phase Focus

1. Project creation
2. Text paste and supported file upload
3. Public voice selection
4. Full asynchronous render run
5. Project and run persistence
6. Audio artifact storage and download
7. Front-end status rendering based on canonical lifecycle states

## Parallel Guidance

1. Upload UX and render pipeline wiring can overlap.
2. Project/run semantics must stay in one coordinated stream.

## Exit Criteria

1. A registered user can create a project and receive final audio.
2. Project and run states match the lifecycle spec.
3. Downloaded audio is stored and retrievable through the product shell.

## Deliverables

1. End-to-end audio generation workflow
2. First real project detail experience
3. Canonical persisted run history

## Backfill Required

1. Any new lifecycle or artifact rule must be added to `docs/prd/specs/project-run-lifecycle.md` before broad implementation expands.
