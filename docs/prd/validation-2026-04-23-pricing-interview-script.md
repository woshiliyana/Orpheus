# Orpheus Pricing Validation Interview Script

> Status: working doc
> Purpose: validate willingness to pay for the `Long text -> stable audio` wedge
> Scope: founder-led customer interviews, not canonical PRD truth
> Depends on: [`design-2026-04-23-longform-audio-wedge.md`](./design-2026-04-23-longform-audio-wedge.md)
> Last updated: 2026-04-23

## Goal

This script exists to answer one question:

`Will full-time, YPP-driven, script-heavy educational explainer creators pay now for long-form stable narration without manual chunking?`

This is not a discovery script for the whole product vision. It is a pricing and urgency script for the first wedge only.

## Who To Interview

Prioritize creators who match most of these:

1. Full-time or near-full-time YouTube creator
2. Faceless educational explainer format
3. Script-heavy videos
4. Usually publishes 8+ minute videos, ideally much longer
5. Revenue is meaningfully tied to `YPP`
6. Already feels narration reliability affects publishing frequency

## What Not To Do

Do not ask:

1. "Do you like this idea?"
2. "Would this be useful?"
3. "If we also add subtitles / visuals / AI editing, would you want it?"
4. "Do you think creators need this?"

Do ask:

1. What they do now
2. What breaks
3. What it costs in time or money
4. What they would pay now for the narrowest wedge
5. Whether they would actually try a paid pilot this month

## Founder Rules

1. Ask about the current workflow first, not your product first.
2. Do not oversell future features.
3. If the user drifts into "full video automation," note it, but bring the conversation back to the first wedge.
4. Force a number. A fuzzy "maybe" is not evidence.
5. Try to end each call with one of four labels:
   - `pay_now`
   - `try_first`
   - `not_for_me`
   - `unclear`

## Chinese Outreach DM

### Short version

```
我最近在验证一个很窄的工具方向，不是做整套 AI 视频，而是只解决一个问题：

长文本脚本能不能稳定直接出旁白，不用手动拆很多段，不用自己盯流程。

你如果愿意的话，我想跟你聊 15 分钟，不是推销，主要是想了解你现在怎么做旁白、哪里最痛、如果真解决这个问题你会不会付钱。
```

### If they ask what the product is

```
现在只验证第一刀，不是全自动视频。

我在看的最小版本是：
长文本 -> 稳定音频

先不承诺字幕，不承诺画面，不承诺一键出片。
我现在最想知道的是，这一个结果值不值得你现在付钱。
```

## English Outreach DM

### Short version

```
I’m validating a very narrow product idea for faceless educational YouTube creators.

Not full AI video automation, just one outcome:
long script -> stable narration, without manually splitting it into a bunch of chunks or babysitting the workflow.

If you’re open to it, I’d love to do a 15-minute interview. Not pitching, mostly trying to understand how you handle narration today, what breaks, and whether solving just this problem would be worth paying for.
```

### If they ask what the product is

```
I’m only validating the first wedge right now, not the whole vision.

The smallest version is:
long text -> stable audio

No promise yet on subtitles, visuals, or full video automation.
I mainly want to learn whether this one outcome is painful enough that you’d pay for it now.
```

## Chinese Interview Script

### 1. Warm open

```
我先不介绍产品，先想理解你现在的真实流程。

你现在做这种长视频旁白，一般是怎么做的？
```

### 2. Current workflow

Use these follow-ups:

1. `你现在主要用什么工具？`
2. `是 ElevenLabs、F5-TTS、自己部署、云服务器，还是别的组合？`
3. `一条视频从脚本到最终可用旁白，大概会经过几步？`

### 3. Pain and consequence

```
哪一步最烦？
```

Then push:

1. `是长文本要拆段？`
2. `是要手动调度？`
3. `是音色来回找和克隆？`
4. `是字幕不稳？`
5. `还是重跑某几段特别麻烦？`

Then force consequence:

```
如果这一块一直不顺，对你最真实的后果是什么？

是少发视频，还是质量下降，还是直接影响 YPP 收入？
```

### 4. Cost today

```
你现在这套流程，一条视频大概要多花多少时间，或者多花多少钱？
```

Push for specifics:

1. `如果按 20-30 分钟长视频算，大概多花几小时？`
2. `云服务器或第三方工具每月大概多少钱？`
3. `你现在最常做的 workaround 是什么？`

### 5. Narrow wedge test

Only now introduce the wedge:

```
如果有一个工具，只承诺一件事：

长文本直接稳定出旁白，
不用你手动拆很多段，
不用你一直盯流程。

先不承诺字幕，先不承诺画面自动化。

光这一个结果，对你值不值钱？
```

### 6. Force a number

```
如果这个月就能用，你最高愿意付多少钱？
```

If they dodge:

1. `不是长期理想价，就说这个月你会真付的价格。`
2. `你更接近 $15、$29、$49、还是更高？`
3. `如果你不愿意付，现在卡点是什么？`

### 7. Payment intent

```
如果我下周给你一个可试的版本，你会：

1. 直接付费试
2. 先试用再决定
3. 继续用你现在这套 patch 流程
```

### 8. One last question

```
如果你已经愿意为“稳定长文本旁白”付钱，那你第二个最想要的功能是什么？

字幕？
局部重做？
更多音色？
还是别的？
```

## English Interview Script

### 1. Warm open

```
I want to understand your real workflow first before talking about any product.

How do you currently handle narration for long-form videos?
```

### 2. Current workflow

1. `What tools are in the stack right now?`
2. `Are you using ElevenLabs, F5-TTS, self-hosted models, cloud GPUs, or some mix?`
3. `How many steps are there between script and usable final narration?`

### 3. Pain and consequence

```
What is the most annoying part?
```

Push with:

1. `Manual chunking?`
2. `Scheduling and retries?`
3. `Voice hunting and cloning?`
4. `Subtitle instability?`
5. `Re-doing specific sections?`

Then force consequence:

```
If this part keeps breaking, what happens in real life?

Do you publish less often, ship lower-quality videos, or lose revenue?
```

### 4. Cost today

```
How much time or money does this workflow cost you today?
```

Follow-ups:

1. `For a 20-30 minute video, how many extra hours does narration overhead add?`
2. `How much are you spending monthly on cloud or third-party tools?`
3. `What ugly workaround are you relying on most often?`

### 5. Narrow wedge test

```
What if there were a tool that only promised one thing:

long script -> stable narration,
without manually splitting it into a bunch of chunks,
and without babysitting the workflow.

No promise yet on subtitles.
No promise yet on visual automation.

Is that one outcome valuable enough to pay for?
```

### 6. Force a number

```
If this existed this month, what is the highest monthly price you would actually pay?
```

If they hedge:

1. `Not ideal future pricing, I mean what you would really pay now.`
2. `Is it closer to $15, $29, $49, or higher?`
3. `If not, what is stopping you from paying now?`

### 7. Payment intent

```
If I gave you a version next week, would you:

1. pay to try it,
2. only try if it is free first,
3. or keep using your current patched workflow?
```

### 8. One last question

```
If stable long-form narration is good enough to pay for, what is the second feature you would want next?

Subtitles?
Local re-generation?
More voices?
Something else?
```

## Interview Record Template

Copy this per creator:

```markdown
## Interview: [name / handle]

- Date:
- Channel type:
- Full-time or side-income:
- Typical video length:
- Main revenue source:

### Current workflow
- Tools used:
- Manual steps:
- Where it breaks:

### Real consequence
- What happens if narration fails:
- Revenue / frequency / quality impact:

### Cost today
- Time overhead per video:
- Money overhead per month:

### Wedge reaction
- Does `long text -> stable audio` feel valuable?:
- Why or why not:

### Pricing
- Highest monthly price they would pay now:
- Pay now / try first / not for me / unclear:

### Second feature they want
- Subtitle / local regen / more voices / other:

### Notes
- Quotes worth keeping:
```

## Decision Rule After 5 Interviews

You are looking for these patterns:

### Strong signal

1. At least 3 people independently say they would pay now
2. The prices cluster in a believable range
3. The buying reason stays anchored on reliability and publishing frequency

### Weak signal

1. Everyone says "useful" but nobody names a price
2. Everyone wants full video automation instead of paying for the first wedge
3. People only want to try it if it is free

### What to do with the result

1. If the signal is strong, move to paid pilot design and pricing tests
2. If the signal is weak, revisit the wedge before adding more features
3. If creators all jump straight to subtitles as the must-have purchase driver, reconsider whether the first sellable wedge is really `audio only`
