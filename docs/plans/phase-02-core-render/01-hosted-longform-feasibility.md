# Hosted Long-Form Feasibility Spike

> Status: ready
> Role: execution planning
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/distribution-and-growth-surface.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`
> Last reviewed: 2026-04-23

## Goal

Answer the first execution question for Orpheus: can a hosted-first stack produce stable long-form narration for the English educational-explainer wedge at roughly `20-30` minute script lengths without requiring user-side manual chunking, while also leaving credible `EN + ES` output, alignment, and subtitle-ready timing evidence behind?

## Phase

`Phase 2: Core Render Workflow`

Reference:

1. [`/docs/roadmap/phases/phase-02-core-render-workflow.md`](../../roadmap/phases/phase-02-core-render-workflow.md)
2. Required benchmark context only: [`/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`](../../prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md)
3. Supporting rationale only (non-truth): [`/docs/prd/design-2026-04-23-longform-audio-wedge.md`](../../prd/design-2026-04-23-longform-audio-wedge.md)

## Depends on Truth Docs

1. [`/docs/prd/prd.md`](../../prd/prd.md)
2. [`/docs/prd/specs/capability-entitlements.md`](../../prd/specs/capability-entitlements.md)
3. [`/docs/prd/specs/project-run-lifecycle.md`](../../prd/specs/project-run-lifecycle.md)
4. [`/docs/prd/specs/distribution-and-growth-surface.md`](../../prd/specs/distribution-and-growth-surface.md)
5. [`/docs/prd/specs/pricing-packaging-and-unit-economics.md`](../../prd/specs/pricing-packaging-and-unit-economics.md)

## In Scope

1. Freeze an explicit bilingual first-gate corpus before provider testing starts. The corpus must remain frozen for all providers and repeat runs in the benchmark cycle.
2. Use this exact corpus rule:
   - `en-control-short`: founder-supplied English educational-explainer script, roughly `1,500-2,500` words
   - `en-control-medium`: founder-supplied English educational-explainer script, roughly `8,000-10,000` words and targeting `~20` minutes
   - `en-control-long`: founder-supplied English educational-explainer script, roughly `12,000-15,000` words and targeting `~30` minutes
   - `es-control-short`: founder-supplied Spanish educational-explainer script targeting the same shorter control band as `en-control-short`
   - `es-control-medium`: founder-supplied Spanish educational-explainer script targeting `~20` minutes
   - `es-control-long`: founder-supplied Spanish educational-explainer script targeting `~30` minutes
3. Freeze the exact script IDs, source filenames, and selected voices before provider testing begins. Spanish fixtures may be paired translations or distinct Spanish-native scripts, but they may not be swapped mid-cycle.
4. Reuse the same six frozen scripts for both providers and all repeat runs.
5. Run hosted-first evaluation in this order:
   - `Inworld TTS 1.5 Max` as the primary implementation path
   - `Cartesia` as the required same-cycle benchmark
6. Record for each provider and language:
   - completion / non-completion
   - retry behavior
   - whether backend-only orchestration is required
   - chunk count / stitch count when orchestration is used
   - output readiness for the tested language
   - timing readiness for the tested language
   - output consistency, seam defects, and obvious artifacts
   - internal alignment asset coverage for successful runs
   - provider timestamp usefulness versus final-audio alignment truth
   - subtitle text fidelity risk, including normalization drift or obvious wording mismatch
   - time-to-result
   - effective cost per completed output
7. Repeat each key representative run enough times to distinguish one-off flakiness from structural instability.
8. Produce a written decision memo with one of:
   - `proceed with hosted-first implementation`
   - `proceed with hosted-first but constrain max script length`
   - `pause and revisit wedge`

## Out of Scope

1. Public self-serve launch
2. User-facing `SRT` export
3. Segment repair
4. Full pricing-page rollout
5. Self-hosted engine productionization
6. Visual or video automation

## Deliverables

1. A run log covering the frozen `EN + ES` corpus for both hosted providers
2. A provider comparison summary with English and Spanish readiness verdicts
3. At least one successful-run artifact packet for each language marked `ready`, containing final audio, orchestration notes, offset data, internal alignment assets, and a brief alignment / subtitle QA note for a viable provider
4. An audio-format verdict that names the default delivery format, the production-master target, and whether user-facing `WAV` export remains held
5. A feasibility decision memo that names the next action, the primary-provider recommendation, and any hold / fallback posture for language readiness
6. A pricing review snapshot and `v0.41` planning workbook updated with observed `cost_per_completed_audio_minute` and fallback behavior for the preferred path
7. One provider-scenario table showing the primary provider case, one higher-cost fallback case, and one second-provider case
8. One short benchmark note against the prevailing public self-serve long-form workflow, using `ElevenLabs` as the primary reference

## Backfill Required

1. If the real stable-audio envelope is narrower than the current PRD promise, update `docs/prd/prd.md` and `docs/prd/specs/distribution-and-growth-surface.md` before broad implementation.
2. If lifecycle semantics need to change because of orchestration behavior, update `project-run-lifecycle.md` before build work continues.
3. If the first paid path or single-project duration promise changes, update `capability-entitlements.md` before pricing work expands.
4. If cost data invalidates current pricing assumptions, update `pricing-packaging-and-unit-economics.md` and the PRD pricing summary before launch planning expands.
5. If English and Spanish do not both achieve the required output / timing evidence, record the blocked language explicitly instead of silently collapsing the gate back to English-only.

## Validation

1. The evidence packet includes explicit English and Spanish results across the frozen corpus. English-only evidence is insufficient for this gate.
2. At least one hosted provider can complete representative long-form scripts with repeatable behavior, or the memo explicitly names the blocked language and limiting envelope.
3. No successful result requires user-side manual chunking.
4. The comparison records at least one shorter control, one `~20` minute case, and one `~30` minute case for both English and Spanish.
5. Successful runs generate internal alignment assets even though user-facing `SRT` export is still out of scope.
6. The evidence packet includes an initial timing-quality and subtitle-text-quality note for both English and Spanish readiness, not just raw audio success.
7. The evidence packet includes explicit `MP3` delivery and `WAV` / Linear PCM production-master format judgments before the memo recommends a product format.
8. The decision memo includes explicit go / hold / fallback language, not just raw observations.

## Risks / Blockers

1. Hosted providers may succeed only with hidden internal chunking, which is acceptable only if fully absorbed by backend orchestration.
2. Long-form quality may drift differently by language even when runs technically complete.
3. Current On-Demand / Creator pricing or higher fixed-cost provider-plan constraints may distort the true unit-economics picture.
4. Real scripts may expose content-length or style pathologies not visible in synthetic tests.
5. Spanish readiness evidence could be over-read as a promise of a full multilingual workspace if the packet does not keep that boundary explicit.

## Execution Notes

1. Keep provider comparison and project/run semantics in one ownership stream to avoid inconsistent evidence capture.
2. Reuse real educational-explainer scripts, not generic placeholder copy.
3. Treat this as a decision package, not a benchmark vanity exercise.
4. If both hosted providers fail the `~30` minute case but one is strong at shorter lengths, the memo must explicitly say whether a shorter first release is acceptable or whether the wedge should pause.
5. A pass may use backend-hidden chunking, but the memo must name chunk counts, seam risk, and whether the approach is implementation-worthy.
6. Keep the corpus explicit and frozen. Do not swap scripts mid-cycle to rescue a provider result.
7. English-first workspace UI remains acceptable for this phase. The bilingual gate is about output and timing readiness, not full Spanish workspace parity.
