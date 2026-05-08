"use client";

import { useActionState } from "react";

import { unlockWorkspaceAction, type WorkspaceActionState } from "./actions";

const initialState: WorkspaceActionState = {};

export function UnlockWorkspaceForm() {
  const [state, formAction, isPending] = useActionState(unlockWorkspaceAction, initialState);

  return (
    <form className="unlock-form" action={formAction}>
      <label>
        <span>Access token</span>
        <input name="accessToken" type="password" autoComplete="off" required />
      </label>
      {state.error !== undefined ? <p className="form-error">{state.error}</p> : null}
      <button className="button primary workspace-submit" type="submit" disabled={isPending}>
        {isPending ? "Unlocking..." : "Unlock workspace"}
      </button>
    </form>
  );
}
