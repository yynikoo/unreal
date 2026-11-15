import type { Metadata } from "next";
import { RegisterForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="auth-wrap">
      <section className="card auth-card stack lg">
        <div className="stack" style={{ gap: 6 }}>
          <h1>Create account</h1>
          <p className="muted">It takes less than a minute.</p>
        </div>
        <RegisterForm />
      </section>
    </div>
  );
}
