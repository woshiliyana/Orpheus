import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import {
  hasWorkspaceAccessToken,
  readInternalR2ArtifactRef,
  readInternalProjectRun,
  WORKSPACE_SESSION_COOKIE,
} from "../../../../../../lib/internal-workspace";

export const dynamic = "force-dynamic";

function getArtifactPath(input: {
  artifact: string;
  finalAudioPath?: string;
  artifactManifestPath?: string;
  metricsPath?: string;
}): string | undefined {
  if (input.artifact === "audio") {
    return input.finalAudioPath;
  }
  if (input.artifact === "manifest") {
    return input.artifactManifestPath;
  }
  if (input.artifact === "metrics") {
    return input.metricsPath;
  }

  return undefined;
}

function getContentType(filePath: string): string {
  if (filePath.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }
  if (filePath.endsWith(".wav")) {
    return "audio/wav";
  }

  return "audio/mpeg";
}

function isR2ArtifactRef(value: string): boolean {
  return value.startsWith("r2://");
}

function getDownloadFileName(input: { artifact: string; filePath: string }): string {
  const localName = path.basename(input.filePath);
  if (!isR2ArtifactRef(input.filePath)) {
    return localName;
  }

  if (input.artifact === "audio") {
    return localName.endsWith(".mp3") || localName.endsWith(".wav") ? localName : "final-audio.mp3";
  }
  if (input.artifact === "manifest") {
    return "artifact-manifest.json";
  }
  if (input.artifact === "metrics") {
    return "metrics.json";
  }

  return localName;
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ runId: string; artifact: string }>;
  },
) {
  const { runId, artifact } = await params;
  const cookieStore = await cookies();
  if (!hasWorkspaceAccessToken(cookieStore.get(WORKSPACE_SESSION_COOKIE)?.value)) {
    notFound();
  }

  let result;
  try {
    result = await readInternalProjectRun(runId);
  } catch {
    notFound();
  }

  const filePath = getArtifactPath({
    artifact,
    finalAudioPath: result.run.finalAudioPath,
    artifactManifestPath: result.run.artifactManifestPath,
    metricsPath: result.run.metricsPath,
  });

  if (filePath === undefined) {
    notFound();
  }

  if (isR2ArtifactRef(filePath)) {
    try {
      const artifactObject = await readInternalR2ArtifactRef(filePath);
      const headers = new Headers({
        "Content-Type": artifactObject.contentType,
        "Content-Disposition": `attachment; filename="${artifactObject.fileName}"`,
        "Cache-Control": "private, no-store",
      });
      if (artifactObject.contentLength !== undefined) {
        headers.set("Content-Length", String(artifactObject.contentLength));
      }

      return new Response(artifactObject.body, { headers });
    } catch {
      notFound();
    }
  }

  if (!existsSync(filePath)) {
    notFound();
  }

  const fileStat = await stat(filePath);
  return new Response(Readable.toWeb(createReadStream(filePath)) as BodyInit, {
    headers: {
      "Content-Length": String(fileStat.size),
      "Content-Type": getContentType(filePath),
      "Content-Disposition": `attachment; filename="${getDownloadFileName({ artifact, filePath })}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
