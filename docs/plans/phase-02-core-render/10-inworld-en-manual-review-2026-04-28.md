# Inworld EN Manual Review Packet

> Status: partial founder spot-check recorded; full listen pending
> Role: manual-review worksheet and evidence-retention packet
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on truth docs: `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/plans/phase-02-core-render/09-inworld-product-readiness-closeout-2026-04-28.md`, `/docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/`
> Provider calls: none
> Last reviewed: 2026-04-28

## Purpose

This packet narrows the next Inworld readiness action to the retained English pressure output only. It prepares the manual listening review for the `live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input` packet, verifies that the local audio assets still match the tracked hashes, and records the decision boundary before any new paid provider run.

It does not run Inworld, generate ASR/STT, produce new audio, change runtime code, update pricing, open public `SRT` export, widen language promises, or convert this English-only pressure run into full product readiness.

## Verdict

| Decision field | Verdict |
|---|---|
| `en_pressure_audio_assets` | `retained_and_hash_verified` |
| `manual_listening_review` | `partial_spot_check_recorded_full_listen_pending` |
| `perceptual_quality` | `spot_check_passed_with_opening_phrasing_warning` |
| `voice_persona_fit` | `warning_ashley_not_final_candidate_prefer_mature_steady_male_voice` |
| `stitch_quality` | `first_three_spot_checks_no_material_issue` |
| `text_fidelity` | `manual_required_or_asr_diff_required` |
| `subtitle_timing_readiness` | `manual_required` |
| `next_paid_provider_run` | `hold` |
| `inworld_en_product_readiness` | `blocked_until_full_listen_or_revised_voice_decision` |
| `public_promise_change` | `none` |

Decision summary:

1. The retained English pressure audio assets are present on the local main worktree and match the hashes recorded in `large-artifact-manifest.json`.
2. The correct next evidence reduction is human review of the existing MP3 delivery candidate plus targeted WAV / seam spot checks, not a new Inworld generation pass.
3. Founder spot-check on 2026-04-28 sampled the first three stitch boundaries and found no material seam issue.
4. Founder spot-check found no obvious machine feel overall, with an opening-phrasing warning.
5. Ashley is not accepted as the final English persona candidate; future EN voice selection should prefer a mature, steady male voice.
6. Inworld remains `continue_with_warnings`; this packet does not clear product readiness.

## Evidence Scope

| Evidence item | Value |
|---|---|
| Evidence packet | [`live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input`](./evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/) |
| Manual-review note | [`manual-review-20260428.md`](./evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/manual-review-20260428.md) |
| Provider / voice / language | `Inworld` / `Ashley` / `en` |
| Source script | `source-script.md`; `35,394` characters; `6,004` `wc` words; `5,895` word-like tokens |
| Final duration | `2170.48s` / `36:10.48` |
| Chunking | `21 / 21` chunks, `20` stitch joins, `3` retries after first-pass termination |
| Production-master candidate | `runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.wav` |
| Delivery candidate | `runs/live-smoke/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/artifacts/final.derived-from-provider-wav.mp3` |
| Timing assets | `word-timings.json`, `subtitles.srt`, `subtitles.vtt` |
| Technical QC | WAV and MP3 decode/probe metadata retained; no subjective mastering verdict |

## Manual Review Checklist

| Review area | Primary evidence | Required founder judgment | Current status |
|---|---|---|---|
| `perceptual_quality` | Full MP3 listen-through | Is the narration natural enough for a long educational explainer, without distracting artifacts or fatigue? | `partial_spot_check_passed_with_opening_phrasing_warning` |
| `voice_persona_fit` | Full MP3 listen-through | Does Ashley fit the psychology / educational-explainer tone well enough to remain the EN default candidate? | `warning_not_final_candidate` |
| `stitch_quality` | MP3 plus stitch spot checks around chunk joins | Are the hidden chunk joins audible, abrupt, clipped, doubled, or otherwise disruptive? | `first_three_boundaries_no_material_issue` |
| `text_fidelity` | MP3 against `source-script.md`; optional ASR diff later | Are omissions, substitutions, repeated phrases, or wrong readings present at a level that would block product use? | `manual_required_or_asr_diff_required` |
| `pronunciation_control` | Full MP3 listen-through | Are names, numerals, psychological terms, and emphasis acceptable for English output? | `manual_required` |
| `subtitle_timing_readiness` | MP3 with `subtitles.srt` / `subtitles.vtt` spot checks | Are captions near enough to audio for internal alignment evidence, while public SRT export remains held? | `manual_required` |
| `format_delivery` | MP3 delivery candidate; WAV only for master spot checks | Is the derived MP3 acceptable as delivery audio for this evidence scope? | `manual_required` |

## Founder Spot-Check Backfill

On 2026-04-28, founder review sampled stitch boundaries at `01:51.58`, `03:31.14`, and `05:20.28`.

Recorded result:

1. No issue was heard at those three sampled stitch boundaries.
2. No obvious machine feel was heard in the sampled review.
3. Some wording / phrasing felt awkward, especially in the opening lines.
4. Ashley's voice color is not a strong fit for the intended English persona. The preferred future direction is a mature, steady male voice.

Interpretation:

This reduces the seam and obvious-artifact risk for the sampled section, but it does not complete the full listen-through, source-fidelity review, pronunciation review, subtitle timing review, or final voice-selection decision.

## Suggested Spot Checks

Use the derived MP3 for normal listening. Use WAV only if the review needs to distinguish provider-native master quality from MP3 delivery encoding.

| Check | Timestamp or range | Reason |
|---|---|---|
| Opening confidence | `00:00-02:00` | Confirms voice fit, startup clarity, and immediate artifact risk. |
| First stitch boundary | around `01:51.58` | Checks the first join after chunk `000`. |
| Mid-script continuity | around `10:00`, `20:00`, and `30:00` | Catches fatigue, drift, pacing monotony, and long-form consistency. |
| Stress joins | around `17:56.98`, `21:27.60`, `25:02.10`, `30:10.36`, `35:17.94` | Samples joins across the run, including late-run boundaries where fatigue or drift would matter more. |
| Ending completeness | `35:15-36:10.48` | Confirms no truncation, odd closing artifact, or delivery-break issue near the final CTA. |
| Caption alignment | one 30-second sample near `05:20`, one near `20:00`, one near `34:00` | Verifies timing credibility across early, middle, and late sections without claiming public subtitle readiness. |

## Acceptance Questions

Founder acceptance should answer these directly before the packet can reduce the manual-review blocker:

| Question | Accepted answer shape |
|---|---|
| Is the full MP3 acceptable as an English long-form delivery candidate? | `yes`, `yes_with_warnings`, or `no`, with notes |
| Are any stitch joins materially disruptive? | `none_found`, `minor_warnings`, or `blocking_issue`, with timestamps |
| Is Ashley acceptable for this English persona? | `yes`, `yes_with_warnings`, or `no`, with notes |
| Are pronunciation / emphasis problems blocking? | `none_found`, `minor_warnings`, or `blocking_issue`, with timestamps |
| Is source-text fidelity acceptable without an ASR diff for this stage? | `yes_for_stage`, `needs_asr_diff`, or `blocking_issue` |
| Are internal timing assets credible enough to keep subtitle-readiness work alive? | `yes_for_internal`, `needs_more_qa`, or `blocking_issue` |

## Decision After Acceptance

| Founder result | Next action |
|---|---|
| `yes` or `yes_with_warnings` | Mark EN manual review as accepted with warnings, keep Inworld-first, and decide whether the next blocker is a modern ES packet or ASR/timing QA. |
| `minor_warnings` with timestamps | Record warning timestamps in the manual-review note before any paid rerun. |
| `blocking_issue` | Do not rerun immediately; first classify whether the issue is voice fit, stitch behavior, text fidelity, timing, or provider output quality. |
| `needs_asr_diff` | Open a no-provider-call ASR/text-fidelity lane before another paid TTS run. |
| `voice_not_final_candidate` | Do not treat Ashley as the locked EN default voice. Run future EN voice selection toward a mature, steady male voice before any launch-facing English claim. |

## Scope Boundary

This packet is a staged evidence workflow, not a product promise. It does not change:

1. Public pricing or launch posture.
2. Public `SRT` export readiness.
3. No-login trial posture.
4. User-facing WAV export posture.
5. Full `EN + ES` first-gate readiness.
6. Cartesia continuation / WebSocket spend posture.

## No Canonical Backfill

No canonical PRD, pricing workbook, entitlement, lifecycle, billing, provider adapter, schema, or runtime-code backfill is required from this packet because it only prepares review of an already retained English Inworld output.

If founder acceptance later records a blocking defect that changes supported duration, language readiness, provider routing, pricing viability, or lifecycle semantics, stop and open a truth-doc backfill lane before changing product claims.

## Verification Targets

Before this packet can be accepted:

1. `git diff --check`
2. Link/path sanity checks for the referenced evidence packet, manual-review note, and local retained audio paths.
3. Hash sanity checks against `large-artifact-manifest.json`.
4. Keyword scan for accidental public readiness, pricing, `SRT`, or new provider-run commitments.
5. `./scripts/checks/run-required.sh`
