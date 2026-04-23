# Phase 5: Entitlements + Guest Trial + Billing + Risk

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/guest-trial-identity.md`, `/docs/prd/specs/billing-usage-semantics.md`
> Last reviewed: 2026-04-22

## Goal

Turn the stable workflow and pre-modeled voice tiers into a public SaaS by adding guest trial, entitlement enforcement, billing, quota management, compensation, and risk controls.

## Why This Phase Comes Here

Commercial systems should sit on top of a stable workflow and quality baseline, but they must make the public trial and starter-vs-flagship promises enforceable before broad rollout.

## Tracks Involved

- Workflow
- QualityOps

## Entry Criteria

1. Core render, SRT, and repair flows are stable enough to meter.
2. Lifecycle and billing semantics are frozen.

## In-Phase Focus

1. Guest trial identity and claim flow
2. Starter-vs-flagship entitlement enforcement
3. Full plan entitlements, quotas, and balance logic
4. Paddle checkout and webhook sync
5. Compensation and admin adjustments
6. Risk controls for guest, render, repair, uploads, and downloads

## Parallel Guidance

1. Guest trial and risk may overlap.
2. Billing and entitlement enforcement should stay in one coordinated stream.

## Exit Criteria

1. Guest, Free, Pro, and Ultimate behave according to the capability matrix.
2. Usage and compensation are auditable.
3. Risk controls protect high-cost paths before public rollout broadens.

## Deliverables

1. Public SaaS gating layer
2. Auditable billing and usage core
3. Guest trial acquisition path

## Backfill Required

1. If real implementation exposes a missing product rule, update the guest, entitlement, or billing truth docs first.
