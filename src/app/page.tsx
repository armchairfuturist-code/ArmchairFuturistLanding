
import HeroSection from '@/components/sections/HeroSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import EmailCaptureSection from '@/components/sections/EmailCaptureSection';
import InsightsSection from '@/components/sections/InsightsSection';
import ConnectSection from '@/components/sections/ConnectSection';
import SpotlightSection from '@/components/sections/SpotlightSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
import SpeakingSection from '@/components/sections/SpeakingSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROBLEM + SOLUTION — the accountability gap and how I bridge it */}
      <ChallengeSection />

      {/* SPOTLIGHT — $199 Digital Identity gateway offer */}
      <SpotlightSection />

      {/* MENTORING — AI mindset coaching for the overwhelmed */}
      <AIMentoringSection />

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />
      <FeaturedInSection />
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

      {/* SPEAKING — keynotes, roundtables, workshops */}
      <SpeakingSection />

      {/* OFFER — the specific services available */}
      <ServicesSection />

      {/* NURTURE — capture visitors not yet ready to buy */}
      <EmailCaptureSection />

      {/* CONTENT — articles + podcasts in one view */}
      <InsightsSection />

      {/* CLOSE — final CTA */}
      <ConnectSection />
    </div>
  );
}
