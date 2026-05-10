"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Zap,
  CheckCircle2,
  Brain,
  Shield,
  Clock,
  ArrowRight,
  Euro,
  Mail,
  Loader2,
  Check,
} from "lucide-react";
import { trackEvent, trackConversion } from "@/lib/analytics";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { CALENDAR_URL, GOOGLE_FORM_URL } from "@/lib/constants";
import { useExperiment } from "@/hooks/useExperiment";

type Stat = {
  value: string | null;
  numericValue?: number;
  suffix?: string;
  label: string;
};

// Contextual stats - integrated into copy rather than generic metrics
const stats: Stat[] = [
  { value: "40+", numericValue: 40, suffix: "", label: "AI systems deployed" },
  { value: null, label: "10–20 hours/week reclaimed per client" },
  { value: "4.9/5", label: "client satisfaction" },
];

// A/B Test: CTA Copy Variants
const ctaVariants = {
  control: { primary: "Book a Call", secondary: "Take the Free Assessment" },
  variant_a: { primary: "Let's Talk", secondary: "Get Your Free Score" },
  variant_b: { primary: "Book a Call", secondary: "Start Your Free Quiz" },
};

const secondaryCtaVariants = {
  control: "Take the Free Assessment",
  variant_a: "Get Your Free Score",
};

// A/B Test: Headline Variants
const headlineVariants = {
  control: {
    line1: "Intelligence is cheap.",
    line2: "Trust is the new scarcity.",
  },
  variant_a: {
    line1: "AI can do the work.",
    line2: "You provide the trust.",
  },
  variant_b: {
    line1: "Stop wasting 20 hours a week",
    line2: "on AI chaos",
  },
  variant_c: {
    line1: "The edge of change is lonely.",
    line2: "You need a guide, not another tool.",
  },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // A/B Testing
  const { variant: headlineVariant } = useExperiment("HERO_HEADLINE");
  const { variant: ctaVariant, trackConversion: trackCtaConversion } =
    useExperiment("HERO_CTA_COPY");
  const { variant: secondaryCtaVariant } = useExperiment("HERO_SECONDARY_CTA");

  // Solid, confident CTA buttons - no neon glows
  const ctaStyle =
    "bg-white text-primary hover:bg-white/95 active:scale-[0.98] h-12 px-6 text-base font-semibold";

  const headline =
    headlineVariants[headlineVariant as keyof typeof headlineVariants] ||
    headlineVariants.control;
  const ctaText =
    ctaVariants[ctaVariant as keyof typeof ctaVariants] || ctaVariants.control;
  const secondaryCtaText =
    secondaryCtaVariants[
      secondaryCtaVariant as keyof typeof secondaryCtaVariants
    ] || secondaryCtaVariants.control;

  // Subtle mouse parallax for hero text depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => setIsVideoReady(true);
    videoElement.addEventListener("canplay", handleCanPlay);

    if (videoElement.readyState >= 3) {
      setIsVideoReady(true);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReduced) {
      videoElement.play().catch((error) => {
        console.error("Video autoplay was prevented:", error);
      });

      const handleVideoEnd = () => {
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch((error) => {
            console.error("Video loop play was prevented:", error);
          });
        }
      };
      videoElement.addEventListener("ended", handleVideoEnd);
      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Semantic H1 for SEO */}
      <h1 className="sr-only">
        Alex Myers — Trusted Edge Advisor | Helping Leaders Find Their Way
        Through What&apos;s Next
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
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${isVideoReady ? "opacity-100" : "opacity-0"}`}
        src="/header.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[1]"></div>

      <div className="container relative z-10 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col space-y-8 text-center">
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="tracking-tighter sm:text-5xl xl:text-7xl/none hero-text-shadow"
          >
            <WordPullUp
              text={headline.line1}
              className="block text-white text-5xl md:text-6xl xl:text-7xl font-heading font-black"
              wordClassName="font-heading font-black text-white"
              duration={0.6}
            />
            <WordPullUp
              text={headline.line2}
              className="block text-usvc-blue text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading font-bold"
              wordClassName="font-heading font-bold text-usvc-blue"
              delay={0.3}
              duration={0.6}
            />
          </motion.div>

          <BlurFade delay={0.4} inView>
            <p className="text-primary-foreground/95 text-lg md:text-xl max-w-2xl mx-auto hero-text-shadow font-sans leading-relaxed">
              I help you find your way through the edge of change — the space between what
              was and what&apos;s next.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            {/* Primary CTA - coaching as main offer */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversion("hero_book_call");
                  trackCtaConversion({ cta_variant: ctaVariant });
                }}
                className="inline-flex items-center gap-2 bg-usvc-blue text-white font-medium text-base px-7 py-3 rounded-full hover:bg-ps-blue active:scale-[0.95] transition-all duration-200"
              >
                <Zap className="w-4 h-4" />
                {ctaText.primary}
              </a>
              <a
                href="#ai-mentoring"
                onClick={() => trackEvent("hero_mentoring_cta")}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-7 py-3 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.95] transition-all duration-200"
              >
                <Zap className="w-4 h-4" />
                1-on-1 AI Mentoring — $120/hr
              </a>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("hero_199_cta")}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-7 py-3 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.95] transition-all duration-200"
              >
                Get Your $199 Landing Page
              </a>
              <a
                href="/assessment"
                onClick={() => trackEvent("hero_assessment_cta")}
                className="inline-flex items-center gap-2 text-primary-foreground/80 font-medium text-base px-4 py-3 hover:text-primary-foreground hover:underline underline-offset-4 transition-all"
              >
                {secondaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust signals - simple text, no neon glows */}
            <div className="mt-4 text-xs text-primary-foreground/70 font-mono">
              Sessions from $120 · Free 15-min intro call
            </div>
          </BlurFade>

          {/* Asymmetric layout: stats integrated into the narrative */}
          <BlurFade delay={0.55} inView>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-primary-foreground/85">
              <span>
                <strong className="text-primary-foreground">40+</strong> AI
                systems deployed
              </span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span>
                <strong className="text-primary-foreground">
                  10–20 hrs/week
                </strong>{" "}
                reclaimed
              </span>
            </div>
          </BlurFade>

          <BlurFade delay={0.7} inView>
            <p className="text-primary-foreground/70 text-sm font-mono uppercase tracking-widest">
              Safe passage through uncertainty
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
