# Phase 3: QualityOps Baseline

> Status: planned
> Role: execution orchestration
> Normative for product rules: no
> Canonical owner: Product architecture / delivery
> Depends on truth docs: `/docs/prd/prd.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/voice-metadata-schema.md`, `/docs/prd/specs/quality-ops-and-automation.md`
> Last reviewed: 2026-04-22

## Goal

Turn quality into a first-class operated system by creating evaluation pipelines, persistent quality records, and a live quality dashboard in the ops backend.

## Why This Phase Comes Here

You explicitly want TTS effect, voice effect, long-audio effect, and subtitle effect to be watched continuously. That means quality observation must start right after the core render path exists.

## Tracks Involved

- QualityOps
- Workflow

## Entry Criteria

1. Core render workflow can produce real runs and artifacts.

## In-Phase Focus

1. Evaluation corpus and batch execution
2. Persistent quality result records
3. Provider/voice/language/duration quality slices
4. Long-audio stability tracking
5. SRT alignment quality tracking
6. Dynamic quality dashboard inside the ops backend

## Parallel Guidance

1. Dashboard UI and evaluation execution may run together.
2. Dashboard metrics and required surfaces must use the canonical quality spec, not ad hoc implementation choices.

## Exit Criteria

1. Ops can inspect live quality trends, not just one-off test logs.
2. Quality records are tied back to provider, voice, language, and run context.

## Deliverables

1. Quality evaluation baseline
2. Dynamic operations dashboard for render quality
3. Persistent quality history for later decision-making

## Backfill Required

1. If a new quality metric becomes product-critical, add it to the PRD summary and any relevant truth docs before treating it as a gate.
