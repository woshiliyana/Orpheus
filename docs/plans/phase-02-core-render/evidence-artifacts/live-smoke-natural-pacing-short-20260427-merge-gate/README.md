# Live Smoke: Natural Pacing Short Merge Gate

> Status: passed for provider execution and artifact integrity
> Request ID: `live-smoke-natural-pacing-short-20260427-merge-gate`
> Provider: Inworld
> Voice: Ashley
> Language: EN
> Pacing mode: `natural_basic`
> Input validation: `strict`

## Command

```bash
set -a
source .git/orpheus.server.env
set +a
bash scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-short.txt \
  --request-id live-smoke-natural-pacing-short-20260427-merge-gate \
  --pacing-mode natural_basic \
  --input-validation strict \
  --format mp3
```

## Result

- Provider run succeeded.
- Final audio was generated as `final.mp3`.
- Artifact manifest reports `run_status=succeeded`.
- Input quality passed in `strict` mode.
- Token preservation passed.
- `natural_basic` inserted `2` paragraph breaks.
- Max break tags per provider request was `2`, below the Inworld limit of `20`.
- Timestamp coverage was `100%`.
- Audio probe decoded the final MP3 as 48 kHz mono, 103.248 seconds.

## Notes

This packet is a small merge-gate live smoke, not a full UX readiness verdict. Manual listening and long-form comparison remain separate follow-up checks.
