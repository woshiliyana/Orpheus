import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { getAudioDurationSec } from "../utils/audio.js";

const execFileAsync = promisify(execFile);

export interface StitchResult {
  outputPath: string;
  totalDurationSec: number;
  segmentReports: Array<{
    segmentPath: string;
    offsetStartSec: number;
    offsetEndSec: number;
    durationSec: number;
  }>;
}

interface StitchInput {
  outputPath: string;
  segmentPaths: string[];
}

export async function stitchAudioSegments(input: StitchInput): Promise<StitchResult> {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-concat-"));
  const concatFilePath = path.join(tempDir, "segments.txt");

  try {
    const concatFile = input.segmentPaths
      .map((segmentPath) => `file '${segmentPath.replace(/'/g, "'\\''")}'`)
      .join("\n");
    await writeFile(concatFilePath, concatFile, "utf8");

    await execFileAsync("ffmpeg", [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      concatFilePath,
      "-c",
      "copy",
      input.outputPath,
    ]);

    let cursorSec = 0;
    const segmentReports = [];
    for (const segmentPath of input.segmentPaths) {
      const durationSec = await getAudioDurationSec(segmentPath);
      const offsetStartSec = cursorSec;
      cursorSec += durationSec;
      segmentReports.push({
        segmentPath,
        offsetStartSec,
        offsetEndSec: cursorSec,
        durationSec,
      });
    }

    const totalDurationSec = await getAudioDurationSec(input.outputPath);
    return {
      outputPath: input.outputPath,
      totalDurationSec,
      segmentReports,
    };
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
