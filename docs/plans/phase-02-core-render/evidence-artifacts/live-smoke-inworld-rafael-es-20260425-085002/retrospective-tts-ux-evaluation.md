# Retrospective TTS UX Evaluation: Inworld Rafael ES 2026-04-25

> Status: retrospective evaluation
> Role: evidence note
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/ops/phase2-live-smoke.md`
> Last reviewed: 2026-04-26

## Scope

This note evaluates only the existing packet:

`docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/`

It does not run a provider, generate new audio, generate STT, or create subtitle assets. Missing artifacts are treated as evidence-retention gaps, not as proof of product or runtime failure.

## Verdicts

| Evaluation scope | Verdict | Reason |
|---|---|---|
| `audio_generation_smoke` | `passed_with_warnings` | The retained MP3 exists, decodes, is 32.011 minutes long, and passes the local silence / loudness probes listed below. Warnings remain because the packet lacks required machine and UX-readiness artifacts. |
| `product_readiness_evaluation` | `blocked_by_missing_evidence` | The packet has no `metrics.json`, no `artifact-manifest.json`, no word timings, no SRT/VTT packet, no splice report, no ASR diff, no MOS / human review, no platform import check, and no competitive baseline. |

## Covered Facts

| Fact | Value | Evidence |
|---|---:|---|
| Attempt id | `live-smoke-inworld-rafael-es-20260425-085002` | Evidence packet path |
| Source words | `4,734` | `source-script.md` local count |
| Input characters | `28,543` | `source-script.md` UTF-8 text length |
| Final MP3 duration | `1920.653s` / `32.011 min` | `ffprobe` on `final.mp3` |
| Final MP3 format | `mp3`, `44.1kHz`, mono, `128kbps` | `ffprobe` on `final.mp3` |
| Decode | OK | `ffmpeg -i final.mp3 -f null -` completed |
| Long silence | No `>=1.5s @ -45dB` segment detected | `ffmpeg` `silencedetect=n=-45dB:d=1.5` |
| Integrated loudness | `-19.5 LUFS` | `ffmpeg` `ebur128=peak=true` |
| Loudness range | `4.5 LU` | `ffmpeg` `ebur128=peak=true` |
| True peak | `-0.2 dBFS` | `ffmpeg` `ebur128=peak=true` |
| WAV derivative | Manifest retained for `final.transcoded-from-mp3.wav`; not tracked as a Git binary | `large-artifacts.manifest.json` |
| Observed cost estimate | Around `$1.43-$1.44` at `$50 / 1M chars` | `28,543 / 1,000,000 * 50` |

## Missing Evidence

| Missing artifact or review | Blocks |
|---|---|
| `metrics.json` | Run integrity, latency UX, machine-readable scoring |
| `artifact-manifest.json` | Run integrity, artifact lineage, billing / delivery trace |
| Word timings | Subtitle readiness and timing credibility |
| SRT / VTT packet | Subtitle readiness |
| Splice report | Stitch quality and hidden-orchestration review |
| ASR diff | Text fidelity |
| MOS / human listening review | Perceptual quality and pronunciation / control |
| Platform import check | Format / platform delivery readiness |
| Competitive baseline | Provider and product-positioning readiness |

## Coverage Matrix

| Scorecard dimension | Coverage status | Retrospective note |
|---|---|---|
| `run_integrity` | `partial` | Final MP3 and source snapshot are retained, but `metrics.json` and `artifact-manifest.json` are missing. |
| `user_task_success` | `partial` | Usable audio exists and decodes, but no platform import, user-facing delivery check, or human acceptance exists. |
| `script_profile` | `covered` | Spanish source snapshot, `28,543` input characters, `4,734` words, and 32-minute output are recorded. |
| `cost_viability` | `partial` | Character-based cost estimate is present, but no full provider scenario or workbook reconciliation exists in this packet. |
| `latency_ux` | `unknown` | No time-to-first-audio or total time-to-result evidence is retained. |
| `perceptual_quality` | `manual_required` | No MOS or human listening review is retained. |
| `text_fidelity` | `blocked_by_missing_evidence` | No ASR transcript or source-vs-audio diff exists. |
| `pronunciation_control` | `manual_required` | No Spanish pronunciation or accent-control review is retained. |
| `long_form_stability` | `partial` | One 32-minute output exists, but repeatability, retry behavior, and run metrics are missing. |
| `stitch_quality` | `blocked_by_missing_evidence` | No chunk, splice, seam, or orchestration report exists. |
| `subtitle_readiness` | `blocked_by_missing_evidence` | No word timings, alignment assets, SRT, VTT, or subtitle QA note exists. |
| `audio_technical_qc` | `covered` | Decode, duration, sample rate, channel layout, bitrate, silence, LUFS, LRA, and true peak were measured locally. |
| `format_platform_delivery` | `partial` | MP3 smoke delivery and WAV derivative manifest exist, but MP3 is only 128kbps and no platform import exists. |
| `repair_recovery_ux` | `unknown` | No warning or repair path was exercised or retained. |
| `competitive_benchmark` | `blocked_by_missing_evidence` | No Cartesia same-corpus or public reference baseline is retained in this packet. |
| `trust_compliance` | `manual_required` | No rights, compliance, safety, or public-claim review is retained in this packet. |
| `final_verdict` | `covered` | `audio_generation_smoke=passed_with_warnings`; `product_readiness_evaluation=blocked_by_missing_evidence`. |

## Future Packet Requirements

Before a future live-smoke packet can be called UX readiness evidence, it must include:

1. `artifact-manifest.json` tying final audio, provider summary, orchestration facts, delivery refs, format policy, billing fact, and alignment refs together.
2. `metrics.json` with duration, latency, retry, cost, and audio-probe fields.
3. Word timings or alignment assets sufficient to judge subtitle-ready timing.
4. SRT / VTT packet or an explicit retained failure reason.
5. Splice / seam report when hidden orchestration or derived stitching is involved.
6. ASR diff or equivalent source-vs-audio text fidelity evidence.
7. Human review for perceptual quality, pronunciation / control, trust, and compliance.
8. Platform import or delivery check for the claimed delivery surface.
9. Same-cycle competitive baseline before provider, pricing, or broader product-readiness claims.
10. A `final-evaluation.json` or equivalent note using `tts_ux_readiness_scorecard`, with hard gates evaluated before weighted score.

## Public Promise Boundary

This retrospective does not change public promises. It does not open public `SRT` launch, broader multilingual workspace support, pricing-page expansion, no-login long-form trial, or user-facing WAV export.
