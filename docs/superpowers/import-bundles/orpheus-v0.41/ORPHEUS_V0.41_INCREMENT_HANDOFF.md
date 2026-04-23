# Orpheus v0.41 Increment Handoff

## What this increment does

This package is an execution-focused increment on top of the `v0.40` full truth bundle. It does **not** try to replace the full bundle. It tightens three areas that were still too soft for build-and-test work:

1. `Provider cost reality`
2. `Public market benchmark reality`
3. `Raphael-style distribution adaptation with audio-safe economics`

## What changed

### New document

- `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`

### Updated truth docs

- `docs/prd/specs/pricing-packaging-and-unit-economics.md`
- `docs/prd/specs/distribution-and-growth-surface.md`
- `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
- `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
- `docs/prd/source-of-truth-index.md`
- `docs/prd/prd.md`

### New operating artifact

- `orpheus_pricing_unit_economics_model_v0.41.xlsx`

## The short version

- `Inworld-first` remains the correct build start.
- `Cartesia` must be benchmarked in the same first benchmark cycle, not later.
- `ElevenLabs` is the primary public benchmark and proves that `supports long text` is not a marketable moat by itself.
- `Pro = $20 / 90 min` remains a working anchor, but only if the invoice-equivalent TTS rate stays roughly at or below the current guardrail.
- The external product hook is now explicitly compressed to:
  - `Paste the whole script once. Get stable narration with subtitle-ready timing.`

## What the agent should read first

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/prd.md`
3. `docs/prd/specs/pricing-packaging-and-unit-economics.md`
4. `docs/prd/specs/distribution-and-growth-surface.md`
5. `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`
6. `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
7. `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`

## What the founder should decide after the first benchmark packet

1. Does the actual provider-cost evidence still support `Pro = $20 / 90 min`?
2. Is `Inworld` still the primary path after the first same-corpus comparison against `Cartesia`?
3. Is the observed workflow honestly strong enough to justify the new core hook against `ElevenLabs`?
4. Is the first public distribution layer ready for a bounded low-friction demo, or should it remain demo / waitlist / founder-led?
