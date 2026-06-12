import { useState } from "react";
import { updateProfile, type getSession } from "@/lib/api/auth.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "./AppShell";

type Session = Awaited<ReturnType<typeof getSession>>;

export function ProfileView({ session }: { session: Session }) {
  const user = session.user;
  const [name, setName] = useState(user?.name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [company, setCompany] = useState(user?.company ?? "");
  const [role, setRole] = useState(user?.role ?? "");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    await updateProfile({ data: { name, avatarUrl, company, role } });
    setMessage("Profile updated.");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Account profile."
        description="Update identity, avatar, company, and role information used across your PRISM workspace."
      />

      <form onSubmit={handleSubmit} className="glass max-w-2xl rounded-xl p-5">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid size-16 place-items-center overflow-hidden rounded-xl bg-white/10 text-xl font-semibold">
            {avatarUrl ? <img src={avatarUrl} alt="" className="size-full object-cover" /> : name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold">{user?.email}</h2>
            <p className="text-sm text-white/50">Member since {user ? new Date(user.createdAt).toLocaleDateString() : ""}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-2 block text-white/65">Name</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-white/65">Avatar URL</span>
            <Input value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-white/65">Company</span>
            <Input value={company} onChange={(event) => setCompany(event.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-white/65">Role</span>
            <Input value={role} onChange={(event) => setRole(event.target.value)} />
          </label>
        </div>
        {message ? <p className="mt-4 text-sm text-cyan-200">{message}</p> : null}
        <Button className="mt-6">Save profile</Button>
      </form>
    </div>
  );
}
