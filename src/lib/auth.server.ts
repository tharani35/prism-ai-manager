import crypto from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { ObjectId } from "mongodb";

import {
  memoryUsers,
  usersCollection,
  type UserRecord,
} from "./db.server";
import { getServerConfig } from "./config.server";

const COOKIE_NAME = "prism_session";
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  company?: string;
  role?: string;
  notifications: boolean;
  appearance: "system" | "dark" | "light";
  openaiModel?: string;
  createdAt: string;
};

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
};

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function signJwt(payload: JwtPayload) {
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64Url(JSON.stringify(payload));
  const signature = crypto
    .createHmac("sha256", getServerConfig().jwtSecret)
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
}

function verifyJwt(token: string): JwtPayload | undefined {
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return undefined;

    const expected = crypto
      .createHmac("sha256", getServerConfig().jwtSecret)
      .update(`${header}.${body}`)
      .digest("base64url");

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return undefined;
    }

    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as JwtPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return undefined;
    return payload;
  } catch {
    return undefined;
  }
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });

  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), derived);
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    company: user.company,
    role: user.role,
    notifications: user.notifications,
    appearance: user.appearance,
    openaiModel: user.openaiModel,
    createdAt: user.createdAt,
  };
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase();
  const collection = await usersCollection();
  if (collection) return collection.findOne({ email: normalizedEmail });
  return memoryUsers().find((user) => user.email === normalizedEmail);
}

export async function findUserById(id: string) {
  const collection = await usersCollection();
  if (collection) {
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) as never } : { _id: id };
    return collection.findOne(query);
  }
  return memoryUsers().find((user) => user._id === id);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new Error("An account with this email already exists.");

  const now = new Date().toISOString();
  const user: UserRecord = {
    _id: crypto.randomUUID(),
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: await hashPassword(input.password),
    notifications: true,
    appearance: "system",
    openaiModel: "gpt-4o-mini",
    createdAt: now,
    updatedAt: now,
  };

  const collection = await usersCollection();
  let createdUser = user;
  if (collection) {
    const { _id, ...document } = user;
    const result = await collection.insertOne(document);
    createdUser = { ...user, _id: result.insertedId.toString() };
  } else {
    memoryUsers().push(user);
  }

  // Seed sample content for rich interactive dashboard charts & stats
  try {
    const { createContent } = await import("./content.server");
    const seedData = [
      {
        type: "blog" as const,
        title: "10 Growth Strategies for SaaS in 2026",
        body: "SaaS growth in 2026 is all about automation and personalization. Here are 10 strategies that will define high-velocity scaling this year:\n\n1. Product-led growth coupled with AI onboarding.\n2. Hyper-targeted email campaigns tailored to micro-segments.\n3. Content syndication via automated multi-channel sharing.\n4. Conversational search optimization for AI search engines.",
        prompt: "SaaS growth strategies for 2026",
        tone: "Professional",
        status: "published" as const,
      },
      {
        type: "linkedin" as const,
        title: "Introducing agentic content workflows on PRISM",
        body: "Imagine generating, formatting, and scheduling a complete multi-channel content campaign in under 10 minutes.\n\nToday, we are launching agentic content workflows on PRISM. No more copy-pasting between ChatGPT, your editor, and your scheduler.\n\nGive it a try and let us know what you think! 🚀",
        prompt: "launch post for PRISM agentic workflows",
        tone: "Confident",
        status: "published" as const,
      },
      {
        type: "email" as const,
        title: "Welcome to PRISM AI Manager",
        body: "Hi there,\n\nWelcome to PRISM! Your workspace is ready.\n\nPRISM is built to help modern content teams scale their content velocity up to 3x using OpenAI-powered draft generation, performance monitoring, and collaborative content management.\n\nTo get started, head over to the Content tab and generate your first asset.\n\nCheers,\nThe PRISM Team",
        prompt: "welcome email for new users",
        tone: "Friendly",
        status: "draft" as const,
      },
      {
        type: "marketing" as const,
        title: "Slogan: High-velocity content, simplified",
        body: "PRISM: The AI content command center. Plan, generate, measure, and scale every campaign asset from a secure workspace connected to your own data.",
        prompt: "marketing slogan for PRISM homepage",
        tone: "Persuasive",
        status: "published" as const,
      },
    ];

    for (const item of seedData) {
      await createContent({
        userId: String(createdUser._id),
        ...item,
      });
    }
  } catch (err) {
    console.error("Failed to seed sample content:", err);
  }

  return createdUser;
}

export async function updateUser(
  userId: string,
  patch: Partial<Pick<UserRecord, "name" | "avatarUrl" | "company" | "role" | "notifications" | "appearance" | "openaiModel">>,
) {
  const updatedAt = new Date().toISOString();
  const update = { ...patch, updatedAt };
  const collection = await usersCollection();

  if (collection) {
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) as never } : { _id: userId };
    await collection.updateOne(query, { $set: update });
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found.");
    return user;
  }

  const user = memoryUsers().find((candidate) => candidate._id === userId);
  if (!user) throw new Error("User not found.");
  Object.assign(user, update);
  return user;
}

export function issueSession(user: UserRecord) {
  const token = signJwt({
    sub: String(user._id),
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  });

  setCookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: getServerConfig().nodeEnv === "production",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS,
  });
}

export function clearSessionCookie() {
  setCookie(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: getServerConfig().nodeEnv === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser() {
  const token = getCookie(COOKIE_NAME);
  if (!token) return undefined;
  const payload = verifyJwt(token);
  if (!payload) return undefined;
  const user = await findUserById(payload.sub);
  return user ? toPublicUser(user) : undefined;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Authentication required.");
  return user;
}
