# PRD Source of Truth Index

> Status: approved
> Normative: yes
> Canonical owner: Product architecture / PRD maintainers
> Consumers: product, design, frontend, backend, ops, support, agents
> Depends on: `/docs/prd/prd.md`
> Supersedes: implicit "search the PRD and guess" workflow
> Last reviewed: 2026-04-27

## Purpose

This file is the navigation layer for the documentation system. Every high-risk topic gets one execution source. Agents and humans should start here when they need the final rule for a topic.

## Canonical Rules

1. Change the canonical document first.
2. Update this index second.
3. Update the PRD summary section third.
4. Do not keep a second complete rule table anywhere else.

## Topic Index

| Topic | Canonical document | PRD summary sections | Primary consumers | Write owner | Parallel safe with | Notes |
|---|---|---|---|---|---|---|
| Documentation protocol | [`agent-conventions.md`](./agent-conventions.md) | `文档维护规则` and all sections that reference execution sources | all teams, all agents | product architecture | all specs except PRD summary edits | Defines how normative docs are written and linked |
| MkSaaS boundary | [`specs/mksaas-boundary-contract.md`](./specs/mksaas-boundary-contract.md) | `14. 模板与上站策略`, `18.6 与 MkSaaS 的融合方式` | product, backend, frontend, architecture | platform architecture | safe with issue specs after framework is in place | Template cannot define business semantics |
| Capability entitlements | [`specs/capability-entitlements.md`](./specs/capability-entitlements.md) | `6.2 音色入口`, `6.4 交付结果`, `7.2 SRT 标准`, `7.3 局部修复`, `19.5-19.8` | product, growth, frontend, support, ops | product | safe with lifecycle, billing, guest specs | Owns clone scope and user-facing capability matrix |
| Project and run lifecycle | [`specs/project-run-lifecycle.md`](./specs/project-run-lifecycle.md) | `6.3 生成工作流`, `15. 数据库与租户策略`, `16. 项目与运行视图`, `19.9-19.10` | backend, frontend, support, ops | backend architecture | safe with capability and billing specs | Owns canonical statuses, failure stages, and artifact-manifest meaning |
| Narration input and pacing | [`specs/narration-input-and-pacing.md`](./specs/narration-input-and-pacing.md) | `5.2 体验原则`, `22. 技术约束` | product, frontend, backend, ops, support | product + backend architecture | safe with quality and lifecycle specs after manifest fields are coordinated | Owns readable-script input rules, pacing modes, provider input adapter limits, and adapter evidence |
| Billing and usage semantics | [`specs/billing-usage-semantics.md`](./specs/billing-usage-semantics.md) | `19.3-19.11`, `15. usage_ledger / billing_events` | billing, backend, support, product, ops | product + backend | safe with capability, lifecycle, guest specs | Owns metering, compensation, and display-balance rules |
| Pricing, packaging, and unit economics | [`specs/pricing-packaging-and-unit-economics.md`](./specs/pricing-packaging-and-unit-economics.md) | `19.2-19.8` | product, growth, billing, ops, support, frontend | product + finance / ops | safe with capability, billing, distribution specs | Owns price anchors, included minutes, guardrails, workbook relationship, formulas, and plan-update triggers |
| Guest trial identity | [`specs/guest-trial-identity.md`](./specs/guest-trial-identity.md) | `8. V1 范围`, `15. 租户模型`, `19.3 免费层策略`, `22.7 风控阈值` | auth, growth, backend, support, ops | auth / backend | safe with billing and lifecycle specs | Owns anonymous trial identity and claim flow |
| Distribution and growth surface | [`specs/distribution-and-growth-surface.md`](./specs/distribution-and-growth-surface.md) | `1. 产品摘要`, `4. 目标用户`, `8. V1 范围`, `17. Discoverability Layer`, `19.3-19.8`, `26. 首页信息架构`, `27. 设计与视觉系统` | product, growth, frontend, SEO, content | product + growth architecture | safe with roadmap/plans once truth exists | Owns hero promise, tool pages, EN/ES output promise vs English-first workspace UI, and landing-page boundary |
| Content source governance | [`specs/content-source-governance.md`](./specs/content-source-governance.md) | `12. Content Source of Truth`, `17. Discoverability Layer` | product, design, frontend, SEO, content ops | content system owner | safe with voice schema after framework is in place | Owns publish flow and content ownership |
| Voice metadata schema | [`specs/voice-metadata-schema.md`](./specs/voice-metadata-schema.md) | `10.7 音色元数据模型`, `12. Content Source of Truth`, `15. 数据库与租户策略` | backend, frontend, content, ops | data / backend architecture | safe with content governance after framework is in place | Owns field placement and canonical field ownership |
| QualityOps and automation | [`specs/quality-ops-and-automation.md`](./specs/quality-ops-and-automation.md) | `16. 运营后台与管理视图`, `22.2 邮件系统`, `22.3 定时任务系统` | product, ops, backend, support, frontend | product + ops architecture | safe with roadmap/plans once truth exists | Owns quality scorecard, dashboard scope, and automation taxonomy |

## Execution Orchestration Docs

These docs own sequencing and execution planning only. They do not own product rules and must not override `docs/prd/`.

| Doc | Role | Canonical owner | Notes |
|---|---|---|---|
| [`/docs/roadmap/roadmap.md`](../roadmap/roadmap.md) | Phase order, milestone sequencing, parallelization guidance | product architecture / delivery | Execution-order truth |
| [`/docs/plans/README.md`](../plans/README.md) | Plan library contract and work-package planning rules | product architecture / delivery | Execution-plan truth |

## Reference and Market-Check Docs

These docs inform pricing and rollout decisions but do not override canonical specs by themselves.

| Doc | Role | Canonical owner | Notes |
|---|---|---|---|
| [`/docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`](./reviews/2026-04-23-competitive-benchmark-longform-audio.md) | Current public market and packaging benchmark for long-form narration | founder + product | Required input before broader pricing or trial rollout |

## Update Checklist

1. If a new high-risk topic appears, add it here before updating the PRD.
2. If a canonical document is renamed, update this index and every PRD execution-source link in the same change.
3. If two documents start carrying the same complete rule table, keep the canonical one and collapse the other to a summary plus link.
