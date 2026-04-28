# Live Smoke: Exact vs Natural Short Comparison

> Status: passed for provider execution and machine evidence
> Role: post-merge comparison evidence
> Date: 2026-04-27 PDT

## Purpose

Compare `exact` against the already captured `natural_basic` short smokes for the same EN and ES inputs.

This packet stores the newly generated `exact` artifacts. The matching `natural_basic` artifacts are already retained in:

```text
docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-env-loader-and-es-natural-20260427/
```

## Commands

```bash
bash scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-short.txt \
  --request-id live-smoke-en-exact-short-20260427 \
  --pacing-mode exact \
  --input-validation strict \
  --format mp3
```

```bash
npm run narrate -- \
  --provider inworld \
  --language es \
  --voice Rafael \
  --script-file docs/plans/phase-02-core-render/evidence-artifacts/live-smoke-env-loader-and-es-natural-20260427/es-natural-short/source-script.md \
  --request-id live-smoke-es-exact-short-20260427 \
  --output-dir runs/live-smoke \
  --format mp3 \
  --pacing-mode exact \
  --input-validation strict
```

## Machine Comparison

| Pair | Mode | Duration | Token preserved | Inserted breaks | Max breaks/request | Timestamp coverage | Warnings |
|---|---|---:|---:|---:|---:|---:|---|
| EN / Ashley | `natural_basic` | 103.392s | yes | 2 | 2 | 100% | none |
| EN / Ashley | `exact` | 102.000s | yes | 0 | 0 | 100% | none |
| ES / Rafael | `natural_basic` | 29.928s | yes | 2 | 2 | 100% | none |
| ES / Rafael | `exact` | 29.832s | yes | 0 | 0 | 100% | none |

## Interpretation

- `natural_basic` added only structural break tags.
- No run changed source tokens.
- No run exceeded the Inworld break-tag budget.
- All final MP3 files decoded as 48 kHz mono around 192 kbps.
- The EN natural run is about 1.392s longer than exact, consistent with two paragraph breaks.
- The ES natural run is about 0.096s longer than exact. This is small enough that provider-level prosody may have absorbed most of the inserted structural pauses.

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

This packet is ready for paired human listening, but it does not by itself prove that `natural_basic` sounds better than `exact`.
