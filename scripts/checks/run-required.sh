#!/usr/bin/env bash
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

echo "[orpheus] running required checks from $repo_root"

npm run typecheck

if npm test; then
  exit 0
fi

if [ -f /usr/local/lib/node_modules/ts-node/esm.mjs ]; then
  echo "[orpheus] npm test failed, retrying tests with global ts-node loader fallback"
  node --loader /usr/local/lib/node_modules/ts-node/esm.mjs --test tests/*.test.ts
  exit 0
fi

echo "[orpheus] tests failed and no fallback loader is available" >&2
exit 1
