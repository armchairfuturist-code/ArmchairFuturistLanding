"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Terminal, CheckCircle2, Brain, Shield, Clock, Star } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';
import { NumberTicker } from '@/components/ui/number-ticker';
import { BlurFade } from '@/components/ui/blur-fade';
import { Particles } from '@/components/ui/particles';
import { TextScramble } from '@/components/ui/text-scramble';
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { useExperiment } from '@/hooks/useExperiment';

type Stat = { value: string | null; numericValue?: number; suffix?: string; icon?: React.ElementType; label: string };

const stats: Stat[] = [
  { value: '40+', numericValue: 40, suffix: '+', label: 'AI Systems Deployed' },
  { value: '10–20h', label: 'Reclaimed Per Client / Week' },
  { value: null, icon: CheckCircle2, label: '5+ Hours/Week Guaranteed' },
];

// A/B Test: CTA Copy Variants
const ctaVariants = {
  control: { primary: 'Book a Free Strategy Call', secondary: 'Take the Free Assessment' },
  variant_a: { primary: 'Book Your Free Call', secondary: 'Get Your Free Score' },
  variant_b: { primary: 'Schedule Free Consultation', secondary: 'Start Your Free Quiz' },
};

const secondaryCtaVariants = {
  control: 'Take the Free Assessment',
  variant_a: 'Get Your Free Score',
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // A/B Testing
  const { variant: ctaVariant, trackConversion: trackCtaConversion } = useExperiment('HERO_CTA_COPY');
  const { variant: secondaryCtaVariant } = useExperiment('HERO_SECONDARY_CTA');

  const ctaText = ctaVariants[ctaVariant as keyof typeof ctaVariants] || ctaVariants.control;
  const secondaryCtaText = secondaryCtaVariants[secondaryCtaVariant as keyof typeof secondaryCtaVariants] || secondaryCtaVariants.control;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setIsVideoReady(true);
    videoElement.addEventListener('canplay', handleCanPlay);

    // If video is already buffered (e.g. cached), fire immediately
    if (videoElement.readyState >= 3) {
      setIsVideoReady(true);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      videoElement.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });

      const handleVideoEnd = () => {
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch(error => {
            console.error("Video loop play was prevented:", error);
          });
        }
      };
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/header.webp"
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        src="/header.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>
      <Particles className="z-[2]" quantity={40} color="rgba(255, 255, 255, 0.3)" size={1.5} speed={0.2} />

      <div className="container relative z-10 px-4 md:px-6 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-mono mb-4 backdrop-blur-sm">
              <Terminal className="w-3 h-3" />
              <span>Trust Quotient: High</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h1 className="tracking-tighter sm:text-5xl xl:text-7xl/none hero-text-shadow">
              <span className="block text-hero-title-1 text-5xl md:text-6xl xl:text-7xl font-heading font-black">
                Intelligence is cheap.
              </span>
              <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading font-bold opacity-90">
                <TextScramble text="Trust is the new scarcity." speed={25} scrambleDuration={1400} />
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="mt-8 text-primary-foreground/95 text-lg md:text-2xl max-w-4xl mx-auto hero-text-shadow font-sans leading-relaxed">
              I architect outcomes where AI can&apos;t, turning technical chaos into high-signal execution with Vision, Verification, and Resiliency.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] transition-all duration-200 h-14 px-8 text-lg font-bold">
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" onClick={() => { trackConversion('hero_book_call'); trackCtaConversion({ cta_variant: ctaVariant }); }}>
                  <Zap className="mr-2 h-5 w-5 fill-current" />
                  {ctaText.primary}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-black/40 text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-200 h-14 px-8 text-lg font-bold backdrop-blur-md"
              >
                <a href="/assessment" onClick={() => trackEvent('hero_assessment_cta')}>
                  <Brain className="mr-2 h-5 w-5" />
                  {secondaryCtaText}
                </a>
              </Button>
            </div>

            {/* Trust badges - social proof below CTAs */}
            <motion.div 
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-primary-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span>No commitment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>15-min call</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-400" />
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </BlurFade>

          <BlurFade delay={0.55} inView>
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a
                href="#services"
                onClick={() => trackEvent('hero_see_services')}
                className="inline-flex items-center gap-2 text-sm text-blue-200/80 hover:text-white transition-colors font-mono tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm"
              >
                See How I Work
              </a>
              <a
                href="#services"
                onClick={() => trackEvent('hero_199_spotlight_click')}
                className="inline-flex items-center gap-2 text-sm text-blue-200/80 hover:text-white transition-colors font-mono tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                From $199: Identity • From $599: AI Tools Assessment
              </a>
            </div>
          </BlurFade>

          {/* Social Proof Stats Bar */}
          <motion.div
            className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/10 w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                {stat.icon ? (
                  <stat.icon className="h-7 w-7 text-white hero-text-shadow" strokeWidth={2.5} />
                ) : stat.numericValue ? (
                  <span className="text-2xl font-black text-white hero-text-shadow">
                    <NumberTicker value={stat.numericValue} className="text-2xl font-black text-white" />{stat.suffix}
                  </span>
                ) : (
                  <span className="text-2xl font-black text-white hero-text-shadow">{stat.value}</span>
                )}
                <span className="text-[11px] text-primary-foreground/70 font-mono uppercase tracking-widest leading-tight text-center">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <BlurFade delay={0.7} inView>
            <p className="text-primary-foreground/60 text-sm font-mono mt-4 uppercase tracking-widest">
              High Signal &middot; Zero Noise &middot; Full Ownership
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
