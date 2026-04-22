# Plans Library

> Status: active
> Role: execution planning
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/`, `/docs/roadmap/roadmap.md`
> Last reviewed: 2026-04-22

## Purpose

This library stores work-package plans used to execute roadmap phases. It is not allowed to define product rules. Plans are informative for execution and must point back to the truth docs in `docs/prd/`.

## Relationship to Other Doc Systems

| System | Owns |
|---|---|
| `docs/prd/` | Product and rule truth |
| `docs/roadmap/` | Phase order, milestones, and sequencing truth |
| `docs/plans/` | Work-package execution plans |

## Status Flow

1. `draft`
2. `ready`
3. `active`
4. `blocked`
5. `completed`
6. `archived`

## Library Rules

1. Every plan is informative for execution, not normative for product rules.
2. Every plan must include:
   - `Depends on truth docs`
   - `Backfill required`
   - `Out of scope`
   - `Validation`
   - `Execution notes`
3. If a plan discovers a missing business rule:
   - update `docs/prd/` first
   - update roadmap/plans second
   - implement third
4. One work-package plan = one clear implementation slice.
5. Do not mix unrelated semantic domains in the same plan.

## File Layout

```text
docs/plans/
  README.md
  templates/
    work-package-template.md
  phase-00-truth-freeze/
  phase-01-foundation/
  phase-02-core-render/
  phase-03-qualityops/
  phase-04-srt-repair/
  phase-05-billing-risk/
  phase-06-notifications-automation/
  phase-07-public-site-growth/
  phase-08-clone-hardening/
```

## Naming Rules

1. Put work-package plans in the matching phase directory.
2. Use filename format: `NN-short-name.md`
3. Examples:
   - `01-brand-ux-shell.md`
   - `02-platform-foundation.md`
   - `03-quality-dashboard-v1.md`

## Roadmap-to-Plan Directory Map

| Roadmap phase | Plan directory |
|---|---|
| `Phase 0: Truth Freeze + Quality Scorecard` | `docs/plans/phase-00-truth-freeze/` |
| `Phase 1: Experience Foundation + Platform Shell` | `docs/plans/phase-01-foundation/` |
| `Phase 2: Core Render Workflow` | `docs/plans/phase-02-core-render/` |
| `Phase 3: QualityOps Baseline` | `docs/plans/phase-03-qualityops/` |
| `Phase 4: SRT + Segment Repair` | `docs/plans/phase-04-srt-repair/` |
| `Phase 5: Entitlements + Guest Trial + Billing + Risk` | `docs/plans/phase-05-billing-risk/` |
| `Phase 6: Notifications, Cron, and Ops Automation` | `docs/plans/phase-06-notifications-automation/` |
| `Phase 7: Public Site, SEO, and Localized Growth Surface` | `docs/plans/phase-07-public-site-growth/` |
| `Phase 8: Controlled Clone + Quality Hardening` | `docs/plans/phase-08-clone-hardening/` |

## Backfill Rules

1. Execution status, task slicing, and delivery notes live in `docs/plans/`.
2. New product rules, field ownership, gating logic, and lifecycle definitions must be backfilled to `docs/prd/`.
3. If a plan closes a roadmap milestone, update the roadmap phase state in the same change set.
