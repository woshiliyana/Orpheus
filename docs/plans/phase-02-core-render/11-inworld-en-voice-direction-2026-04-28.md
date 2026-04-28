# Inworld EN Voice Direction

> Status: awaiting user acceptance
> Role: English voice-target decision and future shortlist rubric
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on truth docs: `/docs/prd/specs/voice-metadata-schema.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/plans/phase-02-core-render/10-inworld-en-manual-review-2026-04-28.md`
> Provider calls: none
> Last reviewed: 2026-04-28

## Purpose

This packet converts the 2026-04-28 founder spot-check feedback on the retained Inworld Ashley EN pressure output into a narrow English voice-selection direction.

It does not query the Inworld catalog, name new Inworld voice IDs, generate audio, change runtime code, change the voice metadata schema, update pricing, widen public language promises, or claim launch-ready English voice fit.

## Verdict

| Decision field | Verdict |
|---|---|
| `en_voice_target` | `mature_steady_male_educational_explainer` |
| `ashley_role` | `pipeline_and_long_form_evidence_voice_not_final_persona_candidate` |
| `candidate_catalog_status` | `not_verified_in_this_lane` |
| `next_provider_call` | `hold_until_candidate_shortlist_is_verified` |
| `next_paid_audio_scope` | `short_voice_fit_samples_only_before_any_new_long_form_run` |
| `inworld_primary_provider` | `unchanged_continue_with_warnings` |
| `public_promise_change` | `none` |

Decision summary:

1. Keep the Ashley EN pressure run as valid evidence for Inworld long-form generation, hidden chunking, retry recovery, delivery-format posture, and sampled stitch behavior.
2. Do not keep Ashley as the final English persona candidate for the psychology / educational-explainer wedge.
3. The English target should move toward a male voice that feels mature, steady, credible, and calm over long-form narration.
4. Do not spend on another long-form Inworld EN run until the candidate voice shortlist is verified and reviewed on short samples.
5. Do not name or lock any new Inworld voice in this packet; the current provider voice catalog was not refreshed here.

## Evidence Inputs

| Evidence | What it contributes |
|---|---|
| [`10-inworld-en-manual-review-2026-04-28.md`](./10-inworld-en-manual-review-2026-04-28.md) | Records founder spot-check: first three stitch boundaries had no material issue, no obvious machine feel, opening phrasing warning, and Ashley voice-fit warning. |
| [`manual-review-20260428.md`](./evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/manual-review-20260428.md) | Packet-local manual-review note preserving the partial founder spot-check and the preferred mature steady male direction. |
| [`voice-metadata-schema.md`](../../prd/specs/voice-metadata-schema.md) | Confirms structured runtime voice truth belongs in the database-backed voice catalog and should not be invented in ad hoc docs. |
| [`phase-02-core-render-workflow.md`](../../roadmap/phases/phase-02-core-render-workflow.md) | Keeps Phase 2 accountable to a basic voice-selection baseline rather than one hidden internal voice. |

## English Voice Target

| Attribute | Target |
|---|---|
| Gender / presentation | Male-presenting voice direction for the next English persona candidate. |
| Age / maturity | Mature rather than youthful; credible for analysis and educational narration. |
| Tone | Calm, steady, grounded, and confident. |
| Energy | Controlled medium-low energy; not sleepy, but not salesy or theatrical. |
| Persona fit | Long-form psychology / educational explainer, where authority and trust matter more than brightness. |
| Pacing feel | Comfortable for 20-40 minute listening without rushing, overacting, or flattening into monotony. |
| Accent / pronunciation | Clear English pronunciation; names, numerals, and psychology terms should not distract. |

Anti-targets:

1. Bright, youthful, or presenter-like voices that feel light for serious psychology narration.
2. Voices that sound like ads, trailers, radio promos, or social-short hooks.
3. Overly emotional or performative delivery.
4. Voices that hide weak pronunciation behind dramatic tone.
5. Any voice that sounds acceptable for a short clip but becomes tiring over a long-form listen.

## Future Shortlist Rules

Before another paid English long-form run:

1. Verify the current Inworld voice catalog through an official provider surface or primary-source documentation.
2. Record the exact candidate voice names / IDs and the verification date.
3. Choose no more than `2-3` English candidates that match the target above.
4. Run only short voice-fit samples first, using the same representative English wedge script excerpt.
5. Record human review before promoting any candidate into a medium or long run.
6. Preserve the candidate decision in the evidence packet before cleanup.

If the next lane needs to introduce new provider voice IDs, refresh provider documentation or provider-console truth first. Do not rely on memory or stale examples.

## Short-Sample Review Rubric

| Dimension | Pass condition | Warning condition | Block condition |
|---|---|---|---|
| `persona_fit` | Mature, steady, credible male voice for educational psychology narration. | Mostly credible, but slightly too light, too generic, or too branded. | Wrong persona direction, too young, too casual, too theatrical, or not trustworthy. |
| `long_form_tolerance` | Feels comfortable enough to imagine a 20-40 minute listen. | Acceptable for short clips but uncertain for long form. | Fatiguing, grating, monotone, or over-performed even in a short sample. |
| `clarity` | Clean words, stable volume impression, no obvious machine feel. | Minor awkward phrases that may be script- or pacing-specific. | Robotic artifacts, unstable delivery, or repeated unnatural phrasing. |
| `pronunciation` | Names, numerals, and psychology terms sound acceptable. | Small pronunciation concerns worth tracking. | Mispronunciation likely to damage trust. |
| `pacing` | Natural enough for a serious explainer without rushing. | Slightly fast or slow but potentially adjustable through script / pacing. | So fast, slow, or uneven that it blocks the candidate. |
| `provider_fit` | Keeps Inworld-first viable without changing provider decision. | Requires another candidate comparison. | Suggests Inworld English voice fit may remain blocked even if pipeline works. |

## What Stays Unchanged

1. `Inworld-first` remains the Phase 2 primary-provider direction with warnings.
2. Ashley evidence still counts for orchestration, recovery, stitch sampling, audio format, and long-form pressure behavior.
3. Product readiness remains blocked for English voice fit until a revised voice candidate is accepted.
4. Public pricing, public `SRT`, no-login trial, multilingual workspace, and launch posture remain unchanged.
5. Voice metadata schema does not change in this lane.

## Next Lane Candidate

`phase2-inworld-en-voice-shortlist-r1`

Suggested scope:

1. Refresh current Inworld voice catalog through an official provider surface.
2. Select `2-3` candidate English male voices that match this target.
3. Prepare a short fixed excerpt for voice-fit samples.
4. Decide whether short paid samples are justified.
5. Do not run another long-form pressure test until a short-sample voice candidate is accepted.

## Verification Targets

Before this packet can be accepted:

1. `git diff --check`
2. Link/path sanity checks for referenced docs.
3. Keyword scan for accidental new provider voice IDs, public readiness, pricing, `SRT`, or new long-form provider-run commitments.
4. `./scripts/checks/run-required.sh`
