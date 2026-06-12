import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Resources", href: "#resources" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-[#020617]/60 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white">PRISM</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-slate-300/80 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth/login" className="text-sm text-slate-300 hover:text-white">
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] transition-transform hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}
          >
            Start free trial
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#020617]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-sm text-slate-300" onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <Link to="/auth/login" className="text-sm text-slate-300 text-center py-1" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link to="/auth/signup" className="rounded-full px-4 py-2 text-sm font-medium text-white text-center"
            style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }} onClick={() => setOpen(false)}>
            Start free trial
          </Link>
        </div>
      )}
    </motion.header>
  );
}
