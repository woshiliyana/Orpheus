# MVP Flagship Voice Design

> Status: draft for user review
> Scope: design only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-28

## Decision

MVP should build a controlled platform-owned flagship voice mechanism based on prompt-generated voice design. This is not voice cloning, does not use user uploads, and does not use the reference WAV files as clone inputs.

The near-term voice strategy is:

1. Use the founder-selected English and Spanish reference samples as internal voice-fit targets.
2. Preserve original reference audio unchanged so future providers can be evaluated against the same founder taste references without losing the source.
3. Build toward one English and one Spanish mature, steady, educational-explainer flagship voice.
4. Use Inworld Voice Design: write a text description and short script, generate previews, select, publish, and use the resulting `voiceId`.
5. Keep both user-submitted clone creation and platform audio-clone creation out of this MVP mechanism.

This is a staged platform voice-library decision, not a clone promise and not a launch-readiness claim.

## Reference Samples

The samples have been copied into the repo as internal reference artifacts:

| Language | Repo path | Original source path | Duration | Format | SHA-256 |
|---|---|---|---:|---|---|
| English | `docs/plans/phase-02-core-render/reference-voices/originals/en-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/英语/英语.wav` | `26.496s` | PCM WAV, 16-bit, stereo, 48kHz | `83c58fd3d666863a7ed252176a1a6d248f381e8b3c241dcf3bcdb1bfc0defde9` |
| Spanish | `docs/plans/phase-02-core-render/reference-voices/originals/es-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/西班牙语-备选.wav` | `28.565s` | PCM WAV, 16-bit, stereo, 48kHz | `9f5d3c43ca5fc1649f5d116183518a2be0ef5bd95a2b4dbcf47d52a418cb3eca` |

These files are reference samples for founder review and voice-fit comparison. They are not clone-source assets, public product assets, or final provider inputs in this lane. Provider-specific prompt packs or optional future derivatives must not overwrite these originals.

## Inworld Capability Readout

Current official Inworld documentation supports the intended prompt-generated voice-library path:

1. Voice Design can create a new custom voice from a text description and a script, returning up to three previews for review. Designed voices can be saved to the voice library and then used through their `voiceId`. Inworld currently labels Voice Design as a research preview.
2. The script should be short enough to shape a preview, and the generated preview can be published into the voice library.
3. Voice Cloning is a separate audio-input capability. It is not the intended MVP mechanism in this packet.

Implication: Inworld can plausibly expand our voice library through prompt-generated Voice Design. The MVP-safe path is platform-controlled prompts, preview review, publishing selected voices, and no user-facing clone upload.

Primary references checked on 2026-04-28:

1. Inworld Voice Design: `https://docs.inworld.ai/tts/voice-design`
2. Inworld Voice Cloning: `https://docs.inworld.ai/tts/voice-cloning`
3. Inworld Service Specific Terms: `https://inworld.ai/service-specific-terms`
4. Inworld Terms of Service: `https://inworld.ai/terms`
5. Inworld Acceptable Use Policy: `https://inworld.ai/aup/`

## Commercial Rights Readout

This section is an implementation guardrail, not legal advice.

Inworld Voice Design is a text-prompt voice generation feature, not an audio clone. Inworld's terms state that, as between the customer and Inworld, the customer retains rights in input and output, subject to the agreement and acceptable use rules. The Terms and Service Specific Terms still put the burden on us to ensure our inputs, actions, and resulting use do not violate laws, third-party rights, or Inworld's acceptable-use rules.

Operational meaning for Orpheus:

1. Commercial use is plausible for prompt-generated platform voices when we comply with provider terms and acceptable-use rules.
2. The risk is lower than audio cloning because no source speaker recording is used as model input.
3. Do not prompt for celebrity, creator, actor, narrator, marketplace, or brand soundalikes.
4. Do not write prompts that imply impersonation, deception, biometric identity, or "sounds like [real person]."
5. Do not market a generated voice as a real speaker.
6. Generated voices may not be exclusive or guaranteed unique unless a provider contract explicitly says so.
7. Any prompt-generated flagship voice must carry provenance before it can move from internal candidate to user-selectable catalog voice.

## Prompt Provenance Gate

Before a prompt-generated voice can become a user-selectable platform voice, record:

1. Provider and feature, for example `Inworld Voice Design`.
2. Provider documentation and terms URLs plus review date.
3. Voice description prompt.
4. Preview script.
5. Language and intended YouTube niche.
6. Generated preview IDs or artifact references.
7. Published provider `voiceId`, if selected.
8. Human reviewer and review verdict.
9. Confirmation that the prompt does not request a real-person, celebrity, brand, or marketplace soundalike.
10. Commercial-status field for the future `voice_assets` / `voices` catalog record.

The founder reference WAV files remain `reference_only` taste anchors. They may inform prompt wording and human review, but they are not provider cloning inputs in this mechanism.

## Asset Handling Model

| Asset layer | Purpose | Rule |
|---|---|---|
| `originals/` | Immutable founder-provided source audio | Never overwrite; use hashes for identity. |
| `provider-prep/<provider>/` | Provider-specific prompt packs, preview scripts, or optional future derivatives | Keep provider constraints separate; never overwrite originals. |
| `candidate-previews/` | Provider-generated short samples | Store only after an approved provider call lane. |
| `provenance/` | Prompt, script, provider, terms, review, and catalog metadata | Store enough to explain where each platform voice came from. |

The current repo lane only stores originals and documentation. It does not create provider prompt packs, provider derivatives, or candidate previews.

## Product Boundary

| Area | Decision |
|---|---|
| Public clone feature | Hold for MVP. |
| User uploads | Do not expose. |
| Platform flagship voices | Continue. |
| Prompt-generated platform voice mechanism | Allow as internal flagship-library capability. |
| Platform audio-clone mechanism | Hold; not this MVP mechanism. |
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
6. Publish the selected preview to the provider voice library only after the prompt provenance gate clears.
7. Only after a short candidate passes, consider a medium-length sample.
8. Only after medium-length voice fit passes, consider another long-form provider run.

If Voice Design cannot produce a fit, fallback order is:

1. Re-check current Inworld catalog for existing male/mature EN and ES voices.
2. Iterate the prompt and preview script.
3. Check another provider's prompt-generated voice-design path if needed.
4. Keep audio cloning as a separate later lane only if explicitly approved.

## Review Rubric

| Dimension | Pass |
|---|---|
| Persona fit | Mature, calm, credible, steady, not youthful or promotional. |
| Long-form tolerance | Sounds plausible for 20-40 minutes without fatigue. |
| Language fit | EN and ES each sound natural in the target language; no distracting accent or pronunciation issue. |
| Script fit | Handles psychology / dark psychology explainer phrasing without theatrical overreach. |
| Provider fit | Usable through backend-owned provider flow and stable enough to become a catalog candidate. |
| Provenance posture | Prompt, script, provider terms, generated preview, selected `voiceId`, and review verdict are recorded. |

## Non-Goals

1. No user-facing clone upload.
2. No platform audio cloning in this MVP mechanism.
3. No new provider call in this design lane.
4. No runtime schema, API, adapter, pricing, or entitlement change.
5. No provider-specific prompt-pack or derivative generation in this design lane.
6. No claim that prompt-generated voices are exclusive unless a provider contract says so.
7. No long-form rerun until short voice-fit samples pass manual review.

## Open Follow-Up

The next implementation plan should be narrow:

1. Create a Phase 2 platform-voice-library packet that indexes the two copied originals.
2. Add prompt-provenance checklist and status fields before any generated voice becomes selectable.
3. Add provider-prep rules that preserve originals and produce provider-specific prompt packs.
4. Draft EN and ES Voice Design prompts and short scripts.
5. Add a manual-review worksheet for short candidate samples.
6. Stop before any provider call unless the user explicitly approves the paid/hosted generation step.
