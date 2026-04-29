# Voice Selector Output-License Positioning

> Status: decision packet
> Scope: product boundary / entitlement sync / compliance wording
> Runtime changes: none
> Provider calls: none
> Public pricing changes: none
> Last reviewed: 2026-04-29

## Decision

Orpheus can expose voice choice to users as a generation control, but it must not sell, transfer, or let users download the underlying voice.

Final decision values:

1. `voice_selector_model=platform_voice_choice_for_generation_only`
2. `downloaded_user_asset=generated_longform_audio_only`
3. `underlying_voice_asset_download=blocked`
4. `provider_voice_id_exposure=backend_only`
5. `longform_download_entitlement=longform_paid_member_only`
6. `guest_free_longform_download=blocked`
7. `short_trial_or_preview_takeaway=allowed_later_if_bounded`
8. `public_voice_claim=curated_narration_voices_not_clones`

This packet is a product boundary and entitlement sync. It is not a new supplier-rights clearance, pricing launch, provider call, or runtime catalog schema change.

## Product Model

The user-facing flow should be:

1. User uploads or pastes a script.
2. User chooses an entitled narration voice in the Orpheus voice selector.
3. Orpheus uses backend-owned provider credentials, provider voice IDs, orchestration, and storage to render audio.
4. If the user is a long-form paid member, Orpheus exposes the generated long-form audio file for download.
5. Orpheus never exposes the provider `voiceId`, prompt pack, voice model, clone source, voice asset, or reusable voice file as a downloadable user asset.

The phrase "download voice" is therefore blocked. The correct phrase is "download generated audio" or "download generated long-form narration."

## Asset Boundary

| Layer | Product role | User can choose? | User can download? | Notes |
|---|---|---:|---:|---|
| Platform voice catalog entry | Orpheus record that makes a voice selectable | Yes, if entitled | No | This is a product option, not an asset sale. |
| Provider-hosted `voiceId` | Backend configuration used for synthesis | No direct access | No | Stored and called server-side only. |
| Voice prompt / preview script | Provenance and generation input for prompt-designed voices | No | No | Retained for audit and provider-prep, not exposed as user property. |
| Preview sample | Short candidate or product audition audio | Possibly playable | No by default | A preview is for auditioning, not a license to reuse the voice. |
| Generated short trial audio | Bounded guest/free output, if later enabled | Yes, within limits | Maybe | Must remain short and risk-bounded. |
| Generated long-form audio | Final narration output for an entitled project | Yes | Yes, for paid long-form members | This is the deliverable. |
| Provider-native production master | Internal lossless asset retained by Orpheus | No | No | Used for QA, derivatives, and later export decisions. |
| Optional `WAV` derivative | Future higher-fidelity user export | No until verdict | Held | Requires `audio_format_verdict=ready_for_export`. |

## Entitlement Readout

`capability-entitlements.md` now owns the canonical matrix:

1. Guest and Free may browse or preview starter voices and may later receive a bounded short-trial takeaway.
2. Guest and Free do not get downloadable full long-form production audio.
3. `Pro` and `Ultimate` are the current `longform paid member` plans for downloadable generated long-form audio.
4. `Pro` and `Ultimate` may use flagship voices for generation when voice rights and catalog status clear.
5. Optional `WAV`, `SRT`, repair, and private clone gates remain separate entitlements.

This does not change included minutes, plan prices, or the pricing workbook. If the team later changes Free minutes, public pricing, or the Pro/Ultimate ladder, that must go through `pricing-packaging-and-unit-economics.md`.

## Rights Readout

This boundary is safer than selling a generated voice library because the customer receives only rendered audio for their project.

What still needs supplier confirmation:

1. Whether Orpheus may offer provider-generated or provider-hosted voices inside a SaaS voice selector.
2. Whether that use is B2B2C, resale, sublicensing, marketplace use, or making provider services available to end users.
3. Whether generated audio remains commercially usable after subscription cancellation.
4. Whether the hosted `voiceId` remains callable after cancellation, non-renewal, account closure, or plan downgrade.
5. Whether standalone sample packs, voice packs, voice-library resale, or model-training datasets are prohibited.

This packet does not clear those supplier questions. It only defines the product shape that the supplier confirmation should ask about.

## Market Pattern

The safer market pattern is "choose a voice, generate voiceover, download audio", not "buy or download a voice."

Current retained examples:

1. ElevenLabs public help says paid-subscription generated content can be used commercially and indefinitely when generated during the paid period and used within terms: `https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform`
2. ElevenLabs subscription-end help says paid-subscription content keeps a commercial license after subscription end: `https://help.elevenlabs.io/hc/en-us/articles/15993008593297-What-happens-to-my-content-after-my-subscription-ends`
3. Murf describes commercial rights over generated voiceovers on paid plans: `https://help.murf.ai/do-i-have-commercial-rights-over-the-voice-over-created`
4. Inworld Voice Design supports prompt-designed voices and published `voiceId` technical flow, but supplier confirmation remains required for Orpheus' SaaS voice-selector use: `https://docs.inworld.ai/tts/voice-design`
5. Small creator-facing sites commonly market voice choice, commercial voiceovers, and YouTube use, but their public claims do not prove Orpheus supplier rights.

Market evidence supports the UX pattern. Provider-specific terms still govern Orpheus' actual rights.

## Copy Guardrails

Allowed:

1. `Choose a narration voice`
2. `Curated platform voices`
3. `Designed AI narration voices`
4. `Download your generated long-form audio`
5. `Paid members can download finished long-form narration`

Blocked:

1. `Download this voice`
2. `Own this voice`
3. `Exclusive voices`
4. `Voice clones for everyone`
5. `Keep this voice forever`
6. `Export the voice model`
7. `Use our voiceId directly`
8. `Sounds like [real person]`

## Canonical Sync Completed

This lane updates the canonical product truth before downstream docs:

1. `docs/prd/specs/capability-entitlements.md`
   - Adds `voice selector` and `longform paid member`.
   - Splits short trial / preview audio from downloadable long-form production audio.
   - Blocks guest/free full long-form downloads.
   - Clarifies that platform voices are generation controls, not downloadable assets.
2. `docs/prd/specs/distribution-and-growth-surface.md`
   - Blocks public promises that users can download, own, export, or reuse platform voices.
   - Allows voice choice only as a generation-control promise.
3. `docs/prd/specs/billing-usage-semantics.md`
   - Clarifies that voice choice is not a separate billable asset.
   - Blocks underlying voice download attempts before billing.
4. `docs/prd/prd.md`
   - Syncs the voice-entry, delivery, audio-format, and plan-summary wording.

## What Stays Unchanged

1. No runtime code changes.
2. No provider adapters or public APIs change.
3. No new provider calls.
4. No prompt-designed voice generation.
5. No pricing workbook update.
6. No public pricing launch.
7. No `SRT` launch expansion.
8. No user self-serve clone promise.

## Next Step

Keep the supplier-confirmation lane active as the rights gate:

1. Ask Inworld whether this exact voice-selector use is permitted.
2. Ask ElevenLabs the same B2B2C / voice-picker / rendered-output questions.
3. Keep prompt-designed candidates at `draft_prompt` or `rights_pending` until written answers are retained.
4. Only after supplier answers are retained should Orpheus spend money generating prompt-designed candidate voices for the platform selector.
