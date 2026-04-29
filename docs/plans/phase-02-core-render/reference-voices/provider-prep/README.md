# Provider Prep

> Status: placeholder for future provider prep
> Runtime changes: none
> Provider calls: none

Provider-specific prompt packs, preview scripts, and optional derivatives belong under a provider-named subdirectory, for example `inworld/`.

Rules:

1. Never overwrite files in `../originals/`.
2. For prompt-generated voice design, record the provider, prompt, preview script, language, intended niche, and terms review date.
3. For any future audio derivative, record the source original, tool settings, duration, sample rate, channel layout, loudness target, and SHA-256.
4. Keep provider-specific constraints separate because future providers may require different prompt shape, script length, format, channel layout, loudness, or transcript packaging.
5. Do not create clone-ready derivatives unless a separate audio-clone lane is explicitly approved.
