# Orpheus Pricing Validation Results Template

> Status: working doc
> Purpose: summarize pricing interviews for the `Long text -> stable audio` wedge
> Scope: founder analysis, not canonical PRD truth
> Depends on:
> - [`design-2026-04-23-longform-audio-wedge.md`](./design-2026-04-23-longform-audio-wedge.md)
> - [`validation-2026-04-23-pricing-interview-script.md`](./validation-2026-04-23-pricing-interview-script.md)
> Last updated: 2026-04-23

## Goal

This sheet exists to answer four questions after 5 interviews:

1. Is the pain repeatable across the wedge?
2. Will anyone pay now, not just say it sounds useful?
3. What price range is believable?
4. Is `Long text -> stable audio` enough for the first paid wedge, or do users require something broader before paying?

## Fast Rules

### Strong signal

You probably have something worth building if:

1. At least 3 out of 5 say `pay_now` or give a strong paid-pilot answer
2. At least 3 people give a real number instead of dodging
3. The prices cluster instead of scattering wildly
4. The first buying reason stays anchored on stable long-form narration

### Weak signal

You probably do **not** have the wedge yet if:

1. Most answers are `try_first` with no price
2. Users say the real value only starts at `audio + subtitles` or full automation
3. The pain is real but nobody is willing to pay now
4. Users mostly compare this to a hobby workaround, not to lost publishing frequency or lost income

## Summary Dashboard

Fill this after 5 interviews:

```markdown
- Total interviews:
- Strong wedge matches:
- `pay_now` count:
- `try_first` count:
- `not_for_me` count:
- `unclear` count:
- Lowest believable monthly price:
- Highest believable monthly price:
- Most common second feature request:
- Recommendation:
  - `GO`
  - `GO, but price-test more`
  - `RETHINK WEDGE`
  - `DO NOT BUILD YET`
```

## Interview Table

Copy this table and fill one row per creator.

| # | Creator / Handle | Full-time? | Channel Type | Typical Video Length | Revenue Dependence on YPP | Current Workflow | Main Pain | Real Consequence | Time Cost | Money Cost | Highest Price Now | Intent | Second Feature | Key Quote |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |  |  |  | `pay_now / try_first / not_for_me / unclear` |  |  |
| 2 |  |  |  |  |  |  |  |  |  |  |  | `pay_now / try_first / not_for_me / unclear` |  |  |
| 3 |  |  |  |  |  |  |  |  |  |  |  | `pay_now / try_first / not_for_me / unclear` |  |  |
| 4 |  |  |  |  |  |  |  |  |  |  |  | `pay_now / try_first / not_for_me / unclear` |  |  |
| 5 |  |  |  |  |  |  |  |  |  |  |  | `pay_now / try_first / not_for_me / unclear` |  |  |

## Detailed Notes Template

Use this if a row is too compressed.

```markdown
## Interview [N]: [name / handle]

- Full-time or side-income:
- Content type:
- Typical length:
- How much YPP matters:

### Current workflow
- Tools:
- Manual splitting:
- Self-hosting / cloud setup:
- Subtitle workflow:

### Pain
- What breaks first:
- What annoys them most:
- What they already do to patch it:

### Consequence
- Publishing frequency impact:
- Quality impact:
- Revenue impact:

### Pricing
- Highest monthly price they would actually pay now:
- Why:
- If they would not pay now, why not:

### Intent label
- `pay_now / try_first / not_for_me / unclear`

### Second feature they care about
- Subtitle / local regeneration / more voices / other

### Best direct quote
- ""
```

## Pattern Analysis

After 5 interviews, write a short synthesis here.

### 1. Who actually matched the wedge?

Ask:

1. Were the strongest reactions really from full-time, 8+ minute, YPP-driven creators?
2. Did side-income or casual creators react differently?
3. Did one subsegment react much harder than the others?

Write:

```markdown
The strongest match was:

The weakest match was:

What surprised me:
```

### 2. What did they think they were buying?

This matters a lot.

Ask:

1. Did they describe the value as reliability?
2. Did they describe it as automation?
3. Did they describe it as cost savings?
4. Did they only care once subtitles or visuals entered the picture?

Write:

```markdown
Users mostly framed the value as:

The first buying reason seems to be:

The thing I thought mattered but did not:
```

### 3. Price cluster

Write:

```markdown
Raw prices mentioned:

Believable near-term price band:

Outliers and why:
```

### 4. Go / no-go call

Use this exact format:

```markdown
## Decision

Verdict:

Why:

What I would do next:
```

## Example Interpretation

### Case A: Strong go

If you hear something like:

1. `$29`, `$39`, `$49`
2. 3+ people say they would pay this month
3. They keep repeating "I just need long scripts to run reliably"

Then the wedge is probably real.

### Case B: Real pain, weak purchase intent

If you hear:

1. "Yes this is useful"
2. "I would try it"
3. No one gives a real number

Then do not pretend you have product-market pull yet. You have pain, not pricing proof.

### Case C: Wrong wedge

If you hear:

1. "I would only pay if subtitles are included"
2. "I need video automation too"
3. "Audio alone is not enough"

Then your first paid wedge may be too narrow, even if the pain is real.

## Recommendation To Future You

Do not summarize interviews as "most people liked it."

Only summarize them in terms of:

1. Who would pay now
2. How much they would pay now
3. What exact result they think they are paying for
