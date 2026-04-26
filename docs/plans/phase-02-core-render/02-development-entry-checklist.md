# Development Entry Checklist for the Stable-Audio Gate

> Status: ready
> Role: execution checklist
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/billing-usage-semantics.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/prd/specs/quality-ops-and-automation.md`, `/docs/prd/specs/mksaas-boundary-contract.md`
> Last reviewed: 2026-04-23

## Purpose

This checklist prevents Orpheus from entering `Phase 2` with contradictory promises, mismatched plan limits, missing unit-economics discipline, or missing long-form delivery evidence. It is the practical gate between `directionally correct docs` and `safe to start building`.

## Start Rule

`Phase 2` implementation may start only when every `P0` item is explicitly checked and owner-assigned. `P1` items may trail only if they already have owners and dated follow-up checkpoints.

## Supporting Review Input

1. `/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md` is required benchmark context for pricing and market comparison, but it is not canonical truth.

## P0: Product and Commercial Alignment

- [ ] The first public promise is frozen to `stable long-form narration for English educational explainer creators`.
- [ ] The first technical gate explicitly covers `English + Spanish` output and timing readiness even though the workspace UI remains English-first.
- [ ] The core hook is frozen to a one-submit workflow message, not a generic `AI voiceover` message. Current working hook: `Paste the whole script once. Get stable narration with subtitle-ready timing.`
- [ ] The first paid path is frozen and its single-project limit matches the current stable-audio envelope assumption. Until new evidence says otherwise, that means `Pro` must honestly cover the `~20-30` minute validation target.
- [ ] Public pricing, no-login trial, and user-facing `SRT` export are all treated as later layers, not required for the first technical gate.
- [ ] The team agrees on the exact first release truth: `audio first`, with subtitles / timestamps prepared internally but not required as a launch promise.
- [ ] `pricing-packaging-and-unit-economics.md` exists as the commercial truth source and an editable pricing / unit-economics workbook exists using the same anchors and formulas.
- [ ] The workbook at `/docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx` is explicitly treated as a required planning companion, not canonical truth.
- [ ] The team has written down why Orpheus deserves to exist next to the current long-form self-serve reference point. If the answer is only `also does long text` or `also has minutes`, public self-serve launch remains blocked.
- [ ] The current working `Pro $20 / 90 min` anchor has been checked against the provider-cost guardrail. If the invoice-equivalent TTS rate is above the allowed band, the package has been intentionally adjusted or explicitly marked non-public.

## P0: Corpus and Provider Evaluation

- [ ] The exact bilingual corpus is frozen: `en-control-short`, `en-control-medium`, `en-control-long`, `es-control-short`, `es-control-medium`, and `es-control-long`.
- [ ] The frozen corpus includes named source files and approved voices before benchmarking starts. Spanish fixtures may be paired translations or Spanish-native scripts, but they may not change mid-cycle.
- [ ] The corpus contains real educational-explainer scripts rather than synthetic placeholder copy.
- [ ] Provider comparison fields are frozen before testing begins: language, success / failure, retry behavior, latency, chunk count, stitch count, seam defects, output readiness, timing readiness, effective cost, alignment-asset coverage, provider timestamp usefulness, and subtitle-text-fidelity risk.
- [ ] A go / hold / fallback memo template exists before the first provider test run.
- [ ] `Inworld` is explicitly accepted as the primary implementation path for the first benchmark cycle.
- [ ] `Cartesia` is explicitly accepted as the required second-provider benchmark in the same benchmark cycle.
- [ ] The first gate has an explicit `EN + ES` output / timing readiness rubric that does not expand the public promise beyond English-first.
- [ ] A short public-market benchmark note exists with `ElevenLabs` as the primary external reference and at least one additional packaging reference (`Murf`, `WellSaid`, or equivalent).

## P0: Workflow Architecture

- [ ] Backend-only orchestration is the only allowed answer to provider request-length limits. Manual user chunking is explicitly out of scope.
- [ ] Chunk IDs, offset tracking, and retry behavior are deterministic enough for idempotent recovery.
- [ ] The system treats one user project as one canonical run history even if the backend fans out into many provider sub-requests.
- [ ] The `artifact_manifest` schema is frozen before broad implementation.
- [ ] Successful runs persist an artifact manifest containing final audio, key run metadata, billing fact, and the minimum offset data needed for later subtitle / export work.
- [ ] Successful runs record the audio-format policy: requested format, observed container / codec, sample rate, bitrate when relevant, delivery verdict, and production-master verdict.
- [ ] Provider-backed live-smoke artifacts are promoted out of ignored `runs/` output into a merge-tracked evidence packet before any worktree cleanup.
- [ ] Frontend code never calls TTS, STT, or storage providers directly. All provider access, retry logic, and signed delivery flow through Orpheus-owned server boundaries.

## P0: Alignment and Subtitle Readiness

- [ ] `source_script`, `normalized_alignment_text`, and `display_subtitle_text` are modeled as separate fields or artifacts.
- [ ] Successful runs produce internal alignment assets even when public `SRT` export is still disabled.
- [ ] The team can explain which layer is canonical for each job: final audio for timing truth, normalized text for alignment truth, and display text for subtitle UX truth.
- [ ] The team can explain which audio asset is the default user-facing delivery file and which asset, if any, is the production master for post-processing and future export.
- [ ] Provider timestamps are treated as helper signals, not the only source of subtitle timing truth.
- [ ] English and Spanish output / timing readiness are judged separately in the first gate; Spanish is not inferred from English-only success.
- [ ] A basic subtitle-text-fidelity review rubric exists before broad internal testing expands.

## P0: Lifecycle, Billing, and Support Semantics

- [ ] Lifecycle states and failure-stage semantics cover orchestration failure separately from provider pre-check and raw render failure.
- [ ] `audio success + alignment failure` is explicitly treated as audio billable with retryable non-audio follow-up, not as a full rerun charge.
- [ ] Repair billing is defined only for repaired duration, never for the whole project again.
- [ ] Support and ops can trace one user-visible run through provider attempts, artifacts, and retry outcomes without inventing ad hoc labels.
- [ ] Quota exhaustion behavior, renewal reset behavior, and top-up default posture are aligned across pricing, billing, and entitlement docs.

## P0: QualityOps and Observability

- [ ] Dashboards slice by `provider`, `language`, `duration_band`, and `run_type`.
- [ ] Long-form scorecards include at least `long_audio_stability`, `stitch_artifact_rate`, `alignment_asset_success_rate`, `srt_alignment_quality`, `subtitle_text_fidelity`, `run_success_rate`, and cost per completed audio minute.
- [ ] Stuck-run alerts, provider-health alerts, and failed-alignment alerts exist before broad internal testing expands.
- [ ] There is a manual review rubric for long-form drift, audible seams, timestamp credibility, and subtitle-text fidelity.

## P1: Before Broadening the Promise

- [ ] User-facing `SRT` export has been validated against final-audio timing truth rather than only provider timestamps.
- [ ] Segment repair has been tested on stitched long-form projects.
- [ ] The pricing page and tool pages use only evidence-backed wording, not placeholder claims.
- [ ] Multilingual SEO and broader workflow claims stay gated until the English stable-audio path is proven.

## Required Evidence Artifacts

1. Frozen `EN + ES` script corpus and readiness rubric
2. Provider run log
3. Successful-run artifact packet
4. Feasibility decision memo
5. Updated pricing review snapshot and `v0.41` planning workbook
6. Updated truth-doc backfill list for any envelope, lifecycle, or pricing change
7. One competitor benchmark note against the current public self-serve long-form reference workflow
8. One explicit provider-cost scenario table showing whether the working `Pro` package still clears the margin floor
