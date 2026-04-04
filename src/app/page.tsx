
import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConnectSection from '@/components/sections/ConnectSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
import SpeakingSection from '@/components/sections/SpeakingSection';
import FAQSection from '@/components/sections/FAQSection';
import AssessmentCtaSection from '@/components/sections/AssessmentCtaSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import EmailCaptureSection from '@/components/sections/EmailCaptureSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ROICalculatorSection from '@/components/sections/ROICalculatorSection';
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET — Critical for LLM citation (ChatGPT, Perplexity, Claude) */}
      <AISummaryNugget />

      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROBLEM + SOLUTION — the accountability gap and how I bridge it */}
      <ChallengeSection />

      {/* MENTORING — AI mindset coaching for the overwhelmed */}
      <AIMentoringSection />

      {/* KEY STATS — AI-citable statistics and facts */}
      <KeyStatsSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      <FeaturedInSection />
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* CASE STUDIES — quantified outcomes */}
      <CaseStudiesSection />

      {/* ROI CALCULATOR — interactive time-savings estimator */}
      <ROICalculatorSection />

      {/* EMAIL CAPTURE — lead magnet for non-ready visitors */}
      <EmailCaptureSection />

      {/* SPEAKING — keynotes, roundtables, workshops */}
      <SpeakingSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />

      {/* HONEST FIT — when this is NOT for you (E-E-A-T trust signal) */}
      <WhatThisIsNotSection />

      {/* CONTENT — articles + podcasts in one view */}
      <InsightsSection />

      {/* FAQ — question-answer content */}
      <FAQSection />
    </div>
  );
}
