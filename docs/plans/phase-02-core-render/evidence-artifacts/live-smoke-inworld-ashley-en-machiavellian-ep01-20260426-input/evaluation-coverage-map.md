# Evaluation Coverage Map

> Status: post-run coverage review
> Role: evaluation coverage map
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`, `/docs/ops/phase2-live-smoke.md`
> Last reviewed: 2026-04-27

## Summary

This English pressure run covers the machine-observable side of `audio_generation_smoke` for the Inworld provider-native WAV path, plus local MP3 delivery-derivative evidence. It cannot, by itself, complete the broader `product_readiness_evaluation` or the full `EN + ES` first gate.

Post-run result: the first provider-native WAV attempt failed with `terminated` after `6 / 21` chunks. After adding resumable chunk reuse and transient error evidence, the resumed run completed `21 / 21` chunks, stitched `final.wav`, generated timing/subtitle assets, and derived a local `192kbps` MP3 without a second provider-native MP3 request.

## Run Inputs

| Field | Value |
|---|---|
| Provider | `inworld` |
| Voice | `Ashley` |
| Language | `en` |
| Source script | `source-script.md` |
| Input words | `6,004` by `wc`, `5,895` word-like tokens |
| Input characters | `35,394` |
| Duration estimate | `~39.5 min` at `900 chars/min` |
| Planned chunks | `21` with default `500-1900` char bounds |
| Single paid provider format | provider-native `wav` |
| Local delivery derivative | `mp3` derived from provider-native WAV at `192kbps` target |
| Evaluation posture | English over-30 pressure validation, not full `EN + ES` gate completion |

## Coverage By Fixed Scorecard Dimension

| Dimension | Can this run evaluate it? | Coverage after run | Required artifact or review |
|---|---|---|---|
| `run_integrity` | Yes | Covered for resumed English smoke | stdout JSON, `artifact-manifest.json`, `metrics.json` |
| `user_task_success` | Partially | Covered for local English audio generation; user-facing delivery path remains out of this CLI smoke | final audio plus manual usability note |
| `script_profile` | Yes | Covered pre-run | `source-script.md`, `source-input.manifest.json` |
| `cost_viability` | Partially | Estimated for this provider run; commercial package verdict still needs pricing snapshot context | `metrics.json`, provider rate env, pricing note |
| `latency_ux` | Partially | Covered for resumed/cache run timing; original end-to-end user wait and TTFB are not fully emitted | `metrics.json` |
| `perceptual_quality` | Manual required | Not covered by machine artifacts alone | human listening review / MOS-style note |
| `text_fidelity` | Manual or post-processing required | Provider word timings help, but source-vs-audio fidelity needs ASR diff or listen-through | ASR diff or human review |
| `pronunciation_control` | Manual required | Not covered by machine artifacts alone | pronunciation / accent review note |
| `long_form_stability` | Yes | Covered for this over-30 English run; manual drift/listen-through remains required before broader readiness | final audio, duration, warnings, manual drift note |
| `stitch_quality` | Manual required | Machine splice report exists, audible seam judgment still requires listening | `splice-report.json`, seam-quality note |
| `subtitle_readiness` | Partially | Word timings, SRT, and VTT were generated; timing QA and subtitle text fidelity still require review | `word-timings.json`, `subtitles.srt`, `subtitles.vtt`, timing QA note |
| `audio_technical_qc` | Covered for decode/probe | WAV and MP3 decode with expected codec/sample-rate/bitrate metadata; mastering judgment remains manual | `audio-probe-metadata.json`, volumedetect notes |
| `format_platform_delivery` | Covered for technical format verdicts | Provider-native WAV is an internal-master candidate; derived MP3 meets the delivery bitrate target; public WAV export remains held | audio probe metadata, format verdict note |
| `repair_recovery_ux` | Yes | Covered for resumable backend-owned recovery after the failed first pass | warning/recovery note |
| `competitive_benchmark` | No | Out of scope for this single Inworld English run | Cartesia/market reference run or memo |
| `trust_compliance` | Partially | Source retention and credential hygiene can be reviewed; content-rights/safety signoff remains manual | packet review note |
| `final_verdict` | Yes for `audio_generation_smoke`; no for product readiness | Must separate smoke verdict from broader readiness | `final-evaluation.json` or retrospective note |

## Expected Machine Artifacts

The current pipeline can produce these on a successful run:

| Artifact | Purpose |
|---|---|
| `final.wav` | Provider-native source / production-master candidate |
| `final.derived-from-provider-wav.mp3` | Locally derived default-delivery candidate |
| `artifact-manifest.json` | Run lineage, provider summary, orchestration, billing, alignment refs |
| `metrics.json` | chunk count, retry count, wall time, duration, timestamp coverage, estimated cost |
| `splice-report.json` | segment durations and stitch offsets |
| `word-timings.json` | normalized provider-native word timings |
| `subtitles.srt` / `subtitles.vtt` | internal subtitle-readiness artifacts |

## Format Evaluation Plan

| Format path | Run now? | What it proves | What it does not prove |
|---|---|---|---|
| Provider-native WAV | Yes, single paid provider run | Long-form generation, stitch, timing, subtitle artifacts, Linear PCM / source-master posture | MP3 delivery bitrate / compatibility until a local MP3 derivative is created and probed |
| MP3 derived from provider-native WAV | Yes, local post-process | Default delivery packaging, bitrate target, broad compatibility, download handling without a second provider charge | Separate provider-native MP3 quality |
| WAV derived from MP3 | No | Only packaging / download handling if ever needed | Higher source quality, Linear PCM source quality, production-master readiness |

## Required Manual Or Post-Run Notes

1. Seam / splice listening note.
2. Perceptual quality and fatigue note for the full over-30-minute output.
3. Pronunciation and name handling note.
4. Text-fidelity note, ideally with ASR diff if available.
5. Timing / subtitle-readiness note against final audio.
6. Audio probe note covering container, codec, sample rate, bitrate when applicable, file size, and decode integrity for every tested format.
7. `final-evaluation.json` or an equivalent retrospective note with separate `audio_generation_smoke` and `product_readiness_evaluation` verdicts.

## Current Gaps Before Running

1. Provider credentials still need to be present at run time.
2. This run does not cover Spanish readiness.
3. This run does not cover Cartesia or same-cycle second-provider evidence.
4. The pipeline does not currently emit `final-evaluation.json` automatically; create it or write an equivalent retrospective note after the run.
5. The pipeline does not currently emit full audio probe / loudness metadata automatically; generate a probe note after final audio exists.
6. The run should request provider-native WAV first. Do not spend a second provider pass just to get provider-native MP3 unless a later provider-specific comparison explicitly requires it.

## Current Gaps After Successful Resumed WAV Attempt

1. Manual seam / splice listening review is still required.
2. Full perceptual quality, pronunciation, fatigue, and text-fidelity review are still required.
3. Timing / subtitle QA against final audio is still required.
4. This run is English-only and does not complete Spanish readiness.
5. This run does not cover Cartesia or same-cycle second-provider evidence.
6. The next step should not be a provider-native MP3 pass; the local MP3 derivative already covers the delivery-format check for this run.
