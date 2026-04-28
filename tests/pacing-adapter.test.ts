import test from "node:test";
import assert from "node:assert/strict";
import {
  buildPacingArtifacts,
  countInworldBreakTags,
  stripInworldBreakTags,
} from "../src/pipeline/pacing-adapter.js";
import { validateReadableScriptInput } from "../src/pipeline/script-input-quality.js";

function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

test("natural_basic inserts conservative Inworld breaks without changing the user's words", () => {
  const source = [
    "# Introduction",
    "",
    "Paste the whole script once. Get stable narration with subtitle-ready timing.",
    "",
    "- Add the source text.",
    "- Generate narration.",
    "- Export subtitles.",
  ].join("\n");

  const result = buildPacingArtifacts({
    sourceScript: source,
    provider: "inworld",
    language: "en",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
    minChunkSize: 100,
    maxChunkSize: 1900,
  });

  assert.equal(result.pacingPlan.effectiveMode, "natural_basic");
  assert.equal(result.pacingPlan.tokenPreserved, true);
  assert.ok(result.pacingPlan.insertedBreakCount >= 3);
  assert.match(result.providerInput, /<break time="800ms" \/>/);
  assert.match(result.providerInput, /<break time="600ms" \/>/);
  assert.match(result.providerInput, /<break time="350ms" \/>/);
  assert.equal(normalize(stripInworldBreakTags(result.providerInput)), normalize(source));
});

test("natural_basic never inserts emotion tags, filler words, or emphasis markers", () => {
  const source = "# Update\n\nThe workflow is ready. The narration should be calm and clear.";
  const result = buildPacingArtifacts({
    sourceScript: source,
    provider: "inworld",
    language: "en",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
    minChunkSize: 100,
    maxChunkSize: 1900,
  });

  assert.doesNotMatch(result.providerInput, /\[(happy|sad|angry|sigh|laugh|whispering)\]/i);
  assert.doesNotMatch(result.providerInput, /\b(uh|um|you know)\b/i);
  assert.doesNotMatch(result.providerInput, /\*[^*]+\*/);
});

test("natural_basic falls back to exact for non-Inworld providers", () => {
  const source = "# Update\n\nThis script has punctuation. It should stay exact for this provider.";
  const result = buildPacingArtifacts({
    sourceScript: source,
    provider: "cartesia",
    language: "en",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
    minChunkSize: 100,
    maxChunkSize: 1900,
  });

  assert.equal(result.pacingPlan.effectiveMode, "exact");
  assert.equal(result.providerInput, source);
  assert.match(result.pacingPlan.warnings.join("\n"), /only renders provider break tags for Inworld/);
});

test("natural_basic enforces the Inworld break-tag budget per provider request", () => {
  const listItems = Array.from({ length: 36 }, (_, index) => `- Step ${index + 1}.`).join("\n");
  const source = `# Stress list\n\n${listItems}`;
  const result = buildPacingArtifacts({
    sourceScript: source,
    provider: "inworld",
    language: "en",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
    minChunkSize: 100,
    maxChunkSize: 3000,
  });

  assert.equal(result.pacingPlan.maxBreakTagsPerRequest <= 20, true);
  assert.equal(countInworldBreakTags(result.providerInput), result.pacingPlan.insertedBreakCount);
  assert.match(result.pacingPlan.warnings.join("\n"), /Dropped \d+ pause candidate/);
  for (const chunk of result.providerInputChunks) {
    assert.equal(countInworldBreakTags(chunk.text) <= 20, true);
  }
});

test("input quality blocks long unpunctuated narration text in strict mode", () => {
  const source = Array.from({ length: 40 }, (_, index) => `word${index}`).join(" ");
  const report = validateReadableScriptInput(source, {
    language: "en",
    validationMode: "strict",
  });

  assert.equal(report.status, "blocked");
  assert.equal(report.blockers[0]?.code, "missing_sentence_punctuation");
});

test("input quality only warns for unpunctuated text in warn mode", () => {
  const source = Array.from({ length: 40 }, (_, index) => `word${index}`).join(" ");
  const report = validateReadableScriptInput(source, {
    language: "en",
    validationMode: "warn",
  });

  assert.equal(report.status, "warning");
  assert.equal(report.warnings[0]?.code, "missing_sentence_punctuation");
});
