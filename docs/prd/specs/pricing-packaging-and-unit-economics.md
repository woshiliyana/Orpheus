# Pricing, Packaging, and Unit Economics

> Status: approved
> Normative: yes
> Canonical owner: Product + finance / ops
> Consumers: product, growth, billing, ops, support, frontend, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/distribution-and-growth-surface.md`, `/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`
> Supersedes: pricing and cost assumptions scattered across `/docs/prd/prd.md`
> Last reviewed: 2026-04-25

## Purpose

This spec owns Orpheus pricing anchors, packaging logic, included-minute policy, unit-economics formulas, review cadence, and the update triggers that force plan changes. It exists so public pricing, entitlement limits, metering, and real provider cost do not drift apart.

The workbook at `/docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx` is a required planning companion artifact for editable calculations, but it is not canonical truth. If the workbook and this Markdown spec diverge, this Markdown spec wins until both are reconciled in the same change.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `price_anchor` | The current working or launch-approved price point for a plan |
| `plan packaging` | The combination of price, included minutes, single-project envelope, queue priority, and capability positioning |
| `included_seconds` | The usage quota loaded into an account for a billing period |
| `single_project_envelope` | The maximum single-project duration a plan can honestly support |
| `cost_per_completed_audio_minute` | The blended variable cost of one successfully delivered audio minute after retries and non-audio processing are considered |
| `fallback_mix` | The percentage of completed audio minutes generated on non-primary providers |
| `review_snapshot` | The periodic pricing-and-cost review artifact used before changing public prices or plan limits |
| `gross_margin_floor` | The minimum acceptable expected gross margin for a plan before broader rollout proceeds |
| `provider_invoice_verified_rate` | The TTS rate assumption backed by the current contract, invoice, or plan-equivalent cost that the team can actually buy today |
| `provider_scenario` | A named provider-cost case used in reviews, such as `inworld_growth_equivalent` or `cartesia_startup_equivalent` |
| `plan_exposure_guardrail` | The maximum variable-cost envelope a plan can tolerate at full included usage while still clearing the target gross margin |

## Decision Tables

### 1. Canonical Ownership Boundary

| Topic | Canonical owner |
|---|---|
| Public price anchors, annual discount policy, included minutes, and packaging ladder | This spec |
| Feature gates and plan capability matrix | `capability-entitlements.md` |
| Metering, billable seconds, refunds, and compensation semantics | `billing-usage-semantics.md` |
| Whether a pricing page can go live | `distribution-and-growth-surface.md` |
| Failure stages, retries, and run lifecycle meaning | `project-run-lifecycle.md` |
| Public market context and competitor reference workflow | `reviews/2026-04-23-competitive-benchmark-longform-audio.md` as required input, but not normative by itself |

### 2. Current Working Plan Anchor

These are working packaging assumptions, not automatic public-launch promises.

| Plan | Monthly anchor | Yearly working anchor | Included minutes / month | Single-project envelope | Packaging role | Release posture |
|---|---:|---:|---:|---:|---|---|
| `Free` | `$0` | n/a | `10` | `2 min` | Later-layer experience path, not first release promise | May exist as demo or guest layer later, but not as an unlimited or full long-form promise |
| `Pro` | `$20` | `$16/mo billed yearly` | `90` | `30 min` | Default paid plan and first stable-audio commercial path | Conditional internal anchor only until provider-cost evidence clears the guardrail |
| `Ultimate` | `$60` | `$48/mo billed yearly` | `240` | `60 min` | Heavy creator path with more throughput, stronger priority, and deeper controlled access | Internal working anchor only until `Pro` is validated |

### 3. Packaging Ladder Rules

| Rule | Required |
|---|---|
| `Pro` must be the main paid plan for the first stable-audio wedge | Yes |
| `Pro` must cover at least three representative projects at the current `30 min` envelope assumption | Yes |
| `Ultimate` must add more than minutes alone; it must also add operational priority and deeper controlled capability | Yes |
| `Free` may help people understand the value, but it cannot become an unlimited long-form audio promise | Yes |
| Public copy must explain plans in minutes, single-project length, and workflow differences, not internal credits | Yes |
| Annual discounts may exist, but should stay conservative until real unit economics are stable | Yes |
| The first public package must sell `one-submit stable narration` and later `subtitle-ready workflow`, not raw minutes in isolation | Yes |

### 4. V1 Overage and Upgrade Rules

| Situation | V1 default |
|---|---|
| User reaches included minutes | Stop new billable generation until upgrade or manual top-up path exists |
| Automatic pay-as-you-go overage | Off by default in V1 |
| Top-up packs | Optional later layer, only after pricing review stabilizes |
| Public `unlimited` claims | Not allowed for long-form audio generation |

### 5. Current Working Provider Scenario Matrix

These scenarios exist to keep the team from pretending that one optimistic provider number is the whole truth.

| Scenario | Public source logic | Effective TTS rate / 1M chars | Current planning meaning | `Pro $20 / 90 min / 70% GM` status |
|---|---|---:|---|---|
| `inworld_on_demand_current` | Current account usage screen and On-Demand / Creator visible rate | `$50.00` | Current live-smoke testing and invoice-equivalent account rate | Fails hard |
| `inworld_creator_equivalent` | Inworld Creator visible rate | `$50.00` | Small-plan paid tier; monthly credits do not reduce the TTS Max unit rate | Fails hard |
| `inworld_developer_equivalent` | Inworld Developer visible discounted rate | `$40.00` | 20% discounted tier and higher-fixed-cost fallback | Fails |
| `inworld_growth_equivalent` | Inworld Growth visible discounted rate | `$30.00` | 40% discounted tier and target negotiation / scale anchor | Barely passes |
| `inworld_marketing_doc_equivalent` | TTS-1.5 Max public TTS page | `$10.00` | Optimistic marketing / docs signal; cannot be launch truth by itself | Comfortable |
| `cartesia_scale_equivalent` | `$239 / 8M credits`, `1 credit = 1 char` | `$29.875` | Negotiated / higher-volume fallback band | Barely passes |
| `cartesia_startup_equivalent` | `$39 / 1.25M credits`, `1 credit = 1 char` | `$31.20` | Realistic second-provider benchmark band | Borderline |
| `cartesia_pro_equivalent` | `$4 / 100K credits`, `1 credit = 1 char` | `$40.00` | Small-scale fallback band | Fails |

### 6. Required Planning Inputs for the Review Snapshot

The snapshot must carry explicit editable inputs. The spreadsheet model may format them differently, but it may not invent a different meaning.

| Input | Required meaning | Current working default |
|---|---|---:|
| `chars_per_audio_minute` | Average source characters needed for one delivered audio minute | `900` |
| `primary_tts_rate_per_1m_chars` | Current invoice-equivalent TTS rate for the main hosted provider path | `$50` |
| `stt_rate_per_audio_minute` | Cost of the alignment / transcription support path per audio minute | `$0.016` |
| `alignment_compute_per_audio_minute` | Extra alignment or forced-alignment compute allowance per minute | `$0.010` |
| `retry_overhead_factor` | Multiplier covering retry, re-stitch, and orchestration overhead | `1.15` |
| `storage_delivery_per_audio_minute` | Artifact storage and delivery allocation per minute | `$0.002` |
| `payment_fee_rate` | Effective payment fee assumption applied to paid revenue | `3%` |
| `gross_margin_floor` | Expected minimum gross margin before broader self-serve rollout | `70%` |

### 7. Canonical Review Formulas

1. `blended_tts_cost_per_completed_minute = (primary_tts_rate_per_1m_chars / 1_000_000 * chars_per_audio_minute) * retry_overhead_factor`
2. `non_tts_cost_per_completed_minute = stt_rate_per_audio_minute + alignment_compute_per_audio_minute + storage_delivery_per_audio_minute`
3. `cost_per_completed_audio_minute = blended_tts_cost_per_completed_minute + non_tts_cost_per_completed_minute`
4. `full_included_exposure_cost = included_minutes * cost_per_completed_audio_minute`
5. `payment_fee_cost = monthly_price * payment_fee_rate`
6. `gross_margin_after_fees = (monthly_price - full_included_exposure_cost - payment_fee_cost) / monthly_price`
7. `plan_exposure_guardrail = monthly_price * (1 - payment_fee_rate - gross_margin_floor)`
8. `max_allowed_total_variable_cost_per_minute = plan_exposure_guardrail / included_minutes`
9. `max_allowed_tts_rate_per_1m_chars = ((max_allowed_total_variable_cost_per_minute - non_tts_cost_per_completed_minute) / retry_overhead_factor) * (1_000_000 / chars_per_audio_minute)`

The review snapshot must include both:
- a `full included exposure` view
- a `realized usage` view using actual `p50` and `p90` consumption data for the active cohort

### 8. Current Working Guardrail Readout

Using the current defaults above:

| Metric | Current value |
|---|---:|
| `non_tts_cost_per_completed_minute` | `$0.0280` |
| `current_primary_tts_rate_per_1m_chars` | `$50.00` |
| `current_primary_cost_per_completed_audio_minute` | `~$0.0798` |
| `current_primary_full_included_exposure_cost_for_Pro_90_min` | `~$7.18` |
| `current_primary_gross_margin_after_fees_for_Pro_90_min` | `~61.1%` |
| `plan_exposure_guardrail` for `Pro $20` at `70% GM` and `3%` payment fees | `$5.40` |
| `max_allowed_total_variable_cost_per_minute` for `Pro 90 min` | `$0.0600` |
| `max_allowed_tts_rate_per_1m_chars` for `Pro 90 min` | `~$30.92` |

Practical reading:

- `Pro $20 / 90 min` is acceptable only if the invoice-equivalent TTS rate is roughly `<= $30.92 / 1M chars` under the current non-TTS assumptions.
- The current live-smoke account rate is `$50 / 1M chars`, so `Pro $20 / 90 min` does not clear the full-included exposure guardrail at the current invoice-equivalent rate.
- If the realized TTS rate behaves like `$50 / 1M chars`, then `Pro` must either reduce included minutes to roughly the high-`60s`, raise price, obtain a discounted provider tier, or remain non-public until realized-usage evidence offsets the exposure view.
- If the realized TTS rate behaves more like `$40 / 1M chars`, then `Pro` must either reduce included minutes to roughly the high-`70s`, raise price, or remain non-public until usage evidence offsets the exposure view.
- The `$30 / 1M chars` Growth-tier planning anchor is not the current account truth; it is the target discount / scale scenario that narrowly clears the full-exposure guardrail.

### 9. Review Cadence and Required Snapshot Fields

| Situation | Required cadence |
|---|---|
| Founder-led validation while provider mix is still moving | Review on every meaningful provider / pricing / envelope change |
| Before opening a public pricing page | Mandatory fresh snapshot |
| After self-serve pricing is live | At least monthly |
| Any triggered mismatch event in section 10 | Immediate review |

Every `review_snapshot` must include at least:

1. Active provider blend and fallback share
2. Current `cost_per_completed_audio_minute`
3. `p50` and `p90` paid-plan minute consumption
4. Full-included exposure cost by plan
5. Expected gross margin by plan
6. One explicit provider-scenario table with the current invoice-equivalent assumption and at least one higher-cost fallback case
7. Any mismatch between packaging copy, entitlement rules, and billing resets
8. One explicit recommendation: `keep`, `tighten limits`, `raise price`, `reduce price`, or `change provider mix`
9. One explicit benchmark note against the current self-serve long-form reference point, covering included-minute story, regeneration burden, and subtitle / timestamp workflow value

### 10. Update Triggers

Any of the following forces a pricing review before public copy or plan limits can change:

1. Provider pricing or contract terms change
2. The proven stable `single_project_envelope` changes
3. `fallback_mix` rises above the working threshold agreed in the review snapshot
4. `cost_per_completed_audio_minute` changes by more than `15%`
5. Free or no-login trial becomes a real public surface
6. The team wants to change included minutes, annual discount policy, or plan positioning
7. Support or billing semantics would cause the visible `remaining minutes` story to change
8. The public self-serve benchmark for long-form narration shifts enough that Orpheus would look weak on included-minute or workflow value comparisons without a deliberate packaging response
9. The team wants to keep `Pro $20 / 90 min` even though the invoice-equivalent TTS rate no longer clears the guardrail

### 11. Approval Rules

| Change type | Minimum required sync |
|---|---|
| Public price change | Update this spec, PRD summary sections `19.2-19.8`, and any pricing page copy in one change |
| Included-minute change | Update this spec, billing reset policy if needed, and PRD summary in one change |
| Single-project envelope change | Update this spec, `capability-entitlements.md`, distribution copy, and PRD summary in one change |
| Overage / top-up policy change | Update this spec and `billing-usage-semantics.md` in one change |
| Provider-cost guardrail change | Update this spec, the workbook, and the benchmark note in one change |

## Narrative Notes

1. Audio is not image generation. Marginal cost, queue time, and failure recovery are materially more expensive, so Orpheus should borrow Raphael-style clarity without borrowing unlimited-free economics.
2. The purpose of `Pro` is not to be cheap; it is to be the first honest paid path for stable long-form audio.
3. Internal credits may still exist, but they are implementation detail. Public packaging truth is minutes, project length, and workflow value.
4. The editable spreadsheet model is an operating artifact. It may change inputs, but it must keep the meanings and formulas defined here.
5. Pricing should widen only after stable delivery and margin evidence are both real.
6. Long-form support by itself is not a moat. Existing self-serve tools already occupy the mental slot of `AI can narrate long text`. Orpheus should not go public on a self-serve pricing page unless it can win on one-submit stability, lower operator burden, creator-fit workflow, or alignment-backed delivery value.
7. The current `$20 / 90 min` Pro anchor is a conservative internal working package, not proof that the public market will find the raw minute ladder compelling.
8. Public-facing packaging must survive the higher-cost scenario, not just the prettiest marketing number.
9. If the current provider-cost evidence only supports a smaller allowance, it is better to narrow minutes than to launch a fake bargain and discover the margin hole later.
10. A second-provider scenario is not optional bookkeeping. It is part of the real business truth because fallback risk is part of the product.
11. The workbook belongs in the formal Phase 2 planning set because operators will edit it, but review, implementation, and agent reasoning must still treat this Markdown file as the canonical source of pricing semantics.

## Update Checklist

1. Re-check `capability-entitlements.md` whenever a plan’s single-project envelope or controlled capability changes.
2. Re-check `billing-usage-semantics.md` whenever included minutes, overage behavior, or reset logic changes.
3. Re-check `distribution-and-growth-surface.md` whenever public pricing, minute copy, or plan positioning changes.
4. Re-check the benchmark review whenever public competitors materially change their long-form, alignment, or self-serve packaging story.
5. Rebuild the workbook snapshot whenever the provider-cost assumption or `gross_margin_floor` changes.
6. Do not treat `Pro $20 / 90 min` as public truth until the current invoice-equivalent rate clears the guardrail or the team has intentionally accepted a narrower realized-usage strategy.
