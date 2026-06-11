import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Wand2, ChevronDown } from "lucide-react";
import { SectionHeader } from "./Features";

const FULL_TEXT =
  "Introducing Lumen Studio — the AI workspace where ideas become campaigns. Draft posts, repurpose long-form into 12 channels, and ship on-brand assets in minutes, not weeks.";

export function GeneratorPreview() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 22) {
        i = Math.min(FULL_TEXT.length, i + 1);
        setTyped(FULL_TEXT.slice(0, i));
        last = now;
      }
      if (i < FULL_TEXT.length) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => { i = 0; setTyped(""); raf = requestAnimationFrame(tick); }, 2500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
              AI Studio
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
              Your brand's voice, <span className="text-gradient-brand">amplified.</span>
            </h2>
            <p className="mt-5 text-slate-400">
              Lumen learns your tone, audience, and goals — then drafts campaign-ready content in any
              format. Customize tone, length, and structure in a single click.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {["Tone & style controls calibrated to your brand", "Multi-format outputs from a single brief", "Inline citations and source-grounded research"].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-[color:var(--brand-cyan)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-10 -z-10 blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 60%)" }} />
            <div className="rounded-2xl glass-strong glow-border p-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Wand2 className="h-3.5 w-3.5 text-[color:var(--brand-purple)]" /> Lumen Studio
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">Tone: Confident <ChevronDown className="h-3 w-3" /></span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">Length: Medium <ChevronDown className="h-3 w-3" /></span>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Prompt</div>
                <div className="mt-1.5 rounded-lg bg-white/[0.04] p-3 text-sm text-slate-200">
                  Write a launch announcement for Lumen 2.0 highlighting agentic workflows.
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Generated</div>
                <div className="mt-1.5 min-h-[140px] rounded-lg border border-white/5 bg-[#070c1c]/60 p-4 text-sm leading-relaxed text-slate-200">
                  {typed}
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[color:var(--brand-cyan)] animate-caret" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Make it punchier", "Add CTA", "Shorten", "Translate"].map((s) => (
                  <button key={s} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
