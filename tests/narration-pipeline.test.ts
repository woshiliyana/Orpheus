import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { runNarrationJob } from "../src/pipeline/narration.js";
import type {
  ArtifactManifest,
  ChunkSynthesisInput,
  ChunkSynthesisResult,
  ProviderInputChunkReport,
  TtsProviderAdapter,
} from "../src/domain/types.js";

const execFileAsync = promisify(execFile);
const BREAK_TAG_REGEX = /\s*<break\s+time=["']\d+(?:ms|s)["']\s*\/?>\s*/giu;

function stripProviderMarkup(value: string): string {
  return value.replace(BREAK_TAG_REGEX, " ");
}

class FakeProvider implements TtsProviderAdapter {
  readonly name = "inworld";
  readonly rateUsdPer1mChars = 30;

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    const chunkDir = input.outputDir;
    const audioPath = path.join(chunkDir, `chunk-${String(input.chunk.index).padStart(3, "0")}.mp3`);
    const rawResponsePath = path.join(chunkDir, `chunk-${String(input.chunk.index).padStart(3, "0")}.json`);

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

class FakeCartesiaProvider implements TtsProviderAdapter {
  readonly name = "cartesia" as const;
  readonly rateUsdPer1mChars = 31.2;

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    const chunkDir = input.outputDir;
    const audioPath = path.join(
      chunkDir,
      `chunk-${String(input.chunk.index).padStart(3, "0")}.${input.outputFormat}`,
    );
    const rawResponsePath = path.join(chunkDir, `chunk-${String(input.chunk.index).padStart(3, "0")}.json`);
    const rawPcmPath = path.join(input.outputDir, "audio.raw.pcm");
    const words = stripProviderMarkup(input.chunk.text)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text, index) => ({
        text,
        startSec: index * 0.18,
        endSec: index * 0.18 + 0.14,
      }));

    const outputArgs = input.outputFormat === "wav" ? [] : ["-q:a", "2"];
    await execFileAsync("ffmpeg", [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `sine=frequency=${520 + input.chunk.index * 110}:duration=${Math.max(1, words.length * 0.18)}`,
      ...outputArgs,
      audioPath,
    ]);
    await writeFile(rawResponsePath, JSON.stringify({ chunkIndex: input.chunk.index, words }, null, 2), "utf8");
    await writeFile(rawPcmPath, Buffer.alloc(48_000 * 2));

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

class UnexpectedProviderCall implements TtsProviderAdapter {
  readonly name = "inworld";
  readonly rateUsdPer1mChars = 30;
  called = false;

  async synthesizeChunk(): Promise<ChunkSynthesisResult> {
    this.called = true;
    throw new Error("provider should not be called");
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
    result.sourceScriptPath,
    result.spokenScriptPath,
    result.providerInputPath,
    result.providerInputChunksPath,
    result.pacingPlanPath,
    result.inputQualityReportPath,
  ]) {
    const artifactStats = await stat(artifactPath);
    assert.ok(artifactStats.size > 0, `${artifactPath} should not be empty`);
  }

  const timings = JSON.parse(await readFile(result.wordTimingsPath, "utf8")) as Array<{ startSec: number; endSec: number }>;
  for (let index = 1; index < timings.length; index += 1) {
    assert.ok(timings[index]!.startSec >= timings[index - 1]!.startSec);
    assert.ok(timings[index]!.endSec >= timings[index]!.startSec);
  }

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as ArtifactManifest;
  assert.equal(manifest.output_language, "en");
  assert.ok(manifest.orchestration_summary.chunk_count >= 2);
  assert.equal(manifest.input_adapter_ref?.pacing_mode, "natural_basic");
  assert.equal(manifest.input_adapter_ref?.requested_pacing_mode, "natural_basic");
  assert.equal(manifest.input_adapter_ref?.effective_pacing_mode, "natural_basic");
  assert.equal(manifest.input_adapter_ref?.input_validation_mode, "strict");
  assert.equal(manifest.input_adapter_ref?.token_preserved, true);
  assert.ok((manifest.input_adapter_ref?.inserted_break_count ?? 0) > 0);
  assert.deepEqual(manifest.production_master_audio_ref, []);
  assert.equal(manifest.delivery_audio_ref?.[0]?.asset_ref, result.audioPath);
  assert.equal(manifest.delivery_audio_ref?.[0]?.format, "mp3");
  assert.equal(manifest.delivery_audio_ref?.[0]?.audio_format_verdict, "ready_for_delivery");
  assert.equal(manifest.audio_format_policy?.requested_provider_source_format, "mp3");
  assert.equal(manifest.audio_format_policy?.provider_source_lossless, false);
  assert.equal(manifest.audio_format_policy?.production_master_audio.status, "not_generated");
  assert.equal(manifest.audio_format_policy?.default_delivery_audio.generated, true);
  assert.equal(manifest.audio_format_policy?.optional_wav_export.audio_format_verdict, "hold_for_export");

  const providerInput = await readFile(result.providerInputPath, "utf8");
  assert.match(providerInput, /<break time="600ms" \/>/);

  const chunkReports = JSON.parse(await readFile(result.providerInputChunksPath, "utf8")) as ProviderInputChunkReport[];
  assert.ok(chunkReports.length >= 2);
  for (const chunkReport of chunkReports) {
    assert.equal(chunkReport.breakTagCount <= 20, true);
  }
});

test("runNarrationJob records Cartesia raw PCM master and derived MP3 delivery refs", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-cartesia-format-"));
  const result = await runNarrationJob({
    requestId: "req_cartesia_format",
    projectId: "project_cartesia_format",
    provider: "cartesia",
    language: "en",
    voiceId: "Theo",
    outputFormat: "mp3",
    script: "Raw PCM from Cartesia should remain the production master. The MP3 should be delivery audio.",
    outputDir: tmpDir,
    pacingMode: "exact",
  }, new FakeCartesiaProvider());

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as ArtifactManifest;

  assert.equal(manifest.audio_format_policy?.requested_provider_source_format, "raw_pcm");
  assert.equal(manifest.audio_format_policy?.provider_source_encoding, "pcm_s16le");
  assert.equal(manifest.audio_format_policy?.provider_source_lossless, true);
  assert.equal(manifest.audio_format_policy?.production_master_audio.status, "generated");
  assert.equal(
    manifest.audio_format_policy?.production_master_audio.audio_format_verdict,
    "ready_for_internal_master",
  );
  assert.equal(manifest.audio_format_policy?.default_delivery_audio.audio_format_verdict, "ready_for_delivery");
  assert.equal(manifest.production_master_audio_ref?.[0]?.role, "production_master_audio");
  assert.equal(manifest.production_master_audio_ref?.[0]?.format, "raw_pcm");
  assert.equal(manifest.production_master_audio_ref?.[0]?.source, "provider_native_lossless");
  assert.equal(manifest.production_master_audio_ref?.[0]?.audio_format_verdict, "ready_for_internal_master");
  assert.equal(manifest.delivery_audio_ref?.[0]?.role, "delivery_audio");
  assert.equal(manifest.delivery_audio_ref?.[0]?.asset_ref, result.audioPath);
  assert.equal(manifest.delivery_audio_ref?.[0]?.format, "mp3");
  assert.equal(manifest.delivery_audio_ref?.[0]?.source, "derived_from_master");
  assert.equal(manifest.delivery_audio_ref?.[0]?.derived_from_asset_ref, manifest.production_master_audio_ref?.[0]?.asset_ref);
  assert.deepEqual(manifest.delivery_audio_ref?.[0]?.derived_from_asset_refs, [
    manifest.production_master_audio_ref?.[0]?.asset_ref,
  ]);
  assert.equal(manifest.delivery_audio_ref?.[0]?.audio_format_verdict, "ready_for_delivery");
});

test("runNarrationJob records all Cartesia raw PCM masters for multi-chunk delivery", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-cartesia-multichunk-format-"));
  const result = await runNarrationJob({
    requestId: "req_cartesia_multichunk_format",
    projectId: "project_cartesia_multichunk_format",
    provider: "cartesia",
    language: "en",
    voiceId: "Theo",
    outputFormat: "mp3",
    script: makeLongScript(),
    outputDir: tmpDir,
    pacingMode: "exact",
  }, new FakeCartesiaProvider());

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as ArtifactManifest;
  const masterRefs = manifest.production_master_audio_ref?.map((assetRef) => assetRef.asset_ref) ?? [];

  assert.ok(masterRefs.length >= 2);
  assert.equal(manifest.delivery_audio_ref?.[0]?.source, "derived_from_master");
  assert.equal(manifest.delivery_audio_ref?.[0]?.derived_from_asset_ref, undefined);
  assert.deepEqual(manifest.delivery_audio_ref?.[0]?.derived_from_asset_refs, masterRefs);
});

test("runNarrationJob keeps Cartesia WAV delivery derived from raw PCM masters", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-cartesia-wav-format-"));
  const result = await runNarrationJob({
    requestId: "req_cartesia_wav_format",
    projectId: "project_cartesia_wav_format",
    provider: "cartesia",
    language: "en",
    voiceId: "Theo",
    outputFormat: "wav",
    script: "Cartesia WAV output is locally derived from the retained raw PCM master.",
    outputDir: tmpDir,
    pacingMode: "exact",
  }, new FakeCartesiaProvider());

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as ArtifactManifest;
  const masterRefs = manifest.production_master_audio_ref?.map((assetRef) => assetRef.asset_ref) ?? [];

  assert.deepEqual(masterRefs, [
    path.join(tmpDir, "req_cartesia_wav_format", "chunks", "000", "audio.raw.pcm"),
  ]);
  assert.equal(manifest.delivery_audio_ref?.[0]?.asset_ref, result.audioPath);
  assert.equal(manifest.delivery_audio_ref?.[0]?.format, "wav");
  assert.equal(manifest.delivery_audio_ref?.[0]?.source, "derived_from_master");
  assert.equal(manifest.delivery_audio_ref?.[0]?.provider_native, false);
  assert.equal(manifest.delivery_audio_ref?.[0]?.lossless, true);
  assert.equal(manifest.delivery_audio_ref?.[0]?.derived_from_asset_ref, masterRefs[0]);
  assert.deepEqual(manifest.delivery_audio_ref?.[0]?.derived_from_asset_refs, masterRefs);
  assert.equal(manifest.delivery_audio_ref?.[0]?.audio_format_verdict, "hold_for_export");
});

test("runNarrationJob allows Spanish Phase 2 readiness smoke runs", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-es-"));
  const result = await runNarrationJob({
    requestId: "req_phase2_es",
    projectId: "project_phase2_es",
    provider: "inworld",
    language: "es",
    voiceId: "Rafael",
    outputFormat: "mp3",
    script: "Hola. Esta es una prueba breve de voz en espanol.",
    outputDir: tmpDir,
  }, new FakeProvider());

  assert.ok(result.durationSec > 0);
  assert.ok(result.timings.length > 0);

  const manifest = JSON.parse(await readFile(result.artifactManifestPath, "utf8")) as {
    output_language: string;
    provider_summary: { selected_voice: string };
  };
  assert.equal(manifest.output_language, "es");
  assert.equal(manifest.provider_summary.selected_voice, "Rafael");
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
  const manifest = JSON.parse(await readFile(artifactManifestPath, "utf8")) as ArtifactManifest;

  assert.match(metrics.failureReason ?? "", /synthetic provider failure/);
  assert.ok(metrics.chunkCount >= 2);
  assert.equal(manifest.run_status, "failed");
  assert.match(manifest.failure_reason ?? "", /synthetic provider failure/);
  assert.equal(manifest.billing_fact.usage_event_type, "non_billable_failure");
  assert.equal(manifest.failure_stage, "rendering");
  assert.equal(manifest.input_adapter_ref?.token_preserved, true);
});

test("runNarrationJob blocks strict unpunctuated input before provider calls", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-input-block-"));
  const requestId = "req_input_blocked";
  const provider = new UnexpectedProviderCall();

  await assert.rejects(
    () =>
      runNarrationJob({
        requestId,
        projectId: "project_input_blocked",
        provider: "inworld",
        language: "en",
        voiceId: "Ashley",
        outputFormat: "mp3",
        script: Array.from({ length: 40 }, (_, index) => `word${index}`).join(" "),
        outputDir: tmpDir,
      }, provider),
    /Narration input quality blocked/,
  );

  assert.equal(provider.called, false);

  const artifactsDir = path.join(tmpDir, requestId, "artifacts");
  const metricsPath = path.join(artifactsDir, "metrics.json");
  const artifactManifestPath = path.join(artifactsDir, "artifact-manifest.json");
  const inputQualityReportPath = path.join(artifactsDir, "input-quality-report.json");

  const metrics = JSON.parse(await readFile(metricsPath, "utf8")) as { failureReason?: string };
  const manifest = JSON.parse(await readFile(artifactManifestPath, "utf8")) as ArtifactManifest;
  const inputQuality = JSON.parse(await readFile(inputQualityReportPath, "utf8")) as { status: string };

  assert.match(metrics.failureReason ?? "", /Narration input quality blocked/);
  assert.equal(manifest.run_status, "failed");
  assert.equal(manifest.failure_stage, "input_validation");
  assert.equal(manifest.billing_fact.usage_event_type, "non_billable_failure");
  assert.equal(manifest.billing_fact.billable_seconds, 0);
  assert.equal(manifest.input_adapter_ref?.input_quality_report_json, inputQualityReportPath);
  assert.equal(inputQuality.status, "blocked");
});

test("runNarrationJob blocks over-budget exact Inworld break tags before provider calls", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-pipeline-break-budget-"));
  const requestId = "req_break_budget_blocked";
  const provider = new UnexpectedProviderCall();
  const breakScript = Array.from(
    { length: 21 },
    (_, index) => `Sentence ${index + 1}. <break time="600ms" />`,
  ).join(" ");

  await assert.rejects(
    () =>
      runNarrationJob({
        requestId,
        projectId: "project_break_budget_blocked",
        provider: "inworld",
        language: "en",
        voiceId: "Ashley",
        outputFormat: "mp3",
        script: breakScript,
        outputDir: tmpDir,
        pacingMode: "exact",
      }, provider),
    /Provider input break-tag budget exceeded/,
  );

  assert.equal(provider.called, false);

  const artifactsDir = path.join(tmpDir, requestId, "artifacts");
  const artifactManifestPath = path.join(artifactsDir, "artifact-manifest.json");
  const pacingPlanPath = path.join(artifactsDir, "pacing-plan.json");

  const manifest = JSON.parse(await readFile(artifactManifestPath, "utf8")) as ArtifactManifest;
  const pacingPlan = JSON.parse(await readFile(pacingPlanPath, "utf8")) as {
    requestedMode: string;
    effectiveMode: string;
    maxBreakTagsPerRequest: number;
  };

  assert.equal(manifest.run_status, "failed");
  assert.equal(manifest.failure_stage, "input_validation");
  assert.equal(manifest.billing_fact.usage_event_type, "non_billable_failure");
  assert.equal(manifest.input_adapter_ref?.requested_pacing_mode, "exact");
  assert.equal(manifest.input_adapter_ref?.effective_pacing_mode, "exact");
  assert.equal(manifest.input_adapter_ref?.input_validation_mode, "strict");
  assert.equal(manifest.input_adapter_ref?.max_break_tags_per_request, 21);
  assert.equal(pacingPlan.requestedMode, "exact");
  assert.equal(pacingPlan.effectiveMode, "exact");
  assert.equal(pacingPlan.maxBreakTagsPerRequest, 21);
});
