import AISummaryNugget from '@/components/seo/AISummaryNugget';
import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConnectSection from '@/components/sections/ConnectSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* AI SUMMARY NUGGET — Critical for LLM citation (ChatGPT, Perplexity, Claude) */}
      <AISummaryNugget />

      {/* HOOK — make the visitor feel the stakes + primary CTA above fold */}
      <HeroSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* CLOSE — main contact CTA */}
      <ConnectSection />
    </div>
  );
}