
import HeroSection from '@/components/sections/HeroSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
// import AdvisoryServicesSection from '@/components/sections/AdvisoryServicesSection'; // Removed
import AboutMeSection from '@/components/sections/AboutMeSection';
import ThoughtLeadershipSection from '@/components/sections/ThoughtLeadershipSection';
import ConnectSection from '@/components/sections/ConnectSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedInSection />
      <ChallengeSection />
      <WhyWorkWithMeSection /> {/* This section now incorporates "How We Help" and "Why This Matters" */}
      {/* <AdvisoryServicesSection /> */} {/* Removed */}
      <AboutMeSection />
      <ThoughtLeadershipSection />
      <ConnectSection />
    </div>
  );
}
