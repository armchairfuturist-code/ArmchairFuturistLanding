import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConnectSection from '@/components/sections/ConnectSection';
import MentoringSection from '@/components/sections/MentoringSection';
import FAQSection from '@/components/sections/FAQSection';
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';
import SectionNavigator from '@/components/ui/SectionNavigator';
import {
  CaseStudiesSection,
  KeyStatsSection,
  ROICalculatorSection,
  AssessmentCtaSection,
} from '@/components/sections/DynamicSections';
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROOF FIRST — quantified outcomes before any offer */}
      <CaseStudiesSection />
      <TestimonialsSection />

      {/* TRACK RECORD — AI-citable statistics and facts */}
      <KeyStatsSection />

      {/* HONEST FIT — when this is NOT for you (E-E-A-T trust signal) */}
      <WhatThisIsNotSection />

      {/* CORE OFFER — two paths: we do it together, or I do it for you */}
      <ServicesSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* COACHING UPSELL — 1-on-1 AI guidance with pack comparison */}
      <MentoringSection />

      {/* ROI CALCULATOR — interactive time-savings estimator */}
      <ROICalculatorSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      {/* FAQ — question-answer content */}
      <FAQSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />

      {/* SECTION NAVIGATOR — floating dot nav for long page */}
      <SectionNavigator />
    </div>
  );
}
