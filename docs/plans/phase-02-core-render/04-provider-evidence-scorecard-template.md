# Provider Evidence Scorecard Template

> Status: ready
> Role: execution template
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
> Last reviewed: 2026-04-23

## Purpose

Standardize the run-log fields, review notes, and memo outline used when comparing hosted providers for the long-form feasibility gate.

## Scorecard Row Schema

| Field | Required | Notes |
|---|---|---|
| `script_id` | Yes | `control-short`, `control-medium`, or `control-long` |
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
| `seam_notes` | Yes for long-form | Audible joins, drift, or notable artifacts |
| `provider_timestamp_usefulness` | Yes | Helpful / weak / unusable with short note |
| `alignment_asset_status` | Yes | success / warning / failure |
| `subtitle_text_fidelity_notes` | Yes | Normalization drift, wording mismatch, readability risk |
| `decision_flag` | Yes | keep testing / viable / hold / reject |

## Review Rubric

| Topic | Minimum question |
|---|---|
| Stable audio | Did the output complete without catastrophic drift or unusable audio? |
| Orchestration cost | Did hidden chunking remain implementation-worthy after chunk / stitch / retry overhead? |
| Timing credibility | Are provider timestamps useful, and are internal alignment assets credible against final audio? |
| Subtitle text quality | Would a founder trust the first subtitle draft enough to keep iterating on this path? |
| Commercial viability | Does observed cost still fit the current pricing envelope? |

## Memo Outline

1. `Summary`: which provider currently leads and why
2. `Envelope`: what single-project duration looks honestly supportable right now
3. `Quality`: seam behavior, drift, timing credibility, subtitle-text-fidelity risk
4. `Economics`: observed cost per completed minute and any fallback / retry concern
5. `Decision`: `go`, `hold`, or `fallback` plus the next action

## Out of Scope

1. Public pricing-page copy
2. Final subtitle-export UX
3. Long-term multilingual expansion claims

## Backfill Required

1. If the row schema discovers a missing lifecycle or quality field, backfill the canonical spec before broad testing continues.
2. If the memo conclusion changes the supported envelope or pricing viability, update the related truth docs in the same change set.

## Validation

1. Every representative run produces one scorecard row.
2. Every provider gets a comparable row set across the same frozen corpus.
3. The memo can be written directly from the scorecard without reopening raw provider logs.

## Execution Notes

1. Keep the scorecard boring and consistent; this is evidence, not marketing.
2. Use the exact lifecycle enums from the canonical spec.
3. If a field is missing, record `unknown` and create a backfill action instead of silently dropping it.
