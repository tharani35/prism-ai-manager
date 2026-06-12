import OpenAI from "openai";

import { getServerConfig } from "./config.server";
import type { ContentKind } from "./content.server";

const labels: Record<ContentKind, string> = {
  blog: "blog post",
  linkedin: "LinkedIn post",
  email: "email campaign",
  marketing: "marketing copy",
};

function fallbackDraft(input: { type: ContentKind; prompt: string; tone: string }) {
  const label = labels[input.type];
  return {
    title: `${input.tone} ${label}: ${input.prompt.slice(0, 56)}`,
    body: [
      `Here is a ${input.tone.toLowerCase()} ${label} draft for: ${input.prompt}.`,
      "",
      "Hook: Turn the core idea into a clear promise your audience can understand quickly.",
      "",
      "Main message: Explain the customer problem, show the practical insight, and connect it to a measurable business outcome.",
      "",
      "Call to action: Invite the reader to take the next step, reply with context, or explore the offer.",
    ].join("\n"),
  };
}

export async function generateWithOpenAI(input: {
  type: ContentKind;
  prompt: string;
  tone: string;
  model?: string;
}) {
  const { openaiApiKey } = getServerConfig();
  if (!openaiApiKey) return fallbackDraft(input);

  const client = new OpenAI({ apiKey: openaiApiKey });
  const response = await client.chat.completions.create({
    model: input.model || "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are PRISM AI MANAGER, a concise SaaS content strategist. Return a title and polished body copy.",
      },
      {
        role: "user",
        content: `Generate a ${labels[input.type]} in a ${input.tone} tone for this brief: ${input.prompt}`,
      },
    ],
  });

  const text = response.choices[0]?.message.content?.trim() ?? fallbackDraft(input).body;
  const [firstLine, ...rest] = text.split("\n").filter(Boolean);
  return {
    title: firstLine?.replace(/^#+\s*/, "").replace(/^title:\s*/i, "") || fallbackDraft(input).title,
    body: rest.length ? rest.join("\n\n") : text,
  };
}
