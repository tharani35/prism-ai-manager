import { motion } from "motion/react";
import { SectionHeader } from "./Features";

const items = [
  {
    quote: "Lumen replaced four tools and shipped our content velocity 3x. The AI quality is just on another level.",
    name: "Avery Chen",
    role: "Head of Content",
    company: "Northwind",
    initials: "AC",
    color: "#3B82F6",
  },
  {
    quote: "Our team finally has one place to plan, draft, and measure. The analytics surface is the best I've used.",
    name: "Marcus Hale",
    role: "VP Marketing",
    company: "Helix Labs",
    initials: "MH",
    color: "#8B5CF6",
  },
  {
    quote: "The agentic workflows feel like having three more strategists on the team. We launched a campaign in a day.",
    name: "Priya Raman",
    role: "Director of Growth",
    company: "Lumetri",
    initials: "PR",
    color: "#06B6D4",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Customers"
          title="Loved by content teams"
          desc="From scrappy startups to global enterprises — teams ship more with Lumen."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl glass p-6 transition-colors hover:bg-white/[0.06]"
            >
              <p className="text-sm leading-relaxed text-slate-200">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
