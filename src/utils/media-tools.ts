import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const require = createRequire(import.meta.url);
const ffmpegStaticPath = require("ffmpeg-static") as string | null;
const ffprobeStatic = require("ffprobe-static") as { path: string };

export type MediaTool = "ffmpeg" | "ffprobe";

function readConfiguredPath(tool: MediaTool): string | undefined {
  const envName = tool === "ffmpeg" ? "ORPHEUS_FFMPEG_PATH" : "ORPHEUS_FFPROBE_PATH";
  const value = process.env[envName];
  return value !== undefined && value.length > 0 ? value : undefined;
}

export function resolveMediaToolPath(tool: MediaTool): string {
  const configuredPath = readConfiguredPath(tool);
  if (configuredPath !== undefined) {
    return configuredPath;
  }

  if (tool === "ffmpeg") {
    return ffmpegStaticPath ?? "ffmpeg";
  }

  return ffprobeStatic.path;
}

export function execMediaTool(tool: MediaTool, args: string[]) {
  return execFileAsync(resolveMediaToolPath(tool), args);
}
