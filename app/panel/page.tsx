import type { Metadata } from "next";
import { deleteUserAction, setRoleAction, setStatusAction } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";
import { listUsers } from "@/lib/users";

export const metadata: Metadata = { title: "Admin panel" };

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default async function PanelPage() {
  const me = await requireAdmin();
  const users = listUsers();
  const admins = users.filter((u) => u.role === "admin").length;
  const suspended = users.filter((u) => u.status === "suspended").length;

  return (
    <div className="stack lg">
      <section className="stack" style={{ gap: 6 }}>
        <p className="eyebrow">Admin</p>
        <h1>Panel</h1>
        <p className="muted">Manage accounts. Role changes apply on the user&apos;s next sign-in.</p>
      </section>

      <div className="grid-3">
        <div className="card sm stat"><span className="muted small">Users</span><strong>{users.length}</strong></div>
        <div className="card sm stat"><span className="muted small">Admins</span><strong>{admins}</strong></div>
        <div className="card sm stat"><span className="muted small">Suspended</span><strong>{suspended}</strong></div>
      </div>

      <section className="card stack">
        <div className="spread">
          <h2>Users</h2>
          <span className="faint small">Demo data, in memory</span>
        </div>

        <div className="user-head" aria-hidden>
          <span>User</span><span>Role</span><span>Status</span><span>Joined</span><span style={{ textAlign: "right" }}>Actions</span>
        </div>
        <ul className="user-list">
          {users.map((u) => {
            const self = u.id === me.id;
            return (
              <li key={u.id} className="user-row">
                <div className="user-who">
                  <strong>{u.name}{self && <span className="faint small" style={{ display: "inline" }}> (you)</span>}</strong>
                  <span className="muted small">{u.email}</span>
                </div>
                <span><span className={`badge${u.role === "admin" ? " accent" : ""}`}>{u.role}</span></span>
                <span><span className={`badge ${u.status === "active" ? "success" : "danger"}`}>{u.status}</span></span>
                <span className="muted small joined">{fmt(u.createdAt)}</span>
                <div className="actions">
                  {self ? (
                    <span className="faint small">No actions on yourself</span>
                  ) : (
                    <>
                      <form action={setRoleAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <input type="hidden" name="role" value={u.role === "admin" ? "user" : "admin"} />
                        <button type="submit" className="btn sm">{u.role === "admin" ? "Make user" : "Make admin"}</button>
                      </form>
                      <form action={setStatusAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <input type="hidden" name="status" value={u.status === "active" ? "suspended" : "active"} />
                        <button type="submit" className="btn sm">{u.status === "active" ? "Suspend" : "Activate"}</button>
                      </form>
                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <button type="submit" className="btn sm danger">Delete</button>
                      </form>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
