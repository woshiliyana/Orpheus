# MkSaaS Boundary Contract

> Status: approved
> Normative: yes
> Canonical owner: Platform architecture
> Consumers: frontend, backend, product, architecture, agents
> Depends on: `/docs/prd/prd.md`, `/docs/prd/agent-conventions.md`
> Supersedes: implicit assumption that template defaults are product rules
> Last reviewed: 2026-04-22

## Purpose

`MkSaaS` remains the default product shell, but it is not allowed to define Orpheus business semantics. This contract defines which template capabilities may be borrowed directly and which capabilities must be overridden by Orpheus-owned services, adapters, and normative specs.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `template shell` | UI, routing, and scaffolding borrowed from MkSaaS |
| `business semantics` | Product-specific plan rules, lifecycle rules, accounting rules, and compliance rules |
| `adapter takeover` | Wrapping or replacing a template default so Orpheus keeps semantic control |

## Decision Tables

### 1. Borrow vs Override Matrix

| Capability area | May borrow MkSaaS shell | May use MkSaaS default semantics as final truth | Orpheus integration rule |
|---|---|---|---|
| Marketing page layout | Yes | No | Copy and structure remain owned by PRD + content governance |
| Auth screens and session shell | Yes | No | Guest trial identity and claim flow override template assumptions |
| Billing UI shell | Yes | No | Plan gating and ledger semantics come from entitlement and billing specs |
| Admin shell / dashboard chrome | Yes | No | Admin views must reflect Orpheus lifecycle and risk states |
| i18n routing shell | Yes | No | Locale strategy and content publish flow come from content governance |
| Database starter schema | No as final truth | No | Existing tables may inspire implementation, but canonical schema is Orpheus-owned |
| Webhook handler patterns | Yes | No | Event mapping must follow Orpheus billing semantics and security rules |
| Queue / async helpers | Yes where useful | No | Run lifecycle and retry semantics are Orpheus-owned |

### 2. Explicitly Non-Delegable Product Semantics

| Topic | Why MkSaaS cannot own it | Canonical source |
|---|---|---|
| Plan entitlements | Template plans do not encode Orpheus audio workflow and gated capabilities | `capability-entitlements.md` |
| Guest trial identity | Template auth assumes registered users; Orpheus needs anonymous claim flow | `guest-trial-identity.md` |
| Project and run lifecycle | Template jobs do not define Orpheus rendering, alignment, and delivery stages | `project-run-lifecycle.md` |
| Usage and billing ledger | Template billing does not define billable seconds, partial repair, or compensation semantics | `billing-usage-semantics.md` |
| Private clone review | Template uploads do not define rights review or clone readiness rules | `capability-entitlements.md` |
| Content publish flow | Template content editing does not define Orpheus localized truth and approval flow | `content-source-governance.md` |
| Voice metadata ownership | Template data models do not define Orpheus taxonomy, SEO mapping, and compliance fields | `voice-metadata-schema.md` |

### 3. Integration Check Before Reusing a Template Module

| Question | Required answer before reuse |
|---|---|
| Is this module only UI/shell? | If `no`, do not adopt it without an Orpheus-owned adapter |
| Does it bring default status, plan, tenant, or billing semantics? | If `yes`, override or wrap it |
| Does it create a second source of truth? | If `yes`, reject the direct reuse |
| Can the module consume Orpheus canonical fields without renaming them? | If `no`, add an adapter boundary |

## Narrative Notes

1. The template can accelerate shipping, but only as a shell.
2. Orpheus owns its workflow semantics even when implementation starts from MkSaaS.
3. If template defaults and normative specs disagree, the specs win.

## Update Checklist

1. If MkSaaS is upgraded or replaced, re-review this contract before changing product docs.
2. If a new template module is introduced, confirm it does not become a hidden source of truth.
3. If billing, auth, or content behavior changes, re-check this contract alongside the relevant issue spec.
