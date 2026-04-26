# Provider Evidence Scorecard Template

> Status: ready
> Role: execution template
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
> Last reviewed: 2026-04-23

## Purpose

Standardize the run-log fields, review notes, and memo outline used when comparing hosted providers for the frozen English-and-Spanish long-form feasibility gate.

## Scorecard Row Schema

| Field | Required | Notes |
|---|---|---|
| `script_id` | Yes | `en-control-short`, `en-control-medium`, `en-control-long`, `es-control-short`, `es-control-medium`, or `es-control-long` |
| `language` | Yes | `en` or `es` |
| `provider` | Yes | `Inworld` or `Cartesia` for the first gate |
| `voice_id` | Yes | Exact tested voice |
| `attempt_id` | Yes | Stable per-run identifier |
| `duration_band` | Yes | short / ~20 / ~30 |
| `input_chars` | Yes | Frozen corpus reference value |
| `chunk_count` | Yes if orchestrated | Hidden orchestration evidence |
| `stitch_count` | Yes if orchestrated | Hidden orchestration evidence |
| `retry_count` | Yes | Total retry attempts absorbed by backend |
| `run_outcome` | Yes | success / warning / failure |
| `failure_stage` | Yes when failed | Must use lifecycle enum |
| `final_audio_duration_seconds` | Yes when audio exists | Billable reference |
| `time_to_first_audio_seconds` | Optional | Useful when streamed or chunked |
| `total_time_to_result_seconds` | Yes | End-to-end latency |
| `effective_cost_usd` | Yes | Include retries and non-audio support path |
| `output_readiness` | Yes | `ready` / `warning` / `blocked` for the tested language |
| `timing_readiness` | Yes | `ready` / `warning` / `blocked` for the tested language |
| `timing_readiness_notes` | Yes | Whether timing is subtitle-ready enough to keep the path alive |
| `seam_notes` | Yes for long-form | Audible joins, drift, or notable artifacts |
| `provider_timestamp_usefulness` | Yes | Helpful / weak / unusable with short note |
| `alignment_asset_status` | Yes | success / warning / failure |
| `subtitle_text_fidelity_notes` | Yes | Normalization drift, wording mismatch, readability risk |
| `decision_flag` | Yes | keep testing / viable / hold / reject |

## Required Scenario Table

Use one companion scenario table per benchmark packet so pricing review stays comparable with the workbook.

| Scenario | Required | Notes |
|---|---|---|
| `scenario_id` | Yes | `primary-current-account`, `discounted-provider-tier`, `fallback-higher-cost`, or `second-provider` |
| `provider` | Yes | Usually `Inworld` or `Cartesia` in the first cycle |
| `language_scope` | Yes | `en`, `es`, or `en+es` depending on the scenario |
| `effective_cost_per_completed_audio_minute_usd` | Yes | Should match the workbook assumptions or explain drift |
| `retry_overhead_note` | Yes | Include material retry or stitch amplification |
| `gross_margin_estimate` | Yes | Compare against the current markdown guardrail and name the provider tier used |
| `package_verdict` | Yes | keep / tighten / block |
| `notes` | Yes | State what changed and why |

## Review Rubric

| Topic | Minimum question |
|---|---|
| Stable audio | Did the output complete without catastrophic drift or unusable audio? |
| Orchestration cost | Did hidden chunking remain implementation-worthy after chunk / stitch / retry overhead? |
| Timing credibility | Are provider timestamps useful, and are internal alignment assets credible against final audio in both English and Spanish? |
| Language readiness | Do English and Spanish both have enough evidence to support the planned first-gate claim? |
| Subtitle text quality | Would a founder trust the first subtitle draft enough to keep iterating on this path? |
| Commercial viability | Does observed cost still fit the current pricing envelope? |

## Memo Outline

1. `Summary`: which provider currently leads and why
2. `Envelope`: what single-project duration looks honestly supportable right now
3. `Language readiness`: English and Spanish output / timing verdicts
4. `Quality`: seam behavior, drift, timing credibility, subtitle-text-fidelity risk
5. `Economics`: observed cost per completed minute and any fallback / retry concern
6. `Decision`: `go`, `hold`, or `fallback` plus the next action

## Out of Scope

1. Public pricing-page copy
2. Final subtitle-export UX
3. Long-term multilingual expansion claims

## Backfill Required

1. If the row schema discovers a missing lifecycle or quality field, backfill the canonical spec before broad testing continues.
2. If the memo conclusion changes the supported envelope or pricing viability, update the related truth docs in the same change set.

## Validation

1. Every representative run produces one scorecard row.
2. Every provider gets a comparable row set across the same frozen `EN + ES` corpus.
3. The scenario table stays reconcilable with `/docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx`.
4. The memo can be written directly from the scorecard without reopening raw provider logs.

## Execution Notes

1. Keep the scorecard boring and consistent; this is evidence, not marketing.
2. Use the exact lifecycle enums from the canonical spec.
3. If a field is missing, record `unknown` and create a backfill action instead of silently dropping it.
4. The workbook is a required planning companion for the scenario table, but it is not canonical truth. If the workbook and markdown notes disagree, reconcile them in the same change instead of letting both stand.
