# MVP Flagship Voice Design

> Status: draft for user review
> Scope: design only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-28

## Decision

MVP should build a controlled platform-owned flagship voice mechanism. This is not broad user voice cloning and does not expose user uploads.

The near-term voice strategy is:

1. Use the founder-selected English and Spanish reference samples as internal voice-fit targets.
2. Preserve original reference audio unchanged so future providers can receive provider-specific derivatives without losing the source.
3. Build toward one English and one Spanish mature, steady, educational-explainer flagship voice.
4. Prefer Inworld Voice Design when a written description is enough.
5. Use Inworld Voice Cloning when we have clear rights to the source voice and want to create a platform-owned flagship clone voice.
6. Keep user-submitted clone creation out of MVP.

This is a staged platform voice-library decision, not a public clone promise and not a launch-readiness claim.

## Reference Samples

The samples have been copied into the repo as internal reference artifacts:

| Language | Repo path | Original source path | Duration | Format | SHA-256 |
|---|---|---|---:|---|---|
| English | `docs/plans/phase-02-core-render/reference-voices/originals/en-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/英语/英语.wav` | `26.496s` | PCM WAV, 16-bit, stereo, 48kHz | `83c58fd3d666863a7ed252176a1a6d248f381e8b3c241dcf3bcdb1bfc0defde9` |
| Spanish | `docs/plans/phase-02-core-render/reference-voices/originals/es-mature-steady-male-reference.wav` | `/Volumes/woshiliyana/黑暗心理学频道/参考配音/西班牙语-备选.wav` | `28.565s` | PCM WAV, 16-bit, stereo, 48kHz | `9f5d3c43ca5fc1649f5d116183518a2be0ef5bd95a2b4dbcf47d52a418cb3eca` |

These files are reference samples for founder review and voice-fit comparison. They are not yet rights-cleared clone-source assets, public product assets, or final provider inputs. Provider-specific clips must be generated as derivatives and must not overwrite these originals.

## Inworld Capability Readout

Current official Inworld documentation supports two relevant ways to expand the voice library:

1. Voice Design can create a new custom voice from a text description and a script, returning up to three previews for review. Designed voices can be saved to the voice library and then used through their `voiceId`. Inworld currently labels Voice Design as a research preview.
2. Voice Cloning can create a personalized clone from audio. Instant cloning can use short audio through Portal/API, while professional cloning requires more audio and sales access. Official docs describe Portal upload as one `wav`, `mp3`, or `webm` file up to `4MB`, with longer samples trimmed to `15s`; the copied reference WAVs are longer and larger than that direct-upload path's best-fit input and would need derivative sample prep before any clone attempt.

Implication: Inworld can plausibly expand our voice library. The MVP-safe path is platform-controlled Voice Design and platform-controlled Voice Cloning with rights proof, manual review, and no user-facing clone upload.

Primary references checked on 2026-04-28:

1. Inworld Voice Design: `https://docs.inworld.ai/tts/voice-design`
2. Inworld Voice Cloning: `https://docs.inworld.ai/tts/voice-cloning`
3. Inworld Service Specific Terms: `https://inworld.ai/service-specific-terms`
4. Inworld Terms of Service: `https://inworld.ai/terms`
5. Inworld Acceptable Use Policy: `https://inworld.ai/aup/`

## Commercial Rights Readout

This section is an implementation guardrail, not legal advice.

The current Inworld public FAQ says cloned voices can be used commercially if the customer confirms they have the rights to clone the voice. The Terms and Service Specific Terms put the rights burden on us: we must have the rights, licenses, and permissions for all inputs, and Inworld's use of the content and user voice models must not violate anyone's rights. Inworld's terms also state that, as between the customer and Inworld, the customer retains rights in output, subject to the agreement and acceptable use rules.

Operational meaning for Orpheus:

1. Commercial use is plausible for platform-owned clone voices when the source voice is rights-cleared.
2. The legal risk is not mainly "does Inworld allow commercial output"; the risk is "do we have consent and sufficient license from the voice source."
3. Do not clone celebrity, creator, actor, narrator, or marketplace voices unless we have explicit written rights.
4. Do not build a voice or biometric recognition database from third-party voices without consent.
5. Do not market a cloned voice as the real speaker, or create impersonation risk.
6. Any clone-derived flagship voice must carry a rights proof reference before it can move from internal candidate to user-selectable catalog voice.

## Rights Gate

Before using any reference audio for platform cloning, record:

1. Source owner and speaker identity or voice-talent identity.
2. Written permission to use the recording as input to a voice-cloning provider.
3. Written permission to create derivative synthetic voice models.
4. Written permission to use generated synthetic audio commercially inside Orpheus and downstream creator exports.
5. Allowed languages, territories, duration, exclusivity, revocation terms, and resale/sublicense limits.
6. Permission to process the source audio with each provider used.
7. Confirmation that the recording contains no third-party copyrighted background music, effects, or other voices.
8. A stored rights-proof reference for the future `voice_assets.rights_proof_ref`.

If these are not recorded, the asset remains `reference_only` and may be used for human comparison or Voice Design prompting, but not for cloning.

## Asset Handling Model

| Asset layer | Purpose | Rule |
|---|---|---|
| `originals/` | Immutable founder-provided source audio | Never overwrite; use hashes for identity. |
| `provider-prep/<provider>/` | Provider-specific trimmed, mono, normalized, or transcript-aligned derivatives | Derive from originals; record tool settings and hashes. |
| `candidate-previews/` | Provider-generated short samples | Store only after an approved provider call lane. |
| `rights-proof/` | Contracts, release notes, or license references | Do not store sensitive legal documents in public repo unless explicitly approved; store references or private-path pointers instead. |

The current repo lane only stores originals and documentation. It does not create provider derivatives or candidate previews.

## Product Boundary

| Area | Decision |
|---|---|
| Public clone feature | Hold for MVP. |
| User uploads | Do not expose. |
| Platform flagship voices | Continue. |
| Platform-owned clone mechanism | Allow as internal capability after rights gate. |
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
6. If Voice Design cannot reach the reference target and rights proof exists, prepare provider-specific clone derivatives from the original files.
7. Use Inworld Voice Cloning for platform-owned clone candidates only after the rights gate clears.
8. Only after a short candidate passes, consider a medium-length sample.
9. Only after medium-length voice fit passes, consider another long-form provider run.

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
5. No provider-specific derivative clip generation in this design lane.
6. No claim that either reference sample is already licensed for commercial cloning.
7. No long-form rerun until short voice-fit samples pass manual review.

## Open Follow-Up

The next implementation plan should be narrow:

1. Create a Phase 2 platform-voice-library packet that indexes the two copied originals.
2. Add a rights-gate checklist and status field before any cloning use.
3. Add provider-prep rules that preserve originals and produce provider-specific derivatives.
4. Draft EN and ES Voice Design prompts and short scripts.
5. Add a manual-review worksheet for short candidate samples.
6. Stop before any provider call unless the user explicitly approves the paid/hosted generation step.
