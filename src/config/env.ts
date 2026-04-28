import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const loadedRoots = new Set<string>();
const DEFAULT_SHARED_ENV_FILENAME = "orpheus.server.env";

type LoadProjectEnvOptions = {
  rootDir?: string;
  forceReload?: boolean;
  sharedEnvPath?: string;
};

export function getProjectRoot(): string {
  const currentFile = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(currentFile), "../..");
}

export function parseDotenv(source: string): Record<string, string> {
  const entries: Record<string, string> = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match === null) {
      continue;
    }

    const [, key, rawValue] = match;
    let value = rawValue;

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      const quote = value[0];
      value = value.slice(1, -1);
      if (quote === "\"") {
        value = value
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, "\"")
          .replace(/\\\\/g, "\\");
      }
    }

    entries[key!] = value;
  }

  return entries;
}

function mergeNonEmptyDotenvEntries(
  target: Record<string, string>,
  entries: Record<string, string>,
): void {
  for (const [key, value] of Object.entries(entries)) {
    if (value.length === 0) {
      continue;
    }

    target[key] = value;
  }
}

export function resolveSharedEnvPath(options: Pick<LoadProjectEnvOptions, "rootDir" | "sharedEnvPath"> = {}): string | undefined {
  if (options.sharedEnvPath !== undefined && options.sharedEnvPath.length > 0) {
    return path.resolve(options.sharedEnvPath);
  }

  const configuredPath = process.env.ORPHEUS_SHARED_ENV_PATH;
  if (configuredPath !== undefined && configuredPath.length > 0) {
    return path.resolve(configuredPath);
  }

  try {
    const rootDir = path.resolve(options.rootDir ?? getProjectRoot());
    const rawGitCommonDir = execFileSync("git", ["rev-parse", "--git-common-dir"], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const resolvedGitCommonDir = path.resolve(rootDir, rawGitCommonDir);
    return path.join(resolvedGitCommonDir, DEFAULT_SHARED_ENV_FILENAME);
  } catch {
    return undefined;
  }
}

export function loadProjectEnv(options: LoadProjectEnvOptions = {}): string[] {
  const rootDir = path.resolve(options.rootDir ?? getProjectRoot());
  if (options.forceReload !== true && loadedRoots.has(rootDir)) {
    return [];
  }

  const resolvedEntries: Record<string, string> = {};
  const loadedFiles: string[] = [];

  const filePaths = [
    path.join(rootDir, ".env"),
    resolveSharedEnvPath(options),
    path.join(rootDir, ".env.local"),
  ].filter((filePath): filePath is string => filePath !== undefined);

  for (const filePath of filePaths) {
    if (!existsSync(filePath)) {
      continue;
    }

    const entries = parseDotenv(readFileSync(filePath, "utf8"));
    mergeNonEmptyDotenvEntries(resolvedEntries, entries);

    loadedFiles.push(filePath);
  }

  for (const [key, value] of Object.entries(resolvedEntries)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  loadedRoots.add(rootDir);
  return loadedFiles;
}

function buildMissingEnvMessage(name: string): string {
  return `Missing required environment variable: ${name}. Set it in the shell, in ORPHEUS_SHARED_ENV_PATH, in this project's shared env file (.git/${DEFAULT_SHARED_ENV_FILENAME}), or in repo-root .env.local.`;
}

export function requireServerEnv(name: string): string {
  loadProjectEnv();
  const value = process.env[name];
  if (value === undefined || value.length === 0) {
    throw new Error(buildMissingEnvMessage(name));
  }
  return value;
}

export function readOptionalServerEnv(name: string): string | undefined {
  loadProjectEnv();
  const value = process.env[name];
  if (value === undefined || value.length === 0) {
    return undefined;
  }
  return value;
}

export function readNumberEnv(name: string, fallback: number): number {
  const rawValue = readOptionalServerEnv(name);
  if (rawValue === undefined) {
    return fallback;
  }

  const parsed = Number.parseFloat(rawValue);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid number.`);
  }

  return parsed;
}

export function readIntegerEnv(name: string, fallback: number): number {
  const rawValue = readOptionalServerEnv(name);
  if (rawValue === undefined) {
    return fallback;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid integer.`);
  }

  return parsed;
}
