# ORPHEUS_V0.44_WORKTREE_FLOW_AND_LIVE_SMOKE_HANDOFF

## Base inspected

- Remote/base commit in uploaded repo: `c3af4c7 feat: add phase1 narration pipeline`

## What this increment adds

This increment does **not** change the narration business logic. It adds the missing execution layer around the current implementation:

- max-3 concurrent non-main worktree policy
- task-brief runtime contract at `.agent/task-brief.json`
- reviewed-plan-before-implementation rule
- mandatory `debug` stage
- live-smoke gate before merge-ready when real provider behavior matters
- explicit `awaiting_user_acceptance` stop for gated stages
- Claude Code project hooks in `.claude/settings.json`
- git hooks for commit/push protection in `.githooks/`
- worktree create / cleanup / status scripts
- live smoke wrapper script
- PR template and ops docs
- new repo-local skill: `orpheus-worktree-flow`

## Current assessment of the codebase

The uploaded repo is materially beyond docs-only and already contains a working narration pipeline slice:

- provider adapters exist for `Inworld` and `Cartesia`
- the pipeline chunks, retries, stitches, writes subtitles, metrics, and artifact manifests
- CLI entrypoints exist for narration and benchmark execution
- automated test coverage exists across chunking, retry/concurrency, adapters, metrics, stitching, subtitles, and full narration pipeline

But there are still stage-gate gaps before I would call the broader Phase 2 gate closed:

1. `src/pipeline/narration.ts` still hard-locks the workflow to English.
2. `fixtures/frozen-corpus/manifest.json` currently contains English entries only.
3. The repo now has a strong pipeline core, but the live smoke process was not yet codified or enforced before this increment.
4. The execution docs expected stronger stage discipline than the repo tooling previously enforced.

## Recommended next step after applying this increment

Do **not** widen scope yet. The correct next move is:

1. install hooks
2. put the current lane under a task brief
3. run one Inworld live smoke on the current pipeline
4. capture the artifact packet and seam/timing note
5. stop for human acceptance if this stage is founder-gated
6. only after that decide whether to open a new lane for `EN + ES` corpus/benchmark backfill

## Files included

### Updated

- `.agents/skills/orpheus-parallel-lanes/SKILL.md`
- `.agents/skills/orpheus-phase2-stable-audio/SKILL.md`
- `.gitignore`
- `AGENTS.md`
- `AGENT_PROMPT_PLAYBOOK.md`
- `docs/ops/agent-execution-policy.md`
- `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
- `docs/plans/phase-02-core-render/README.md`

### Added

- `.agents/skills/orpheus-worktree-flow/SKILL.md`
- `.claude/settings.json`
- `.claude/hooks/session-start-context.sh`
- `.claude/hooks/pre-bash-worktree-guard.sh`
- `.claude/hooks/pre-edit-boundary.sh`
- `.claude/hooks/task-completed-worktree-gate.sh`
- `.githooks/pre-commit`
- `.githooks/pre-push`
- `.githooks/commit-msg`
- `.github/pull_request_template.md`
- `docs/ops/phase2-live-smoke.md`
- `docs/ops/worktree-parallel-development.md`
- `docs/plans/phase-02-core-render/06-live-smoke-checklist.md`
- `docs/templates/worktree-task-brief.md`
- `docs/templates/worktree-task-brief.json`
- `scripts/lib/task_brief.py`
- `scripts/checks/run-required.sh`
- `scripts/install-git-hooks.sh`
- `scripts/worktree/create.sh`
- `scripts/worktree/cleanup.sh`
- `scripts/worktree/update-status.sh`
- `scripts/live-smoke/phase2-live-smoke.sh`

## Validation run

- `bash -n` on all shell scripts: passed
- `python3 -m py_compile scripts/lib/task_brief.py`: passed
- `python3 -m json.tool .claude/settings.json`: passed
- `scripts/worktree/create.sh` + `scripts/worktree/cleanup.sh`: passed
- `./scripts/checks/run-required.sh`: passed in the container
  - `npm run typecheck`: passed
  - `npm test`: failed due cross-platform `esbuild` binary in the uploaded macOS-packed `node_modules`
  - fallback loader run: `node --loader /usr/local/lib/node_modules/ts-node/esm.mjs --test tests/*.test.ts`: passed (`15/15`)

## Apply

```bash
git apply orpheus_v0.44_worktree_flow_and_live_smoke_increment.patch
chmod +x .claude/hooks/*.sh .githooks/* scripts/install-git-hooks.sh scripts/checks/*.sh scripts/worktree/*.sh scripts/live-smoke/*.sh
./scripts/install-git-hooks.sh
```
