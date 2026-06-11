import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/landing/AmbientBackground";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Features } from "@/components/landing/Features";
import { GeneratorPreview } from "@/components/landing/GeneratorPreview";
import { AnalyticsPreview } from "@/components/landing/AnalyticsPreview";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — AI-Powered Content Manager for Modern Teams" },
      {
        name: "description",
        content:
          "Generate high-performing content, automate workflows, collaborate with your team, and gain deep content insights from one intelligent AI platform.",
      },
      { property: "og:title", content: "Lumen — AI-Powered Content Manager" },
      { property: "og:description", content: "Create, manage and scale content with AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <GeneratorPreview />
        <AnalyticsPreview />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
