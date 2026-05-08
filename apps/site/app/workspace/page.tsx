import Link from "next/link";
import { cookies } from "next/headers";

import { CreateRunForm } from "./create-run-form";
import { UnlockWorkspaceForm } from "./unlock-form";
import {
  getWorkspaceAccess,
  hasWorkspaceAccessToken,
  readInternalProjectRuns,
  WORKSPACE_SESSION_COOKIE,
} from "../../lib/internal-workspace";

export const dynamic = "force-dynamic";

function formatSeconds(seconds: number): string {
  if (seconds <= 0) {
    return "0.0 min";
  }

  return `${(seconds / 60).toFixed(1)} min`;
}

function countByStatus(
  rows: Awaited<ReturnType<typeof readInternalProjectRuns>>,
  statuses: string[],
): number {
  return rows.filter(({ run }) => statuses.includes(run.status)).length;
}

export default async function WorkspacePage() {
  const access = getWorkspaceAccess();
  const cookieStore = await cookies();
  const unlocked = hasWorkspaceAccessToken(cookieStore.get(WORKSPACE_SESSION_COOKIE)?.value);
  const rows = access.enabled && unlocked ? await readInternalProjectRuns() : [];
  const queuedCount = countByStatus(rows, ["queued"]);
  const activeCount = countByStatus(rows, ["validating", "rendering", "aligning", "packaging"]);
  const completedCount = countByStatus(rows, ["succeeded", "succeeded_with_warnings"]);
  const warningCount = rows.filter(({ run }) => run.warningCodes.length > 0).length;

  return (
    <main className="workspace-shell">
      <nav className="workspace-nav" aria-label="Workspace">
        <Link className="brand" href="/">
          Orpheus Narration
        </Link>
        <span>Internal Phase 2 workspace</span>
      </nav>

      <section className="workspace-hero" aria-labelledby="workspace-title">
        <p className="eyebrow">Operator workspace</p>
        <h1 id="workspace-title">Run stable narration checks without exposing provider keys.</h1>
        <p className="lede">
          This internal surface creates canonical project runs, executes provider work on the
          server, and keeps audio plus manifest evidence behind the workspace token.
        </p>
      </section>

      {!access.enabled ? (
        <section className="workspace-alert" aria-live="polite">
          {access.disabledReason ?? (
            <>
              Set <code>{access.tokenName}</code> on the server before using this internal workspace.
            </>
          )}
        </section>
      ) : null}

      {access.enabled && !unlocked ? (
        <section className="workspace-layout unlock-layout" aria-label="Unlock internal workspace">
          <div>
            <h2>Unlock</h2>
            <UnlockWorkspaceForm />
          </div>
          <div>
            <h2>Boundary</h2>
            <p className="empty-state">
              Internal project runs, artifact manifests, and audio downloads stay hidden until the
              server token is accepted. This route is not a public trial or self-serve generation surface.
            </p>
          </div>
        </section>
      ) : null}

      {access.enabled && unlocked ? (
        <>
          <section className="workspace-metrics" aria-label="Run summary">
            <div>
              <span>Queued</span>
              <strong>{queuedCount}</strong>
            </div>
            <div>
              <span>Active</span>
              <strong>{activeCount}</strong>
            </div>
            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
            <div>
              <span>Warnings</span>
              <strong>{warningCount}</strong>
            </div>
          </section>

          <section className="workspace-storage-note" aria-label="Storage posture">
            <span>Storage</span>
            {access.storagePosture === "durable" ? (
              <p>
                Durable workspace storage is active. Project run records are stored in Neon and
                generated artifacts are stored in R2.
              </p>
            ) : (
              <p>
                Current adapter is local file-backed storage for internal validation. Production
                Vercel runs stay gated until durable Neon and R2 adapters replace this store.
              </p>
            )}
          </section>

          <section className="workspace-layout" aria-label="Internal run controls">
            <div>
              <div className="panel-heading">
                <span>New run</span>
                <small>EN + ES evidence path</small>
              </div>
              <CreateRunForm />
            </div>
            <div>
              <div className="panel-heading">
                <span>Recent runs</span>
                <small>{rows.length} retained</small>
              </div>
              <div className="run-list">
                {rows.length === 0 ? (
                  <p className="empty-state">No internal runs recorded yet.</p>
                ) : rows.map(({ project, run }) => (
                  <Link className="run-row" href={`/workspace/runs/${run.id}`} key={run.id}>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{run.provider} / {run.language} / {run.voiceId}</small>
                    </span>
                    <span>
                      <b>{run.status}</b>
                      <small>{formatSeconds(run.billableSeconds)}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
