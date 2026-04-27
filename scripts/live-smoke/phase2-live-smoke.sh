#!/usr/bin/env bash
set -euo pipefail

PROVIDER="inworld"
VOICE="Ashley"
SCRIPT_PATH="fixtures/frozen-corpus/scripts/en-control-medium.txt"
REQUEST_ID="live-smoke-$(date +%Y%m%d-%H%M%S)"
OUTPUT_DIR="runs/live-smoke"
FORMAT="mp3"
RESUME_EXISTING_CHUNKS="false"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --provider)
      PROVIDER="$2"; shift 2 ;;
    --voice)
      VOICE="$2"; shift 2 ;;
    --script)
      SCRIPT_PATH="$2"; shift 2 ;;
    --request-id)
      REQUEST_ID="$2"; shift 2 ;;
    --output-dir)
      OUTPUT_DIR="$2"; shift 2 ;;
    --format)
      FORMAT="$2"; shift 2 ;;
    --resume-existing-chunks)
      RESUME_EXISTING_CHUNKS="true"; shift ;;
    *)
      echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if [ ! -f "$SCRIPT_PATH" ]; then
  echo "Missing script file: $SCRIPT_PATH" >&2
  exit 2
fi

case "$PROVIDER" in
  inworld|cartesia)
    ;;
  *)
    echo "Unsupported provider: $PROVIDER" >&2
    exit 2
    ;;
esac

mkdir -p "$OUTPUT_DIR"

resume_args=()
if [ "$RESUME_EXISTING_CHUNKS" = "true" ]; then
  resume_args+=(--resume-existing-chunks)
fi

npm run narrate -- --provider "$PROVIDER" --voice "$VOICE" --script-file "$SCRIPT_PATH" --request-id "$REQUEST_ID" --output-dir "$OUTPUT_DIR" --format "$FORMAT" "${resume_args[@]}"
