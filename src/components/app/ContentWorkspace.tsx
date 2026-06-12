import { useMemo, useState } from "react";
import { Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteMyContent,
  generateContent,
  listMyContent,
  updateMyContent,
  type getDashboardData,
} from "@/lib/api/content.functions";
import { PageHeader } from "./AppShell";

type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
type ContentItem = DashboardData["recentContent"][number];
type ContentType = "all" | "blog" | "linkedin" | "email" | "marketing";
type ContentStatus = "all" | "draft" | "published" | "archived";

export function ContentWorkspace({ initialItems }: { initialItems: ContentItem[] }) {
  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ContentType>("all");
  const [status, setStatus] = useState<ContentStatus>("all");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Confident");
  const [contentType, setContentType] = useState<Exclude<ContentType, "all">>("blog");
  const [isPending, setIsPending] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const editingItem = useMemo(() => items.find((item) => item.id === editingId), [editingId, items]);

  async function refresh(next = { query, type, status }) {
    const result = await listMyContent({ data: next });
    setItems(result.items);
  }

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    try {
      await generateContent({ data: { type: contentType, prompt, tone, save: true } });
      setPrompt("");
      await refresh();
    } finally {
      setIsPending(false);
    }
  }

  async function handleFilter(next: Partial<{ query: string; type: ContentType; status: ContentStatus }>) {
    const filters = { query, type, status, ...next };
    if (next.query !== undefined) setQuery(next.query);
    if (next.type !== undefined) setType(next.type);
    if (next.status !== undefined) setStatus(next.status);
    await refresh(filters);
  }

  async function handleSave(item: ContentItem) {
    const title = (document.getElementById(`title-${item.id}`) as HTMLInputElement).value;
    const body = (document.getElementById(`body-${item.id}`) as HTMLTextAreaElement).value;
    const nextStatus = (document.getElementById(`status-${item.id}`) as HTMLSelectElement)
      .value as Exclude<ContentStatus, "all">;
    const result = await updateMyContent({
      data: { id: item.id, title, body, status: nextStatus },
    });
    setItems((current) => current.map((candidate) => (candidate.id === item.id ? result.item : candidate)));
    setEditingId(undefined);
  }

  async function handleDelete(id: string) {
    await deleteMyContent({ data: { id } });
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Generate and manage content."
        description="Create AI drafts, save them to your library, edit copy, search assets, and filter by channel or status."
      />

      <section className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <form onSubmit={handleGenerate} className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-cyan-200" />
            <h2 className="text-lg font-semibold">AI generator</h2>
          </div>
          <label className="mb-3 block text-sm">
            <span className="mb-2 block text-white/65">Format</span>
            <select className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2" value={contentType} onChange={(event) => setContentType(event.target.value as Exclude<ContentType, "all">)}>
              <option value="blog">Blog post</option>
              <option value="linkedin">LinkedIn post</option>
              <option value="email">Email</option>
              <option value="marketing">Marketing copy</option>
            </select>
          </label>
          <label className="mb-3 block text-sm">
            <span className="mb-2 block text-white/65">Tone</span>
            <Input value={tone} onChange={(event) => setTone(event.target.value)} />
          </label>
          <label className="mb-4 block text-sm">
            <span className="mb-2 block text-white/65">Brief</span>
            <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={8} required />
          </label>
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Generating..." : "Generate and save"}
          </Button>
        </form>

        <div className="glass rounded-xl p-5">
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_160px_160px]">
            <Input placeholder="Search content" value={query} onChange={(event) => void handleFilter({ query: event.target.value })} />
            <select className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" value={type} onChange={(event) => void handleFilter({ type: event.target.value as ContentType })}>
              <option value="all">All types</option>
              <option value="blog">Blog</option>
              <option value="linkedin">LinkedIn</option>
              <option value="email">Email</option>
              <option value="marketing">Marketing</option>
            </select>
            <select className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" value={status} onChange={(event) => void handleFilter({ status: event.target.value as ContentStatus })}>
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-3">
            {items.length ? items.map((item) => (
              <article key={item.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                {editingId === item.id ? (
                  <div className="space-y-3">
                    <Input id={`title-${item.id}`} defaultValue={item.title} />
                    <Textarea id={`body-${item.id}`} defaultValue={item.body} rows={8} />
                    <select id={`status-${item.id}`} className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm" defaultValue={item.status}>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                    <div className="flex gap-2">
                      <Button onClick={() => void handleSave(item)}>Save</Button>
                      <Button type="button" variant="secondary" onClick={() => setEditingId(undefined)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold">{item.title}</h3>
                        <div className="mt-1 text-xs capitalize text-white/45">{item.type} · {item.status} · {new Date(item.createdAt).toLocaleDateString()}</div>
                      </div>
                      <Button size="icon" variant="secondary" onClick={() => void handleDelete(item.id)} aria-label="Delete content">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-white/65">{item.body}</p>
                    <Button className="mt-4" variant="secondary" onClick={() => setEditingId(item.id)}>Edit</Button>
                  </>
                )}
              </article>
            )) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55">
                No content matches your filters.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
