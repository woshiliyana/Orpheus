#!/usr/bin/env bash
set -euo pipefail
input=$(cat)
command=$(python3 - <<'PY' "$input"
import json, sys
payload=json.loads(sys.argv[1])
print(payload.get('tool_input',{}).get('command',''))
PY
)

block() {
  echo "$1" >&2
  exit 2
}

case "$command" in
  *"git push --force"*|*"git push -f"*)
    block "Blocked: force pushes are not allowed in Orpheus agent flow."
    ;;
  "git add ."|"git add . "*|"git add -A"|"git add -A "*)
    block "Blocked: use explicit git add paths, not blanket staging."
    ;;
  *"git worktree add"*)
    block "Blocked: use ./scripts/worktree/create.sh so lane limits and task-brief initialization are enforced."
    ;;
  *"git worktree remove"*)
    block "Blocked: use ./scripts/worktree/cleanup.sh for deterministic cleanup."
    ;;
  *"git push origin main"*|*"git push origin HEAD:main"*|*"git push origin master"*)
    block "Blocked: do not push directly to main from an agent shell. Go through review and acceptance gates first."
    ;;
  *"git reset --hard"*|*"git clean -fd"*|*"rm -rf"*)
    block "Blocked: destructive workspace commands are not allowed in the default Orpheus flow."
    ;;
esac

exit 0
