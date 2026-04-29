# MVP Flagship Voice Design

> Status: draft for user review
> Scope: design only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-28

## Decision

MVP should not launch broad user voice cloning. The near-term voice strategy is a controlled platform flagship voice library:

1. Use the founder-selected English and Spanish reference samples as internal voice-fit targets.
2. Build toward one English and one Spanish mature, steady, educational-explainer flagship voice.
3. Prefer Inworld Voice Design first for creating platform-owned voice candidates from written descriptions and short scripts.
4. Treat Inworld Voice Cloning as an optional platform-controlled fallback only after rights proof, sample preparation, and manual review are explicit.
5. Keep user-submitted clone creation out of MVP.

This is a staged voice-library decision, not a public clone promise and not a launch-readiness claim.

## Reference Samples

The samples have been copied into the repo as internal reference artifacts:

| Language | Repo path | Original source path | Duration | Format | SHA-256 |
|---|---|---|---:|---|---|
| English | `docs/plans/phase-02-core-render/reference-voices/en-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/英语/英语.wav` | `26.496s` | PCM WAV, 16-bit, stereo, 48kHz | `83c58fd3d666863a7ed252176a1a6d248f381e8b3c241dcf3bcdb1bfc0defde9` |
| Spanish | `docs/plans/phase-02-core-render/reference-voices/es-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/西班牙语-备选.wav` | `28.565s` | PCM WAV, 16-bit, stereo, 48kHz | `9f5d3c43ca5fc1649f5d116183518a2be0ef5bd95a2b4dbcf47d52a418cb3eca` |

These files are reference samples for founder review and voice-fit comparison. They are not yet rights-cleared clone-source assets, public product assets, or final provider inputs.

## Inworld Capability Readout

Current official Inworld documentation supports two relevant ways to expand the voice library:

1. Voice Design can create a new custom voice from a text description and a script, returning up to three previews for review. Designed voices can be saved to the voice library and then used through their `voiceId`. Inworld currently labels Voice Design as a research preview.
2. Voice Cloning can create a personalized clone from audio. Instant cloning can use short audio through Portal/API, while professional cloning requires more audio and sales access. Official docs describe Portal upload as one `wav`, `mp3`, or `webm` file up to `4MB`, with longer samples trimmed to `15s`; the copied reference WAVs are longer and larger than that direct-upload path's best-fit input and would need derivative sample prep before any clone attempt.

Implication: Inworld can plausibly expand our voice library, but the MVP-safe path is platform-controlled Voice Design plus manual review, not user-facing clone upload.

Primary references checked on 2026-04-28:

1. Inworld Voice Design: `https://docs.inworld.ai/tts/voice-design`
2. Inworld Voice Cloning: `https://docs.inworld.ai/tts/voice-cloning`

## Product Boundary

| Area | Decision |
|---|---|
| Public clone feature | Hold for MVP. |
| User uploads | Do not expose. |
| Platform flagship voices | Continue. |
| EN target | Mature, steady, male-presenting educational explainer. |
| ES target | Mature, steady Spanish educational explainer using the provided Spanish reference as the review target. |
| Existing Ashley evidence | Still valid for pipeline evidence, not final EN persona fit. |
| Public pricing / launch copy | No change. |
| Long-form provider run | Hold until a short voice-fit candidate is accepted. |

This preserves the existing product truth: private clone remains controlled and later-stage; public self-serve clone is not part of the first gate.

## Candidate Workflow

1. Prepare concise EN and ES voice descriptions from the two reference samples.
2. Prepare one short representative script per language, tuned for 5-15 seconds of audio.
3. Use Inworld Voice Design to generate up to three candidate previews per language.
4. Founder reviews short previews against the reference samples.
5. Promote at most one candidate per language to the Phase 2 voice shortlist.
6. Only after a short candidate passes, consider a medium-length sample.
7. Only after medium-length voice fit passes, consider another long-form provider run.

If Voice Design cannot produce a fit, fallback order is:

1. Re-check current Inworld catalog for existing male/mature EN and ES voices.
2. Consider platform-controlled instant clone only if rights proof is explicit and source audio is prepared into compliant short samples.
3. Keep Cartesia or other second-provider options as benchmark pressure, not as a primary flip.

## Review Rubric

| Dimension | Pass |
|---|---|
| Persona fit | Mature, calm, credible, steady, not youthful or promotional. |
| Long-form tolerance | Sounds plausible for 20-40 minutes without fatigue. |
| Language fit | EN and ES each sound natural in the target language; no distracting accent or pronunciation issue. |
| Script fit | Handles psychology / dark psychology explainer phrasing without theatrical overreach. |
| Provider fit | Usable through backend-owned provider flow and stable enough to become a catalog candidate. |
| Rights posture | Any clone-derived candidate has recorded source and rights proof before becoming usable. |

## Non-Goals

1. No user-facing clone upload.
2. No public promise that clone is available.
3. No new provider call in this design lane.
4. No runtime schema, API, adapter, pricing, or entitlement change.
5. No claim that either reference sample is already licensed for commercial cloning.
6. No long-form rerun until short voice-fit samples pass manual review.

## Open Follow-Up

The next implementation plan should be narrow:

1. Create a Phase 2 voice reference packet that indexes the two copied WAV files.
2. Draft EN and ES Voice Design prompts and short scripts.
3. Add a manual-review worksheet for short candidate samples.
4. Stop before any provider call unless the user explicitly approves the paid/hosted generation step.
