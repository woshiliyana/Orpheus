# Cartesia Medium Smoke Evidence

> Status: audio generated; manual listening and timing spot-check accepted with warnings.
> Provider role: second-provider benchmark / fallback / negotiation evidence, not an Inworld replacement decision.
> API docs checked: Context7 Cartesia docs on 2026-04-28.

## Scope

This packet records a controlled Cartesia medium live smoke for the current repo frozen-corpus medium slot. It uses one paid provider pass per language, requests Cartesia SSE raw PCM as the provider-native production-master source, and derives MP3 delivery locally.

The EN fixture is `fixtures/frozen-corpus/scripts/en-control-medium.txt` (504 words). The ES fixture is `fixtures/frozen-corpus/scripts/es-control-medium.txt` (552 words), frozen in this lane from the retained Spanish long-form source snapshot so the medium benchmark has a comparable bilingual input size.

## Commands

```bash
CARTESIA_MAX_ATTEMPTS=1 ./scripts/live-smoke/phase2-live-smoke.sh --provider cartesia --voice 79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e --language en --script fixtures/frozen-corpus/scripts/en-control-medium.txt --request-id live-smoke-cartesia-theo-en-medium-exact-20260428 --output-dir '/Volumes/woshiliyana/mycodeprojects/text-to-audio mvp/runs/live-smoke' --format mp3 --pacing-mode exact --input-validation strict

CARTESIA_MAX_ATTEMPTS=1 ./scripts/live-smoke/phase2-live-smoke.sh --provider cartesia --voice 15d0c2e2-8d29-44c3-be23-d585d5f154a1 --language es --script fixtures/frozen-corpus/scripts/es-control-medium.txt --request-id live-smoke-cartesia-pedro-es-medium-exact-20260428 --output-dir '/Volumes/woshiliyana/mycodeprojects/text-to-audio mvp/runs/live-smoke' --format mp3 --pacing-mode exact --input-validation strict
```

## Voice Selection

| Language | Voice | Cartesia voice id | Selection reason |
|---|---|---|---|
| EN | Theo - Modern Narrator | `79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e` | Same Cartesia EN narrator accepted for the short preflight. |
| ES | Pedro - Formal Speaker | `15d0c2e2-8d29-44c3-be23-d585d5f154a1` | Same Cartesia ES formal narrator accepted for the short preflight. |

## Result Summary

| Run | Language | Script | Chars | Words | Chunks | Duration | Wall time | Retries | Timestamp coverage | Estimated TTS cost | Estimated total cost | Warnings |
|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `live-smoke-cartesia-theo-en-medium-exact-20260428` | EN | `en-control-medium` | 3,139 | 504 | 2 | 174.504s | 29.015s | 0 | 99.80% | $0.098 | $0.133 | `timestamp_coverage_partial` |
| `live-smoke-cartesia-pedro-es-medium-exact-20260428` | ES | `es-control-medium` | 3,386 | 552 | 3 | 177.936s | 28.035s | 0 | 99.64% | $0.106 | $0.141 | `timestamp_coverage_partial` |

Both runs emitted the required new manifest fields: `audio_format_policy`, `production_master_audio_ref`, and `delivery_audio_ref`. Because both outputs used more than one provider chunk, the promoted `delivery_audio_ref[0].derived_from_asset_refs` lists every retained raw PCM chunk master used to derive the MP3 delivery file.

## Format Evidence

| Topic | Verdict | Evidence |
|---|---|---|
| Provider-native source | `ready_for_internal_master` | Raw PCM `pcm_s16le`, 48 kHz, mono retained under ignored `runs/live-smoke/.../chunks/*/audio.raw.pcm` and tracked in `large-artifact-manifest.json`. |
| Default delivery | `ready_for_delivery` | Promoted `final.mp3` files are locally derived from raw PCM, 48 kHz mono, ~192 kbps. |
| Optional WAV export | `hold_for_export` | Not generated in this lane; should be derived from retained lossless raw PCM in a dedicated export-readiness pass. |

## Evidence Files

- `en-medium/` and `es-medium/`: promoted artifacts for each run, including manifest, metrics, input adapter evidence, subtitles, word timings, splice report, final MP3, and ffprobe JSON.
- `large-artifact-manifest.json`: raw PCM production-master retention paths, hashes, sizes, and format verdicts.
- `hashes.sha256`: hashes for promoted evidence plus raw PCM retention artifacts.
- `run-summary.json`: machine-readable cost, duration, timestamp, warning, and format-policy summary.
- `final-evaluation.json`: scorecard verdict separating `audio_generation_smoke` from broader product readiness.
- `cartesia-medium-listening-timing-closeout-20260428.md`: timing spot-check, listening closeout, provider scorecard, and decision memo.

## Manual Listening Review

User review on 2026-04-28 accepted the medium outputs with warnings. EN had no material issue noted. ES sounded relatively fast, likely because of voice selection, but the decision is not to adjust pacing or voice hastily from one sample. Preserve this as a voice-speed note for future Cartesia comparison rather than changing the live-smoke strategy now.

## Timing Spot Check

Timing closeout on 2026-04-28 accepted `timestamp_coverage_partial` as a warning rather than a structural blocker for this scoped benchmark. EN and ES word timings, SRT, and VTT cues are monotonic, last cue / word timings stay within final MP3 duration, and splice-boundary checks did not show material subtitle/audio drift.

| Language | Word timings | SRT / VTT cues | Last timed word | Audio duration | Uncovered tail | Timing verdict |
|---|---:|---:|---:|---:|---:|---|
| EN | `503` | `43 / 43` | `174.236s` | `174.504s` | `0.268s` | `warning_accepted` |
| ES | `550` | `56 / 56` | `177.791s` | `177.936s` | `0.145s` | `warning_accepted` |

The detailed timing and decision record lives in `cartesia-medium-listening-timing-closeout-20260428.md`.

## Readiness Notes

- `audio_generation_smoke=passed_with_warnings`: both medium runs completed with no retries and generated final audio, metrics, manifests, timing, subtitle, and format evidence.
- `product_readiness_evaluation=warning`: manual listening is accepted for this scoped benchmark, with ES voice-speed and partial timestamp coverage warnings preserved.
- Timestamp coverage is high but partial for both runs: EN 99.80%, ES 99.64%. Spot checks found only sub-second uncovered tails and no material drift, so this remains an accepted warning for the scoped benchmark.
- Decision: keep Cartesia as a serious second-provider benchmark and negotiation lever. Do not open a continuation/WebSocket lane yet, and do not change Spanish pacing or voice from this single sample.
