# Orpheus V1 Roadmap

> Status: active
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/source-of-truth-index.md`
> Last reviewed: 2026-04-23

## Purpose

This roadmap is the execution-order source of truth for Orpheus V1. It defines what gets built first, what can run in parallel, and what milestones must be met before the next phase begins. It does not define product rules; all product semantics still live under `docs/prd/`.

## Operating Rules

1. `docs/prd/` remains the only product and rule truth system.
2. `docs/roadmap/` owns implementation sequencing and milestone logic only.
3. `docs/plans/` owns work-package execution plans only.
4. If a phase uncovers a new business rule, update `docs/prd/` first, then roadmap/plans, then implement.

## Core Tracks

| Track | Purpose | Why it is first-class |
|---|---|---|
| `Experience` | Brand, visual system, front-end UI/UX, project-facing flows | User experience is part of the product, not a packaging layer |
| `Workflow` | Render pipeline, projects/runs, SRT, repair, entitlement, billing | This is the core value chain users pay for |
| `QualityOps` | TTS/voice/long-audio/SRT evaluation, dashboards, ops visibility, alerts | Product quality must be measured and operated continuously |

## Phase Summary

| Phase | Primary goal | Why it is here | Tracks involved | Parallel guidance | Detail |
|---|---|---|---|---|---|
| `Phase 0` | Freeze truth system and lock the educational-explainer audio wedge | Prevents semantic drift before feasibility work starts | Experience, Workflow, QualityOps | Mostly sequential | [phase-00-truth-freeze-quality-scorecard](./phases/phase-00-truth-freeze-quality-scorecard.md) |
| `Phase 1` | Launch minimal experience shell and product framing | UX and shell should exist, but public promises must stay inside the feasibility envelope | Experience, Workflow | Shell work can run in parallel with technical spike prep | [phase-01-experience-foundation-platform-shell](./phases/phase-01-experience-foundation-platform-shell.md) |
| `Phase 2` | Prove hosted long-form audio feasibility and core render workflow | First real product value is stable long-form audio generation without user-side manual chunking | Workflow, Experience | Limited parallelism; keep project/run semantics unified | [phase-02-core-render-workflow](./phases/phase-02-core-render-workflow.md) |
| `Phase 3` | Stand up QualityOps baseline and live quality dashboard | Quality measurement cannot wait until final hardening | QualityOps, Workflow | Can overlap with workflow stabilization, not with truth changes | [phase-03-qualityops-baseline](./phases/phase-03-qualityops-baseline.md) |
| `Phase 4` | Add SRT export and segment repair | Full creator workflow needs repair and subtitle support | Workflow, Experience, QualityOps | Can overlap with dashboard refinements | [phase-04-srt-segment-repair](./phases/phase-04-srt-segment-repair.md) |
| `Phase 5` | Add entitlements, guest trial, billing, and risk | Commercial gating should ride on stable workflow semantics | Workflow, QualityOps | Billing and risk stay tightly coupled | [phase-05-entitlements-guest-trial-billing-risk](./phases/phase-05-entitlements-guest-trial-billing-risk.md) |
| `Phase 6` | Add notifications, cron, and ops automation | Messaging and reminders are part of real operations | QualityOps, Workflow, Experience | Split ops alerts and marketing automation, but keep one system view | [phase-06-notifications-cron-ops-automation](./phases/phase-06-notifications-cron-ops-automation.md) |
| `Phase 7` | Expand multilingual SEO and public growth surface | Broad public growth comes after audio stability, billing, and later workflow layers are already grounded | Experience, Workflow | Can fan out across locales once core truth is stable | [phase-07-public-site-seo-localized-growth](./phases/phase-07-public-site-seo-localized-growth.md) |
| `Phase 8` | Expand controlled clone beta and harden quality | Clone rollout comes after stable quality, billing, and ops | Workflow, QualityOps | Keep clone changes isolated from unrelated growth work | [phase-08-controlled-clone-quality-hardening](./phases/phase-08-controlled-clone-quality-hardening.md) |

## Global Gates

1. No phase may redefine a business rule that already belongs to `docs/prd/specs/`.
2. No phase may move public pricing or entitlement promises ahead of real capability support.
3. `QualityOps` is a product system. The live quality dashboard must exist before broad public rollout.
4. `Notifications/Cron` is an operating system, not a post-launch convenience layer.

## Delivery Defaults

1. Phase docs define milestones.
2. Work-package plans live in `docs/plans/`.
3. Any active implementation should point back to:
   - this roadmap
   - the relevant phase doc
   - the relevant PRD/specs truth docs
