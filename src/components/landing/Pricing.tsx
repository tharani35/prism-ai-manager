import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeader } from "./Features";

const tiers = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    desc: "For freelancers and solo creators getting started.",
    features: ["50 AI generations / mo", "3 channels", "Basic analytics", "Email support"],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "For growing teams scaling content production.",
    features: ["Unlimited generations", "All channels", "Advanced analytics", "Workflow automation", "Priority support"],
    cta: "Start free trial",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations with security & scale requirements.",
    features: ["Custom AI models", "SSO + SCIM", "Audit logs & SLA", "Dedicated CSM", "On-prem options"],
    cta: "Contact sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Pricing that scales with you"
          desc="Start free. Upgrade when your team is ready. No surprises."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl p-7 ${
                t.highlight
                  ? "glass-strong glow-border scale-[1.02] shadow-[0_0_80px_-20px_rgba(139,92,246,0.6)]"
                  : "glass"
              }`}
            >
              {t.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-medium text-white"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
                  {t.badge}
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{t.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-white">{t.price}</span>
                <span className="text-sm text-slate-500">{t.period}</span>
              </div>
              <a
                href="#cta"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  t.highlight
                    ? "text-white shadow-[0_0_40px_-10px_rgba(139,92,246,0.7)] hover:scale-[1.02]"
                    : "glass text-white hover:bg-white/10"
                }`}
                style={t.highlight ? { background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" } : undefined}
              >
                {t.cta}
              </a>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--brand-cyan)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
