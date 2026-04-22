# Phase 4: SRT + Segment Repair

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`
> Last reviewed: 2026-04-22

## Goal

Complete the creator workflow by adding exportable SRT, segment preview, and segment repair on top of the stable full-render path.

## Why This Phase Comes Here

SRT and repair are essential to real creator workflow, but they should ride on stable lifecycle and quality observation instead of becoming the very first moving pieces.

## Tracks Involved

- Workflow
- Experience
- QualityOps

## Entry Criteria

1. Core render workflow is stable.
2. Quality dashboard baseline exists.

## In-Phase Focus

1. SRT pipeline and export
2. Segment preview UX
3. Segment repair workflow
4. Repair-specific run tracking
5. Repair-specific usage metering
6. Quality observation for repair and SRT outcomes

## Parallel Guidance

1. SRT export and segment preview can run together.
2. Repair metering must stay coordinated with billing semantics.

## Exit Criteria

1. Entitled users can export SRT.
2. Entitled users can repair selected segments without rerunning full projects.
3. Repair usage is tracked separately and correctly.

## Deliverables

1. SRT-enabled workflow
2. Segment repair experience
3. Repair-aware lifecycle and quality reporting

## Backfill Required

1. Any change to repair gating or metering must be reflected in the entitlement or billing truth docs before release.
