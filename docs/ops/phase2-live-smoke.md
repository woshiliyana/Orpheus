# Phase 2 Live Smoke

> Status: ready
> Role: execution checklist
> Normative for product rules: no
> Canonical owner: delivery owner + engineering lead
> Depends on: `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`, `docs/ops/worktree-parallel-development.md`
> Last reviewed: 2026-04-26

## Purpose

Provide one repeatable live-provider smoke path after automated checks pass and before a lane is treated as merge-ready for the current Phase 2 narration slice.

The smoke packet feeds the canonical `tts_ux_readiness_scorecard` in `/docs/prd/specs/quality-ops-and-automation.md`. Audio generation can pass with warnings while broader product readiness remains blocked by missing evidence.

## Preconditions

1. `reviewStatus=approved`
2. automated checks pass locally
3. provider credentials are present in the shell, this repo's shared env file `.git/orpheus.server.env`, or repo-root `.env.local`
4. one chosen script and voice are recorded in the lane brief
5. the lane already passed `debug`

## Default smoke command

```bash
./scripts/live-smoke/phase2-live-smoke.sh \
  --provider inworld \
  --voice Ashley \
  --script fixtures/frozen-corpus/scripts/en-control-medium.txt \
  --format mp3
```

Do not run a paired provider-native `--format wav` smoke by default. If the product question is only download packaging, derive a clearly labeled WAV from the existing MP3 artifact at zero provider cost. Run provider-native `--format wav` only when the lane explicitly needs to decide whether WAV / Linear PCM is ready to serve as an internal production master or user-facing export.

If a long-form run fails after some chunks have already produced valid provider audio, rerun the same `--request-id`, source script, provider, voice, and format with:

```bash
--resume-existing-chunks
```

This flag is explicit on purpose. It lets the backend reuse completed chunk artifacts in the same ignored `runs/` packet instead of paying to regenerate from zero, while keeping hidden chunking inside the backend-owned smoke path.

## Evidence packet to keep

- stdout JSON from the smoke run
- final audio file
- `artifact-manifest.json`
- `metrics.json`
- one short seam-quality note
- one short timing / warning note
- requested output format, observed container / codec, sample rate, bitrate when applicable, and file size
- one `audio_format_verdict` using `ready_for_internal_master`, `ready_for_delivery`, `ready_for_export`, `hold_for_export`, or `blocked`
- for MP3 delivery, explicit judgment against the commercial default target of `>=192 kbps`
- if resumed, `cachedChunkCount`, retry evidence, and a note that chunk reuse stayed backend-owned
- `final-evaluation.json` or an equivalent evaluation note that records:
  - `scorecard=tts_ux_readiness_scorecard`
  - hard-gate verdict before weighted score
  - per-dimension coverage status
  - missing evidence and manual reviews
  - `audio_generation_smoke` verdict and broader product-readiness verdict separately

The evidence packet must not remain only in ignored `runs/` output or in a temporary worktree. Before a live-smoke lane reaches `merge_ready`, copy the selected packet into a merge-tracked evidence directory, preferably:

```text
docs/plans/phase-02-core-render/evidence-artifacts/<attempt_id>/
```

At minimum, promote the final audio when it is small enough for normal Git, or a large-artifact manifest with hash / size / retention path when it is not. Also promote `artifact-manifest.json`, `metrics.json`, splice report when present, subtitle / timing artifacts when present, probe metadata, and a short review note. Raw provider responses may be promoted only after checking that they contain no credentials or private account tokens.

## Pass criteria

1. command returns success
2. final audio is generated
3. `artifact-manifest.json` exists
4. `metrics.json` exists
5. no unexpected fatal warnings
6. subjective seam review is acceptable for the tested script
7. the evidence packet records whether the tested format is commercially acceptable for delivery, internal-master use, both, or neither
8. the packet records whether missing evidence blocks broader `product_readiness_evaluation`

## Hold criteria

Treat the lane as held, not merge-ready, if any of these happen:

- provider credentials fail
- audio generation succeeds but artifacts are incomplete
- warnings indicate broken timing integrity
- stitched output has audible seam regressions
- observed retry behavior is materially worse than expected
- the output format cannot be decoded, cannot be stitched cleanly, creates unacceptable artifacts, or has storage / delivery characteristics that make it unsuitable for the claimed use
- the packet lacks required readiness evidence and no explicit `blocked_by_missing_evidence` evaluation note is retained

## After smoke

If the smoke passes:

```bash
./scripts/worktree/update-status.sh liveSmokeStatus=passed stage=pr_prep
```

Then promote the evidence packet and confirm `git status` shows the promoted files before the lane is marked `merge_ready`.

If the lane also needs founder signoff:

```bash
./scripts/worktree/update-status.sh stage=awaiting_user_acceptance status=awaiting_user_acceptance
```

Do not mark the lane complete until acceptance, when required, is explicit.

Do not clean up the worktree until the promoted evidence packet has either been merged into `main` or explicitly waived in the lane closeout note.
