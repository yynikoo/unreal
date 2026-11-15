import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="stack lg">
      <section className="card hero">
        <p className="eyebrow">Unreal</p>
        <h1 style={{ marginTop: 10 }}>{user ? `Welcome back, ${user.name}` : "Everything in one quiet place"}</h1>
        <p className="muted">Manage your account, pick a plan and keep track of your access.</p>
        <div className="row" style={{ justifyContent: "center", marginTop: 28 }}>
          {user ? (
            <Link href="/ps" className="btn primary">Open account</Link>
          ) : (
            <>
              <Link href="/register" className="btn primary">Create account</Link>
              <Link href="/login" className="btn">Sign in</Link>
            </>
          )}
          <Link href="/purchase" className="btn">See plans</Link>
        </div>
      </section>
    </div>
  );
}
