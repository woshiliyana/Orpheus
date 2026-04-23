# Hosted Long-Form Feasibility Spike

> Status: ready
> Role: execution planning
> Normative for product rules: no
> Canonical owner: Delivery owner
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/distribution-and-growth-surface.md`
> Last reviewed: 2026-04-23

## Goal

Answer the first execution question for Orpheus: can a hosted-first stack produce stable long-form narration for educational explainers at roughly `20-30` minute script lengths without requiring user-side manual chunking?

## Phase

`Phase 2: Core Render Workflow`

Reference:

1. [`/docs/roadmap/phases/phase-02-core-render-workflow.md`](../../roadmap/phases/phase-02-core-render-workflow.md)
2. Supporting rationale only: [`/docs/prd/design-2026-04-23-longform-audio-wedge.md`](../../prd/design-2026-04-23-longform-audio-wedge.md)

## Depends on Truth Docs

1. [`/docs/prd/prd.md`](../../prd/prd.md)
2. [`/docs/prd/specs/project-run-lifecycle.md`](../../prd/specs/project-run-lifecycle.md)
3. [`/docs/prd/specs/distribution-and-growth-surface.md`](../../prd/specs/distribution-and-growth-surface.md)

## In Scope

1. Freeze one shorter control script plus one representative `~20` minute script and one representative `~30` minute script from the educational-explainer wedge before provider testing starts.
2. Use this exact corpus rule:
   - `control-short`: founder-supplied English educational-explainer script, roughly `1,500-2,500` words
   - `control-medium`: founder-supplied English educational-explainer script, roughly `8,000-10,000` words and targeting `~20` minutes
   - `control-long`: founder-supplied English educational-explainer script, roughly `12,000-15,000` words and targeting `~30` minutes
3. Reuse the same three frozen scripts for both providers and all repeat runs.
4. Run hosted-first evaluation in this order:
   - `Inworld TTS 1.5 Max`
   - `Cartesia`
5. Record for each provider:
   - completion / non-completion
   - retry behavior
   - whether backend-only orchestration is required
   - output consistency and obvious artifacts
   - time-to-result
   - effective cost per completed output
6. Repeat each key representative run enough times to distinguish one-off flakiness from structural instability.
7. Produce a written decision memo with one of:
   - `proceed with hosted-first implementation`
   - `proceed with hosted-first but constrain max script length`
   - `pause and revisit wedge`

## Out of Scope

1. Public self-serve launch
2. `SRT` export
3. Segment repair
4. Full pricing-page rollout
5. Self-hosted engine productionization
6. Visual or video automation

## Deliverables

1. A run log covering the control, `~20` minute, and `~30` minute cases for both hosted providers
2. A provider comparison summary
3. A feasibility decision memo that names the next action

## Backfill Required

1. If the real stable-audio envelope is narrower than the current PRD promise, update `docs/prd/prd.md` and `docs/prd/specs/distribution-and-growth-surface.md` before broad implementation.
2. If lifecycle semantics need to change because of orchestration behavior, update `project-run-lifecycle.md` before build work continues.
3. If cost data invalidates current pricing assumptions, update the relevant PRD pricing sections before launch planning expands.

## Validation

1. One hosted provider can complete representative long-form scripts with repeatable behavior.
2. No successful result requires user-side manual chunking.
3. The comparison records at least one shorter control, one `~20` minute case, and one `~30` minute case.
4. The decision memo includes explicit go / hold / fallback language, not just raw observations.

## Risks / Blockers

1. Hosted providers may succeed only with hidden internal chunking, which is acceptable only if fully absorbed by backend orchestration.
2. Long-form quality may drift even when runs technically complete.
3. Founder pricing or API plan constraints may distort the true unit-economics picture.
4. Real scripts may expose content-length or style pathologies not visible in synthetic tests.

## Execution Notes

1. Keep provider comparison and project/run semantics in one ownership stream to avoid inconsistent evidence capture.
2. Reuse real educational-explainer scripts, not generic placeholder copy.
3. Treat this as a decision package, not a benchmark vanity exercise.
4. If both hosted providers fail the `~30` minute case but one is strong at shorter lengths, the memo must explicitly say whether a shorter first release is acceptable or whether the wedge should pause.
