import crypto from "node:crypto";
import { ObjectId } from "mongodb";

import {
  contentsCollection,
  memoryContents,
  type ContentRecord,
} from "./db.server";

export type ContentKind = ContentRecord["type"];
export type ContentStatus = ContentRecord["status"];

export type PublicContent = Omit<ContentRecord, "_id"> & {
  id: string;
};

export function toPublicContent(content: ContentRecord): PublicContent {
  const { _id, ...rest } = content;
  return { ...rest, id: String(_id) };
}

export async function createContent(input: {
  userId: string;
  type: ContentKind;
  title: string;
  body: string;
  prompt: string;
  tone: string;
  status?: ContentStatus;
}) {
  const now = new Date().toISOString();
  const content: ContentRecord = {
    _id: crypto.randomUUID(),
    userId: input.userId,
    type: input.type,
    title: input.title,
    body: input.body,
    prompt: input.prompt,
    tone: input.tone,
    status: input.status ?? "draft",
    views: Math.floor(Math.random() * 900) + 80,
    clicks: Math.floor(Math.random() * 120) + 12,
    conversions: Math.floor(Math.random() * 24),
    createdAt: now,
    updatedAt: now,
  };

  const collection = await contentsCollection();
  if (collection) {
    const { _id, ...document } = content;
    const result = await collection.insertOne(document);
    return { ...content, _id: result.insertedId.toString() };
  }

  memoryContents().push(content);
  return content;
}

export async function listContent(input: {
  userId: string;
  query?: string;
  type?: ContentKind | "all";
  status?: ContentStatus | "all";
}) {
  const normalizedQuery = input.query?.trim().toLowerCase();
  const collection = await contentsCollection();

  if (collection) {
    const filter: Record<string, unknown> = { userId: input.userId };
    if (input.type && input.type !== "all") filter.type = input.type;
    if (input.status && input.status !== "all") filter.status = input.status;
    if (normalizedQuery) {
      filter.$or = [
        { title: { $regex: normalizedQuery, $options: "i" } },
        { body: { $regex: normalizedQuery, $options: "i" } },
        { prompt: { $regex: normalizedQuery, $options: "i" } },
      ];
    }
    const items = await collection.find(filter).sort({ createdAt: -1 }).toArray();
    return items.map(toPublicContent);
  }

  return memoryContents()
    .filter((content) => content.userId === input.userId)
    .filter((content) => !input.type || input.type === "all" || content.type === input.type)
    .filter((content) => !input.status || input.status === "all" || content.status === input.status)
    .filter((content) => {
      if (!normalizedQuery) return true;
      return [content.title, content.body, content.prompt].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      );
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(toPublicContent);
}

export async function updateContent(input: {
  id: string;
  userId: string;
  title: string;
  body: string;
  status: ContentStatus;
}) {
  const updatedAt = new Date().toISOString();
  const collection = await contentsCollection();

  if (collection) {
    const query = ObjectId.isValid(input.id)
      ? { _id: new ObjectId(input.id) as never, userId: input.userId }
      : { _id: input.id, userId: input.userId };
    await collection.updateOne(query, {
      $set: {
        title: input.title,
        body: input.body,
        status: input.status,
        updatedAt,
      },
    });
    const item = await collection.findOne(query);
    if (!item) throw new Error("Content not found.");
    return toPublicContent(item);
  }

  const item = memoryContents().find(
    (content) => content._id === input.id && content.userId === input.userId,
  );
  if (!item) throw new Error("Content not found.");
  item.title = input.title;
  item.body = input.body;
  item.status = input.status;
  item.updatedAt = updatedAt;
  return toPublicContent(item);
}

export async function deleteContent(input: { id: string; userId: string }) {
  const collection = await contentsCollection();
  if (collection) {
    const query = ObjectId.isValid(input.id)
      ? { _id: new ObjectId(input.id) as never, userId: input.userId }
      : { _id: input.id, userId: input.userId };
    await collection.deleteOne(query);
    return { ok: true };
  }

  const index = memoryContents().findIndex(
    (content) => content._id === input.id && content.userId === input.userId,
  );
  if (index >= 0) memoryContents().splice(index, 1);
  return { ok: true };
}

export async function getContentStats(userId: string) {
  const items = await listContent({ userId });
  const totalViews = items.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = items.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = items.reduce((sum, item) => sum + item.conversions, 0);
  const byType = items.reduce<Record<ContentKind, number>>(
    (acc, item) => {
      acc[item.type] += 1;
      return acc;
    },
    { blog: 0, linkedin: 0, email: 0, marketing: 0 },
  );

  const activity = items.slice(0, 6).map((item) => ({
    id: item.id,
    title: item.title,
    type: item.type,
    status: item.status,
    createdAt: item.createdAt,
  }));

  return {
    totalContent: items.length,
    totalViews,
    totalClicks,
    totalConversions,
    conversionRate: totalViews ? Math.round((totalConversions / totalViews) * 10000) / 100 : 0,
    byType,
    recentActivity: activity,
    chart: items.slice(0, 12).reverse().map((item, index) => ({
      name: `Item ${index + 1}`,
      views: item.views,
      clicks: item.clicks,
      conversions: item.conversions,
      type: item.type,
    })),
  };
}
