import type { Metadata } from "next";
import { LoginForm } from "@/components/AuthForms";
import { safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const dest = next ? safeNext(next) : undefined;

  return (
    <div className="auth-wrap">
      <section className="card auth-card stack lg">
        <div className="stack" style={{ gap: 6 }}>
          <h1>Sign in</h1>
          <p className="muted">Welcome back. Enter your details below.</p>
        </div>
        {dest && dest !== "/ps" && <p className="alert info">Sign in to continue to {dest}.</p>}
        <LoginForm next={dest} />
      </section>
    </div>
  );
}
