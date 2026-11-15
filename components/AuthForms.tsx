"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, registerAction, type FormState } from "@/app/actions";

const initial: FormState = {};

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="stack" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      {state.error && <p className="alert error" role="alert">{state.error}</p>}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" autoComplete="email" required
          defaultValue={state.fields?.email} placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="input" autoComplete="current-password" required
          placeholder="••••••••" />
      </div>
      <button type="submit" className="btn primary block" disabled={pending} style={{ marginTop: 6 }}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="muted small center">
        No account? <Link href="/register">Create one</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initial);

  return (
    <form action={action} className="stack" noValidate>
      {state.error && <p className="alert error" role="alert">{state.error}</p>}
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" className="input" autoComplete="nickname" required minLength={2} maxLength={40}
          defaultValue={state.fields?.name} placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" autoComplete="email" required
          defaultValue={state.fields?.email} placeholder="you@example.com" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="input" autoComplete="new-password" required
          minLength={8} placeholder="At least 8 characters" />
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirm password</label>
        <input id="confirm" name="confirm" type="password" className="input" autoComplete="new-password" required
          minLength={8} placeholder="Repeat password" />
      </div>
      <button type="submit" className="btn primary block" disabled={pending} style={{ marginTop: 6 }}>
        {pending ? "Creating…" : "Create account"}
      </button>
      <p className="muted small center">
        Already registered? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}
