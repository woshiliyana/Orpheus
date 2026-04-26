import path from "node:path";
import { writeFile } from "node:fs/promises";

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

interface CartesiaEvent {
  type?: string;
  data?: string;
  done?: boolean;
  status_code?: number;
  word_timestamps?: {
    words?: string[];
    start?: number[];
    end?: number[];
  };
  error?: string;
  message?: string;
}

interface CartesiaAdapterOptions {
  apiKey: string;
  apiVersion?: string;
  modelId?: string;
  rateUsdPer1mChars?: number;
  maxAttempts?: number;
}

function buildOutputFormat(outputFormat: ChunkSynthesisInput["outputFormat"]): Record<string, unknown> {
  if (outputFormat === "wav") {
    return {
      container: "wav",
      sample_rate: 48000,
      encoding: "pcm_s16le",
    };
  }

  return {
    container: "mp3",
    sample_rate: 48000,
    bit_rate: 192000,
  };
}

function parseSseEvents(rawSse: string): CartesiaEvent[] {
  return rawSse
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split(/\r?\n/);
      let eventType: string | undefined;
      const dataLines: string[] = [];

      for (const line of lines) {
        if (line.startsWith("event:")) {
          eventType = line.slice(6).trim();
        }
        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trimStart());
        }
      }

      if (dataLines.length === 0) {
        return [];
      }

      const data = dataLines.join("\n");
      if (data === "[DONE]") {
        return [];
      }

      const payload = JSON.parse(data) as CartesiaEvent;
      if (payload.type === undefined && eventType !== undefined) {
        payload.type = eventType;
      }
      return [payload];
    });
}

function toWordTimings(events: CartesiaEvent[]): WordTiming[] {
  const timings: WordTiming[] = [];

  for (const event of events) {
    const words = event.word_timestamps?.words ?? [];
    const starts = event.word_timestamps?.start ?? [];
    const ends = event.word_timestamps?.end ?? [];
    for (let index = 0; index < words.length; index += 1) {
      timings.push({
        text: words[index]!,
        startSec: starts[index] ?? 0,
        endSec: ends[index] ?? starts[index] ?? 0,
      });
    }
  }

  return timings;
}

export class CartesiaProviderAdapter implements TtsProviderAdapter {
  readonly name = "cartesia" as const;
  readonly rateUsdPer1mChars: number;

  private readonly apiKey: string;
  private readonly apiVersion: string;
  private readonly modelId: string;
  private readonly maxAttempts: number;

  constructor(options: CartesiaAdapterOptions) {
    this.apiKey = options.apiKey;
    this.apiVersion = options.apiVersion ?? "2026-03-01";
    this.modelId = options.modelId ?? "sonic-3";
    this.rateUsdPer1mChars = options.rateUsdPer1mChars ?? 31.2;
    this.maxAttempts = options.maxAttempts ?? 3;
  }

  async synthesizeChunk(input: ChunkSynthesisInput): Promise<ChunkSynthesisResult> {
    await ensureDir(input.outputDir);

    const rawResponsePaths: string[] = [];
    let attemptCount = 0;
    let totalProviderCharactersProcessed = 0;

    const result = await retryWithExponentialBackoff(async () => {
      attemptCount += 1;

      const audioPath = path.join(input.outputDir, `audio.${input.outputFormat}`);
      const rawResponsePath = path.join(input.outputDir, `attempt-${attemptCount}.sse.txt`);
      const parsedResponsePath = path.join(input.outputDir, `attempt-${attemptCount}.jsonl`);

      const response = await fetch("https://api.cartesia.ai/tts/sse", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Cartesia-Version": this.apiVersion,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_id: this.modelId,
          transcript: input.chunk.text,
          voice: {
            mode: "id",
            id: input.voiceId,
          },
          output_format: buildOutputFormat(input.outputFormat),
          language: input.language,
          add_timestamps: true,
          use_normalized_timestamps: true,
        }),
      });

      const rawSse = await response.text();
      await writeFile(
        rawResponsePath,
        rawSse,
        "utf8",
      );
      rawResponsePaths.push(rawResponsePath);
      totalProviderCharactersProcessed += input.chunk.text.length;

      let events: CartesiaEvent[];
      try {
        events = parseSseEvents(rawSse);
      } catch (error) {
        const providerError = new Error(
          error instanceof Error ? error.message : "Failed to parse Cartesia SSE response",
        ) as ProviderAttemptError;
        providerError.statusCode = response.status;
        providerError.rawResponsePaths = [...rawResponsePaths];
        providerError.attemptCount = attemptCount;
        providerError.providerCharactersProcessed = totalProviderCharactersProcessed;
        throw providerError;
      }
      await writeFile(
        parsedResponsePath,
        `${events.map((event) => JSON.stringify(event)).join("\n")}\n`,
        "utf8",
      );
      rawResponsePaths.push(parsedResponsePath);

      if (!response.ok) {
        const firstError = events.find((event) => event.type === "error");
        const providerError = new Error(firstError?.message ?? firstError?.error ?? `Cartesia request failed with status ${response.status}`) as ProviderAttemptError;
        providerError.statusCode = response.status;
        providerError.rawResponsePaths = [...rawResponsePaths];
        providerError.attemptCount = attemptCount;
        providerError.providerCharactersProcessed = totalProviderCharactersProcessed;
        throw providerError;
      }

      const audioBuffer = Buffer.concat(
        events
          .filter((event) => event.type === "chunk" && typeof event.data === "string")
          .map((event) => Buffer.from(event.data!, "base64")),
      );
      await writeFile(audioPath, audioBuffer);
      const durationSec = await getAudioDurationSec(audioPath);

      return {
        audioPath,
        durationSec,
        words: toWordTimings(events),
        rawResponsePaths: [...rawResponsePaths],
        attemptCount,
        providerCharactersProcessed: totalProviderCharactersProcessed,
      };
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
