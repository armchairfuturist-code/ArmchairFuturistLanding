"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { WordPullUp } from "@/components/ui/word-pull-up";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { WHATSAPP_URL } from "@/lib/constants";
import { useTextScramble } from "@/hooks/useTextScramble";

// Slogan — AI tension + mental models
const headline = {
  line1: "AI won\u2019t replace you.",
  line2: "Someone using AI better than you will.",
};

const subheadline =
  "A partner in learning. We build the mental models that make AI make sense, then test them live on your real work. When you'd rather have it built, I build it.";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Subtle mouse parallax for hero depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Text scramble for kicker — fires once on mount
  const scrambleRef = useTextScramble("AI Literacy & Implementation", {
    trigger: !prefersReduced,
    speed: 25,
  });

  return (
    <section
      className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden flex items-center bg-ink text-white"
      onMouseMove={handleMouseMove}
    >
      {/* ponytail: sr-only GEO answer block — AI extraction target for "who is Alex Myers" */}
      <div className="sr-only" aria-hidden="true">
        <div itemProp="headline">
          Alex Myers — AI Consultant &amp; Instructor: AI Technical Literacy and
          Workflow Strategy
        </div>
        <div itemProp="description">
          Alex Myers is a partner in learning for individuals and teams. We build
          mental models for how AI works and test them live on real work. He also
          builds the systems when you’d rather have it built. 40+ AI systems
          deployed. Clients reclaim 10-20 hours per week.
        </div>
      </div>

      {/* Electric blue left rail — charged brand signal */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-hp-electric z-20 hero-rail-charge"
        aria-hidden="true"
      />

      {/* Giant background numeral — scale drama without decoration slop */}
      <div
        className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 font-display font-bold leading-none text-white/[0.035] text-[min(70vw,28rem)] tracking-tighter"
        aria-hidden="true"
      >
        AI
      </div>

      {/* Signature chevron — stroke-draw unlock (pathLength + dashoffset) */}
      <motion.div
        style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
        className="absolute top-[8%] right-[4%] md:right-[8%] opacity-30 md:opacity-40 pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg
          width="180"
          height="520"
          viewBox="0 0 180 520"
          className="w-[100px] h-[280px] md:w-[180px] md:h-[520px]"
          fill="none"
        >
          <path
            pathLength={1}
            d="M150 20 L20 260 L150 500"
            stroke="#296ef9"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={prefersReduced ? undefined : "chevron-draw"}
            style={prefersReduced ? undefined : { strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <path
            pathLength={1}
            d="M170 40 L50 260 L170 480"
            stroke="#024ad8"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            opacity="0.65"
            className={prefersReduced ? undefined : "chevron-draw"}
            style={
              prefersReduced
                ? undefined
                : {
                    strokeDasharray: 1,
                    strokeDashoffset: 1,
                    animationDelay: "0.35s",
                  }
            }
          />
        </svg>
      </motion.div>

      <div className="container relative z-10 px-6 sm:px-8 md:px-10 lg:px-12 max-w-6xl mx-auto py-20 md:py-24">
        <div className="flex flex-col items-start text-left max-w-4xl space-y-8 md:space-y-10">
          <motion.div
            style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
            className="relative w-full"
          >
            <BlurFade delay={0.05} inView duration={prefersReduced ? 0 : 0.4}>
              <p className="inline-flex items-center gap-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.35em] text-hp-bright mb-6 md:mb-8">
                <span
                  className="inline-block h-px w-8 md:w-12 bg-hp-electric"
                  aria-hidden="true"
                />
                <span ref={scrambleRef} />
              </p>
            </BlurFade>

            <h1
              aria-label={`${headline.line1} ${headline.line2}`}
              className="contents"
            >
              {/* Line 1 — slash-reveal unlock */}
              <span
                className={
                  prefersReduced
                    ? "block"
                    : "block slash-reveal"
                }
              >
                <WordPullUp
                  text={headline.line1}
                  className="relative block text-hp-bright text-[clamp(1.25rem,2.8vw,2rem)] font-display font-medium tracking-[0.22em] uppercase leading-[1.15] mb-4 md:mb-6"
                  wordClassName="font-display font-medium"
                  duration={prefersReduced ? 0 : 0.55}
                />
              </span>
              {/* Line 2 — delayed steeper slash + extreme display scale */}
              <span
                className={
                  prefersReduced
                    ? "block"
                    : "block slash-reveal slash-reveal-delayed"
                }
              >
                <WordPullUp
                  text={headline.line2}
                  className="relative block text-white text-[clamp(2.75rem,8.5vw,6rem)] font-display font-bold tracking-[-0.03em] leading-[0.92] text-balance max-w-[18ch]"
                  wordClassName="font-display font-bold"
                  delay={prefersReduced ? 0 : 0.15}
                  duration={prefersReduced ? 0 : 0.65}
                />
              </span>
            </h1>

            {/* Slash mark — brand punctuation, draws after type unlocks */}
            <BlurFade delay={1.15} inView duration={prefersReduced ? 0 : 0.4}>
              <div className="mt-5 md:mt-7 flex items-center gap-3">
                <span className="h-px w-10 md:w-16 bg-white/20" aria-hidden="true" />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  className="text-hp-electric"
                  aria-hidden="true"
                >
                  <polyline
                    pathLength={1}
                    points="2,2 14,8 2,14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className={prefersReduced ? undefined : "chevron-draw"}
                    style={
                      prefersReduced
                        ? undefined
                        : {
                            strokeDasharray: 1,
                            strokeDashoffset: 1,
                            animationDelay: "1.1s",
                            animationDuration: "0.6s",
                          }
                    }
                  />
                </svg>
              </div>
            </BlurFade>
          </motion.div>

          <BlurFade delay={0.55} inView duration={prefersReduced ? 0 : 0.4}>
            <p className="text-white/70 text-lg md:text-xl max-w-xl font-sans leading-[1.55] tracking-normal text-pretty">
              {subheadline}
            </p>
          </BlurFade>

          <BlurFade delay={0.7} inView duration={prefersReduced ? 0 : 0.4}>
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center flex-wrap">
                <BookCallButton
                  location="hero"
                  size="lg"
                  icon="calendar-days"
                  className="cta-electric px-8 py-3.5 text-base uppercase tracking-[0.7px] shadow-[0_0_0_1px_rgba(41,110,249,0.35)]"
                >
                  Book a Free AI Clarity Call
                </BookCallButton>
                <a
                  href="/#services"
                  onClick={() => trackEvent("hero_see_programs")}
                  className="inline-flex items-center justify-center gap-2 text-white font-medium text-base px-7 py-3.5 rounded border border-white/25 hover:border-hp-bright hover:text-hp-bright active:scale-[0.96] transition-[border-color,color,transform] duration-200"
                >
                  See Coaching & Services
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("hero_whatsapp_click")}
                aria-label="Or message Alex on WhatsApp"
                className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Or message on WhatsApp
              </a>
              <p className="text-xs text-white/40 font-mono tracking-wide">
                No pressure. No pitch. Just clarity.
              </p>
            </div>
          </BlurFade>

          {/* Social proof — high-contrast strip */}
          <BlurFade delay={0.85} inView>
            <div className="pt-6 md:pt-8 border-t border-white/10 w-full max-w-2xl">
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
                <span>
                  <strong className="text-white text-base md:text-lg font-display">
                    40+
                  </strong>{" "}
                  AI systems deployed
                </span>
                <span className="hidden sm:inline text-white/20" aria-hidden="true">
                  /
                </span>
                <span>
                  <strong className="text-white text-base md:text-lg font-display">
                    hundreds
                  </strong>{" "}
                  of coaching hours
                </span>
                <span className="hidden sm:inline text-white/20" aria-hidden="true">
                  /
                </span>
                <span>
                  <strong className="text-white text-base md:text-lg font-display">
                    10–20 hrs/wk
                  </strong>{" "}
                  reclaimed
                </span>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
