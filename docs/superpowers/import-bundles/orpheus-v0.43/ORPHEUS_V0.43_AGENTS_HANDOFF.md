# ORPHEUS_V0.43_AGENTS_HANDOFF

## What this is

This is a clean **agents-only rebase increment** written against the remote repo state that already includes commit `128c7b2` (`docs: integrate v0.41 benchmark and bilingual gate`).

It does **not** re-touch the `v0.41` truth-doc merge. It adds only the agent operating layer needed to start work safely on top of that baseline.

## Files added

- `AGENTS.md`
- `AGENT_PROMPT_PLAYBOOK.md`
- `docs/ops/agent-execution-policy.md`
- `.agents/skills/orpheus-truth-router/SKILL.md`
- `.agents/skills/orpheus-phase2-stable-audio/SKILL.md`
- `.agents/skills/orpheus-provider-benchmark/SKILL.md`
- `.agents/skills/orpheus-parallel-lanes/SKILL.md`
- `.agents/skills/orpheus-doc-sync/SKILL.md`
- `.agents/skills/orpheus-change-verification/SKILL.md`

## Design goals

- Keep repo-root instructions concise enough for Codex to load reliably.
- Route work into repo-scoped skills under `.agents/skills/`.
- Preserve the latest Orpheus truth:
  - English-first workspace
  - `EN + ES` output/timing gate
  - stable long-form narration first
  - Inworld primary path
  - Cartesia same-cycle benchmark
  - hidden backend chunking
- Make multi-lane work explicit and safe.
- Keep Superpowers optional, not authoritative.

## Suggested usage

1. Apply the patch:
   ```bash
   git apply orpheus_agents_v0.43_rebased.patch
   ```
2. Restart Codex if it is already open, so new repo-local skills are discovered.
3. Start agent work with `AGENTS.md`.
4. Use the prompt templates in `AGENT_PROMPT_PLAYBOOK.md`.
5. Before any multi-agent work, invoke `$orpheus-parallel-lanes`.

## Why this is add-only

The repo already merged the `v0.41` bilingual benchmark and packaging gate work. This increment avoids reopening canonical truth files unless a later task actually proves they need updating.

That keeps the change set smaller, safer, and much less likely to collide with the latest remote state.
