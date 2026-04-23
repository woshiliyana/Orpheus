# Phase 1: Experience Foundation + Platform Shell

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/mksaas-boundary-contract.md`, `/docs/prd/specs/content-source-governance.md`, `/docs/prd/specs/distribution-and-growth-surface.md`
> Last reviewed: 2026-04-23

## Goal

Start the product with a high-quality brand, design system, and minimal front-end shell while laying down the safe platform skeleton behind it.

## Why This Phase Comes Here

Brand, visual system, and UI/UX are core to Orpheus, but the shell should not outrun the first technical-feasibility envelope.

## Tracks Involved

- Experience
- Workflow

## Entry Criteria

1. Phase 0 truth freeze is complete.

## In-Phase Focus

1. Brand direction, design tokens, component foundations, and high-fidelity shell screens.
2. Homepage shell, workspace shell, and project detail shell.
3. Minimal public framing:
   - homepage hero claim
   - value articulation for stable long-form audio
   - pricing shell only if it does not over-promise ahead of feasibility
4. MkSaaS integration as shell only:
   - auth shell
   - billing shell
   - admin shell
   - i18n shell
5. Platform skeleton:
   - session/auth scaffolding
   - DB access scaffolding
   - storage service boundary
   - service / adapter boundaries

## Parallel Guidance

1. Experience system and platform shell scaffolding may run together.
2. Do not let shell work introduce hidden billing or tenant semantics from MkSaaS defaults.

## Exit Criteria

1. High-quality UX shell exists for the main user journey.
2. Public framing does not promise more than the hosted long-form audio spike is meant to prove.
3. Platform shell is ready for real workflow integration.
4. No front-end surface is coupled directly to third-party providers.

## Deliverables

1. Design system baseline
2. Product shell screens
3. Minimal homepage and workspace framing foundation
4. Safe platform foundation for later workflow work

## Backfill Required

1. If shell integration forces a product rule change, update `docs/prd/specs/mksaas-boundary-contract.md` first.
