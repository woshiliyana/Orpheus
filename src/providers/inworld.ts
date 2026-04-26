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

export class InworldProviderAdapter implements TtsProviderAdapter {
  readonly name = "inworld" as const;
  readonly rateUsdPer1mChars: number;

  private readonly apiKey: string;
  private readonly modelId: string;
  private readonly maxAttempts: number;

  constructor(options: InworldAdapterOptions) {
    this.apiKey = options.apiKey;
    this.modelId = options.modelId ?? "inworld-tts-1.5-max";
    this.rateUsdPer1mChars = options.rateUsdPer1mChars ?? 30;
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
      const rawResponsePath = path.join(input.outputDir, `attempt-${attemptCount}.json`);

      const response = await fetch("https://api.inworld.ai/tts/v1/voice", {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          "Content-Type": "application/json",
        },
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

      const responseText = await response.text();
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

      return {
        audioPath,
        durationSec,
        words: toWordTimings(payload.timestampInfo),
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
