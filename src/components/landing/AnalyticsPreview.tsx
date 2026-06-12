import { motion } from "motion/react";
import { ArrowUpRight, Eye, Heart, Share2 } from "lucide-react";
import { SectionHeader } from "./Features";

export function AnalyticsPreview() {
  return (
    <section id="resources" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Insights"
          title="Decisions backed by intelligence"
          desc="Track performance, surface opportunities, and let PRISM forecast what to ship next."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14"
        >
          <div className="absolute -inset-x-10 -top-10 -z-10 h-40 blur-3xl opacity-60"
            style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4), transparent 60%)" }} />

          <div className="rounded-2xl glass-strong glow-border p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Total reach", value: "2.84M", trend: "+18.2%", icon: Eye, color: "#3B82F6" },
                { label: "Engagement", value: "412K", trend: "+24.7%", icon: Heart, color: "#8B5CF6" },
                { label: "Shares", value: "61.3K", trend: "+9.1%", icon: Share2, color: "#06B6D4" },
                { label: "Conversion", value: "5.84%", trend: "+2.4%", icon: ArrowUpRight, color: "#22d3ee" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">{k.label}</span>
                    <k.icon className="h-3.5 w-3.5" style={{ color: k.color }} />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-xl font-semibold text-white">{k.value}</div>
                    <div className="text-[11px] text-emerald-300">{k.trend}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-5">
              <div className="lg:col-span-3 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">Content performance</div>
                    <div className="text-xs text-slate-500">Last 30 days</div>
                  </div>
                  <div className="flex gap-1 text-[11px]">
                    {["7d", "30d", "90d"].map((t, i) => (
                      <span key={t} className={`rounded-md px-2 py-1 ${i === 1 ? "bg-white/10 text-white" : "text-slate-400"}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <AreaChart />
              </div>

              <div className="lg:col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="text-sm font-medium text-white">Top channels</div>
                <div className="mt-4 space-y-3">
                  {[
                    { name: "LinkedIn", pct: 92, color: "#3B82F6" },
                    { name: "Blog", pct: 78, color: "#8B5CF6" },
                    { name: "X / Twitter", pct: 64, color: "#06B6D4" },
                    { name: "Newsletter", pct: 48, color: "#a78bfa" },
                  ].map((c) => (
                    <div key={c.name}>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{c.name}</span>
                        <span className="text-slate-500">{c.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}80)` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AreaChart() {
  const a = [12, 22, 18, 28, 24, 36, 30, 44, 38, 52, 46, 60, 54, 70, 64, 80];
  const b = [8, 14, 12, 20, 16, 26, 22, 30, 28, 38, 34, 44, 40, 52, 48, 60];
  const path = (arr: number[]) => {
    const max = Math.max(...a);
    return arr.map((p, i) => {
      const x = (i / (arr.length - 1)) * 100;
      const y = 100 - (p / max) * 88;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };
  const da = path(a), db = path(b);
  return (
    <svg viewBox="0 0 100 100" className="h-44 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gb" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
      ))}
      <path d={`${da} L 100 100 L 0 100 Z`} fill="url(#ga)" />
      <path d={da} fill="none" stroke="#8B5CF6" strokeWidth="1" />
      <path d={`${db} L 100 100 L 0 100 Z`} fill="url(#gb)" />
      <path d={db} fill="none" stroke="#06B6D4" strokeWidth="1" />
    </svg>
  );
}
