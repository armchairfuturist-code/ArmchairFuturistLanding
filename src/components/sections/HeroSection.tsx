"use client";
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
    if (prefersReduced) return;

    const handleCanPlay = () => setIsVideoReady(true);
    videoElement.addEventListener("canplay", handleCanPlay);

    if (videoElement.readyState >= 3) {
      setIsVideoReady(true);
    }

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
  }, []);

  return (
    <section
      className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-black"
      onMouseMove={handleMouseMove}
    >
      <h1 className="sr-only">
        Alex Myers — AI Guide | I Teach You to Design, Launch, and Sell Your Own AI-Powered Services
      </h1>

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay={!prefersReduced}
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
            className="relative hero-text-shadow"
          >
            {/* Scanline overlay — subtle futuristic texture behind the headline */}
            <div
              className="hp-scanlines absolute inset-0 -inset-y-6 pointer-events-none opacity-60"
              aria-hidden="true"
            />

            {/* Pre-headline ALERT — playful pulse dot, mono, tracked, electric blue */}
            <BlurFade delay={0.05} inView duration={prefersReduced ? 0 : 0.4}>
              <p className="relative inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-hp-bright mb-4 md:mb-5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-hp-bright animate-pulse shadow-[0_0_10px_rgba(41,110,249,0.8)]"
                  aria-hidden="true"
                />
                AI Alert · 2026
              </p>
            </BlurFade>

            {/* Line 1 — small, uppercase, tracked, warning-label feel */}
            <WordPullUp
              text={headline.line1}
              className="relative block text-white/90 text-[clamp(1.5rem,3.5vw,2.5rem)] font-display font-medium tracking-[0.28em] uppercase leading-[1.1] mb-4 md:mb-5"
              wordClassName="font-display font-medium text-white/90"
              duration={prefersReduced ? 0 : 0.6}
            />

            {/* Line 2 — the visual hero: gradient + glow + bold */}
            <WordPullUp
              text={headline.line2}
              className="relative block text-[clamp(2.75rem,7.5vw,6rem)] font-display font-bold tracking-tight leading-[0.98] text-balance hp-hero-glow"
              wordClassName="font-display font-bold hp-gradient-text"
              delay={0.3}
              duration={prefersReduced ? 0 : 0.7}
            />

            {/* Slash tail — edgy period replacement */}
            <BlurFade delay={1.0} inView duration={prefersReduced ? 0 : 0.4}>
              <div className="relative mt-3 md:mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-hp-bright" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-hp-bright">{"// end of message"}</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-hp-bright" aria-hidden="true" />
              </div>
            </BlurFade>
          </motion.div>

          <BlurFade delay={0.4} inView duration={prefersReduced ? 0 : 0.4}>
            <p className="text-primary-foreground/95 text-lg md:text-xl max-w-2xl mx-auto hero-text-shadow font-sans leading-[1.55] tracking-normal text-balance">
              {subheadline}
            </p>
          </BlurFade>
          {/* CTAs — primary goes to WhatsApp, secondary anchors to programs */}
          <BlurFade delay={0.5} inView duration={prefersReduced ? 0 : 0.4}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("hero_whatsapp_click")}
                  className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold text-base px-7 py-3 rounded-full shadow-md shadow-[#25D366]/25 hover:bg-[#1ebe5a] hover:shadow-lg hover:shadow-[#25D366]/35 active:scale-[0.95] transition-all duration-200"
                  aria-label="Message Alex on WhatsApp"
                >
                  <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Message on WhatsApp
                </a>
                <a
                  href="/#services"
                  onClick={() => trackEvent("hero_see_programs")}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium text-base px-7 py-3 rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 active:scale-[0.95] transition-all duration-200"
                >
                  See Programs
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
                of 1-on-1 AI guidance
              </span>
            </div>
          </BlurFade>

          {/* Tagline removed per copy consolidation */}
        </div>
      </div>
    </section>
  );
}
