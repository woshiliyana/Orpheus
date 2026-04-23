---
name: orpheus-system-design
description: Use when designing backend-facing system boundaries, execution semantics, artifact flows, or provider and lifecycle interactions before implementation work begins.
---

# Orpheus System Design

## Goal

Design backend and orchestration boundaries for Orpheus before implementation begins, without redefining product truth or slipping into direct build work.

## Read first

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/agent-conventions.md`
3. The canonical spec for the touched topic
4. The relevant execution packet if the design affects current Phase 2 work
5. If the touched topic cluster is not already explicit, route through `$orpheus-truth-router` before doing design work

## Use this skill for

- backend workflow decomposition
- provider adapter boundaries
- artifact manifest and execution-flow design
- retry, stitch, warning, and recovery semantics
- service and job interface design
- implementation-facing architecture notes before coding starts

## Do not use this skill for

- defining product truth
- defining pricing truth
- defining language promises
- direct implementation
- landing-page, marketing, or visual design
- replacing canonical specs with a temporary architecture memo

## Required process

1. Use `$orpheus-truth-router` first unless the canonical topic set is already explicit from the task and current diff.
2. Name the canonical docs that govern the area before proposing design options.
3. State which boundaries are fixed by current truth and must not be redefined here.
4. Identify the bounded units, their responsibilities, and their interfaces.
5. Propose 2-3 architecture options with trade-offs.
6. Recommend one option and explain why it best fits the current truth and execution goal.
7. Write the result as a design artifact or design note that maps current truth into implementation boundaries, not a replacement rule table.

## Stop and reroute if

- the proposal would change product scope, packaging, or rollout meaning
- the proposal would change pricing, billing, or compensation semantics
- the proposal would change public or workspace language promises
- the proposal would redefine lifecycle truth instead of designing within it

Route those cases through `$orpheus-truth-router` first, then use `$orpheus-doc-sync` if the canonical docs must change.

## Output

Return:

- the bounded units
- interfaces and dependencies
- failure, retry, and warning semantics
- open risks or unresolved assumptions
- any canonical docs that would need backfill if the design crosses current truth
