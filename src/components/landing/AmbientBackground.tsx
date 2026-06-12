import { motion } from "motion/react";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      
      {/* Main Aura Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 0, 128, 0.35), transparent 35%),
            radial-gradient(circle at 80% 25%, rgba(236, 72, 153, 0.25), transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.18), transparent 45%),
            #000000
          `,
        }}
      />

      {/* Large Pink Blob */}
      <motion.div
        className="absolute -top-40 left-1/4 h-[45rem] w-[45rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,0,128,0.45), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right Aura */}
      <motion.div
        className="absolute top-0 -right-32 h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)",
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Glow */}
      <motion.div
        className="absolute -bottom-20 left-0 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,20,147,0.25), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora Sweep */}
      <div
        className="absolute inset-x-0 top-1/4 h-[50rem] blur-[150px] opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,0,128,0.3) 90deg, rgba(236,72,153,0.25) 180deg, transparent 270deg)",
        }}
      />

      {/* Premium Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}