import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
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

function getRuntimeRootCandidates(): string[] {
  const roots = [
    process.cwd(),
    path.resolve(process.cwd(), "../.."),
    "/var/task",
  ];
  return [...new Set(roots)];
}

export function resolveRelocatedNodeModulePath(
  buildTimePath: string,
  runtimeRoots = getRuntimeRootCandidates(),
): string | undefined {
  const marker = `${path.sep}node_modules${path.sep}`;
  const nodeModulesIndex = buildTimePath.indexOf(marker);
  if (nodeModulesIndex === -1) {
    return undefined;
  }

  const packageRelativePath = buildTimePath.slice(nodeModulesIndex + marker.length);
  for (const runtimeRoot of runtimeRoots) {
    const candidate = path.join(runtimeRoot, "node_modules", packageRelativePath);
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

function resolveStaticToolPath(staticPath: string): string {
  if (existsSync(staticPath)) {
    return staticPath;
  }

  return resolveRelocatedNodeModulePath(staticPath) ?? staticPath;
}

export function resolveMediaToolPath(tool: MediaTool): string {
  const configuredPath = readConfiguredPath(tool);
  if (configuredPath !== undefined) {
    return configuredPath;
  }

  if (tool === "ffmpeg") {
    return ffmpegStaticPath !== null ? resolveStaticToolPath(ffmpegStaticPath) : "ffmpeg";
  }

  return resolveStaticToolPath(ffprobeStatic.path);
}

export function execMediaTool(tool: MediaTool, args: string[]) {
  return execFileAsync(resolveMediaToolPath(tool), args);
}
