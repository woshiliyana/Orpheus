import { createReadStream } from "node:fs";
import { existsSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from "@aws-sdk/client-s3";

import type { ArtifactManifest } from "../domain/types.ts";
import {
  createQueuedProjectRunRecord,
  deriveProjectStatus,
  LocalArtifactStorage,
  executeNarrationRun,
  type ArtifactStorage,
  type CreateProjectRunRecordInput,
  type ProjectRecord,
  type ProjectRunRecord,
  type ProjectRunRepository,
  type ProjectRunResult,
  type ExecuteNarrationRunInput,
} from "./project-runs.ts";
import { requireServerEnv } from "../config/env.ts";

export interface NeonProjectRunRows {
  projectId: string;
  runId: string;
  latestRunId: string;
  projectRecord: ProjectRecord;
  runRecord: ProjectRunRecord;
}

export interface R2WorkspaceConfig {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface ParsedR2ArtifactRef {
  bucket: string;
  key: string;
  fileName: string;
}

export interface R2ArtifactObject {
  body: ReadableStream;
  contentLength?: number;
  contentType: string;
  fileName: string;
}

export function serializeNeonProjectRunRows(input: ProjectRunResult): NeonProjectRunRows {
  return {
    projectId: input.project.id,
    runId: input.run.id,
    latestRunId: input.project.latestRunId,
    projectRecord: input.project,
    runRecord: input.run,
  };
}

export function buildR2ArtifactKey(input: { runId: string; fileName: string }): string {
  if (input.runId.includes("/") || input.runId.includes("\\") || input.runId.includes("..")) {
    throw new Error("Run id must not contain path separators or traversal markers.");
  }
  if (input.fileName.includes("/") || input.fileName.includes("\\") || input.fileName.includes("..")) {
    throw new Error("Artifact filename must not contain path separators or traversal markers.");
  }

  return `project-runs/${input.runId}/artifacts/${input.fileName}`;
}

export function parseR2ArtifactRef(value: string): ParsedR2ArtifactRef {
  if (!value.startsWith("r2://")) {
    throw new Error("Artifact ref must start with r2://.");
  }

  const withoutScheme = value.slice("r2://".length);
  const separatorIndex = withoutScheme.indexOf("/");
  if (separatorIndex <= 0 || separatorIndex === withoutScheme.length - 1) {
    throw new Error("Artifact ref must include a bucket and object key.");
  }

  const bucket = withoutScheme.slice(0, separatorIndex);
  const key = withoutScheme.slice(separatorIndex + 1);
  const keySegments = key.split("/");
  const fileName = path.posix.basename(key);
  if (
    bucket.includes("/") ||
    bucket.includes("\\") ||
    bucket.includes("..") ||
    key.includes("\\") ||
    keySegments.some((segment) => segment.length === 0 || segment === "." || segment === "..") ||
    keySegments.length !== 4 ||
    keySegments[0] !== "project-runs" ||
    keySegments[2] !== "artifacts" ||
    fileName.length === 0
  ) {
    throw new Error("Artifact ref is not a valid scoped R2 object ref.");
  }

  return { bucket, key, fileName };
}

function getContentType(filePath: string): string {
  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }
  if (filePath.endsWith(".md")) {
    return "text/markdown; charset=utf-8";
  }
  if (filePath.endsWith(".txt")) {
    return "text/plain; charset=utf-8";
  }
  if (filePath.endsWith(".srt")) {
    return "application/x-subrip; charset=utf-8";
  }
  if (filePath.endsWith(".vtt")) {
    return "text/vtt; charset=utf-8";
  }
  if (filePath.endsWith(".wav")) {
    return "audio/wav";
  }
  if (filePath.endsWith(".mp3")) {
    return "audio/mpeg";
  }

  return "application/octet-stream";
}

function createR2Client(config: R2WorkspaceConfig): S3Client {
  const clientConfig: S3ClientConfig = {
    region: "auto",
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  };
  return new S3Client(clientConfig);
}

function normalizeJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export class NeonProjectRunRepository implements ProjectRunRepository {
  constructor(private readonly sql: NeonQueryFunction<false, false>) {}

  static fromEnv(): NeonProjectRunRepository {
    return new NeonProjectRunRepository(neon(requireServerEnv("DATABASE_URL")));
  }

  async ensureSchema(): Promise<void> {
    await this.sql`
      create table if not exists orpheus_projects (
        id text primary key,
        latest_run_id text not null,
        record jsonb not null,
        created_at timestamptz not null,
        updated_at timestamptz not null
      )
    `;
    await this.sql`
      create table if not exists orpheus_project_runs (
        id text primary key,
        project_id text not null references orpheus_projects(id) on delete cascade,
        status text not null,
        record jsonb not null,
        created_at timestamptz not null,
        updated_at timestamptz not null
      )
    `;
    await this.sql`
      create index if not exists orpheus_project_runs_created_at_idx
      on orpheus_project_runs (created_at desc)
    `;
  }

  async create(input: CreateProjectRunRecordInput): Promise<ProjectRunResult> {
    return this.save(createQueuedProjectRunRecord(input));
  }

  async get(runId: string): Promise<ProjectRunResult> {
    await this.ensureSchema();
    const rows = await this.sql`
      select p.record as project_record, r.record as run_record
      from orpheus_project_runs r
      join orpheus_projects p on p.id = r.project_id
      where r.id = ${runId}
      limit 1
    `;
    const row = rows[0] as { project_record?: ProjectRecord; run_record?: ProjectRunRecord } | undefined;
    if (row?.project_record === undefined || row.run_record === undefined) {
      throw new Error(`Project run not found: ${runId}`);
    }

    return {
      project: row.project_record,
      run: row.run_record,
    };
  }

  async list(input: { limit?: number } = {}): Promise<ProjectRunResult[]> {
    await this.ensureSchema();
    const limit = input.limit ?? 20;
    const rows = await this.sql`
      select p.record as project_record, r.record as run_record
      from orpheus_project_runs r
      join orpheus_projects p on p.id = r.project_id
      order by r.created_at desc
      limit ${limit}
    `;

    return rows.map((row) => {
      const typedRow = row as { project_record: ProjectRecord; run_record: ProjectRunRecord };
      return {
        project: typedRow.project_record,
        run: typedRow.run_record,
      };
    });
  }

  async save(input: ProjectRunResult): Promise<ProjectRunResult> {
    await this.ensureSchema();
    const project = {
      ...input.project,
      status: deriveProjectStatus(input.run),
      latestRunId: input.run.id,
      updatedAt: input.run.updatedAt,
    };
    const rows = serializeNeonProjectRunRows({
      project,
      run: input.run,
    });
    const projectRecord = normalizeJson(rows.projectRecord);
    const runRecord = normalizeJson(rows.runRecord);

    await this.sql`
      insert into orpheus_projects (id, latest_run_id, record, created_at, updated_at)
      values (
        ${rows.projectId},
        ${rows.latestRunId},
        ${projectRecord},
        ${project.createdAt},
        ${project.updatedAt}
      )
      on conflict (id) do update set
        latest_run_id = excluded.latest_run_id,
        record = excluded.record,
        updated_at = excluded.updated_at
    `;
    await this.sql`
      insert into orpheus_project_runs (id, project_id, status, record, created_at, updated_at)
      values (
        ${rows.runId},
        ${rows.projectId},
        ${input.run.status},
        ${runRecord},
        ${input.run.createdAt},
        ${input.run.updatedAt}
      )
      on conflict (id) do update set
        status = excluded.status,
        record = excluded.record,
        updated_at = excluded.updated_at
    `;

    return {
      project,
      run: input.run,
    };
  }
}

export class R2ArtifactStorage implements ArtifactStorage {
  private readonly client: S3Client;

  constructor(
    private readonly localStorage: LocalArtifactStorage,
    private readonly config: R2WorkspaceConfig,
    client?: S3Client,
  ) {
    this.client = client ?? createR2Client(config);
  }

  static fromEnv(localStorage: LocalArtifactStorage): R2ArtifactStorage {
    return new R2ArtifactStorage(localStorage, {
      bucket: requireServerEnv("ORPHEUS_R2_BUCKET"),
      endpoint: requireServerEnv("ORPHEUS_R2_ENDPOINT"),
      accessKeyId: requireServerEnv("ORPHEUS_R2_ACCESS_KEY_ID"),
      secretAccessKey: requireServerEnv("ORPHEUS_R2_SECRET_ACCESS_KEY"),
    });
  }

  getRunArtifactsRoot(): string {
    return this.localStorage.getRunArtifactsRoot();
  }

  getArtifactPath(runId: string, fileName: string): string {
    return `r2://${this.config.bucket}/${buildR2ArtifactKey({ runId, fileName })}`;
  }

  getManifestPaths(runId: string): {
    artifactManifestPath: string;
    metricsPath: string;
  } {
    return {
      artifactManifestPath: this.getArtifactPath(runId, "artifact-manifest.json"),
      metricsPath: this.getArtifactPath(runId, "metrics.json"),
    };
  }

  async readManifestIfPresent(runId: string): Promise<ArtifactManifest | undefined> {
    const localManifest = await this.localStorage.readManifestIfPresent(runId);
    if (localManifest !== undefined) {
      return localManifest;
    }

    try {
      const response = await this.client.send(new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: buildR2ArtifactKey({ runId, fileName: "artifact-manifest.json" }),
      }));
      const body = await response.Body?.transformToString();
      if (body === undefined) {
        return undefined;
      }
      return JSON.parse(body) as ArtifactManifest;
    } catch {
      return undefined;
    }
  }

  async readArtifactRef(ref: string): Promise<R2ArtifactObject> {
    const parsed = parseR2ArtifactRef(ref);
    if (parsed.bucket !== this.config.bucket) {
      throw new Error("R2 artifact ref bucket does not match the configured workspace bucket.");
    }

    const response = await this.client.send(new GetObjectCommand({
      Bucket: parsed.bucket,
      Key: parsed.key,
    }));
    if (response.Body === undefined) {
      throw new Error(`R2 artifact has no response body: ${parsed.key}`);
    }

    return {
      body: response.Body.transformToWebStream(),
      contentLength: response.ContentLength,
      contentType: response.ContentType ?? getContentType(parsed.fileName),
      fileName: parsed.fileName,
    };
  }

  async uploadRunArtifacts(runId: string): Promise<Record<string, string>> {
    const localRunArtifactsDir = path.join(this.localStorage.getRunArtifactsRoot(), runId, "artifacts");
    const uploadedRefs: Record<string, string> = {};
    if (!existsSync(localRunArtifactsDir)) {
      return uploadedRefs;
    }

    const fileNames = await readdir(localRunArtifactsDir);
    for (const fileName of fileNames) {
      const filePath = path.join(localRunArtifactsDir, fileName);
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) {
        continue;
      }

      const key = buildR2ArtifactKey({ runId, fileName });
      await this.client.send(new PutObjectCommand({
        Bucket: this.config.bucket,
        Key: key,
        Body: createReadStream(filePath),
        ContentLength: fileStat.size,
        ContentType: getContentType(filePath),
      }));
      uploadedRefs[filePath] = `r2://${this.config.bucket}/${key}`;
    }

    return uploadedRefs;
  }
}

function replaceArtifactRef(value: string | undefined, uploadedRefs: Record<string, string>): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return uploadedRefs[value] ?? value;
}

export async function executeDurableProjectRun(input: {
  repository: ProjectRunRepository;
  artifactStorage: R2ArtifactStorage;
  runId: string;
  providerFactory?: ExecuteNarrationRunInput["providerFactory"];
}): Promise<ProjectRunResult> {
  const executed = await executeNarrationRun({
    repository: input.repository,
    artifactStorage: input.artifactStorage,
    runId: input.runId,
    providerFactory: input.providerFactory,
  });

  const uploadedRefs = await input.artifactStorage.uploadRunArtifacts(executed.run.id);
  const run = {
    ...executed.run,
    finalAudioPath: replaceArtifactRef(executed.run.finalAudioPath, uploadedRefs),
    artifactManifestPath: replaceArtifactRef(executed.run.artifactManifestPath, uploadedRefs),
    metricsPath: replaceArtifactRef(executed.run.metricsPath, uploadedRefs),
    srtPath: replaceArtifactRef(executed.run.srtPath, uploadedRefs),
    vttPath: replaceArtifactRef(executed.run.vttPath, uploadedRefs),
    wordTimingsPath: replaceArtifactRef(executed.run.wordTimingsPath, uploadedRefs),
  };

  return input.repository.save({
    project: executed.project,
    run,
  });
}
