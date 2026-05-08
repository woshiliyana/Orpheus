import { execMediaTool } from "./media-tools.ts";

export async function getAudioDurationSec(audioPath: string): Promise<number> {
  const { stdout } = await execMediaTool("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    audioPath,
  ]);

  return Number.parseFloat(stdout.trim());
}
