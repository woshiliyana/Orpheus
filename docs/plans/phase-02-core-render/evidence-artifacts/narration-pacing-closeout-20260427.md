# Narration Pacing Closeout

> Status: closed for Inworld pacing default decision
> Role: evidence summary and next-lane handoff
> Normative for product rules: no
> Canonical product rule: `docs/prd/specs/narration-input-and-pacing.md`
> Date: 2026-04-27 PDT

## Question

Should Inworld narration keep `natural_basic` as the default pacing mode, or should the default return to `exact` after paired listening?

## Evidence Used

| Evidence packet | Language / voice | Script shape | Machine result | Human listening verdict |
|---|---|---|---|---|
| `live-smoke-exact-vs-natural-short-20260427` | EN / Ashley and ES / Rafael | Short non-stress samples | Provider execution, artifact integrity, token preservation, and break-tag budget passed | `exact` preferred on short pairs |
| `live-smoke-structure-pacing-stress-20260427` | EN / Ashley | Heading, paragraphs, and list items | `natural_basic` inserted 10 breaks, max 10 per request, token preserved, warnings 0 | `natural_basic` much better |
| `live-smoke-es-structure-pacing-stress-20260427` | ES / Rafael | Heading, paragraphs, and list items | `natural_basic` inserted 10 breaks, max 10 per request, token preserved, warnings 0 | `natural_basic` better |

## Decision

Keep `natural_basic` as the default pacing mode for Inworld structured narration in the current `EN + ES` first gate.

Keep `exact` available for:

- compliance copy
- deliberate pacing
- poetry or highly controlled scripts
- debugging
- cases where a short script sounds better without added structural pauses

## Caveat

The short-pair smoke preferred `exact`, so the closeout is not a claim that `natural_basic` is always better. The supported claim is narrower:

```text
For structured EN + ES narration that includes headings, paragraphs, or list items,
natural_basic improves perceived pacing while preserving source tokens and staying
within the Inworld break-tag budget.
```

## Boundaries

This closeout does not change public launch scope, pricing, SRT export, language promises, or provider-primary selection.

It confirms only the Inworld input-pacing default that is already canonical in `docs/prd/specs/narration-input-and-pacing.md`: `natural_basic` is default, and `exact` remains optional.

## Next Lane

Move to the same-cycle Cartesia comparison. The next useful question is not whether Inworld `natural_basic` can work, but whether `Inworld-first` remains justified once the required second-provider scenario has evidence for quality, speed, timing assets, and cost.
