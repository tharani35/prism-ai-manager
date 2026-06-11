import { motion } from "motion/react";

const logos = ["Microsoft", "Notion", "Shopify", "Stripe", "Vercel", "HubSpot"];

export function TrustedBy() {
  return (
    <section id="customers" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500">
          Trusted by innovative teams worldwide
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid h-10 place-items-center text-sm font-medium tracking-tight text-slate-500 transition-colors hover:text-white"
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
