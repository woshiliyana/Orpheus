# Phase 2 Live Smoke Evidence: Inworld Rafael Spanish Long Form

> Status: evidence captured
> Role: execution evidence
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/ops/phase2-live-smoke.md`, `/docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
> Last reviewed: 2026-04-25

## Purpose

Record the first successful Spanish long-form Inworld live-smoke run with a merge-tracked packet containing selected non-secret artifacts.

## Run Summary

| Field | Value |
|---|---|
| `attempt_id` | `live-smoke-inworld-rafael-es-20260425-085002` |
| `provider` | `Inworld` |
| `model` | `inworld-tts-1.5-max` |
| `voice_id` | `Rafael` |
| `language` | `es` |
| `requested_audio_format` | `mp3` |
| `audio_format_source` | `provider_native` for `final.mp3`; `transcoded_from_mp3` for `final.transcoded-from-mp3.wav` |
| `large_artifact_policy` | `manifest_only` for the 162MB WAV derivative; commercial delivery WAV belongs in product storage, not GitHub |
| `source_script` | `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/psicologia-maquiavelica-inteligencia-oscura.md` |
| `source_script_project_copy` | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/source-script.md` |
| `source_file_chars` | `29,047` preserved source-file chars |
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
| `audio_format_verdict` | `ready_for_delivery` for `MP3` container/decode evidence; commercial-default bitrate was not recorded, and no `WAV` / Linear PCM verdict comes from this run |
| `source_script_sha256` | `e05dc641be297947f4d0fd3eab4583699d6d0a671db73ee2821fa41569d78567` |
| `recovered_mp3_sha256` | `459631cd70f1a27b179e031c6067b0a00203d688172b2bf0ba50295bca4fd504` |
| `transcoded_wav_sha256` | `b728d9c549f71b624b6bd0ba5b922f3f6d3363a8beee46515381df69f528d6b5` |

## Local Artifact Packet

These paths are local runtime evidence and must remain out of git:

| Artifact | Local path |
|---|---|
| original source script | `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/psicologia-maquiavelica-inteligencia-oscura.md` |
| stdout JSON paths | command output from `npm run narrate` |
| final audio | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/final.mp3` |
| recovered local final audio | `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/音频/final.mp3` |
| transcoded WAV derivative | `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/音频/final.transcoded-from-mp3.wav` (`169,397,164` bytes, 44.1kHz mono `pcm_s16le`) |
| artifact manifest | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/artifact-manifest.json` |
| metrics | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/metrics.json` |
| splice report | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/splice-report.json` |
| internal SRT draft | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/subtitles.srt` |
| word timings | `/Volumes/woshiliyana/mycodeprojects/orpheus-wt-live-smoke-evidence/runs/live-smoke/live-smoke-inworld-rafael-es-20260425-085002/artifacts/word-timings.json` |

## Promoted Evidence Packet

The selected evidence files are now copied into the repo evidence-artifact tree so they can merge with the workstream and survive worktree cleanup. The 162MB WAV derivative is retained as a manifest-only large artifact because it exceeds GitHub's normal Git file limit and is not provider-native WAV quality evidence.

| Artifact | Project path |
|---|---|
| evidence packet | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/` |
| source script snapshot | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/source-script.md` |
| final MP3 | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/final.mp3` |
| large artifact manifest | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/large-artifacts.manifest.json` |
| packet note | `docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/README.md` |

The original channel-directory copies remain in place and are not the same as the repo-retained evidence packet.

## Readiness Notes

| Topic | Verdict | Notes |
|---|---|---|
| Audio output | `ready` | The long-form Spanish audio completed, decoded cleanly, and produced the expected artifact packet. |
| Backend orchestration | `ready` | Hidden chunking completed `18` chunks with no retries and produced one stitched final output. |
| Seam quality | `needs human review` | Automated decode and long-silence checks passed, but subjective seam listening is still required. |
| Timing readiness | `warning` | Inworld returned timestamp tokens that include whitespace and punctuation, causing inflated `timestampCoveragePct` and spacing issues in the draft SRT. |
| Subtitle text fidelity | `warning` | Draft SRT is not publish-ready until token normalization removes whitespace / punctuation artifacts. |
| Audio format | `ready_for_delivery` | The `MP3` output decoded cleanly and is acceptable as comparable delivery evidence for this smoke. This run does not validate the `>=192 kbps` commercial-default target or `WAV` / Linear PCM as a production master. |
| WAV derivative | `hold_for_export` | A zero-provider-cost WAV derivative was created from the existing MP3 at the recovered local audio path. It validates packaging/download feasibility only; it does not improve source quality and must not be treated as provider-native WAV evidence. |
| Pricing evidence | `warning` | The observed account rate is `$50 / 1M chars`, not the previous `$30 / 1M chars` local planning default. |

## Follow-Up

1. Update the pricing canonical spec and workbook so current testing uses the observed `$50 / 1M chars` account rate while still preserving Developer and Growth discount scenarios.
2. Normalize Inworld timestamp tokens before treating internal SRT output as subtitle-ready.
3. Run the matching English live-smoke evidence before claiming the current `EN + ES` first gate is ready.
4. For future provider-backed tests, promote the evidence packet into the branch before merge so worktree cleanup does not delete the only artifact copy.
