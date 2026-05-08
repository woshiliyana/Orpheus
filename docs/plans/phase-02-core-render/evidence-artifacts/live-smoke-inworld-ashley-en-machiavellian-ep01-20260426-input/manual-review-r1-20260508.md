# Inworld Ashley EN Manual Review R1

> Status: review kit prepared; listening verdict pending
> Role: UX gate review entry for retained English pressure audio
> Normative for product rules: no
> Canonical owner: Delivery owner + engineering lead
> Depends on: `manual-review-20260428.md`, `splice-report.json`, `audio-probe-metadata.json`, `final-evaluation.json`
> Provider calls: none
> Last reviewed: 2026-05-08

## Purpose

Prepare the next product-gate review for the retained English over-30 pressure sample without paying for another provider run.

This review is intentionally stricter than a technical smoke. The question is not only whether audio exists. The question is whether a creator could trust the narration experience enough to keep using the workflow after a long listen.

## Source Evidence

| Field | Value |
|---|---|
| Evidence packet | `live-smoke-inworld-ashley-en-machiavellian-ep01-20260426-input` |
| Provider / voice / language | `Inworld` / `Ashley` / `en` |
| Final duration | `2170.48s` / `36:10.48` |
| Chunks / stitches / retries | `21` chunks / `20` stitches / `3` retries |
| Delivery candidate | `final.derived-from-provider-wav.mp3` |
| Production master candidate | `final.wav` |
| Current product-readiness verdict | `blocked_by_missing_evidence` |

## Local Review Kit

The review clips were generated from the retained delivery MP3 and kept under ignored local output:

```text
runs/manual-review/phase2-inworld-en-manual-review-r1-20260508/
```

The clips are not tracked in Git. Their hashes are recorded here so the local review target is auditable.

| Clip | Start | Duration | Review focus | Bytes | SHA-256 |
|---|---:|---:|---|---:|---|
| `opening-context.mp3` | `00:00.00` | `75s` | persona, first-impression phrasing, early fatigue risk | `1801196` | `38adb4946d1549544446b1f29d7eeb22152dc517fbf89ff0c7627a73555c9f39` |
| `stitch-01-0151-58.mp3` | `01:47.58` | `10s` | stitch boundary | `241388` | `26f0412545465e26d49dc3e88d0976f26a9b7472d3e03593f58c996b143a4443` |
| `stitch-02-0331-14.mp3` | `03:27.14` | `10s` | stitch boundary | `241388` | `42e056f5aa39f1e9d55331569daf5246ef9823a07cfca04a65176bc2f3d0bc7d` |
| `stitch-03-0520-28.mp3` | `05:16.28` | `10s` | stitch boundary plus timing spot | `241388` | `83a3df861a976aa3036dad32c9a7348df9c6d52ab589b7f9f450bec765c76b5d` |
| `stitch-05-0857-72.mp3` | `08:53.72` | `10s` | stitch boundary | `241388` | `06b49de632fadfde3c9e180cb6eb7a79ab9c8cccd0827fe234900cbd2257ec24` |
| `stitch-10-1756-98.mp3` | `17:52.98` | `10s` | stitch boundary | `241388` | `2f2c370f401bcd97821779e98f181b333d1a23ea7562e7b3918e2e1b0b41430c` |
| `timing-mid-2000.mp3` | `19:54.00` | `16s` | subtitle timing and text-fidelity spot | `385388` | `ca2c31b9f1f2125bdb84e9aeed02a99a59fde2aa2e7c208251405f9fc5ac6f1b` |
| `stitch-12-2127-60.mp3` | `21:23.60` | `10s` | stitch boundary | `241388` | `f2a04e8810adfb0a2dd6cd0e3af4c35c920f29be3f462b05d8b2806115b35235` |
| `stitch-14-2502-10.mp3` | `24:58.10` | `10s` | stitch boundary | `241388` | `6d26a15d4493a651ada8f92f63091c24cff063cf940da7bb3d848a51c8aaa6ba` |
| `stitch-17-3010-36.mp3` | `30:06.36` | `10s` | stitch boundary | `241388` | `61ff5752d77f70fe79c7ff69c3ec0e1d6e09d69603d80afac3c83befff074623` |
| `stitch-19-3331-24.mp3` | `33:27.24` | `10s` | stitch boundary | `241388` | `2c7aab1c5ddf7de1fd5a434992e2baa5050491f4e1437c67e87e9efb696b1e9c` |
| `timing-late-3400.mp3` | `33:56.00` | `16s` | late timing and text-fidelity spot | `385388` | `89f10d2e897697917a58682dc4d64e80aab3d2b2238c89fcd2b0bc5b55acf956` |
| `stitch-20-3517-94.mp3` | `35:13.94` | `10s` | stitch boundary | `241388` | `ce5afdbc15aee5a418c82059aa5f79213c4ea2008384e990d2ef70a87cacb906` |
| `closing-fatigue.mp3` | `35:30.00` | `40s` | late fatigue, closing delivery, retention risk | `961388` | `0eaaa41e2670741679bde37b6b44b8ce692bbc468ebe31ee231ba232bb38165c` |

## Review Questions

| Dimension | Pass threshold | Record as blocked if |
|---|---|---|
| `perceptual_quality` | Voice remains clear, credible, and non-distracting across opening, middle, and late clips. | Robotic artifacts, distortion, severe monotony, or obvious fatigue would make a creator abandon the run. |
| `voice_persona_fit` | The voice feels credible for English educational-explainer narration, even if not the final brand voice. | The voice feels materially wrong for the target niche or undermines trust. |
| `stitch_quality` | No clipped words, repeated phrases, abrupt tone shifts, or unnatural silence around sampled joins. | Any sampled boundary has a material defect a listener would notice without being told where the join is. |
| `text_fidelity` | Spoken content follows the source closely enough for internal evidence. | Skipped sections, repeated paragraphs, hallucinated lines, or meaning-changing substitutions are detected. |
| `pronunciation_control` | Names, numerals, and key terms are understandable and not repeatedly distracting. | Repeated pronunciation or emphasis errors damage comprehension or trust. |
| `subtitle_timing_readiness` | Internal timing appears close enough to keep subtitle-ready timing work alive. | Spot checks show drift or cue mismatch that would block subtitle-readiness claims. |
| `format_delivery` | MP3 delivery is acceptable for listening and does not introduce obvious encoding artifacts. | MP3 artifacts or playback issues are audible enough to require delivery-format rework. |

## Current Decision

`manual_review_kit_prepared=true`

`manual_review_completed=false`

`provider_call_needed=false`

`next_action=founder_listen_and_record_verdict`

No public pricing, public `SRT`, trial, provider-primary, or language-promise change is supported by this review kit. The product-readiness verdict remains `blocked_by_missing_evidence` until a real listening verdict is recorded.
