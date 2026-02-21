
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

      {/* AUTHORITY — who is Alex, why trust him */}
      <AboutMeSection />
      <FeaturedInSection />
      <WhyWorkWithMeSection />

      {/* PROOF — validate the offer with social proof */}
      <TestimonialsSection />

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
