---
name: orpheus-doc-sync
description: Use when implementation, benchmark evidence, or a discovered mismatch means the Orpheus docs must be synchronized. Updates canonical truth first, then summaries and execution docs, without leaving stale promises behind.
---

# Orpheus Doc Sync

## Goal

Backfill the documentation correctly when implementation or benchmark evidence changes the real meaning of the system.

## Trigger examples

- stable-audio envelope is narrower than current truth
- `EN + ES` gate changes
- provider cost changes package viability
- lifecycle or warning semantics change
- entitlement boundaries change
- rollout or landing-page promises change
- MkSaaS boundary assumptions change

## Procedure

1. Identify whether the change is:
   - canonical rule change
   - summary sync
   - execution-doc sync
   - benchmark/reference refresh
2. Update the canonical doc first.
3. If a canonical topic was renamed or added, update `docs/prd/source-of-truth-index.md`.
4. Update the PRD summary sections that now disagree.
5. Update execution docs if they now contradict truth:
   - feasibility spike
   - development-entry checklist
   - agent build/test brief
   - provider scorecard template
6. Run a term scan across the relevant `docs/prd/` and `docs/plans/` files to find stale wording.
7. State explicitly what was intentionally left unchanged.

## Mandatory special cases

- If pricing/package economics change materially, update the pricing spec and workbook in the same change.
- If public language or readiness promises change, update the distribution spec and the benchmark/brief docs in the same change.
- If lifecycle semantics change, update the lifecycle spec before downstream implementation guidance.

## Output

Return:

- canonical docs changed
- summary docs changed
- execution docs changed
- remaining follow-up docs, if any
