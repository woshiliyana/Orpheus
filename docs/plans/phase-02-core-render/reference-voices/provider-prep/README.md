# Provider Prep

> Status: active provider-prep rules
> Runtime changes: none
> Provider calls: none

Provider-specific prompt packs, preview scripts, rights snapshots, review packets, and optional derivatives belong under a provider-named subdirectory, for example `inworld/` or `elevenlabs/`.

Rules:

1. Never overwrite files in `../originals/`.
2. For prompt-generated voice design, record the provider, feature name, prompt, preview script, language, intended niche, source-reference relationship, and terms review date.
3. Record provider documentation and terms URLs for each candidate, including commercial-use, acceptable-use, B2B2C, marketplace/library, and termination or cancellation sources when available.
4. Keep rendered audio rights separate from provider-hosted `voiceId` access. A generated audio file may have a different post-cancel status than the provider voice handle used for future generations.
5. Store preview IDs, selected voice ID, local preview/final sample references, reviewer verdict, and candidate status before moving a voice beyond internal review.
6. Keep provider-specific constraints separate because future providers may require different prompt shape, script length, format, channel layout, loudness, transcript packaging, plan tier, or review proof.
7. Do not create clone-ready derivatives unless a separate audio-clone lane is explicitly approved.
8. Do not put celebrity, creator, brand, political figure, public-figure, marketplace-voice, or real-person soundalike language in prompt packs.

Documentation-only candidate statuses are defined in [`../../12-platform-voice-design-rights-and-provenance-2026-04-29.md`](../../12-platform-voice-design-rights-and-provenance-2026-04-29.md). They are not runtime enum values.
