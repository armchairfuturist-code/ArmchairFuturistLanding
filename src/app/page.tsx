
import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import LeadCaptureInline from '@/components/lead-capture/LeadCaptureInline';
import MentoringSection from '@/components/sections/MentoringSection';
import PackageComparisonSection from '@/components/sections/PackageComparisonSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET — Critical for LLM citation (ChatGPT, Perplexity, Claude) */}
      <AISummaryNugget />

      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* LEAD CAPTURE — email signup right after the pitch */}
      <section className="py-10 md:py-12 bg-usvc-navy">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <p className="text-sm text-usvc-blue font-mono uppercase tracking-widest mb-2">Free</p>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
            Get Your AI Readiness Score
          </h2>
          <p className="text-sm text-white/70 mb-5 max-w-lg mx-auto">
            3-minute assessment. You'll get your personalized profile, clarity score, and a recommended next step — no pitch, no pressure.
          </p>
          <LeadCaptureInline />
        </div>
      </section>

      {/* MENTORING — AI mindset coaching for the overwhelmed */}
      <MentoringSection />

      {/* PACKAGE COMPARISON — detailed feature breakdown by tier */}
      <PackageComparisonSection />

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
