import path from "node:path";
import { tmpdir } from "node:os";

import {
  createProjectRun,
  executeProjectRun,
  getProjectRun,
  listProjectRuns,
  LocalArtifactStorage,
  type ProjectRunResult,
} from "../../../src/application/project-runs";
import {
  executeDurableProjectRun,
  NeonProjectRunRepository,
  R2ArtifactStorage,
  type R2ArtifactObject,
} from "../../../src/application/durable-workspace-adapters";
import { loadProjectEnv } from "../../../src/config/env";
import type {
  InputValidationMode,
  OutputAudioFormat,
  PacingMode,
  ProviderName,
} from "../../../src/domain/types";

loadProjectEnv();

const DEFAULT_LOCAL_DATA_DIR = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "..",
  "..",
  "runs",
  "site-project-runs",
);
const VERCEL_SCRATCH_DATA_DIR = path.join(tmpdir(), "orpheus-workspace", "site-project-runs");
export const WORKSPACE_SESSION_COOKIE = "orpheus_internal_workspace";

export interface WorkspaceAccess {
  enabled: boolean;
  tokenName: string;
  storageMode: "local_file" | "neon_r2";
  storagePosture: "local_or_preview_only" | "blocked_on_vercel" | "durable";
  disabledReason?: string;
}

export function getWorkspaceDataDir(): string {
  if (process.env.ORPHEUS_PROJECT_RUNS_DIR !== undefined && process.env.ORPHEUS_PROJECT_RUNS_DIR.length > 0) {
    return process.env.ORPHEUS_PROJECT_RUNS_DIR;
  }

  if (process.env.VERCEL === "1") {
    return VERCEL_SCRATCH_DATA_DIR;
  }

  return DEFAULT_LOCAL_DATA_DIR;
}

function hasDurableWorkspaceEnv(): boolean {
  return process.env.ORPHEUS_WORKSPACE_STORE === "neon_r2" &&
    typeof process.env.DATABASE_URL === "string" &&
    process.env.DATABASE_URL.length > 0 &&
    typeof process.env.ORPHEUS_R2_BUCKET === "string" &&
    process.env.ORPHEUS_R2_BUCKET.length > 0 &&
    typeof process.env.ORPHEUS_R2_ENDPOINT === "string" &&
    process.env.ORPHEUS_R2_ENDPOINT.length > 0 &&
    typeof process.env.ORPHEUS_R2_ACCESS_KEY_ID === "string" &&
    process.env.ORPHEUS_R2_ACCESS_KEY_ID.length > 0 &&
    typeof process.env.ORPHEUS_R2_SECRET_ACCESS_KEY === "string" &&
    process.env.ORPHEUS_R2_SECRET_ACCESS_KEY.length > 0;
}

function useDurableWorkspace(): boolean {
  return hasDurableWorkspaceEnv();
}

function isFileBackedWorkspaceBlockedOnVercel(): boolean {
  return process.env.VERCEL === "1" &&
    !hasDurableWorkspaceEnv() &&
    process.env.ORPHEUS_ENABLE_FILE_BACKED_WORKSPACE_ON_VERCEL !== "1";
}

export function getWorkspaceAccess(): WorkspaceAccess {
  const tokenConfigured = typeof process.env.ORPHEUS_INTERNAL_WORKSPACE_TOKEN === "string" &&
    process.env.ORPHEUS_INTERNAL_WORKSPACE_TOKEN.length > 0;
  const blockedOnVercel = isFileBackedWorkspaceBlockedOnVercel();

  return {
    enabled: tokenConfigured && !blockedOnVercel,
    tokenName: "ORPHEUS_INTERNAL_WORKSPACE_TOKEN",
    storageMode: hasDurableWorkspaceEnv() ? "neon_r2" : "local_file",
    storagePosture: hasDurableWorkspaceEnv()
      ? "durable"
      : blockedOnVercel
        ? "blocked_on_vercel"
        : "local_or_preview_only",
    disabledReason: !tokenConfigured
      ? "Internal workspace is disabled until the server token is configured."
      : blockedOnVercel
        ? "File-backed run storage is not durable on Vercel. Keep production workspace disabled until Neon and R2 adapters are wired, or explicitly opt into preview-only file storage."
        : undefined,
  };
}

export function assertWorkspaceAccess(accessToken: FormDataEntryValue | string | null): void {
  if (isFileBackedWorkspaceBlockedOnVercel()) {
    throw new Error("Internal workspace is disabled on Vercel until durable Neon/R2 storage is wired.");
  }

  const expectedToken = process.env.ORPHEUS_INTERNAL_WORKSPACE_TOKEN;
  if (expectedToken === undefined || expectedToken.length === 0) {
    throw new Error("Internal workspace is disabled until ORPHEUS_INTERNAL_WORKSPACE_TOKEN is set.");
  }

  if (accessToken !== expectedToken) {
    throw new Error("Invalid internal workspace token.");
  }
}

export function hasWorkspaceAccessToken(accessToken: string | undefined): boolean {
  if (isFileBackedWorkspaceBlockedOnVercel()) {
    return false;
  }

  const expectedToken = process.env.ORPHEUS_INTERNAL_WORKSPACE_TOKEN;
  return expectedToken !== undefined && expectedToken.length > 0 && accessToken === expectedToken;
}

function readRequiredString(formData: FormData, name: string): string {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} is required.`);
  }

  return value.trim();
}

function readOptionalString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  if (typeof value !== "string" || value.trim().length === 0) {
    return undefined;
  }

  return value.trim();
}

function readProvider(formData: FormData): ProviderName {
  const provider = readRequiredString(formData, "provider");
  if (provider !== "inworld" && provider !== "cartesia") {
    throw new Error("provider must be inworld or cartesia.");
  }

  return provider;
}

function readLanguage(formData: FormData): string {
  const language = readRequiredString(formData, "language").toLowerCase();
  if (language !== "en" && language !== "es") {
    throw new Error("language must be en or es.");
  }

  return language;
}

function readOutputFormat(formData: FormData): OutputAudioFormat {
  const outputFormat = readRequiredString(formData, "outputFormat");
  if (outputFormat !== "mp3" && outputFormat !== "wav") {
    throw new Error("outputFormat must be mp3 or wav.");
  }

  return outputFormat;
}

function readPacingMode(formData: FormData): PacingMode {
  const pacingMode = readRequiredString(formData, "pacingMode");
  if (pacingMode !== "natural_basic" && pacingMode !== "exact") {
    throw new Error("pacingMode must be natural_basic or exact.");
  }

  return pacingMode;
}

function readInputValidationMode(formData: FormData): InputValidationMode {
  const inputValidationMode = readRequiredString(formData, "inputValidationMode");
  if (inputValidationMode !== "strict" && inputValidationMode !== "warn") {
    throw new Error("inputValidationMode must be strict or warn.");
  }

  return inputValidationMode;
}

export async function createInternalProjectRun(
  formData: FormData,
  accessToken?: string,
): Promise<ProjectRunResult> {
  assertWorkspaceAccess(accessToken ?? formData.get("accessToken"));
  const input = {
    title: readOptionalString(formData, "title") ?? "Internal narration project",
    script: readRequiredString(formData, "script"),
    provider: readProvider(formData),
    language: readLanguage(formData),
    voiceId: readRequiredString(formData, "voiceId"),
    outputFormat: readOutputFormat(formData),
    pacingMode: readPacingMode(formData),
    inputValidationMode: readInputValidationMode(formData),
  };

  if (useDurableWorkspace()) {
    return NeonProjectRunRepository.fromEnv().create(input);
  }

  return createProjectRun({
    dataDir: getWorkspaceDataDir(),
    ...input,
  });
}

export async function executeInternalProjectRun(input: {
  runId: string;
  accessToken?: string;
}): Promise<ProjectRunResult> {
  assertWorkspaceAccess(input.accessToken ?? null);
  if (useDurableWorkspace()) {
    const repository = NeonProjectRunRepository.fromEnv();
    const artifactStorage = R2ArtifactStorage.fromEnv(new LocalArtifactStorage(getWorkspaceDataDir()));
    return executeDurableProjectRun({
      repository,
      artifactStorage,
      runId: input.runId,
    });
  }

  return executeProjectRun({
    dataDir: getWorkspaceDataDir(),
    runId: input.runId,
  });
}

export async function readInternalProjectRun(runId: string): Promise<ProjectRunResult> {
  if (useDurableWorkspace()) {
    return NeonProjectRunRepository.fromEnv().get(runId);
  }

  return getProjectRun({
    dataDir: getWorkspaceDataDir(),
    runId,
  });
}

export async function readInternalProjectRuns(): Promise<ProjectRunResult[]> {
  if (useDurableWorkspace()) {
    return NeonProjectRunRepository.fromEnv().list({ limit: 12 });
  }

  return listProjectRuns({
    dataDir: getWorkspaceDataDir(),
    limit: 12,
  });
}

export async function readInternalR2ArtifactRef(ref: string): Promise<R2ArtifactObject> {
  return R2ArtifactStorage.fromEnv(new LocalArtifactStorage(getWorkspaceDataDir())).readArtifactRef(ref);
}
