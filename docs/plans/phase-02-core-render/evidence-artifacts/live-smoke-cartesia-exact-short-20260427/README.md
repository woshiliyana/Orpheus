# Cartesia Exact Short Smoke Evidence

> Status: audio generated; awaiting human listening review before medium or long Cartesia benchmark.
> Provider role: second-provider benchmark / fallback / negotiation evidence, not an Inworld replacement decision.
> API docs checked: Context7 Cartesia docs on 2026-04-27.

## Scope

This packet records a deliberately small Cartesia preflight before spending credits on the full frozen corpus.

The smoke used `exact` pacing for both languages. Cartesia should not receive Inworld SSML break tags; the current `natural_basic` adapter also falls back to exact for non-Inworld providers.

## Commands

```bash
CARTESIA_MAX_ATTEMPTS=1 ./scripts/live-smoke/phase2-live-smoke.sh \
  --provider cartesia \
  --voice 79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e \
  --language en \
  --script fixtures/frozen-corpus/scripts/en-control-short.txt \
  --request-id live-smoke-cartesia-theo-en-short-exact-20260427 \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode exact \
  --input-validation strict

CARTESIA_MAX_ATTEMPTS=1 ./scripts/live-smoke/phase2-live-smoke.sh \
  --provider cartesia \
  --voice 15d0c2e2-8d29-44c3-be23-d585d5f154a1 \
  --language es \
  --script docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-env-loader-and-es-natural-20260427/es-natural-short/source-script.md \
  --request-id live-smoke-cartesia-pedro-es-short-exact-20260427-eslang \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode exact \
  --input-validation strict
```

## Voice Selection

| Language | Voice | Cartesia voice id | Selection reason |
|---|---|---|---|
| EN | Theo - Modern Narrator | `79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e` | Listed as a steady, enunciating narration voice. |
| ES | Pedro - Formal Speaker | `15d0c2e2-8d29-44c3-be23-d585d5f154a1` | Listed as formal, steady, and clear for Spanish information delivery. |

## Result Summary

| Run | Language | Script chars | Duration | Wall time | Retries | Timestamp coverage | Estimated TTS cost | Estimated total cost | Format verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `live-smoke-cartesia-theo-en-short-exact-20260427` | EN | 1,620 | 85.104s | 80.953s | 0 | 99.63% | $0.051 | $0.068 | `provider_native_raw_pcm=ready_for_internal_master_preflight`; `derived_mp3_192kbps=ready_for_delivery` |
| `live-smoke-cartesia-pedro-es-short-exact-20260427-eslang` | ES | 420 | 21.456s | 6.492s | 0 | 100% | $0.013 | $0.017 | `provider_native_raw_pcm=ready_for_internal_master_preflight`; `derived_mp3_192kbps=ready_for_delivery` |

Both runs used Cartesia's provider-native raw PCM stream as the source / production-master candidate, then derived MP3 locally at roughly 192 kbps, 48 kHz, mono for delivery evidence. The derived MP3 files are promoted in this packet because they are small enough for normal repo evidence. The raw PCM files stay under ignored `runs/` output and are tracked through `large-artifact-manifest.json`.

## Evidence Notes

- Cartesia credentials loaded from the repo env path and the voices API accepted the key.
- Context7 docs showed current Cartesia streaming endpoints should use raw audio; the local adapter now requests raw PCM from SSE and derives delivery formats locally.
- Word-timing assets, SRT, and VTT were generated for both promoted runs.
- EN has `timestamp_coverage_partial` at 99.63%; this is acceptable for preflight but needs manual timing review before medium / long.
- A first ES local-only attempt succeeded but defaulted to `language=en` because the wrapper did not expose `--language`; it is intentionally not promoted as ES evidence. The corrected `-eslang` run is the promoted ES result.
- Raw SSE files are retained only under `runs/live-smoke/.../chunks/000/` because they are multi-megabyte provider-response traces. Raw PCM masters are retained locally and tracked with hash / size / duration in `large-artifact-manifest.json`; promoted evidence keeps parsed metrics, manifests, timing assets, and derived final MP3s.
- Optional user-facing `WAV` download was not generated in this preflight. It should be derived from the retained raw PCM / lossless master in a later export-readiness pass, not from MP3.

## Hold / Next Gate

Cartesia is cleared for human short-sample listening. Do not run medium or long Cartesia corpus until the user listens to the EN and ES files and accepts the voice / pacing quality.
