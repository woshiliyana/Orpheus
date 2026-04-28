# Narration Input and Pacing

> Status: approved
> Normative: yes
> Canonical owner: Product + backend architecture
> Consumers: product, frontend, backend, ops, support, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/project-run-lifecycle.md`, `/docs/prd/specs/quality-ops-and-automation.md`
> Supersedes: ad hoc narration-input guidance and package handoff notes
> Last reviewed: 2026-04-27

## Purpose

This spec defines the canonical input contract for long-form narration and the conservative pacing adapter used before provider requests. It exists so Orpheus can improve structural listening rhythm without rewriting the user's script, silently adding punctuation, or creating a second hidden product rule outside the PRD system.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `source_script` | The exact narration text submitted by the user or frozen evidence corpus |
| `spoken_script` | The content-equivalent script the system intends the provider to speak after any allowed non-lexical adapter step |
| `provider_input` | The exact text payload sent to a TTS provider after backend-owned input adaptation |
| `pacing_mode` | The requested pacing behavior for a narration run |
| `exact` | A pacing mode that sends the source script as provider input without Orpheus inserting pacing markup |
| `natural_basic` | The default pacing mode that may add only conservative structural pauses without changing user words |
| `input_validation_mode` | Whether readable-script issues block execution or are recorded as warnings |
| `input_quality_report` | The machine-readable report describing punctuation, paragraph, and run-on-script readiness |
| `pacing_plan` | The machine-readable plan describing inserted pauses, provider break-tag budget, token preservation, and warnings |
| `input_adapter_ref` | The artifact-manifest reference that ties a run to its source script, spoken script, provider input, pacing plan, and input-quality report |

## Decision Tables

### 1. User Input Contract

| Rule | Canonical value |
|---|---|
| Required input shape | Users must provide a readable narration script with sentence-ending punctuation when the script is long enough for punctuation to affect pacing |
| Paragraph guidance | Long scripts should preserve paragraph breaks so Orpheus can add structural pauses safely |
| Auto-punctuation | Not allowed in the first gate |
| Silent rewrite | Not allowed |
| User-side manual chunking | Not allowed as a product prerequisite |
| Frontend guidance | Ask the user to add punctuation or paragraph breaks rather than asking an LLM to repair the script silently |

### 2. Pacing Modes

| `pacing_mode` | Default | Provider input behavior | Intended use |
|---|---:|---|---|
| `natural_basic` | Yes | Adds only allowed structural pause markup when supported by the provider | Normal creator narration |
| `exact` | No | Sends source text as provider input without Orpheus pacing markup | Compliance copy, deliberate pacing, poetry, manually prepared provider input, or debugging |

### 3. Allowed `natural_basic` Pauses

| Structure | Pause | Rule |
|---|---:|---|
| Markdown heading boundary | `800ms` | Insert after a heading line |
| Paragraph boundary | `600ms` | Insert when non-empty content is followed by a blank-line break before more content |
| List item boundary | `350ms` | Insert between list items or list content lines when more non-empty content follows |

### 4. Disallowed Pacing Behavior

| Behavior | Allowed |
|---|---:|
| Insert one break after every sentence | No |
| Insert one break after every comma | No |
| Add emotion tags such as `[happy]` or `[sad]` | No |
| Add non-verbal tags such as `[sigh]`, `[laugh]`, or `[breathe]` | No |
| Add filler words such as `um` or `uh` | No |
| Add emphasis markers | No |
| Rewrite, summarize, expand, or reorder user content | No |
| Auto-infer sentence boundaries for a long unpunctuated script | No |

### 5. Provider Markup Rules

| Provider | `natural_basic` behavior | Budget rule |
|---|---|---|
| `inworld` | Render SSML `<break time="...ms" />` tags for allowed structural pauses | Each provider request must contain no more than `20` break tags |
| Other providers | Fall back to `exact` and record an adapter warning | No Orpheus pacing markup is inserted until the provider has an approved adapter |

### 6. Input Validation Modes

| `input_validation_mode` | Behavior |
|---|---|
| `strict` | Default. Long unpunctuated scripts, very sparse sentence punctuation, and very long run-on segments block before provider calls and produce a non-billable `input_validation` failure |
| `warn` | Records the same issues as warnings but allows internal smoke or diagnostic runs to proceed |

### 7. Required Input Adapter Evidence

| Artifact | Required | Meaning |
|---|---:|---|
| `source-script.md` | Yes | Exact user or corpus input |
| `spoken-script.md` | Yes | Content-equivalent spoken script after allowed adapter behavior |
| `provider-input.<provider>.txt` | Yes | Exact provider input |
| `provider-input.chunks.json` | Yes | Provider chunk IDs, character ranges, provider-input length, and break-tag counts |
| `pacing-plan.json` | Yes | Pacing mode, inserted breaks, token-preservation result, max break tags per request, and warnings |
| `input-quality-report.json` | Yes | Input validation status, issues, and recommendation |
| `artifact_manifest.input_adapter_ref` | Yes | Machine-readable bridge from the run to the input adapter evidence, including requested/effective pacing mode and input-validation mode |

## Narrative Notes

1. Natural pacing is a backend-owned input adapter, not a copywriting or script-editing feature.
2. The first gate prioritizes content preservation over theatrical speech. A less expressive but faithful output is preferable to a more dramatic output that adds meaning.
3. Inworld pause controls are allowed because SSML break tags are stable provider input and work across the relevant request modes and languages. Inworld emotion, delivery, and non-verbal markups remain out of scope because they are experimental and English-only.
4. The provider break-tag limit must be enforced before the request is sent. Orpheus must not rely on the provider silently ignoring excess tags.
5. `spoken_script` and `provider_input` are intentionally separate. Break tags may exist in provider input without becoming user-authored words.
6. Source-supplied provider markup in `exact` mode is still subject to provider request budgets. If an Inworld request would exceed the `20` break-tag limit, the run must block before provider calls and produce a non-billable `input_validation` failure with pacing evidence.
7. A strict input-validation block is not a provider failure and must not charge usage.

## Update Checklist

1. Re-check `project-run-lifecycle.md` if `input_adapter_ref`, `input_validation`, or artifact-manifest requirements change.
2. Re-check `quality-ops-and-automation.md` if input quality or pacing evidence becomes part of a new scorecard dimension.
3. Re-check `distribution-and-growth-surface.md` and PRD homepage copy if public wording starts implying script rewriting, auto-punctuation, or emotional performance control.
4. Re-check Phase 2 build, live-smoke, and evidence-artifact docs after any pacing-mode or input-validation behavior changes.
5. Re-check provider documentation before adding pacing markup for any non-Inworld provider.
