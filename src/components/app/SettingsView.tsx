import { useEffect, useState } from "react";
import { updateAccountSettings, type getSession } from "@/lib/api/auth.functions";
import { validateDatabase } from "@/lib/api/content.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "./AppShell";

type Session = Awaited<ReturnType<typeof getSession>>;

export function SettingsView({ session }: { session: Session }) {
  const user = session.user;
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [appearance, setAppearance] = useState(user?.appearance ?? "system");
  const [openaiModel, setOpenaiModel] = useState(user?.openaiModel ?? "gpt-4o-mini");
  const [message, setMessage] = useState("");
  const [dbMessage, setDbMessage] = useState("Checking database connection...");

  useEffect(() => {
    void validateDatabase()
      .then((result) => setDbMessage(result.message))
      .catch((error) => setDbMessage(error instanceof Error ? error.message : "Database check failed."));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateAccountSettings({ data: { notifications, appearance, openaiModel } });
    setMessage("Settings saved.");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings."
        description="Control appearance, notifications, model preferences, and backend connection health."
      />

      <form onSubmit={handleSubmit} className="grid max-w-4xl gap-4 lg:grid-cols-2">
        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
          <select
            className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2"
            value={appearance}
            onChange={(event) => setAppearance(event.target.value as "system" | "dark" | "light")}
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </section>

        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
          <label className="flex items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => setNotifications(event.target.checked)}
            />
            Email me about generated content and account activity
          </label>
        </section>

        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">API configuration</h2>
          <label className="block text-sm">
            <span className="mb-2 block text-white/65">Preferred OpenAI model</span>
            <Input value={openaiModel} onChange={(event) => setOpenaiModel(event.target.value)} />
          </label>
          <p className="mt-3 text-xs text-white/45">
            Server generation uses OPENAI_API_KEY when configured and falls back to local draft generation in development.
          </p>
        </section>

        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Database</h2>
          <p className="text-sm text-white/60">{dbMessage}</p>
        </section>

        <div className="lg:col-span-2">
          {message ? <p className="mb-3 text-sm text-cyan-200">{message}</p> : null}
          <Button>Save settings</Button>
        </div>
      </form>
    </div>
  );
}
