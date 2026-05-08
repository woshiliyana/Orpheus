import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  ArtifactManifest,
  InputValidationMode,
  NarrationJobInput,
  OutputAudioFormat,
  PacingMode,
  ProviderName,
  TtsProviderAdapter,
  FailureStage,
} from "../domain/types.ts";
import { runNarrationJob } from "../pipeline/narration.ts";
import { createProviderAdapter } from "../providers/index.ts";

export type ProjectStatus =
  | "draft"
  | "queued"
  | "running"
  | "needs_attention"
  | "completed"
  | "completed_with_warnings"
  | "failed"
  | "canceled"
  | "archived";

export type ProjectRunStatus =
  | "queued"
  | "validating"
  | "rendering"
  | "aligning"
  | "packaging"
  | "succeeded"
  | "succeeded_with_warnings"
  | "failed"
  | "canceled";

export interface ProjectRecord {
  id: string;
  title: string;
  status: ProjectStatus;
  sourceScript: string;
  latestRunId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRunStatusHistoryEntry {
  status: ProjectRunStatus;
  at: string;
}

export interface ProjectRunRecord {
  id: string;
  projectId: string;
  status: ProjectRunStatus;
  statusHistory: ProjectRunStatusHistoryEntry[];
  provider: ProviderName;
  language: string;
  voiceId: string;
  outputFormat: OutputAudioFormat;
  pacingMode: PacingMode;
  inputValidationMode: InputValidationMode;
  failureStage?: FailureStage;
  failureReason?: string;
  finalAudioPath?: string;
  artifactManifestPath?: string;
  metricsPath?: string;
  srtPath?: string;
  vttPath?: string;
  wordTimingsPath?: string;
  billableSeconds: number;
  warningCodes: string[];
  estimatedTotalCostUsd?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRunInput {
  dataDir: string;
  title: string;
  script: string;
  provider: ProviderName;
  language: string;
  voiceId: string;
  outputFormat: OutputAudioFormat;
  pacingMode?: PacingMode;
  inputValidationMode?: InputValidationMode;
}

export type CreateProjectRunRecordInput = Omit<CreateProjectRunInput, "dataDir">;

export interface ExecuteProjectRunInput {
  dataDir: string;
  runId: string;
  providerFactory?: (provider: ProviderName) => TtsProviderAdapter;
}

export interface ExecuteNarrationRunInput {
  runId: string;
  providerFactory?: (provider: ProviderName) => TtsProviderAdapter;
}

export interface ProjectRunResult {
  project: ProjectRecord;
  run: ProjectRunRecord;
}

export interface ProjectRunRepository {
  create(input: CreateProjectRunRecordInput): Promise<ProjectRunResult>;
  get(runId: string): Promise<ProjectRunResult>;
  list(input?: { limit?: number }): Promise<ProjectRunResult[]>;
  save(input: ProjectRunResult): Promise<ProjectRunResult>;
}

export interface ArtifactStorage {
  getRunArtifactsRoot(): string;
  getArtifactPath(runId: string, fileName: string): string;
  getManifestPaths(runId: string): {
    artifactManifestPath: string;
    metricsPath: string;
  };
  readManifestIfPresent(runId: string): Promise<ArtifactManifest | undefined>;
}

export interface NarrationRunExecutor {
  execute(input: ExecuteNarrationRunInput): Promise<ProjectRunResult>;
}

function nowIso(): string {
  return new Date().toISOString();
}

function buildId(prefix: "project" | "run"): string {
  return `${prefix}_${Date.now().toString(36)}_${randomUUID().slice(0, 8)}`;
}

function projectDir(dataDir: string): string {
  return path.join(dataDir, "projects");
}

function runDir(dataDir: string): string {
  return path.join(dataDir, "project-runs");
}

function projectPath(dataDir: string, projectId: string): string {
  return path.join(projectDir(dataDir), `${projectId}.json`);
}

function runPath(dataDir: string, runId: string): string {
  return path.join(runDir(dataDir), `${runId}.json`);
}

function runArtifactsDir(dataDir: string): string {
  return path.join(dataDir, "artifacts");
}

function artifactPathForRun(dataDir: string, runId: string, fileName: string): string {
  return path.join(runArtifactsDir(dataDir), runId, "artifacts", fileName);
}

async function ensureStore(dataDir: string): Promise<void> {
  await mkdir(projectDir(dataDir), { recursive: true });
  await mkdir(runDir(dataDir), { recursive: true });
  await mkdir(runArtifactsDir(dataDir), { recursive: true });
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function appendRunStatus(run: ProjectRunRecord, status: ProjectRunStatus): ProjectRunRecord {
  const updatedAt = nowIso();
  if (run.status === status) {
    return {
      ...run,
      updatedAt,
    };
  }

  return {
    ...run,
    status,
    statusHistory: [...run.statusHistory, { status, at: updatedAt }],
    updatedAt,
  };
}

export function createQueuedProjectRunRecord(input: CreateProjectRunRecordInput): ProjectRunResult {
  const createdAt = nowIso();
  const projectId = buildId("project");
  const runId = buildId("run");
  const run: ProjectRunRecord = {
    id: runId,
    projectId,
    status: "queued",
    statusHistory: [{ status: "queued", at: createdAt }],
    provider: input.provider,
    language: input.language.toLowerCase(),
    voiceId: input.voiceId,
    outputFormat: input.outputFormat,
    pacingMode: input.pacingMode ?? "natural_basic",
    inputValidationMode: input.inputValidationMode ?? "strict",
    billableSeconds: 0,
    warningCodes: [],
    createdAt,
    updatedAt: createdAt,
  };
  const project: ProjectRecord = {
    id: projectId,
    title: input.title.trim().length > 0 ? input.title.trim() : "Untitled narration project",
    status: "queued",
    sourceScript: input.script,
    latestRunId: runId,
    createdAt,
    updatedAt: createdAt,
  };

  return { project, run };
}

export function deriveProjectStatus(run: ProjectRunRecord): ProjectStatus {
  if (run.status === "queued") {
    return "queued";
  }

  if (run.status === "validating" || run.status === "rendering" || run.status === "aligning" || run.status === "packaging") {
    return "running";
  }

  if (run.status === "succeeded") {
    return "completed";
  }

  if (run.status === "succeeded_with_warnings") {
    return "completed_with_warnings";
  }

  if (run.status === "failed" && run.failureStage === "input_validation") {
    return "needs_attention";
  }

  if (run.status === "failed") {
    return "failed";
  }

  if (run.status === "canceled") {
    return "canceled";
  }

  return "draft";
}

async function saveProjectRun(input: ProjectRunResult & { dataDir: string }): Promise<ProjectRunResult> {
  const project = {
    ...input.project,
    status: deriveProjectStatus(input.run),
    latestRunId: input.run.id,
    updatedAt: input.run.updatedAt,
  };

  await writeJson(projectPath(input.dataDir, project.id), project);
  await writeJson(runPath(input.dataDir, input.run.id), input.run);
  return { project, run: input.run };
}

async function readProjectRun(dataDir: string, runId: string): Promise<ProjectRunResult> {
  const run = await readJson<ProjectRunRecord>(runPath(dataDir, runId));
  const project = await readJson<ProjectRecord>(projectPath(dataDir, run.projectId));
  return { project, run };
}

function getManifestPaths(dataDir: string, runId: string): {
  artifactManifestPath: string;
  metricsPath: string;
} {
  return {
    artifactManifestPath: artifactPathForRun(dataDir, runId, "artifact-manifest.json"),
    metricsPath: artifactPathForRun(dataDir, runId, "metrics.json"),
  };
}

async function readManifestIfPresent(dataDir: string, runId: string): Promise<ArtifactManifest | undefined> {
  const { artifactManifestPath } = getManifestPaths(dataDir, runId);
  if (!existsSync(artifactManifestPath)) {
    return undefined;
  }

  return readJson<ArtifactManifest>(artifactManifestPath);
}

export class FileProjectRunRepository implements ProjectRunRepository {
  constructor(private readonly dataDir: string) {}

  async create(input: CreateProjectRunRecordInput): Promise<ProjectRunResult> {
    await ensureStore(this.dataDir);

    const { project, run } = createQueuedProjectRunRecord(input);

    await writeJson(projectPath(this.dataDir, project.id), project);
    await writeJson(runPath(this.dataDir, run.id), run);
    return { project, run };
  }

  async get(runId: string): Promise<ProjectRunResult> {
    await ensureStore(this.dataDir);
    return readProjectRun(this.dataDir, runId);
  }

  async list(input: { limit?: number } = {}): Promise<ProjectRunResult[]> {
    await ensureStore(this.dataDir);
    const fileNames = await readdir(runDir(this.dataDir));
    const runs = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".json"))
        .map((fileName) => readJson<ProjectRunRecord>(path.join(runDir(this.dataDir), fileName))),
    );

    const sortedRuns = runs.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    const limitedRuns = sortedRuns.slice(0, input.limit ?? 20);
    return Promise.all(limitedRuns.map((run) => readProjectRun(this.dataDir, run.id)));
  }

  async save(input: ProjectRunResult): Promise<ProjectRunResult> {
    await ensureStore(this.dataDir);
    return saveProjectRun({ dataDir: this.dataDir, ...input });
  }
}

export class LocalArtifactStorage implements ArtifactStorage {
  constructor(private readonly dataDir: string) {}

  getRunArtifactsRoot(): string {
    return runArtifactsDir(this.dataDir);
  }

  getArtifactPath(runId: string, fileName: string): string {
    return artifactPathForRun(this.dataDir, runId, fileName);
  }

  getManifestPaths(runId: string): {
    artifactManifestPath: string;
    metricsPath: string;
  } {
    return getManifestPaths(this.dataDir, runId);
  }

  async readManifestIfPresent(runId: string): Promise<ArtifactManifest | undefined> {
    return readManifestIfPresent(this.dataDir, runId);
  }
}

export class PipelineNarrationRunExecutor implements NarrationRunExecutor {
  constructor(
    private readonly repository: ProjectRunRepository,
    private readonly artifactStorage: ArtifactStorage,
  ) {}

  async execute(input: ExecuteNarrationRunInput): Promise<ProjectRunResult> {
    let { project, run } = await this.repository.get(input.runId);

    if (run.status !== "queued") {
      return { project, run };
    }

    run = appendRunStatus(run, "validating");
    ({ project, run } = await this.repository.save({ project, run }));

    let provider: TtsProviderAdapter;
    try {
      provider = input.providerFactory?.(run.provider) ?? createProviderAdapter(run.provider);
    } catch (error) {
      run = {
        ...appendRunStatus(run, "failed"),
        failureStage: getFailureStageFromError(error),
        failureReason: error instanceof Error ? error.message : String(error),
        billableSeconds: 0,
        warningCodes: ["run_failed"],
      };
      return this.repository.save({ project, run });
    }

    try {
      const result = await runNarrationJob(
        {
          requestId: run.id,
          projectId: project.id,
          provider: run.provider,
          language: run.language,
          voiceId: run.voiceId,
          outputFormat: run.outputFormat,
          script: project.sourceScript,
          outputDir: this.artifactStorage.getRunArtifactsRoot(),
          pacingMode: run.pacingMode,
          inputValidationMode: run.inputValidationMode,
        } satisfies NarrationJobInput,
        provider,
      );

      const manifest = await readJson<ArtifactManifest>(result.artifactManifestPath);
      const warningCodes = manifest.warning_codes ?? [];
      const terminalStatus: ProjectRunStatus = manifest.run_status === "succeeded" && warningCodes.length === 0
        ? "succeeded"
        : "succeeded_with_warnings";

      for (const status of ["rendering", "aligning", "packaging", terminalStatus] as const) {
        run = appendRunStatus(run, status);
      }
      run = {
        ...run,
        finalAudioPath: result.audioPath,
        artifactManifestPath: result.artifactManifestPath,
        metricsPath: result.metricsPath,
        srtPath: result.srtPath,
        vttPath: result.vttPath,
        wordTimingsPath: result.wordTimingsPath,
        billableSeconds: manifest.billing_fact.billable_seconds,
        warningCodes,
        estimatedTotalCostUsd: manifest.billing_fact.estimated_total_cost_usd,
      };
      return this.repository.save({ project, run });
    } catch (error) {
      const manifest = await this.artifactStorage.readManifestIfPresent(run.id);
      const { artifactManifestPath, metricsPath } = this.artifactStorage.getManifestPaths(run.id);
      run = {
        ...appendRunStatus(run, "failed"),
        failureStage: manifest?.failure_stage ?? getFailureStageFromError(error),
        failureReason: manifest?.failure_reason ?? (error instanceof Error ? error.message : String(error)),
        artifactManifestPath: existsSync(artifactManifestPath) ? artifactManifestPath : undefined,
        metricsPath: existsSync(metricsPath) ? metricsPath : undefined,
        billableSeconds: manifest?.billing_fact.billable_seconds ?? 0,
        warningCodes: manifest?.warning_codes ?? ["run_failed"],
        estimatedTotalCostUsd: manifest?.billing_fact.estimated_total_cost_usd,
      };
      return this.repository.save({ project, run });
    }
  }
}

function getFailureStageFromError(error: unknown): FailureStage {
  if (error instanceof Error && /missing required environment variable/i.test(error.message)) {
    return "provider_precheck";
  }

  return "rendering";
}

export async function createProjectRun(input: CreateProjectRunInput): Promise<ProjectRunResult> {
  const repository = new FileProjectRunRepository(input.dataDir);
  return repository.create(input);
}

export async function getProjectRun(input: { dataDir: string; runId: string }): Promise<ProjectRunResult> {
  const repository = new FileProjectRunRepository(input.dataDir);
  return repository.get(input.runId);
}

export async function listProjectRuns(input: { dataDir: string; limit?: number }): Promise<ProjectRunResult[]> {
  const repository = new FileProjectRunRepository(input.dataDir);
  return repository.list({ limit: input.limit });
}

export async function executeNarrationRun(input: ExecuteNarrationRunInput & {
  repository: ProjectRunRepository;
  artifactStorage: ArtifactStorage;
}): Promise<ProjectRunResult> {
  const executor = new PipelineNarrationRunExecutor(input.repository, input.artifactStorage);
  return executor.execute({
    runId: input.runId,
    providerFactory: input.providerFactory,
  });
}

export async function executeProjectRun(input: ExecuteProjectRunInput): Promise<ProjectRunResult> {
  return executeNarrationRun({
    repository: new FileProjectRunRepository(input.dataDir),
    artifactStorage: new LocalArtifactStorage(input.dataDir),
    runId: input.runId,
    providerFactory: input.providerFactory,
  });
}
