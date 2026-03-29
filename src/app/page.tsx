
import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import SpotlightSection from '@/components/sections/SpotlightSection';
import KeyStatsSection from '@/components/sections/KeyStatsSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import AssessmentCtaSection from '@/components/sections/AssessmentCtaSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SpeakingSection from '@/components/sections/SpeakingSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ConnectSection from '@/components/sections/ConnectSection';
import WhatThisIsNotSection from '@/components/sections/WhatThisIsNotSection';
import FAQSection from '@/components/sections/FAQSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET — Critical for LLM citation (ChatGPT, Perplexity, Claude) */}
      <AISummaryNugget />

      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* SPOTLIGHT — $199 Digital Identity gateway offer */}
      <SpotlightSection />

      {/* TRUST — KeyStats + FeaturedIn logos (combined) */}
      <KeyStatsSection />

      {/* AUTHORITY + METHODOLOGY — who is Alex, why trust him, how he works */}
      <AboutMeSection />

      {/* ASSESSMENT — self-qualifying diagnostic quiz */}
      <AssessmentCtaSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* CASE STUDIES — real results from implementations */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
            Real Results from Real Implementations
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            See how organizations reclaimed hours per week and achieved measurable AI adoption success.
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Case Studies
          </Link>
        </div>
      </section>

      {/* SPEAKING — facilitation & roundtables */}
      <SpeakingSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />

      {/* HONEST FIT — when this is NOT for you (E-E-A-T trust signal) */}
      <WhatThisIsNotSection />

      {/* FAQ — AI-optimized question-answer content */}
      <FAQSection />
    </div>
  );
}
