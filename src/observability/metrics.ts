import type { ProviderName, RunMetrics } from "../domain/types.js";

interface BuildRunMetricsInput {
  provider: ProviderName;
  requestId: string;
  scriptChars: number;
  chunkCount: number;
  chunkRetryCount: number;
  cachedChunkCount?: number;
  providerCharactersReused?: number;
  totalWallTimeMs: number;
  audioDurationSec: number;
  wordsExpected: number;
  wordsWithTimestamps: number;
  providerCharactersAttempted: number;
  providerRateUsdPer1mChars: number;
  alignmentComputePerAudioMinuteUsd: number;
  storageDeliveryPerAudioMinuteUsd: number;
  sttFallbackPerAudioMinuteUsd: number;
  failureReason?: string;
}

function round(value: number, decimals = 3): number {
  return Number(value.toFixed(decimals));
}

export function buildRunMetrics(input: BuildRunMetricsInput): RunMetrics {
  const audioMinutes = input.audioDurationSec / 60;
  const estimatedTtsCostUsd =
    (input.providerCharactersAttempted / 1_000_000) * input.providerRateUsdPer1mChars;
  const estimatedNonTtsCostUsd =
    audioMinutes *
    (
      input.alignmentComputePerAudioMinuteUsd +
      input.storageDeliveryPerAudioMinuteUsd +
      input.sttFallbackPerAudioMinuteUsd
    );
  const estimatedTotalCostUsd = estimatedTtsCostUsd + estimatedNonTtsCostUsd;
  const coverage = input.wordsExpected === 0
    ? 100
    : Math.min(100, (input.wordsWithTimestamps / input.wordsExpected) * 100);

  return {
    provider: input.provider,
    requestId: input.requestId,
    scriptChars: input.scriptChars,
    chunkCount: input.chunkCount,
    chunkRetryCount: input.chunkRetryCount,
    cachedChunkCount: input.cachedChunkCount,
    providerCharactersReused: input.providerCharactersReused,
    totalWallTimeMs: input.totalWallTimeMs,
    audioDurationSec: round(input.audioDurationSec, 3),
    timestampCoveragePct: round(coverage, 2),
    estimatedTtsCostUsd: round(estimatedTtsCostUsd, 3),
    estimatedTotalCostUsd: round(estimatedTotalCostUsd, 3),
    estimatedCostPerCompletedAudioMinuteUsd: round(
      audioMinutes === 0 ? 0 : estimatedTotalCostUsd / audioMinutes,
      3,
    ),
    timestampWordCount: input.wordsWithTimestamps,
    failureReason: input.failureReason,
  };
}
