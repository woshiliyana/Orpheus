import test from "node:test";
import assert from "node:assert/strict";
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
      container: "mp3",
      sample_rate: 48000,
      bit_rate: 192000,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
