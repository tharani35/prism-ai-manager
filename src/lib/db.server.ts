import { MongoClient, type Collection, type Db } from "mongodb";

import { getServerConfig } from "./config.server";

let clientPromise: Promise<MongoClient> | undefined;
let indexesPromise: Promise<void> | undefined;

export type UserRecord = {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  company?: string;
  role?: string;
  notifications: boolean;
  appearance: "system" | "dark" | "light";
  openaiModel?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContentRecord = {
  _id?: string;
  userId: string;
  type: "blog" | "linkedin" | "email" | "marketing";
  title: string;
  body: string;
  prompt: string;
  tone: string;
  status: "draft" | "published" | "archived";
  views: number;
  clicks: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
};

type MemoryDb = {
  users: UserRecord[];
  contents: ContentRecord[];
};

const memoryDb: MemoryDb = {
  users: [],
  contents: [],
};

async function getMongoClient() {
  const { mongodbUri } = getServerConfig();
  if (!mongodbUri) return undefined;

  clientPromise ??= new MongoClient(mongodbUri).connect();
  return clientPromise;
}

export async function getDatabase(): Promise<Db | undefined> {
  const client = await getMongoClient();
  if (!client) return undefined;
  return client.db(getServerConfig().mongodbDbName);
}

export async function validateDatabaseConnection() {
  const db = await getDatabase();
  if (!db) {
    return {
      ok: true,
      mode: "memory" as const,
      message: "MONGODB_URI is not configured; using in-memory development storage.",
    };
  }

  await db.command({ ping: 1 });
  await ensureDatabaseIndexes(db);
  return {
    ok: true,
    mode: "mongodb" as const,
    message: `Connected to MongoDB database "${getServerConfig().mongodbDbName}".`,
  };
}

async function ensureDatabaseIndexes(db: Db) {
  indexesPromise ??= Promise.all([
    db.collection<UserRecord>("users").createIndex({ email: 1 }, { unique: true }),
    db.collection<ContentRecord>("contents").createIndex({ userId: 1, createdAt: -1 }),
    db.collection<ContentRecord>("contents").createIndex({ userId: 1, type: 1, status: 1 }),
  ]).then(() => undefined);

  return indexesPromise;
}

export async function usersCollection(): Promise<Collection<UserRecord> | undefined> {
  return (await getDatabase())?.collection<UserRecord>("users");
}

export async function contentsCollection(): Promise<Collection<ContentRecord> | undefined> {
  return (await getDatabase())?.collection<ContentRecord>("contents");
}

export function memoryUsers() {
  return memoryDb.users;
}

export function memoryContents() {
  return memoryDb.contents;
}
