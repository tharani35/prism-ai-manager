import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl glass-strong glow-border p-12 text-center sm:p-16"
        >
          <div className="absolute inset-0 -z-10 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(139,92,246,0.45), transparent 60%), radial-gradient(ellipse 50% 60% at 20% -20%, rgba(59,130,246,0.4), transparent 60%), radial-gradient(ellipse 50% 60% at 80% -20%, rgba(6,182,212,0.35), transparent 60%)",
            }} />
          <h2 className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl md:text-6xl">
            Ready to transform your <br className="hidden sm:block" />content workflow?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Join thousands of teams using PRISM to plan, generate, and ship better content faster.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[0_0_60px_-10px_rgba(139,92,246,0.7)] transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
            >
              Start free trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              <Calendar className="h-4 w-4" /> Book a demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
