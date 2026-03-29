
import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ConnectSection from '@/components/sections/ConnectSection';
import SpotlightSection from '@/components/sections/SpotlightSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
import SpeakingSection from '@/components/sections/SpeakingSection';
import FAQSection from '@/components/sections/FAQSection';
import AssessmentCtaSection from '@/components/sections/AssessmentCtaSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import OriginalResearchSection from '@/components/sections/OriginalResearchSection';
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

      {/* SPOTLIGHT — $199 Digital Identity gateway offer */}
      <SpotlightSection />

      {/* MENTORING — AI mindset coaching for the overwhelmed */}
      <AIMentoringSection />

      {/* KEY STATS — AI-citable statistics and facts */}
      <KeyStatsSection />

      {/* ORIGINAL RESEARCH — E-E-A-T Experience signal, data from 40+ implementations */}
      <OriginalResearchSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      <FeaturedInSection />
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

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

      {/* FAQ — AI-optimized question-answer content */}
      <FAQSection />
    </div>
  );
}
