import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSubtitleCues,
  renderSrt,
  renderVtt,
} from "../src/pipeline/subtitles.js";
import type { NormalizedWordTiming } from "../src/domain/types.js";

function makeWords(): NormalizedWordTiming[] {
  const tokens = [
    "Paste",
    "the",
    "whole",
    "script",
    "once.",
    "Get",
    "stable",
    "narration",
    "with",
    "subtitle-ready",
    "timing.",
  ];

  return tokens.map((text, index) => ({
    text,
    startSec: index * 0.5,
    endSec: index * 0.5 + 0.4,
    chunkIndex: index < 5 ? 0 : 1,
  }));
}

test("buildSubtitleCues prefers sentence endings and keeps monotonic timing", () => {
  const cues = buildSubtitleCues(makeWords());

  assert.equal(cues.length, 2);
  assert.equal(cues[0]?.text, "Paste the whole script once.");
  assert.equal(cues[1]?.text, "Get stable narration with subtitle-ready timing.");
  assert.ok(cues[0]!.startSec < cues[0]!.endSec);
  assert.ok(cues[1]!.startSec >= cues[0]!.endSec);
});

test("renderSrt and renderVtt emit expected cue formatting", () => {
  const cues = buildSubtitleCues(makeWords());

  const srt = renderSrt(cues);
  const vtt = renderVtt(cues);

  assert.match(srt, /^1\n00:00:00,000 --> 00:00:02,400\nPaste the whole script once\.\n\n2\n00:00:02,500 --> 00:00:05,400\nGet stable narration with subtitle-ready timing\.\n$/);
  assert.match(vtt, /^WEBVTT\n\n1\n00:00:00\.000 --> 00:00:02\.400\nPaste the whole script once\.\n\n2\n00:00:02\.500 --> 00:00:05\.400\nGet stable narration with subtitle-ready timing\.\n$/);
});
