# Guest Trial Identity

> Status: approved
> Normative: yes
> Canonical owner: Auth / backend
> Consumers: auth, backend, growth, support, ops, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/billing-usage-semantics.md`
> Supersedes: informal guest-trial wording in `/docs/prd/prd.md`
> Last reviewed: 2026-04-22

## Purpose

This spec defines how anonymous trial users are identified, how their assets are stored, and how a successful guest trial is claimed by a newly registered user.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `guest_trial_session` | The anonymous identity used before account creation |
| `eligibility_key` | The anti-abuse identifier derived from session cookie plus supporting risk signals |
| `claim_window` | The time period during which a guest trial project can be attached to a newly created user |

## Decision Tables

### 1. Guest Session Model

| Field | Rule |
|---|---|
| Session creation | Create a `guest_trial_session` on first eligible anonymous trial attempt |
| Identity anchor | Use a durable browser cookie as the primary anchor |
| Supporting risk signals | May include device signature, IP bucket, and user-agent fingerprint for abuse detection |
| Scope | One guest session may own one successful trial project |

### 2. Eligibility Rules

| Rule | Default |
|---|---|
| Anonymous trial count | One successful guest trial per `eligibility_key` |
| Trial project duration | Maximum 2 minutes |
| Clone entitlement | Not allowed for guest trials |
| Risk escalation | Turnstile and stricter checks apply when repeated attempts are detected |

### 3. Asset Ownership and Retention

| Asset type | Owner before claim | Retention rule |
|---|---|---|
| Trial project record | `guest_trial_session` | Keep until claimed or expired |
| Trial audio output | `guest_trial_session` | Retain for 7 days after completion |
| Internal alignment / SRT assets | `guest_trial_session` | Retain for 7 days after completion |
| Abuse and audit metadata | `guest_trial_session` | Retain for 30 days even if user assets are deleted |

### 4. Claim and Merge Rules

| Step | Rule |
|---|---|
| Claim precondition | User registers or logs in from the same active guest session, or presents a valid claim token tied to that session |
| Claim window | 7 days from successful guest project completion |
| Merge behavior | Re-parent project, runs, and user-visible assets from `guest_trial_session` to `user_id` |
| Ledger behavior | Preserve guest trial usage as `origin=guest_trial`; do not convert it into monthly Free usage |
| Free plan relation | Guest trial and monthly Free quota are separate buckets |

### 5. Expiry Rules

| State | Rule |
|---|---|
| Unclaimed after 7 days | Delete user-visible assets, keep minimal audit metadata |
| Claimed within window | Keep assets under the new user account and preserve original usage origin |
| Fraud review trigger | Ops may block claim even within window if risk review fails |

## Narrative Notes

1. The guest trial is an acquisition path, not a hidden registered free account.
2. Keeping the guest bucket separate from the monthly Free bucket resolves double-accounting ambiguity.
3. Claiming transfers ownership, but it does not rewrite the historical fact that the project began as a guest trial.

## Update Checklist

1. Re-check PRD sections `8`, `15`, `19.3`, and `22.7` after any guest rule change.
2. Re-check `billing-usage-semantics.md` if guest usage starts consuming the same quota as Free.
3. Re-check `capability-entitlements.md` if guest project limits or capabilities change.
