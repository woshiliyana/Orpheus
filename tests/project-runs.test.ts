import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import {
  createProjectRun,
  executeProjectRun,
  executeNarrationRun,
  FileProjectRunRepository,
  getProjectRun,
  LocalArtifactStorage,
} from "../src/application/project-runs.js";
import { createProviderAdapter } from "../src/providers/index.js";
import type {
  ArtifactManifest,
  ChunkSynthesisInput,
  ChunkSynthesisResult,
  TtsProviderAdapter,
} from "../src/domain/types.js";

const execFileAsync = promisify(execFile);
const BREAK_TAG_REGEX = /\s*<break\s+time=["']\d+(?:ms|s)["']\s*\/?>\s*/giu;

function stripProviderMarkup(value: string): string {
  return value.replace(BREAK_TAG_REGEX, " ");
}

class ProjectRunFakeProvider implements TtsProviderAdapter {
  readonly name = "inworld" as const;
  readonly rateUsdPer1mChars = 30;
  called = false;

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    this.called = true;
    const audioPath = path.join(input.outputDir, `audio.${input.outputFormat}`);
    const rawResponsePath = path.join(input.outputDir, "attempt-1.json");
    const words = stripProviderMarkup(input.chunk.text)
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
      `sine=frequency=${480 + input.chunk.index * 80}:duration=${Math.max(1, words.length * 0.18)}`,
      "-c:a",
      "libmp3lame",
      "-b:a",
      "192k",
      audioPath,
    ]);
    await writeFile(rawResponsePath, JSON.stringify({ words }, null, 2), "utf8");

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

function makeReadableScript(): string {
  const paragraph = "Paste the whole script once. Orpheus keeps chunking hidden while it prepares stable narration with subtitle-ready timing.";
  return Array.from({ length: 24 }, () => paragraph).join("\n\n");
}

function makeUnpunctuatedScript(): string {
  return Array.from({ length: 70 }, () => "this input has words but no sentence punctuation").join(" ");
}

test("project run service creates a queued run and executes it to a downloadable artifact manifest", async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-project-runs-"));
  const provider = new ProjectRunFakeProvider();

  const created = await createProjectRun({
    dataDir,
    title: "Internal Phase 2 smoke",
    script: makeReadableScript(),
    provider: "inworld",
    language: "en",
    voiceId: "Ashley",
    outputFormat: "mp3",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
  });

  assert.equal(created.project.status, "queued");
  assert.equal(created.run.status, "queued");
  assert.equal(created.run.statusHistory.map((entry) => entry.status).join(">"), "queued");

  const executed = await executeProjectRun({
    dataDir,
    runId: created.run.id,
    providerFactory: () => provider,
  });

  assert.equal(provider.called, true);
  assert.equal(executed.project.status, "completed");
  assert.equal(executed.run.status, "succeeded");
  assert.deepEqual(executed.run.statusHistory.map((entry) => entry.status), [
    "queued",
    "validating",
    "rendering",
    "aligning",
    "packaging",
    "succeeded",
  ]);
  assert.ok(executed.run.finalAudioPath);
  assert.ok(executed.run.artifactManifestPath);
  assert.ok(executed.run.metricsPath);
  assert.ok(executed.run.billableSeconds > 0);

  await stat(executed.run.finalAudioPath);
  const manifest = JSON.parse(await readFile(executed.run.artifactManifestPath, "utf8")) as ArtifactManifest;
  assert.equal(manifest.project_id, created.project.id);
  assert.equal(manifest.run_id, created.run.id);
  assert.equal(manifest.delivery_ref, executed.run.finalAudioPath);
  assert.equal(manifest.delivery_audio_ref?.[0]?.format, "mp3");
  assert.equal(manifest.internal_alignment_asset_ref?.alignment_source, "provider_native");

  const reloaded = await getProjectRun({ dataDir, runId: created.run.id });
  assert.equal(reloaded.project.status, "completed");
  assert.equal(reloaded.run.artifactManifestPath, executed.run.artifactManifestPath);
});

test("project run executor works through repository and artifact storage boundaries", async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-project-runs-boundaries-"));
  const provider = new ProjectRunFakeProvider();
  const repository = new FileProjectRunRepository(dataDir);
  const artifactStorage = new LocalArtifactStorage(dataDir);

  const created = await repository.create({
    title: "Repository boundary smoke",
    script: makeReadableScript(),
    provider: "inworld",
    language: "es",
    voiceId: "Rafael",
    outputFormat: "mp3",
    pacingMode: "exact",
    inputValidationMode: "strict",
  });

  const executed = await executeNarrationRun({
    repository,
    artifactStorage,
    runId: created.run.id,
    providerFactory: () => provider,
  });

  assert.equal(provider.called, true);
  assert.equal(executed.project.status, "completed");
  assert.equal(executed.run.status, "succeeded");
  assert.equal(executed.run.language, "es");
  assert.equal(executed.run.pacingMode, "exact");
  assert.deepEqual(executed.run.statusHistory.map((entry) => entry.status), [
    "queued",
    "validating",
    "rendering",
    "aligning",
    "packaging",
    "succeeded",
  ]);

  const listed = await repository.list({ limit: 1 });
  assert.equal(listed.length, 1);
  assert.equal(listed[0]?.run.id, created.run.id);
});

test("project run service records input validation failure without provider calls or billable seconds", async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-project-runs-validation-"));
  const provider = new ProjectRunFakeProvider();
  const created = await createProjectRun({
    dataDir,
    title: "Unreadable script",
    script: makeUnpunctuatedScript(),
    provider: "inworld",
    language: "en",
    voiceId: "Ashley",
    outputFormat: "mp3",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
  });

  const executed = await executeProjectRun({
    dataDir,
    runId: created.run.id,
    providerFactory: () => provider,
  });

  assert.equal(provider.called, false);
  assert.equal(executed.project.status, "needs_attention");
  assert.equal(executed.run.status, "failed");
  assert.equal(executed.run.failureStage, "input_validation");
  assert.equal(executed.run.billableSeconds, 0);
  assert.ok(executed.run.artifactManifestPath);

  const manifest = JSON.parse(await readFile(executed.run.artifactManifestPath, "utf8")) as ArtifactManifest;
  assert.equal(manifest.run_status, "failed");
  assert.equal(manifest.failure_stage, "input_validation");
  assert.equal(manifest.billing_fact.billable_seconds, 0);
});

test("provider adapter factory requires server-only provider credentials", () => {
  const previousInworldKey = process.env.INWORLD_API_KEY;
  const previousSharedEnvPath = process.env.ORPHEUS_SHARED_ENV_PATH;

  delete process.env.INWORLD_API_KEY;
  process.env.ORPHEUS_SHARED_ENV_PATH = path.join(os.tmpdir(), "missing-orheus-env-file");

  try {
    assert.throws(
      () => createProviderAdapter("inworld"),
      /Missing required environment variable: INWORLD_API_KEY/,
    );
  } finally {
    if (previousInworldKey === undefined) {
      delete process.env.INWORLD_API_KEY;
    } else {
      process.env.INWORLD_API_KEY = previousInworldKey;
    }
    if (previousSharedEnvPath === undefined) {
      delete process.env.ORPHEUS_SHARED_ENV_PATH;
    } else {
      process.env.ORPHEUS_SHARED_ENV_PATH = previousSharedEnvPath;
    }
  }
});
