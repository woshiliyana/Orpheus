# Capability Entitlements

> Status: approved
> Normative: yes
> Canonical owner: Product
> Consumers: product, growth, frontend, support, ops, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/mksaas-boundary-contract.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`
> Supersedes: entitlement wording scattered across `/docs/prd/prd.md`
> Last reviewed: 2026-04-23

## Purpose

This spec closes V1 scope questions for clone access, `SRT` export, segment repair, and the first paid path for the stable-audio gate. It separates platform-level workflow capabilities from user-facing plan entitlements.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `platform capability` | A workflow ability the system can produce internally, even if not exposed to every plan |
| `user entitlement` | The ability a specific plan may access in the product UI or API |
| `segment preview` | Listening to individual generated segments inside a completed project |
| `segment repair` | Re-running only targeted project segments and stitching them back into the project output |
| `private clone` | A user-owned clone voice that never becomes part of the public platform library |
| `closed_beta` | A capability exists in V1 but is disabled by default until ops explicitly enables it for an account |
| `starter library` | The broad, lower-cost AI voice catalog intended to give users meaningful free choice inside the active V1 niche cluster and approved first-gate render-language boundary |
| `flagship library` | The smaller curated voice set with stronger consistency, sharper persona definition, and paid-plan positioning |
| `hidden_orchestration` | Backend-only chunking, retry, stitching, and reconciliation that absorbs provider limits without becoming a user task |
| `production_master_audio` | The highest-fidelity audio asset retained by the platform for post-processing, derivative generation, QA, and later export decisions |
| `delivery_audio` | A user-downloadable audio derivative optimized for playback, sharing, storage, and broad compatibility |
| `audio_format_verdict` | The Phase 2 evidence verdict that decides whether a tested format is ready for product use, should stay internal-only, or must be held |

## Decision Tables

### 1. Capability Classification

| Capability | Platform-level status in V1 | User-facing default |
|---|---|---|
| Audio generation and download | Core | Open to every successful project |
| `MP3` delivery audio | Core | Default user-facing download format for the first stable-audio gate; product default target is `>=192 kbps` when encoded as MP3 |
| `WAV` / Linear PCM production master | Core workflow capability | Internal by default until Phase 2 evidence confirms export readiness |
| `WAV` user export | Controlled V1 capability | Disabled by default; may open only after an explicit `audio_format_verdict=ready_for_export` |
| Backend-only long-form orchestration | Core workflow capability | Internal only; must never become a user-side manual requirement |
| Internal subtitle/alignment asset production | Core | Internal workflow, not always user-exportable |
| `SRT` export | Core workflow capability | Gated by plan entitlement |
| Segment preview | Core workflow capability | Open to every successful project |
| Segment repair | Core workflow capability | Gated by plan entitlement |
| Private clone creation | Controlled V1 capability | `closed_beta` and plan-gated |
| Starter library access | Core growth capability | Open broadly, with guest vs free limits |
| Flagship library access | Core premium capability | Paid-plan gated |

### 2. Entitlement Matrix

| Capability | `guest_trial` | `Free` | `Pro` | `Ultimate` |
|---|---|---|---|---|
| Create project | Yes, one trial project | Yes | Yes | Yes |
| Download final `MP3` audio | Yes | Yes | Yes | Yes |
| Download `WAV` production master | No | No | Disabled until Phase 2 export verdict | Disabled until Phase 2 export verdict |
| Segment preview | Yes | Yes | Yes | Yes |
| Export `SRT` | No | No | Yes | Yes |
| Trigger segment repair | No | No | Yes | Yes |
| Browse starter library | Yes | Yes | Yes | Yes |
| Use starter library for generation | Yes, trial-safe subset | Yes, large library | Yes | Yes |
| Use flagship library for generation | No | No | Yes | Yes |
| Request private clone creation | No | No | `closed_beta`, manual enable | `closed_beta`, manual enable |
| Max active private clones | 0 | 0 | 1 | 3 |
| Queue priority | low | low | standard | high |
| Max project duration | 2 minutes | 2 minutes | 30 minutes | 60 minutes |

### 3. Launch State Rules

| Capability | Default launch state | Activation rule |
|---|---|---|
| `MP3` delivery audio | open | Every successful project must provide a broadly compatible downloadable audio file; Phase 2 must record bitrate before approving it as the commercial default |
| `WAV` / Linear PCM production master | internal | The platform should keep a higher-fidelity master when provider output and storage economics support it |
| `WAV` user export | held | Requires a successful Phase 2 format verdict covering decode, stitch, storage, download, and audible quality |
| Starter library access | open | Starter library must remain broad enough for meaningful free voice choice within the active V1 niche cluster and approved EN/ES output boundary |
| Flagship library access | open for entitled plans | Available only to paid plans |
| `SRT` export | open for entitled plans | Available only after a successful run produces exportable subtitle output |
| Backend-only long-form orchestration | open | Required whenever provider request limits would otherwise force user-side manual chunking |
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
| Pro plan copy | Emphasize the first real stable-audio production path, plus flagship voices and full workflow, including `SRT` export and segment repair |
| Ultimate plan copy | Emphasize higher limits, broader flagship access, faster queue, and stronger controlled clone access |
| Clone marketing copy | Must say controlled or gated access until launch state changes from `closed_beta` |

## Narrative Notes

1. The system may generate internal subtitle/alignment assets for all successful projects even when export is plan-gated.
2. Free users should feel meaningful voice abundance through the starter library without receiving the same voice tier as paid users.
3. This lets the platform keep one workflow pipeline while still enforcing differentiated plans.
4. Private clone creation is intentionally scoped as a controlled V1 capability to avoid making unsupported self-serve promises.
5. `hidden_orchestration` is allowed and expected in V1, but it must remain backend-only so users still experience one project, not a manual chunking workflow.
6. The first paid path must align with the stable-audio envelope validated in `Phase 2`; until evidence says otherwise, the development-entry assumption is `Pro` supports up to `30` minutes per project within the approved EN/ES render boundary.
7. The working audio-format product posture is `WAV` / Linear PCM as the internal production-master target and `MP3` as the default user-facing delivery format. This posture becomes a public export promise only after Phase 2 evidence returns an explicit `audio_format_verdict`.
8. For long-form narration, `MP3` is commercially acceptable as the default delivery derivative when it passes audible QA and uses `>=192 kbps` or a documented higher-quality setting. Lower-bitrate MP3 output may be used for smoke comparability but must not be treated as the final commercial default without a new verdict. `WAV` should be preferred for internal post-processing, video assembly, future transcoding, and quality review.

## Update Checklist

1. Re-check PRD sections `6.2`, `6.4`, `7.2`, `7.3`, and `19.5-19.8` after any entitlement change.
2. Re-check `billing-usage-semantics.md` if segment repair access changes.
3. Re-check `guest-trial-identity.md` if guest plan limits or project length change.
4. Re-check `distribution-and-growth-surface.md` if the first paid single-project length changes.
5. Re-check `pricing-packaging-and-unit-economics.md` if plan positioning or minute ladders change.
6. Re-check `project-run-lifecycle.md` and Phase 2 evidence templates after any audio-format requirement changes.
