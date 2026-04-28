# Live Smoke: Env Loader And ES Natural Pacing

> Status: passed for provider execution and artifact integrity
> Role: post-merge smoke evidence
> Date: 2026-04-27 PDT

## Purpose

This packet records two small post-merge live smokes:

1. EN Inworld/Ashley `natural_basic + strict`, run without manually sourcing `.git/orpheus.server.env`, to verify that empty `.env.local` placeholders no longer mask shared provider secrets.
2. ES Inworld/Rafael `natural_basic + strict`, to verify the Spanish provider path and conservative structural pacing after the input-adapter merge.

## Commands

```bash
bash scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-short.txt \
  --request-id live-smoke-env-loader-natural-short-20260427 \
  --pacing-mode natural_basic \
  --input-validation strict \
  --format mp3
```

```bash
npm run narrate -- \
  --provider inworld \
  --language es \
  --voice Rafael \
  --script-text '<inline Spanish smoke script>' \
  --request-id live-smoke-es-natural-short-20260427 \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode natural_basic \
  --input-validation strict
```

## Results

| Attempt | Language | Voice | Duration | Token preserved | Inserted breaks | Max breaks/request | Timestamp coverage | Warnings |
|---|---|---:|---:|---:|---:|---:|---:|---|
| `live-smoke-env-loader-natural-short-20260427` | EN | Ashley | 103.392s | yes | 2 | 2 | 100% | none |
| `live-smoke-es-natural-short-20260427` | ES | Rafael | 29.928s | yes | 2 | 2 | 100% | none |

Both final MP3 files decoded as 48 kHz mono at roughly 192 kbps. These runs prove provider execution, env resolution, artifact persistence, input quality, token preservation, and break-tag budget compliance. They are not full UX readiness or manual listening verdicts.

## Packet Contents

- `en-env-loader-natural-short/`
- `es-natural-short/`

Each subdirectory includes final audio, manifest, metrics, pacing/input evidence, subtitles, word timings, splice report, and `audio-probe.json`.
