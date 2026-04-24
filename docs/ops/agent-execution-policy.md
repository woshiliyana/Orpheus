# Agent Execution Policy

> Status: active
> Role: execution policy
> Normative for product rules: no
> Canonical owner: engineering lead + delivery owner
> Depends on: `AGENTS.md`, `docs/prd/source-of-truth-index.md`, `docs/prd/agent-conventions.md`
> Last reviewed: 2026-04-23

## Purpose

This file defines how agents should execute work in the Orpheus repo without corrupting canonical truth, packaging assumptions, or the first-gate Phase 2 scope.

It governs controller/worker behavior, multi-lane safety, worktree staging, review order, live-smoke gates, user-acceptance gates, merge order, and handoff shape. It does **not** own product rules.

## Controller vs worker responsibilities

| Role | Responsibility |
|---|---|
| `controller` | Reads the task, picks the right skills, maps touched files, decides whether the work is serial or parallel, integrates results, and performs final review |
| `worker` | Executes one bounded lane only, within approved files and scope |
| `reviewer` | Performs an independent verification pass and does not silently expand scope |

## Lane safety rules

Default operating limits:

- max 3 concurrent non-main worktrees
- every worktree lane must own `.agent/task-brief.json`
- every task brief must be reviewed before implementation begins
- `debug` is mandatory before a lane becomes PR-ready

A lane is parallel-safe only if all of the following are true:

1. Its file set is disjoint from every other lane.
2. It does not share a canonical spec with another lane.
3. It does not share the same PRD summary section with another lane.
4. It does not share the pricing workbook or other generated evidence packets with another lane.
5. The lane goal can be reviewed independently before integration.

If any rule fails, keep the work serial.

## Current Orpheus-safe lane shapes

| Lane shape | Usually safe? | Notes |
|---|---|---|
| Backend workflow implementation vs provider benchmark harness | Often yes | Only if lifecycle enums and shared adapter surfaces are not edited by both lanes |
| UI status surface vs benchmark note write-up | Often yes | Only if no shared canonical docs are edited in both lanes |
| Independent review lane | Yes | Review lane should not modify files unless explicitly reassigned |
| Pricing/package doc edits vs provider benchmark workbook edits | No | These belong in one ownership stream |
| Two lanes editing `docs/prd/specs/*.md` for the same topic cluster | No | One truth file = one writer |

## Stage order

Use this execution order inside each implementation lane unless the controller explicitly narrows it for docs-only or review-only work:

1. `plan`
2. `review`
3. `implementation`
4. `self_test`
5. `debug`
6. `live_smoke` when required
7. `pr_prep`
8. `awaiting_user_acceptance` when required
9. `merge_ready`
10. `merged`
11. `cleaned_up`

A lane is not complete while it is waiting for required smoke or required user acceptance.

## Merge order

Use this merge order unless there is a strong reason not to:

1. Canonical truth docs
2. Shared schema/enums/lifecycle code
3. Provider adapters and orchestration code
4. UI/status/read-model surfaces
5. Evidence artifacts and benchmark notes
6. Summary docs, handoff notes, and prompt/playbook updates

## Required review order

1. Worker self-check
2. Mandatory debug/stabilize pass
3. Controller diff review
4. Independent reviewer or `$orpheus-change-verification`
5. Live smoke review when required
6. Human acceptance when required
7. Final integration note

## Handoff packet

Every lane handoff should contain:

- lane goal
- files changed
- checks run
- assumptions taken
- unresolved risks
- whether canonical docs were changed or should be changed next

## When to stop and sync docs

Stop and invoke `$orpheus-doc-sync` if any of these becomes true:

- The stable-audio envelope is narrower than the current public/package promise.
- `EN + ES` readiness changes to a different language boundary.
- Provider cost or retry overhead materially changes package viability.
- Lifecycle states or warning semantics need new meanings.
- MkSaaS or provider boundaries need a different ownership split.

## Optional Superpowers interop

If Superpowers is installed, it can help with planning and review, but it remains subordinate to repo-local truth.

Recommended sequence:

1. `brainstorming` only for open-ended scope
2. `writing-plans` only after scope is approved
3. `using-git-worktrees` only when isolation is actually needed
4. `systematic-debugging` for provider instability, chunk/stitch issues, or timing/alignment weirdness
5. `code-review` before final handoff

Do not let Superpowers create replacement truth docs or override Orpheus lane safety rules.
