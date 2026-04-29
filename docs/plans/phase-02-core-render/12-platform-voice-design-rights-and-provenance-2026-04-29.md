# Platform Voice Design Rights and Provenance Closeout

> Status: decision packet
> Scope: docs / compliance / provenance only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-29

## Decision

Orpheus should continue toward a platform-curated voice library built from prompt-designed voices, but the next step is a rights and provenance layer, not a batch of paid voice generations.

This packet keeps the MVP direction narrow:

1. Use prompt-generated platform voices for internal EN and ES flagship voice exploration.
2. Keep the founder-provided WAV files as taste references only.
3. Do not expose public clone upload or public self-serve voice cloning in MVP.
4. Do not claim designed voices are exclusive or permanently owned unless the provider contract says so.
5. Do not use a designed voice as a user-selectable catalog voice until its provenance and supplier-rights review are complete.

This is not legal advice. Before public launch, provider confirmation or counsel review is required for any platform voice that becomes user-selectable.

## Source Snapshot

| Source | Current readout | Orpheus use |
|---|---|---|
| Inworld Voice Design docs | Text description plus script can generate up to three previews; selected voices can be saved and used through `voiceId`; the feature is marked research preview. | Valid technical path for prompt-designed voice exploration. |
| Inworld Voice Design marketing page | Presents the flow as design, pick, publish, and reuse a voice ID in Inworld products. | Useful capability signal, not enough by itself for post-termination commercial permanence. |
| Inworld Terms and AUP | Terms assign outputs to the customer subject to compliance, but termination language says the customer must delete Services, Models, and Outputs; AUP blocks impersonation and harmful misuse. | Requires supplier confirmation before treating Inworld-designed voices as permanent platform assets after subscription termination. |
| ElevenLabs Voice Design docs | Text-prompt Voice Design generates three options and lets the user save one to a voice slot; output quality can vary and Voice Design is experimental. | Strong benchmark and possible fallback for prompt-designed voice creation. |
| ElevenLabs commercial-use help | Paid-plan generated content can be used commercially and indefinitely when generated during an active paid subscription and used within terms; beta services are excluded. | Stronger post-cancel rendered-audio rights benchmark than Inworld's public terms. |
| ElevenLabs Voice Library / use policy | Voice Design voices cannot be shared into ElevenLabs' public Voice Library; unauthorized impersonation and less-restrictive downstream B2B2C terms are prohibited. | Our own SaaS catalog must not be framed as reselling ElevenLabs' public Voice Library or loosening provider restrictions. |
| Murf and small creator-facing sites | Paid commercial voiceover licensing and creator-focused AI voice libraries are common market signals. | Confirms market pattern, but does not replace provider-specific rights review. |

Primary sources checked:

1. `https://docs.inworld.ai/tts/voice-design`
2. `https://inworld.ai/voice-design`
3. `https://inworld.ai/terms`
4. `https://inworld.ai/aup/`
5. `https://elevenlabs.io/docs/eleven-creative/voices/voice-design`
6. `https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform`
7. `https://help.elevenlabs.io/hc/en-us/articles/30192704002321-Can-I-share-an-AI-generated-voice-in-the-Voice-Library`
8. `https://elevenlabs.io/use-policy`
9. `https://help.murf.ai/do-i-have-commercial-rights-over-the-voice-over-created`
10. `https://www.ytvoice.app/`
11. `https://kikivoice.ai/ai-voice-design`

## Voice Rights Matrix

| Asset type | Examples | Use posture | Voice ID portability | Rights proof required | MVP catalog rule |
|---|---|---|---|---|---|
| Provider built-in voice | Inworld or ElevenLabs default/catalog voice selected by ID | Can generate audio only within provider terms and plan permissions | Provider-hosted; do not assume access after account loss or provider withdrawal | Provider terms snapshot, plan/account, voice ID, output artifact manifest | Allowed for internal tests and starter/flagship candidates only after provider terms review. |
| Provider marketplace/library voice | Community, marketplace, or shared third-party voice | Highest withdrawal and sublicensing risk because another party or marketplace rule may control access | Provider-hosted and potentially revocable | Marketplace addendum, sharing terms, notice/withdrawal rule, commercial-use terms | Do not use as an Orpheus-owned flagship voice unless a separate license exists. |
| Prompt-designed platform voice | Inworld Voice Design or ElevenLabs Voice Design generated from Orpheus prompts | Preferred MVP mechanism when prompts avoid real-person soundalikes and rights proof is complete | Provider-hosted `voiceId`; rendered audio and hosted voice access must be judged separately | Prompt, script, generated previews, selected voice ID, provider terms, plan/account, review verdict, supplier confirmation status | Can become a candidate; cannot become user-selectable until rights and review gates pass. |
| Audio-input cloned voice | Voice cloned from uploaded or recorded source audio | Highest compliance risk; requires consent and rights review | Provider-hosted and source-speaker dependent | Speaker consent, source ownership, provider clone terms, review record, revocation handling | Out of MVP public scope; remains controlled private-clone / later-lane only. |

## Rendered Audio vs Hosted Voice ID

Orpheus must not collapse rendered audio rights and provider-hosted voice access into one rule.

| Layer | Meaning | Required stance |
|---|---|---|
| Rendered audio artifact | The MP3/WAV/PCM output generated during a permitted provider session | May be commercially usable if generated under a paid plan or contract that grants commercial rights, but must retain provider/terms evidence. |
| Provider-hosted voice ID | The reusable provider-side voice handle used for future generations | May be unavailable after cancellation, account suspension, provider withdrawal, beta changes, marketplace withdrawal, or terms changes. |
| Orpheus voice catalog entry | Our product record that makes a voice selectable | Must store the provider ID plus rights status; it is not itself proof of ownership or permanence. |
| User-facing voice choice | The product surface exposed to creators | Must never imply exclusivity, real-person endorsement, or permanent provider-independent access unless a contract proves it. |

Operational rule: keep local copies of approved preview audio, representative final samples, prompt text, preview script, selected provider `voiceId`, terms review URL/date, and reviewer verdict before promoting any prompt-designed voice.

## Supplier Confirmation Checklist

Before any prompt-designed voice becomes `active_user_selectable`, ask or contractually confirm:

1. Can the generated voice be offered as a selectable platform voice inside Orpheus' SaaS product?
2. Does this count as B2B2C, resale, sublicensing, marketplace use, or making the provider service available to end users?
3. Can audio generated during an active paid subscription continue to be used commercially after cancellation?
4. Can the hosted `voiceId` still be called after cancellation or only while the account/subscription remains active?
5. Is the generated voice exclusive, non-exclusive, or potentially similar to voices generated for other customers?
6. Can outputs be used in monetized YouTube videos, ads, podcasts, audiobooks, and social content?
7. Are standalone audio sample packs, voice packs, model training datasets, or voice-library resale prohibited?
8. Are AI disclosure, age, region, political, medical, financial, or high-risk use limitations relevant to Orpheus' audience?
9. Does the provider require retention of attribution, watermark, metadata, or generated-output traceability?
10. What happens if the provider later reclassifies Voice Design, beta/preview features, or pricing?

If any answer is unclear, set the voice candidate to `rights_pending` or `blocked`, not launch-ready.

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

## Documentation-Only Status Model

These statuses are planning/provenance labels only. They are not runtime enum values and do not update `voice-metadata-schema.md`.

| Status | Meaning | Promotion condition |
|---|---|---|
| `draft_prompt` | Prompt and script are drafted but no provider call has happened. | Prompt safety review passes. |
| `preview_generated` | Provider previews exist and local preview evidence is retained. | Preview IDs/audio and provider run metadata are recorded. |
| `rights_pending` | Quality may be promising, but provider rights, B2B2C, or post-cancel terms are unresolved. | Supplier confirmation or counsel review clears the specific use. |
| `voice_fit_review` | Founder/operator review is evaluating persona, language, pacing, and fatigue risk. | Review worksheet marks the candidate pass or pass-with-warnings. |
| `catalog_candidate` | Candidate can be wired into internal catalog planning. | Rights, safety, and voice-fit gates pass. |
| `active_internal` | Candidate can be used for internal tests or controlled smoke runs. | Provider call lane explicitly approves use. |
| `active_user_selectable` | Candidate can appear in the product voice picker for entitled users. | Canonical voice metadata and entitlement truth are updated in a separate runtime/catalog lane. |
| `retired` | Candidate is no longer offered but retained for audit history. | Replacement or rights withdrawal is documented. |
| `blocked` | Candidate cannot proceed. | Only a new rights review or new provider generation can reopen it. |

## Launch Wording Guardrail

| Allowed wording | Disallowed wording |
|---|---|
| `curated platform voices` | `voice clones for everyone` |
| `designed AI narration voices` | `cloned voices` |
| `AI narration voices for educational explainers` | exclusive / unique voice claims without contract proof |
| `platform-selected flagship voices` | permanent provider-independent ownership claims without written provider confirmation |
| `voice options reviewed for creator fit` | `sounds like [real person]` |

Public launch copy must continue to avoid public self-serve clone claims. If the public surface needs to mention the richer library later, it should point to `flagship library` / `starter library` language from `capability-entitlements.md`, not to clone language.

## Provider Readout

### Inworld

Inworld remains the current primary TTS implementation path and the best first technical fit for Phase 2. Its Voice Design flow also matches the intended prompt-generated voice mechanism.

Risk posture:

1. `voice_design_capability=viable_for_internal_exploration`
2. `commercial_output_readout=plausible_but_terms_review_required`
3. `post_cancel_rendered_audio=unconfirmed`
4. `post_cancel_voice_id_access=unconfirmed`
5. `catalog_use=supplier_confirmation_required`

Do not make a permanent-asset claim for Inworld-designed voices until the termination/output language is resolved in writing.

### ElevenLabs

ElevenLabs is the strongest current commercial-rights benchmark for prompt-designed voices because its public help center explicitly separates free-plan non-commercial use from paid-plan commercial use, and says paid-subscription content can be used indefinitely when generated during the paid period and used within terms.

Risk posture:

1. `voice_design_capability=viable_benchmark_or_fallback`
2. `commercial_output_readout=stronger_than_inworld_public_terms`
3. `post_cancel_rendered_audio=public_help_indicates_yes_for_paid_generation`
4. `post_cancel_voice_id_access=still_provider_hosted_and_unconfirmed`
5. `catalog_use=B2B2C_and_sublicense_terms_must_be_checked`

Do not share ElevenLabs Voice Design voices into ElevenLabs' public Voice Library, and do not expose downstream terms looser than the provider terms.

### Murf and small-market references

Murf, YTVoice, KikiVoice, and similar pages show that creator-facing audio products commonly sell commercial voiceover use, voice abundance, and prompt/designed voice workflows. This supports the market thesis that Orpheus users will understand curated voice choice.

These pages are market evidence only. They do not establish Orpheus' rights to use Inworld, ElevenLabs, or any other provider output.

## Next Lane

The accepted next lane is `phase2-voice-supplier-confirmation-r1`, retained in [`13-voice-supplier-confirmation-2026-04-29.md`](./13-voice-supplier-confirmation-2026-04-29.md). It must ask Inworld and ElevenLabs for written confirmation before paid preview generation or user-selectable catalog use.

After supplier answers are retained, the safe prompt-pack lane is `phase2-platform-voice-design-prompt-pack-r1`:

1. Draft EN and ES prompt packs with no real-person soundalike language.
2. Add a short candidate-review worksheet.
3. Keep all candidate statuses at `draft_prompt`.
4. Stop before provider calls unless the user explicitly approves paid preview generation.

No runtime, pricing, PRD canonical, or public-launch change is required from this closeout.
