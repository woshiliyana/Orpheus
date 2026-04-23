# Phase 0: Truth Freeze + Quality Scorecard

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/prd/specs/distribution-and-growth-surface.md`
> Last reviewed: 2026-04-22

## Goal

Lock the documentation truth set and ratify the canonical quality, automation, and distribution model that later phases will implement.

## Why This Phase Comes First

Without a frozen rule set and a canonical quality/automation/distribution vocabulary, later phases will implement different ideas of success for UX, render quality, billing, and growth.

## Tracks Involved

- Experience
- Workflow
- QualityOps

## Entry Criteria

1. PRD truth system exists and is current.
2. Source-of-truth index is usable.

## In-Phase Focus

1. Freeze current rules for entitlements, lifecycle, billing, guest trial, content, voice metadata, distribution, and MkSaaS boundary.
2. Ratify the V1 quality scorecard and automation taxonomy from the canonical truth docs.
3. Confirm the narrowed V1 slice:
   - English complete product
   - story-first documentary
   - `3-5` flagship voices
   - free large starter library
4. Confirm the minimum evaluation corpus and sampling dimensions used by later phases.

## Parallel Guidance

1. Small doc refinements can run in parallel.
2. Any change that alters semantics must stay in one worker with the PRD summary updates.

## Exit Criteria

1. The quality scorecard, automation taxonomy, and distribution surface are fixed in canonical truth docs and referenced by later phases.
2. No unresolved ambiguity remains around clone, SRT, repair, lifecycle, billing, guest trial, or V1 scope narrowing.

## Deliverables

1. Stable truth docs under `docs/prd/`
2. Quality, automation, and distribution truth referenced by roadmap and future plans

## Backfill Required

1. If score names, dashboard scope, or automation categories change, update the truth docs first, then roadmap and affected plans.
2. If any phase needs new product rules, update `docs/prd/` first.
