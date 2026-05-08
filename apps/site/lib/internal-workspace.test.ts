import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  getWorkspaceAccess,
  getWorkspaceDataDir,
  hasWorkspaceAccessToken,
} from "./internal-workspace.ts";

function withEnv<T>(values: Record<string, string | undefined>, run: () => T): T {
  const previous = new Map<string, string | undefined>();
  for (const key of Object.keys(values)) {
    previous.set(key, process.env[key]);
    const value = values[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return run();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("internal workspace is enabled locally when the server token is configured", () => {
  withEnv(
    {
      ORPHEUS_INTERNAL_WORKSPACE_TOKEN: "local-dev",
      VERCEL: undefined,
      ORPHEUS_ENABLE_FILE_BACKED_WORKSPACE_ON_VERCEL: undefined,
    },
    () => {
      const access = getWorkspaceAccess();
      assert.equal(access.enabled, true);
      assert.equal(access.storageMode, "local_file");
      assert.equal(access.storagePosture, "local_or_preview_only");
      assert.equal(hasWorkspaceAccessToken("local-dev"), true);
    },
  );
});

test("file-backed workspace is blocked on Vercel unless explicitly opted into preview storage", () => {
  withEnv(
    {
      ORPHEUS_INTERNAL_WORKSPACE_TOKEN: "preview-token",
      VERCEL: "1",
      ORPHEUS_ENABLE_FILE_BACKED_WORKSPACE_ON_VERCEL: undefined,
    },
    () => {
      const access = getWorkspaceAccess();
      assert.equal(access.enabled, false);
      assert.equal(access.storagePosture, "blocked_on_vercel");
      assert.equal(hasWorkspaceAccessToken("preview-token"), false);
      assert.match(access.disabledReason ?? "", /not durable on Vercel/);
    },
  );
});

test("durable Neon and R2 workspace is enabled on Vercel when all server env is configured", () => {
  withEnv(
    {
      ORPHEUS_INTERNAL_WORKSPACE_TOKEN: "production-token",
      VERCEL: "1",
      ORPHEUS_WORKSPACE_STORE: "neon_r2",
      DATABASE_URL: "postgres://user:pass@example.neon.tech/orpheus",
      ORPHEUS_R2_BUCKET: "orpheus-artifacts",
      ORPHEUS_R2_ENDPOINT: "https://example.r2.cloudflarestorage.com",
      ORPHEUS_R2_ACCESS_KEY_ID: "r2-access-key",
      ORPHEUS_R2_SECRET_ACCESS_KEY: "r2-secret-key",
      ORPHEUS_ENABLE_FILE_BACKED_WORKSPACE_ON_VERCEL: undefined,
    },
    () => {
      const access = getWorkspaceAccess();
      assert.equal(access.enabled, true);
      assert.equal(access.storageMode, "neon_r2");
      assert.equal(access.storagePosture, "durable");
      assert.equal(hasWorkspaceAccessToken("production-token"), true);
    },
  );
});

test("Vercel workspace scratch data uses writable tmp storage by default", () => {
  withEnv(
    {
      VERCEL: "1",
      ORPHEUS_PROJECT_RUNS_DIR: undefined,
    },
    () => {
      assert.equal(
        getWorkspaceDataDir(),
        path.join(tmpdir(), "orpheus-workspace", "site-project-runs"),
      );
    },
  );
});
