import type { Metadata } from "next";
import Link from "next/link";
import ROICalculatorSection from "@/components/sections/ROICalculatorSection";

const siteUrl = "https://thearmchairfuturist.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ROI Calculator — Hours You Could Reclaim with AI",
  description:
    "Estimate weekly hours your team could reclaim with AI automation. Pick common tasks, see monthly and annual time savings, then book a clarity call.",
  alternates: { canonical: "/roi" },
  openGraph: {
    title: "ROI Calculator — Hours You Could Reclaim with AI",
    description:
      "Pick the tasks your team does every week. See what automation could give back.",
    url: "/roi",
    siteName: "The Armchair Futurist",
    type: "website",
  },
};

export default function RoiPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl pt-10 md:pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="text-graphite mx-2">/</span>
          ROI Calculator
        </p>
      </div>
      <ROICalculatorSection />
      <div className="container mx-auto px-4 md:px-6 max-w-5xl pb-16 text-center">
        <p className="text-sm text-charcoal">
          Ready to turn the estimate into a plan?{" "}
          <Link
            href="/#ai-guidance"
            className="text-hp-electric font-semibold hover:underline"
          >
            See coaching options
          </Link>{" "}
          or{" "}
          <Link
            href="/assessment"
            className="text-hp-electric font-semibold hover:underline"
          >
            take the free assessment
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
