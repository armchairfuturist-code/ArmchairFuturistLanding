import dynamic from 'next/dynamic';
import SectionSkeleton from '@/components/ui/SectionSkeleton';

export interface SectionEntry {
  id: string;
  label: string;
  component: React.ComponentType;
  /** Load eagerly (above the fold). Default false. */
  eager?: boolean;
  /** Show in the floating section navigator. Default true. */
  navigable?: boolean;
  /** Render on the homepage. Default true. */
  homepage?: boolean;
}

/** Central mapping of section id constants. Add new sections here. */
export const SECTION_IDS = {
  hero: 'hero',
  stats: 'stats',
  whatIsNot: 'what-this-is-not',
  services: 'services',
  about: 'about-me',
  caseStudies: 'case-studies',
  testimonials: 'testimonials',
  mentoring: 'ai-guidance',
  roi: 'roi-calculator',
  speaking: 'speaking',
  assessment: 'assessment',
  insights: 'latest-insights',
  substack: 'newsletter',
  faq: 'faq',
  connect: 'connect',
} as const;

const sections: SectionEntry[] = [
  // Eager — above the fold
  {
    id: SECTION_IDS.hero,
    label: 'Hero',
    component: dynamic(() => import('@/components/sections/HeroSection'), { ssr: true }),
    eager: true,
    navigable: false,
  },
  // Lazy — loaded on scroll interaction
  {
    id: SECTION_IDS.caseStudies,
    label: 'Cases',
    component: dynamic(() => import('@/components/sections/CaseStudiesSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[640px]" label="Loading case studies" />,
    }),
  },
  {
    id: SECTION_IDS.testimonials,
    label: 'Reviews',
    component: dynamic(() => import('@/components/sections/TestimonialsSection')),
  },
  {
    id: SECTION_IDS.stats,
    label: 'Stats',
    component: dynamic(() => import('@/components/sections/KeyStatsSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[360px]" label="Loading key stats" />,
    }),
  },
  {
    id: SECTION_IDS.whatIsNot,
    label: 'Fit',
    component: dynamic(() => import('@/components/sections/WhatThisIsNotSection')),
  },
  {
    id: SECTION_IDS.services,
    label: 'Services',
    component: dynamic(() => import('@/components/sections/ServicesSection')),
  },
  {
    id: SECTION_IDS.about,
    label: 'About',
    component: dynamic(() => import('@/components/sections/AboutMeSection')),
  },
  {
    id: SECTION_IDS.speaking,
    label: 'Speaking',
    component: dynamic(() => import('@/components/sections/SpeakingSection')),
  },
  {
    id: SECTION_IDS.mentoring,
    label: 'Guidance',
    component: dynamic(() => import('@/components/sections/MentoringSection')),
  },
  {
    id: SECTION_IDS.roi,
    label: 'ROI',
    component: dynamic(() => import('@/components/sections/ROICalculatorSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[720px]" label="Loading ROI calculator" />,
    }),
  },
  {
    id: SECTION_IDS.assessment,
    label: 'Quiz',
    component: dynamic(() => import('@/components/sections/AssessmentCtaSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[280px]" label="Loading assessment" />,
    }),
  },
  {
    id: SECTION_IDS.insights,
    label: 'Content',
    component: dynamic(() => import('@/components/sections/InsightsSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[800px]" label="Loading insights" />,
    }),
    homepage: false,
    navigable: false,
  },
  {
    id: SECTION_IDS.substack,
    label: 'Newsletter',
    component: dynamic(() => import('@/components/sections/SubstackSection'), {
      loading: () => <SectionSkeleton minHeight="min-h-[600px]" label="Loading newsletter" />,
    }),
    homepage: true,
  },
  {
    id: SECTION_IDS.faq,
    label: 'FAQ',
    component: dynamic(() => import('@/components/sections/FAQSection')),
  },
  {
    id: SECTION_IDS.connect,
    label: 'Contact',
    component: dynamic(() => import('@/components/sections/ConnectSection')),
  },
];

export function getSections(): readonly SectionEntry[] {
  return sections;
}

/** Returns only sections that should render on the homepage. */
export function getHomepageSections(): readonly SectionEntry[] {
  return sections.filter((s) => s.homepage !== false);
}

/** Returns section id/label pairs for use in the floating navigator. */
export function getNavigatorItems(): Array<{ id: string; label: string }> {
  return sections.filter((s) => s.navigable !== false).map((s) => ({ id: s.id, label: s.label }));
}
