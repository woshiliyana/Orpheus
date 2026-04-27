import { createHash } from "node:crypto";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

import type {
  ChunkSynthesisInput,
  ChunkSynthesisResult,
  ProviderAttemptError,
  TtsProviderAdapter,
  WordTiming,
} from "../domain/types.js";
import { retryWithExponentialBackoff } from "../utils/async.js";
import { getAudioDurationSec } from "../utils/audio.js";
import { ensureDir } from "../utils/files.js";

interface InworldResponse {
  audioContent?: string;
  timestampInfo?: {
    wordAlignment?: {
      words?: string[];
      wordStartTimeSeconds?: number[];
      wordEndTimeSeconds?: number[];
    };
  };
  usage?: {
    processedCharactersCount?: number;
    modelId?: string;
  };
  error?: {
    code?: number;
    message?: string;
  };
}

interface InworldAdapterOptions {
  apiKey: string;
  modelId?: string;
  rateUsdPer1mChars?: number;
  maxAttempts?: number;
  requestTimeoutMs?: number;
}

interface InworldChunkCache {
  cacheVersion: 1;
  provider: "inworld";
  chunkId: string;
  chunkSha256: string;
  language: string;
  voiceId: string;
  outputFormat: ChunkSynthesisInput["outputFormat"];
  audioPath: string;
  durationSec: number;
  words: WordTiming[];
  rawResponsePaths: string[];
  attemptCount: number;
  providerCharactersProcessed: number;
}

function toWordTimings(payload: InworldResponse["timestampInfo"]): WordTiming[] {
  const alignment = payload?.wordAlignment;
  const words = alignment?.words ?? [];
  const starts = alignment?.wordStartTimeSeconds ?? [];
  const ends = alignment?.wordEndTimeSeconds ?? [];

  return words.map((text, index) => ({
    text,
    startSec: starts[index] ?? 0,
    endSec: ends[index] ?? starts[index] ?? 0,
  }));
}

function buildAudioConfig(outputFormat: ChunkSynthesisInput["outputFormat"]): Record<string, unknown> {
  if (outputFormat === "wav") {
    return {
      audioEncoding: "LINEAR16",
      sampleRateHertz: 48000,
    };
  }

  return {
    audioEncoding: "MP3",
    sampleRateHertz: 48000,
    bitRate: 192000,
  };
}

function hashChunk(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function chunkCachePath(outputDir: string): string {
  return path.join(outputDir, "chunk-result.json");
}

function buildChunkCache(
  input: ChunkSynthesisInput,
  result: ChunkSynthesisResult,
): InworldChunkCache {
  return {
    cacheVersion: 1,
    provider: "inworld",
    chunkId: input.chunk.id,
    chunkSha256: hashChunk(input.chunk.text),
    language: input.language,
    voiceId: input.voiceId,
    outputFormat: input.outputFormat,
    audioPath: result.audioPath,
    durationSec: result.durationSec,
    words: result.words,
    rawResponsePaths: result.rawResponsePaths,
    attemptCount: result.attemptCount,
    providerCharactersProcessed: result.providerCharactersProcessed,
  };
}

function matchesChunkCache(input: ChunkSynthesisInput, cache: InworldChunkCache): boolean {
  return cache.cacheVersion === 1 &&
    cache.provider === "inworld" &&
    cache.chunkId === input.chunk.id &&
    cache.chunkSha256 === hashChunk(input.chunk.text) &&
    cache.language === input.language &&
    cache.voiceId === input.voiceId &&
    cache.outputFormat === input.outputFormat;
}

async function readJsonFile<T>(filePath: string): Promise<T | undefined> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch {
    return undefined;
  }
}

function getAttemptJsonPaths(outputDir: string): string[] {
  if (!existsSync(outputDir)) {
    return [];
  }

  return readdirSync(outputDir)
    .filter((fileName) => /^attempt-\d+\.json$/.test(fileName))
    .sort((left, right) => Number(left.match(/\d+/)?.[0] ?? 0) - Number(right.match(/\d+/)?.[0] ?? 0))
    .map((fileName) => path.join(outputDir, fileName));
}

function inferAttemptCount(rawResponsePaths: string[]): number {
  return rawResponsePaths.reduce((highest, responsePath) => {
    const attempt = Number(responsePath.match(/attempt-(\d+)(?:\.error)?\.json$/)?.[1] ?? 0);
    return Math.max(highest, attempt);
  }, 1);
}

async function readCachedChunk(input: ChunkSynthesisInput, audioPath: string): Promise<ChunkSynthesisResult | undefined> {
  if (!existsSync(audioPath)) {
    return undefined;
  }

  const metadataPath = chunkCachePath(input.outputDir);
  const metadata = await readJsonFile<InworldChunkCache>(metadataPath);
  if (metadata !== undefined && matchesChunkCache(input, metadata)) {
    return {
      audioPath,
      durationSec: metadata.durationSec,
      words: metadata.words,
      rawResponsePaths: metadata.rawResponsePaths,
      attemptCount: metadata.attemptCount ?? inferAttemptCount(metadata.rawResponsePaths),
      providerCharactersProcessed: metadata.providerCharactersProcessed,
      cacheHit: true,
      cacheSource: "chunk_result_metadata",
    };
  }

  for (const rawResponsePath of getAttemptJsonPaths(input.outputDir).reverse()) {
    const payload = await readJsonFile<InworldResponse>(rawResponsePath);
    if (payload?.audioContent === undefined) {
      continue;
    }
    if ((payload.usage?.processedCharactersCount ?? input.chunk.text.length) !== input.chunk.text.length) {
      continue;
    }

    return {
      audioPath,
      durationSec: await getAudioDurationSec(audioPath),
      words: toWordTimings(payload.timestampInfo),
      rawResponsePaths: [rawResponsePath],
      attemptCount: Number(rawResponsePath.match(/attempt-(\d+)\.json$/)?.[1] ?? 1),
      providerCharactersProcessed: payload.usage?.processedCharactersCount ?? input.chunk.text.length,
      cacheHit: true,
      cacheSource: "legacy_provider_response",
    };
  }

  return undefined;
}

function serializeProviderError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      cause: serializeProviderError(error.cause),
    };
  }

  if (typeof error === "object" && error !== null) {
    const candidate = error as { name?: unknown; message?: unknown; code?: unknown; cause?: unknown };
    return {
      name: candidate.name,
      message: candidate.message,
      code: candidate.code,
      cause: serializeProviderError(candidate.cause),
    };
  }

  return {
    message: String(error),
  };
}

export class InworldProviderAdapter implements TtsProviderAdapter {
  readonly name = "inworld" as const;
  readonly rateUsdPer1mChars: number;

  private readonly apiKey: string;
  private readonly modelId: string;
  private readonly maxAttempts: number;
  private readonly requestTimeoutMs: number;

  constructor(options: InworldAdapterOptions) {
    this.apiKey = options.apiKey;
    this.modelId = options.modelId ?? "inworld-tts-1.5-max";
    this.rateUsdPer1mChars = options.rateUsdPer1mChars ?? 30;
    this.maxAttempts = options.maxAttempts ?? 3;
    this.requestTimeoutMs = options.requestTimeoutMs ?? 900_000;
  }

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    await ensureDir(input.outputDir);
    const audioPath = path.join(input.outputDir, `audio.${input.outputFormat}`);
    if (input.reuseCompletedChunk === true) {
      const cached = await readCachedChunk(input, audioPath);
      if (cached !== undefined) {
        return cached;
      }
    }

    const rawResponsePaths: string[] = [];
    let attemptCount = 0;
    let totalProviderCharactersProcessed = 0;

    const result = await retryWithExponentialBackoff(async () => {
      attemptCount += 1;
      const rawResponsePath = path.join(input.outputDir, `attempt-${attemptCount}.json`);
      const rawErrorPath = path.join(input.outputDir, `attempt-${attemptCount}.error.json`);
      let responseText: string;
      let response: Response;

      try {
        response = await fetch("https://api.inworld.ai/tts/v1/voice", {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          signal: this.requestTimeoutMs > 0 ? AbortSignal.timeout(this.requestTimeoutMs) : undefined,
          body: JSON.stringify({
            text: input.chunk.text,
            voiceId: input.voiceId,
            modelId: this.modelId,
            audioConfig: buildAudioConfig(input.outputFormat),
            temperature: 1,
            applyTextNormalization: "ON",
            timestampType: "WORD",
          }),
        });
        responseText = await response.text();
      } catch (error) {
        totalProviderCharactersProcessed += input.chunk.text.length;
        await writeFile(rawErrorPath, `${JSON.stringify(serializeProviderError(error), null, 2)}\n`, "utf8");
        rawResponsePaths.push(rawErrorPath);

        const providerError = new Error(error instanceof Error ? error.message : String(error)) as ProviderAttemptError;
        providerError.rawResponsePaths = [...rawResponsePaths];
        providerError.attemptCount = attemptCount;
        providerError.providerCharactersProcessed = totalProviderCharactersProcessed;
        throw providerError;
      }

      let payload: InworldResponse;
      try {
        payload = JSON.parse(responseText) as InworldResponse;
      } catch {
        payload = {
          error: {
            message: responseText,
          },
        };
      }

      await writeFile(rawResponsePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
      rawResponsePaths.push(rawResponsePath);
      totalProviderCharactersProcessed += payload.usage?.processedCharactersCount ?? input.chunk.text.length;

      if (!response.ok || payload.audioContent === undefined) {
        const error = new Error(payload.error?.message ?? `Inworld request failed with status ${response.status}`) as ProviderAttemptError;
        error.statusCode = response.status;
        error.rawResponsePaths = [...rawResponsePaths];
        error.attemptCount = attemptCount;
        error.providerCharactersProcessed = totalProviderCharactersProcessed;
        throw error;
      }

      await writeFile(audioPath, Buffer.from(payload.audioContent, "base64"));
      const durationSec = await getAudioDurationSec(audioPath);

      const chunkResult = {
        audioPath,
        durationSec,
        words: toWordTimings(payload.timestampInfo),
        rawResponsePaths: [...rawResponsePaths],
        attemptCount,
        providerCharactersProcessed: totalProviderCharactersProcessed,
      };
      await writeFile(chunkCachePath(input.outputDir), `${JSON.stringify(buildChunkCache(input, chunkResult), null, 2)}\n`, "utf8");

      return chunkResult;
    }, {
      maxAttempts: this.maxAttempts,
      baseDelayMs: 500,
    });

    return {
      ...result,
      rawResponsePaths,
      attemptCount,
    };
  }
}
