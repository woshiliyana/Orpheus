# AGENTS.md

## Scope and baseline

This file is the repo-root instruction layer for Orpheus. It is aligned to the current remote baseline that already includes `v0.41 benchmark + bilingual gate` work in commit `128c7b2`.

Treat this repository as **docs-first, truth-driven, and gate-controlled**:

- Product truth lives under `docs/prd/`.
- Execution planning lives under `docs/plans/` and `docs/roadmap/`.
- Benchmark and market-reference material informs decisions but does not override canonical specs.
- Do not invent product rules in code comments, task notes, or ad hoc markdown.

## Mandatory read order

Read these before changing product rules or Phase 2 implementation behavior:

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/agent-conventions.md`
3. If the task touches Phase 2 build/test work:
   - `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
   - `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
   - `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
4. If the task touches pricing, packaging, margins, plan limits, or rollout economics:
   - `docs/prd/specs/pricing-packaging-and-unit-economics.md`
   - `docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx`
5. If the task touches public promises, landing pages, trials, or language scope:
   - `docs/prd/specs/distribution-and-growth-surface.md`
6. If the task touches statuses, warnings, artifacts, or retries:
   - `docs/prd/specs/project-run-lifecycle.md`
7. If the task touches capability gating:
   - `docs/prd/specs/capability-entitlements.md`
8. If the task touches billing, usage, compensation, or top-ups:
   - `docs/prd/specs/billing-usage-semantics.md`

## Current non-negotiable product truth

Do not broaden or silently weaken these without updating the canonical docs first:

- The first real promise is stable long-form narration for the educational-explainer wedge.
- The workspace is English-first.
- The first output/timing readiness gate is `EN + ES`, not full multilingual workspace support.
- Backend-owned hidden chunking is allowed. User-side manual chunking is not an acceptable first-gate workflow.
- `Inworld TTS 1.5 Max` is the primary implementation path for the first build slice.
- `Cartesia` must still be benchmarked on the same frozen corpus in the first benchmark cycle.
- Public `SRT` export, public no-login long-form trial, and a broad public pricing rollout are later layers, not first-gate deliverables.
- Do not position “supports long text” as the differentiator by itself.
- If observed provider cost or retry behavior breaks packaging assumptions, update pricing/package truth instead of leaving stale promises in place.

## Canonical edit rules

- Change the canonical document first.
- Update summary docs second.
- Update execution docs third if they now conflict with truth.
- Never create a second “temporary rules” file outside the canonical set.
- If a topic is high-risk and lacks a canonical home, add that home intentionally before spreading rules elsewhere.
- Normative docs must follow the writing discipline in `docs/prd/agent-conventions.md`.

## Code and system rules

When implementation begins, these stay in force even if the repo grows beyond docs-only:

- Never let the browser or public client call TTS, STT, or storage providers directly.
- Hidden chunking, retries, and stitch/orchestration details belong to backend-owned workflow code.
- Successful runs must persist final audio plus a durable `artifact_manifest`.
- `audio success + alignment failure` must resolve to a warning-bearing completion path, not a full rerun-billing path.
- Do not invent build/test commands. Inspect the actual repo first, then run the relevant commands that genuinely exist.
- Do not add provider- or framework-specific behavior to MkSaaS boundaries unless the canonical boundary docs are updated as part of the same change.

## Skill routing

Use repo-local skills before generic methodology packs:

- `$orpheus-truth-router` for rule routing and canonical-doc selection.
- `$orpheus-system-design` for backend-facing system design before implementation work begins.
- `$orpheus-phase2-stable-audio` for the current build/test slice and stable-audio implementation work.
- `$orpheus-provider-benchmark` for provider comparison, cost updates, and packaging pressure tests.
- `$orpheus-parallel-lanes` before any multi-lane or subagent work.
- `$orpheus-doc-sync` when implementation or benchmark evidence changes the docs.
- `$orpheus-change-verification` before handing work back.

If you use Codex skills implicitly, keep task descriptions precise enough for the right skill to trigger.

## Parallel and subagent policy

Codex only spawns subagents when explicitly asked. Do not assume invisible background parallelism.

Before parallel work:

1. Invoke `$orpheus-parallel-lanes`.
2. Produce a lane map with file ownership, merge order, and done conditions.
3. Keep one canonical truth file owned by one writer at a time.
4. Do not let multiple lanes edit the same canonical spec, PRD summary section, or pricing workbook.
5. Merge canonical truth before summaries, and merge evidence before packaging changes.

Use `docs/ops/agent-execution-policy.md` for the full controller/worker policy.

## Optional Superpowers usage

Superpowers is allowed as an optional accelerator, not as the governing constitution of the repo.

Recommended optional mapping if Superpowers is installed locally:

- `brainstorming` for open-ended scoping
- `writing-plans` for turning approved scope into an implementation plan
- `systematic-debugging` for provider, stitching, or alignment failures
- `code-review` for a second review pass
- `using-git-worktrees` only when you truly need isolation

Orpheus repo truth still wins over any generic Superpowers behavior. Do not let an external skill redefine product scope, pricing, language promises, lifecycle meanings, or rollout gates.

## Handoff standard

Every meaningful handoff should include:

- What changed
- Which canonical docs or execution docs were read
- Which checks were run
- What remains uncertain
- Whether any truth-doc backfill is still required
