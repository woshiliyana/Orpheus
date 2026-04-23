# Distribution and Growth Surface

> Status: approved
> Normative: yes
> Canonical owner: Product + growth architecture
> Consumers: product, growth, frontend, content, SEO, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/capability-entitlements.md`, `/docs/prd/specs/guest-trial-identity.md`
> Supersedes: distribution rules implied only by PRD summary or roadmap phase wording
> Last reviewed: 2026-04-22

## Purpose

This spec defines the V1 distribution surface for Orpheus: homepage promise, no-login trial role, tool-page matrix, and the boundary between the English full product and multilingual SEO landing pages. It exists so marketing, roadmap, and plan docs do not invent separate funnel rules.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `product page` | A page that represents real product capability and must match current entitlements and workflow truth |
| `distribution page` | A page optimized for discovery and acquisition, but still bound by product truth |
| `tool page` | A focused distribution page built around one clear creator job and one low-friction CTA |
| `seo_landing_page` | A search-facing page localized for discovery rather than a fully localized product workflow |
| `primary_funnel` | The shortest path from landing to real trial output |

## Decision Tables

### 1. V1 Surface Taxonomy

| Surface | V1 status | Truth owner |
|---|---|---|
| English homepage | Required | This spec + PRD homepage IA |
| English pricing page | Required | This spec + `capability-entitlements.md` |
| English workspace and project workflow | Required | PRD/spec workflow docs |
| No-login trial entrypoint | Required | This spec + `guest-trial-identity.md` |
| Tool page: `script-to-voice` | Required | This spec |
| Tool page: `voice-comparison` | Required | This spec |
| Tool page: `audio-to-srt` | Optional expansion | This spec |
| Tool page: `youtube-disclosure-generator` | Optional expansion | This spec |
| Multilingual SEO landing pages | Required for selected locales | This spec + `content-source-governance.md` |
| Non-English full workspace | Not part of V1 | Not promised in V1 |

### 2. Homepage / Hero Constraints

| Rule | Required in V1 |
|---|---|
| Name the target audience directly | Yes |
| Lead with low-friction trial | Yes |
| Promise a concrete result, not generic AI capability | Yes |
| Mention many starter voice choices for free users | Yes |
| Mention full workflow value for paid users | Yes |
| Claim unlimited free usage | No |
| Claim full multilingual product support in V1 | No |
| Claim self-serve clone access for everyone | No |

### 3. Trial Funnel Rules

| Step | Rule |
|---|---|
| Entry | Homepage and required tool pages must expose a no-login trial CTA |
| First value moment | User should reach a real trial output before being forced into a full signup wall |
| Signup gating | Signup may be required to unlock longer usage, saved history, and paid-only workflow depth |
| Trial truth | Trial promise must remain within `guest_trial` rules and current starter-library access |

### 4. Language Boundary

| Surface | V1 boundary |
|---|---|
| English | Full product and full workflow |
| Other locales | SEO/distribution-first pages, not full translated workspace commitment |
| Localization promise | Public pages may be localized selectively; product workflow commitment remains English-first in V1 |

### 5. Tool Page Matrix

| Tool page | V1 role | Primary CTA |
|---|---|---|
| `script-to-voice` | Direct acquisition for long-script narration trial | Try a voice with no login |
| `voice-comparison` | Showcase starter and flagship voice positioning | Compare voices, then start trial |
| `audio-to-srt` | Workflow credibility and SEO expansion | Try subtitle extraction or move to paid workflow |
| `youtube-disclosure-generator` | Creator-adjacent acquisition and trust builder | Generate disclosure text, then move to narration workflow |

### 6. Allowed Distribution Promises

| Promise type | Allowed in V1 |
|---|---|
| Many AI starter voices in the active V1 niche cluster | Yes |
| Flagship voices with stronger consistency for paid plans | Yes |
| No-login real trial | Yes |
| Unlimited free narration | No |
| All-language full workflow support | No |
| Broad self-serve clone for free users | No |

## Narrative Notes

1. V1 borrows Raphael-style distribution patterns without copying Raphael's unlimited-free economics.
2. Distribution pages may be sharper and more specific than the product shell, but they must still reflect current product truth.
3. The funnel promise is "easy to try and rich in voice choice", not "free forever for everything".

## Update Checklist

1. Re-check PRD sections `1`, `4`, `8`, `17`, `19`, `26`, and `27` after any change.
2. Re-check roadmap phases `0`, `1`, and `7` if funnel or page taxonomy changes.
3. Re-check `capability-entitlements.md` if starter-library or flagship-library messaging changes.
