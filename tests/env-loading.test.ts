import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, writeFile } from "node:fs/promises";

import {
  loadProjectEnv,
  parseDotenv,
  readIntegerEnv,
  readNumberEnv,
  requireServerEnv,
} from "../src/config/env.js";

const envKeysToReset = [
  "INWORLD_API_KEY",
  "CARTESIA_API_KEY",
  "INWORLD_RATE_USD_PER_1M_CHARS",
  "INWORLD_MAX_ATTEMPTS",
  "ORPHEUS_SHARED_ENV_PATH",
];

test("parseDotenv handles comments, export syntax, and quoted values", () => {
  const parsed = parseDotenv(`
# comment
export INWORLD_API_KEY="quoted-secret"
CARTESIA_API_KEY='single-quoted-secret'
INWORLD_MAX_ATTEMPTS=4
INVALID LINE
`);

  assert.equal(parsed.INWORLD_API_KEY, "quoted-secret");
  assert.equal(parsed.CARTESIA_API_KEY, "single-quoted-secret");
  assert.equal(parsed.INWORLD_MAX_ATTEMPTS, "4");
});

test("loadProjectEnv reads .env and .env.local without overriding existing shell env", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-env-load-"));
  const previousEnv = Object.fromEntries(envKeysToReset.map((key) => [key, process.env[key]]));

  process.env.INWORLD_API_KEY = "shell-value";
  delete process.env.CARTESIA_API_KEY;
  delete process.env.INWORLD_RATE_USD_PER_1M_CHARS;
  delete process.env.INWORLD_MAX_ATTEMPTS;

  await writeFile(path.join(tmpDir, ".env"), "CARTESIA_API_KEY=from-dot-env\nINWORLD_RATE_USD_PER_1M_CHARS=44.5\n", "utf8");
  await writeFile(path.join(tmpDir, ".env.local"), "INWORLD_API_KEY=from-dot-env-local\nINWORLD_MAX_ATTEMPTS=7\n", "utf8");

  try {
    const loadedFiles = loadProjectEnv({ rootDir: tmpDir, forceReload: true });

    assert.equal(loadedFiles.length, 2);
    assert.equal(process.env.INWORLD_API_KEY, "shell-value");
    assert.equal(process.env.CARTESIA_API_KEY, "from-dot-env");
    assert.equal(readNumberEnv("INWORLD_RATE_USD_PER_1M_CHARS", 30), 44.5);
    assert.equal(readIntegerEnv("INWORLD_MAX_ATTEMPTS", 3), 7);
  } finally {
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});

test("requireServerEnv tells operators to use repo-root .env.local when a key is missing", () => {
  const previousValue = process.env.INWORLD_API_KEY;
  delete process.env.INWORLD_API_KEY;

  try {
    assert.throws(
      () => requireServerEnv("INWORLD_API_KEY"),
      /Set it in the shell, in ORPHEUS_SHARED_ENV_PATH, in this project's shared env file \(\.git\/orpheus\.server\.env\), or in repo-root \.env\.local/,
    );
  } finally {
    if (previousValue === undefined) {
      delete process.env.INWORLD_API_KEY;
    } else {
      process.env.INWORLD_API_KEY = previousValue;
    }
  }
});

test("loadProjectEnv reads a shared server env path and lets worktree .env.local override it", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-shared-env-load-"));
  const sharedEnvPath = path.join(tmpDir, "server.env");
  const previousEnv = Object.fromEntries(envKeysToReset.map((key) => [key, process.env[key]]));

  delete process.env.INWORLD_API_KEY;
  delete process.env.CARTESIA_API_KEY;
  delete process.env.INWORLD_MAX_ATTEMPTS;
  delete process.env.ORPHEUS_SHARED_ENV_PATH;

  await writeFile(sharedEnvPath, "INWORLD_API_KEY=shared-secret\nCARTESIA_API_KEY=shared-cartesia\n", "utf8");
  await writeFile(path.join(tmpDir, ".env.local"), "INWORLD_MAX_ATTEMPTS=9\nCARTESIA_API_KEY=local-cartesia\n", "utf8");

  try {
    const loadedFiles = loadProjectEnv({ rootDir: tmpDir, forceReload: true, sharedEnvPath });

    assert.equal(loadedFiles.length, 2);
    assert.equal(process.env.INWORLD_API_KEY, "shared-secret");
    assert.equal(process.env.CARTESIA_API_KEY, "local-cartesia");
    assert.equal(readIntegerEnv("INWORLD_MAX_ATTEMPTS", 3), 9);
  } finally {
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});

test("loadProjectEnv ignores empty file values so placeholders do not mask shared env", async () => {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "orpheus-empty-env-placeholder-"));
  const sharedEnvPath = path.join(tmpDir, "server.env");
  const previousEnv = Object.fromEntries(envKeysToReset.map((key) => [key, process.env[key]]));

  delete process.env.INWORLD_API_KEY;
  delete process.env.CARTESIA_API_KEY;
  delete process.env.INWORLD_MAX_ATTEMPTS;
  delete process.env.ORPHEUS_SHARED_ENV_PATH;

  await writeFile(sharedEnvPath, "INWORLD_API_KEY=shared-secret\nCARTESIA_API_KEY=shared-cartesia\n", "utf8");
  await writeFile(path.join(tmpDir, ".env.local"), "INWORLD_API_KEY=\nCARTESIA_API_KEY=local-cartesia\n", "utf8");

  try {
    const loadedFiles = loadProjectEnv({ rootDir: tmpDir, forceReload: true, sharedEnvPath });

    assert.equal(loadedFiles.length, 2);
    assert.equal(process.env.INWORLD_API_KEY, "shared-secret");
    assert.equal(process.env.CARTESIA_API_KEY, "local-cartesia");
  } finally {
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});
