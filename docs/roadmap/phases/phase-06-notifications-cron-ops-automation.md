# Phase 6: Notifications, Cron, and Ops Automation

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/quality-ops-and-automation.md`
> Last reviewed: 2026-04-22

## Goal

Establish the automated messaging and operational task system defined by the canonical automation taxonomy: transactional notifications, marketing automation, service-side reminders, ops alerts, and scheduled quality tasks.

## Why This Phase Comes Here

Notifications and automation are part of the real product and operating system, but they should be wired after workflow, quality, and billing semantics are trustworthy.

## Tracks Involved

- QualityOps
- Workflow
- Experience

## Entry Criteria

1. Workflow states and billing events are stable enough to trigger messages.
2. Risk and entitlement systems exist.

## In-Phase Focus

1. Transactional notifications:
   - generation complete
   - generation failed
   - quota reminders
   - subscription reminders
   - risk/verification notices
2. Service-side reminders and internal alerts:
   - quality anomalies
   - failed batch evaluations
   - stuck runs
   - retry attention queues
3. Marketing automation:
   - welcome
   - onboarding
   - activation
   - reactivation
   - upgrade nudges
4. Cron job catalog and ownership aligned to the canonical automation taxonomy

## Parallel Guidance

1. Ops alerts and user messaging can run in parallel.
2. Marketing automation should not ship ahead of stable transactional triggers.

## Exit Criteria

1. Transactional and marketing automation share one clear system design.
2. Scheduled tasks are cataloged and controlled.
3. Ops has automated reminders for quality and workflow anomalies.

## Deliverables

1. Notification architecture
2. Cron-backed automation catalog
3. Service-side and user-facing reminder coverage

## Backfill Required

1. If a notification implies a new user promise or billing behavior, update the PRD truth docs first.
