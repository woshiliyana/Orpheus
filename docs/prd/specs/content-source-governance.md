# Content Source Governance

> Status: approved
> Normative: yes
> Canonical owner: Content system owner
> Consumers: product, content, design, frontend, SEO, agents
> Depends on: `/docs/prd/source-of-truth-index.md`
> Supersedes: informal content-truth wording in `/docs/prd/prd.md`
> Last reviewed: 2026-04-22

## Purpose

This spec defines who owns content entities, where authoritative edits happen, and how content moves from draft to published without fragmenting into multiple hand-maintained copies.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `source record` | The version-controlled record that owns a content entity |
| `localized copy` | Human-readable content keyed by a canonical ID for a specific locale |
| `published` | Safe for runtime page generation |
| `deprecated` | Retained for history, but no longer used for new page generation |

## Decision Tables

### 1. Authoring Location

| Topic | Canonical authoring location |
|---|---|
| Product content source in V1 | Version-controlled structured content files inside the repo |
| PRD docs | Governance and requirements, not runtime copy source |
| Page components | Render published records only; never become authoring sources |

### 2. Content Ownership Matrix

| Entity | Canonical owner role | Notes |
|---|---|---|
| `positioning` | product | Owns hero promise, value framing, and core product statements |
| `plans` | product | Owns plan messaging keyed to entitlement specs |
| `legal_snippets` | product + legal/compliance | Owns consent text and rights notices |
| `languages` | content/SEO | Owns locale metadata and regional entry strategy |
| `faq_items` | content/support | Owns support-facing knowledge answers |
| `case_studies` | content/marketing | Owns narrative examples |
| `youtube_niches` | product + content | Owns niche taxonomy copy, not runtime voice schema |
| `personas` | product + content | Owns narrative persona framing |
| `voices` | content + voice ops | Owns localized marketing copy keyed by `voice_id`; structured metadata stays in the voice schema system |

### 3. Content Lifecycle

| State | Meaning | May drive runtime pages |
|---|---|---|
| `draft` | In authoring or under revision | No |
| `approved` | Reviewed and ready to publish | No |
| `published` | Live source for page generation | Yes |
| `deprecated` | Historical record retained for redirects or audits | No for new generation |

### 4. Publish Flow

| Step | Rule |
|---|---|
| Authoring | Edit the structured source record, not page JSX or PRD prose |
| Review | The canonical owner role reviews the change |
| Approval | Record moves to `approved` before publish |
| Publish | Runtime generation consumes only `published` records |
| Breaking change | If IDs, slugs, or plan names change, update linked runtime consumers in the same change |

### 5. Copy vs Reference Rules

| Surface | Rule |
|---|---|
| PRD | May summarize content architecture, but does not own live copy |
| Marketing pages | Must reference published content records |
| FAQ/help pages | Must reference published FAQ records |
| Voice pages | Must reference `voice_id` and pull localized copy from content records; structured metadata comes from the voice schema |
| Plan pages | Must reference plan copy records, but entitlement truth comes from `capability-entitlements.md` |

### 6. Localization Sync Rules

| Rule | Default |
|---|---|
| Default locale | Maintained first and reviewed before derivative locale work |
| Locale lag | Allowed temporarily, but stale locales stay in `draft` rather than publishing partial truth silently |
| Schema changes | Update all affected locale source records or mark them explicitly incomplete |

## Narrative Notes

1. V1 does not need a CMS to have governance; repo-based structured content is acceptable as long as it remains the only authoring source.
2. The content system owns narrative copy, not all structured metadata.
3. Plan entitlements and voice schema remain outside this doc on purpose to avoid dual truth.

## Update Checklist

1. Re-check PRD section `12` and `17` after any governance change.
2. Re-check `capability-entitlements.md` if plan copy starts promising new gated capabilities.
3. Re-check `voice-metadata-schema.md` if localized voice content starts carrying structured metadata fields.
