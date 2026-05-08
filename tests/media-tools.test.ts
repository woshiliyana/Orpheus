import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import { resolveMediaToolPath } from "../src/utils/media-tools.js";

test("media tool resolver uses bundled binaries when available", () => {
  const ffmpegPath = resolveMediaToolPath("ffmpeg");
  const ffprobePath = resolveMediaToolPath("ffprobe");

  assert.ok(ffmpegPath === "ffmpeg" || existsSync(ffmpegPath));
  assert.ok(ffprobePath === "ffprobe" || existsSync(ffprobePath));
});

test("media tool resolver allows explicit environment overrides", () => {
  const previousFfmpegPath = process.env.ORPHEUS_FFMPEG_PATH;
  const previousFfprobePath = process.env.ORPHEUS_FFPROBE_PATH;

  process.env.ORPHEUS_FFMPEG_PATH = "/custom/ffmpeg";
  process.env.ORPHEUS_FFPROBE_PATH = "/custom/ffprobe";

  try {
    assert.equal(resolveMediaToolPath("ffmpeg"), "/custom/ffmpeg");
    assert.equal(resolveMediaToolPath("ffprobe"), "/custom/ffprobe");
  } finally {
    if (previousFfmpegPath === undefined) {
      delete process.env.ORPHEUS_FFMPEG_PATH;
    } else {
      process.env.ORPHEUS_FFMPEG_PATH = previousFfmpegPath;
    }

    if (previousFfprobePath === undefined) {
      delete process.env.ORPHEUS_FFPROBE_PATH;
    } else {
      process.env.ORPHEUS_FFPROBE_PATH = previousFfprobePath;
    }
  }
});
