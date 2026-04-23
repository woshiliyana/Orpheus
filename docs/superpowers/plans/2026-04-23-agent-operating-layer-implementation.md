# Orpheus Agent Operating Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the repo-root agent operating layer and add one new repo-local skill, `orpheus-system-design`, without changing canonical product truth.

**Architecture:** Treat `AGENTS.md` and `AGENT_PROMPT_PLAYBOOK.md` as the fixed runtime entrypoint, add only the missing repo-local skill and its routing references, and preserve the current authority order where `docs/prd/*`, `docs/roadmap/*`, and `docs/plans/*` remain canonical. This is a docs-and-skill integration change only; it must not broaden product scope or rewrite Phase 2 truth.

**Tech Stack:** Git, Markdown docs, repo-local skill files under `.agents/skills/`

---

## File Structure Lock

These are the only files this change should touch:

- Create: `.agents/skills/orpheus-system-design/SKILL.md`
- Modify: `AGENTS.md`
- Modify: `AGENT_PROMPT_PLAYBOOK.md`
- Modify: `docs/ops/agent-execution-policy.md` only if the new skill needs one sentence of policy clarification

Do not touch:

- `docs/prd/*`
- `docs/roadmap/*`
- `docs/plans/phase-02-core-render/*`
- any pricing workbook or benchmark review file

## Task 1: Add the new repo-local skill

**Files:**
- Create: `.agents/skills/orpheus-system-design/SKILL.md`

- [ ] **Step 1: Read the existing Orpheus repo-local skills to match style and boundaries**

Run:

```bash
sed -n '1,220p' .agents/skills/orpheus-truth-router/SKILL.md
printf '\n---\n'
sed -n '1,220p' .agents/skills/orpheus-phase2-stable-audio/SKILL.md
```

Expected: you can see the current repo-local skill style, scope, and tone.

- [ ] **Step 2: Write the new skill file**

Create `.agents/skills/orpheus-system-design/SKILL.md` with content shaped like this:

```markdown
---
name: orpheus-system-design
description: Use when designing backend-facing system boundaries, execution semantics, artifact flows, or provider/lifecycle interactions before implementation work begins.
---

# Orpheus System Design

## Goal

Design system boundaries and execution semantics for Orpheus before implementation begins, without redefining product truth.

## Read first

1. `docs/prd/source-of-truth-index.md`
2. `docs/prd/agent-conventions.md`
3. The canonical specs for the touched topic
4. The relevant execution packet if the design affects Phase 2

## Use this skill for

- backend workflow decomposition
- artifact manifest / lifecycle / warning-state design
- provider adapter boundaries
- orchestration / retry / stitch semantics
- EN + ES gate evidence flow
- implementation-facing architecture notes

## Do not use this skill for

- changing product scope or pricing truth
- changing language promises
- HTML or landing-page visual design
- direct implementation

## Required process

1. State the canonical docs that govern the area.
2. Identify the bounded units and their interfaces.
3. Propose 2-3 architecture options with trade-offs.
4. Recommend one option and explain why.
5. Write the result as a design artifact before implementation planning starts.

## Output

Return:

- the bounded units
- their interfaces and dependencies
- failure/edge semantics
- what canonical docs would need backfill if the design changes truth
```
```

Expected: the file exists and clearly constrains itself to system design, not product-definition authority.

- [ ] **Step 3: Verify the skill does not overreach**

Run:

```bash
rg -n "pricing truth|product scope|language promises|direct implementation" .agents/skills/orpheus-system-design/SKILL.md
```

Expected: the new skill explicitly excludes those domains.

## Task 2: Route the new skill through the repo runtime layer

**Files:**
- Modify: `AGENTS.md`
- Modify: `AGENT_PROMPT_PLAYBOOK.md`

- [ ] **Step 1: Add the skill to AGENTS.md without changing authority order**

Insert one new bullet in the repo-local skill routing section:

```markdown
- `$orpheus-system-design` for backend-facing system design before implementation work begins.
```

Do not change any surrounding truth-precedence language.

- [ ] **Step 2: Add one prompt template to AGENT_PROMPT_PLAYBOOK.md**

Add a new section like:

```markdown
## X) Design backend/system boundaries before implementation

```text
Read AGENTS.md first, then use $orpheus-system-design.

Work from current canonical truth only.
Do not invent product rules.

Focus on:
- bounded units
- interfaces
- artifact/lifecycle/provider boundaries
- failure semantics
- EN + ES gate implications where relevant

Before proposing a design, state:
1. canonical docs you read
2. which boundaries you will not cross
3. 2-3 architecture options with trade-offs
```
```

Expected: the playbook now exposes the new skill without creating a second operating system.

- [ ] **Step 3: Verify AGENTS + playbook remain subordinate to canonical truth**

Run:

```bash
rg -n "docs/prd|docs/roadmap|docs/plans|Do not let an external skill redefine product scope" AGENTS.md
```

Expected: authority order still clearly points back to canonical docs, not the new skill.

## Task 3: Decide whether the execution policy needs one clarifying sentence

**Files:**
- Modify only if needed: `docs/ops/agent-execution-policy.md`

- [ ] **Step 1: Read the current policy and decide if a change is actually needed**

Run:

```bash
sed -n '1,240p' docs/ops/agent-execution-policy.md
```

Expected: you can tell whether the current policy already covers “design before implementation” sufficiently.

- [ ] **Step 2: If needed, add exactly one sentence**

Only if the file does not already imply this, add a narrow sentence such as:

```markdown
System-boundary design work should route through `$orpheus-system-design` before any implementation lane is opened.
```

Do not add a larger new section unless the current policy truly lacks a place for it.

- [ ] **Step 3: If not needed, leave the file unchanged**

Expected: no unnecessary churn in `docs/ops/agent-execution-policy.md`.

## Task 4: Verify and commit

**Files:**
- Modify: all files touched above

- [ ] **Step 1: Run structural verification**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 2: Verify the new skill is discoverable and scoped correctly**

Run:

```bash
test -f .agents/skills/orpheus-system-design/SKILL.md && echo OK
rg -n "orpheus-system-design" AGENTS.md AGENT_PROMPT_PLAYBOOK.md docs/ops/agent-execution-policy.md .agents/skills/orpheus-system-design/SKILL.md
```

Expected:

```text
OK
```

Plus references in the intended files only.

- [ ] **Step 3: Stage only the intended files**

Run:

```bash
git add .agents/skills/orpheus-system-design/SKILL.md AGENTS.md AGENT_PROMPT_PLAYBOOK.md docs/ops/agent-execution-policy.md
```

Expected: no canonical product-truth files are staged.

- [ ] **Step 4: Commit**

Run:

```bash
git commit -m "docs: add orpheus system design skill"
```

- [ ] **Step 5: Push**

Run:

```bash
git push origin main
```

Expected: push succeeds and `main` remains clean.
