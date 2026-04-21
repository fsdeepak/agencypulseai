import type { Metadata } from "next";
import Hero from "../components/homepage/hero";
import Installation from "@/components/homepage/installation";
import Features from "@/components/homepage/features";
import Metrics from "@/components/homepage/metrics";
import CTA from "@/components/homepage/cta";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "AgencyPulse AI — Real-Time App Performance Monitoring",
  description:
    "Install our lightweight SDK in minutes. Get deep performance insights, error tracking, and user analytics — all in one beautiful dashboard. Trusted by 2,000+ developers.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] font-sans antialiased">
      <Hero />

      <Installation />

      <Features />

      <Metrics />

      <CTA />

      <Footer />
    </div>
  );
}
