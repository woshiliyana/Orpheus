import { createHash } from "node:crypto";

import type { ScriptChunk } from "../domain/types.js";

interface ChunkingOptions {
  minChunkSize: number;
  maxChunkSize: number;
}

function findParagraphBreak(text: string, start: number, end: number): number | undefined {
  for (let index = end - 1; index >= start; index -= 1) {
    if (text.slice(index, index + 2) === "\n\n") {
      return index + 2;
    }
  }

  return undefined;
}

function findNewlineBreak(text: string, start: number, end: number): number | undefined {
  for (let index = end - 1; index >= start; index -= 1) {
    if (text[index] === "\n") {
      return index + 1;
    }
  }

  return undefined;
}

function findSentenceBreak(text: string, start: number, end: number): number | undefined {
  for (let index = end - 1; index >= start; index -= 1) {
    const character = text[index];
    if (character === "." || character === "?" || character === "!") {
      return index + 1;
    }
  }

  return undefined;
}

function findSpaceBreak(text: string, start: number, end: number): number | undefined {
  for (let index = end - 1; index >= start; index -= 1) {
    if (text[index] === " ") {
      return index + 1;
    }
  }

  return undefined;
}

function avoidBreakTagSplit(text: string, start: number, breakpoint: number, maxIndex: number): number {
  const lowerText = text.toLowerCase();
  const open = lowerText.lastIndexOf("<break", breakpoint);
  if (open < start) {
    return breakpoint;
  }

  const close = text.indexOf(">", open);
  if (close === -1 || close < breakpoint) {
    return breakpoint;
  }

  const tagEnd = close + 1;
  if (tagEnd <= maxIndex) {
    return tagEnd;
  }

  return open > start ? open : breakpoint;
}

function pickBreakpoint(text: string, start: number, minIndex: number, maxIndex: number): number {
  const finders = [
    findParagraphBreak,
    findNewlineBreak,
    findSentenceBreak,
    findSpaceBreak,
  ];

  for (const finder of finders) {
    const breakpoint = finder(text, minIndex, maxIndex);
    if (breakpoint !== undefined && breakpoint > start) {
      return avoidBreakTagSplit(text, start, breakpoint, maxIndex);
    }
  }

  return avoidBreakTagSplit(text, start, maxIndex, maxIndex);
}

function buildChunkId(text: string, index: number, startChar: number, endChar: number): string {
  const hash = createHash("sha1").update(`${index}:${startChar}:${endChar}:${text}`).digest("hex");
  return `chunk_${index}_${hash.slice(0, 12)}`;
}

export function chunkScript(script: string, options: ChunkingOptions): ScriptChunk[] {
  const { minChunkSize, maxChunkSize } = options;

  if (!script.length) {
    return [];
  }

  if (script.length <= maxChunkSize) {
    return [{
      index: 0,
      id: buildChunkId(script, 0, 0, script.length),
      text: script,
      startChar: 0,
      endChar: script.length,
    }];
  }

  const chunks: ScriptChunk[] = [];
  let startChar = 0;

  while (startChar < script.length) {
    const remaining = script.length - startChar;
    if (remaining <= maxChunkSize) {
      const text = script.slice(startChar);
      chunks.push({
        index: chunks.length,
        id: buildChunkId(text, chunks.length, startChar, script.length),
        text,
        startChar,
        endChar: script.length,
      });
      break;
    }

    const minimumBreakpoint = startChar + minChunkSize;
    const hardMaxBreakpoint = Math.min(startChar + maxChunkSize, script.length);
    const mustLeaveRemainder = script.length - hardMaxBreakpoint < minChunkSize;
    const softMaxBreakpoint = mustLeaveRemainder
      ? Math.max(minimumBreakpoint, script.length - minChunkSize)
      : hardMaxBreakpoint;

    const endChar = pickBreakpoint(script, startChar, minimumBreakpoint, softMaxBreakpoint);
    const text = script.slice(startChar, endChar);
    chunks.push({
      index: chunks.length,
      id: buildChunkId(text, chunks.length, startChar, endChar),
      text,
      startChar,
      endChar,
    });
    startChar = endChar;
  }

  return chunks;
}
