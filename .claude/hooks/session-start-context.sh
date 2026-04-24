#!/usr/bin/env bash
set -euo pipefail
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

echo "Orpheus execution flow: max 3 concurrent non-main worktrees. Required stage order: plan -> review -> implementation -> self_test -> debug -> live_smoke (if required) -> pr_prep -> awaiting_user_acceptance (if required) -> merge_ready -> merged -> cleaned_up."
if [ -f .agent/task-brief.json ]; then
  python3 scripts/lib/task_brief.py show-context
else
  echo "No .agent/task-brief.json in this worktree yet. Use ./scripts/worktree/create.sh or initialize a task brief before editing code."
fi
