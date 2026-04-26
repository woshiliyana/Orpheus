# Phase 2 Live Smoke Evidence: Inworld Rafael Spanish Long Form

> Status: evidence captured
> Role: execution evidence
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/ops/phase2-live-smoke.md`, `/docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
> Last reviewed: 2026-04-25

## Purpose

Record the first successful Spanish long-form Inworld live-smoke run without committing raw provider artifacts or secrets.

## Run Summary

| Field | Value |
|---|---|
| `attempt_id` | `live-smoke-inworld-rafael-es-20260425-085002` |
| `provider` | `Inworld` |
| `model` | `inworld-tts-1.5-max` |
| `voice_id` | `Rafael` |
| `language` | `es` |
| `source_script` | `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/psicologia-maquiavelica-inteligencia-oscura.md` |
| `script_chars` | `28,543` local input chars |
| `account_billed_chars` | `28,852` provider account usage view |
| `run_outcome` | `success` |
| `chunk_count` | `18` |
| `stitch_count` | `17` |
| `retry_count` | `0` |
| `final_audio_duration_seconds` | `1,920.653` |
| `final_audio_duration_minutes` | `32.011` |
| `total_time_to_result_seconds` | `1,131.640` |
| `estimated_tts_cost_usd_local_rate_30` | `$0.856` |
| `actual_provider_rate_observed` | `$50 / 1M chars` |
| `actual_provider_cost_observed` | `$1.44` account spend for `28,852` chars |
| `decode_check` | `passed` |
| `silence_scan` | no `>=1.5s` silence detected at `-45dB` |

## Local Artifact Packet

These paths are local runtime evidence and must remain out of git:

| Artifact | Local path |
|---|---|
| stdout JSON paths | command output from `npm run narrate` |
| final audio | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/final.mp3` |
| artifact manifest | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/artifact-manifest.json` |
| metrics | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/metrics.json` |
| splice report | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/splice-report.json` |
| internal SRT draft | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/subtitles.srt` |
| word timings | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/word-timings.json` |

## Readiness Notes

| Topic | Verdict | Notes |
|---|---|---|
| Audio output | `ready` | The long-form Spanish audio completed, decoded cleanly, and produced the expected artifact packet. |
| Backend orchestration | `ready` | Hidden chunking completed `18` chunks with no retries and produced one stitched final output. |
| Seam quality | `needs human review` | Automated decode and long-silence checks passed, but subjective seam listening is still required. |
| Timing readiness | `warning` | Inworld returned timestamp tokens that include whitespace and punctuation, causing inflated `timestampCoveragePct` and spacing issues in the draft SRT. |
| Subtitle text fidelity | `warning` | Draft SRT is not publish-ready until token normalization removes whitespace / punctuation artifacts. |
| Pricing evidence | `warning` | The observed account rate is `$50 / 1M chars`, not the previous `$30 / 1M chars` local planning default. |

## Follow-Up

1. Update the pricing canonical spec and workbook so current testing uses the observed `$50 / 1M chars` account rate while still preserving Developer and Growth discount scenarios.
2. Normalize Inworld timestamp tokens before treating internal SRT output as subtitle-ready.
3. Run the matching English live-smoke evidence before claiming the current `EN + ES` first gate is ready.
