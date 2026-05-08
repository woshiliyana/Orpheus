import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

import rawNextConfig from "../apps/site/next.config.ts";

type TestedNextConfig = {
  outputFileTracingRoot?: string;
  outputFileTracingIncludes?: Record<string, string[]>;
};

const nextConfig = "default" in rawNextConfig
  ? (rawNextConfig as { default: TestedNextConfig }).default
  : rawNextConfig as TestedNextConfig;

test("site build traces server runtime files from the repo root", () => {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

  assert.equal(nextConfig.outputFileTracingRoot, repoRoot);
  assert.deepEqual(nextConfig.outputFileTracingIncludes, {
    "/*": [
      "../../node_modules/.pnpm/ffmpeg-static@*/node_modules/ffmpeg-static/ffmpeg",
      "../../node_modules/.pnpm/ffprobe-static@*/node_modules/ffprobe-static/bin/linux/**/*",
    ],
  });
});
