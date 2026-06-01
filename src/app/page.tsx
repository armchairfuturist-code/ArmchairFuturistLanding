import HeroSection from '@/components/sections/HeroSection';
import MentoringSection from '@/components/sections/MentoringSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConnectSection from '@/components/sections/ConnectSection';
import SpeakingSection from '@/components/sections/SpeakingSection';
import FAQSection from '@/components/sections/FAQSection';
import AssessmentCtaSection from '@/components/sections/AssessmentCtaSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ROICalculatorSection from '@/components/sections/ROICalculatorSection';
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';
import SectionNavigator from '@/components/ui/SectionNavigator';
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROOF FIRST — quantified outcomes before any offer */}
      <CaseStudiesSection />
      <TestimonialsSection />

      {/* TRACK RECORD — AI-citable statistics and facts (incl. logo badges) */}
      <KeyStatsSection />

      {/* HONEST FIT — when this is NOT for you (E-E-A-T trust signal) */}
      <WhatThisIsNotSection />

      {/* CORE OFFER — two paths: we do it together, or I do it for you */}
      <ServicesSection />

      {/* AUTHORITY — who is Alex, why trust him (incl. How I Work) */}
      <AboutMeSection />

      {/* COACHING UPSELL — 1-on-1 AI mentoring with pack comparison */}
      <MentoringSection />

      {/* ROI CALCULATOR — interactive time-savings estimator */}
      <ROICalculatorSection />

      {/* SPEAKING — keynotes, roundtables, workshops */}
      <SpeakingSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz (single CTA on the page) */}
      <AssessmentCtaSection />

      {/* CONTENT — articles + podcasts in one view */}
      <InsightsSection />

      {/* FAQ — question-answer content */}
      <FAQSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />

      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
