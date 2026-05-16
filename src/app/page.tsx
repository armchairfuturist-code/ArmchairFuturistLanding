import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
// import removed: LeadCaptureInline (consolidated into AssessmentCtaSection)
import MentoringSection from '@/components/sections/MentoringSection';
import PackageComparisonSection from '@/components/sections/PackageComparisonSection';
// import removed: KeyStatsSection (consolidated into AboutMeSection)
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
import SectionNavigator from '@/components/ui/SectionNavigator';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET — Critical for LLM citation (ChatGPT, Perplexity, Claude) */}
      <AISummaryNugget />

      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* SOCIAL PROOF — fast trust signal, lightweight at-a-glance logos */}
      <FeaturedInSection />


      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* HONEST FIT — when this is NOT for you (E-E-A-T trust signal) */}
      <WhatThisIsNotSection />

      {/* MENTORING — 1-on-1 AI coaching for the overwhelmed */}
      <MentoringSection />

      {/* PACKAGE COMPARISON — detailed feature breakdown by tier */}
      <PackageComparisonSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* WHY ME — differentiators */}
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* CASE STUDIES — quantified outcomes */}
      <CaseStudiesSection />

      {/* ROI CALCULATOR — interactive time-savings estimator */}
      <ROICalculatorSection />

      {/* SPEAKING — keynotes, roundtables, workshops */}
      <SpeakingSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      {/* LEAD CAPTURE — email signup after the visitor has seen the full offer */}
      <section className="py-10 md:py-12 bg-usvc-navy">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <p className="text-sm text-usvc-blue font-mono uppercase tracking-widest mb-2">Free</p>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
            Get Your AI Readiness Score
          </h2>
          <p className="text-sm text-white/70 mb-5 max-w-lg mx-auto">
            3-minute assessment. You'll get your personalized profile, clarity score, and a recommended next step — no pitch, no pressure.
          </p>

        </div>
      </section>

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
