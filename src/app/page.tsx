import HeroSection from '@/components/sections/HeroSection';
import FeaturedInSection from '@/components/sections/FeaturedInSection';
import ChallengeSection from '@/components/sections/ChallengeSection';
import WhyWorkWithMeSection from '@/components/sections/WhyWorkWithMeSection';
import AdvisoryServicesSection from '@/components/sections/AdvisoryServicesSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ThoughtLeadershipSection from '@/components/sections/ThoughtLeadershipSection';
import ConnectSection from '@/components/sections/ConnectSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedInSection />
      <ChallengeSection />
      <WhyWorkWithMeSection />
      <AdvisoryServicesSection />
      <AboutMeSection />
      <CertificationsSection />
      <ThoughtLeadershipSection />
      <ConnectSection />
    </div>
  );
}
