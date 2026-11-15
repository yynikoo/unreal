// MOCK AUTH: in-memory user store. Server-only (uses node:crypto).
//
// Data lives in the server process and is lost on restart. On Vercel each
// serverless instance has its own copy, so registered accounts are not durable.
// To go real, replace the functions below with calls to your database / auth
// provider; the rest of the app only uses this module's exported functions.

import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { DEMO_USERS } from "./demo-users";
import type { Role } from "./session";

export type UserStatus = "active" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  createdAt: string; // ISO
  passwordHash: string; // salt:hash (scrypt)
}

export type PublicUser = Omit<User, "passwordHash">;

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function checkPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(expected, actual);
}

function toPublic({ passwordHash: _omit, ...user }: User): PublicUser {
  return user;
}

// Keep one store across hot reloads in dev.
const globalStore = globalThis as unknown as { __unrealUsers?: Map<string, User> };

function store(): Map<string, User> {
  if (!globalStore.__unrealUsers) {
    const map = new Map<string, User>();
    if (process.env.DISABLE_DEMO_USERS !== "1") {
      for (const demo of DEMO_USERS) {
        const id = randomUUID();
        map.set(id, {
          id,
          email: demo.email,
          name: demo.name,
          role: demo.role,
          status: "active",
          createdAt: new Date().toISOString(),
          passwordHash: hashPassword(demo.password),
        });
      }
    }
    globalStore.__unrealUsers = map;
  }
  return globalStore.__unrealUsers;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function findUserById(id: string): PublicUser | null {
  const user = store().get(id);
  return user ? toPublic(user) : null;
}

function findByEmail(email: string): User | undefined {
  const target = normalizeEmail(email);
  for (const user of store().values()) if (user.email === target) return user;
  return undefined;
}

export function listUsers(): PublicUser[] {
  return [...store().values()]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toPublic);
}

export function verifyCredentials(email: string, password: string): PublicUser | null {
  const user = findByEmail(email);
  if (!user) {
    // Burn similar time so missing accounts aren't trivially distinguishable.
    checkPassword(password, `${"0".repeat(32)}:${"0".repeat(64)}`);
    return null;
  }
  return checkPassword(password, user.passwordHash) ? toPublic(user) : null;
}

export function createUser(input: { email: string; name: string; password: string }): PublicUser | { error: string } {
  if (findByEmail(input.email)) return { error: "An account with this email already exists." };
  const id = randomUUID();
  const user: User = {
    id,
    email: normalizeEmail(input.email),
    name: input.name.trim(),
    role: "user", // self-registration never grants admin
    status: "active",
    createdAt: new Date().toISOString(),
    passwordHash: hashPassword(input.password),
  };
  store().set(id, user);
  return toPublic(user);
}

export function updateUser(id: string, patch: Partial<Pick<User, "name" | "role" | "status">>): PublicUser | null {
  const user = store().get(id);
  if (!user) return null;
  Object.assign(user, patch);
  return toPublic(user);
}

export function deleteUser(id: string): boolean {
  return store().delete(id);
}
