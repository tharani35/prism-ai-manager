import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/lib/api/auth.functions";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);
    try {
      if (mode === "signup") {
        await signup({ data: { name, email, password } });
      } else {
        await login({ data: { email, password } });
      }
      await navigate({ to: "/dashboard" });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen text-white">
      <AmbientBackground />
      <main className="mx-auto grid min-h-screen w-full max-w-6xl place-items-center px-4 py-10">
        <section className="grid w-full gap-6 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <Link to="/" className="mb-8 inline-flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-white/10 font-bold">P</div>
              <span className="font-semibold">PRISM AI MANAGER</span>
            </Link>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
              Your AI content command center.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
              Generate, organize, measure, and refine every campaign asset from a secure
              workspace connected to your own data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-strong rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {mode === "signup" ? "Create account" : "Welcome back"}
              </h2>
              <p className="mt-1 text-sm text-white/55">
                {mode === "signup"
                  ? "Start your PRISM workspace."
                  : "Log in to continue to your dashboard."}
              </p>
            </div>

            <div className="space-y-4">
              {mode === "signup" ? (
                <label className="block text-sm">
                  <span className="mb-2 block text-white/70">Name</span>
                  <Input value={name} onChange={(event) => setName(event.target.value)} required />
                </label>
              ) : null}
              <label className="block text-sm">
                <span className="mb-2 block text-white/70">Email</span>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-white/70">Password</span>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

            <Button className="mt-6 w-full" disabled={isPending}>
              {isPending ? "Working..." : mode === "signup" ? "Sign up" : "Log in"}
            </Button>

            <p className="mt-5 text-center text-sm text-white/55">
              {mode === "signup" ? "Already have an account?" : "New to PRISM?"}{" "}
              <Link
                to={mode === "signup" ? "/auth/login" : "/auth/signup"}
                className="text-cyan-200 hover:text-white"
              >
                {mode === "signup" ? "Log in" : "Create one"}
              </Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
