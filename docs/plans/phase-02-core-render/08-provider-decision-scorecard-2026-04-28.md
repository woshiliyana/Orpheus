# Phase 2 Provider Decision Scorecard

> Status: accepted and merged
> Role: provider decision packet
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on truth docs: `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`, `/docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
> Provider calls: none
> Last reviewed: 2026-04-28

## Purpose

This packet combines the retained Inworld and Cartesia Phase 2 evidence into one staged provider decision.

It does not run a provider, change runtime code, change public pricing, open public `SRT` export, widen language promises, or update canonical PRD truth. If this packet is accepted, the next implementation posture remains `Inworld-first` with Cartesia retained as the second-provider benchmark and negotiation lever.

## Decision

| Decision field | Verdict |
|---|---|
| `phase2_primary_provider` | `continue_inworld_first_with_warnings` |
| `cartesia_role` | `second_provider_benchmark_and_negotiation_lever` |
| `cartesia_deep_dive` | `hold` |
| `public_pricing_or_launch_expansion` | `blocked_until_guardrail_clears` |

Decision summary:

1. Continue Phase 2 implementation against `Inworld TTS 1.5 Max` first.
2. Keep `Cartesia` active as the same-cycle second-provider benchmark and leverage point.
3. Do not open a paid Cartesia continuation/WebSocket deep-dive yet.
4. Do not harden public included-minute or pricing promises while the current Inworld invoice-equivalent scenario remains above the canonical guardrail.

## Evidence Inputs

| Evidence packet | Provider | Scope | Current verdict | What it contributes |
|---|---|---|---|---|
| [`live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input`](./evidence-artifacts/live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input/) | Inworld | EN over-30 pressure sample | `audio_generation_smoke=warning`; product readiness still missing manual review | Strongest retained long-form orchestration proof: `21 / 21` chunks, `20` stitches, `3` retries, provider-native WAV master, derived MP3 delivery. |
| [`live-smoke-inworld-rafael-es-20260425-085002`](./evidence-artifacts/live-smoke-inworld-rafael-es-20260425-085002/) | Inworld | ES 32-minute retrospective | `audio_generation_smoke=passed_with_warnings`; `product_readiness_evaluation=blocked_by_missing_evidence` | Spanish long-form audio can complete, but the packet lacks the modern manifest, metrics, word timings, SRT/VTT, and manual review set. |
| [`live-smoke-env-loader-and-es-natural-20260427`](./evidence-artifacts/live-smoke-env-loader-and-es-natural-20260427/) | Inworld | EN + ES short provider execution | `passed_for_provider_execution_and_artifact_integrity` | Confirms current env resolution, provider execution, artifact persistence, token preservation, `natural_basic`, and break-tag budget compliance. |
| [`narration-pacing-closeout-20260427.md`](./evidence-artifacts/narration-pacing-closeout-20260427.md) | Inworld | EN + ES pacing decision | closed for Inworld pacing default decision | Keeps `natural_basic` as the default for structured Inworld narration while leaving `exact` available for controlled scripts. |
| [`live-smoke-cartesia-exact-short-20260427`](./evidence-artifacts/live-smoke-cartesia-exact-short-20260427/) | Cartesia | EN + ES short preflight | `audio_generation_smoke=passed_with_warnings`; manual review gate before medium | Proved Cartesia credentials, raw PCM source capture, local MP3 derivation, timing artifacts, and corrected Spanish-language invocation. |
| [`live-smoke-cartesia-medium-20260428`](./evidence-artifacts/live-smoke-cartesia-medium-20260428/) | Cartesia | EN + ES medium benchmark | accepted with warnings for scoped benchmark | Gives the strongest Cartesia comparison packet so far: bilingual medium evidence, no retries, fast completion, accepted listening, and warning-level timing checks. |

## Provider Scorecard

| Provider | Evidence strength | Output readiness | Timing readiness | Format posture | Cost posture | Decision readout |
|---|---|---|---|---|---|---|
| Inworld | Strongest retained long-form proof across EN pressure and ES long audio, with current short EN/ES execution proof. | `warning`: long-form audio can complete, but manual listening and full UX readiness remain incomplete. | `warning`: EN pressure packet has timing assets needing QA; ES long retrospective lacks modern timing assets; ES short smoke has `100%` timestamp coverage. | Provider-native WAV is ready for internal master in the EN pressure packet; derived MP3 is ready for delivery; user-facing WAV export remains held. | Current invoice-equivalent `$50 / 1M chars` scenario fails the full-included Pro guardrail. | Keep as primary because it has the deeper long-form evidence and matches current product truth. |
| Cartesia | Strong medium same-packet EN/ES benchmark, plus short preflight. No long-form continuation/WebSocket evidence yet. | `warning_accepted`: medium EN accepted; medium ES accepted with a voice-speed note. | `warning_accepted`: medium timestamp coverage is partial but spot checks found no material cue drift. | Provider-native raw PCM is retained by manifest; derived 192 kbps MP3 is ready for delivery; user-facing WAV export remains held. | Public plan math remains useful as a second-provider scenario, but it is not a guaranteed margin rescue. | Keep as second-provider benchmark and leverage point; hold deeper paid investigation until a specific blocker or strategic need appears. |

## EN + ES Readiness

| Readiness area | Current readout | Boundary |
|---|---|---|
| English output | Inworld has the strongest long-form evidence through the over-30 pressure sample; Cartesia medium EN is accepted for scoped benchmark comparison. | This is not a full public readiness claim because Inworld manual review and product delivery UX evidence are still incomplete. |
| Spanish output | Inworld has a retained 32-minute audio smoke with warning-level evidence gaps; Cartesia medium ES is accepted with a voice-speed note. | Spanish remains output/timing evidence for the first gate, not full Spanish workspace parity. |
| Timing/subtitle readiness | Cartesia medium timing is warning-accepted after spot checks; Inworld timing evidence is uneven across packets. | Public `SRT` export stays out of scope. Internal timing assets remain evidence, not a launch promise. |
| Long-form envelope | Inworld has stronger long-form proof than Cartesia in the retained packet set. | The packet does not prove the complete frozen `EN + ES` corpus gate across every short, medium, and long slot. |

## Pricing Scenario Readout

This packet reuses the current canonical pricing semantics instead of changing them.

| Scenario | Current planning meaning | Package readout |
|---|---|---|
| `inworld_on_demand_current` at `$50 / 1M chars` | Current live-smoke testing and invoice-equivalent account rate. | Fails the `Pro $20 / 90 min / 70% GM` full-included exposure guardrail. |
| `inworld_growth_equivalent` at `$30 / 1M chars` | Target discount / scale scenario. | Barely clears the guardrail and should not be treated as current account truth. |
| `cartesia_startup_equivalent` at `$31.20 / 1M chars` | Realistic second-provider benchmark band. | Borderline; useful for fallback and negotiation, not proof that public package promises can widen. |
| `cartesia_pro_equivalent` at `$40 / 1M chars` | Small-scale fallback band. | Fails the guardrail and reinforces that Cartesia is not an automatic margin fix. |

Pricing conclusion: provider choice alone does not unblock public pricing. Public pricing or launch expansion remains blocked until the invoice-equivalent provider mix clears the guardrail, included minutes are tightened, price changes, or realized usage evidence supports a narrower exposure strategy.

## Why Not Switch Primary Now

1. Cartesia medium evidence is encouraging but not deeper than the retained Inworld long-form evidence.
2. Cartesia partial timestamp coverage and ES voice-speed notes are acceptable warnings for a benchmark, not enough reason to replace the primary path.
3. Cartesia continuation/WebSocket behavior may be worth testing later, but the current scoped benchmark does not show a structural need to spend on that lane now.
4. Existing product truth already names Inworld first and Cartesia as the same-cycle benchmark. The evidence now supports that posture with warnings rather than contradicting it.

## Missing Evidence And Holds

| Hold | Reason |
|---|---|
| Full product readiness | Manual listening, pronunciation, text-fidelity, product delivery UX, and full scorecard coverage are still incomplete across the evidence set. |
| Public `SRT` export | Timing assets are useful internally, but final public subtitle export remains a later layer. |
| Public pricing expansion | Current Inworld `$50 / 1M chars` invoice-equivalent scenario does not clear the canonical full-exposure guardrail. |
| Cartesia deep-dive | No current evidence requires a paid continuation/WebSocket lane; open it only if future long-form scope or routing strategy depends on Cartesia's strongest mode. |
| Full frozen-corpus completion | The retained evidence is enough for a staged provider decision, not enough to claim every frozen short, medium, and long EN/ES slot is fully complete. |

## No Canonical Backfill

No canonical PRD, pricing, entitlement, lifecycle, language-boundary, workbook, or runtime-code backfill is required from this packet because it does not change product truth.

If a future decision changes primary provider, public package limits, public language promises, `SRT` export readiness, or supported single-project envelope, update the canonical documents first and then refresh this execution packet.

## Verification Targets

Before this packet can be accepted, run:

1. `git diff --check`
2. Link/path sanity checks for every referenced evidence packet.
3. Keyword scan for accidental provider flip, public pricing promise, public `SRT` launch claim, or Cartesia continuation commitment.
4. `./scripts/checks/run-required.sh`
