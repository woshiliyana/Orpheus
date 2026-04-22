# Project and Run Lifecycle

> Status: approved
> Normative: yes
> Canonical owner: Backend architecture
> Consumers: backend, frontend, support, ops, agents
> Depends on: `/docs/prd/source-of-truth-index.md`, `/docs/prd/specs/capability-entitlements.md`
> Supersedes: informal lifecycle wording in `/docs/prd/prd.md`
> Last reviewed: 2026-04-22

## Purpose

This spec defines the canonical lifecycle for projects and project runs. Frontend UI, queue execution, support tooling, and billing interpretation must all use these statuses and failure stages.

## Canonical Terms

| Term | Canonical meaning |
|---|---|
| `project_status` | The user-facing state of the overall project |
| `project_run_status` | The machine-facing state of a specific execution attempt |
| `failure_stage` | The stage where a run failed when `project_run_status=failed` |
| `usable_audio` | A delivered audio artifact the user is entitled to download |

## Decision Tables

### 1. Project Statuses

| `project_status` | Meaning | User-visible interpretation |
|---|---|---|
| `draft` | Project exists but has not been submitted to run | Not started |
| `queued` | Latest submitted run is waiting for work | Waiting in queue |
| `running` | Latest run is actively validating, rendering, aligning, or packaging | In progress |
| `needs_attention` | Latest run ended in a recoverable or user-action-required state | Needs review or repair |
| `completed` | Latest run produced all entitled outputs successfully | Done |
| `completed_with_warnings` | Latest run produced usable audio but at least one non-audio output is missing or degraded | Done with warning |
| `failed` | Latest run ended without usable entitled audio and no automatic recovery remains | Failed |
| `canceled` | Active work was canceled by user or admin | Canceled |
| `archived` | Project is hidden from default lists and is read-only | Archived |

### 2. Project Run Statuses

| `project_run_status` | Meaning |
|---|---|
| `queued` | Accepted and waiting to start |
| `validating` | Input, entitlement, and provider pre-checks are running |
| `rendering` | Audio generation is running |
| `aligning` | Subtitle or alignment generation is running |
| `packaging` | Final assets are being stitched, stored, and prepared for delivery |
| `succeeded` | Run completed with all entitled outputs available |
| `succeeded_with_warnings` | Run completed with usable audio but some non-audio outputs missing or degraded |
| `failed` | Run ended unsuccessfully and `failure_stage` explains where |
| `canceled` | Run was stopped intentionally |

### 3. Failure Stage Enum

| `failure_stage` | Meaning |
|---|---|
| `input_validation` | Script, file, or request payload failed validation |
| `entitlement_check` | The request was not allowed for the current plan or rollout state |
| `provider_precheck` | Provider quota, auth, or readiness check failed before rendering started |
| `rendering` | Audio generation failed before usable audio existed |
| `alignment` | Subtitle or alignment generation failed after audio generation |
| `packaging` | Stitching, artifact packaging, or storage finalization failed |
| `delivery` | Final delivery handoff failed after assets were generated |
| `canceled_by_user` | User canceled the run |
| `canceled_by_admin` | Admin canceled the run |

### 4. Allowed Run Transitions

| From | To |
|---|---|
| `queued` | `validating`, `canceled` |
| `validating` | `rendering`, `failed`, `canceled` |
| `rendering` | `aligning`, `failed`, `canceled` |
| `aligning` | `packaging`, `succeeded_with_warnings`, `failed`, `canceled` |
| `packaging` | `succeeded`, `succeeded_with_warnings`, `failed`, `canceled` |
| `succeeded` | terminal |
| `succeeded_with_warnings` | terminal |
| `failed` | terminal |
| `canceled` | terminal |

### 5. Project Status Derivation

| Latest run outcome | Derived `project_status` |
|---|---|
| No submitted run | `draft` |
| Latest run `queued` | `queued` |
| Latest run in active execution | `running` |
| Latest run `succeeded` | `completed` |
| Latest run `succeeded_with_warnings` | `completed_with_warnings` |
| Latest run `failed` with recoverable follow-up possible | `needs_attention` |
| Latest run `failed` without usable entitled audio and no automated recovery remains | `failed` |
| Latest run `canceled` | `canceled` |

### 6. User Copy, Retry, and Billing Interpretation

| Run outcome | Default user copy | Retryable | Billing interpretation |
|---|---|---|---|
| `failed` + `input_validation` | Request needs fixing before running | Yes after user fix | Non-billable |
| `failed` + `entitlement_check` | Plan or rollout does not allow this action | No until entitlement changes | Non-billable |
| `failed` + `provider_precheck` | Provider unavailable before generation started | Yes | Non-billable |
| `failed` + `rendering` | Audio generation failed before output | Yes | Non-billable |
| `succeeded_with_warnings` + missing SRT | Audio is ready; subtitles need retry or support follow-up | Yes | Audio billable, no extra subtitle charge |
| `failed` + `alignment` after audio success | Audio ready; subtitles failed | Yes | No extra charge beyond audio usage |
| `failed` + `packaging` or `delivery` after asset creation | Output temporarily unavailable | Yes | No extra usage charge |

## Narrative Notes

1. Project status is derived from the latest run and available artifacts; it is not a free-form label.
2. Partial repair creates a new `project_run`; it never mutates the historical meaning of the previous run.
3. Support and ops should reference `failure_stage` before promising credits or retries.

## Update Checklist

1. Re-check `billing-usage-semantics.md` if any stage becomes billable or non-billable.
2. Re-check PRD sections `6.3`, `15`, `16.5`, and `19.9-19.10` after lifecycle changes.
3. Re-check `guest-trial-identity.md` if guest runs are allowed to behave differently from registered runs.
