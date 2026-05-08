"use client";

import { useActionState } from "react";

import { createRunAction, type WorkspaceActionState } from "./actions";

const initialState: WorkspaceActionState = {};

export function CreateRunForm() {
  const [state, formAction, isPending] = useActionState(createRunAction, initialState);

  return (
    <form className="workspace-form" action={formAction}>
      <div className="form-grid">
        <label>
          <span>Project title</span>
          <input name="title" type="text" defaultValue="Internal Phase 2 smoke" />
        </label>
        <label>
          <span>Provider</span>
          <select name="provider" defaultValue="inworld">
            <option value="inworld">Inworld</option>
            <option value="cartesia">Cartesia</option>
          </select>
        </label>
        <label>
          <span>Language</span>
          <select name="language" defaultValue="en">
            <option value="en">English output</option>
            <option value="es">Spanish output</option>
          </select>
        </label>
        <label>
          <span>Voice ID</span>
          <input name="voiceId" type="text" defaultValue="Ashley" required />
        </label>
        <label>
          <span>Delivery format</span>
          <select name="outputFormat" defaultValue="mp3">
            <option value="mp3">MP3 delivery</option>
            <option value="wav">WAV evidence run</option>
          </select>
        </label>
        <label>
          <span>Pacing</span>
          <select name="pacingMode" defaultValue="natural_basic">
            <option value="natural_basic">Natural basic</option>
            <option value="exact">Exact</option>
          </select>
        </label>
        <label>
          <span>Input validation</span>
          <select name="inputValidationMode" defaultValue="strict">
            <option value="strict">Strict</option>
            <option value="warn">Warn only</option>
          </select>
        </label>
      </div>

      <label className="script-field">
        <span>Script</span>
        <textarea
          name="script"
          rows={12}
          required
          placeholder="Paste a readable narration script with sentence punctuation and paragraph breaks."
        />
      </label>

      {state.error !== undefined ? <p className="form-error">{state.error}</p> : null}

      <button className="button primary workspace-submit" type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create queued run"}
      </button>
    </form>
  );
}
