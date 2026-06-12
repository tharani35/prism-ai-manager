import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, StatCard } from "./AppShell";
import type { getDashboardData } from "@/lib/api/content.functions";

type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;

export function AnalyticsView({ data }: { data: DashboardData }) {
  const { stats } = data;

  return (
    <div>
      <PageHeader
        eyebrow="Analytics"
        title="Content performance."
        description="Charts and usage statistics are calculated from saved PRISM content records."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Assets" value={stats.totalContent} detail="Total saved content" />
        <StatCard label="Views" value={stats.totalViews.toLocaleString()} detail="Estimated impressions" />
        <StatCard label="Clicks" value={stats.totalClicks.toLocaleString()} detail="Estimated interactions" />
        <StatCard label="Conversions" value={stats.totalConversions.toLocaleString()} detail="Estimated outcomes" />
      </section>

      <section className="mt-6 glass rounded-xl p-5">
        <h2 className="mb-4 text-lg font-semibold">Performance by recent item</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chart}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.55)" />
              <YAxis stroke="rgba(255,255,255,0.55)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  color: "white",
                }}
              />
              <Legend />
              <Bar dataKey="views" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              <Bar dataKey="clicks" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              <Bar dataKey="conversions" fill="#f0abfc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Usage by content type</h2>
          <div className="space-y-4">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type}>
                <div className="mb-1 flex justify-between text-sm capitalize">
                  <span>{type}</span>
                  <span className="text-white/55">{count} assets</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300"
                    style={{ width: `${stats.totalContent ? (count / stats.totalContent) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <h2 className="mb-4 text-lg font-semibold">Recent signals</h2>
          <div className="space-y-3">
            {data.recentContent.length ? data.recentContent.map((item) => (
              <div key={item.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <div className="truncate text-sm font-medium">{item.title}</div>
                <div className="mt-1 text-xs text-white/50">
                  {item.views} views · {item.clicks} clicks · {item.conversions} conversions
                </div>
              </div>
            )) : (
              <p className="text-sm text-white/55">Generate content to populate analytics.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
