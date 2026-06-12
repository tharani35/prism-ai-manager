import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.string().email().transform((value) => value.toLowerCase());

export const signup = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2, "Enter your name."),
      email: emailSchema,
      password: z.string().min(8, "Use at least 8 characters."),
    }),
  )
  .handler(async ({ data }) => {
    const { createUser, issueSession, toPublicUser } = await import("../auth.server");
    const user = await createUser(data);
    issueSession(user);
    return { user: toPublicUser(user) };
  });

export const login = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: emailSchema,
      password: z.string().min(1, "Enter your password."),
    }),
  )
  .handler(async ({ data }) => {
    const { findUserByEmail, issueSession, toPublicUser, verifyPassword } = await import(
      "../auth.server"
    );
    const user = await findUserByEmail(data.email);
    if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
      throw new Error("Invalid email or password.");
    }
    issueSession(user);
    return { user: toPublicUser(user) };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const { clearSessionCookie } = await import("../auth.server");
  clearSessionCookie();
  return { ok: true };
});

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const { getCurrentUser } = await import("../auth.server");
  return { user: await getCurrentUser() };
});

export const updateProfile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      avatarUrl: z.string().url().optional().or(z.literal("")),
      company: z.string().max(120).optional(),
      role: z.string().max(120).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { requireCurrentUser, toPublicUser, updateUser } = await import("../auth.server");
    const currentUser = await requireCurrentUser();
    const user = await updateUser(currentUser.id, {
      name: data.name,
      avatarUrl: data.avatarUrl || undefined,
      company: data.company,
      role: data.role,
    });
    return { user: toPublicUser(user) };
  });

export const updateAccountSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      notifications: z.boolean(),
      appearance: z.enum(["system", "dark", "light"]),
      openaiModel: z.string().min(1).max(80),
    }),
  )
  .handler(async ({ data }) => {
    const { requireCurrentUser, toPublicUser, updateUser } = await import("../auth.server");
    const currentUser = await requireCurrentUser();
    const user = await updateUser(currentUser.id, data);
    return { user: toPublicUser(user) };
  });
