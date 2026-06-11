import { motion } from "motion/react";
import { Sparkles, Workflow, Share2, Users, Search, LineChart, type LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  { icon: Sparkles, title: "AI Content Generation", desc: "Generate on-brand articles, posts, and copy in seconds with agentic models.", color: "#8B5CF6" },
  { icon: Workflow, title: "Smart Workflow Automation", desc: "Trigger reviews, approvals, and publishing pipelines without lifting a finger.", color: "#3B82F6" },
  { icon: Share2, title: "Multi-Channel Publishing", desc: "Ship once, distribute everywhere — web, social, email, and CMS.", color: "#06B6D4" },
  { icon: Users, title: "Team Collaboration", desc: "Realtime editing, comments, and version history built for content teams.", color: "#a78bfa" },
  { icon: Search, title: "SEO Optimization", desc: "Rank-aware suggestions, semantic clusters, and keyword orchestration.", color: "#60a5fa" },
  { icon: LineChart, title: "Predictive Analytics", desc: "Forecast performance and discover which stories your audience will love.", color: "#22d3ee" },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Platform"
          title="Everything your content team needs"
          desc="A single intelligent surface for ideation, production, distribution, and measurement."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl glass p-6 transition-all hover:bg-white/[0.06]"
            >
              <div
                className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ background: `radial-gradient(400px circle at var(--x,50%) var(--y,50%), ${f.color}33, transparent 40%)` }}
              />
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${f.color}40, ${f.color}10)`, border: `1px solid ${f.color}33` }}
              >
                <f.icon className="h-5 w-5" style={{ color: f.color }} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-slate-400">{desc}</p>
    </div>
  );
}
