
import HeroSection from '@/components/sections/HeroSection';
import AccountabilityGapSection from '@/components/sections/AccountabilityGapSection';
import NavigatorSection from '@/components/sections/NavigatorSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import SubstackSection from '@/components/sections/SubstackSection';
import ThoughtLeadershipSection from '@/components/sections/ThoughtLeadershipSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ConnectSection from '@/components/sections/ConnectSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AccountabilityGapSection />
      <NavigatorSection />
      <FeaturedInSection />
      <ChallengeSection />
      <WhyWorkWithMeSection />
      <AboutMeSection />
      <SubstackSection />
      <ThoughtLeadershipSection />
      <TestimonialsSection />
      <ServicesSection />
      <ConnectSection />
    </div>
  );
}
