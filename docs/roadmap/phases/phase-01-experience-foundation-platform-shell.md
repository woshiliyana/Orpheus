# Phase 1: Experience Foundation + Platform Shell

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/mksaas-boundary-contract.md`, `/docs/prd/specs/content-source-governance.md`
> Last reviewed: 2026-04-22

## Goal

Start the product with a high-quality brand, design system, and front-end shell while laying down the safe platform skeleton behind it.

## Why This Phase Comes Here

Brand, visual system, and UI/UX are core to Orpheus. They must start immediately, but they must start on top of the correct shell and boundary rules, not on fake product semantics.

## Tracks Involved

- Experience
- Workflow

## Entry Criteria

1. Phase 0 truth freeze is complete.

## In-Phase Focus

1. Brand direction, design tokens, component foundations, and high-fidelity shell screens.
2. Homepage, pricing shell, workspace shell, project detail shell, voice browsing shell.
3. MkSaaS integration as shell only:
   - auth shell
   - billing shell
   - admin shell
   - i18n shell
4. Platform skeleton:
   - session/auth scaffolding
   - DB access scaffolding
   - storage service boundary
   - service / adapter boundaries

## Parallel Guidance

1. Experience system and platform shell scaffolding may run together.
2. Do not let shell work introduce hidden billing or tenant semantics from MkSaaS defaults.

## Exit Criteria

1. High-quality UX shell exists for the main user journey.
2. Platform shell is ready for real workflow integration.
3. No front-end surface is coupled directly to third-party providers.

## Deliverables

1. Design system baseline
2. Product shell screens
3. Safe platform foundation for later workflow work

## Backfill Required

1. If shell integration forces a product rule change, update `docs/prd/specs/mksaas-boundary-contract.md` first.
