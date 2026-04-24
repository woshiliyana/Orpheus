#!/usr/bin/env bash
set -euo pipefail
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if [ "$#" -lt 1 ]; then
  echo "Usage: ./scripts/worktree/update-status.sh key=value [key=value ...]" >&2
  exit 2
fi

python3 "$repo_root/scripts/lib/task_brief.py" set "$@"
