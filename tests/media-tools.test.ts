import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  resolveMediaToolPath,
  resolveRelocatedNodeModulePath,
} from "../src/utils/media-tools.js";

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

test("media tool resolver can relocate traced node_modules binary paths", async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-media-tool-relocate-"));
  const runtimeRoot = path.join(tempDir, "runtime");
  const packageRelativePath = path.join(
    ".pnpm",
    "ffprobe-static@3.1.0",
    "node_modules",
    "ffprobe-static",
    "bin",
    "linux",
    "x64",
    "ffprobe",
  );
  const relocatedPath = path.join(runtimeRoot, "node_modules", packageRelativePath);
  const buildTimePath = path.join("/ROOT", "node_modules", packageRelativePath);

  await mkdir(path.dirname(relocatedPath), { recursive: true });
  await writeFile(relocatedPath, "", "utf8");

  try {
    assert.equal(resolveRelocatedNodeModulePath(buildTimePath, [runtimeRoot]), relocatedPath);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});
