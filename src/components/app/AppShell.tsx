import { Link, useNavigate } from "@tanstack/react-router";
import { logout, type getSession } from "@/lib/api/auth.functions";
import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";

type Session = Awaited<ReturnType<typeof getSession>>;

const navigation = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/content", label: "Content", icon: FileText },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    await navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen text-white">
      <AmbientBackground />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 px-4 py-4 md:px-6">
        <aside className="glass-strong sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 rounded-xl p-4 md:flex md:flex-col">
          <Link to="/" className="mb-8 flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-white/10 font-bold">P</div>
            <div>
              <div className="font-semibold">PRISM</div>
              <div className="text-xs text-white/55">AI Manager</div>
            </div>
          </Link>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/dashboard" }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                activeProps={{ className: "bg-white/12 text-white" }}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-white/10 pt-4">
            <div className="mb-3 text-sm">
              <div className="font-medium">{session.user?.name}</div>
              <div className="truncate text-xs text-white/50">{session.user?.email}</div>
            </div>
            <Button variant="secondary" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-24 md:pb-0">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur md:hidden">
            <Link to="/" className="font-semibold">PRISM</Link>
            <Button size="sm" variant="secondary" onClick={handleLogout}>Logout</Button>
          </div>
          {children}
        </main>

        <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-xl border border-white/10 bg-black/70 p-1 backdrop-blur md:hidden">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/dashboard" }}
              className={cn("grid place-items-center rounded-lg py-2 text-white/60")}
              activeProps={{ className: "bg-white/12 text-white" }}
            >
              <item.icon className="size-5" />
              <span className="mt-1 text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
        {eyebrow}
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">{description}</p>
    </header>
  );
}

export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-sm text-white/55">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
      <div className="mt-2 text-xs text-white/45">{detail}</div>
    </div>
  );
}
