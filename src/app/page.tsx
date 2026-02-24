
import HeroSection from '@/components/sections/HeroSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import AccountabilityGapSection from '@/components/sections/AccountabilityGapSection';
import NavigatorSection from '@/components/sections/NavigatorSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import EmailCaptureSection from '@/components/sections/EmailCaptureSection';
import SubstackSection from '@/components/sections/SubstackSection';
import ThoughtLeadershipSection from '@/components/sections/ThoughtLeadershipSection';
import ConnectSection from '@/components/sections/ConnectSection';
import SpotlightSection from '@/components/sections/SpotlightSection';
import AIMentoringSection from '@/components/sections/AIMentoringSection';
import SpeakingSection from '@/components/sections/SpeakingSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HOOK — make the visitor feel the stakes */}
      <HeroSection />

      {/* PROBLEM — agitate the pain they already feel */}
      <ChallengeSection />

      {/* SOLUTION — introduce the concept & methodology */}
      <AccountabilityGapSection />
      <NavigatorSection />

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

      {/* CONTENT — keep curious visitors engaged & coming back */}
      <SubstackSection />
      <ThoughtLeadershipSection />

      {/* CLOSE — final CTA */}
      <ConnectSection />
    </div>
  );
}
