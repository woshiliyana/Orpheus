# v0.40 + v0.41 Docs Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate `v0.40` as the primary docs overlay, layer `v0.41` benchmark/pricing/language refinements on top, archive the root-level `v0.41` import artifacts into one backup folder, and finish with a pushed `main` branch that represents the locked PRD/doc set.

**Architecture:** Treat the current repo as the canonical destination, not the bundle. Apply `v0.40` to the files it owns, promote selected `v0.41` content into truth and formal Phase 2 planning docs, preserve repo-only support docs, and re-apply the already-confirmed review guardrails where bundle content would otherwise regress them. Keep Markdown as the only canonical truth; store workbook/patch/handoff assets as formal companions or archived imports.

**Tech Stack:** Git, Markdown docs, Excel workbook artifact, shell verification (`git diff --check`, `rg`, `git status`)

---

## File Structure Lock

Before editing, use this file layout:

- Canonical truth:
  - `docs/prd/prd.md`
  - `docs/prd/source-of-truth-index.md`
  - `docs/prd/specs/*.md`
- Formal Phase 2 planning packet:
  - `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
  - `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
  - `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
  - `docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
  - `docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx`
- Supporting rationale / review:
  - `docs/prd/design-2026-04-23-longform-audio-wedge.md`
  - `docs/prd/reviews/2026-04-22-prd-review.md`
  - `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`
- Archived import artifacts:
  - `docs/superpowers/import-bundles/orpheus-v0.41/ORPHEUS_V0.41_INCREMENT_HANDOFF.md`
  - `docs/superpowers/import-bundles/orpheus-v0.41/orpheus_v0.41_increment.patch`
  - `docs/superpowers/import-bundles/orpheus-v0.41/orpheus_pricing_unit_economics_model_v0.41.xlsx`
  - `docs/superpowers/import-bundles/orpheus-v0.41/Orpheus_v0.41_increment_pack.zip`

## Task 1: Archive the root-level v0.41 import assets

**Files:**
- Create: `docs/superpowers/import-bundles/orpheus-v0.41/`
- Move: `ORPHEUS_V0.41_INCREMENT_HANDOFF.md`
- Move: `orpheus_v0.41_increment.patch`
- Move: `orpheus_pricing_unit_economics_model_v0.41.xlsx`
- Move: `Orpheus_v0.41_increment_pack.zip`

- [ ] **Step 1: Create the archive directory**

Run:

```bash
mkdir -p docs/superpowers/import-bundles/orpheus-v0.41
```

Expected: directory exists.

- [ ] **Step 2: Move the root-level v0.41 artifacts into the archive**

Run:

```bash
mv ORPHEUS_V0.41_INCREMENT_HANDOFF.md docs/superpowers/import-bundles/orpheus-v0.41/
mv orpheus_v0.41_increment.patch docs/superpowers/import-bundles/orpheus-v0.41/
mv orpheus_pricing_unit_economics_model_v0.41.xlsx docs/superpowers/import-bundles/orpheus-v0.41/
mv Orpheus_v0.41_increment_pack.zip docs/superpowers/import-bundles/orpheus-v0.41/
```

Expected: no `v0.41` loose files remain in repo root.

- [ ] **Step 3: Verify the root is clean of loose v0.41 files**

Run:

```bash
find . -maxdepth 1 \( -name '*v0.41*' -o -name 'ORPHEUS_V0.41*' -o -name 'orpheus_v0.41*' \) | sort
```

Expected: either no output or only ignored AppleDouble files if any remain.

- [ ] **Step 4: Commit the archive move together with the doc integration work, not separately**

Do not commit yet. This move belongs in the final integration commit.

## Task 2: Apply the v0.40-owned and v0.41-tightened truth docs

**Files:**
- Modify: `docs/prd/prd.md`
- Modify: `docs/prd/source-of-truth-index.md`
- Modify: `docs/prd/specs/capability-entitlements.md`
- Modify: `docs/prd/specs/billing-usage-semantics.md`
- Modify: `docs/prd/specs/distribution-and-growth-surface.md`
- Modify: `docs/prd/specs/project-run-lifecycle.md`
- Modify: `docs/prd/specs/quality-ops-and-automation.md`
- Modify: `docs/prd/specs/mksaas-boundary-contract.md`
- Create: `docs/prd/specs/pricing-packaging-and-unit-economics.md`
- Create: `docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md`

- [ ] **Step 1: Overlay the v0.40/v0.41 truth files from the bundles, but keep repo-only docs that the bundles do not own**

Source of truth for overlay order:

1. `v0.40` provides the base for overlapping files.
2. `v0.41` tightens:
   - pricing truth
   - distribution hook
   - benchmark reality
   - build/test gate references

Do not delete repo-only support docs such as:

```text
docs/prd/design-2026-04-23-longform-audio-wedge.md
docs/prd/validation-2026-04-23-pricing-interview-script.md
docs/prd/validation-2026-04-23-pricing-results-template.md
docs/prd/reviews/2026-04-22-prd-review.md
```

- [ ] **Step 2: Make pricing truth explicit in the source-of-truth index**

Ensure `docs/prd/source-of-truth-index.md` contains a row for:

```markdown
| Pricing, packaging, and unit economics | [`specs/pricing-packaging-and-unit-economics.md`](./specs/pricing-packaging-and-unit-economics.md) | `19.2-19.8` | ...
```

Expected: pricing ownership is discoverable from the index without reading PRD prose.

- [ ] **Step 3: Keep the workbook as non-canonical even after v0.41**

Ensure `docs/prd/specs/pricing-packaging-and-unit-economics.md` explicitly states:

```markdown
The workbook at `/docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx` is a required planning companion artifact, but it is not canonical truth. If the workbook and this Markdown spec diverge, the Markdown spec wins until both are reconciled in the same change.
```

Expected: no future agent can treat the workbook as a second pricing truth.

- [ ] **Step 4: Promote the v0.41 benchmark hook into truth**

Make sure the truth docs reflect:

```text
Paste the whole script once. Get stable narration with subtitle-ready timing.
```

This belongs in public-promise/distribution wording, not just in the handoff note.

- [ ] **Step 5: Expand language truth to EN/ES output + timing, while keeping workspace UI English-first**

Required truth outcomes:

```text
Output / stable narration promise: English + Spanish
Subtitle/timing/alignment readiness promise: English + Spanish
Landing pages: English + Spanish + Chinese allowed
Workspace UI: English first
Spanish workspace UI: next expansion layer
Chinese workspace UI: not part of the first full end-user promise
```

Expected: no truth doc still implies English-only output if EN/ES first gate is now approved.

- [ ] **Step 6: Keep benchmark detail in review, not in canonical truth**

The following should remain in:

```text
docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md
```

Examples:
- ElevenLabs packaging detail
- Murf / WellSaid comparison detail
- Raphael comparison detail
- why “supports long text” is not a moat

Expected: truth docs keep the decision, review doc keeps the explanation.

## Task 3: Update the formal Phase 2 planning packet

**Files:**
- Modify: `docs/roadmap/phases/phase-02-core-render-workflow.md`
- Modify: `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`
- Create: `docs/plans/phase-02-core-render/02-development-entry-checklist.md`
- Create: `docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md`
- Create: `docs/plans/phase-02-core-render/04-provider-evidence-scorecard-template.md`
- Create: `docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx`

- [ ] **Step 1: Keep the three validated review fixes in the feasibility plan**

Verify `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md` still contains:

```text
control-short
control-medium
control-long
```

And verify the design doc is only referenced as supporting rationale, not listed in `Depends on Truth Docs`.

- [ ] **Step 2: Expand the corpus to bilingual feasibility**

Update the feasibility packet so the frozen corpus is no longer English-only. The plan must define:

```text
EN control-short / medium / long
ES control-short / medium / long
```

The exact rule should freeze both language sets before benchmark execution begins.

Expected: Phase 2 can no longer “pass” on English-only evidence.

- [ ] **Step 3: Keep `Inworld-first`, but require same-cycle `Cartesia` benchmarking**

Ensure the agent build/test brief and the feasibility plan both require:

```text
Primary implementation path: Inworld
Required same-cycle benchmark path: Cartesia
```

Expected: no doc says “benchmark Cartesia later.”

- [ ] **Step 4: Keep the basic voice-selection gate**

Ensure Phase 2 still requires a basic English/Spanish-capable voice-selection path sufficient for the first gate, not a hidden internal single voice.

Expected: the gate is still a product path, not just a backend experiment.

- [ ] **Step 5: Place the workbook into the formal packet**

The workbook must live at:

```text
docs/plans/phase-02-core-render/05-pricing-unit-economics-model-v0.41.xlsx
```

Expected: the Phase 2 packet is complete in one directory.

## Task 4: Re-apply the mandatory review guardrails after overlay

**Files:**
- Modify: `docs/prd/specs/distribution-and-growth-surface.md`
- Modify: `docs/prd/prd.md`
- Modify: `docs/roadmap/phases/phase-02-core-render-workflow.md`
- Modify: `docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md`

- [ ] **Step 1: Preserve deferred tool-page behavior**

Ensure:

```markdown
| `script-to-voice` | Later-layer acquisition surface ... | Request access or join waitlist |
| `voice-comparison` | Later-layer voice positioning surface ... | Explore voice positioning or request access |
```

Expected: no immediate trial-entry CTA remains for deferred tool pages.

- [ ] **Step 2: Preserve the no-double-truth rule for the wedge design**

Expected:

```text
design-2026-04-23-longform-audio-wedge
```

may appear in `Reference` / `Supporting rationale`, but not in `Depends on Truth Docs`.

- [ ] **Step 3: Preserve the narrowed public funnel**

The docs must still avoid:

```text
Try Free
No-login immediate public trial
starter-library / flagship-voice bundle as first buying reason
```

as first-wave requirements.

- [ ] **Step 4: Preserve the site-structure narrowing**

The first gate must stay narrower than:

```text
full multilingual SEO rollout
tool-page rollout
broader public growth expansion
```

Expected: EN/ES output promise may expand, but first-gate scope still does not become full multilingual growth buildout.

## Task 5: Verify, review, commit, and push

**Files:**
- Modify: all files touched in Tasks 1-4

- [ ] **Step 1: Run structural verification**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 2: Run targeted semantic checks**

Run:

```bash
rg -n "Try a voice with no login|Compare voices, then start trial" docs/prd/specs/distribution-and-growth-surface.md || true
python3 - <<'PY'
from pathlib import Path
p=Path('docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md').read_text()
truth_block = p.split('## Depends on Truth Docs',1)[1].split('## In Scope',1)[0]
print('HAS_DESIGN_IN_TRUTH_DOCS', 'design-2026-04-23-longform-audio-wedge' in truth_block)
for token in ['control-short','control-medium','control-long']:
    print(token, token in p)
PY
```

Expected:

```text
HAS_DESIGN_IN_TRUTH_DOCS False
control-short True
control-medium True
control-long True
```

- [ ] **Step 3: Run a focused review pass on the final integrated packet**

Review these files together:

```text
docs/prd/prd.md
docs/prd/specs/distribution-and-growth-surface.md
docs/prd/specs/pricing-packaging-and-unit-economics.md
docs/plans/phase-02-core-render/01-hosted-longform-feasibility.md
docs/plans/phase-02-core-render/03-agent-build-and-test-brief.md
```

The review must confirm:

1. `v0.41` truth landed where intended
2. EN/ES boundary is reflected consistently
3. workbook is non-canonical
4. no prior review fix regressed

- [ ] **Step 4: Stage only the integrated docs and backup artifacts**

Run:

```bash
git add .gitignore \
  docs/prd/prd.md \
  docs/prd/source-of-truth-index.md \
  docs/prd/specs/*.md \
  docs/prd/reviews/2026-04-23-competitive-benchmark-longform-audio.md \
  docs/roadmap/phases/phase-02-core-render-workflow.md \
  docs/plans/phase-02-core-render/* \
  docs/superpowers/import-bundles/orpheus-v0.41/*
```

Expected: no loose root-level `v0.41` files remain staged outside the archive folder.

- [ ] **Step 5: Commit**

Run:

```bash
git commit -m "docs: integrate v0.40/v0.41 truth and phase-2 packet"
```

- [ ] **Step 6: Push**

Run:

```bash
git push origin main
```

Expected: push succeeds and `main` is up to date with `origin/main`.
