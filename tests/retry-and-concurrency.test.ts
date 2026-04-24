import test from "node:test";
import assert from "node:assert/strict";

import { mapWithConcurrency, retryWithExponentialBackoff } from "../src/utils/async.js";

test("retryWithExponentialBackoff retries 429 and 5xx responses with exponential delays", async () => {
  const seenDelays: number[] = [];
  let attempts = 0;

  const result = await retryWithExponentialBackoff(
    async () => {
      attempts += 1;
      if (attempts < 3) {
        const error = new Error("rate limited") as Error & { statusCode?: number };
        error.statusCode = 429;
        throw error;
      }

      return "ok";
    },
    {
      maxAttempts: 3,
      baseDelayMs: 100,
      sleep: async (delayMs) => {
        seenDelays.push(delayMs);
      },
    },
  );

  assert.equal(result, "ok");
  assert.equal(attempts, 3);
  assert.deepEqual(seenDelays, [100, 200]);
});

test("retryWithExponentialBackoff does not retry non-retryable errors", async () => {
  let attempts = 0;

  await assert.rejects(
    () =>
      retryWithExponentialBackoff(
        async () => {
          attempts += 1;
          const error = new Error("bad request") as Error & { statusCode?: number };
          error.statusCode = 400;
          throw error;
        },
        { maxAttempts: 3, baseDelayMs: 100 },
      ),
    /bad request/,
  );

  assert.equal(attempts, 1);
});

test("mapWithConcurrency never exceeds the configured parallelism", async () => {
  let inFlight = 0;
  let maxInFlight = 0;

  const values = await mapWithConcurrency(
    [1, 2, 3, 4, 5],
    2,
    async (value) => {
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise((resolve) => setTimeout(resolve, 10));
      inFlight -= 1;
      return value * 2;
    },
  );

  assert.deepEqual(values, [2, 4, 6, 8, 10]);
  assert.equal(maxInFlight, 2);
});
