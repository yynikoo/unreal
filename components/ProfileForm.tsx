"use client";

import { useActionState } from "react";
import { updateProfileAction, type FormState } from "@/app/actions";

export default function ProfileForm({ name }: { name: string }) {
  const [state, action, pending] = useActionState(updateProfileAction, {} as FormState);

  return (
    <form action={action} className="stack">
      {state.error && <p className="alert error" role="alert">{state.error}</p>}
      {state.ok && <p className="alert ok" role="status">{state.ok}</p>}
      <div className="field">
        <label htmlFor="name">Display name</label>
        <input id="name" name="name" className="input" defaultValue={name} required minLength={2} maxLength={40} />
      </div>
      <div className="row">
        <button type="submit" className="btn primary" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>
      </div>
    </form>
  );
}
