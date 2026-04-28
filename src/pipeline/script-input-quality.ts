import type {
  InputQualityIssue,
  InputQualityReport,
  InputValidationMode,
} from "../domain/types.js";

const TERMINAL_PUNCTUATION_REGEX = /[.!?。！？…]+/u;
const TERMINAL_PUNCTUATION_GLOBAL_REGEX = /[.!?。！？…]+/gu;

interface ValidateReadableScriptInputOptions {
  language: string;
  validationMode?: InputValidationMode;
}

function tokenize(text: string): string[] {
  return text
    .trim()
    .split(/\s+/u)
    .map((token) => token.trim())
    .filter(Boolean);
}

function countTerminalPunctuation(text: string): number {
  return text.match(TERMINAL_PUNCTUATION_GLOBAL_REGEX)?.length ?? 0;
}

function countParagraphs(text: string): number {
  return text
    .split(/\n{2,}/u)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
}

function maxRunOnTokenCount(text: string): number {
  const segments = text.split(TERMINAL_PUNCTUATION_GLOBAL_REGEX);
  return segments.reduce((max, segment) => Math.max(max, tokenize(segment).length), 0);
}

function makeIssue(
  code: InputQualityIssue["code"],
  severity: InputQualityIssue["severity"],
  message: string,
): InputQualityIssue {
  return { code, severity, message };
}

function issueSeverity(mode: InputValidationMode): InputQualityIssue["severity"] {
  return mode === "strict" ? "blocker" : "warning";
}

export function validateReadableScriptInput(
  script: string,
  options: ValidateReadableScriptInputOptions,
): InputQualityReport {
  const validationMode = options.validationMode ?? "strict";
  const wordCount = tokenize(script).length;
  const paragraphCount = countParagraphs(script);
  const terminalPunctuationCount = countTerminalPunctuation(script);
  const maxRunOnTokens = maxRunOnTokenCount(script);
  const issues: InputQualityIssue[] = [];

  if (wordCount >= 25 && terminalPunctuationCount === 0) {
    issues.push(
      makeIssue(
        "missing_sentence_punctuation",
        issueSeverity(validationMode),
        "Narration input needs sentence punctuation. Natural pacing only works safely when the script includes periods, question marks, exclamation points, or equivalent punctuation.",
      ),
    );
  }

  if (wordCount >= 80 && terminalPunctuationCount > 0 && terminalPunctuationCount / wordCount < 1 / 80) {
    issues.push(
      makeIssue(
        "low_sentence_punctuation_density",
        issueSeverity(validationMode),
        "Sentence punctuation is too sparse for reliable narration pacing. Ask the user to add punctuation before rendering.",
      ),
    );
  }

  if (wordCount >= 90 && maxRunOnTokens > 70) {
    issues.push(
      makeIssue(
        "long_run_on_segment",
        issueSeverity(validationMode),
        "One segment runs too long without sentence-ending punctuation. This can produce machine-like continuous reading.",
      ),
    );
  }

  if (wordCount >= 140 && paragraphCount <= 1) {
    issues.push(
      makeIssue(
        "missing_paragraph_breaks",
        "warning",
        "Long narration scripts should include paragraph breaks so the system can add light structural pauses.",
      ),
    );
  }

  const warnings = issues.filter((issue) => issue.severity === "warning");
  const blockers = issues.filter((issue) => issue.severity === "blocker");
  const status: InputQualityReport["status"] =
    blockers.length > 0 ? "blocked" : warnings.length > 0 ? "warning" : "pass";

  return {
    status,
    validationMode,
    language: options.language,
    wordCount,
    paragraphCount,
    terminalPunctuationCount,
    maxRunOnTokenCount: maxRunOnTokens,
    warnings,
    blockers,
    recommendation:
      status === "blocked"
        ? "Ask the user to add punctuation and paragraph breaks before generating narration. Do not auto-rewrite or auto-punctuate this script."
        : "Input is acceptable for conservative natural pacing. The adapter may add light pauses without changing the user's words.",
  };
}

export function assertReadableScriptInput(report: InputQualityReport): void {
  if (report.status !== "blocked") {
    return;
  }
  const issueSummary = report.blockers.map((issue) => issue.code).join(", ");
  throw new Error(`Narration input quality blocked: ${issueSummary}`);
}

export function hasSentenceEndingPunctuation(script: string): boolean {
  return TERMINAL_PUNCTUATION_REGEX.test(script);
}
