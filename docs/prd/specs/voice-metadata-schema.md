# Voice Metadata Schema

> Status: approved
> Normative: yes
> Canonical owner: Data / backend architecture
> Consumers: backend, frontend, content, ops, agents
> Depends on: `/docs/prd/source-of-truth-index.md`
> Supersedes: field ownership ambiguity in `/docs/prd/prd.md`
> Last reviewed: 2026-04-22

## Purpose

This spec defines where voice metadata lives, which fields are canonical runtime truth, and how multi-valued voice attributes are stored without creating a second schema inside page content.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `logical field` | A product-facing metadata field such as `primary_language` or `hot_tags` |
| `physical storage` | The table and column family where the field is stored at runtime |
| `typed tag` | A normalized `voice_tags` entry with an explicit tag category |

## Decision Tables

### 1. Canonical Ownership Split

| Area | Canonical owner |
|---|---|
| Structured runtime metadata for voices | Database-backed voice catalog |
| Localized narrative copy for voices | Content source records keyed by `voice_id` |
| Rights and source proof artifacts | `voice_assets` and related asset records |

### 2. Field Placement Matrix

| Logical field | Physical storage | Cardinality | Required | Primary consumers |
|---|---|---|---|---|
| `voice_id` | `voices.id` | one | yes | all systems |
| `library_tier` | `voices.library_tier` | one | yes | entitlement, ops, frontend |
| `source_type` | `voices.source_type` | one | yes | ops, compliance |
| `provider` | `voices.provider` | one | yes | backend, ops |
| `primary_language` | `voices.primary_language` | one | yes | frontend, SEO, recommendation |
| `supported_languages` | `voice_tags` with `tag_type='supported_language'` | many | no | frontend, recommendation |
| `primary_niche` | `voices.primary_niche` | one | yes | SEO, recommendation |
| `content_formats` | `voice_tags` with `tag_type='content_format'` | many | no | recommendation, filtering |
| `hot_tags` | `voice_tags` with `tag_type='hot_tag'` | many | no | SEO, discovery |
| `persona_primary` | `voices.persona_primary` | one | yes | frontend, marketing |
| `persona_secondary` | `voices.persona_secondary` | one | no | discovery, marketing |
| `emotion_profile` | `voices.emotion_profile` | one structured text/json | yes | frontend, generation |
| `commercial_status` | `voices.commercial_status` | one | yes | compliance, entitlement |
| `rights_proof` | `voice_assets.rights_proof_ref` | one or many asset references | yes for platform-designed and cloned voices | compliance, ops |
| `visibility` | `voices.visibility` | one | yes | frontend, ops |

### 3. Typed Tag Rules

| `tag_type` | Meaning |
|---|---|
| `supported_language` | Secondary languages a voice may support |
| `content_format` | Supported creation formats such as `Deep-dive analysis` |
| `hot_tag` | Discovery and SEO tags such as `true crime` |

### 4. Non-Negotiable Schema Rules

| Rule | Meaning |
|---|---|
| No copy-owned metadata truth | Content pages may not redefine structured fields like `supported_languages` or `commercial_status` |
| No hidden enum drift | New values for `library_tier`, `visibility`, or `commercial_status` require a schema update here first |
| No untyped tags | Multi-valued voice metadata must declare `tag_type` |

## Narrative Notes

1. This spec deliberately keeps the current logical table set (`voices`, `voice_assets`, `voice_tags`) while tightening field ownership.
2. Using typed `voice_tags` resolves multi-valued fields without forcing every list into a new table before implementation exists.
3. Voice copy can be localized in the content system, but the runtime schema owns structured truth.

## Update Checklist

1. Re-check PRD sections `10.7`, `12`, and `15` after field placement changes.
2. Re-check `content-source-governance.md` if localized voice records start carrying new structured fields.
3. Re-check `capability-entitlements.md` if visibility or commercial status changes affect plan access.
