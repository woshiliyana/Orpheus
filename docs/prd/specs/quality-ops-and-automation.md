# QualityOps and Automation

> Status: approved
> Normative: yes
> Canonical owner: Product + ops architecture
> Consumers: product, ops, backend, frontend, support, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`
> Supersedes: quality and automation rules implied only by roadmap phases
> Last reviewed: 2026-04-23

## Purpose

This spec defines the canonical quality scorecard, the minimum V1 observability surface in the ops backend, and the automation taxonomy for notifications, reminders, and scheduled tasks. It exists so roadmap and plans can sequence these systems without becoming the source of product truth.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `quality_scorecard` | The fixed set of quality metrics used to judge render, voice, long-audio, subtitle timing, and subtitle text quality |
| `quality_record` | A persisted result tied to an evaluation run, provider, voice, language, and output context |
| `quality_dashboard` | The live ops-facing view that surfaces current and historical quality behavior |
| `automation_task` | A scheduled or event-driven task that sends user-facing or ops-facing notifications or runs recurring jobs |
| `transactional_notification` | User-facing message triggered by lifecycle, billing, entitlement, or risk events |
| `marketing_automation` | User-facing lifecycle marketing email or nurture sequence |
| `ops_alert` | Internal or service-side reminder triggered by failures, anomalies, or quality regressions |

## Decision Tables

### 1. Canonical Quality Scorecard

| Metric | Meaning | Measurement type | Minimum required dimensions |
|---|---|---|---|
| `tts_quality` | Overall render quality for the produced audio | human review score plus optional automated signal | provider, language, voice, duration band |
| `voice_persona_fit` | How well a voice matches its intended persona / niche | human review score | voice, niche, language |
| `long_audio_stability` | Stability of long renders without crashes, severe drift, or unusable output | operational success rate | provider, duration band, language |
| `stitch_artifact_rate` | Audible seam or join defect rate in internally orchestrated long-form runs | human review score plus incident rate | provider, duration band, run type |
| `srt_alignment_quality` | Subtitle timing quality and text-to-audio alignment quality | human review score plus alignment signal | provider, language, duration band |
| `subtitle_text_fidelity` | How credible and readable subtitle text remains after normalization, reconciliation, and export prep | human review score plus diff signal | provider, language, duration band |
| `alignment_asset_success_rate` | Percentage of successful audio runs that also produce internal alignment assets ready for later subtitle export | operational rate | provider, language, duration band |
| `run_success_rate` | Percentage of runs that reach a successful end state | operational rate | provider, language, run type |
| `cost_per_completed_audio_minute` | Effective provider plus orchestration cost of successful audio output | cost metric | provider, duration band, run type |
| `repair_success_rate` | Percentage of repair runs that complete successfully | operational rate | provider, language, repair path |

### 2. Minimum Evaluation Dimensions

| Dimension | Required in V1 | Purpose |
|---|---|---|
| `language` | Yes | Multi-language quality tracking |
| `voice_id` | Yes | Voice-level quality comparison |
| `provider` | Yes | Provider routing and fallback evaluation |
| `duration_band` | Yes | Long-audio behavior tracking |
| `niche` | Yes | Persona / content-fit review |
| `run_type` | Yes | Separate full render and repair behavior |

### 3. Required Ops Dashboard Surfaces

| View | Minimum content |
|---|---|
| `quality_overview` | Current quality scorecard summary and trend deltas |
| `provider_health` | Run success, failure stages, latency, long-audio stability, and cost per completed minute by provider |
| `voice_quality` | Quality score slices by `voice_id`, persona fit, and commercial visibility |
| `language_quality` | Quality score slices by language and duration band |
| `subtitle_quality` | `SRT` success rate, internal alignment asset success, timing quality, subtitle text fidelity, and retry outcomes |
| `automation_health` | Notification task state, failed jobs, backlog, and alert counts |

### 4. Automation Taxonomy

| Category | Purpose | Examples |
|---|---|---|
| `transactional_notification` | Required user-facing operational messaging | generation complete, generation failed, quota reminders, subscription reminders, risk verification |
| `marketing_automation` | Growth and lifecycle email automation | welcome, onboarding, activation, reactivation, upgrade nudges |
| `ops_alert` | Internal or service-side reminders for operating the system | quality anomaly alerts, stuck run alerts, failed batch evaluation alerts |
| `scheduled_evaluation` | Recurring quality and observability jobs | evaluation corpus runs, score aggregation, regression checks |

### 5. V1 Visibility Rules

| Surface | Required in V1 |
|---|---|
| User-facing transactional email | Yes |
| User-facing marketing automation | Yes |
| Service-side reminders and ops alerts | Yes |
| Live quality dashboard in ops backend | Yes |
| One-off manual spreadsheet as sole quality source | No |

## Narrative Notes

1. Quality is part of the product system, not just a QA afterthought.
2. Automation is part of the operating system, not just infrastructure plumbing.
3. Long-form orchestration quality, alignment-asset readiness, and subtitle-text fidelity are product concerns, not hidden implementation trivia.
4. Roadmap phases may sequence these systems, but they must reference this spec for what the systems mean.

## Update Checklist

1. Re-check PRD sections `16. 运营后台与管理视图`, `22.2 邮件系统`, and `22.3 定时任务系统` after any change.
2. Re-check roadmap phases `0`, `3`, and `6` if scorecard, dashboard, or automation categories change.
3. Re-check `source-of-truth-index.md` if a new quality or automation topic becomes separately canonical.
