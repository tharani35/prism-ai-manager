import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contentTypeSchema = z.enum(["blog", "linkedin", "email", "marketing"]);
const contentStatusSchema = z.enum(["draft", "published", "archived"]);

export const validateDatabase = createServerFn({ method: "GET" }).handler(async () => {
  const { validateDatabaseConnection } = await import("../db.server");
  return validateDatabaseConnection();
});

export const generateContent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      type: contentTypeSchema,
      prompt: z.string().min(8, "Describe what you want to create."),
      tone: z.string().min(2).max(60),
      save: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const { requireCurrentUser } = await import("../auth.server");
    const { createContent, toPublicContent } = await import("../content.server");
    const { generateWithOpenAI } = await import("../openai.server");
    const user = await requireCurrentUser();
    const draft = await generateWithOpenAI({ ...data, model: user.openaiModel });

    if (!data.save) return { draft, content: undefined };

    const content = await createContent({
      userId: user.id,
      type: data.type,
      title: draft.title,
      body: draft.body,
      prompt: data.prompt,
      tone: data.tone,
    });

    return {
      draft,
      content: toPublicContent(content),
    };
  });

export const listMyContent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      query: z.string().optional(),
      type: z.enum(["all", "blog", "linkedin", "email", "marketing"]).default("all"),
      status: z.enum(["all", "draft", "published", "archived"]).default("all"),
    }),
  )
  .handler(async ({ data }) => {
    const { requireCurrentUser } = await import("../auth.server");
    const { listContent } = await import("../content.server");
    const user = await requireCurrentUser();
    return {
      items: await listContent({
        userId: user.id,
        query: data.query,
        type: data.type,
        status: data.status,
      }),
    };
  });

export const updateMyContent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      body: z.string().min(1),
      status: contentStatusSchema,
    }),
  )
  .handler(async ({ data }) => {
    const { requireCurrentUser } = await import("../auth.server");
    const { updateContent } = await import("../content.server");
    const user = await requireCurrentUser();
    return { item: await updateContent({ ...data, userId: user.id }) };
  });

export const deleteMyContent = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { requireCurrentUser } = await import("../auth.server");
    const { deleteContent } = await import("../content.server");
    const user = await requireCurrentUser();
    return deleteContent({ id: data.id, userId: user.id });
  });

export const getDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const { requireCurrentUser } = await import("../auth.server");
  const { getContentStats, listContent } = await import("../content.server");
  const user = await requireCurrentUser();
  const [stats, recentContent] = await Promise.all([
    getContentStats(user.id),
    listContent({ userId: user.id }),
  ]);

  return {
    user,
    stats,
    recentContent,
  };
});
