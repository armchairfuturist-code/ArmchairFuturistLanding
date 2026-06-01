"use client";
import { Zap } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
const WHATSAPP_URL = "https://wa.me/15157706902";
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

// Unified headline — independence-first positioning
const headline = {
  line1: "AI Won\u2019t Replace You.",
  line2: "Someone Using AI Better Than You Will.",
};
const subheadline =
  "Don\u2019t just prompt\u2014architect. Build the technical literacy required to scale your personal leverage and launch your own AI-powered services.";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const prefersReduced = useReducedMotion();

  // A/B Testing — CTA copy variants only
  // Solid, confident CTA buttons
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
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
      <h1 className="sr-only">
        Alex Myers — AI Literacy Mentor | I Teach You to Design, Launch, and Sell Your Own AI-Powered Services
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

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col space-y-8 text-center">
          <motion.div
            style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
            className="hero-text-shadow"
          >
            <WordPullUp
              text={headline.line1}
              className="block text-white text-[clamp(2.75rem,6vw,4.75rem)] font-display font-semibold tracking-apple-tight leading-[1.05] text-balance"
              wordClassName="font-display font-semibold text-white"
              duration={prefersReduced ? 0 : 0.6}
            />
            <WordPullUp
              text={headline.line2}
              className="block text-usvc-blue text-[clamp(2rem,4.5vw,3.5rem)] mt-2 md:mt-3 font-display font-semibold tracking-apple-tight leading-[1.05] text-balance"
              wordClassName="font-display font-semibold text-usvc-blue"
              wordClassNames={{ Better: "italic" }}
              delay={0.3}
              duration={prefersReduced ? 0 : 0.6}
            />
          </motion.div>

          <BlurFade delay={0.4} inView duration={prefersReduced ? 0 : 0.4}>
            <p className="text-primary-foreground/95 text-lg md:text-xl max-w-2xl mx-auto hero-text-shadow font-sans leading-[1.55] tracking-normal text-balance">
              {subheadline}
            </p>
          </BlurFade>
          {/* CTAs — start building today */}
          <BlurFade delay={0.5} inView duration={prefersReduced ? 0 : 0.4}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("hero_start_building")}
                  className="inline-flex items-center gap-2 bg-usvc-blue text-white font-semibold text-base px-8 py-3 rounded-full hover:bg-ps-blue active:scale-[0.95] transition-all duration-200"
                >
                  <Zap className="w-4 h-4" aria-hidden="true" />
                  Start Building Today
                </a>
                <a
                  href="/#services"
                  onClick={() => trackEvent("hero_see_programs")}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-7 py-3 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.95] transition-all duration-200"
                >
                  See My Mentorship Programs
                </a>
              </div>
              <p className="text-xs text-primary-foreground/60 font-mono">
                No pressure. No pitch. Just clarity.
              </p>
            </div>
          </BlurFade>
          {/* Social proof — teaching outcomes */}
          <BlurFade delay={0.55} inView>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-primary-foreground/85">
              <span>
                <strong className="text-primary-foreground">40+</strong>{" "}
                AI systems deployed
              </span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span>
                <strong className="text-primary-foreground">
                  100+ hours
                </strong>{" "}
                of 1-on-1 AI mentorship
              </span>
            </div>
          </BlurFade>

          {/* Tagline removed per copy consolidation */}
        </div>
      </div>
    </section>
  );
}
