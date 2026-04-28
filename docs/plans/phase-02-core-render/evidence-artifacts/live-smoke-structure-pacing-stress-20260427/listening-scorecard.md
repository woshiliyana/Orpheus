# Structure Pacing Stress Listening Scorecard

Use this file for paired human review of the EN / Ashley structure-stress pair.

## EN / Ashley

| Dimension | Score / Verdict | Notes |
|---|---|---|
| `pacing_naturalness` | pending | Compare `natural_basic` against `exact` on headings, paragraph breaks, and list items. |
| `content_preservation` | machine pass | Confirm by listening that no audible word changes occurred. |
| `publishability` | pending | `ready`, `warning`, or `blocked`. |
| `natural_basic_vs_exact` | pending | `better`, `same`, or `worse`. |

## Decision Rule

If `natural_basic` does not clearly beat `exact` on this structure-heavy script, return the default pacing recommendation to `exact` and keep `natural_basic` optional or experimental.
