# Billing and Usage Semantics

> Status: approved
> Normative: yes
> Canonical owner: Product + backend
> Consumers: billing, backend, support, ops, product, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`
> Supersedes: scattered billing wording in `/docs/prd/prd.md`
> Last reviewed: 2026-04-29

## Purpose

This spec defines the canonical metering model for successful generation, partial repair, failure handling, compensation, quota exhaustion, and the user-visible remaining balance.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `billable_seconds` | The primary usage accounting unit stored in the ledger |
| `display_minutes` | User-facing minutes derived from `billable_seconds` |
| `included_seconds` | The plan quota reset each billing cycle according to the pricing spec |
| `top_up_seconds` | Optional later-layer purchased seconds that sit outside the subscription reset bucket |
| `usage_event` | A workflow usage record tied to project execution |
| `billing_event` | A commercial record such as subscription change, refund, or compensation |
| `compensation` | A negative adjustment that reverses some or all prior billable usage |
| `voice_selection` | The selected platform or private voice used for generation; it affects generation configuration but is not a separate downloadable or billable voice asset |

## Decision Tables

### 1. Canonical Accounting Units

| Unit | Role | Rule |
|---|---|---|
| `billable_seconds` | Final source of truth | Store as integer seconds in `usage_ledger` |
| `internal_points` | Optional internal cost model | May exist, but never overrides `billable_seconds` |
| `display_minutes` | UI only | Derived from seconds, never used for exhaustion checks |
| `included_seconds` | Pricing-packaging link | Loaded from the active plan policy, never inferred from UI copy |
| `top_up_seconds` | Optional later-layer balance | Only exists if top-ups are explicitly enabled |

### 2. Usage Event Types

| `usage_event` | Trigger | Billable rule |
|---|---|---|
| `initial_render_success` | First successful full-project audio generation | Bill `final_audio_duration_seconds` |
| `segment_repair_success` | Successful partial repair | Bill the sum of regenerated segment durations only |
| `guest_trial_success` | Successful anonymous trial generation | Bill seconds to the trial bucket, not the monthly free bucket |
| `non_billable_failure` | Failed execution before a billable success exists | Bill `0` seconds |

### 3. Scenario Metering Rules

| Scenario | Billable seconds | Notes |
|---|---|---|
| Full project success | Final delivered audio duration | One successful full run equals one usage event |
| Segment repair success | Sum of replaced segment durations | Never bill the entire project again for a repair run |
| Validation failure | 0 | Covers malformed request, missing input, or invalid file |
| Entitlement failure | 0 | Covers blocked plan access or closed beta restriction |
| Provider pre-check failure | 0 | Covers quota/auth failure before rendering starts |
| Voice-selection entitlement failure | 0 | Covers a user selecting a voice tier, private clone, or long-form download path their plan cannot access |
| Orchestration failure before usable audio | 0 | Covers backend chunk planning, retry graph, or stitch coordination failure before successful delivery |
| Rendering failure before usable audio | 0 | No bill until usable output exists |
| Audio success, alignment or `SRT` export failure | Bill audio only | No extra subtitle charge |
| Delivery/storage failure after asset creation | 0 extra | Retry delivery without new usage |
| Downloading generated audio after entitlement check | 0 extra | The paid usage event is tied to generated audio duration, not to every download click |
| Attempting to download an underlying platform voice, provider `voiceId`, prompt, model, or clone/source asset | 0 | This is not an allowed product action, so it should be blocked before billing |

### 4. Balance and Exhaustion Rules

| Field / case | Rule |
|---|---|
| `display_used_minutes` | Round total used seconds to 1 decimal minute using standard rounding |
| `display_remaining_minutes` | Floor remaining seconds to 1 decimal minute to avoid overstating available quota |
| Exhaustion checks | Use raw remaining seconds, not display minutes |
| Plan quota storage | Store as `included_seconds` per billing period sourced from the pricing spec |
| Consumption order | Consume current-cycle `included_seconds` first, then `top_up_seconds` if top-ups later exist |
| Automatic pay-as-you-go overage | Off by default in V1 |
| No remaining billable balance | Block new billable generation until upgrade, renewal, or explicit top-up path exists |

### 5. Billing Event Types

| `billing_event` | Purpose | Usage impact |
|---|---|---|
| `subscription_started` | Plan activated | No direct usage change |
| `subscription_renewed` | Billing cycle reset | Resets included seconds per plan policy |
| `subscription_failed` | Renewal or payment failure | No automatic usage deletion; entitlement logic decides access |
| `top_up_purchased` | Optional later-layer quota increase | Adds `top_up_seconds` with audit trail |
| `manual_compensation` | Ops or support credit | Negative usage adjustment allowed |
| `refund` | Commercial refund | Does not automatically delete usage history |
| `admin_adjustment` | Internal correction | May increase or decrease usable balance with audit reason |

### 6. Compensation Rules

| Situation | Default compensation rule |
|---|---|
| Non-billable failure | No compensation needed because no usage was charged |
| Audio success, alignment or subtitle failure | No automatic compensation by default; retry the non-audio path first |
| Incorrect overcharge confirmed by ops | Create `manual_compensation` billing event and matching negative usage adjustment |
| Service outage affecting multiple successful billable runs | Batch compensation allowed with one audited billing event per affected account |

## Narrative Notes

1. Metering is intentionally based on seconds so the ledger is precise even though the UI talks in minutes.
2. User-facing plan copy can remain minute-based, but agents and services must treat seconds as canonical.
3. Segment repair is a real paid consumption event, but only for the repaired duration.
4. Backend-only orchestration sub-runs never create extra billable events unless a user-triggered repair succeeds.
5. Pricing copy may change more often than ledger rules, but `included_seconds`, reset policy, and exhaustion handling still have to remain in sync with the pricing spec.
6. Voice choice does not create a separate usage unit. The billable artifact is the delivered generated audio duration for an entitled run; the underlying platform voice remains a provider/platform asset and is never sold, downloaded, or metered as a user-owned asset.

## Update Checklist

1. Re-check `project-run-lifecycle.md` if a failure stage changes billing behavior.
2. Re-check `capability-entitlements.md` if repair availability or plan limits change.
3. Re-check PRD sections `19.3-19.11` after any metering change.
4. Re-check `pricing-packaging-and-unit-economics.md` if included seconds, reset policy, top-up behavior, or public minute copy changes.
