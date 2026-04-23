---
name: orpheus-change-verification
description: Use before handoff, patch creation, or PR submission. Reviews Orpheus changes against current truth, verifies that checks were run where possible, and catches silent scope drift or missing doc backfills.
---

# Orpheus Change Verification

## Goal

Catch correctness, scope, and documentation problems before the change is handed back.

## Review inputs

- current diff
- task request
- touched canonical docs
- touched execution docs
- any benchmark or workbook updates
- any test/check output already produced

## Verification steps

1. Review the diff against the original request.
2. Review the diff against the touched canonical docs.
3. Check for duplicate truth:
   - no second complete rule table in a non-canonical file
   - no stale PRD summary contradicting the spec
4. Check Orpheus invariants:
   - provider calls remain server-owned
   - hidden chunking remains backend-owned
   - successful runs persist `artifact_manifest`
   - `audio success + alignment failure` still resolves to warning-bearing completion semantics
   - pricing/package claims still match current cost truth
   - public promise still matches the documented gate
5. For code changes:
   - inspect the real repo for available commands
   - run relevant checks that actually exist
   - if the repo does not yet contain runnable checks for that area, say so directly instead of inventing commands
6. For docs changes:
   - confirm canonical-first edit order
   - confirm required downstream sync happened
   - confirm wording does not quietly broaden language, pricing, or rollout promises

## Output

Return:

- blockers
- non-blocking risks
- missing checks
- missing doc sync
- ready / not-ready verdict
