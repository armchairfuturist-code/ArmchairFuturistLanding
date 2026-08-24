import type { Metadata } from "next";
import SpeakingSection from "@/components/sections/SpeakingSection";
import CommunityAnchor from "@/components/sections/CommunityAnchor";

const siteUrl = "https://thearmchairfuturist.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Speaking & Community — Alex Myers",
  description:
    "Alex Myers leads executive AI roundtables, workshops, and strategy sessions — and hosts Braga AI Builders, a monthly in-person AI meetup in Braga, Portugal.",
  alternates: { canonical: "/speaking" },
  openGraph: {
    title: "Speaking & Community | The Armchair Futurist",
    description:
      "Executive AI roundtables and workshops — plus Braga AI Builders, the monthly in-person AI meetup Alex hosts in Braga.",
    url: "/speaking",
    siteName: "The Armchair Futurist",
    type: "website",
  },
};

/** /speaking — stage work (moved off the homepage) + community anchor. */
export default function SpeakingPage() {
  return (
    <main id="main-content" className="flex flex-col">
      <SpeakingSection />
      <CommunityAnchor />
    </main>
  );
}
