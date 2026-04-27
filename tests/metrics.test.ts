import test from "node:test";
import assert from "node:assert/strict";

import { buildRunMetrics } from "../src/observability/metrics.js";

test("buildRunMetrics derives coverage and internal cost metrics from run facts", () => {
  const metrics = buildRunMetrics({
    provider: "inworld",
    requestId: "req_test",
    scriptChars: 2400,
    chunkCount: 2,
    chunkRetryCount: 1,
    cachedChunkCount: 1,
    totalWallTimeMs: 8_500,
    audioDurationSec: 120,
    wordsExpected: 20,
    wordsWithTimestamps: 18,
    providerCharactersAttempted: 3_000,
    providerCharactersReused: 1_200,
    providerRateUsdPer1mChars: 30,
    alignmentComputePerAudioMinuteUsd: 0.01,
    storageDeliveryPerAudioMinuteUsd: 0.002,
    sttFallbackPerAudioMinuteUsd: 0,
  });

  assert.equal(metrics.provider, "inworld");
  assert.equal(metrics.scriptChars, 2400);
  assert.equal(metrics.chunkCount, 2);
  assert.equal(metrics.chunkRetryCount, 1);
  assert.equal(metrics.cachedChunkCount, 1);
  assert.equal(metrics.providerCharactersReused, 1200);
  assert.equal(metrics.audioDurationSec, 120);
  assert.equal(metrics.timestampCoveragePct, 90);
  assert.equal(metrics.estimatedTtsCostUsd, 0.09);
  assert.equal(metrics.estimatedTotalCostUsd, 0.114);
  assert.equal(metrics.estimatedCostPerCompletedAudioMinuteUsd, 0.057);
});

test("buildRunMetrics caps timestamp coverage at 100 percent", () => {
  const metrics = buildRunMetrics({
    provider: "inworld",
    requestId: "req_timestamp_overcoverage",
    scriptChars: 1200,
    chunkCount: 1,
    chunkRetryCount: 0,
    totalWallTimeMs: 1_000,
    audioDurationSec: 60,
    wordsExpected: 10,
    wordsWithTimestamps: 15,
    providerCharactersAttempted: 1200,
    providerRateUsdPer1mChars: 30,
    alignmentComputePerAudioMinuteUsd: 0.01,
    storageDeliveryPerAudioMinuteUsd: 0.002,
    sttFallbackPerAudioMinuteUsd: 0,
  });

  assert.equal(metrics.timestampCoveragePct, 100);
});
