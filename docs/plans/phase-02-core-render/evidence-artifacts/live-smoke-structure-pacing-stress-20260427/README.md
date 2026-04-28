# Live Smoke: Structure Pacing Stress

> Status: passed for provider execution and machine evidence
> Role: exact vs natural_basic structure-stress comparison
> Date: 2026-04-27 PDT

## Purpose

Compare `exact` against `natural_basic` on the first script shape where `natural_basic` should have a fair chance to win: Markdown headings, paragraph breaks, and list items.

The previous short-pair listening pass preferred `exact`, so this packet tests whether structure-aware pauses improve a script that actually contains meaningful structure.

## Commands

```bash
bash scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-structure-pacing-stress-20260427/structure-stress-script.md \
  --request-id live-smoke-structure-exact-20260427 \
  --pacing-mode exact \
  --input-validation strict \
  --format mp3
```

```bash
bash scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-structure-pacing-stress-20260427/structure-stress-script.md \
  --request-id live-smoke-structure-natural-20260427 \
  --pacing-mode natural_basic \
  --input-validation strict \
  --format mp3
```

## Machine Comparison

| Pair | Mode | Duration | Token preserved | Inserted breaks | Max breaks/request | Timestamp coverage | Warnings | Audio probe |
|---|---|---:|---:|---:|---:|---:|---|---|
| EN / Ashley | `exact` | 60.816s | yes | 0 | 0 | 100% | none | MP3, 48 kHz mono, 192081 bps |
| EN / Ashley | `natural_basic` | 66.336s | yes | 10 | 10 | 100% | none | MP3, 48 kHz mono, 192074 bps |

## Interpretation

- `natural_basic` inserted 10 structural break tags across headings, paragraphs, and list items.
- The maximum break-tag count in a provider request was 10, below the Inworld limit of 20.
- The source tokens were preserved in both modes.
- Both runs produced final MP3, subtitles, word timings, manifest, metrics, pacing plan, provider input, and input quality evidence.
- `natural_basic` is 5.520 seconds longer than `exact`, which is consistent with the inserted structural pauses.

## Verdict

```text
provider_execution: passed
artifact_integrity: passed
content_preservation: passed
break_tag_budget: passed
publishability_machine_gate: passed
pacing_naturalness: pending_manual_listening
natural_basic_vs_exact: pending_manual_listening
```

This packet is ready for paired human listening. It should decide whether `natural_basic` is actually better on structure-heavy narration, not merely whether it can insert valid SSML breaks.

## Packet Contents

- `structure-stress-script.md`
- `en-structure-exact/`
- `en-structure-natural/`
- `comparison-summary.json`
- `final-evaluation.json`
- `listening-scorecard.md`
