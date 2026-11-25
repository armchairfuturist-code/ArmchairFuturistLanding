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
  testimonialMarquee: "testimonial-marquee",
  lastMile: "last-mile",
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
    id: SECTION_IDS.testimonialMarquee,
    label: "Testimonials",
    navigable: false,
    homepage: true,
    component: dynamic(
      () => import("@/components/sections/TestimonialMarquee"),
    ) as React.ComponentType,
  },
  {
    id: SECTION_IDS.services,
    label: "Services",
    // Conversion funnel (consolidated): offers with prices, then the lane
    // selector (build-it vs coached), then the coaching offer, then proof.
    component: dynamic(() => import("@/components/sections/ServicesSection")),
  },
  {
    id: SECTION_IDS.mentoring,
    label: "Guidance",
    component: dynamic(() => import("@/components/sections/MentoringSection")),
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
  {
    id: SECTION_IDS.lastMile,
    label: "Why",
    component: dynamic(() => import("@/components/sections/LastMileSection")),
  },
  {
    id: SECTION_IDS.faq,
    label: "FAQ",
    component: dynamic(() => import("@/components/sections/FAQSection")),
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
    id: SECTION_IDS.substack,
    label: "Newsletter",
    // Permanent section, see DESIGN.md "Permanent Sections (No Removal)".
    component: dynamic(() => import("@/components/sections/SubstackSection"), {
      loading: () => (
        <SectionSkeleton minHeight="min-h-[600px]" label="Loading newsletter" />
      ),
    }) as React.ComponentType,
  },
  {
    id: SECTION_IDS.connect,
    label: "Contact",
    component: dynamic(() => import("@/components/sections/ConnectSection")),
  },
];

// Sections consolidated off the homepage into their dedicated routes (all
// footer-linked): ROI calculator, community, about, speaking. The constants
// stay exported because pages and links may still reference the ids.

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
