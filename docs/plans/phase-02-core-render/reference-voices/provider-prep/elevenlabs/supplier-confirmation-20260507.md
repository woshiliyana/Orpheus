# ElevenLabs Supplier Confirmation Packet

> Status: submitted_awaiting_supplier_response
> Scope: supplier rights / voice selector confirmation only
> Runtime changes: none
> Provider calls: none
> Prepared: 2026-05-07
> Submitted: 2026-05-07 via official contact-sales form

## Purpose

This packet turns the ElevenLabs side of `phase2-voice-supplier-confirmation-r1` into a ready-to-send request.

It does not approve paid Voice Design previews, create a voice, change product entitlements, or claim that a provider-hosted voice remains callable after cancellation.

## Current Readout

| Field | Value |
|---|---|
| `provider` | `ElevenLabs` |
| `orpheus_role` | `rights_commercial_benchmark_and_possible_fallback` |
| `confirmation_status` | `pending_written_confirmation` |
| `send_route_primary` | `https://elevenlabs.io/contact-sales` |
| `send_route_escalation` | Ask the sales route to route to legal / commercial terms review if needed. |
| `preview_generation_spend` | `hold` |
| `user_selectable_catalog_status` | `pending_b2b2c_and_hosted_voice_confirmation` |

## Submission Log

| Field | Value |
|---|---|
| `submitted_at` | 2026-05-07 |
| `submitted_by` | Yana Li |
| `submitter_email` | `founder@orpheusnarration.com` |
| `company` | Orpheus Narration |
| `company_website` | `https://orpheusnarration.com` |
| `country` | United States of America |
| `platform_interest` | ElevenAPI |
| `how_heard` | ElevenLabs website and documentation |
| `route_used` | `https://elevenlabs.io/contact-sales` |
| `submitted_body` | Ready-to-send copy below, placed in the use-case/details field because the form did not expose a subject field. |
| `browser_result` | Success page shown: `Thanks for reaching out!`; `POST https://api.elevenlabs.io/v1/marketing/contact-sales` returned 200. |
| `ticket_or_thread_id` | `pending_email_confirmation` |
| `next_action` | Check `founder@orpheusnarration.com`, retain any auto-reply or supplier response beside this packet, then classify the rights verdict. |

## Source Snapshot

| Source | Checked | Retained readout |
|---|---:|---|
| `https://elevenlabs.io/contact-sales` | 2026-05-07 | Official contact route for enterprise pricing and product-application questions; form asks for company website and business email before proceeding. |
| `https://elevenlabs.io/docs/api-reference/text-to-voice/design` | 2026-05-07 | Voice Design API returns previews with `generated_voice_id`; the selected preview ID can be used to create a voice. |
| `https://help.elevenlabs.io/hc/en-us/articles/29314862567313-What-is-Voice-Design` | 2026-05-07 | Voice Design creates a voice from a text prompt; current help text says Voice Design remains experimental. |
| `https://help.elevenlabs.io/hc/en-us/articles/15993008593297-What-happens-to-my-content-after-my-subscription-ends` | 2026-05-07 | Public help states paid-subscription generated content keeps a commercial license after subscription end, but continued hosted availability is not guaranteed. |
| `https://help.elevenlabs.io/hc/en-us/articles/18644643807889-How-do-I-share-a-voice` | 2026-05-07 | Voice Design / synthetic / AI-generated voices cannot be shared in the public Voice Library; the article points legal questions in that sharing context to `legal@elevenlabs.io`. |
| `https://elevenlabs.io/terms-of-use` | 2026-05-07 | Public terms include a non-transferable and non-sublicensable service license, reseller terms, prepaid-credit limits, and service-change risk. |
| `https://elevenlabs.io/use-policy` | 2026-05-07 | Prohibited Use Policy blocks competing-model development, use of Output for AI training datasets, and high-risk uses. |

## Ready-To-Send Copy

Subject:

```text
Confirmation request for Voice Design voices in Orpheus SaaS catalog
```

Body:

```text
Hello ElevenLabs team,

We are evaluating ElevenLabs Voice Design as a benchmark and possible fallback for Orpheus, a SaaS product for long-form educational narration. We are not planning to offer public self-serve voice cloning.

Our intended use is platform-controlled prompt-designed voices:

1. Orpheus writes safe text descriptions that avoid real-person, celebrity, creator, brand, political-figure, and soundalike prompts.
2. Orpheus generates short previews, saves selected generated voices, and stores provider voice IDs only server-side.
3. Orpheus makes approved platform voices available in our product voice picker so users can generate narration.
4. Users do not download, own, export, resell, or receive the underlying voice, prompt, model, clone/source asset, or provider voice ID.
5. Users download only generated long-form narration audio when their Orpheus plan allows it.

Could you confirm the following in writing?

1. May Orpheus offer ElevenLabs Voice Design voices as selectable platform voices inside our SaaS product?
2. Does this use count as B2B2C, resale, sublicensing, marketplace use, or making ElevenLabs services available to end users?
3. Your help center says paid-subscription generated content keeps a commercial license after subscription end, subject to terms. Does that apply to rendered audio generated by Orpheus users using our platform-selected Voice Design voices?
4. Can the hosted voice ID remain callable after cancellation, non-renewal, account closure, or plan downgrade?
5. Are Voice Design voices exclusive to our account, non-exclusive, or potentially similar to voices generated for other customers?
6. Are generated audio outputs allowed for monetized YouTube videos, podcasts, ads, audiobooks, educational courses, and social video?
7. Are standalone sample packs, voice packs, voice-library resale, model-training datasets, or downstream resale of voice access prohibited?
8. We understand that Voice Design / synthetic / AI-generated voices cannot be shared into the ElevenLabs public Voice Library. Does that restriction also limit a private Orpheus product voice picker where only Orpheus users can select platform voices for narration generation?
9. Are there AI disclosure, watermark, traceability, or metadata obligations we must pass through to Orpheus users?
10. Is Voice Design currently production/commercial-ready for this use, or does any experimental / beta restriction apply?
11. Which paid plan, API plan, enterprise addendum, DPA, order form, or SLA path would be required for this use?

We can keep all prompts away from celebrities, public figures, brands, real-person soundalikes, and deceptive impersonation. We are looking for clean written rights and usage confirmation before generating or exposing platform voices.
```

## Reply Capture

Store the retained answer beside this packet before moving any candidate beyond `draft_prompt`.

Required captured fields:

1. `response_date`
2. `responder_name`
3. `responder_role`
4. `response_channel`
5. `ticket_or_thread_id`
6. `catalog_use`
7. `b2b2c_or_resale_classification`
8. `rendered_audio_post_cancel`
9. `voice_id_post_cancel`
10. `voice_library_restriction_interpretation`
11. `exclusivity`
12. `allowed_content_channels`
13. `prohibited_resale_or_training_uses`
14. `disclosure_or_traceability_obligations`
15. `required_plan_or_contract`
16. `orpheus_rights_verdict`

Allowed verdict values:

1. `cleared_for_catalog_candidate`
2. `cleared_for_internal_only`
3. `needs_contract_or_counsel_review`
4. `blocked`

## Gate

Until this written confirmation is retained, keep:

1. `elevenlabs_prompt_voice_design=stronger_rendered_audio_rights_benchmark_catalog_use_pending`
2. `platform_voice_generation_spend=hold_until_supplier_answers`
3. `voice_selector_model=platform_voice_choice_for_generation_only`
4. `downloaded_user_asset=generated_longform_audio_only`
