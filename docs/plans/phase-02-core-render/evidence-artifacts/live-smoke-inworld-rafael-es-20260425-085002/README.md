# Live Smoke Evidence: Inworld Rafael ES 2026-04-25

> Status: promoted artifact packet
> Role: merge-tracked evidence
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/plans/phase-02-core-render/07-live-smoke-evidence-2026-04-25-inworld-rafael-es.md`
> Last reviewed: 2026-04-25

## Files

| File | Source | Meaning |
|---|---|---|
| `source-script.md` | Copied from `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/psicologia-maquiavelica-inteligencia-oscura.md` | Source manuscript snapshot used to reopen the Spanish smoke input after worktree cleanup |
| `final.mp3` | Recovered from `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/音频/final.mp3` | Provider-native MP3 output from the Spanish Inworld live smoke |
| `large-artifacts.manifest.json` | Records the external retained WAV derivative | Manifest-only retention for the 162MB WAV file that must not enter normal Git |
| `retrospective-tts-ux-evaluation.md` | Local retrospective using the R1 `tts_ux_readiness_scorecard` | Records what this packet proves and which UX-readiness evidence is missing |

## Source Probe

| File | Words | Input characters | Size |
|---|---:|---:|---:|
| `source-script.md` | 4,734 | 28,543 | 28KB |

## Audio Probe

| File | Container / codec | Sample rate | Channels | Bitrate | Duration | Size |
|---|---|---:|---:|---:|---:|---:|
| `final.mp3` | MP3 / mp3 | 44.1kHz | 1 | 128kbps | 1920.653s | 30,730,903 bytes |
| `final.transcoded-from-mp3.wav` | WAV / pcm_s16le | 44.1kHz | 1 | 705.6kbps | 1920.602s | 169,397,164 bytes; manifest-only, not tracked as a Git binary |

## Hashes

| File | SHA256 |
|---|---|
| `source-script.md` | `e05dc641be297947f4d0fd3eab4583699d6d0a671db73ee2821fa41569d78567` |
| `final.mp3` | `459631cd70f1a27b179e031c6067b0a00203d688172b2bf0ba50295bca4fd504` |
| `final.transcoded-from-mp3.wav` | `b728d9c549f71b624b6bd0ba5b922f3f6d3363a8beee46515381df69f528d6b5` |

## Format Verdict

| Format | Verdict | Notes |
|---|---|---|
| MP3 | `ready_for_delivery` for smoke comparability | The file decodes and matches the recorded 32-minute Spanish evidence. It is 128kbps, so it does not validate the newer `>=192kbps` commercial default target. |
| WAV derivative | `hold_for_export` | This is transcoded from MP3, not provider-native Linear PCM. It can validate packaging / download handling, but it cannot prove higher source quality or production-master readiness. |

## Large Artifact Retention

`final.transcoded-from-mp3.wav` is intentionally excluded from normal Git and retained through `large-artifacts.manifest.json`.

The current retained local copy is `/Volumes/woshiliyana/黑暗心理学频道/西班牙语频道/04/0418/音频/final.transcoded-from-mp3.wav`. If this artifact is later moved to product storage or object storage, update the manifest with the durable storage URI while keeping the same hash and verdict trail.

## Retention Rule

This packet is intentionally stored inside the repo evidence-artifacts tree so it survives worktree cleanup. Future provider-backed tests should follow this pattern before merge.
