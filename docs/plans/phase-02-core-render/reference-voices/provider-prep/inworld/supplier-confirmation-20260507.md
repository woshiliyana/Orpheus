# Inworld Supplier Confirmation Packet

> Status: submitted_awaiting_supplier_response
> Scope: supplier rights / voice selector confirmation only
> Runtime changes: none
> Provider calls: none
> Prepared: 2026-05-07
> Submitted: 2026-05-07 via official contact-sales form

## Purpose

This packet turns the Inworld side of `phase2-voice-supplier-confirmation-r1` into a ready-to-send request.

It does not approve paid Voice Design previews, publish a platform voice, change product entitlements, or claim that a provider-hosted `voiceId` is durable after cancellation.

## Current Readout

| Field | Value |
|---|---|
| `provider` | `Inworld` |
| `orpheus_role` | `primary_tts_path` |
| `confirmation_status` | `pending_written_confirmation` |
| `send_route_primary` | `https://inworld.ai/contact-sales` |
| `send_route_fallback` | Ask the sales route to forward to the correct legal / commercial owner if needed. |
| `preview_generation_spend` | `hold` |
| `user_selectable_catalog_status` | `blocked_until_written_confirmation` |

## Submission Log

| Field | Value |
|---|---|
| `submitted_at` | 2026-05-07 |
| `submitted_by` | Yana Li |
| `submitter_email` | `founder@orpheusnarration.com` |
| `company` | Orpheus Narration |
| `company_website` | `https://orpheusnarration.com` |
| `route_used` | `https://inworld.ai/contact-sales` |
| `submitted_body` | Ready-to-send copy below |
| `browser_result` | Official form submitted; no browser ticket or confirmation ID shown. |
| `ticket_or_thread_id` | `pending_email_confirmation` |
| `next_action` | Check `founder@orpheusnarration.com`, retain any auto-reply or supplier response beside this packet, then classify the rights verdict. |

## Source Snapshot

| Source | Checked | Retained readout |
|---|---:|---|
| `https://inworld.ai/contact-sales` | 2026-05-07 | Official contact route for scaling, integrating TTS, enterprise needs, and early access to research previews. |
| `https://docs.inworld.ai/tts/voice-design` | 2026-05-07 | Voice Design can create previews from text descriptions and scripts; selected voices can be saved and later used via API with a `voiceId`; the feature is described as research preview. |
| `https://docs.inworld.ai/api-reference/voiceAPI/voiceservice/publish-voice` | 2026-05-07 | Publishing a preview voice returns a voice resource with `voiceId` and source metadata; the page confirms the selected voice can be promoted into the voice library. |
| `https://inworld.ai/terms` | 2026-05-07 | Public terms include an output assignment posture, a non-sublicensable service license, and termination language requiring deletion of Services, Models, and Outputs. |
| `https://inworld.ai/service-specific-terms` | 2026-05-07 | Voice and speech terms allow downloaded Output from some services to be used outside the Services, subject to terms and AUP. |
| `https://inworld.ai/aup/` | 2026-05-07 | AUP blocks impersonation without consent/legal right and requires appropriate AI disclosure where relevant. |

## Ready-To-Send Copy

Subject:

```text
Confirmation request for prompt-designed voices in Orpheus SaaS catalog
```

Body:

```text
Hello Inworld team,

We are evaluating Inworld TTS and Voice Design for Orpheus, a SaaS product for long-form educational narration. We are not planning to offer public self-serve voice cloning.

Our intended use is platform-controlled prompt-designed voices:

1. Orpheus writes safe text descriptions that avoid real-person, celebrity, creator, brand, political-figure, and soundalike prompts.
2. Orpheus generates short previews, selects/publishes a voice, and stores the provider voiceId only server-side.
3. Orpheus makes approved platform voices available in our product voice picker so users can generate narration.
4. Users do not download, own, export, resell, or receive the underlying voice, prompt, model, clone/source asset, or provider voiceId.
5. Users download only generated long-form narration audio when their Orpheus plan allows it.

Could you confirm the following in writing?

1. May Orpheus offer Inworld prompt-designed voices as selectable platform voices inside our SaaS product?
2. Does this use count as B2B2C, resale, sublicensing, marketplace use, or making Inworld services available to end users?
3. Can audio generated during an active paid subscription or contract continue to be used commercially after cancellation or non-renewal?
4. Can the hosted voiceId remain callable after cancellation, non-renewal, account closure, or plan downgrade?
5. Your public materials support publishing a designed voice to a reusable voiceId, while the Terms include termination language requiring deletion of Services, Models, and Outputs. How should we interpret this for already-rendered customer audio files, retained catalog samples, and the hosted voiceId?
6. Are prompt-designed voices exclusive to our account, non-exclusive, or potentially similar to voices generated for other customers?
7. Are generated audio outputs allowed for monetized YouTube videos, podcasts, ads, audiobooks, educational courses, and social video?
8. Are standalone sample packs, voice packs, voice-library resale, model-training datasets, or downstream resale of voice access prohibited?
9. Are there AI disclosure, watermark, traceability, or metadata obligations we must pass through to Orpheus users?
10. Is Voice Design currently production/commercial-ready for this use, or does any research-preview / beta restriction apply?
11. Which paid plan, startup plan, order form, enterprise addendum, DPA, or SLA path would be required for this use?

We are looking for clean written rights and usage confirmation before generating or exposing platform voices. We are happy to use the correct paid or enterprise path if needed.
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
10. `output_deletion_interpretation`
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

1. `inworld_prompt_voice_design=technically_viable_rights_blocked_for_user_selectable_catalog`
2. `platform_voice_generation_spend=hold_until_supplier_answers`
3. `voice_selector_model=platform_voice_choice_for_generation_only`
4. `downloaded_user_asset=generated_longform_audio_only`
