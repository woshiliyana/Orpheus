# Distribution and Growth Surface

> Status: approved
> Normative: yes
> Canonical owner: Product + growth architecture
> Consumers: product, growth, frontend, content, SEO, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/guest-trial-identity.md`, `/docs/prd/specs/pricing-packaging-and-unit-economics.md`, `/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`
> Supersedes: distribution rules implied only by PRD summary or roadmap phase wording
> Last reviewed: 2026-04-23

## Purpose

This spec defines the V1 distribution surface for Orpheus: homepage promise, the first technical-feasibility boundary, no-login trial role, tool-page matrix, and the boundary between EN/ES output readiness, English-first workspace UI, and multilingual landing pages. It exists so marketing, roadmap, and plan docs do not invent separate funnel rules.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `product page` | A page that represents real product capability and must match current entitlements and workflow truth |
| `distribution page` | A page optimized for discovery and acquisition, but still bound by product truth |
| `tool page` | A focused distribution page built around one clear creator job and one low-friction CTA |
| `seo_landing_page` | A search-facing page localized for discovery rather than a fully localized product workflow |
| `primary_funnel` | The shortest path from landing to real trial output |
| `core_hook` | The shortest public sentence that explains why Orpheus exists |

## Decision Tables

### 1. V1 Surface Taxonomy

| Surface | V1 status | Truth owner |
|---|---|---|
| English homepage | Required first gate | This spec + PRD homepage IA |
| English pricing page | Later V1 layer, only after the pricing spec, entitlements, and proven stable-audio envelope agree | This spec + `pricing-packaging-and-unit-economics.md` |
| English workspace and project workflow | Required first gate | PRD/spec workflow docs |
| No-login trial entrypoint | Later V1 layer | This spec + `guest-trial-identity.md` |
| Tool page: `script-to-voice` | Later V1 layer | This spec |
| Tool page: `voice-comparison` | Later V1 layer | This spec |
| Tool page: `audio-to-srt` | Optional later expansion | This spec |
| Tool page: `youtube-disclosure-generator` | Optional expansion | This spec |
| Multilingual SEO landing pages | Later V1 layer for selected locales | This spec + `content-source-governance.md` |
| Non-English full workspace | Not part of V1 | Not promised in V1 |

### 2. Homepage / Hero Constraints

| Rule | Required in V1 |
|---|---|
| Name the target audience directly | Yes |
| Lead with stable long-form narration promise | Yes |
| Lead with low-friction trial immediately | No, not before technical feasibility is proven |
| Promise a concrete result, not generic AI capability | Yes |
| Promise stable long-text-to-audio for explainer creators | Yes |
| Mention many starter voice choices for free users as the lead hook | No |
| Mention subtitles or automated visuals as already solved in the first release | No |
| Claim unlimited free usage | No |
| Claim full multilingual product support in V1 | No |
| Claim self-serve clone access for everyone | No |
| Lead with `supports long text` as the differentiator | No |

### 3. Core Hook and Product Story

| Element | Current working rule |
|---|---|
| `core_hook` | `Paste the whole script once. Get stable narration with subtitle-ready timing.` |
| Supporting line | `Built for English educational explainer creators who want publish-ready narration without manually chunking long scripts.` |
| Evidence extension | May mention backend-owned delivery, cleaner workflow, and later subtitle / repair path |
| What the hook must attack | Manual chunking, reroll fatigue, and publish friction |
| What the hook must not imply | Unlimited free usage, all-language workspace support, or public subtitle export being fully solved on day one |

### 4. Trial Funnel Rules

| Step | Rule |
|---|---|
| Entry | Before hosted feasibility is proven, homepage may use demo, waitlist, or founder-led onboarding instead of public trial |
| First value moment | The first promised value is stable long-form narration output, not a broad workflow bundle |
| Signup gating | Public trial and plan gating should not move ahead of technical feasibility proof |
| Pricing rollout | Public pricing should not launch until the pricing spec, entitlement matrix, and proven stable-audio envelope agree |
| Trial truth | Any future trial promise must remain within `guest_trial` rules and the actual stable-audio envelope |
| Guest demo adaptation | If a no-login demo exists later, it should be a bounded short-script experience, not full free long-form generation |

### 5. Language Boundary

| Surface | V1 boundary |
|---|---|
| Stable narration output promise | English + Spanish |
| Subtitle / timing / alignment readiness promise | English + Spanish |
| Workspace UI | English-first |
| Public landing pages | Public pages may be localized selectively |
| Non-English full workspace | Not part of the first full end-user promise |
| Localization promise | Public pages may localize beyond the workspace, but V1 does not promise a non-English full workspace |

### 6. Tool Page Matrix

| Tool page | V1 role | Primary CTA |
|---|---|---|
| `script-to-voice` | Later-layer acquisition surface after stable-audio feasibility is proven | Request access or join waitlist |
| `voice-comparison` | Later-layer voice positioning surface after stable-audio feasibility is proven | Explore voice positioning or request access |
| `audio-to-srt` | Workflow credibility and SEO expansion after the stable-audio path exists | Request access for subtitle workflow |
| `youtube-disclosure-generator` | Creator-adjacent acquisition and trust builder | Generate disclosure text, then move to narration workflow |

### 7. Allowed Distribution Promises

| Promise type | Allowed in V1 |
|---|---|
| Stable long-form narration for educational explainer creators | Yes |
| English + Spanish output and timing readiness | Yes |
| Many AI starter voices in the active V1 niche cluster as a first-wave promise | No |
| Flagship voices with stronger consistency for paid plans | Yes, but not as the first technical promise |
| No-login real trial | Yes, but only after technical feasibility is proven |
| Unlimited free narration | No |
| All-language full workflow support | No |
| Broad self-serve clone for free users | No |
| Subtitle-ready timing / alignment-backed delivery value | Yes, if described honestly and not overpromised as public export on day one |

### 8. Raphael-Style Adaptation Rules

| Pattern | Allowed adaptation for Orpheus | Not allowed |
|---|---|---|
| Low-friction entry | Yes. Use no-login or low-login first touch when technically and economically safe | Turning long-form audio into a free-for-all |
| Clean plan ladder | Yes. Use one default paid plan and one heavier plan | Plan sprawl with unclear upgrade logic |
| Queue / priority differentiation | Yes | Hiding core value behind jargon or opaque credits |
| Privacy / no-ad / no-watermark cues | Yes, where truthful | Pretending privacy alone is the product |
| Unlimited slow free tier | No for long-form audio | Copying image-economics language into audio |

## Narrative Notes

1. V1 may still borrow Raphael-style distribution patterns, but public promises must not move ahead of the stable-audio feasibility boundary.
2. Distribution pages may be sharper and more specific than the product shell, but they must still reflect current product truth.
3. The first public promise is `Paste the whole script once. Get stable narration with subtitle-ready timing.`, not `free forever for everything` and not `full AI video automation`.
4. Raphael-style packaging cues such as clean entry, clearer upgrade tiers, queue differences, and privacy positioning are allowed; Raphael-style unlimited free usage is not.
5. Orpheus must not talk like long-form AI narration is an empty category. Existing products already handle long-form generation. The first public promise has to win on stability, creator-fit workflow, and alignment-ready delivery, not on the vague claim that long scripts are possible.
6. The first gate may promise English and Spanish output / timing readiness while still keeping the workspace UI English-first.
7. The core hook should be concrete enough that a creator can repeat it to a friend without needing a demo video to decode it.

## Update Checklist

1. Re-check PRD sections `1`, `4`, `8`, `17`, `19`, `26`, and `27` after any change.
2. Re-check roadmap phases `0`, `1`, and `7` if funnel or page taxonomy changes.
3. Re-check `capability-entitlements.md` if starter-library or flagship-library messaging changes.
4. Re-check `pricing-packaging-and-unit-economics.md` if public pricing, minute copy, or plan positioning changes.
5. Re-check the competitive benchmark review if public-market pressure shifts and the core hook or guest-demo posture needs to adapt.
