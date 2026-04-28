# Live Smoke: ES Structure Pacing Stress

> Status: passed for provider execution; natural_basic preferred in Spanish structure-stress human listening
> Role: Spanish exact vs natural_basic structure-stress comparison
> Date: 2026-04-27 PDT

## Purpose

Compare `exact` against `natural_basic` on a Spanish structure-heavy script using Rafael. This is the ES counterpart to the EN structure-stress packet where `natural_basic` was preferred in human listening.

This packet should answer whether structure-aware pauses also help the first `EN + ES` readiness gate, or whether the default pacing recommendation needs language-specific caution.

## Commands

```bash
npm run narrate -- \
  --provider inworld \
  --language es \
  --voice Rafael \
  --script-file docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-es-structure-pacing-stress-20260427/es-structure-stress-script.md \
  --request-id live-smoke-es-structure-exact-20260427 \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode exact \
  --input-validation strict
```

```bash
npm run narrate -- \
  --provider inworld \
  --language es \
  --voice Rafael \
  --script-file docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-es-structure-pacing-stress-20260427/es-structure-stress-script.md \
  --request-id live-smoke-es-structure-natural-20260427 \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode natural_basic \
  --input-validation strict
```

## Machine Comparison

| Pair | Mode | Duration | Token preserved | Inserted breaks | Max breaks/request | Timestamp coverage | Warnings | Audio probe |
|---|---|---:|---:|---:|---:|---:|---|---|
| ES / Rafael | `exact` | 71.904s | yes | 0 | 0 | 100% | none | MP3, 48 kHz mono, 192068 bps |
| ES / Rafael | `natural_basic` | 79.728s | yes | 10 | 10 | 100% | none | MP3, 48 kHz mono, 192062 bps |

## Interpretation

- `natural_basic` inserted 10 structural break tags across headings, paragraphs, and list items.
- The maximum break-tag count in a provider request was 10, below the Inworld limit of 20.
- The source tokens were preserved in both modes.
- Both runs produced final MP3, subtitles, word timings, manifest, metrics, pacing plan, provider input, and input quality evidence.
- `natural_basic` is 7.824 seconds longer than `exact`, consistent with the inserted structural pauses.

## Verdict

```text
provider_execution: passed
artifact_integrity: passed
content_preservation: passed
break_tag_budget: passed
publishability_machine_gate: passed
pacing_naturalness: natural_basic_preferred_on_spanish_structure_stress
natural_basic_vs_exact: natural_basic_better
```

The paired human listening pass preferred `natural_basic` on this Spanish structure-heavy script. Together with the matching EN structure-stress verdict, this supports keeping `natural_basic` as the default for structured `EN + ES` narration while keeping `exact` available.

## Packet Contents

- `es-structure-stress-script.md`
- `es-structure-exact/`
- `es-structure-natural/`
- `comparison-summary.json`
- `final-evaluation.json`
- `listening-scorecard.md`
