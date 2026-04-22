# Phase 8: Controlled Clone + Quality Hardening

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/guest-trial-identity.md`
> Last reviewed: 2026-04-22

## Goal

Expand controlled private clone access and harden the system for broader public use through quality, abuse, and fallback drills.

## Why This Phase Comes Last

Clone is intentionally gated. It should expand only after core workflow, billing, risk, notifications, and quality operations are already stable.

## Tracks Involved

- Workflow
- QualityOps

## Entry Criteria

1. Public workflow and quality operations are stable.
2. Billing, risk, and notification systems can support controlled rollout.

## In-Phase Focus

1. Controlled clone enablement
2. Clone review operations and auditability
3. Long-audio and SRT hardening
4. Provider fallback drills
5. Abuse simulation
6. Support runbooks and launch readiness

## Parallel Guidance

1. Quality hardening and support runbooks can overlap.
2. Clone rollout should remain isolated from unrelated pricing or marketing changes.

## Exit Criteria

1. Controlled clone beta is operationally safe.
2. The system withstands realistic long-audio, subtitle, and abuse scenarios.

## Deliverables

1. Controlled clone rollout readiness
2. Quality hardening evidence
3. Operational launch runbooks

## Backfill Required

1. If clone rollout policy changes from controlled to broader access, update entitlement truth first.
