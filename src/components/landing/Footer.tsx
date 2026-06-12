import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

const cols = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Customers", "Brand", "Contact"] },
  { title: "Resources", links: ["Docs", "Blog", "Guides", "API", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "linear-gradient(135deg,#3B82F6,#8B5CF6)" }}>
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold text-white">PRISM</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              The intelligent content platform for modern teams.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{c.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} PRISM AI, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-white"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white"><Github className="h-4 w-4" /></a>
            <a href="#" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
