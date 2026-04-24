import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { runNarrationJob } from "../src/pipeline/narration.js";
import type { ChunkSynthesisInput, ChunkSynthesisResult, TtsProviderAdapter } from "../src/domain/types.js";

const execFileAsync = promisify(execFile);

class FakeProvider implements TtsProviderAdapter {
  readonly name = "inworld";
  readonly rateUsdPer1mChars = 30;

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    const chunkDir = input.outputDir;
    const audioPath = path.join(chunkDir, `chunk-${String(input.chunk.index).padStart(3, "0")}.mp3`);
    const rawResponsePath = path.join(chunkDir, `chunk-${String(input.chunk.index).padStart(3, "0")}.json`);

    const words = input.chunk.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text, index) => ({
        text,
        startSec: index * 0.18,
        endSec: index * 0.18 + 0.14,
      }));

    await execFileAsync("ffmpeg", [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `sine=frequency=${440 + input.chunk.index * 110}:duration=${Math.max(1, words.length * 0.18)}`,
      "-q:a",
      "2",
      audioPath,
    ]);

    await writeFile(rawResponsePath, JSON.stringify({ chunkIndex: input.chunk.index, words }, null, 2), "utf8");

    return {
      audioPath,
      durationSec: Math.max(1, words.length * 0.18),
      words,
      rawResponsePaths: [rawResponsePath],
      attemptCount: 1,
      providerCharactersProcessed: input.chunk.text.length,
    };
  }
}

class FailingProvider implements TtsProviderAdapter {
  readonly name = "inworld";
  readonly rateUsdPer1mChars = 30;

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    const rawResponsePath = path.join(input.outputDir, "attempt-1.json");
    await writeFile(rawResponsePath, JSON.stringify({ error: "synthetic provider failure" }, null, 2), "utf8");

    const error = new Error("synthetic provider failure") as Error & {
      statusCode?: number;
      providerCharactersProcessed?: number;
    };
    error.statusCode = 503;
    error.providerCharactersProcessed = input.chunk.text.length;
    throw error;
  }
}

function makeLongScript(): string {
  const paragraph = "Paste the whole script once and get stable narration with subtitle-ready timing for an English educational explainer workflow.";
  return Array.from({ length: 30 }, () => paragraph).join("\n\n");
}

test("runNarrationJob writes the full artifact packet for a >2000-char English script", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-"));
  const result = await runNarrationJob({
    requestId: "req_phase1",
    projectId: "project_phase1",
    provider: "inworld",
    language: "en",
    voiceId: "Ashley",
    outputFormat: "mp3",
    script: makeLongScript(),
    outputDir: tmpDir,
  }, new FakeProvider());

  assert.ok(result.durationSec > 0);
  assert.ok(result.timings.length > 0);
  assert.equal(result.metrics.provider, "inworld");
  assert.ok(result.metrics.chunkCount >= 2);

  for (const artifactPath of [
    result.audioPath,
    result.srtPath,
    result.vttPath,
    result.wordTimingsPath,
    result.spliceReportPath,
    result.artifactManifestPath,
    result.metricsPath,
  ]) {
    const artifactStats = await stat(artifactPath);
    assert.ok(artifactStats.size > 0, `${artifactPath} should not be empty`);
  }

  const timings = JSON.parse(await readFile(result.wordTimingsPath, "utf8")) as Array<{ startSec: number; endSec: number }>;
  for (let index = 1; index < timings.length; index += 1) {
    assert.ok(timings[index]!.startSec >= timings[index - 1]!.startSec);
    assert.ok(timings[index]!.endSec >= timings[index]!.startSec);
  }

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as { output_language: string; orchestration_summary: { chunk_count: number } };
  assert.equal(manifest.output_language, "en");
  assert.ok(manifest.orchestration_summary.chunk_count >= 2);
});

test("runNarrationJob persists failure metrics and artifact manifest when synthesis fails", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-fail-"));
  const requestId = "req_failed_phase1";

  await assert.rejects(
    () =>
      runNarrationJob({
        requestId,
        projectId: "project_failed_phase1",
        provider: "inworld",
        language: "en",
        voiceId: "Ashley",
        outputFormat: "mp3",
        script: makeLongScript(),
        outputDir: tmpDir,
      }, new FailingProvider()),
    /synthetic provider failure/,
  );

  const metricsPath = path.join(tmpDir, requestId, "artifacts", "metrics.json");
  const artifactManifestPath = path.join(tmpDir, requestId, "artifacts", "artifact-manifest.json");

  const metrics = JSON.parse(await readFile(metricsPath, "utf8")) as { failureReason?: string; chunkCount: number };
  const manifest = JSON.parse(await readFile(artifactManifestPath, "utf8")) as {
    run_status?: string;
    failure_reason?: string;
    billing_fact: { usage_event_type: string };
  };

  assert.match(metrics.failureReason ?? "", /synthetic provider failure/);
  assert.ok(metrics.chunkCount >= 2);
  assert.equal(manifest.run_status, "failed");
  assert.match(manifest.failure_reason ?? "", /synthetic provider failure/);
  assert.equal(manifest.billing_fact.usage_event_type, "non_billable_failure");
});
