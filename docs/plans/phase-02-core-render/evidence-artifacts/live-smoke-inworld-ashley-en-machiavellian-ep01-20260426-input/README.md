# English Validation Input: Inworld Ashley EN Machiavellian EP01

> Status: provider-backed evidence packet
> Role: English pressure-run live-smoke packet
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/ops/phase2-live-smoke.md`, `/docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
> Last reviewed: 2026-04-26

## Purpose

Preserve the founder-supplied English Machiavellian Psychology EP01 voiceover script and the resulting Inworld English live-smoke evidence. This packet contains the source snapshot, run metadata, tracked machine artifacts, large-artifact hash manifests, and the current evaluation verdict.

## Files

| File | Source | Meaning |
|---|---|---|
| `source-script.md` | Copied from `/Volumes/woshiliyana/黑暗心理学频道/英文频道/04/0426/machiavellian-psychology-ep01-voiceover.md` | Source manuscript snapshot for the English validation run |
| `source-input.manifest.json` | Local source probe | Structured metadata, hash, fit assessment, and next-run checklist |
| `evaluation-coverage-map.md` | Current scorecard and pipeline review | Maps the latest evaluation requirements to artifacts this run can and cannot produce |
| `artifact-manifest.json` / `metrics.json` | Successful resumed WAV run | Run lineage, orchestration, timing coverage, cost, and billing facts |
| `large-artifact-manifest.json` | Local hash manifest | Retention paths, hashes, sizes, and format verdicts for `final.wav` and the derived MP3 |
| `audio-probe-metadata.json` | `ffprobe` / `volumedetect` | Technical probe metadata for the WAV and derived MP3 assets |
| `final-evaluation.json` | Scorecard review | Current `tts_ux_readiness_scorecard` verdict |
| `manual-review-20260428.md` | Current manual-review lane | Founder listening worksheet for perceptual quality, seams, pronunciation, text fidelity, timing, and format delivery |

## Source Probe

| File | Language | `wc` words | Word-like tokens | Characters | Bytes | Paragraphs | Sections |
|---|---|---:|---:|---:|---:|---:|---|
| `source-script.md` | `en` | 6,004 | 5,895 | 35,394 | 35,594 | 152 | `No. 1` through `No. 8` |

## Fit Assessment

| Topic | Assessment |
|---|---|
| Script completeness | Complete voiceover draft with intro, eight numbered sections, closing CTA, and no visible TODO / placeholder markers. |
| Domain fit | Real English educational-explainer / psychology-channel script. It is suitable as a realistic English validation input rather than synthetic fixture text. |
| Duration estimate | Approximately `39.5 min` using the current planning default of `900 chars/audio minute`, and approximately `39.3 min` at `150 wpm`. |
| Gate fit | Accepted as an English long/over-30 pressure validation input. This does not replace the full frozen `EN + ES` corpus gate. |
| Planned chunking | Current deterministic chunker estimates `21` chunks with default `500-1900` character chunk bounds. |
| Format coverage | Use one paid provider run: request provider-native `wav` as the source / production-master candidate, then derive a `192kbps` MP3 locally for delivery-format evaluation. |
| Text hygiene | Contains one non-ASCII punctuation family (`em dash`) inherited from the source manuscript. Preserve it in the source snapshot. |
| Product-readiness status | `blocked_by_missing_evidence` until manual review, Spanish readiness, and same-cycle Cartesia evidence are produced. |

## Post-Run Attempt Result

| Topic | Result |
|---|---|
| Attempt status | `succeeded_with_warnings` for the English audio-generation smoke |
| Initial failure | First WAV attempt failed with `terminated` after `6 / 21` chunks; the resumed run reused completed chunks instead of rerunning from zero. |
| Requested provider format | provider-native `wav` |
| Completed chunks | `21 / 21`; `stitch_count=20`; `retry_count=3`; resumed cache evidence retained |
| Final WAV | Produced under ignored `runs/`; tracked through `large-artifact-manifest.json` |
| Local MP3 derivative | Produced locally from provider-native WAV at the `192kbps` target; no second provider-native MP3 request was made |
| Final duration | `2170.48s` / `36:10.48` |
| Format verdicts | `provider_native_wav=ready_for_internal_master`; `derived_mp3_192kbps=ready_for_delivery`; `user_facing_wav_export=hold_for_export` |
| Promoted evidence | `artifact-manifest.json`, `metrics.json`, `splice-report.json`, `word-timings.json`, `subtitles.srt`, `subtitles.vtt`, `audio-probe-metadata.json`, `large-artifact-manifest.json`, `final-evaluation.json`, command-output receipts |
| Readiness verdict | `audio_generation_smoke=warning`; `product_readiness_evaluation=blocked_by_missing_evidence` |

This result does not justify a provider-native MP3 retry. The remaining work is manual listening / timing review plus the broader `EN + ES` and Cartesia evidence, not another MP3/WAV provider-format pass.

## Manual Review

[`manual-review-20260428.md`](./manual-review-20260428.md) prepares the founder listening review for the retained MP3 delivery candidate and WAV master spot checks. The note verifies the local asset hashes and review rubric, but it does not record a passed listening verdict yet.

## Preparation Checklist

1. Confirm provider credentials are present in the shell, `.git/orpheus.server.env`, or `.env.local`.
2. Run the smoke through the backend-owned script path, not a browser or client-side provider call.
3. After the run, promote the selected output packet into this evidence tree with at least:
   - final audio or a large-artifact manifest
   - `artifact-manifest.json`
   - `metrics.json`
   - splice report when present
   - word timing / subtitle artifacts when present
   - audio probe metadata
   - final evaluation or retrospective note
4. Record the result as English-only validation evidence, not as the full `EN + ES` first-gate completion.

## Suggested Run Command

Single paid provider run, requesting provider-native WAV:

```bash
./scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/source-script.md \
  --request-id live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input \
  --format wav
```

Local MP3 delivery derivative after the run succeeds:

```bash
ffmpeg -y \
  -i runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.wav \
  -codec:a libmp3lame \
  -b:a 192k \
  runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.derived-from-provider-wav.mp3
```

This keeps the provider cost to one generation pass. The WAV evaluates Linear PCM / production-master posture; the derived MP3 evaluates default delivery packaging and bitrate. Do not invert this by requesting MP3 first and deriving WAV from MP3, because MP3-derived WAV cannot prove production-master quality.

## Retention Rule

This packet is intentionally stored inside the repo evidence-artifacts tree so the source manuscript survives worktree cleanup and external channel-directory drift. It should be updated in place only with artifacts from the matching English validation line.
