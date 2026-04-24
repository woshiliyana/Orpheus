import type { ProviderName, TtsProviderAdapter } from "../domain/types.js";
import { CartesiaProviderAdapter } from "./cartesia.js";
import { InworldProviderAdapter } from "./inworld.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createProviderAdapter(name: ProviderName): TtsProviderAdapter {
  if (name === "inworld") {
    return new InworldProviderAdapter({
      apiKey: requireEnv("INWORLD_API_KEY"),
      rateUsdPer1mChars: Number.parseFloat(process.env.INWORLD_RATE_USD_PER_1M_CHARS ?? "30"),
      maxAttempts: Number.parseInt(process.env.INWORLD_MAX_ATTEMPTS ?? "3", 10),
    });
  }

  return new CartesiaProviderAdapter({
    apiKey: requireEnv("CARTESIA_API_KEY"),
    apiVersion: process.env.CARTESIA_API_VERSION ?? "2026-03-01",
    rateUsdPer1mChars: Number.parseFloat(process.env.CARTESIA_RATE_USD_PER_1M_CHARS ?? "31.2"),
    maxAttempts: Number.parseInt(process.env.CARTESIA_MAX_ATTEMPTS ?? "3", 10),
  });
}
