# Provider Prep Derivatives

> Status: placeholder for future derivatives
> Runtime changes: none
> Provider calls: none

Provider-specific audio derivatives belong under a provider-named subdirectory, for example `inworld/`.

Rules:

1. Never overwrite files in `../originals/`.
2. Record the source original, tool settings, duration, sample rate, channel layout, loudness target, and SHA-256 for every derivative.
3. Keep provider-specific constraints separate because future providers may require different clip length, format, channel layout, loudness, or transcript packaging.
4. Do not create clone-ready derivatives until rights proof exists for the source voice.
