# PRD Agent Conventions

> Status: approved
> Normative: yes
> Canonical owner: Product architecture / PRD maintainers
> Consumers: all documentation authors, all agents
> Depends on: none
> Supersedes: ad hoc wording and free-form rule duplication
> Last reviewed: 2026-04-22

## Purpose

This file defines how the PRD documentation system is written so that both humans and agents can consume it without inventing missing rules.

## Canonical Terms

| Term | Canonical meaning | Disallowed aliases |
|---|---|---|
| `project` | The user-facing long-form job container that owns source script, selected voice, assets, and run history | task, job, episode |
| `project_run` | One execution attempt on a project, including full generation or partial repair | attempt, retry job, run job |
| `capability` | A platform-level workflow ability such as SRT export or private clone creation | feature right, hidden perk |
| `entitlement` | The user-facing permission to access a capability under a specific plan or rollout state | generic "support" without matrix |
| `usage_event` | A positive or zero-usage accounting record produced by workflow execution | usage line, credit deduction |
| `billing_event` | A billing-side record such as subscription change, compensation, refund, or invoice event | payment log, finance note |
| `guest_trial_session` | The anonymous trial identity created before registration | guest user, temp account |
| `canonical owner` | The single document or system that has final authority over a field or rule | shared owner, loose reference |

## Normative Writing Rules

1. If a statement changes product behavior, it must live in a normative document.
2. Normative documents must include these sections in order:
   - `Status`
   - `Normative`
   - `Canonical owner`
   - `Consumers`
   - `Depends on`
   - `Supersedes`
   - `Last reviewed`
   - `Canonical Terms`
   - `Decision Tables`
   - `Narrative Notes`
   - `Update Checklist`
3. Final decisions must appear in tables, enums, or bullet lists with explicit values.
4. Narrative paragraphs may explain a rule, but may not introduce a new rule.
5. Every PRD section that depends on a normative spec must say `执行真源`.

## Single-Hop Navigation Rule

1. A reader should be able to move from the PRD summary section to the execution source in one click.
2. A spec may depend on other specs, but it may not force a reader through a long chain to answer a simple question.
3. If a topic needs more than one spec to answer a routine question, the boundary is wrong and should be tightened.

## Allowed and Disallowed Language

### Allowed

1. Explicit rollout states such as `closed_beta`, `open`, `manual_enable`.
2. Explicit plan names such as `guest_trial`, `Free`, `Pro`, `Ultimate`.
3. Explicit status values such as `queued`, `running`, `failed`, `completed_with_warnings`.

### Disallowed unless immediately defined by a matrix

1. `基础`
2. `更强`
3. `更完整`
4. `高阶`
5. `适量`
6. `酌情`

## Write Ownership and Parallel Safety

1. Each canonical file has one `write owner` in the source-of-truth index.
2. If a task touches a canonical file and the PRD summary that references it, those edits should stay in one worker whenever possible.
3. Parallel work is safe only when files are disjoint and the source-of-truth index marks them as safe together.
4. Agents must not create a second "temporary rules" file outside the canonical set.

## Duplication Policy

1. The PRD may keep product summary text.
2. The PRD may not keep the full normative matrix when a spec exists.
3. Marketing copy may reference plan differences, but exact gating belongs to the entitlement spec.
4. Database overviews may list logical entities, but exact field ownership belongs to the schema spec.

## Update Checklist

1. When a normative table changes, update the canonical spec first.
2. Confirm the source-of-truth index still points to the right file.
3. Collapse any duplicate rule tables in summary docs.
4. Run a keyword scan for the changed term across `docs/prd/` before closing the change.
