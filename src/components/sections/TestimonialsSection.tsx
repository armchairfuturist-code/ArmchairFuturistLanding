"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS } from "@/content/testimonials";

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

const testimonialsData = TESTIMONIALS;

const featuredTestimonials = testimonialsData.slice(0, 3);

function FeaturedTestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () =>
    setCurrent((prev) => (prev + 1) % featuredTestimonials.length);
  const prev = () =>
    setCurrent(
      (prev) =>
        (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length,
    );

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-ink text-white p-8 md:p-12 overflow-hidden"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-hp-electric"
            aria-hidden="true"
          />
          {/* Giant chevron quote mark */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className="text-hp-electric/30 mb-6"
            aria-hidden="true"
          >
            <path
              d="M18 48 L6 36 L18 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            />
            <path
              d="M38 48 L26 36 L38 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            />
          </svg>

          <p className="font-display text-xl md:text-2xl lg:text-3xl text-white leading-[1.35] tracking-tight mb-10 max-w-3xl line-clamp-7">
            &ldquo;{featuredTestimonials[current].text}&rdquo;
          </p>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div
                className="relative h-14 w-14 shrink-0"
                data-ai-hint={
                  featuredTestimonials[current].dataAiHint || "profile person"
                }
              >
                <Image
                  src={featuredTestimonials[current].imageSrc}
                  alt={`Profile picture of ${featuredTestimonials[current].name}`}
                  fill
                  sizes="56px"
                  className="rounded-full object-cover outline outline-1 -outline-offset-1 outline-white/15"
                />
              </div>
              <div>
                <p className="text-base font-display font-bold text-white">
                  {featuredTestimonials[current].name}
                </p>
                <p className="text-sm text-white/55 font-sans">
                  {featuredTestimonials[current].title}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex items-center justify-center h-11 w-11 border border-white/20 text-white hover:border-hp-bright hover:text-hp-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex items-center justify-center h-11 w-11 border border-white/20 text-white hover:border-hp-bright hover:text-hp-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 mt-8">
            {featuredTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-none transition-colors duration-300 ${
                  i === current ? "bg-hp-electric" : "bg-white/25"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`block h-1 ${i === current ? "w-7 bg-white" : "w-3 bg-white/70"}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-none w-80 md:w-96 bg-canvas border border-ink/10 p-5 md:p-6 flex flex-col gap-4 transition-[border-color,transform] duration-300 hover:border-hp-electric/40 hover:-translate-y-0.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="text-hp-electric/50 shrink-0"
        aria-hidden="true"
      >
        <path
          d="M6 14 L2 10 L6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M12 14 L8 10 L12 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
      <p className="text-sm text-charcoal font-sans leading-relaxed line-clamp-7">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-ink/10">
        <div
          className="relative h-10 w-10 shrink-0"
          data-ai-hint={testimonial.dataAiHint || "profile person"}
        >
          <Image
            src={testimonial.imageSrc}
            alt={`Profile picture of ${testimonial.name}`}
            fill
            sizes="40px"
            className="rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink leading-tight">
            {testimonial.name}
          </p>
          <p className="text-xs text-graphite font-sans">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="py-16 md:py-24 bg-cloud scroll-mt-20 overflow-hidden"
    >
      <BlurFade inView>
        <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-14">
          <div className="grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Social proof
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-tight leading-[0.98] text-ink">
                What clients say
              </h2>
            </div>
            <p className="md:col-span-5 text-charcoal font-sans text-base md:text-right max-w-md md:ml-auto">
              Executives, founders, and operators across tech, strategy, and
              change management.
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="container mx-auto px-4 md:px-6">
        <FeaturedTestimonialCarousel />
      </div>

      <div className="relative">
        <div className="flex justify-end pr-4 mb-2 container mx-auto">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
            aria-label={
              isPaused
                ? "Resume scrolling testimonials"
                : "Pause scrolling testimonials"
            }
            className="inline-flex items-center justify-center h-10 w-10 border border-ink/15 bg-canvas text-charcoal hover:border-hp-electric hover:text-hp-electric transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={isPaused ? "play" : "pause"}
                initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                {isPaused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
        <p className="absolute bottom-2 right-4 z-10 text-xs text-graphite/50 font-mono pointer-events-none select-none">
          hover to pause
        </p>
        <Marquee
          pauseOnHover
          className={`[--duration:70s] [--gap:1.5rem] md:[--gap:2rem] ${isPaused ? "[&_.animate-marquee]:[animation-play-state:paused]" : ""}`}
        >
          {testimonialsData.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </Marquee>
      </div>

      {/* Organization schema only. Self-assigned aggregateRating and Review
          markup reads as a funnel tell in search results and risks a
           self-serving-review penalty — testimonials stay on the page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://thearmchairfuturist.com/#organization",
            name: "The Armchair Futurist",
            url: "https://thearmchairfuturist.com",
          }),
        }}
      />
    </section>
  );
}
