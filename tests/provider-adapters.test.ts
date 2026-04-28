import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import { CartesiaProviderAdapter } from "../src/providers/cartesia.js";
import { InworldProviderAdapter } from "../src/providers/inworld.js";
import type { ChunkSynthesisInput } from "../src/domain/types.js";

const execFileAsync = promisify(execFile);

function makeChunkInput(outputDir: string, text = "Hello world from Orpheus."): ChunkSynthesisInput {
  return {
    chunk: {
      index: 0,
      id: "chunk_0",
      text,
      startChar: 0,
      endChar: text.length,
    },
    language: "en",
    voiceId: "Ashley",
    outputFormat: "mp3",
    outputDir,
  };
}

async function generateMp3Base64(tmpDir: string): Promise<string> {
  const audioPath = path.join(tmpDir, "fixture.mp3");
  await execFileAsync("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "sine=frequency=440:duration=1",
    "-q:a",
    "2",
    audioPath,
  ]);

  const bytes = await readFile(audioPath);
  return bytes.toString("base64");
}

function makeJsonResponse(status: number, payload: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => JSON.stringify(payload),
  } as Response;
}

function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function makeTextResponse(status: number, body: string): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => body,
  } as Response;
}

test("Inworld adapter counts provider characters across retry attempts", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-inworld-adapter-"));
  const audioContent = await generateMp3Base64(tmpDir);
  const input = makeChunkInput(tmpDir, "Retry cost accounting should include failed attempts.");
  const originalFetch = globalThis.fetch;
  let attempts = 0;
  let requestBody: Record<string, unknown> | undefined;

  globalThis.fetch = async (_url, init) => {
    attempts += 1;
    requestBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    if (attempts === 1) {
      return makeJsonResponse(429, { error: { message: "rate limited" } });
    }

    return makeJsonResponse(200, { audioContent });
  };

  try {
    const adapter = new InworldProviderAdapter({ apiKey: "test-key", maxAttempts: 3 });
    const result = await adapter.synthesizeChunk(input);

    assert.equal(result.attemptCount, 2);
    assert.equal(result.providerCharactersProcessed, input.chunk.text.length * 2);
    assert.equal(result.rawResponsePaths.length, 2);
    assert.deepEqual(requestBody?.audioConfig, {
      audioEncoding: "MP3",
      sampleRateHertz: 48000,
      bitRate: 192000,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Inworld adapter retries transient terminated responses and keeps attempt evidence", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-inworld-terminated-"));
  const audioContent = await generateMp3Base64(tmpDir);
  const input = makeChunkInput(tmpDir, "Network termination should be retried for one chunk.");
  const originalFetch = globalThis.fetch;
  let attempts = 0;

  globalThis.fetch = async () => {
    attempts += 1;
    if (attempts === 1) {
      const error = new Error("terminated") as Error & { code?: string };
      error.code = "UND_ERR_SOCKET";
      throw error;
    }

    return makeJsonResponse(200, { audioContent });
  };

  try {
    const adapter = new InworldProviderAdapter({ apiKey: "test-key", maxAttempts: 2 });
    const result = await adapter.synthesizeChunk(input);

    assert.equal(attempts, 2);
    assert.equal(result.attemptCount, 2);
    assert.equal(result.providerCharactersProcessed, input.chunk.text.length * 2);
    assert.equal(result.rawResponsePaths.length, 2);
    assert.match(await readFile(path.join(tmpDir, "attempt-1.error.json"), "utf8"), /terminated/);
    assert.match(await readFile(path.join(tmpDir, "chunk-result.json"), "utf8"), /chunkSha256/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Inworld adapter reuses explicit chunk-result metadata without calling the provider", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-inworld-cache-metadata-"));
  const input = makeChunkInput(tmpDir, "Cached chunks should avoid a second provider call.");
  const audioContent = await generateMp3Base64(tmpDir);
  const audioPath = path.join(tmpDir, "audio.mp3");
  const rawResponsePath = path.join(tmpDir, "attempt-1.json");
  const words = [{ text: "Cached", startSec: 0, endSec: 0.25 }];

  await writeFile(audioPath, Buffer.from(audioContent, "base64"));
  await writeFile(rawResponsePath, JSON.stringify({ audioContent, usage: { processedCharactersCount: input.chunk.text.length } }), "utf8");
  await writeFile(path.join(tmpDir, "chunk-result.json"), JSON.stringify({
    cacheVersion: 1,
    provider: "inworld",
    chunkId: input.chunk.id,
    chunkSha256: hashText(input.chunk.text),
    language: input.language,
    voiceId: input.voiceId,
    outputFormat: input.outputFormat,
    audioPath,
    durationSec: 1,
    words,
    rawResponsePaths: [rawResponsePath],
    attemptCount: 1,
    providerCharactersProcessed: input.chunk.text.length,
  }, null, 2), "utf8");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("fetch should not be called for cached chunks");
  };

  try {
    const adapter = new InworldProviderAdapter({ apiKey: "test-key", maxAttempts: 1 });
    const result = await adapter.synthesizeChunk({ ...input, reuseCompletedChunk: true });

    assert.equal(result.cacheHit, true);
    assert.equal(result.cacheSource, "chunk_result_metadata");
    assert.equal(result.providerCharactersProcessed, input.chunk.text.length);
    assert.deepEqual(result.words, words);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Inworld adapter can reuse legacy raw response chunks when character counts match", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-inworld-cache-legacy-"));
  const input = makeChunkInput(tmpDir, "Legacy cached chunks need safe reuse for failed smoke reruns.");
  const audioContent = await generateMp3Base64(tmpDir);
  const audioPath = path.join(tmpDir, "audio.mp3");

  await writeFile(audioPath, Buffer.from(audioContent, "base64"));
  await writeFile(path.join(tmpDir, "attempt-1.json"), JSON.stringify({
    audioContent,
    timestampInfo: {
      wordAlignment: {
        words: ["Legacy", "cached"],
        wordStartTimeSeconds: [0, 0.3],
        wordEndTimeSeconds: [0.2, 0.5],
      },
    },
    usage: {
      processedCharactersCount: input.chunk.text.length,
      modelId: "inworld-tts-1.5-max",
    },
  }, null, 2), "utf8");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("fetch should not be called for legacy cached chunks");
  };

  try {
    const adapter = new InworldProviderAdapter({ apiKey: "test-key", maxAttempts: 1 });
    const result = await adapter.synthesizeChunk({ ...input, reuseCompletedChunk: true });

    assert.equal(result.cacheHit, true);
    assert.equal(result.cacheSource, "legacy_provider_response");
    assert.equal(result.providerCharactersProcessed, input.chunk.text.length);
    assert.deepEqual(result.words.map((word) => word.text), ["Legacy", "cached"]);
    assert.ok(result.durationSec > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Cartesia adapter writes raw SSE before parsing malformed responses", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-cartesia-adapter-"));
  const input = makeChunkInput(tmpDir, "Malformed SSE should still be persisted.");
  const originalFetch = globalThis.fetch;
  const malformedSse = "event: chunk\ndata: {\"type\":\"chunk\",\"data\":\"abc\"\n\n";
  let requestBody: Record<string, unknown> | undefined;

  globalThis.fetch = async (_url, init) => {
    requestBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return makeTextResponse(200, malformedSse);
  };

  try {
    const adapter = new CartesiaProviderAdapter({ apiKey: "test-key", maxAttempts: 1 });
    await assert.rejects(() => adapter.synthesizeChunk(input), Error);

    const rawResponse = await readFile(path.join(tmpDir, "attempt-1.sse.txt"), "utf8");
    assert.equal(rawResponse, malformedSse);
    assert.deepEqual(requestBody?.output_format, {
      container: "raw",
      sample_rate: 48000,
      encoding: "pcm_s16le",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Cartesia adapter transcodes raw SSE audio and keeps timestamps", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-cartesia-adapter-success-"));
  const input = makeChunkInput(tmpDir, "Raw SSE audio should become an MP3 chunk.");
  const originalFetch = globalThis.fetch;
  const oneSecondSilence = Buffer.alloc(48_000 * 2);
  const sse = [
    "event: chunk",
    `data: ${JSON.stringify({ type: "chunk", audio: oneSecondSilence.toString("base64") })}`,
    "",
    "event: timestamps",
    `data: ${JSON.stringify({
      type: "timestamps",
      word_timestamps: {
        words: ["Raw", "SSE"],
        start: [0, 0.4],
        end: [0.25, 0.7],
      },
    })}`,
    "",
  ].join("\n");

  globalThis.fetch = async () => makeTextResponse(200, sse);

  try {
    const adapter = new CartesiaProviderAdapter({ apiKey: "test-key", maxAttempts: 1 });
    const result = await adapter.synthesizeChunk(input);

    assert.equal(path.basename(result.audioPath), "audio.mp3");
    assert.ok(result.durationSec > 0.9);
    assert.deepEqual(result.words.map((word) => word.text), ["Raw", "SSE"]);
    assert.match(await readFile(path.join(tmpDir, "attempt-1.jsonl"), "utf8"), /timestamps/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
