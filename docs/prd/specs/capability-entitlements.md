# Capability Entitlements

> Status: approved
> Normative: yes
> Canonical owner: Product
> Consumers: product, growth, frontend, support, ops, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/mksaas-boundary-contract.md`
> Supersedes: entitlement wording scattered across `/docs/prd/prd.md`
> Last reviewed: 2026-04-22

## Purpose

This spec closes V1 scope questions for clone access, SRT export, and segment repair. It separates platform-level workflow capabilities from user-facing plan entitlements.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `platform capability` | A workflow ability the system can produce internally, even if not exposed to every plan |
| `user entitlement` | The ability a specific plan may access in the product UI or API |
| `segment preview` | Listening to individual generated segments inside a completed project |
| `segment repair` | Re-running only targeted project segments and stitching them back into the project output |
| `private clone` | A user-owned clone voice that never becomes part of the public platform library |
| `closed_beta` | A capability exists in V1 but is disabled by default until ops explicitly enables it for an account |
| `starter library` | The broad, lower-cost AI voice catalog intended to give users meaningful free choice inside the active V1 niche cluster |
| `flagship library` | The smaller curated voice set with stronger consistency, sharper persona definition, and paid-plan positioning |

## Decision Tables

### 1. Capability Classification

| Capability | Platform-level status in V1 | User-facing default |
|---|---|---|
| Audio generation and download | Core | Open to every successful project |
| Internal subtitle/alignment asset production | Core | Internal workflow, not always user-exportable |
| SRT export | Core workflow capability | Gated by plan entitlement |
| Segment preview | Core workflow capability | Open to every successful project |
| Segment repair | Core workflow capability | Gated by plan entitlement |
| Private clone creation | Controlled V1 capability | `closed_beta` and plan-gated |
| Starter library access | Core growth capability | Open broadly, with guest vs free limits |
| Flagship library access | Core premium capability | Paid-plan gated |

### 2. Entitlement Matrix

| Capability | `guest_trial` | `Free` | `Pro` | `Ultimate` |
|---|---|---|---|---|
| Create project | Yes, one trial project | Yes | Yes | Yes |
| Download final audio | Yes | Yes | Yes | Yes |
| Segment preview | Yes | Yes | Yes | Yes |
| Export SRT | No | No | Yes | Yes |
| Trigger segment repair | No | No | Yes | Yes |
| Browse starter library | Yes | Yes | Yes | Yes |
| Use starter library for generation | Yes, trial-safe subset | Yes, large library | Yes | Yes |
| Use flagship library for generation | No | No | Yes | Yes |
| Request private clone creation | No | No | `closed_beta`, manual enable | `closed_beta`, manual enable |
| Max active private clones | 0 | 0 | 1 | 3 |
| Queue priority | low | low | standard | high |
| Max project duration | 2 minutes | 2 minutes | 15 minutes | 60 minutes |

### 3. Launch State Rules

| Capability | Default launch state | Activation rule |
|---|---|---|
| Starter library access | open | Starter library must remain broad enough for meaningful free voice choice within the active V1 niche cluster |
| Flagship library access | open for entitled plans | Available only to paid plans |
| SRT export | open for entitled plans | Available as soon as a successful run produces exportable SRT |
| Segment repair | open for entitled plans | Available only on completed or completed-with-warnings projects |
| Private clone creation | `closed_beta` | Requires account-level enablement by ops and a successful rights review |

### 4. Clone Review and Readiness Rules

| Step | Rule |
|---|---|
| Submission | User may upload samples only if the account is clone-enabled |
| Rights review timing | Review happens before a clone can transition to `ready` |
| Initial readiness | A clone cannot be used for generation until review passes |
| Ongoing monitoring | Ops may later disable a ready clone if risk or rights signals change |
| Public exposure | Private clones never become public or featured voices |

### 5. PRD Copy Guardrails

| Surface | Allowed wording |
|---|---|
| Free plan copy | Emphasize real trial, audio takeaway, and large starter-library access |
| Pro plan copy | Emphasize flagship voices plus full workflow, including SRT export and segment repair |
| Ultimate plan copy | Emphasize higher limits, broader flagship access, faster queue, and stronger controlled clone access |
| Clone marketing copy | Must say controlled or gated access until launch state changes from `closed_beta` |

## Narrative Notes

1. The system may generate internal subtitle assets for all successful projects, but only entitled plans may export SRT.
2. Free users should feel meaningful voice abundance through the starter library without receiving the same voice tier as paid users.
3. This lets the platform keep one workflow pipeline while still enforcing differentiated plans.
4. Private clone creation is intentionally scoped as a controlled V1 capability to avoid making unsupported self-serve promises.

## Update Checklist

1. Re-check PRD sections `6.2`, `6.4`, `7.2`, `7.3`, and `19.5-19.8` after any entitlement change.
2. Re-check `billing-usage-semantics.md` if segment repair access changes.
3. Re-check `guest-trial-identity.md` if guest plan limits or project length change.
