import { motion } from "motion/react";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ background: "#020617" }}>
      {/* base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 30%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(ellipse 70% 60% at 10% 80%, rgba(6,182,212,0.18), transparent 60%)",
        }}
      />
      {/* floating gradient blobs */}
      <motion.div
        className="absolute -top-32 left-1/4 h-[42rem] w-[42rem] rounded-full blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 60%)" }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 60%)", animationDelay: "-6s" }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[36rem] w-[36rem] rounded-full blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.35), transparent 60%)", animationDelay: "-12s" }}
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* aurora streaks */}
      <div
        className="absolute inset-x-0 top-1/2 h-[40rem] blur-3xl opacity-50 animate-breathe"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(99,102,241,0.25) 80deg, rgba(56,189,248,0.2) 160deg, transparent 240deg)",
        }}
      />
      {/* fine noise vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(2,6,23,0.7) 100%)",
        }}
      />
    </div>
  );
}
