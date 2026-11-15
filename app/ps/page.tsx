import type { Metadata } from "next";
import Link from "next/link";
import ProfileForm from "@/components/ProfileForm";
import { logoutAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Account" };

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("") || "?";
}

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser("/ps");
  const { denied } = await searchParams;
  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "n/a";

  return (
    <div className="stack lg">
      {denied === "panel" && (
        <p className="alert error" role="alert">The admin panel is only available to admins.</p>
      )}

      <section className="card">
        <div className="spread">
          <div className="row" style={{ gap: 20 }}>
            <div className="avatar" aria-hidden>{initials(user.name)}</div>
            <div className="stack" style={{ gap: 4 }}>
              <h1>{user.name}</h1>
              <p className="muted">{user.email}</p>
            </div>
          </div>
          <span className={`badge${user.role === "admin" ? " accent" : ""}`}>{user.role}</span>
        </div>
      </section>

      <div className="grid-2">
        <section className="card stack lg">
          <h2>Profile</h2>
          <ProfileForm name={user.name} />
        </section>

        <div className="stack lg">
          <section className="card stack">
            <h2>Account</h2>
            <dl className="info-list well">
              <dt>Email</dt>
              <dd>{user.email}</dd>
              <dt>Role</dt>
              <dd style={{ textTransform: "capitalize" }}>{user.role}</dd>
              <dt>Member since</dt>
              <dd>{joined}</dd>
            </dl>
            <div className="row">
              {user.role === "admin" && <Link href="/panel" className="btn">Admin panel</Link>}
              <form action={logoutAction}>
                <button type="submit" className="btn danger">Sign out</button>
              </form>
            </div>
          </section>

          <section className="card stack">
            <div className="spread">
              <h2>Plan</h2>
              <span className="badge">None</span>
            </div>
            <p className="muted">You don&apos;t have an active plan yet.</p>
            <div className="row">
              <Link href="/purchase" className="btn primary">Browse plans</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
