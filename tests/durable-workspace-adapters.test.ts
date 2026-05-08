import test from "node:test";
import assert from "node:assert/strict";

import {
  buildR2ArtifactKey,
  parseR2ArtifactRef,
  serializeNeonProjectRunRows,
} from "../src/application/durable-workspace-adapters.js";
import type { ProjectRecord, ProjectRunRecord } from "../src/application/project-runs.js";

function makeProject(): ProjectRecord {
  return {
    id: "project_1",
    title: "Durable project",
    status: "queued",
    sourceScript: "Readable script.",
    latestRunId: "run_1",
    createdAt: "2026-05-07T12:00:00.000Z",
    updatedAt: "2026-05-07T12:00:00.000Z",
  };
}

function makeRun(): ProjectRunRecord {
  return {
    id: "run_1",
    projectId: "project_1",
    status: "queued",
    statusHistory: [{ status: "queued", at: "2026-05-07T12:00:00.000Z" }],
    provider: "inworld",
    language: "en",
    voiceId: "Ashley",
    outputFormat: "mp3",
    pacingMode: "natural_basic",
    inputValidationMode: "strict",
    billableSeconds: 0,
    warningCodes: [],
    createdAt: "2026-05-07T12:00:00.000Z",
    updatedAt: "2026-05-07T12:00:00.000Z",
  };
}

test("R2 artifact keys stay scoped to the canonical run id and artifact filename", () => {
  assert.equal(
    buildR2ArtifactKey({
      runId: "run_abc123",
      fileName: "artifact-manifest.json",
    }),
    "project-runs/run_abc123/artifacts/artifact-manifest.json",
  );
});

test("R2 artifact key builder rejects path traversal input", () => {
  assert.throws(
    () => buildR2ArtifactKey({ runId: "run_abc123", fileName: "../secret.env" }),
    /Artifact filename must not contain path separators/,
  );
});

test("R2 artifact key builder rejects unsafe run ids", () => {
  assert.throws(
    () => buildR2ArtifactKey({ runId: "../run_abc123", fileName: "final-audio.mp3" }),
    /Run id must not contain path separators/,
  );
});

test("R2 artifact refs parse into bucket, key, and filename", () => {
  assert.deepEqual(
    parseR2ArtifactRef("r2://orpheus-artifacts/project-runs/run_abc123/artifacts/final-audio.mp3"),
    {
      bucket: "orpheus-artifacts",
      key: "project-runs/run_abc123/artifacts/final-audio.mp3",
      fileName: "final-audio.mp3",
    },
  );
});

test("R2 artifact ref parser rejects traversal segments", () => {
  assert.throws(
    () => parseR2ArtifactRef("r2://orpheus-artifacts/project-runs/run_abc123/../secret.env"),
    /not a valid scoped R2 object ref/,
  );
});

test("R2 artifact ref parser rejects objects outside the project-run artifact scope", () => {
  assert.throws(
    () => parseR2ArtifactRef("r2://orpheus-artifacts/private/run_abc123/final-audio.mp3"),
    /not a valid scoped R2 object ref/,
  );
});

test("Neon row serialization preserves project/run JSON without changing lifecycle semantics", () => {
  const rows = serializeNeonProjectRunRows({
    project: makeProject(),
    run: makeRun(),
  });

  assert.equal(rows.projectId, "project_1");
  assert.equal(rows.runId, "run_1");
  assert.equal(rows.latestRunId, "run_1");
  assert.equal(rows.projectRecord.status, "queued");
  assert.equal(rows.runRecord.statusHistory[0]?.status, "queued");
});
