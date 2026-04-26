import { createHash } from "node:crypto";
import path from "node:path";
import { writeFile } from "node:fs/promises";

import type {
  ArtifactManifest,
  ChunkSynthesisResult,
  NarrationJobInput,
  NarrationRunResult,
  NormalizedWordTiming,
  ProviderAttemptError,
  ScriptChunk,
  TtsProviderAdapter,
} from "../domain/types.js";
import { readNumberEnv } from "../config/env.js";
import { buildRunMetrics } from "../observability/metrics.js";
import { chunkScript } from "./chunking.js";
import { stitchAudioSegments } from "./stitch.js";
import { buildSubtitleCues, renderSrt, renderVtt } from "./subtitles.js";
import { mapWithConcurrency } from "../utils/async.js";
import { ensureDir, writeJson } from "../utils/files.js";

const PHASE2_READINESS_LANGUAGES = new Set(["en", "es"]);

function hashScript(script: string): string {
  return createHash("sha256").update(script).digest("hex");
}

function countWords(script: string): number {
  const matches = script.match(/\S+/g);
  return matches?.length ?? 0;
}

function normalizeTimings(
  chunkResults: Array<{ chunk: ScriptChunk; result: ChunkSynthesisResult }>,
  segmentReports: Array<{ offsetStartSec: number }>,
): NormalizedWordTiming[] {
  const normalized: NormalizedWordTiming[] = [];
  let previousEnd = 0;

  for (const [index, chunkResult] of chunkResults.entries()) {
    const offset = segmentReports[index]?.offsetStartSec ?? 0;
    for (const word of chunkResult.result.words) {
      let startSec = Number((word.startSec + offset).toFixed(3));
      let endSec = Number((word.endSec + offset).toFixed(3));

      if (startSec < previousEnd) {
        startSec = previousEnd;
      }
      if (endSec < startSec) {
        endSec = startSec;
      }

      normalized.push({
        text: word.text,
        startSec,
        endSec,
        chunkIndex: chunkResult.chunk.index,
      });
      previousEnd = endSec;
    }
  }

  return normalized;
}

function buildArtifactManifest(input: {
  projectId: string;
  requestId: string;
  script: string;
  providerName: NarrationJobInput["provider"];
  voiceId: string;
  language: string;
  chunkCount: number;
  retryCount: number;
  warnings: string[];
  finalAudioPath: string;
  durationSec: number;
  wordTimingsPath: string;
  srtPath: string;
  vttPath: string;
  estimatedTotalCostUsd: number;
}): ArtifactManifest {
  return {
    project_id: input.projectId,
    run_id: input.requestId,
    run_status: "succeeded",
    source_script_hash: hashScript(input.script),
    provider_summary: {
      primary_provider: input.providerName,
      selected_voice: input.voiceId,
    },
    orchestration_summary: {
      chunk_count: input.chunkCount,
      stitch_count: Math.max(0, input.chunkCount - 1),
      retry_count: input.retryCount,
      warning_flags: input.warnings,
    },
    output_language: input.language,
    final_audio_asset_ref: input.finalAudioPath,
    final_audio_duration_seconds: Number(input.durationSec.toFixed(3)),
    internal_alignment_asset_ref: {
      word_timings_json: input.wordTimingsPath,
      srt: input.srtPath,
      vtt: input.vttPath,
      alignment_source: "provider_native",
    },
    billing_fact: {
      billable_seconds: Math.ceil(input.durationSec),
      usage_event_type: "initial_render_success",
      estimated_total_cost_usd: input.estimatedTotalCostUsd,
    },
    delivery_ref: input.finalAudioPath,
    warning_codes: input.warnings.length > 0 ? input.warnings : undefined,
  };
}

function buildFailureArtifactManifest(input: {
  projectId: string;
  requestId: string;
  script: string;
  providerName: NarrationJobInput["provider"];
  voiceId: string;
  language: string;
  chunkCount: number;
  retryCount: number;
  estimatedTotalCostUsd: number;
  failureReason: string;
}): ArtifactManifest {
  return {
    project_id: input.projectId,
    run_id: input.requestId,
    run_status: "failed",
    failure_reason: input.failureReason,
    source_script_hash: hashScript(input.script),
    provider_summary: {
      primary_provider: input.providerName,
      selected_voice: input.voiceId,
    },
    orchestration_summary: {
      chunk_count: input.chunkCount,
      stitch_count: 0,
      retry_count: input.retryCount,
      warning_flags: ["run_failed"],
    },
    output_language: input.language,
    billing_fact: {
      billable_seconds: 0,
      usage_event_type: "non_billable_failure",
      estimated_total_cost_usd: input.estimatedTotalCostUsd,
    },
    warning_codes: ["run_failed"],
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function runNarrationJob(
  input: NarrationJobInput,
  provider: TtsProviderAdapter,
): Promise<NarrationRunResult> {
  const language = input.language.toLowerCase();
  if (!PHASE2_READINESS_LANGUAGES.has(language)) {
    throw new Error("Phase 2 readiness language is currently limited to EN + ES");
  }

  const startedAt = Date.now();
  const projectId = input.projectId ?? input.requestId;
  const runDir = path.join(input.outputDir, input.requestId);
  const chunksDir = path.join(runDir, "chunks");
  const artifactsDir = path.join(runDir, "artifacts");
  const srtPath = path.join(artifactsDir, "subtitles.srt");
  const vttPath = path.join(artifactsDir, "subtitles.vtt");
  const wordTimingsPath = path.join(artifactsDir, "word-timings.json");
  const spliceReportPath = path.join(artifactsDir, "splice-report.json");
  const metricsPath = path.join(artifactsDir, "metrics.json");
  const artifactManifestPath = path.join(artifactsDir, "artifact-manifest.json");
  await ensureDir(chunksDir);
  await ensureDir(artifactsDir);
  const wordsExpected = countWords(input.script);
  const chunks = chunkScript(input.script, {
    minChunkSize: input.minChunkSize ?? 500,
    maxChunkSize: input.maxChunkSize ?? 1900,
  });
  const completedChunkResults: Array<{ chunk: ScriptChunk; result: ChunkSynthesisResult }> = [];

  try {
    await mapWithConcurrency(chunks, input.concurrency ?? 2, async (chunk) => {
      const chunkDir = path.join(chunksDir, String(chunk.index).padStart(3, "0"));
      await ensureDir(chunkDir);
      const result = await provider.synthesizeChunk({
        chunk,
        language,
        voiceId: input.voiceId,
        outputFormat: input.outputFormat,
        outputDir: chunkDir,
      });

      completedChunkResults.push({ chunk, result });
      return result;
    });

    const chunkResults = [...completedChunkResults].sort((left, right) => left.chunk.index - right.chunk.index);
    const stitched = await stitchAudioSegments({
      segmentPaths: chunkResults.map(({ result }) => result.audioPath),
      outputPath: path.join(artifactsDir, `final.${input.outputFormat}`),
    });

    const timings = normalizeTimings(chunkResults, stitched.segmentReports);
    const cues = buildSubtitleCues(timings);

    await writeFile(srtPath, renderSrt(cues), "utf8");
    await writeFile(vttPath, renderVtt(cues), "utf8");
    await writeJson(wordTimingsPath, timings);
    await writeJson(spliceReportPath, stitched);

    const wordsWithTimestamps = timings.length;
    const warnings: string[] = [];
    if (wordsWithTimestamps === 0) {
      warnings.push("timestamp_missing");
    } else if (wordsWithTimestamps < wordsExpected) {
      warnings.push("timestamp_coverage_partial");
    }

    const metrics = buildRunMetrics({
      provider: provider.name,
      requestId: input.requestId,
      scriptChars: input.script.length,
      chunkCount: chunks.length,
      chunkRetryCount: chunkResults.reduce(
        (sum, chunkResult) => sum + Math.max(0, chunkResult.result.attemptCount - 1),
        0,
      ),
      totalWallTimeMs: Date.now() - startedAt,
      audioDurationSec: stitched.totalDurationSec,
      wordsExpected,
      wordsWithTimestamps,
      providerCharactersAttempted: chunkResults.reduce(
        (sum, chunkResult) => sum + chunkResult.result.providerCharactersProcessed,
        0,
      ),
      providerRateUsdPer1mChars: provider.rateUsdPer1mChars,
      alignmentComputePerAudioMinuteUsd: readNumberEnv("ALIGNMENT_COMPUTE_PER_AUDIO_MINUTE_USD", 0.01),
      storageDeliveryPerAudioMinuteUsd: readNumberEnv("STORAGE_DELIVERY_PER_AUDIO_MINUTE_USD", 0.002),
      sttFallbackPerAudioMinuteUsd: 0,
    });
    await writeJson(metricsPath, metrics);

    const artifactManifest = buildArtifactManifest({
      projectId,
      requestId: input.requestId,
      script: input.script,
      providerName: provider.name,
      voiceId: input.voiceId,
      language,
      chunkCount: chunks.length,
      retryCount: metrics.chunkRetryCount,
      warnings,
      finalAudioPath: stitched.outputPath,
      durationSec: stitched.totalDurationSec,
      wordTimingsPath,
      srtPath,
      vttPath,
      estimatedTotalCostUsd: metrics.estimatedTotalCostUsd,
    });
    await writeJson(artifactManifestPath, artifactManifest);

    return {
      audioPath: stitched.outputPath,
      srtPath,
      vttPath,
      wordTimingsPath,
      spliceReportPath,
      artifactManifestPath,
      metricsPath,
      timings,
      durationSec: stitched.totalDurationSec,
      provider: provider.name,
      metrics,
    };
  } catch (error) {
    const providerError = error as ProviderAttemptError;
    const chunkRetryCount =
      completedChunkResults.reduce(
        (sum, chunkResult) => sum + Math.max(0, chunkResult.result.attemptCount - 1),
        0,
      ) +
      Math.max(0, (providerError.attemptCount ?? 1) - 1);
    const providerCharactersAttempted =
      completedChunkResults.reduce(
        (sum, chunkResult) => sum + chunkResult.result.providerCharactersProcessed,
        0,
      ) +
      (providerError.providerCharactersProcessed ?? 0);

    const metrics = buildRunMetrics({
      provider: provider.name,
      requestId: input.requestId,
      scriptChars: input.script.length,
      chunkCount: chunks.length,
      chunkRetryCount,
      totalWallTimeMs: Date.now() - startedAt,
      audioDurationSec: 0,
      wordsExpected,
      wordsWithTimestamps: 0,
      providerCharactersAttempted,
      providerRateUsdPer1mChars: provider.rateUsdPer1mChars,
      alignmentComputePerAudioMinuteUsd: readNumberEnv("ALIGNMENT_COMPUTE_PER_AUDIO_MINUTE_USD", 0.01),
      storageDeliveryPerAudioMinuteUsd: readNumberEnv("STORAGE_DELIVERY_PER_AUDIO_MINUTE_USD", 0.002),
      sttFallbackPerAudioMinuteUsd: 0,
      failureReason: getErrorMessage(error),
    });
    await writeJson(metricsPath, metrics);

    const artifactManifest = buildFailureArtifactManifest({
      projectId,
      requestId: input.requestId,
      script: input.script,
      providerName: provider.name,
      voiceId: input.voiceId,
      language,
      chunkCount: chunks.length,
      retryCount: chunkRetryCount,
      estimatedTotalCostUsd: metrics.estimatedTotalCostUsd,
      failureReason: getErrorMessage(error),
    });
    await writeJson(artifactManifestPath, artifactManifest);
    throw error;
  }
}
