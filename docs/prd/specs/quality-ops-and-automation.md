# QualityOps and Automation

> Status: approved
> Normative: yes
> Canonical owner: Product + ops architecture
> Consumers: product, ops, backend, frontend, support, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`
> Supersedes: quality and automation rules implied only by roadmap phases
> Last reviewed: 2026-04-26

## Purpose

This spec defines the canonical quality scorecard, the `tts_ux_readiness_scorecard`, the minimum V1 observability surface in the ops backend, and the automation taxonomy for notifications, reminders, and scheduled tasks. It exists so roadmap and plans can sequence these systems without becoming the source of product truth.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `quality_scorecard` | The fixed set of quality metrics used to judge render, voice, long-audio, subtitle timing, and subtitle text quality |
| `tts_ux_readiness_scorecard` | The fixed user-experience readiness contract for judging whether a TTS evidence packet supports the first stable-audio gate |
| `quality_record` | A persisted result tied to an evaluation run, provider, voice, output language, and output context |
| `final_evaluation` | The machine-readable or markdown evidence artifact that records scorecard coverage, hard-gate outcome, weighted score when allowed, and final readiness verdict |
| `hard_gate` | A required evidence or outcome condition that must pass before weighted scoring can produce a ready verdict |
| `weighted_score` | A comparative score used only after hard gates and required evidence coverage are satisfied |
| `evidence_coverage_status` | Per-dimension coverage state: `covered`, `partial`, `manual_required`, `unknown`, or `blocked_by_missing_evidence` |
| `quality_dashboard` | The live ops-facing view that surfaces current and historical quality behavior |
| `automation_task` | A scheduled or event-driven task that sends user-facing or ops-facing notifications or runs recurring jobs |
| `transactional_notification` | User-facing message triggered by lifecycle, billing, entitlement, or risk events |
| `marketing_automation` | User-facing lifecycle marketing email or nurture sequence |
| `ops_alert` | Internal or service-side reminder triggered by failures, anomalies, or quality regressions |

## Decision Tables

### 1. TTS UX Readiness Gate Semantics

| Rule | Canonical value |
|---|---|
| Scorecard key | `tts_ux_readiness_scorecard` |
| Versioning | Every evaluation must name a scorecard version or review date |
| Evaluation order | Evaluate hard gates and required evidence coverage before computing or interpreting any weighted score |
| Blocked evidence rule | A blocked hard gate, missing required artifact, or missing required dimension cannot be rescued by a high average score |
| Weighted scoring role | Weighted scores compare otherwise eligible outputs; they do not create readiness when evidence is blocked, unknown, or manual-only |
| Missing evidence rule | If required artifacts such as `metrics.json`, `artifact-manifest.json`, timing assets, text-fidelity evidence, or human review are absent, mark the affected dimensions explicitly instead of dropping them from the table |
| Public promise boundary | A scorecard verdict must not broaden public `SRT`, pricing-page, no-login trial, or multilingual workspace promises |

### 2. TTS UX Readiness Verdict States

| Verdict | Meaning | Product interpretation |
|---|---|---|
| `ready` | Required evidence is present, hard gates pass, and remaining risks are acceptable for the evaluated scope | May support the named internal gate or product decision |
| `warning` | Required evidence is present and hard gates pass, but non-blocking risks or quality concerns remain | May proceed only with the warnings preserved in the handoff |
| `blocked` | Evidence shows a hard gate failed or the output cannot satisfy the evaluated scope | Do not use as readiness evidence for the blocked scope |
| `manual_required` | A required human judgment is pending, such as MOS, perceptual review, pronunciation review, compliance review, or platform import review | Do not treat as ready until the manual review is complete |
| `unknown` | The evidence packet does not answer the dimension, but the missing answer is not yet classified as a required artifact gap | Carry as an open question; do not average it away |
| `blocked_by_missing_evidence` | Required evidence is absent, so readiness cannot be judged even if available audio probes look healthy | Treat as an evidence-retention gap and rerun or backfill before claiming product readiness |

### 3. Fixed TTS UX Readiness Dimensions

| Dimension key | Required judgment | Gate role |
|---|---|---|
| `run_integrity` | Whether the run completed through the intended path and retained its required machine artifacts | Hard gate |
| `user_task_success` | Whether the user-facing job produced the promised usable result for the evaluated scope | Hard gate |
| `script_profile` | Source language, length, word count, character count, niche, duration band, and frozen-corpus identity | Hard gate |
| `cost_viability` | Observed or estimated cost against the current pricing guardrail and provider scenario | Hard gate for commercial readiness |
| `latency_ux` | Time to first useful result and total time to result, with user-facing wait interpretation | Hard gate for workflow readiness when latency evidence is required |
| `perceptual_quality` | Human or MOS-style listening judgment for naturalness, artifacts, fatigue, and creator-fit quality | Manual-required until a qualified human or approved review process records it |
| `text_fidelity` | Whether generated speech preserves the source text closely enough for the intended workflow | Hard gate when product readiness is claimed |
| `pronunciation_control` | Pronunciation, accent, numerals, names, and controllability risks for the target language and voice | Manual-required unless automated evidence is validated for the language |
| `long_form_stability` | Long-duration completion, drift, truncation, repeatability, and severe artifact behavior | Hard gate |
| `stitch_quality` | Seam, join, splice, and hidden-orchestration quality when the run is chunked or derived | Hard gate for orchestrated long-form evidence |
| `subtitle_readiness` | Internal timing assets, word timings, SRT/VTT packet status, timing QA, and subtitle text fidelity | Hard gate for subtitle-ready timing claims |
| `audio_technical_qc` | Decode, duration, channel layout, sample rate, bitrate, loudness, true peak, silence, and file integrity | Hard gate |
| `format_platform_delivery` | Delivery format, production-master posture, export hold/ready state, storage, download, and platform import evidence | Hard gate for delivery/export claims |
| `repair_recovery_ux` | Whether warnings, failed non-audio assets, or repair paths leave the user with a coherent recovery experience | Required when the evaluated run has warnings or retryable gaps |
| `competitive_benchmark` | Comparison against the same-cycle benchmark provider and public self-serve reference workflow | Hard gate before broader provider or packaging decisions |
| `trust_compliance` | Rights, safety, privacy, credential hygiene, and public-claim risk for the evidence packet and output | Hard gate |
| `final_verdict` | Aggregated scorecard conclusion after hard gates, required coverage, manual reviews, and weighted scoring when allowed | Aggregation gate |

### 4. Final Evaluation Artifact Contract

| Field | Required | Meaning |
|---|---|---|
| `scorecard` | Yes | Must be `tts_ux_readiness_scorecard` |
| `scorecard_version` | Yes | Review date or semantic version for the rubric used |
| `attempt_id` | Yes | Stable run or retrospective packet identifier |
| `evidence_packet_path` | Yes | Merge-tracked packet path or durable evidence URI |
| `evaluation_scope` | Yes | Examples: `audio_generation_smoke`, `product_readiness_evaluation`, `provider_benchmark`, or `format_delivery_check` |
| `hard_gate_verdict` | Yes | One of the canonical verdict states |
| `weighted_score` | No | Allowed only when hard gates and required evidence coverage pass |
| `dimensions` | Yes | One record per fixed dimension with `evidence_coverage_status`, verdict, notes, and evidence pointers |
| `missing_evidence` | Yes | Explicit list of absent required artifacts or reviews |
| `manual_review_required` | Yes | Human review items that must happen before readiness can be claimed |
| `public_promise_boundary` | Yes | Statement that the packet does or does not affect public `SRT`, pricing, trial, or language promises |
| `final_verdict` | Yes | Overall readiness verdict for the evaluation scope |

### 5. Canonical Quality Metrics

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

### 6. Minimum Evaluation Dimensions

| Dimension | Required in V1 | Purpose |
|---|---|---|
| `language` | Yes | Track English and Spanish output / timing readiness separately in the first gate without implying full multilingual workspace parity |
| `voice_id` | Yes | Voice-level quality comparison |
| `provider` | Yes | Provider routing and fallback evaluation |
| `duration_band` | Yes | Long-audio behavior tracking |
| `niche` | Yes | Persona / content-fit review |
| `run_type` | Yes | Separate full render and repair behavior |

### 7. Required Ops Dashboard Surfaces

| View | Minimum content |
|---|---|
| `quality_overview` | Current quality scorecard summary and trend deltas |
| `provider_health` | Run success, failure stages, latency, long-audio stability, and cost per completed minute by provider |
| `voice_quality` | Quality score slices by `voice_id`, persona fit, and commercial visibility |
| `language_quality` | Quality score slices by language and duration band, with English vs Spanish first-gate visibility |
| `subtitle_quality` | `SRT` success rate, internal alignment asset success, timing quality, subtitle text fidelity, readiness coverage, and retry outcomes |
| `tts_ux_readiness` | Hard-gate status, coverage gaps, manual-review backlog, weighted score only when allowed, and final verdict trend by provider / language / duration band |
| `automation_health` | Notification task state, failed jobs, backlog, and alert counts |

### 8. Automation Taxonomy

| Category | Purpose | Examples |
|---|---|---|
| `transactional_notification` | Required user-facing operational messaging | generation complete, generation failed, quota reminders, subscription reminders, risk verification |
| `marketing_automation` | Growth and lifecycle email automation | welcome, onboarding, activation, reactivation, upgrade nudges |
| `ops_alert` | Internal or service-side reminders for operating the system | quality anomaly alerts, stuck run alerts, failed batch evaluation alerts |
| `scheduled_evaluation` | Recurring quality and observability jobs | evaluation corpus runs, score aggregation, regression checks |

### 9. V1 Visibility Rules

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
5. The first gate must show English and Spanish output / timing quality separately even while the workspace UI remains English-first.
6. An `audio_generation_smoke` can pass with warnings while the broader `product_readiness_evaluation` remains `blocked_by_missing_evidence`.
7. Retrospective evidence notes may record what an older packet proves, but they must not backfill missing machine artifacts by assertion.

## Update Checklist

1. Re-check PRD sections `16. 运营后台与管理视图`, `22.2 邮件系统`, and `22.3 定时任务系统` after any change.
2. Re-check roadmap phases `0`, `3`, and `6` if scorecard, dashboard, or automation categories change.
3. Re-check `source-of-truth-index.md` if a new quality or automation topic becomes separately canonical.
4. Re-check Phase 2 provider scorecard, live-smoke checklist, development checklist, and evidence-artifacts README after any `tts_ux_readiness_scorecard` change.
