import { createHash } from "node:crypto";
import path from "node:path";
import { writeFile } from "node:fs/promises";

import type {
  ArtifactManifest,
  ChunkSynthesisResult,
  FailureStage,
  InputQualityReport,
  NarrationJobInput,
  NarrationRunResult,
  NormalizedWordTiming,
  PacingPlan,
  ProviderAttemptError,
  ScriptChunk,
  TtsProviderAdapter,
} from "../domain/types.js";
import { readNumberEnv } from "../config/env.js";
import { buildRunMetrics } from "../observability/metrics.js";
import { buildPacingArtifacts } from "./pacing-adapter.js";
import { assertReadableScriptInput } from "./script-input-quality.js";
import { stitchAudioSegments } from "./stitch.js";
import { buildSubtitleCues, renderSrt, renderVtt } from "./subtitles.js";
import { mapWithConcurrency } from "../utils/async.js";
import { ensureDir, writeJson } from "../utils/files.js";

const PHASE2_READINESS_LANGUAGES = new Set(["en", "es"]);

interface InputAdapterArtifactPaths {
  sourceScriptPath: string;
  spokenScriptPath: string;
  providerInputPath: string;
  providerInputChunksPath: string;
  pacingPlanPath: string;
  inputQualityReportPath: string;
}

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

function buildInputAdapterRef(input: {
  paths: InputAdapterArtifactPaths;
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
}): NonNullable<ArtifactManifest["input_adapter_ref"]> {
  return {
    pacing_mode: input.pacingPlan.effectiveMode,
    requested_pacing_mode: input.pacingPlan.requestedMode,
    effective_pacing_mode: input.pacingPlan.effectiveMode,
    input_validation_mode: input.inputQualityReport.validationMode,
    token_preserved: input.pacingPlan.tokenPreserved,
    inserted_break_count: input.pacingPlan.insertedBreakCount,
    max_break_tags_per_request: input.pacingPlan.maxBreakTagsPerRequest,
    source_script: input.paths.sourceScriptPath,
    spoken_script: input.paths.spokenScriptPath,
    provider_input: input.paths.providerInputPath,
    provider_input_chunks_json: input.paths.providerInputChunksPath,
    pacing_plan_json: input.paths.pacingPlanPath,
    input_quality_report_json: input.paths.inputQualityReportPath,
  };
}

function collectInputAdapterWarnings(input: {
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
}): string[] {
  const warnings = new Set<string>();

  for (const warning of input.pacingPlan.warnings) {
    warnings.add(`pacing:${warning}`);
  }

  for (const warning of input.inputQualityReport.warnings) {
    warnings.add(`input_quality:${warning.code}`);
  }

  if (!input.pacingPlan.tokenPreserved) {
    warnings.add("pacing_token_preservation_failed");
  }

  if (input.pacingPlan.maxBreakTagsPerRequest > 20) {
    warnings.add("pacing_break_tag_budget_exceeded");
  }

  return [...warnings];
}

function assertProviderInputBudget(input: {
  providerName: NarrationJobInput["provider"];
  pacingPlan: PacingPlan;
}): void {
  if (input.providerName !== "inworld") {
    return;
  }

  if (input.pacingPlan.maxBreakTagsPerRequest <= 20) {
    return;
  }

  throw new Error(
    `Provider input break-tag budget exceeded: Inworld supports at most 20 break tags per request, saw ${input.pacingPlan.maxBreakTagsPerRequest}.`,
  );
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
  cachedChunkCount: number;
  warnings: string[];
  finalAudioPath: string;
  durationSec: number;
  wordTimingsPath: string;
  srtPath: string;
  vttPath: string;
  estimatedTotalCostUsd: number;
  inputAdapterPaths: InputAdapterArtifactPaths;
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
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
      cached_chunk_count: input.cachedChunkCount,
      warning_flags: input.warnings,
    },
    input_adapter_ref: buildInputAdapterRef({
      paths: input.inputAdapterPaths,
      pacingPlan: input.pacingPlan,
      inputQualityReport: input.inputQualityReport,
    }),
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
  cachedChunkCount: number;
  estimatedTotalCostUsd: number;
  failureReason: string;
  failureStage: FailureStage;
  inputAdapterPaths: InputAdapterArtifactPaths;
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
  warnings: string[];
}): ArtifactManifest {
  return {
    project_id: input.projectId,
    run_id: input.requestId,
    run_status: "failed",
    failure_reason: input.failureReason,
    failure_stage: input.failureStage,
    source_script_hash: hashScript(input.script),
    provider_summary: {
      primary_provider: input.providerName,
      selected_voice: input.voiceId,
    },
    orchestration_summary: {
      chunk_count: input.chunkCount,
      stitch_count: 0,
      retry_count: input.retryCount,
      cached_chunk_count: input.cachedChunkCount,
      warning_flags: ["run_failed", ...input.warnings],
    },
    input_adapter_ref: buildInputAdapterRef({
      paths: input.inputAdapterPaths,
      pacingPlan: input.pacingPlan,
      inputQualityReport: input.inputQualityReport,
    }),
    output_language: input.language,
    billing_fact: {
      billable_seconds: 0,
      usage_event_type: "non_billable_failure",
      estimated_total_cost_usd: input.estimatedTotalCostUsd,
    },
    warning_codes: ["run_failed", ...input.warnings],
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function countChunkRetries(chunkResults: Array<{ result: ChunkSynthesisResult }>): number {
  return chunkResults.reduce(
    (sum, chunkResult) => sum + Math.max(0, chunkResult.result.attemptCount - 1),
    0,
  );
}

function countCachedChunks(chunkResults: Array<{ result: ChunkSynthesisResult }>): number {
  return chunkResults.filter((chunkResult) => chunkResult.result.cacheHit === true).length;
}

function countReusedCharacters(chunkResults: Array<{ chunk: ScriptChunk; result: ChunkSynthesisResult }>): number {
  return chunkResults.reduce(
    (sum, chunkResult) => sum + (chunkResult.result.cacheHit === true ? chunkResult.chunk.text.length : 0),
    0,
  );
}

function countProviderCharactersProcessed(chunkResults: Array<{ result: ChunkSynthesisResult }>): number {
  return chunkResults.reduce(
    (sum, chunkResult) => sum + chunkResult.result.providerCharactersProcessed,
    0,
  );
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
  const inputAdapterPaths: InputAdapterArtifactPaths = {
    sourceScriptPath: path.join(artifactsDir, "source-script.md"),
    spokenScriptPath: path.join(artifactsDir, "spoken-script.md"),
    providerInputPath: path.join(artifactsDir, `provider-input.${input.provider}.txt`),
    providerInputChunksPath: path.join(artifactsDir, "provider-input.chunks.json"),
    pacingPlanPath: path.join(artifactsDir, "pacing-plan.json"),
    inputQualityReportPath: path.join(artifactsDir, "input-quality-report.json"),
  };

  await ensureDir(chunksDir);
  await ensureDir(artifactsDir);

  const minChunkSize = input.minChunkSize ?? 500;
  const maxChunkSize = input.maxChunkSize ?? 1900;
  const pacingArtifacts = buildPacingArtifacts({
    sourceScript: input.script,
    provider: input.provider,
    language,
    pacingMode: input.pacingMode ?? "natural_basic",
    inputValidationMode: input.inputValidationMode ?? "strict",
    minChunkSize,
    maxChunkSize,
  });

  await writeFile(inputAdapterPaths.sourceScriptPath, pacingArtifacts.sourceScript, "utf8");
  await writeFile(inputAdapterPaths.spokenScriptPath, pacingArtifacts.spokenScript, "utf8");
  await writeFile(inputAdapterPaths.providerInputPath, pacingArtifacts.providerInput, "utf8");
  await writeJson(inputAdapterPaths.providerInputChunksPath, pacingArtifacts.providerInputChunkReports);
  await writeJson(inputAdapterPaths.pacingPlanPath, pacingArtifacts.pacingPlan);
  await writeJson(inputAdapterPaths.inputQualityReportPath, pacingArtifacts.inputQualityReport);

  const wordsExpected = countWords(input.script);
  const chunks = pacingArtifacts.providerInputChunks;
  const inputAdapterWarnings = collectInputAdapterWarnings({
    pacingPlan: pacingArtifacts.pacingPlan,
    inputQualityReport: pacingArtifacts.inputQualityReport,
  });

  try {
    assertReadableScriptInput(pacingArtifacts.inputQualityReport);
    assertProviderInputBudget({
      providerName: provider.name,
      pacingPlan: pacingArtifacts.pacingPlan,
    });
  } catch (error) {
    const failureReason = getErrorMessage(error);
    const metrics = buildRunMetrics({
      provider: provider.name,
      requestId: input.requestId,
      scriptChars: input.script.length,
      chunkCount: chunks.length,
      chunkRetryCount: 0,
      cachedChunkCount: 0,
      totalWallTimeMs: Date.now() - startedAt,
      audioDurationSec: 0,
      wordsExpected,
      wordsWithTimestamps: 0,
      providerCharactersAttempted: 0,
      providerCharactersReused: 0,
      providerRateUsdPer1mChars: provider.rateUsdPer1mChars,
      alignmentComputePerAudioMinuteUsd: readNumberEnv("ALIGNMENT_COMPUTE_PER_AUDIO_MINUTE_USD", 0.01),
      storageDeliveryPerAudioMinuteUsd: readNumberEnv("STORAGE_DELIVERY_PER_AUDIO_MINUTE_USD", 0.002),
      sttFallbackPerAudioMinuteUsd: 0,
      failureReason,
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
      retryCount: 0,
      cachedChunkCount: 0,
      estimatedTotalCostUsd: metrics.estimatedTotalCostUsd,
      failureReason,
      failureStage: "input_validation",
      inputAdapterPaths,
      pacingPlan: pacingArtifacts.pacingPlan,
      inputQualityReport: pacingArtifacts.inputQualityReport,
      warnings: inputAdapterWarnings,
    });
    await writeJson(artifactManifestPath, artifactManifest);
    throw error;
  }

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
        reuseCompletedChunk: input.reuseCompletedChunks,
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
    const warnings: string[] = [...inputAdapterWarnings];
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
      chunkRetryCount: countChunkRetries(chunkResults),
      cachedChunkCount: countCachedChunks(chunkResults),
      providerCharactersReused: countReusedCharacters(chunkResults),
      totalWallTimeMs: Date.now() - startedAt,
      audioDurationSec: stitched.totalDurationSec,
      wordsExpected,
      wordsWithTimestamps,
      providerCharactersAttempted: countProviderCharactersProcessed(chunkResults),
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
      cachedChunkCount: metrics.cachedChunkCount ?? 0,
      warnings,
      finalAudioPath: stitched.outputPath,
      durationSec: stitched.totalDurationSec,
      wordTimingsPath,
      srtPath,
      vttPath,
      estimatedTotalCostUsd: metrics.estimatedTotalCostUsd,
      inputAdapterPaths,
      pacingPlan: pacingArtifacts.pacingPlan,
      inputQualityReport: pacingArtifacts.inputQualityReport,
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
      sourceScriptPath: inputAdapterPaths.sourceScriptPath,
      spokenScriptPath: inputAdapterPaths.spokenScriptPath,
      providerInputPath: inputAdapterPaths.providerInputPath,
      providerInputChunksPath: inputAdapterPaths.providerInputChunksPath,
      pacingPlanPath: inputAdapterPaths.pacingPlanPath,
      inputQualityReportPath: inputAdapterPaths.inputQualityReportPath,
      timings,
      durationSec: stitched.totalDurationSec,
      provider: provider.name,
      metrics,
      pacingPlan: pacingArtifacts.pacingPlan,
      inputQualityReport: pacingArtifacts.inputQualityReport,
    };
  } catch (error) {
    const providerError = error as ProviderAttemptError;
    const chunkRetryCount =
      countChunkRetries(completedChunkResults) + Math.max(0, (providerError.attemptCount ?? 1) - 1);
    const providerCharactersAttempted =
      countProviderCharactersProcessed(completedChunkResults) +
      (providerError.providerCharactersProcessed ?? 0);
    const cachedChunkCount = countCachedChunks(completedChunkResults);

    const metrics = buildRunMetrics({
      provider: provider.name,
      requestId: input.requestId,
      scriptChars: input.script.length,
      chunkCount: chunks.length,
      chunkRetryCount,
      cachedChunkCount,
      providerCharactersReused: countReusedCharacters(completedChunkResults),
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
      cachedChunkCount,
      estimatedTotalCostUsd: metrics.estimatedTotalCostUsd,
      failureReason: getErrorMessage(error),
      failureStage: "rendering",
      inputAdapterPaths,
      pacingPlan: pacingArtifacts.pacingPlan,
      inputQualityReport: pacingArtifacts.inputQualityReport,
      warnings: inputAdapterWarnings,
    });
    await writeJson(artifactManifestPath, artifactManifest);
    throw error;
  }
}
