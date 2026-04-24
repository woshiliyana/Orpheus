---
name: orpheus-phase2-stable-audio
description: Use when implementing or testing the current Phase 2 stable long-form audio slice, including backend orchestration, provider integration, artifact persistence, EN plus ES readiness evidence, and the first build/test gate.
---

# Orpheus Phase 2 Stable Audio

## Goal

Build or test the smallest trustworthy slice that proves Orpheus can accept a long-form project, run backend-owned hidden orchestration, return downloadable final audio, and leave enough evidence to judge the `EN + ES` first gate.

## Mandatory reads

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/prd.md`
3. `docs/prd/specs/project-run-lifecycle.md`
4. `docs/prd/specs/capability-entitlements.md`
5. `docs/prd/specs/billing-usage-semantics.md`
6. `docs/prd/specs/pricing-packaging-and-unit-economics.md`
7. `docs/prd/specs/distribution-and-growth-surface.md`
8. `docs/prd/specs/quality-ops-and-automation.md`
9. `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
10. `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
11. `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`

## Current gate summary

Keep this exact boundary unless canonical docs change:

- English-first workspace
- stable narration is the first promised value
- `EN + ES` output/timing readiness is the first language gate
- `Inworld TTS 1.5 Max` is the primary path
- `Cartesia` is required in the same benchmark cycle
- backend-hidden chunking is allowed
- user-side manual chunking is not acceptable
- no public `SRT` export, no broad public pricing rollout, and no public no-login long-form trial in the first gate

## Required implementation behaviors

- The browser and public client must never call TTS, STT, or storage providers directly.
- One user-visible project must map to one canonical run history even if the backend fans out into many provider sub-requests.
- Successful runs must persist final audio plus an `artifact_manifest`.
- Alignment failure after audio success must land in the warning completion path, not full rerun failure semantics.
- Billing must charge audio only, not rebill the full project for alignment retry or repair follow-up.

## Required evidence

- one successful run artifact packet
- provider run logs for the frozen `EN + ES` corpus
- cost snapshot update
- one readiness summary for `EN + ES`
- one live-smoke packet before merge readiness when real provider behavior matters
- one go/hold/fallback recommendation

## Stop conditions

Invoke `$orpheus-doc-sync` instead of pushing ahead silently if:

- the stable envelope is narrower than current package/public truth
- one language is blocked for timing/output readiness
- lifecycle meaning changes
- cost evidence breaks the current packaging guardrail
