---
name: orpheus-parallel-lanes
description: Use before spawning subagents or splitting work across multiple tracks. Builds a safe lane map for Orpheus and blocks parallelization when canonical docs, PRD summaries, or shared evidence artifacts would collide.
---

# Orpheus Parallel Lanes

## Goal

Split work only when it is genuinely safe. Prevent multi-agent collisions on canonical specs, shared summaries, and benchmark artifacts.

## Inputs

- task request
- candidate files or directories
- desired outcome
- time or review constraints, if any

## Lane planning procedure

1. Build a lane table with:
   - lane name
   - objective
   - files touched
   - owner
   - done condition
   - parallel-safe: yes/no
   - merge order
2. Mark a lane **not parallel-safe** if it shares any of the following with another lane:
   - the same canonical spec
   - the same PRD summary section
   - the pricing workbook
   - the same generated benchmark packet
   - a shared schema/enum file whose meaning other lanes depend on
3. Keep one canonical truth file with one writer at a time.
4. Keep the controller responsible for final integration, cross-lane conflict resolution, and final review.
5. If the task is not parallel-safe, propose a serial plan instead of forcing parallelism.

## Suggested safe lane patterns for Orpheus

| Lane | Usually safe? | Notes |
|---|---|---|
| workflow backend vs benchmark harness | sometimes | only if shared lifecycle/schema files are not both edited |
| UI status surface vs review lane | yes | review lane should not mutate files unless explicitly reassigned |
| docs handoff note vs code lane | yes | only if the doc lane does not change canonical truth |
| benchmark workbook vs pricing spec | no | one ownership stream |
| two lanes editing `docs/prd/specs/*.md` on the same topic cluster | no | one truth writer only |

## Subagent rule

Codex only spawns subagents when explicitly asked. After the lane map is approved, spawn only the safe lanes and wait for all of them before integrating.

## Output

Return:

- the lane map
- unsafe collision reasons, if any
- recommended spawn prompts for each safe lane
- integration and review order
