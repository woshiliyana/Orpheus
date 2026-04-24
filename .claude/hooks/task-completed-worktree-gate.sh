#!/usr/bin/env bash
set -euo pipefail
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"
python3 "$repo_root/scripts/lib/task_brief.py" assert-task-complete
