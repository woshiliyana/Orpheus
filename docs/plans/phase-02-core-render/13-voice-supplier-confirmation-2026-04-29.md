# Voice Supplier Confirmation Packet

> Status: supplier-confirmation packet
> Scope: docs / supplier rights / provenance only
> Runtime changes: none
> Provider calls: none
> Last reviewed: 2026-04-29

## Decision

Do not pay for prompt-designed voice generation, expose a public voice-clone promise, or promote any designed voice to a user-selectable catalog slot until supplier confirmation is retained.

This packet converts the rights/provenance gap into a supplier-confirmation lane with explicit values:

1. `supplier_confirmation_status=pending_written_confirmation`
2. `inworld_prompt_voice_design=technically_viable_rights_blocked_for_user_selectable_catalog`
3. `elevenlabs_prompt_voice_design=stronger_rendered_audio_rights_benchmark_catalog_use_pending`
4. `platform_voice_generation_spend=hold_until_supplier_answers`
5. `public_voice_library_claim=hold`
6. `public_clone_or_exclusive_voice_claim=blocked`

This is not legal advice. It is a retained research and outreach packet for supplier confirmation and later counsel review.

## Scope Boundary

This lane does not change product truth in `docs/prd/specs/*`. It does not change runtime code, public API, provider adapters, pricing, launch copy, or the voice metadata schema.

Allowed output:

1. Official-source readout.
2. Supplier confirmation questions.
3. Outreach copy for Inworld and ElevenLabs.
4. Evidence-retention checklist.
5. Internal decision gate for the next prompt-pack lane.

Blocked output:

1. No new provider calls.
2. No paid preview generation.
3. No claim that generated voices are owned forever.
4. No claim that a provider-hosted `voiceId` remains callable after cancellation.
5. No public promise of cloned, exclusive, celebrity-like, creator-like, or marketplace-like voices.

## Research Method

`find-skills` was invoked first to check whether a reputable legal/compliance/vendor-terms research skill should be added before this packet.

Result:

| Candidate skill | Install count shown by `npx skills find` | Decision |
|---|---:|---|
| `personamanagmentlayer/pcl@lawyer-expert` | 221 | Do not install; low adoption and unknown source reputation for this high-risk rights question. |
| `travisjneuman/.claude@legal-compliance` | 150 | Do not install; low adoption and unknown source reputation for this high-risk rights question. |
| `erichowens/some_claude_skills@recovery-app-legal-terms` | 102 | Do not install; not specific to voice suppliers. |
| Remaining matches | 22 or fewer | Do not install. |

Research standard for this packet:

1. Use official provider docs, terms, policy pages, and help-center articles as the retained evidence base.
2. Use market examples only to understand product patterns, not to prove Orpheus' rights.
3. Treat U.S. Copyright Office and FTC materials as legal-risk background, not as supplier permission.
4. Treat every source as time-sensitive and retain review date with the URL.

## Official Source Register

| Source | URL | Checked | Use in this packet |
|---|---|---:|---|
| Inworld Voice Design docs | `https://docs.inworld.ai/tts/voice-design` | 2026-04-29 | Confirms prompt plus short script flow, preview generation, and publish/use path. |
| Inworld Voice Design page | `https://inworld.ai/voice-design` | 2026-04-29 | Shows product positioning around prompt-designed voices and published `voiceId`. |
| Inworld Terms | `https://inworld.ai/terms` | 2026-04-29 | Confirms output assignment language, limited service license, and termination deletion conflict. |
| Inworld Service Specific Terms | `https://inworld.ai/service-specific-terms` | 2026-04-29 | Confirms voice/speech output handling and user voice model terms. |
| Inworld Acceptable Use Policy | `https://inworld.ai/aup/` | 2026-04-29 | Confirms impersonation, AI disclosure, biometric database, training/competing-use, and high-risk-use boundaries. |
| ElevenLabs Voice Design docs | `https://elevenlabs.io/docs/eleven-creative/voices/voice-design/` | 2026-04-29 | Confirms prompt-based Voice Design, preview generation, and saved voice flow. |
| ElevenLabs voices overview | `https://elevenlabs.io/docs/capabilities/voices` | 2026-04-29 | Confirms voice types, generated voices, default-voice expiry note, and non-shareability of generated voices in Voice Library. |
| ElevenLabs Terms | `https://elevenlabs.io/terms-of-use` | 2026-04-29 | Confirms retained output rights, downloadable output use outside services subject to terms, non-sublicensable service license, moderation, and service-change risk. |
| ElevenLabs commercial-use help | `https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform` | 2026-04-29 | Strongest public rendered-audio rights statement for paid-plan content. |
| ElevenLabs AI-generated voice sharing help | `https://help.elevenlabs.io/hc/en-us/articles/30192704002321-Can-I-share-an-AI-generated-voice-in-the-Voice-Library` | 2026-04-29 | Confirms Voice Design / AI-generated voices cannot be shared into ElevenLabs' Voice Library. |
| ElevenLabs Prohibited Use Policy | `https://elevenlabs.io/use-policy` | 2026-04-29 | Confirms unauthorized/deceptive impersonation and other misuse restrictions. |
| U.S. Copyright Office AI page | `https://www.copyright.gov/ai/` | 2026-04-29 | Legal-risk background for AI output copyrightability and digital replicas. |
| U.S. Copyright Office Part 1 Digital Replicas report | `https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-1-Digital-Replicas-Report.pdf` | 2026-04-29 | Legal-risk background for unauthorized voice/image digital replicas and state publicity-right complexity. |
| U.S. Copyright Office Part 2 announcement | `https://www.copyright.gov/newsnet/2025/1060.html` | 2026-04-29 | Legal-risk background for human authorship and prompt-only copyright limits. |
| FTC Voice Cloning Challenge | `https://www.ftc.gov/news-events/contests/ftc-voice-cloning-challenge` | 2026-04-29 | Risk background for fraud, biometric misuse, and platform guardrails. |
| Murf commercial-rights help | `https://help.murf.ai/do-i-have-commercial-rights-over-the-voice-over-created` | 2026-04-29 | Market reference only. |
| YTVoice public page | `https://www.ytvoice.app/` | 2026-04-29 | Market reference only. |
| KikiVoice AI Voice Design page | `https://kikivoice.ai/ai-voice-design` | 2026-04-29 | Market reference only. |

## Source Readout

### Inworld

Current public evidence supports technical exploration but not launch-clear catalog use.

| Question | Current public-source readout | Orpheus status |
|---|---|---|
| Can Inworld design a voice from text? | Yes. The docs describe English voice descriptions, language selection, short preview scripts, preview generation, and SDK/API publishing. | `technical_path_viable` |
| Can a selected voice be published to a reusable `voiceId`? | Yes. The docs show `publishVoice()` after preview selection, and the marketing page says the published `voiceId` can be reused in Inworld products. | `technical_path_viable` |
| Can rendered audio be used outside Inworld? | Service-specific terms say downloaded Output may be used outside the Services, subject to the Terms and AUP. | `plausible_but_terms_bound` |
| Does Orpheus own the Output? | The Terms and Service Specific Terms assign or recognize customer rights in Output as between customer and Inworld, subject to the agreement. | `output_rights_plausible` |
| Is the service license sublicensable? | The general service license is limited, non-transferable, and non-sublicensable, and is described for internal business purposes. | `catalog_use_not_clear` |
| What happens on termination? | The Terms say the license ends and the customer must delete Services, Models, and Outputs. This conflicts with permanent-asset interpretation. | `blocking_contradiction` |
| Does AUP allow real-person soundalikes or deception? | No. AUP blocks impersonation without consent/legal right, biometric database misuse, harmful deception, and requires AI disclosure in relevant interactions. | `prompt_safety_required` |

Inworld gating value:

`inworld_user_selectable_catalog_status=blocked_until_written_confirmation`

Do not treat Inworld-designed voices as durable Orpheus assets until Inworld answers the post-termination Output and post-cancel `voiceId` questions in writing.

### ElevenLabs

ElevenLabs has the clearer public rendered-audio commercial-use readout, but catalog use and hosted voice access still need confirmation.

| Question | Current public-source readout | Orpheus status |
|---|---|---|
| Can ElevenLabs design a voice from text? | Yes. Voice Design creates generated voices from text descriptions, with previews and save-to-library flow. | `technical_path_viable` |
| Can paid-plan generated content be used commercially after cancellation? | The help article says paid-subscription content can be used commercially and indefinitely when generated during the paid period, subject to terms and non-beta limits. | `rendered_audio_stronger_public_yes` |
| Does the user retain Output rights? | Terms state the user retains rights in Output as between user and ElevenLabs, except as set out in the Terms. | `output_rights_plausible` |
| Can downloaded Output be used outside ElevenLabs? | Terms permit downloaded Output outside the Services, always subject to Terms and Prohibited Use Policy. | `plausible_but_terms_bound` |
| Does the service license itself allow sublicensing? | The service access license is non-transferable and non-sublicensable without written permission. | `catalog_use_not_clear` |
| Can generated voices be shared in ElevenLabs' public Voice Library? | No. The help article says synthetic / Voice Design / AI-generated voices cannot be shared in the Voice Library. | `do_not_share_to_elevenlabs_voice_library` |
| Can voice access disappear? | Terms allow service modification, suspension, termination, and access loss; unused credits are forfeited if an account closes or terminates. | `hosted_voice_access_not_durable_without_contract` |
| Does policy allow real-person soundalikes or deception? | No. The Prohibited Use Policy blocks unauthorized, deceptive, or harmful impersonation and related misuse. | `prompt_safety_required` |

ElevenLabs gating value:

`elevenlabs_user_selectable_catalog_status=pending_b2b2c_and_hosted_voice_confirmation`

ElevenLabs is a strong fallback/benchmark for rendered-audio rights, but Orpheus still needs written permission for a SaaS voice picker where Orpheus users select a platform-designed provider-hosted voice.

### Market References

Market pages show that creator-facing products commonly sell commercial voiceovers, YouTube use, voice choice, long-script convenience, and prompt-designed voices.

| Reference | Useful signal | Limit |
|---|---|---|
| Murf help | Paid plans can include commercial rights for generated voiceovers on YouTube and other streaming platforms. | Does not transfer to Inworld or ElevenLabs. |
| YTVoice | Small creator-facing product markets YouTube voiceovers, commercial license, no subscription, and ElevenLabs voice quality. | Its public claims are not proof that Orpheus can resell or sublicense the same provider capabilities. |
| KikiVoice | Small public page markets prompt-based original voice design, commercial readiness, and no real-person samples. | Its claims are not legal authority; use only as market-narrative evidence. |

Market conclusion:

`market_pattern=curated_voice_choice_is_normal_but_supplier_rights_are_provider_specific`

## Legal-Risk Background

These sources do not grant Orpheus any right. They explain why the supplier-confirmation gate matters.

| Risk | Source-backed readout | Orpheus response |
|---|---|---|
| Digital replica / right of publicity | The U.S. Copyright Office says unauthorized digital replicas can cause harm and recommends federal digital-replica protections while preserving state law floors; right-of-publicity rules vary by state. | Avoid prompts that target real people, voices, brands, public figures, or confusing soundalikes. |
| Prompt-only copyrightability | The U.S. Copyright Office says generative-AI outputs can be copyrightable only where human authors determine sufficient expressive elements; mere prompts are not enough by themselves. | Do not claim Orpheus has standalone copyright ownership over a raw prompt-generated voice unless counsel confirms the asset theory. |
| Fraud / biometric misuse | FTC materials identify voice cloning risks including fraud, scams, misuse of biometric data, and appropriation of creative professionals' voices. | Keep user-upload cloning out of MVP; keep provider prompt design controlled and reviewed. |
| Platform terms can be stricter than general law | Provider terms govern account access, hosted `voiceId`, cancellation, output deletion, and marketplace restrictions. | Get written supplier confirmation before moving from internal candidate to user-selectable catalog. |

## Supplier Confirmation Checklist

Ask every supplier the same core questions. A provider can pass rendered-audio use while still failing hosted voice, B2B2C, or catalog-use requirements.

| ID | Question | Required answer before `active_user_selectable` |
|---|---|---|
| `Q01_catalog_use` | Can Orpheus offer prompt-designed voices as selectable platform voices inside our SaaS product? | Yes, in writing. |
| `Q02_b2b2c` | Does that use count as B2B2C, resale, sublicensing, marketplace use, or making the provider service available to end users? | Clear classification plus permitted plan/contract. |
| `Q03_rendered_audio_post_cancel` | Can audio generated during an active paid subscription continue to be used commercially after cancellation or non-renewal? | Yes, or documented limit. |
| `Q04_voice_id_post_cancel` | Can the provider-hosted `voiceId` still be called after cancellation, non-renewal, account closure, or plan downgrade? | Yes, or documented active-subscription-only limit. |
| `Q05_output_deletion` | If terms require deleting Outputs on termination, does that apply to already-delivered customer audio files and catalog samples? | Written interpretation. |
| `Q06_exclusivity` | Are prompt-designed voices exclusive to us, non-exclusive, or potentially similar to voices generated for other customers? | Explicit non-exclusive/exclusive status. |
| `Q07_content_channels` | Can outputs be used in monetized YouTube, podcasts, ads, audiobooks, courses, and social video? | Yes or channel-specific exclusions. |
| `Q08_voice_library_resale` | Are standalone sample packs, voice packs, model training datasets, marketplace resale, or voice-library resale prohibited? | Prohibited scope documented. |
| `Q09_prompt_safety` | Are prompts that describe age, gender presentation, accent, tone, pace, timbre, and niche acceptable if they avoid real-person soundalikes? | Yes, with any extra restrictions. |
| `Q10_ai_disclosure` | What disclosure, watermark, traceability, or metadata obligations apply to generated audio and SaaS users? | Operational obligations documented. |
| `Q11_beta_preview` | Is Voice Design, the selected model, or relevant API covered by beta/preview restrictions that block commercial or production use? | Production/commercial status documented. |
| `Q12_contract_needed` | Which plan, addendum, order form, DPA, or enterprise contract is required for this use? | Procurement path documented. |

## Provider-Specific Outreach Copy

### Inworld

Subject: Confirmation request for prompt-designed voices in Orpheus SaaS catalog

Body:

```text
Hello Inworld team,

We are evaluating Inworld TTS and Voice Design for Orpheus, a SaaS product for long-form educational narration. We are not planning to offer public self-serve voice cloning. Our intended use is platform-controlled prompt-designed voices: Orpheus would write safe text descriptions, generate short previews, select/publish a voice, and make selected platform voices available in our product voice picker for users to generate narration.

Could you confirm the following in writing?

1. May Orpheus offer Inworld prompt-designed voices as selectable platform voices inside our SaaS product?
2. Does this use count as B2B2C, resale, sublicensing, marketplace use, or making Inworld services available to end users?
3. Can audio generated during an active paid subscription or contract continue to be used commercially after cancellation or non-renewal?
4. Can the hosted voiceId remain callable after cancellation, non-renewal, account closure, or plan downgrade?
5. Your public Voice Design page describes a published voiceId as permanent/yours forever, while the Terms say that upon termination the customer must delete Services, Models, and Outputs. How should we interpret this for already-rendered audio files, retained samples, and the hosted voiceId?
6. Are prompt-designed voices exclusive to our account, non-exclusive, or potentially similar to voices generated for other customers?
7. Are outputs allowed for monetized YouTube videos, podcasts, ads, audiobooks, educational courses, and social videos?
8. Are standalone sample packs, voice packs, voice-library resale, or model-training datasets prohibited?
9. Are there any AI disclosure, watermark, traceability, or metadata obligations we must pass through to Orpheus users?
10. Is Voice Design currently production/commercial-ready for this use, or does any research preview / beta restriction apply?

We are happy to use the correct paid plan, startup plan, order form, or enterprise addendum if needed. We are looking for a clean written rights and usage confirmation before generating or exposing any platform voices.
```

### ElevenLabs

Subject: Confirmation request for Voice Design voices in Orpheus SaaS catalog

Body:

```text
Hello ElevenLabs team,

We are evaluating ElevenLabs Voice Design as a benchmark and possible fallback for Orpheus, a SaaS product for long-form educational narration. We are not planning to offer public self-serve voice cloning. Our intended use is platform-controlled prompt-designed voices: Orpheus would write safe text descriptions, generate short previews, save selected generated voices, and make selected platform voices available in our product voice picker for users to generate narration.

Could you confirm the following in writing?

1. May Orpheus offer ElevenLabs Voice Design voices as selectable platform voices inside our SaaS product?
2. Does this use count as B2B2C, resale, sublicensing, marketplace use, or making ElevenLabs services available to end users?
3. Your help center says content generated during a paid subscription can be used commercially and indefinitely, subject to terms and non-beta restrictions. Does that apply to rendered audio generated by Orpheus users using our platform-selected Voice Design voices?
4. Can the hosted voiceId remain callable after cancellation, non-renewal, account closure, or plan downgrade?
5. Are Voice Design voices exclusive to our account, non-exclusive, or potentially similar to voices generated for other customers?
6. Are outputs allowed for monetized YouTube videos, podcasts, ads, audiobooks, educational courses, and social videos?
7. Are standalone sample packs, voice packs, voice-library resale, or model-training datasets prohibited?
8. We understand Voice Design / AI-generated voices cannot be shared into the ElevenLabs public Voice Library. Does that restriction also limit a private Orpheus product voice picker where only Orpheus users can select platform voices for narration generation?
9. Are there any AI disclosure, watermark, traceability, or metadata obligations we must pass through to Orpheus users?
10. Which paid plan, API plan, addendum, DPA, or enterprise agreement is required for this use?

We can keep all prompts away from celebrities, public figures, brands, real-person soundalikes, and deceptive impersonation. We are looking for written confirmation before generating or exposing any platform voices.
```

## Evidence-Retention Packet

Before a supplier answer is treated as clearing a candidate, retain:

1. Supplier name, product/feature, account/workspace, and plan or contract.
2. Source URLs and review date.
3. Terms snapshot or PDF/screenshot path if captured outside Git.
4. Email, support ticket, order-form clause, or contract clause answering the checklist.
5. Prompt and preview script.
6. Preview IDs and local preview audio.
7. Published `voiceId`, if any.
8. Rendered sample IDs and local sample audio.
9. Human voice-fit verdict.
10. Rights verdict with reviewer and date.

Recommended local path pattern for later provider-prep lanes:

`docs/plans/phase-02-core-render/reference-voices/provider-prep/<provider>/<candidate-id>/`

Recommended files:

1. `prompt.md`
2. `preview-script.md`
3. `source-register.md`
4. `supplier-confirmation.md`
5. `review-verdict.md`
6. `candidate-metadata.json`

## Promotion Gate

| Status | Required evidence |
|---|---|
| `draft_prompt` | Prompt avoids real-person, brand, public-figure, marketplace-voice, and soundalike terms. |
| `preview_generated` | Provider call was explicitly approved; preview IDs/audio are retained. |
| `rights_pending` | Supplier answer is missing, partial, or ambiguous. |
| `catalog_candidate` | Supplier confirms rendered-audio use, catalog use, B2B2C classification, hosted voice access, prohibited resale boundaries, and disclosure obligations. |
| `active_internal` | Provider confirmation and internal QA clear controlled internal use. |
| `active_user_selectable` | Separate canonical/runtime/catalog lane updates the real voice catalog fields and entitlement truth. |
| `blocked` | Supplier denies catalog use, denies commercial channel use, requires deletion of Outputs we must retain, or leaves post-cancel/hosted-voice risk unresolved for a required use. |

## Next Step

Send the Inworld confirmation request first because Inworld remains the current primary TTS path. Send the ElevenLabs confirmation request second as the rights/commercial benchmark and possible fallback.

Until written answers are retained:

1. Keep prompt-designed candidates at `draft_prompt`.
2. Keep provider preview spend on hold.
3. Keep public launch wording to `curated platform voices` or `designed AI narration voices`.
4. Keep `cloned voices`, `exclusive voices`, `ours forever`, and real-person soundalike language blocked.
