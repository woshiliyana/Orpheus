# MVP Flagship Voice Design

> Status: draft for user review
> Scope: design only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-29

## Decision

MVP should build a controlled platform-designed flagship voice mechanism based on prompt-generated voice design. This is not voice cloning, does not use user uploads, and does not use the reference WAV files as clone inputs.

The near-term voice strategy is:

1. Use the founder-selected English and Spanish reference samples as internal voice-fit targets.
2. Preserve original reference audio unchanged so future providers can be evaluated against the same founder taste references without losing the source.
3. Build toward one English and one Spanish mature, steady, educational-explainer flagship voice.
4. Use Inworld Voice Design: write a text description and short script, generate previews, select, publish, and use the resulting `voiceId`.
5. Keep both user-submitted clone creation and platform audio-clone creation out of this MVP mechanism.

This is a staged platform voice-library decision, not a clone promise, not a launch-readiness claim, and not a permanent provider-rights claim.

The user-facing selector boundary is now explicit: users may choose an entitled narration voice for generation, but they do not download, own, export, or receive the underlying voice, prompt, provider `voiceId`, model, or clone/source asset. The downloadable user asset is generated audio for an entitled project.

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

Primary references checked on 2026-04-29:

1. Inworld Voice Design: `https://docs.inworld.ai/tts/voice-design`
2. Inworld Voice Cloning: `https://docs.inworld.ai/tts/voice-cloning`
3. Inworld Service Specific Terms: `https://inworld.ai/service-specific-terms`
4. Inworld Terms of Service: `https://inworld.ai/terms`
5. Inworld Acceptable Use Policy: `https://inworld.ai/aup/`
6. ElevenLabs Voice Design: `https://elevenlabs.io/docs/eleven-creative/voices/voice-design`
7. ElevenLabs commercial-use help: `https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform`
8. ElevenLabs AI-generated voice sharing help: `https://help.elevenlabs.io/hc/en-us/articles/30192704002321-Can-I-share-an-AI-generated-voice-in-the-Voice-Library`
9. ElevenLabs Prohibited Use Policy: `https://elevenlabs.io/use-policy`
10. Murf commercial-rights help: `https://help.murf.ai/do-i-have-commercial-rights-over-the-voice-over-created`

## Commercial Rights Readout

This section is an implementation guardrail, not legal advice.

Inworld Voice Design is a text-prompt voice generation feature, not an audio clone. Inworld's terms state that, as between the customer and Inworld, the customer retains rights in input and output, subject to the agreement and acceptable use rules. The Terms and Service Specific Terms still put the burden on us to ensure our inputs, actions, and resulting use do not violate laws, third-party rights, or Inworld's acceptable-use rules.

The rights gap is now narrower and more explicit:

1. Rendered audio and a provider-hosted `voiceId` are different assets.
2. A provider may allow commercial use of generated audio while still limiting account access, reusable voice IDs, marketplace sharing, B2B2C distribution, or post-termination use.
3. Inworld's public Voice Design page presents designed voices as reusable published voice IDs, but Inworld Terms also include termination language requiring deletion of Outputs. Treat Inworld-designed voices as `supplier_confirmation_required` before using them as permanent platform assets.
4. ElevenLabs' public commercial-use help is clearer for paid-plan rendered content and says paid-subscription content can be used commercially and indefinitely when generated during the paid period and used within terms. ElevenLabs still restricts unauthorized impersonation, public Voice Library sharing of AI-generated voices, and less-restrictive downstream B2B2C terms.
5. Market pages from Murf and smaller creator-facing TTS tools confirm that commercial AI voiceover licensing is common, but they do not prove Orpheus' rights under any specific provider.

Operational meaning for Orpheus:

1. Commercial use is plausible for prompt-generated platform voices when we comply with provider terms and acceptable-use rules.
2. The risk is lower than audio cloning because no source speaker recording is used as model input.
3. Do not prompt for celebrity, creator, actor, narrator, marketplace, or brand soundalikes.
4. Do not write prompts that imply impersonation, deception, biometric identity, or "sounds like [real person]."
5. Do not market a generated voice as a real speaker.
6. Generated voices may not be exclusive or guaranteed unique unless a provider contract explicitly says so.
7. Any prompt-generated flagship voice must carry provenance before it can move from internal candidate to user-selectable catalog voice.
8. Any provider-hosted `voiceId` must carry an explicit post-cancel / post-termination status before it is treated as a durable product dependency.

The detailed closeout is recorded in [`12-platform-voice-design-rights-and-provenance-2026-04-29.md`](../../plans/phase-02-core-render/12-platform-voice-design-rights-and-provenance-2026-04-29.md). The supplier-confirmation packet and outreach copy are recorded in [`13-voice-supplier-confirmation-2026-04-29.md`](../../plans/phase-02-core-render/13-voice-supplier-confirmation-2026-04-29.md).

The product entitlement and selector boundary is recorded in [`14-voice-selector-output-license-positioning-2026-04-29.md`](../../plans/phase-02-core-render/14-voice-selector-output-license-positioning-2026-04-29.md).

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
11. Whether rendered audio remains usable after subscription cancellation.
12. Whether the provider-hosted `voiceId` remains callable after subscription cancellation.
13. Whether the use is allowed inside a B2B2C SaaS product where Orpheus users select the voice.
14. Whether standalone sample-pack, voice-pack, resale, or model-training uses are prohibited.

The founder reference WAV files remain `reference_only` taste anchors. They may inform prompt wording and human review, but they are not provider cloning inputs in this mechanism.

## Prompt Safety Policy

Prompt-designed Orpheus voices must describe qualities, not identities.

Allowed prompt attributes:

1. Age range, perceived maturity, gender presentation, language or dialect target.
2. Pitch, pace, timbre, clarity, steadiness, warmth, authority, calmness.
3. Use case, such as documentary explainer, psychology narration, podcast host, or educational voice.
4. Audio quality target, such as broadcast quality or clean studio signal.

Disallowed prompt attributes:

1. Celebrity, creator, narrator, actor, political figure, public figure, brand, or marketplace-voice references.
2. Phrases such as `sounds like X`, `close to X`, `same as X`, `clone of X`, or `in the style of X` when `X` is a real person, brand, or proprietary voice.
3. Voice names or descriptions that imply a real person endorsed, performed, or owns the generated voice.
4. Prompts intended to deceive listeners into believing the audio is a real human speaker.
5. Prompts that create voice or biometric recognition assets, impersonation, scams, political persuasion, or high-risk regulated uses.

## Documentation-Only Candidate Statuses

These statuses are planning labels for provider-prep packets. They are not runtime enums and do not update `voice-metadata-schema.md`.

| Status | Meaning |
|---|---|
| `draft_prompt` | Prompt and script are drafted but no provider call has happened. |
| `preview_generated` | Provider previews exist and local preview evidence is retained. |
| `rights_pending` | Quality may be promising, but provider rights, B2B2C, or post-cancel terms are unresolved. |
| `voice_fit_review` | Founder/operator review is evaluating persona, language, pacing, and fatigue risk. |
| `catalog_candidate` | Candidate can be wired into internal catalog planning. |
| `active_internal` | Candidate can be used for internal tests or controlled smoke runs. |
| `active_user_selectable` | Candidate can appear in the product voice picker only after a separate runtime/catalog truth lane. |
| `retired` | Candidate is no longer offered but retained for audit history. |
| `blocked` | Candidate cannot proceed without new evidence or rights review. |

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
| Prompt-designed voice rights | Require provider-specific provenance and supplier confirmation before user-selectable catalog use. |
| User voice selector | Allow as generation control only; do not expose underlying provider voice assets to users. |
| User downloadable asset | Generated audio only, with full long-form download gated to paid long-form member entitlement. |
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
6. Publish the selected preview only to the provider account/workspace voice library, not a public marketplace, and only after the prompt provenance gate clears.
7. Keep the candidate at `rights_pending` until B2B2C, post-cancel audio, and post-cancel `voiceId` questions are resolved.
8. Only after a short candidate passes, consider a medium-length sample.
9. Only after medium-length voice fit passes, consider another long-form provider run.

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
8. No claim that a provider-hosted `voiceId` remains callable after cancellation unless the provider confirms it.
9. No claim that users can download, own, export, or resell Orpheus platform voices.

## Open Follow-Up

The next implementation plan should be narrow:

1. Send supplier-confirmation questions to Inworld first and ElevenLabs second.
2. Retain written answers beside the provider-prep packet.
3. Draft EN and ES Voice Design prompt packs with no real-person soundalike language only after the supplier-confirmation package is accepted.
4. Keep all candidates at `draft_prompt`.
5. Stop before any provider call unless the user explicitly approves the paid/hosted generation step.
