# Pricing, Packaging, and Unit Economics

> Status: approved
> Normative: yes
> Canonical owner: Product + finance / ops
> Consumers: product, growth, billing, ops, support, frontend, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/distribution-and-growth-surface.md`
> Supersedes: pricing and cost assumptions scattered across `/docs/prd/prd.md`
> Last reviewed: 2026-04-23

## Purpose

This spec owns Orpheus pricing anchors, packaging logic, included-minute policy, unit-economics formulas, review cadence, and the update triggers that force plan changes. It exists so public pricing, entitlement limits, metering, and real provider cost do not drift apart.

The workbook at `/docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.40.xlsx` is a required planning companion artifact for editable calculations, but it is not canonical truth. If the workbook and this Markdown spec diverge, this Markdown spec wins until both are reconciled in the same change.

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

## Decision Tables

### 1. Canonical Ownership Boundary

| Topic | Canonical owner |
|---|---|
| Public price anchors, annual discount policy, included minutes, and packaging ladder | This spec |
| Feature gates and plan capability matrix | `capability-entitlements.md` |
| Metering, billable seconds, refunds, and compensation semantics | `billing-usage-semantics.md` |
| Whether a pricing page can go live | `distribution-and-growth-surface.md` |
| Failure stages, retries, and run lifecycle meaning | `project-run-lifecycle.md` |

### 2. Current Working Plan Anchor

These are working packaging assumptions, not automatic public-launch promises.

| Plan | Monthly anchor | Yearly working anchor | Included minutes / month | Single-project envelope | Packaging role |
|---|---:|---:|---:|---:|---|
| `Free` | `$0` | n/a | `10` | `2 min` | Later-layer experience path, not first release promise |
| `Pro` | `$20` | `$16/mo billed yearly` | `90` | `30 min` | Default paid plan and first stable-audio commercial path |
| `Ultimate` | `$60` | `$48/mo billed yearly` | `240` | `60 min` | Heavy creator path with more throughput, stronger priority, and deeper controlled access |

### 3. Packaging Ladder Rules

| Rule | Required |
|---|---|
| `Pro` must be the main paid plan for the first stable-audio wedge | Yes |
| `Pro` must cover at least three representative projects at the current `30 min` envelope assumption | Yes |
| `Ultimate` must add more than minutes alone; it must also add operational priority and deeper controlled capability | Yes |
| `Free` may help people understand the value, but it cannot become an unlimited long-form audio promise | Yes |
| Public copy must explain plans in minutes, single-project length, and workflow differences, not internal credits | Yes |
| Annual discounts may exist, but should stay conservative until real unit economics are stable | Yes |

### 4. V1 Overage and Upgrade Rules

| Situation | V1 default |
|---|---|
| User reaches included minutes | Stop new billable generation until upgrade or manual top-up path exists |
| Automatic pay-as-you-go overage | Off by default in V1 |
| Top-up packs | Optional later layer, only after pricing review stabilizes |
| Public “unlimited” claims | Not allowed for long-form audio generation |

### 5. Required Planning Inputs for the Review Snapshot

The snapshot must carry explicit editable inputs. The spreadsheet model may format them differently, but it may not invent a different meaning.

| Input | Required meaning | Current working default |
|---|---|---:|
| `chars_per_audio_minute` | Average source characters needed for one delivered audio minute | `900` |
| `primary_tts_rate_per_1m_chars` | Planning TTS rate for the main hosted provider path | `$30` |
| `stt_rate_per_audio_minute` | Cost of the alignment / transcription support path per audio minute | `$0.016` |
| `alignment_compute_per_audio_minute` | Extra alignment or forced-alignment compute allowance per minute | `$0.010` |
| `retry_overhead_factor` | Multiplier covering retry, re-stitch, and orchestration overhead | `1.15` |
| `storage_delivery_per_audio_minute` | Artifact storage and delivery allocation per minute | `$0.002` |
| `payment_fee_rate` | Effective payment fee assumption applied to paid revenue | `3%` |
| `gross_margin_floor` | Expected minimum gross margin before broader self-serve rollout | `70%` |

### 6. Canonical Review Formulas

1. `blended_tts_cost_per_completed_minute = (primary_tts_rate_per_1m_chars / 1_000_000 * chars_per_audio_minute) * retry_overhead_factor`
2. `cost_per_completed_audio_minute = blended_tts_cost_per_completed_minute + stt_rate_per_audio_minute + alignment_compute_per_audio_minute + storage_delivery_per_audio_minute`
3. `full_included_exposure_cost = included_minutes * cost_per_completed_audio_minute`
4. `payment_fee_cost = monthly_price * payment_fee_rate`
5. `gross_margin_after_fees = (monthly_price - full_included_exposure_cost - payment_fee_cost) / monthly_price`

The review snapshot must include both:
- a `full included exposure` view
- a `realized usage` view using actual `p50` and `p90` consumption data for the active cohort

### 7. Review Cadence and Required Snapshot Fields

| Situation | Required cadence |
|---|---|
| Founder-led validation while provider mix is still moving | Review on every meaningful provider / pricing / envelope change |
| Before opening a public pricing page | Mandatory fresh snapshot |
| After self-serve pricing is live | At least monthly |
| Any triggered mismatch event in section 8 | Immediate review |

Every `review_snapshot` must include at least:

1. Active provider blend and fallback share
2. Current `cost_per_completed_audio_minute`
3. `p50` and `p90` paid-plan minute consumption
4. Full-included exposure cost by plan
5. Expected gross margin by plan
6. Any mismatch between packaging copy, entitlement rules, and billing resets
7. One explicit recommendation: `keep`, `tighten limits`, `raise price`, `reduce price`, or `change provider mix`
8. One explicit benchmark note against the current self-serve long-form reference point, covering included-minute story, regeneration burden, and subtitle / timestamp workflow value

### 8. Update Triggers

Any of the following forces a pricing review before public copy or plan limits can change:

1. Provider pricing or contract terms change
2. The proven stable `single_project_envelope` changes
3. `fallback_mix` rises above the working threshold agreed in the review snapshot
4. `cost_per_completed_audio_minute` changes by more than `15%`
5. Free or no-login trial becomes a real public surface
6. The team wants to change included minutes, annual discount policy, or plan positioning
7. Support or billing semantics would cause the visible “remaining minutes” story to change
8. The public self-serve benchmark for long-form narration shifts enough that Orpheus would look weak on included-minute or workflow value comparisons without a deliberate packaging response

### 9. Approval Rules

| Change type | Minimum required sync |
|---|---|
| Public price change | Update this spec, PRD summary sections `19.2-19.8`, and any pricing page copy in one change |
| Included-minute change | Update this spec, billing reset policy if needed, and PRD summary in one change |
| Single-project envelope change | Update this spec, `capability-entitlements.md`, distribution copy, and PRD summary in one change |
| Overage / top-up policy change | Update this spec and `billing-usage-semantics.md` in one change |

## Narrative Notes

1. Audio is not image generation. Marginal cost, queue time, and failure recovery are materially more expensive, so Orpheus should borrow Raphael-style clarity without borrowing unlimited-free economics.
2. The purpose of `Pro` is not to be cheap; it is to be the first honest paid path for stable long-form audio.
3. Internal credits may still exist, but they are implementation detail. Public packaging truth is minutes, project length, and workflow value.
4. The editable spreadsheet model is an operating artifact. It may change inputs, but it must keep the meanings and formulas defined here.
5. Pricing should widen only after stable delivery and margin evidence are both real.
6. Long-form support by itself is not a moat. Existing self-serve tools already occupy the mental slot of "AI can narrate long text". Orpheus should not go public on a self-serve pricing page unless it can win on one-submit stability, lower operator burden, creator-fit workflow, or alignment-backed delivery value.
7. The current `$20 / 90 min` Pro anchor is a conservative internal working package, not proof that the public market will find the raw minute ladder compelling. If public comparison pressure rises before workflow differentiation is visible, pricing rollout stays gated.
8. The workbook belongs in the formal Phase 2 planning set because operators will edit it, but review, implementation, and agent reasoning must still treat this Markdown file as the canonical source of pricing semantics.

## Update Checklist

1. Re-check `capability-entitlements.md` whenever a plan’s single-project envelope or controlled capability changes.
2. Re-check `billing-usage-semantics.md` whenever included minutes, overage behavior, or reset logic changes.
3. Re-check `distribution-and-growth-surface.md` whenever public pricing, free-trial posture, or plan positioning changes.
4. Re-check PRD sections `19.2-19.8` after any change in this spec.
