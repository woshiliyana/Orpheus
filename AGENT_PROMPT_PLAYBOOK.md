# AGENT_PROMPT_PLAYBOOK.md

This file contains copy-paste prompts for Codex or other repo-aware coding agents working on Orpheus after commit `128c7b2`.

Use these prompts after the repo-root `AGENTS.md` and `.agents/skills/` are present.

## 1) Design backend/system boundaries before implementation

```text
Read AGENTS.md first, then use $orpheus-truth-router, then use $orpheus-system-design.

Work from current canonical truth only.
Do not invent product rules.

Focus on:
- bounded units
- interfaces
- artifact/lifecycle/provider boundaries
- failure semantics
- EN + ES gate implications where relevant

Before proposing a design, state:
1. canonical docs you read
2. which boundaries you will not cross
3. 2-3 architecture options with trade-offs
```

## 2) Start a bounded Phase 2 implementation slice

```text
Read AGENTS.md first, then use $orpheus-phase2-stable-audio.

Work on the current repo state only. Build the smallest Phase 2 slice that can take one authenticated project from script submission to downloadable final audio through a backend-owned workflow.

Hard constraints:
- English-first workspace
- EN + ES benchmark/output-timing gate
- Inworld TTS 1.5 Max as primary path
- Cartesia same-corpus benchmark in the first cycle
- hidden chunking only in backend orchestration
- no public SRT export
- no public no-login long-form trial
- no direct provider calls from browser/client

Before coding, show:
1. files you need to read
2. the minimal code/data model surface you will touch
3. the acceptance gates you will prove
```

## 3) Run a provider benchmark and packaging pressure test

```text
Use $orpheus-provider-benchmark.

Evaluate the current long-form narration workflow against the frozen EN + ES corpus and selected voices. Keep Inworld as the primary scenario and Cartesia as the second-provider scenario.

Required outputs:
- provider comparison table
- EN + ES output/timing readiness note
- effective cost per completed audio minute
- retry overhead observation
- one packaging note explaining whether Pro = $20 / 90 min still clears the target margin guardrail
- one short benchmark note against the current public self-serve long-form workflow with ElevenLabs as the default comparison point

If the observed envelope or cost invalidates the current packaging, do not leave the docs stale. Invoke $orpheus-doc-sync and name the blocked or revised package explicitly.
```

## 4) Update canonical docs after implementation evidence changes scope

```text
Use $orpheus-doc-sync.

A recent implementation or benchmark result changed product truth. Determine whether the change affects:
- capability entitlements
- project/run lifecycle
- billing semantics
- pricing/package economics
- distribution/language boundary
- MkSaaS boundary
- quality ops

Update the canonical source first, then summary docs, then any execution docs that are now stale.

Return:
1. canonical files changed
2. summary/execution docs changed
3. the exact rule that changed
4. follow-up docs that intentionally remain unchanged
```

## 5) Plan safe multi-lane work before spawning subagents

```text
Use $orpheus-parallel-lanes.

I want to split this work across parallel lanes, but only if it is safe. Build a lane map with:
- lane name
- goal
- files touched
- owner
- whether it is parallel-safe
- merge order
- review order

Do not let two lanes touch the same canonical spec, the same PRD summary section, or the pricing workbook. If the task is not parallel-safe, say so and propose a serial plan instead.

After the lane map is approved, spawn only the safe lanes and wait for all of them before integrating.
```

## 6) Review a diff against Orpheus truth and current gate

```text
Use $orpheus-change-verification.

Review the current diff against:
- AGENTS.md
- docs/prd/source-of-truth-index.md
- docs/prd/agent-conventions.md
- the relevant canonical specs
- the current Phase 2 brief/checklist if the change touches implementation

Verify:
- no duplicate truth was created
- no public promise was broadened silently
- client/provider boundaries remain correct
- artifact_manifest and warning-state semantics remain intact
- EN + ES benchmark/timing claims still match evidence
- pricing/package claims still match the latest cost truth

Return:
1. blocking issues
2. non-blocking risks
3. missing tests/checks
4. missing doc backfills
5. ready/not-ready verdict
```

## 7) Optional Superpowers-assisted flow

Use this only if Superpowers is installed locally and you want the extra workflow discipline.

```text
Follow AGENTS.md first.

If the scope is still fuzzy, use brainstorming.
Once scope is approved, use writing-plans.
If we need safe parallel execution, use $orpheus-parallel-lanes first, then use subagent-driven-development only for lanes marked safe.
For instability or provider weirdness, use systematic-debugging.
Before handoff, use code-review and then $orpheus-change-verification.
```

## 8) One-shot controller prompt for a strong default start

```text
Read AGENTS.md first. Then use $orpheus-truth-router to choose the right canonical docs, and follow with the repo-local skill that best matches the task.

Do not invent product truth. Do not broaden the promise. Do not skip doc backfill if implementation evidence changes the package, language gate, lifecycle semantics, or public scope.

If the task can be parallelized safely, invoke $orpheus-parallel-lanes before spawning any subagents.
If the task ends in a diff or patch, finish with $orpheus-change-verification.
```
