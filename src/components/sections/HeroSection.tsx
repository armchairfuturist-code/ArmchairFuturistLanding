"use client";
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
      className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center bg-canvas bg-hp-grid"
      onMouseMove={handleMouseMove}
    >
      {/* Mobile-only soft scrim — stronger opacity for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none md:hidden bg-[linear-gradient(180deg,rgba(180,210,252,0.7)_0%,rgba(200,220,252,0.5)_40%,rgba(230,240,252,0.3)_70%,rgba(255,255,255,0)_100%)]"
      />

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
              <p className="relative inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.4em] text-hp-electric md:text-hp-bright mb-4 md:mb-5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-hp-electric md:bg-hp-bright animate-pulse shadow-[0_0_10px_rgba(2,74,216,0.8)] md:shadow-[0_0_10px_rgba(41,110,249,0.8)]"
                  aria-hidden="true"
                />
                AI Alert · 2026
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
              <div className="relative mt-3 md:mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-hp-electric md:to-hp-bright" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-hp-electric md:text-hp-bright">{"// end of message"}</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-hp-electric md:to-hp-bright" aria-hidden="true" />
              </div>
            </BlurFade>
          </motion.div>

          <BlurFade delay={0.4} inView duration={prefersReduced ? 0 : 0.4}>
            <p className="text-charcoal text-lg md:text-xl max-w-2xl mx-auto font-sans leading-[1.55] tracking-normal text-balance">
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
                  className="inline-flex items-center gap-2 text-primary font-medium text-base px-7 py-3 rounded-full border border-primary/20 hover:bg-primary/5 hover:border-primary/40 active:scale-[0.95] transition-all duration-200"
                >
                  See Programs
                </a>
              </div>
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
