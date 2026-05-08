"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createInternalProjectRun,
  executeInternalProjectRun,
  hasWorkspaceAccessToken,
  WORKSPACE_SESSION_COOKIE,
} from "../../lib/internal-workspace";

export type WorkspaceActionState = {
  error?: string;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function readWorkspaceCookieToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(WORKSPACE_SESSION_COOKIE)?.value;
}

export async function unlockWorkspaceAction(
  _previousState: WorkspaceActionState,
  formData: FormData,
): Promise<WorkspaceActionState> {
  const accessToken = formData.get("accessToken");
  if (typeof accessToken !== "string" || !hasWorkspaceAccessToken(accessToken)) {
    return { error: "Invalid internal workspace token." };
  }

  const cookieStore = await cookies();
  cookieStore.set(WORKSPACE_SESSION_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/workspace",
    maxAge: 60 * 60 * 8,
  });
  redirect("/workspace");
}

export async function createRunAction(
  _previousState: WorkspaceActionState,
  formData: FormData,
): Promise<WorkspaceActionState> {
  let runId: string;
  try {
    const { run } = await createInternalProjectRun(formData, await readWorkspaceCookieToken());
    runId = run.id;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  redirect(`/workspace/runs/${runId}`);
}

export async function executeRunAction(formData: FormData): Promise<void> {
  const runId = formData.get("runId");
  if (typeof runId !== "string" || runId.length === 0) {
    return;
  }

  await executeInternalProjectRun({ runId, accessToken: await readWorkspaceCookieToken() });
  redirect(`/workspace/runs/${runId}`);
}
