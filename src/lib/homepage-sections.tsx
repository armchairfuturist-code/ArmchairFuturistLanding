import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

/** Stable homepage seam: order, loading, and navigation facts live here. */
export interface HomepageSection {
  id: string;
  label: string;
  component?: React.ComponentType;
  /** Show in the floating section navigator. Default true. */
  navigable?: boolean;
  /** Render on the homepage. Default true. */
  homepage?: boolean;
}

export const SECTION_IDS = {
  hero: "hero",
  whatIsNot: "what-this-is-not",
  services: "services",
  about: "about-me",
  caseStudies: "case-studies",
  community: "community",
  mentoring: "ai-guidance",
  roi: "roi-calculator",
  speaking: "speaking",
  assessment: "assessment",
  substack: "newsletter",
  faq: "faq",
  connect: "connect",
} as const;

const sections: readonly HomepageSection[] = [
  {
    id: SECTION_IDS.hero,
    label: "Hero",
    navigable: false,
  },
  {
    id: SECTION_IDS.whatIsNot,
    label: "Fit",
    component: dynamic(() => import("@/components/sections/WhatThisIsNotSection")),
  },
  {
    id: SECTION_IDS.assessment,
    label: "Assessment",
    component: dynamic(
      () => import("@/components/sections/AssessmentCtaSection"),
      {
        loading: () => (
          <SectionSkeleton minHeight="min-h-[280px]" label="Loading assessment" />
        ),
      },
    ),
  },
  {
    id: SECTION_IDS.caseStudies,
    label: "Results",
    component: dynamic(() => import("@/components/sections/ProofSection"), {
      loading: () => (
        <SectionSkeleton minHeight="min-h-[640px]" label="Loading client results" />
      ),
    }),
  },
  { id: SECTION_IDS.community, label: "Community", component: dynamic(() => import("@/components/sections/CommunityAnchor")) },
  {
    id: SECTION_IDS.roi,
    label: "ROI",
    navigable: false,
    component: dynamic(() => import("@/components/sections/ROICalculatorSection")),
  },
  {
    id: SECTION_IDS.services,
    label: "Services",
    component: dynamic(() => import("@/components/sections/ServicesSection")),
  },
  {
    id: SECTION_IDS.about,
    label: "About",
    component: dynamic(() => import("@/components/sections/AboutMeSection")),
  },
  {
    id: SECTION_IDS.mentoring,
    label: "Guidance",
    component: dynamic(() => import("@/components/sections/MentoringSection")),
  },
  {
    id: SECTION_IDS.speaking,
    label: "Speaking",
    component: dynamic(() => import("@/components/sections/SpeakingSection"), {
      loading: () => (
        <SectionSkeleton minHeight="min-h-[420px]" label="Loading speaking" />
      ),
    }),
  },
  {
    id: SECTION_IDS.substack,
    label: "Newsletter",
    component: dynamic(() => import("@/components/sections/SubstackSection"), {
      loading: () => (
        <SectionSkeleton minHeight="min-h-[600px]" label="Loading newsletter" />
      ),
    }),
    homepage: false,
  },
  {
    id: SECTION_IDS.faq,
    label: "FAQ",
    component: dynamic(() => import("@/components/sections/FAQSection")),
  },
  {
    id: SECTION_IDS.connect,
    label: "Contact",
    component: dynamic(() => import("@/components/sections/ConnectSection")),
  },
];

export function getSections(): readonly HomepageSection[] {
  return sections;
}

export function getHomepageSections(): readonly HomepageSection[] {
  return sections.filter((section) => section.homepage !== false);
}

export function getNavigatorItems(): Array<{ id: string; label: string }> {
  return sections
    .filter((section) => section.homepage !== false && section.navigable !== false)
    .map(({ id, label }) => ({ id, label }));
}
