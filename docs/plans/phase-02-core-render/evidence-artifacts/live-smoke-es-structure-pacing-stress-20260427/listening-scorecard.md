# ES Structure Pacing Stress Listening Scorecard

Use this file for paired human review of the ES / Rafael structure-stress pair.

## ES / Rafael

| Dimension | Score / Verdict | Notes |
|---|---|---|
| `pacing_naturalness` | pending | Compare `natural_basic` against `exact` on headings, paragraph breaks, and list items. |
| `content_preservation` | machine pass | Confirm by listening that no audible word changes occurred. |
| `publishability` | pending | `ready`, `warning`, or `blocked`. |
| `natural_basic_vs_exact` | pending | `better`, `same`, or `worse`. |

## Decision Rule

If `natural_basic` clearly beats `exact` on this Spanish structure-heavy script, it supports keeping `natural_basic` as the default for structured `EN + ES` narration. If it does not, keep `exact` available and record language-specific caution before changing product-facing defaults.
