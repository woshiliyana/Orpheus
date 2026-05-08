# Production Vercel Runtime Relocate Smoke 2026-05-08

> Status: passed for production runtime delivery-path smoke
> Scope: Vercel runtime media-binary relocation, server-owned provider execution, durable Neon/R2 persistence, and token-gated downloads
> Not a full Phase 2 readiness packet: this is a short English-only smoke, not the frozen `EN + ES` long-form corpus gate.

## Run

| Field | Value |
|---|---|
| Production URL | `https://orpheusnarration.com` |
| Deployment | `orpheus-narration-site-hzxnd0woe-woshiliyanas-projects.vercel.app` |
| Git commit | `d55d4e91fe0b9f3222c489fce56676ca123f67bd` |
| Run ID | `run_mowvwl40_136199c2` |
| Project ID | `project_mowvwl40_c9faa5fd` |
| Title | `Production runtime relocate smoke 20260508-052131` |
| Provider | `inworld` |
| Voice | `Ashley` |
| Language | `en` |
| Pacing | `natural_basic` |
| Input validation | `strict` |
| Delivery format | `mp3` |

## Result

| Check | Result |
|---|---|
| Run status | `succeeded` |
| Billable seconds | `12` |
| Audio duration | `11.856` seconds |
| Chunk count | `1` |
| Retry count | `0` |
| Cached chunks | `0` |
| Warning codes | none recorded |
| Token preservation | `true` |
| Max break tags per request | `0` |
| Vercel error logs | no error entries returned for the checked 30 minute window |

## Download Verification

| Artifact | HTTP status | Bytes | Notes |
|---|---:|---:|---|
| `final.mp3` | `200` | `285164` | MP3, 192 kbps, 48 kHz, mono |
| `artifact-manifest.json` | `200` | `3954` | JSON |
| `metrics.json` | `200` | `425` | JSON |

## Evidence Files

- `source-script.md`
- `final.mp3`
- `artifact-manifest.json`
- `metrics.json`
- `audio-probe.json`
- `final-evaluation.json`

## Notes

This smoke specifically verifies the production fix that relocates traced `ffprobe` / `ffmpeg` static package paths at runtime on Vercel. It does not replace the full Phase 2 `EN + ES` corpus benchmark, subjective seam review, lossless production-master evidence, or broader product readiness evaluation.
