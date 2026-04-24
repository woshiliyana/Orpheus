#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: ./scripts/worktree/cleanup.sh [--force] <worktree-path>" >&2
}

FORCE_REMOVE="false"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --force)
      FORCE_REMOVE="true"
      shift
      ;;
    -*)
      usage
      exit 2
      ;;
    *)
      break
      ;;
  esac
done

if [ "$#" -ne 1 ]; then
  usage
  exit 2
fi

WORKTREE_PATH="$1"
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if [ "$FORCE_REMOVE" != "true" ]; then
  if [ -n "$(git -C "$WORKTREE_PATH" status --porcelain)" ]; then
    echo "Blocked: worktree '$WORKTREE_PATH' has uncommitted changes. Re-run with --force if cleanup is intentional." >&2
    exit 2
  fi
  git worktree remove "$WORKTREE_PATH"
else
  git worktree remove --force "$WORKTREE_PATH"
fi

echo "Removed worktree: $WORKTREE_PATH"
