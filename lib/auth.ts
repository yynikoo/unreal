// Server-side helpers for reading the current user and guarding pages.
// middleware.ts does the first redirect; these re-check on the server so a
// page is never rendered for the wrong user even if middleware is bypassed.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession, type Role } from "./session";
import { findUserById, type PublicUser } from "./users";

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string | null;
  /** false when the session is valid but the mock store no longer has the user (e.g. after a restart). */
  inStore: boolean;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) return null;
  const user = findUserById(session.sub);
  if (user) {
    if (user.status === "suspended") return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt, inStore: true };
  }
  return { id: session.sub, email: session.email, name: session.name, role: session.role, createdAt: null, inStore: false };
}

/** For /ps and anything else that needs a signed-in user. */
export async function requireUser(next = "/ps"): Promise<CurrentUser> {
  const user = await getCurrentUser();
  // ?logout=1 makes middleware clear a stale cookie (e.g. suspended user) instead of bouncing back.
  if (!user) redirect(`/login?logout=1&next=${encodeURIComponent(next)}`);
  return user;
}

/** For /panel: signed-in admins only. */
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser("/panel");
  if (user.role !== "admin") redirect("/ps?denied=panel");
  return user;
}

export async function startSession(user: PublicUser): Promise<void> {
  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Only allow same-site relative paths as post-login destinations. */
export function safeNext(next: unknown, fallback = "/ps"): string {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  if (next.startsWith("/login") || next.startsWith("/register")) return fallback;
  return next;
}
