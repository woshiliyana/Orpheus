import type { NormalizedWordTiming, SubtitleCue } from "../domain/types.js";

interface CueOptions {
  minWords: number;
  maxWords: number;
  minDurationSec: number;
  maxDurationSec: number;
}

function endsSentence(word: string): boolean {
  return /[.!?]["')\]]?$/.test(word);
}

function formatTime(seconds: number, separator: "," | "."): string {
  const totalMilliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(totalMilliseconds / 3_600_000);
  const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
  const secs = Math.floor((totalMilliseconds % 60_000) / 1_000);
  const millis = totalMilliseconds % 1_000;

  const parts = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0"),
  ];

  return `${parts.join(":")}${separator}${String(millis).padStart(3, "0")}`;
}

export function buildSubtitleCues(
  words: NormalizedWordTiming[],
  options: Partial<CueOptions> = {},
): SubtitleCue[] {
  const {
    minWords = 4,
    maxWords = 18,
    minDurationSec = 1,
    maxDurationSec = 5,
  } = options;

  if (!words.length) {
    return [];
  }

  const cues: SubtitleCue[] = [];
  let startIndex = 0;

  for (let index = 0; index < words.length; index += 1) {
    const currentWord = words[index]!;
    const cueWords = words.slice(startIndex, index + 1);
    const durationSec = currentWord.endSec - cueWords[0]!.startSec;
    const wordCount = cueWords.length;
    const nextWord = words[index + 1];
    const sentenceBoundary = endsSentence(currentWord.text);
    const isLastWord = index === words.length - 1;

    const shouldBreak =
      isLastWord ||
      (sentenceBoundary && durationSec >= minDurationSec && wordCount >= minWords) ||
      wordCount >= maxWords ||
      durationSec >= maxDurationSec ||
      (nextWord !== undefined && nextWord.startSec - currentWord.endSec >= 0.75 && wordCount >= minWords);

    if (!shouldBreak) {
      continue;
    }

    const cue = cueWords.reduce(
      (accumulator, word, cueIndex) => ({
        index: cues.length + 1,
        startSec: accumulator.startSec,
        endSec: word.endSec,
        text: cueIndex === 0 ? word.text : `${accumulator.text} ${word.text}`,
      }),
      {
        index: cues.length + 1,
        startSec: cueWords[0]!.startSec,
        endSec: cueWords[0]!.endSec,
        text: "",
      },
    );

    cues.push(cue);
    startIndex = index + 1;
  }

  return cues;
}

export function renderSrt(cues: SubtitleCue[]): string {
  return cues
    .map((cue) => `${cue.index}\n${formatTime(cue.startSec, ",")} --> ${formatTime(cue.endSec, ",")}\n${cue.text}\n`)
    .join("\n");
}

export function renderVtt(cues: SubtitleCue[]): string {
  const body = cues
    .map((cue) => `${cue.index}\n${formatTime(cue.startSec, ".")} --> ${formatTime(cue.endSec, ".")}\n${cue.text}\n`)
    .join("\n");

  return `WEBVTT\n\n${body}`;
}
