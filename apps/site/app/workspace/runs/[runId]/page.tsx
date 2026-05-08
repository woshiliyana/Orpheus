import { existsSync } from "node:fs";

import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { executeRunAction } from "../../actions";
import {
  hasWorkspaceAccessToken,
  readInternalProjectRun,
  WORKSPACE_SESSION_COOKIE,
} from "../../../../lib/internal-workspace";

export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function fileExists(filePath: string | undefined): boolean {
  return filePath !== undefined && (filePath.startsWith("r2://") || existsSync(filePath));
}

function formatSeconds(seconds: number): string {
  if (seconds <= 0) {
    return "0.0 min";
  }

  return `${(seconds / 60).toFixed(1)} min`;
}

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
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

  const { project, run } = result;
  const canExecute = run.status === "queued";

  return (
    <main className="workspace-shell">
      <nav className="workspace-nav" aria-label="Workspace">
        <Link className="brand" href="/workspace">
          Orpheus Workspace
        </Link>
        <span>{run.status}</span>
      </nav>

      <section className="run-detail-hero" aria-labelledby="run-title">
        <p className="eyebrow">Project run</p>
        <h1 id="run-title">{project.title}</h1>
        <p className="lede">
          One user-visible run, server-owned provider execution, persisted audio and artifact evidence.
        </p>
      </section>

      <section className="run-detail-layout">
        <div className="run-summary-panel">
          <div className="panel-heading">
            <span>Run state</span>
            <small>{run.id}</small>
          </div>
          <dl>
            <div>
              <dt>Project status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Run status</dt>
              <dd>{run.status}</dd>
            </div>
            <div>
              <dt>Provider</dt>
              <dd>{run.provider}</dd>
            </div>
            <div>
              <dt>Language</dt>
              <dd>{run.language}</dd>
            </div>
            <div>
              <dt>Voice</dt>
              <dd>{run.voiceId}</dd>
            </div>
            <div>
              <dt>Billable seconds</dt>
              <dd>{run.billableSeconds} ({formatSeconds(run.billableSeconds)})</dd>
            </div>
            <div>
              <dt>Pacing</dt>
              <dd>{run.pacingMode}</dd>
            </div>
            <div>
              <dt>Input validation</dt>
              <dd>{run.inputValidationMode}</dd>
            </div>
          </dl>

          {run.failureReason !== undefined ? (
            <p className="form-error">{run.failureStage}: {run.failureReason}</p>
          ) : null}

          {canExecute ? (
            <form className="execute-form" action={executeRunAction}>
              <input type="hidden" name="runId" value={run.id} />
              <button className="button primary workspace-submit" type="submit">
                Execute server run
              </button>
            </form>
          ) : null}
        </div>

        <div className="artifact-panel">
          <div className="panel-heading">
            <span>Artifacts</span>
            <small>Token-gated downloads</small>
          </div>
          <ul className="artifact-list">
            <li className={fileExists(run.finalAudioPath) ? "available" : "missing"}>
              <span>Final audio</span>
              {fileExists(run.finalAudioPath) ? <a href={`/workspace/runs/${run.id}/download/audio`}>Download</a> : <em>Not available</em>}
            </li>
            <li className={fileExists(run.artifactManifestPath) ? "available" : "missing"}>
              <span>Artifact manifest</span>
              {fileExists(run.artifactManifestPath) ? <a href={`/workspace/runs/${run.id}/download/manifest`}>Open JSON</a> : <em>Not available</em>}
            </li>
            <li className={fileExists(run.metricsPath) ? "available" : "missing"}>
              <span>Metrics</span>
              {fileExists(run.metricsPath) ? <a href={`/workspace/runs/${run.id}/download/metrics`}>Open JSON</a> : <em>Not available</em>}
            </li>
          </ul>

          {run.warningCodes.length > 0 ? (
            <div className="warning-block">
              <h3>Warnings</h3>
              <p>{run.warningCodes.join(", ")}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="history-panel" aria-labelledby="history-title">
        <div className="panel-heading">
          <span id="history-title">Status history</span>
          <small>Canonical lifecycle</small>
        </div>
        <ol>
          {run.statusHistory.map((entry) => (
            <li key={`${entry.status}-${entry.at}`}>
              <span>{entry.status}</span>
              <time dateTime={entry.at}>{formatDate(entry.at)}</time>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
