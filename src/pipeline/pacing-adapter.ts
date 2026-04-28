import { createHash } from "node:crypto";
import type {
  InputQualityReport,
  InputValidationMode,
  PacingMode,
  PacingPlan,
  PauseMarker,
  ProviderInputChunkReport,
  ProviderName,
  ScriptChunk,
} from "../domain/types.js";
import { chunkScript } from "./chunking.js";
import { validateReadableScriptInput } from "./script-input-quality.js";

const BREAK_TAG_REGEX = /\s*<break\s+time=["']\d+(?:ms|s)["']\s*\/?>\s*/giu;
const BREAK_TAG_COUNT_REGEX = /<break\s+time=["']\d+(?:ms|s)["']\s*\/>/giu;
const MAX_INWORLD_BREAK_TAGS_PER_REQUEST = 20;

interface BuildPacingArtifactsInput {
  sourceScript: string;
  provider: ProviderName;
  language: string;
  pacingMode?: PacingMode;
  inputValidationMode?: InputValidationMode;
  minChunkSize: number;
  maxChunkSize: number;
}

export interface PacingArtifacts {
  sourceScript: string;
  spokenScript: string;
  providerInput: string;
  providerInputChunks: ScriptChunk[];
  providerInputChunkReports: ProviderInputChunkReport[];
  pacingPlan: PacingPlan;
  inputQualityReport: InputQualityReport;
}

interface LineSpan {
  line: string;
  start: number;
  contentEnd: number;
  end: number;
}

interface PauseCandidate {
  offset: number;
  durationMs: number;
  reason: PauseMarker["reason"];
  priority: number;
}

interface RenderedPause {
  candidate: PauseCandidate;
  marker: PauseMarker;
  providerInputOffset: number;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeForTokenCompare(value: string): string {
  return value
    .replace(BREAK_TAG_REGEX, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

export function stripInworldBreakTags(value: string): string {
  return value.replace(BREAK_TAG_REGEX, " ");
}

export function countInworldBreakTags(value: string): number {
  return value.match(BREAK_TAG_COUNT_REGEX)?.length ?? 0;
}

function renderBreakTag(durationMs: number): string {
  return ` <break time="${durationMs}ms" />`;
}

function splitLinesWithOffsets(text: string): LineSpan[] {
  const spans: LineSpan[] = [];
  const regex = /.*(?:\r\n|\n|\r|$)/gu;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const value = match[0];
    if (value.length === 0) {
      break;
    }

    const newlineMatch = value.match(/\r\n|\n|\r/u);
    const newlineLength = newlineMatch?.[0].length ?? 0;
    const start = match.index;
    const end = start + value.length;
    spans.push({
      line: value.slice(0, value.length - newlineLength),
      start,
      contentEnd: end - newlineLength,
      end,
    });
  }

  return spans;
}

function isMarkdownHeading(line: string): boolean {
  return /^\s{0,3}#{1,6}\s+\S/u.test(line);
}

function isListItem(line: string): boolean {
  return /^\s*(?:[-*+]|\d+[.)])\s+\S/u.test(line);
}

function nextNonEmptyLine(spans: LineSpan[], index: number): LineSpan | undefined {
  for (let cursor = index + 1; cursor < spans.length; cursor += 1) {
    if (spans[cursor]!.line.trim().length > 0) {
      return spans[cursor];
    }
  }
  return undefined;
}

function hasBlankLineBeforeNextContent(spans: LineSpan[], index: number): boolean {
  let sawBlank = false;
  for (let cursor = index + 1; cursor < spans.length; cursor += 1) {
    if (spans[cursor]!.line.trim().length === 0) {
      sawBlank = true;
      continue;
    }
    return sawBlank;
  }
  return false;
}

function collectPauseCandidates(sourceScript: string): PauseCandidate[] {
  const spans = splitLinesWithOffsets(sourceScript);
  const candidates: PauseCandidate[] = [];

  for (const [index, span] of spans.entries()) {
    const trimmed = span.line.trim();
    if (trimmed.length === 0) {
      continue;
    }

    if (isMarkdownHeading(span.line)) {
      candidates.push({
        offset: span.contentEnd,
        durationMs: 800,
        reason: "heading_break",
        priority: 3,
      });
      continue;
    }

    if (isListItem(span.line) && nextNonEmptyLine(spans, index) !== undefined) {
      candidates.push({
        offset: span.contentEnd,
        durationMs: 350,
        reason: "list_item_break",
        priority: 1,
      });
      continue;
    }

    if (hasBlankLineBeforeNextContent(spans, index)) {
      candidates.push({
        offset: span.contentEnd,
        durationMs: 600,
        reason: "paragraph_break",
        priority: 2,
      });
    }
  }

  return candidates;
}

function dedupePauseCandidates(candidates: PauseCandidate[]): PauseCandidate[] {
  const byOffset = new Map<number, PauseCandidate>();
  for (const candidate of candidates) {
    const existing = byOffset.get(candidate.offset);
    if (
      existing === undefined ||
      candidate.priority > existing.priority ||
      (candidate.priority === existing.priority && candidate.durationMs > existing.durationMs)
    ) {
      byOffset.set(candidate.offset, candidate);
    }
  }
  return [...byOffset.values()].sort((left, right) => left.offset - right.offset);
}

function renderProviderInput(
  sourceScript: string,
  candidates: PauseCandidate[],
): { providerInput: string; pauses: PauseMarker[]; renderedPauses: RenderedPause[] } {
  let rendered = "";
  let cursor = 0;
  const pauses: PauseMarker[] = [];
  const renderedPauses: RenderedPause[] = [];

  for (const [index, candidate] of candidates.entries()) {
    rendered += sourceScript.slice(cursor, candidate.offset);
    const providerInputOffset = rendered.length;
    const marker: PauseMarker = {
      id: `pause_${String(index).padStart(3, "0")}`,
      sourceCharOffset: candidate.offset,
      durationMs: candidate.durationMs,
      reason: candidate.reason,
      delivery: "provider_break",
    };
    rendered += renderBreakTag(candidate.durationMs);
    cursor = candidate.offset;
    pauses.push(marker);
    renderedPauses.push({ candidate, marker, providerInputOffset });
  }

  rendered += sourceScript.slice(cursor);
  return { providerInput: rendered, pauses, renderedPauses };
}

function buildChunkReports(chunks: ScriptChunk[]): ProviderInputChunkReport[] {
  return chunks.map((chunk) => ({
    chunkIndex: chunk.index,
    id: chunk.id,
    startChar: chunk.startChar,
    endChar: chunk.endChar,
    providerInputChars: chunk.text.length,
    breakTagCount: countInworldBreakTags(chunk.text),
  }));
}

function maxBreakTagsPerChunk(chunks: ScriptChunk[]): number {
  return chunks.reduce((max, chunk) => Math.max(max, countInworldBreakTags(chunk.text)), 0);
}

function choosePauseToDrop(renderedPauses: RenderedPause[]): RenderedPause {
  return [...renderedPauses].sort((left, right) => {
    if (left.candidate.priority !== right.candidate.priority) {
      return left.candidate.priority - right.candidate.priority;
    }
    if (left.candidate.durationMs !== right.candidate.durationMs) {
      return left.candidate.durationMs - right.candidate.durationMs;
    }
    return right.candidate.offset - left.candidate.offset;
  })[0]!;
}

function enforceRenderedBreakBudget(input: {
  sourceScript: string;
  candidates: PauseCandidate[];
  minChunkSize: number;
  maxChunkSize: number;
}): {
  selected: PauseCandidate[];
  droppedCount: number;
  providerInput: string;
  pauses: PauseMarker[];
  providerInputChunks: ScriptChunk[];
  unresolvedBudgetWarning?: string;
} {
  let selected = [...input.candidates];
  let droppedCount = 0;

  for (let iteration = 0; iteration <= input.candidates.length; iteration += 1) {
    const rendered = renderProviderInput(input.sourceScript, selected);
    const providerInputChunks = chunkScript(rendered.providerInput, {
      minChunkSize: input.minChunkSize,
      maxChunkSize: input.maxChunkSize,
    });
    const overBudgetChunk = providerInputChunks.find(
      (chunk) => countInworldBreakTags(chunk.text) > MAX_INWORLD_BREAK_TAGS_PER_REQUEST,
    );

    if (overBudgetChunk === undefined) {
      return {
        selected,
        droppedCount,
        providerInput: rendered.providerInput,
        pauses: rendered.pauses,
        providerInputChunks,
      };
    }

    const pausesInChunk = rendered.renderedPauses.filter(
      (pause) =>
        pause.providerInputOffset >= overBudgetChunk.startChar &&
        pause.providerInputOffset < overBudgetChunk.endChar,
    );

    if (pausesInChunk.length === 0) {
      return {
        selected,
        droppedCount,
        providerInput: rendered.providerInput,
        pauses: rendered.pauses,
        providerInputChunks,
        unresolvedBudgetWarning:
          "Unable to map an over-budget provider chunk back to a pause marker; retaining current provider input.",
      };
    }

    const pauseToDrop = choosePauseToDrop(pausesInChunk);
    selected = selected.filter((candidate) => candidate.offset !== pauseToDrop.candidate.offset);
    droppedCount += 1;
  }

  const rendered = renderProviderInput(input.sourceScript, selected);
  const providerInputChunks = chunkScript(rendered.providerInput, {
    minChunkSize: input.minChunkSize,
    maxChunkSize: input.maxChunkSize,
  });
  return {
    selected,
    droppedCount,
    providerInput: rendered.providerInput,
    pauses: rendered.pauses,
    providerInputChunks,
    unresolvedBudgetWarning:
      "Unable to satisfy the Inworld break-tag budget after exhausting pause candidates.",
  };
}

function buildExactArtifacts(
  input: BuildPacingArtifactsInput,
  inputQualityReport: InputQualityReport,
  warning?: string,
): PacingArtifacts {
  const providerInputChunks = chunkScript(input.sourceScript, {
    minChunkSize: input.minChunkSize,
    maxChunkSize: input.maxChunkSize,
  });
  const warnings = warning === undefined ? [] : [warning];
  const maxBreakTags = maxBreakTagsPerChunk(providerInputChunks);
  const plan: PacingPlan = {
    version: "natural_basic_v1",
    requestedMode: input.pacingMode ?? "exact",
    effectiveMode: "exact",
    provider: input.provider,
    language: input.language,
    sourceScriptHash: sha256(input.sourceScript),
    spokenScriptHash: sha256(input.sourceScript),
    providerInputHash: sha256(input.sourceScript),
    tokenPreserved: true,
    insertedBreakCount: 0,
    maxBreakTagsPerRequest: maxBreakTags,
    markupOverheadChars: 0,
    pauses:
      warning === undefined
        ? []
        : [
            {
              id: "pause_000",
              sourceCharOffset: 0,
              durationMs: 0,
              reason: "provider_unavailable",
              delivery: "none",
            },
          ],
    warnings,
  };
  return {
    sourceScript: input.sourceScript,
    spokenScript: input.sourceScript,
    providerInput: input.sourceScript,
    providerInputChunks,
    providerInputChunkReports: buildChunkReports(providerInputChunks),
    pacingPlan: plan,
    inputQualityReport,
  };
}

export function buildPacingArtifacts(input: BuildPacingArtifactsInput): PacingArtifacts {
  const requestedMode = input.pacingMode ?? "natural_basic";
  const inputQualityReport = validateReadableScriptInput(input.sourceScript, {
    language: input.language,
    validationMode: input.inputValidationMode ?? "strict",
  });

  if (requestedMode === "exact") {
    return buildExactArtifacts(input, inputQualityReport);
  }

  if (input.provider !== "inworld") {
    return buildExactArtifacts(
      input,
      inputQualityReport,
      "natural_basic currently only renders provider break tags for Inworld; falling back to exact input for this provider.",
    );
  }

  const candidates = dedupePauseCandidates(collectPauseCandidates(input.sourceScript));
  const budgeted = enforceRenderedBreakBudget({
    sourceScript: input.sourceScript,
    candidates,
    minChunkSize: input.minChunkSize,
    maxChunkSize: input.maxChunkSize,
  });
  const warnings: string[] = [];
  if (budgeted.droppedCount > 0) {
    warnings.push(
      `Dropped ${budgeted.droppedCount} pause candidate(s) to stay within Inworld's ${MAX_INWORLD_BREAK_TAGS_PER_REQUEST}-break-tag request budget.`,
    );
  }
  if (budgeted.unresolvedBudgetWarning !== undefined) {
    warnings.push(budgeted.unresolvedBudgetWarning);
  }

  const tokenPreserved =
    normalizeForTokenCompare(input.sourceScript) === normalizeForTokenCompare(stripInworldBreakTags(budgeted.providerInput));

  if (!tokenPreserved) {
    warnings.push("Token preservation check failed after stripping provider break tags.");
  }

  const maxBreakTags = maxBreakTagsPerChunk(budgeted.providerInputChunks);
  if (maxBreakTags > MAX_INWORLD_BREAK_TAGS_PER_REQUEST) {
    warnings.push(
      `One provider request contains ${maxBreakTags} break tags, above Inworld's supported limit of ${MAX_INWORLD_BREAK_TAGS_PER_REQUEST}.`,
    );
  }

  const pacingPlan: PacingPlan = {
    version: "natural_basic_v1",
    requestedMode,
    effectiveMode: "natural_basic",
    provider: input.provider,
    language: input.language,
    sourceScriptHash: sha256(input.sourceScript),
    spokenScriptHash: sha256(input.sourceScript),
    providerInputHash: sha256(budgeted.providerInput),
    tokenPreserved,
    insertedBreakCount: budgeted.pauses.length,
    maxBreakTagsPerRequest: maxBreakTags,
    markupOverheadChars: budgeted.providerInput.length - input.sourceScript.length,
    pauses: budgeted.pauses,
    warnings,
  };

  return {
    sourceScript: input.sourceScript,
    spokenScript: input.sourceScript,
    providerInput: budgeted.providerInput,
    providerInputChunks: budgeted.providerInputChunks,
    providerInputChunkReports: buildChunkReports(budgeted.providerInputChunks),
    pacingPlan,
    inputQualityReport,
  };
}
