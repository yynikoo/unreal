"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, requireAdmin, requireUser, safeNext, startSession } from "@/lib/auth";
import { createUser, deleteUser, findUserById, updateUser, verifyCredentials } from "@/lib/users";

export interface FormState {
  error?: string;
  ok?: string;
  fields?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = str(formData, "email").trim();
  const password = str(formData, "password");
  const fields = { email };

  if (!EMAIL_RE.test(email) || !password) return { error: "Enter your email and password.", fields };

  const user = verifyCredentials(email, password);
  if (!user) return { error: "Wrong email or password.", fields };
  if (user.status === "suspended") return { error: "This account is suspended.", fields };

  await startSession(user);
  redirect(safeNext(str(formData, "next")));
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = str(formData, "name").trim();
  const email = str(formData, "email").trim();
  const password = str(formData, "password");
  const confirm = str(formData, "confirm");
  const fields = { name, email };

  if (name.length < 2 || name.length > 40) return { error: "Name should be 2–40 characters.", fields };
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address.", fields };
  if (password.length < 8) return { error: "Password must be at least 8 characters.", fields };
  if (password !== confirm) return { error: "Passwords don't match.", fields };

  const result = createUser({ name, email, password });
  if ("error" in result) return { error: result.error, fields };

  await startSession(result);
  redirect("/ps");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/login");
}

export async function updateProfileAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const me = await requireUser();
  const name = str(formData, "name").trim();
  if (name.length < 2 || name.length > 40) return { error: "Name should be 2–40 characters." };
  if (!me.inStore) return { error: "Your account isn't in the demo store anymore (server restarted). Sign in again." };

  const updated = updateUser(me.id, { name });
  if (!updated) return { error: "Couldn't update your profile." };
  await startSession(updated); // refresh the name stored in the cookie
  revalidatePath("/", "layout");
  return { ok: "Saved." };
}

// ---- admin ----

async function adminTarget(formData: FormData) {
  const me = await requireAdmin();
  const id = str(formData, "id");
  if (!id || id === me.id) return null; // admins can't modify or delete themselves
  return findUserById(id) ? id : null;
}

export async function setRoleAction(formData: FormData): Promise<void> {
  const id = await adminTarget(formData);
  const role = str(formData, "role");
  if (id && (role === "user" || role === "admin")) updateUser(id, { role });
  revalidatePath("/panel");
}

export async function setStatusAction(formData: FormData): Promise<void> {
  const id = await adminTarget(formData);
  const status = str(formData, "status");
  if (id && (status === "active" || status === "suspended")) updateUser(id, { status });
  revalidatePath("/panel");
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  const id = await adminTarget(formData);
  if (id) deleteUser(id);
  revalidatePath("/panel");
}
