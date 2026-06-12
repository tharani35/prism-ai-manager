import { Link } from "@tanstack/react-router";
import { BarChart3, FileText, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader, StatCard } from "./AppShell";
import type { getDashboardData } from "@/lib/api/content.functions";

type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;

export function DashboardHome({ data }: { data: DashboardData }) {
  const stats = data.stats;

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title={`Good to see you, ${data.user.name.split(" ")[0]}.`}
        description="Monitor content velocity, recent activity, and performance from one operational dashboard."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Generated content" value={stats.totalContent} detail="Saved workspace assets" />
        <StatCard label="Views" value={stats.totalViews.toLocaleString()} detail="Estimated content reach" />
        <StatCard label="Clicks" value={stats.totalClicks.toLocaleString()} detail="Engagement events" />
        <StatCard label="Conversion rate" value={`${stats.conversionRate}%`} detail="Conversions per view" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <Link to="/dashboard/content" className="text-sm text-cyan-200 hover:text-white">
              Manage content
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentActivity.length ? (
              stats.recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-white/10">
                    <FileText className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{item.title}</div>
                    <div className="text-xs capitalize text-white/45">{item.type} · {item.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm text-white/55">
                Generate your first asset to populate activity.
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Content mix</h2>
          <div className="space-y-3">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type}>
                <div className="mb-1 flex justify-between text-sm capitalize">
                  <span>{type}</span>
                  <span className="text-white/55">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-cyan-300"
                    style={{ width: `${stats.totalContent ? (count / stats.totalContent) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            <Link to="/dashboard/content" className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]">
              <Sparkles className="mb-2 size-5 text-cyan-200" />
              <div className="font-medium">Generate content</div>
              <div className="text-sm text-white/50">Blog posts, LinkedIn, emails, and copy.</div>
            </Link>
            <Link to="/dashboard/analytics" className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]">
              <BarChart3 className="mb-2 size-5 text-purple-200" />
              <div className="font-medium">Review analytics</div>
              <div className="text-sm text-white/50">Charts powered by saved content.</div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-4 glass rounded-xl p-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="size-5 text-cyan-200" />
          <div>
            <h2 className="font-semibold">Usage statistics</h2>
            <p className="text-sm text-white/55">
              PRISM tracks generated assets, engagement estimates, and conversion signals per saved item.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
