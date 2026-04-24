import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, stat } from "node:fs/promises";
import { promisify } from "node:util";

import { stitchAudioSegments } from "../src/pipeline/stitch.js";
import { buildBenchmarkSummary } from "../src/benchmark/summary.js";

const execFileAsync = promisify(execFile);

async function generateTone(outputPath: string, seconds: number, frequency: number): Promise<void> {
  await execFileAsync("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `sine=frequency=${frequency}:duration=${seconds}`,
    "-q:a",
    "2",
    outputPath,
  ]);
}

test("stitchAudioSegments creates a final audio file and splice report", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-stitch-"));
  const first = path.join(tmpDir, "000.mp3");
  const second = path.join(tmpDir, "001.mp3");
  const output = path.join(tmpDir, "final.mp3");

  await generateTone(first, 1, 440);
  await generateTone(second, 1, 660);

  const result = await stitchAudioSegments({
    outputPath: output,
    segmentPaths: [first, second],
  });

  assert.equal(result.segmentReports.length, 2);
  assert.ok(result.totalDurationSec >= 1.9 && result.totalDurationSec <= 2.2);
  assert.equal(result.segmentReports[0]?.offsetStartSec, 0);
  assert.ok(result.segmentReports[1]!.offsetStartSec >= result.segmentReports[0]!.offsetEndSec);

  const outputStats = await stat(output);
  assert.ok(outputStats.size > 0);
});

test("buildBenchmarkSummary emits unified csv and markdown tables", async () => {
  const summary = buildBenchmarkSummary([
    {
      corpusId: "en-control-short",
      provider: "inworld",
      success: true,
      chunkCount: 2,
      chunkRetryCount: 1,
      totalWallTimeMs: 5_000,
      audioDurationSec: 90,
      timestampCoveragePct: 100,
      estimatedTotalCostUsd: 0.08,
      outputDir: "/tmp/inworld/en-control-short",
    },
    {
      corpusId: "en-control-short",
      provider: "cartesia",
      success: true,
      chunkCount: 2,
      chunkRetryCount: 0,
      totalWallTimeMs: 4_000,
      audioDurationSec: 90,
      timestampCoveragePct: 100,
      estimatedTotalCostUsd: 0.09,
      outputDir: "/tmp/cartesia/en-control-short",
    },
  ]);

  assert.match(summary.csv, /provider,corpusId,success,chunkCount,chunkRetryCount,totalWallTimeMs,audioDurationSec,timestampCoveragePct,estimatedTotalCostUsd,outputDir/);
  assert.match(summary.csv, /inworld,en-control-short,true,2,1,5000,90,100,0.08,\/tmp\/inworld\/en-control-short/);
  assert.match(summary.markdown, /\| Provider \| Corpus \| Success \| Chunks \| Retries \| Wall Time \(ms\) \| Audio \(sec\) \| Coverage % \| Cost USD \| Output \|/);
  assert.match(summary.markdown, /\| cartesia \| en-control-short \| yes \| 2 \| 0 \| 4000 \| 90 \| 100 \| 0.09 \| \/tmp\/cartesia\/en-control-short \|/);
});
