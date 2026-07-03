"use client";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { WHATSAPP_URL } from "@/lib/constants";
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

// Slogan — AI adoption urgency
const headline = {
  line1: "AI won\u2019t replace you.",
  line2: "Someone using AI better than you will",
};
const subheadline =
  "The edge of change is real, and it\u2019s okay to feel the weight of it. I teach founders, operators, and teams to design and run their own AI-powered systems\u2014no dependency, no retainer, no hype.";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

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

  return (
    <section
      className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-sky-50"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle sky-blue atmospheric tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/40 via-transparent to-blue-50/30 pointer-events-none" aria-hidden="true" />
      {/* Reactive chevron accents — HP angular wordmark nod */}
      <motion.div
        style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
        className="absolute top-[12%] right-[6%] opacity-[0.06] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg width="120" height="400" viewBox="0 0 120 400"><polyline points="100,10 15,200 100,390" fill="none" stroke="#024ad8" strokeWidth="2" /></svg>
      </motion.div>
      <motion.div
        style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
        className="absolute bottom-[10%] left-[5%] opacity-[0.04] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg width="80" height="260" viewBox="0 0 80 260"><polyline points="65,8 10,130 65,252" fill="none" stroke="#296ef9" strokeWidth="1.5" /></svg>
      </motion.div>
      <motion.div
        style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
        className="absolute top-[50%] right-[3%] opacity-[0.10] pointer-events-none z-0"
        aria-hidden="true"
      >
        <svg width="60" height="200" viewBox="0 0 60 200"><polyline points="50,6 8,100 50,194" fill="none" stroke="#c9e0fc" strokeWidth="1.5" /></svg>
      </motion.div>

      <div className="container relative z-10 px-6 sm:px-8 md:px-6 max-w-5xl mx-auto overflow-visible">
        <div className="flex flex-col space-y-8 text-center">
          <motion.div
            style={prefersReduced ? {} : { x: parallaxX, y: parallaxY }}
            className="relative"
          >


            <BlurFade delay={0.05} inView duration={prefersReduced ? 0 : 0.4}>
              <p className="relative inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-hp-electric md:text-hp-electric mb-4 md:mb-5">
                AI Strategy
              </p>
            </BlurFade>

            {/* Line 1 — small, uppercase, tracked, warning-label feel */}
            <h1
              aria-label={`${headline.line1} ${headline.line2}`}
              className="contents"
            >
              <WordPullUp
                text={headline.line1}
                className="relative block text-hp-electric md:text-hp-bright text-[clamp(1.5rem,3.5vw,2.5rem)] font-display font-medium tracking-[0.28em] uppercase leading-[1.1] mb-4 md:mb-5"
                wordClassName="font-display font-medium"
                duration={prefersReduced ? 0 : 0.6}
              />

              {/* Line 2 — the visual hero: bold display headline */}
              <WordPullUp
                text={headline.line2}
                className="relative block text-ink text-[clamp(2.75rem,7.5vw,6rem)] font-display font-bold tracking-tight leading-[0.98] text-balance"
                wordClassName="font-display font-bold"
                delay={0.3}
                duration={prefersReduced ? 0 : 0.7}
              />
            </h1>

            {/* Slash tail — edgy period replacement */}
            <BlurFade delay={1.0} inView duration={prefersReduced ? 0 : 0.4}>
              <div className="relative mt-3 md:mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-hairline" aria-hidden="true" />
                <svg width="16" height="16" viewBox="0 0 16 16" className="text-hp-electric" aria-hidden="true"><polyline points="2,2 14,8 2,14" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                <span className="h-px w-8 bg-hairline" aria-hidden="true" />
              </div>
            </BlurFade>
          </motion.div>

          <BlurFade delay={0.4} inView duration={prefersReduced ? 0 : 0.4}>
            <p className="text-charcoal text-lg md:text-xl max-w-2xl mx-auto font-sans leading-[1.55] tracking-normal text-balance">
              {subheadline}
            </p>
          </BlurFade>
          {/* CTAs — primary is the booking calendar (the 1:1 client goal).
              WhatsApp is demoted to a small text link below, so the channel
              stays reachable for visitors who prefer it, without competing
              with the on-brand signal CTA above the fold. "See Programs"
              is the secondary outline anchor. Microcopy matches the
              Connect section and the result page for one consistent promise. */}
          <BlurFade delay={0.5} inView duration={prefersReduced ? 0 : 0.4}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                <BookCallButton
                  location="hero"
                  size="lg"
                  icon="calendar-days"
                  className="rounded-md font-medium px-7 py-3 text-base uppercase tracking-[0.7px]"
                >
                  Book a 15-min Call
                </BookCallButton>
                <a
                  href="/#services"
                  onClick={() => trackEvent("hero_see_programs")}
                  className="inline-flex items-center gap-2 text-primary font-medium text-base px-7 py-3 rounded-md border border-primary/20 hover:bg-primary/5 hover:border-primary/40 active:scale-[0.96] transition-[background-color,border-color,color] duration-200"
                >
                  See Programs
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("hero_whatsapp_click")}
                aria-label="Or message Alex on WhatsApp"
                className="inline-flex items-center gap-1.5 text-sm text-graphite hover:text-ink underline-offset-4 hover:underline transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Or message on WhatsApp
              </a>
              <p className="text-xs text-graphite font-mono">
                No pressure. No pitch. Just clarity.
              </p>
            </div>
          </BlurFade>
          {/* Social proof — teaching outcomes */}
          <BlurFade delay={0.55} inView>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-charcoal">
              <span>
                <strong className="text-ink">40+</strong>{" "}
                AI systems deployed
              </span>
              <span className="hidden sm:inline text-hairline-strong">·</span>
              <span>
                <strong className="text-ink">
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
