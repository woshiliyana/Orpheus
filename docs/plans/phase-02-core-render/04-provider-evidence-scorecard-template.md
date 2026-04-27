# Provider Evidence Scorecard Template

> Status: ready
> Role: execution template
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
> Last reviewed: 2026-04-26

## Purpose

Standardize the run-log fields, review notes, and memo outline used when comparing hosted providers for the frozen English-and-Spanish long-form feasibility gate. The canonical TTS UX readiness contract is `tts_ux_readiness_scorecard` in `/docs/prd/specs/quality-ops-and-automation.md`; this template only captures the execution fields needed to populate it.

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
| `requested_audio_format` | Yes | `mp3` or `wav` for the current implementation; additional provider-native formats require a separate product decision |
| `audio_format_source` | Yes | `provider_native`, `transcoded_from_mp3`, or `derived_from_master` |
| `observed_audio_container` | Yes when audio exists | Container detected from the final asset, such as `mp3` or `wav` |
| `observed_audio_codec` | Yes when audio exists | Codec / encoding detected from the final asset, such as MP3 or Linear PCM |
| `sample_rate_hertz` | Yes when audio exists | Final asset sample rate, or `unknown` if the probe cannot determine it |
| `bitrate_bps` | Yes when compressed audio exists | Required for MP3; product default target is `>=192000`; use `not_applicable` for uncompressed PCM |
| `final_audio_file_size_bytes` | Yes when audio exists | Needed for storage and delivery judgment |
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
| `audio_format_verdict` | Yes | `ready_for_internal_master`, `ready_for_delivery`, `ready_for_export`, `hold_for_export`, or `blocked`, with reason in notes |
| `audio_format_notes` | Yes | Commercial delivery judgment, internal-master judgment, whether the format is provider-native or derived, and any storage / download concern |
| `tts_ux_scorecard_version` | Yes | Review date or version of the canonical `tts_ux_readiness_scorecard` |
| `hard_gate_verdict` | Yes | `ready`, `warning`, `blocked`, `manual_required`, `unknown`, or `blocked_by_missing_evidence` before weighted scoring |
| `weighted_score` | No | Allowed only when hard gates and required evidence coverage pass |
| `final_evaluation_artifact` | Yes | Path to `final-evaluation.json` or an equivalent retrospective evaluation note |
| `missing_evidence_summary` | Yes | Short list of absent artifacts or reviews; do not drop missing dimensions from the scorecard |
| `evidence_artifact_path` | Yes | Merge-tracked evidence packet path, not only a disposable `runs/` path |
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
| Audio format | Is the tested format appropriate for user delivery, internal master use, both, or neither? |
| Orchestration cost | Did hidden chunking remain implementation-worthy after chunk / stitch / retry overhead? |
| Timing credibility | Are provider timestamps useful, and are internal alignment assets credible against final audio in both English and Spanish? |
| Language readiness | Do English and Spanish both have enough evidence to support the planned first-gate claim? |
| Subtitle text quality | Would a founder trust the first subtitle draft enough to keep iterating on this path? |
| Commercial viability | Does observed cost still fit the current pricing envelope? |
| UX readiness gates | Do hard gates and required evidence coverage pass before anyone reads the weighted score? |

## Memo Outline

1. `Summary`: which provider currently leads and why
2. `Envelope`: what single-project duration looks honestly supportable right now
3. `Language readiness`: English and Spanish output / timing verdicts
4. `Audio format`: recommended master format, default delivery format, and whether WAV export stays held
5. `Quality`: seam behavior, drift, timing credibility, subtitle-text-fidelity risk
6. `Economics`: observed cost per completed minute and any fallback / retry concern
7. `TTS UX readiness`: final verdict from the canonical scorecard, missing evidence, and any manual review still required
8. `Decision`: `go`, `hold`, or `fallback` plus the next action

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
4. Audio-format verdicts are present for both default delivery and production-master candidates before the memo recommends a product format.
5. The evidence artifact path resolves to a packet that survives worktree cleanup and is included in the merge.
6. The row records hard-gate status and missing evidence before any weighted score is used.
7. The memo can be written directly from the scorecard without reopening raw provider logs.

## Execution Notes

1. Keep the scorecard boring and consistent; this is evidence, not marketing.
2. Use the exact lifecycle enums from the canonical spec.
3. If a field is missing, record `unknown` and create a backfill action instead of silently dropping it.
4. The workbook is a required planning companion for the scenario table, but it is not canonical truth. If the workbook and markdown notes disagree, reconcile them in the same change instead of letting both stand.
5. Do not copy the fixed TTS UX dimension table into this template. Link to `/docs/prd/specs/quality-ops-and-automation.md` and record per-run coverage only.
