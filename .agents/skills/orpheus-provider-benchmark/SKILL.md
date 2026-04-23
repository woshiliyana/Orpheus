---
name: orpheus-provider-benchmark
description: Use when comparing Inworld, Cartesia, ElevenLabs-relative positioning, provider costs, retry behavior, margin pressure, and the EN plus ES first-gate benchmark packet for Orpheus.
---

# Orpheus Provider Benchmark

## Goal

Run or structure the benchmark work needed to decide whether the current Orpheus package and provider mix remain defensible.

## Read first

1. `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`
2. `docs/prd/specs/pricing-packaging-and-unit-economics.md`
3. `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
4. `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
5. `docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
6. `docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx`

## Benchmark rules

- Keep the frozen `EN + ES` corpus fixed across providers.
- Keep the selected voices fixed inside the benchmark cycle.
- Treat `Inworld TTS 1.5 Max` as the primary implementation scenario.
- Treat `Cartesia` as the required second-provider scenario in the same cycle.
- Use `ElevenLabs` as the default public self-serve comparison point when writing the short market benchmark note.

## Record for each provider and language

- completion / non-completion
- retry behavior
- whether backend-only orchestration is required
- chunk count / stitch count when orchestration is used
- output readiness
- timing readiness
- seam defects or obvious artifacts
- internal alignment asset coverage
- provider timestamp usefulness versus final-audio alignment truth
- subtitle fidelity risk
- time to result
- effective cost per completed output
- effective cost per completed audio minute

## Packaging pressure test

Update the pricing snapshot with at least:

- current primary scenario
- one higher-cost fallback scenario
- one second-provider scenario

If the observed scenario does not clear the target margin floor, do not leave package claims untouched. Mark the package blocked or propose the updated package explicitly.

## Output

Produce:

- scorecard
- pricing snapshot update
- `EN + ES` readiness note
- short public-market comparison note
- go/hold/fallback memo
