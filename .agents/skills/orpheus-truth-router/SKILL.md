---
name: orpheus-truth-router
description: Use when a task touches product rules, docs/prd, pricing, packaging, lifecycle, billing, public promises, language boundaries, or any change that risks creating duplicate truth. Routes the task to the canonical Orpheus documents before editing.
---

# Orpheus Truth Router

## Goal

Pick the correct Orpheus source-of-truth documents before making changes, and prevent duplicate rule tables from spreading across the repo.

## Inputs

- User request
- Candidate files already mentioned by the request
- Current diff, if one exists

## Required read order

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/agent-conventions.md`
3. The canonical spec(s) for the topic
4. The relevant PRD summary section only after the canonical spec is understood

## Topic routing map

| Task signal | Canonical destination |
|---|---|
| pricing, package, plan, minutes, margin, top-up, overage, cost model | `docs/prd/specs/pricing-packaging-and-unit-economics.md` plus the pricing workbook |
| capability gating, SRT access, segment repair, clone access, plan matrix | `docs/prd/specs/capability-entitlements.md` |
| billing records, usage metering, compensation, retry billing, ledger meaning | `docs/prd/specs/billing-usage-semantics.md` |
| statuses, warnings, artifact manifest, retries, run meaning | `docs/prd/specs/project-run-lifecycle.md` |
| homepage promise, trials, landing pages, language boundary, public scope | `docs/prd/specs/distribution-and-growth-surface.md` |
| provider benchmark, public comparison, market check | `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md` plus execution docs if benchmark scope changes |
| MkSaaS ownership boundary | `docs/prd/specs/mksaas-boundary-contract.md` |
| automation, alerts, quality dashboard, ops taxonomy | `docs/prd/specs/quality-ops-and-automation.md` |

## Procedure

1. Classify the request as one of:
   - canonical rule change
   - summary-only sync
   - execution-plan change
   - benchmark/reference update
   - implementation-only change
2. Read only the canonical files needed for the affected topic cluster.
3. Name the canonical file(s) before editing.
4. Edit the canonical file first.
5. Update the PRD summary or execution docs only if they now disagree.
6. Never create a second complete rule table in a handoff note, benchmark note, or implementation memo.
7. If the task introduces a new high-risk topic with no canonical home, stop and propose the new canonical home before scattering rules elsewhere.

## Output

Return:

- the canonical file(s) chosen
- why they were chosen
- what downstream docs must be synced after the canonical edit
- any topics that must stay out of scope
