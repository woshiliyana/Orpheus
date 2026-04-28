import test from "node:test";
import assert from "node:assert/strict";

import { chunkScript } from "../src/pipeline/chunking.js";

function makeParagraph(label: string, repetitions: number): string {
  return Array.from({ length: repetitions }, (_, index) => `${label} sentence ${index + 1}.`).join(" ");
}

test("chunkScript prefers paragraph boundaries over later punctuation boundaries", () => {
  const paragraphOne = makeParagraph("Alpha", 70);
  const paragraphTwo = makeParagraph("Beta", 70);
  const script = `${paragraphOne}\n\n${paragraphTwo}`;

  const chunks = chunkScript(script, {
    minChunkSize: 500,
    maxChunkSize: 1900,
  });

  assert.equal(chunks.length, 2);
  assert.equal(chunks[0]?.text.endsWith("\n\n"), true);
  assert.equal(chunks[0]?.endChar, paragraphOne.length + 2);
  assert.ok(chunks[0]!.text.length >= 500);
  assert.ok(chunks[0]!.text.length <= 1900);
  assert.ok(chunks[1]!.text.length >= 500);
  assert.ok(chunks[1]!.text.length <= 1900);
});

test("chunkScript falls back to the last space when no stronger boundary exists", () => {
  const words = Array.from({ length: 340 }, (_, index) => `token${index}`);
  const script = words.join(" ");

  const chunks = chunkScript(script, {
    minChunkSize: 500,
    maxChunkSize: 650,
  });

  assert.ok(chunks.length >= 2);
  for (const chunk of chunks.slice(0, -1)) {
    assert.ok(chunk.text.length >= 500, `chunk too small: ${chunk.text.length}`);
    assert.ok(chunk.text.length <= 650, `chunk too large: ${chunk.text.length}`);
    assert.equal(chunk.text.endsWith(" "), true);
  }

  const rebuilt = chunks.map((chunk) => chunk.text).join("");
  assert.equal(rebuilt, script);
});

test("chunkScript preserves offsets and deterministic ordering", () => {
  const script = `${makeParagraph("Gamma", 25)}\n${makeParagraph("Delta", 25)}\n${makeParagraph("Epsilon", 25)}`;

  const first = chunkScript(script, { minChunkSize: 500, maxChunkSize: 900 });
  const second = chunkScript(script, { minChunkSize: 500, maxChunkSize: 900 });

  assert.deepEqual(first, second);
  assert.equal(first[0]?.startChar, 0);

  for (const [index, chunk] of first.entries()) {
    assert.equal(chunk.index, index);
    assert.equal(script.slice(chunk.startChar, chunk.endChar), chunk.text);
    if (index > 0) {
      assert.equal(chunk.startChar, first[index - 1]!.endChar);
    }
  }
});

test("chunkScript does not split Inworld break tags across provider chunks", () => {
  const script = `${"a".repeat(12)} <break time="600ms" /> ${"b".repeat(30)}`;
  const chunks = chunkScript(script, { minChunkSize: 10, maxChunkSize: 25 });

  assert.equal(chunks.map((chunk) => chunk.text).join(""), script);
  for (const chunk of chunks) {
    assert.equal(chunk.text.includes("<break") && !chunk.text.includes("/>"), false);
    assert.equal(!chunk.text.includes("<break") && chunk.text.includes("/>"), false);
  }
});
