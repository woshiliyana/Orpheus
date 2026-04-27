import type { ProviderName, TtsProviderAdapter } from "../domain/types.js";
import { readIntegerEnv, readNumberEnv, requireServerEnv } from "../config/env.js";
import { CartesiaProviderAdapter } from "./cartesia.js";
import { InworldProviderAdapter } from "./inworld.js";

export function createProviderAdapter(name: ProviderName): TtsProviderAdapter {
  if (name === "inworld") {
    return new InworldProviderAdapter({
      apiKey: requireServerEnv("INWORLD_API_KEY"),
      rateUsdPer1mChars: readNumberEnv("INWORLD_RATE_USD_PER_1M_CHARS", 30),
      maxAttempts: readIntegerEnv("INWORLD_MAX_ATTEMPTS", 3),
      requestTimeoutMs: readIntegerEnv("INWORLD_REQUEST_TIMEOUT_MS", 900_000),
    });
  }

  return new CartesiaProviderAdapter({
    apiKey: requireServerEnv("CARTESIA_API_KEY"),
    apiVersion: process.env.CARTESIA_API_VERSION ?? "2026-03-01",
    rateUsdPer1mChars: readNumberEnv("CARTESIA_RATE_USD_PER_1M_CHARS", 31.2),
    maxAttempts: readIntegerEnv("CARTESIA_MAX_ATTEMPTS", 3),
  });
}
