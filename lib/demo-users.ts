// MOCK AUTH: demo accounts seeded into the in-memory user store (lib/users.ts).
// They exist so the site can be tried without a backend. Turn them off with
// DISABLE_DEMO_USERS=1, and remove this file once real auth is wired in.

import type { Role } from "./session";

export const DEMO_USERS: { email: string; name: string; password: string; role: Role }[] = [
  { email: "admin@unreal.test", name: "Demo Admin", password: "admin-demo-123", role: "admin" },
  { email: "user@unreal.test", name: "Demo User", password: "user-demo-123", role: "user" },
];
