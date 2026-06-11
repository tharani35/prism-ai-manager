import { motion, type Variants } from "motion/react";
import { ArrowRight, Play, Sparkles, TrendingUp, Zap, Globe2, BarChart3 } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative pt-40 pb-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div variants={rise} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-slate-300">
          <span className="grid h-4 w-4 place-items-center rounded-full" style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </span>
          Introducing Lumen 2.0 — Agentic content workflows
          <ArrowRight className="h-3 w-3 opacity-70" />
        </motion.div>

        <motion.h1
          variants={rise}
          className="text-balance font-display text-5xl font-semibold tracking-tight text-gradient sm:text-6xl md:text-7xl"
        >
          Create, Manage & Scale{" "}
          <span className="text-gradient-brand">Content with AI</span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-slate-400 sm:text-lg"
        >
          Generate high-performing content, automate workflows, collaborate with your team, and gain deep
          content insights from one intelligent platform.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[0_0_60px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03] hover:shadow-[0_0_80px_-10px_rgba(139,92,246,0.9)]"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
          >
            Start free trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <Play className="h-4 w-4" /> Watch demo
          </a>
        </motion.div>

        <motion.p variants={rise} className="mt-4 text-xs text-slate-500">
          No credit card required · 14-day free trial · Cancel anytime
        </motion.p>
      </motion.div>

      <HeroDashboard />
    </section>
  );
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 max-w-6xl px-6"
    >
      {/* outer glow */}
      <div className="absolute inset-x-10 -top-10 h-40 blur-3xl opacity-70"
        style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.5), transparent 60%)" }} />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl glass-strong glow-border overflow-hidden shadow-2xl"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="rounded-md bg-white/5 px-3 py-1 text-[11px] text-slate-400">
            lumen.app / workspace / content
          </div>
          <div className="text-[11px] text-slate-500">v2.0</div>
        </div>

        <div className="grid grid-cols-12 gap-px bg-white/5 text-left">
          {/* sidebar */}
          <div className="col-span-3 hidden bg-[#0a0f1f]/80 p-4 md:block">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Workspace</div>
            <div className="mt-3 space-y-1.5 text-xs text-slate-300">
              {["Overview", "AI Studio", "Campaigns", "Calendar", "Insights", "Team"].map((i, idx) => (
                <div key={i} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${idx === 1 ? "bg-white/5 text-white" : "hover:bg-white/5"}`}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: idx === 1 ? "#8B5CF6" : "#475569" }} />
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* main */}
          <div className="col-span-12 bg-[#070c1c]/80 p-5 md:col-span-9">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Today</div>
                <div className="text-sm font-medium text-white">Content Performance</div>
              </div>
              <div className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
                +24.8% vs last week
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "Pieces shipped", value: "1,284", icon: Zap, color: "#3B82F6" },
                { label: "Engagement", value: "98.2%", icon: TrendingUp, color: "#8B5CF6" },
                { label: "Channels", value: "12", icon: Globe2, color: "#06B6D4" },
                { label: "AI runs", value: "48.6k", icon: BarChart3, color: "#a78bfa" },
              ].map((k) => (
                <div key={k.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">{k.label}</span>
                    <k.icon className="h-3.5 w-3.5" style={{ color: k.color }} />
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">{k.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-5">
              <div className="md:col-span-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Weekly reach</span>
                  <span className="text-[11px] text-slate-500">Last 7 days</span>
                </div>
                <Sparkline />
              </div>
              <div className="md:col-span-2 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                <div className="text-xs text-slate-400 mb-3">AI Suggestions</div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {["Repurpose blog → 6 LinkedIn posts", "Optimize SEO for Q4 launch", "A/B test subject lines"].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3" style={{ color: "#06B6D4" }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Sparkline() {
  const points = [10, 22, 18, 32, 28, 44, 38, 56, 50, 68, 62, 78, 72, 88];
  const max = Math.max(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 90;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="s" x1="0" x2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path d={`${d} L 100 100 L 0 100 Z`} fill="url(#g)" />
      <path d={d} fill="none" stroke="url(#s)" strokeWidth="1.5" />
    </svg>
  );
}
