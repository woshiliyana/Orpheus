# Cartesia Medium Listening and Timing Closeout

> Status: closed for scoped benchmark with warnings
> Role: timing QA, listening closeout, and provider-decision memo
> Provider role: second-provider benchmark / fallback / negotiation evidence
> Provider calls: none in this closeout
> Last reviewed: 2026-04-28

## Scope

This closeout evaluates only the existing `live-smoke-cartesia-medium-20260428` packet. It does not generate audio, rerun Cartesia, change pacing, change voices, or update pricing truth.

The subjective listening source is the existing user review already recorded in the packet. This note adds machine timing checks, artifact verification, and the provider-comparison decision.

## Timing Spot Check

| Language | Audio duration | Timestamp coverage | Word timings | SRT / VTT cues | Monotonic checks | Last timed word | Uncovered tail | Chunk-boundary check | Verdict |
|---|---:|---:|---:|---:|---|---:|---:|---|---|
| EN | `174.504s` | `99.80%` | `503` | `43 / 43` | `0` word and cue violations | `174.236s` | `0.268s` | Boundary at `74.808s` lands between word timings with `0.164s` before and `0.139s` after | `warning_accepted` |
| ES | `177.936s` | `99.64%` | `550` | `56 / 56` | `0` word and cue violations | `177.791s` | `0.145s` | Boundaries at `78.336s` and `149.664s` land between word timings with no inversion | `warning_accepted` |

Spot-check windows covered opening, middle, final cue, and every splice boundary. EN and ES SRT/VTT cues are monotonic, cue end times stay within final audio duration, word timings are monotonic, and no word timing extends past the MP3 duration.

`timestamp_coverage_partial` remains a real warning because coverage is not exactly `100%`, but the uncovered tails are sub-second and the checked splice boundaries do not show material subtitle/audio drift. Treat this as acceptable for the scoped Cartesia medium benchmark, not as proof of final public subtitle export readiness.

## Listening Closeout

| Language | Existing listening result | Closeout interpretation |
|---|---|---|
| EN | Accepted; no material issue heard in the medium sample | Keep as scoped audio-quality pass with timing warning preserved. |
| ES | Accepted with voice-speed note; Spanish sounds relatively fast | Preserve as likely voice-choice / delivery-speed risk. Do not change pacing or voice from this single medium sample. |

The ES speed note is not a timing-failure finding. It should inform future Cartesia voice selection only if a later dedicated Cartesia lane is opened.

## Provider Scorecard

| Evidence packet | Provider | Language / scope | Duration | Chunks / stitches / retries | Wall time | Estimated total cost | Cost / completed audio min | Format posture | Timing posture | Readiness readout |
|---|---|---|---:|---|---:|---:|---:|---|---|---|
| `live-smoke-cartesia-medium-20260428` EN | Cartesia | EN medium frozen slot | `174.504s` | `2 / 1 / 0` | `29.015s` | `$0.133` | `$0.046` | raw PCM master retained by manifest; derived MP3 ready for delivery; WAV export held | `timestamp_coverage_partial`, spot-check accepted | Second-provider benchmark viable with warnings |
| `live-smoke-cartesia-medium-20260428` ES | Cartesia | ES medium frozen slot | `177.936s` | `3 / 2 / 0` | `28.035s` | `$0.141` | `$0.048` | raw PCM master retained by manifest; derived MP3 ready for delivery; WAV export held | `timestamp_coverage_partial`, spot-check accepted | Second-provider benchmark viable with ES voice-speed warning |
| `live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input` | Inworld | EN pressure sample | `2170.48s` | `21 / 20 / 3`; resumed with cached chunks | cache-resume receipt only | `$1.66` | `$0.046` | provider-native WAV ready for internal master; derived MP3 ready for delivery; WAV export held | timing assets exist, but manual timing QA still required in that packet | Primary path still has stronger long-form proof, but broader readiness is blocked by missing review |
| `live-smoke-env-loader-and-es-natural-20260427` ES short | Inworld | ES short provider smoke | `29.928s` | `1 / 0 / 0` | `8.136s` | `$0.020` | `$0.040` | MP3 delivery smoke only | `100%` timestamp coverage, no manual listening | Provider execution proof, not full UX readiness |
| `live-smoke-inworld-rafael-es-20260425-085002` | Inworld | ES 32-minute retrospective | `1920.653s` | not retained | unknown | about `$1.43-$1.44` TTS-only estimate | about `$0.045` TTS-only | provider-native MP3 retained; WAV derivative is packaging-only | no word timings, SRT/VTT, or metrics retained | Audio smoke passed with warnings, product readiness blocked by missing evidence |

## Decision

Decision: `continue_cartesia_as_second_provider_benchmark`.

Use the user's option: `继续把 Cartesia 当 second-provider benchmark`.

Reasoning:

1. Cartesia medium now has bilingual same-packet evidence with no retries, fast completion, acceptable format posture, accepted listening, and warning-level timing checks.
2. The partial timestamp coverage warning is acceptable for this scoped benchmark because the spot checks did not find material drift or invalid cue timing.
3. ES speed is a voice-choice risk, not enough evidence to justify changing pacing or voice now.
4. Inworld remains the primary implementation path because the current evidence set has stronger long-form proof and existing product truth still names Inworld first.
5. A Cartesia continuation/WebSocket lane is not justified yet. Open it only if the team decides to test Cartesia's strongest long-form mode or if future medium/long evidence shows SSE-style chunking is structurally limiting.

## No Canonical Backfill

No canonical pricing, packaging, language-boundary, or lifecycle document update is required from this closeout.

The observed Cartesia medium costs fit the existing second-provider scenario posture. This closeout does not change public pricing, included minutes, EN plus ES boundary, SRT export scope, user-facing WAV export scope, provider priority, or public rollout promises.

## Verification Receipts

- `jq empty` passed for `final-evaluation.json`, `run-summary.json`, `large-artifact-manifest.json`, and EN / ES `word-timings.json`.
- Promoted `docs/` artifact hashes in `hashes.sha256` verified with `LC_ALL=C LANG=C shasum -a 256 -c -`.
- `ffprobe` on promoted EN / ES `final.mp3` confirmed MP3, 48 kHz, mono, `192000` bps stream bitrate, and durations matching metrics.
- Ignored raw PCM chunks listed in `hashes.sha256` are not present in this worktree; this is expected because raw PCM masters are manifest-only retained outside Git.
