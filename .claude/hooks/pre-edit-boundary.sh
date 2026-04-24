#!/usr/bin/env bash
set -euo pipefail
input=$(cat)
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

file_path=$(python3 - <<'PY' "$input"
import json, sys
payload=json.loads(sys.argv[1])
print(payload.get('tool_input',{}).get('file_path',''))
PY
)

[ -n "$file_path" ] || exit 0

if [ "$file_path" = "$repo_root/.agent/task-brief.json" ] || [ "$file_path" = ".agent/task-brief.json" ]; then
  exit 0
fi

branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
  python3 "$repo_root/scripts/lib/task_brief.py" assert-paths --require-brief "$file_path"
fi
