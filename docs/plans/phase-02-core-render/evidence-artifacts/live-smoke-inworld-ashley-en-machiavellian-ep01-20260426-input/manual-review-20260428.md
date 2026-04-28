# Inworld Ashley EN Pressure Manual Review

> Status: founder listening pending
> Role: manual-review worksheet for retained English pressure audio
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `large-artifact-manifest.json`, `final-evaluation.json`, `evaluation-coverage-map.md`, `/docs/prd/specs/quality-ops-and-automation.md`
> Provider calls: none
> Last reviewed: 2026-04-28

## Scope

This note covers only the retained English pressure output for `live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input`.

It verifies the review target and records the human-listening rubric. It does not claim that a subjective listen-through has already passed.

## Review Targets

| Asset | Role | Local retention path | Verified hash |
|---|---|---|---|
| `final.derived-from-provider-wav.mp3` | delivery-audio review target | `runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.derived-from-provider-wav.mp3` | `4e0a5678e08baf53d34b8869c65cca788edda911ddd12809458953d038e4ef36` |
| `final.wav` | provider-native master spot-check target | `runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.wav` | `daa9826b59a2cb35e47d76685d9de47b7bc331d4ecd2d495226e2b60171ad6b3` |

## Machine Evidence Already Retained

| Field | Value |
|---|---|
| Provider / voice / language | `Inworld` / `Ashley` / `en` |
| Run outcome | `succeeded_with_warnings` for audio generation smoke |
| Final duration | `2170.48s` / `36:10.48` |
| Chunks / stitches / retries | `21` chunks, `20` stitch joins, `3` retries |
| Format posture | provider-native WAV is an internal-master candidate; derived MP3 is the delivery candidate; public WAV export stays held |
| Timing assets | `word-timings.json`, `subtitles.srt`, `subtitles.vtt` retained |
| Current readiness | `product_readiness_evaluation=blocked_by_missing_evidence` until manual review and related checks close |

## Listening Rubric

| Dimension | What to listen for | Blocking examples | Status |
|---|---|---|---|
| `perceptual_quality` | Naturalness, clarity, severe artifacts, fatigue over the full 36-minute listen | repeated robotic artifacts, distracting distortion, severe monotony, listener fatigue that makes the output unusable | `pending` |
| `voice_persona_fit` | Match between Ashley and the English psychology / educational-explainer persona | voice feels wrong for the niche, too casual, too synthetic, or not credible enough for long-form narration | `pending` |
| `stitch_quality` | Audible joins around chunk boundaries | clipped words, sudden tone changes, repeated phrases, unnatural silence, abrupt jumps | `pending` |
| `text_fidelity` | Source words preserved closely enough for this stage | skipped sections, repeated paragraphs, major substitutions, hallucinated lines | `pending` |
| `pronunciation_control` | Names, numerals, terminology, emphasis | repeated wrong pronunciation, wrong emphasis that changes meaning, distracting accent issue | `pending` |
| `subtitle_timing_readiness` | Captions close enough to keep internal timing work alive | caption drift, unreadable spacing, obvious mismatch between spoken audio and cue windows | `pending` |
| `format_delivery` | MP3 delivery acceptability and any master-vs-delivery concern | encoding artifact, unacceptable loudness, platform playback problem | `pending` |

## Suggested Review Pass

1. Full listen-through on `final.derived-from-provider-wav.mp3`.
2. Record any blocking issue with timestamp, symptom, and likely category.
3. Spot-check WAV around any suspected encoding issue to distinguish provider output from MP3 delivery encoding.
4. Spot-check stitch boundaries around:
   - `01:51.58`
   - `03:31.14`
   - `05:20.28`
   - `08:57.72`
   - `17:56.98`
   - `21:27.60`
   - `25:02.10`
   - `30:10.36`
   - `33:31.24`
   - `35:17.94`
5. Spot-check subtitles near:
   - `05:20`
   - `20:00`
   - `34:00`

## Founder Acceptance Fields

Fill or replace this section only after actual listening.

| Field | Value |
|---|---|
| `full_listen_completed` | `pending` |
| `mp3_delivery_candidate` | `pending` |
| `voice_persona_fit` | `pending` |
| `perceptual_quality` | `pending` |
| `stitch_quality` | `pending` |
| `pronunciation_control` | `pending` |
| `text_fidelity` | `pending` |
| `subtitle_timing_readiness` | `pending` |
| `blocking_timestamps` | `pending` |
| `accepted_for_en_evidence` | `pending` |

## Current Decision

`manual_review_prepared=true`

`manual_review_completed=false`

`en_pressure_product_readiness=blocked_until_founder_listening_acceptance`

No new provider call is justified by this note alone. If founder listening finds blocking issues, classify the issue first; do not rerun the provider by default.
