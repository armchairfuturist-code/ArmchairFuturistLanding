"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle2, Brain, Shield, Clock, ArrowRight } from 'lucide-react';
import { trackEvent, trackConversion } from '@/lib/analytics';
import { NumberTicker } from '@/components/ui/number-ticker';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { useExperiment } from '@/hooks/useExperiment';

type Stat = { value: string | null; numericValue?: number; suffix?: string; label: string };

// Contextual stats - integrated into copy rather than generic metrics
const stats: Stat[] = [
  { value: '40+', numericValue: 40, suffix: '', label: 'AI systems deployed' },
  { value: null, label: '10–20 hours/week reclaimed per client' },
  { value: '4.9/5', label: 'client satisfaction' },
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

// A/B Test: Headline Variants
const headlineVariants = {
  control: {
    line1: 'Intelligence is cheap.',
    line2: 'Trust is the new scarcity.',
  },
  variant_a: {
    line1: 'AI can do the work.',
    line2: 'You provide the trust.',
  },
  variant_b: {
    line1: "Stop wasting 20 hours a week",
    line2: 'on AI chaos',
  },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // A/B Testing
  const { variant: headlineVariant } = useExperiment('HERO_HEADLINE');
  const { variant: ctaVariant, trackConversion: trackCtaConversion } = useExperiment('HERO_CTA_COPY');
  const { variant: secondaryCtaVariant } = useExperiment('HERO_SECONDARY_CTA');

  // Solid, confident CTA buttons - no neon glows
  const ctaStyle = 'bg-white text-primary hover:bg-white/95 active:scale-[0.98] h-12 px-6 text-base font-semibold';

  const headline = headlineVariants[headlineVariant as keyof typeof headlineVariants] || headlineVariants.control;
  const ctaText = ctaVariants[ctaVariant as keyof typeof ctaVariants] || ctaVariants.control;
  const secondaryCtaText = secondaryCtaVariants[secondaryCtaVariant as keyof typeof secondaryCtaVariants] || secondaryCtaVariants.control;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setIsVideoReady(true);
    videoElement.addEventListener('canplay', handleCanPlay);

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
      {/* Semantic H1 for SEO */}
      <h1 className="sr-only">
        Alex Myers — Certified Futurist & AI Strategy Advisor | Helping Leaders Bridge the Accountability Gap
      </h1>

      {/* Video background */}
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

      <div className="container relative z-10 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col space-y-8 text-center">

          <BlurFade delay={0.2} inView>
            <h1 className="tracking-tighter sm:text-5xl xl:text-7xl/none hero-text-shadow">
              <span className="block text-hero-title-1 text-5xl md:text-6xl xl:text-7xl font-heading font-black">
                {headline.line1}
              </span>
              <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading font-bold opacity-90">
                {headline.line2}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="text-primary-foreground/95 text-lg md:text-xl max-w-2xl mx-auto hero-text-shadow font-sans leading-relaxed">
              I help you stop chasing AI tools and start building systems that actually work.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            {/* Primary CTA - solid, confident, no glow */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={CALENDAR_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => { trackConversion('hero_book_call'); trackCtaConversion({ cta_variant: ctaVariant }); }}
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-base px-6 py-3 hover:bg-white/95 active:scale-[0.98] transition-transform"
              >
                <Zap className="w-4 h-4" />
                {ctaText.primary}
              </a>
              <a 
                href="/assessment" 
                onClick={() => trackEvent('hero_assessment_cta')}
                className="inline-flex items-center gap-2 text-primary-foreground font-medium text-base px-4 py-3 hover:underline"
              >
                {secondaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust signals - simple text, no icons as decoration */}
            <div className="mt-4 text-xs text-primary-foreground/50 font-mono">
              No commitment required · 15-minute call
            </div>
          </BlurFade>

          {/* Asymmetric layout: stats integrated into the narrative */}
          <BlurFade delay={0.55} inView>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-primary-foreground/70">
              <span><strong className="text-primary-foreground/90">40+</strong> AI systems deployed</span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span><strong className="text-primary-foreground/90">10–20 hrs/week</strong> reclaimed</span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span><strong className="text-primary-foreground/90">$199</strong> to start</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.7} inView>
            <p className="text-primary-foreground/50 text-sm font-mono uppercase tracking-widest">
              No Fluff · Real Results · You Keep It
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
