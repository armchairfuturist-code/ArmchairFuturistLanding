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
import { ScrambleText } from "@/components/ui/scramble-text";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    imageSrc: "/shannon-myers.jpg",
    name: "Shannon Myers",
    title: "Founder of The Integrative Practitioner",
    text: "I knew Alex was brilliant, but working with him transformed my business. He helped me reclaim 20 hours per week through AI optimization and launch a website that landed a deal within an hour. Beyond the metrics, Alex provides balance. In a world of AI noise, he helps entrepreneurs use tech with a soul-led focus. If your digital presence doesn't feel like your Authentic Self, you don't need a developer—you need a Tech Sherpa.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/stephan-kerby.jpg",
    name: "Stephan Kerby",
    title: "Co-Founder, Mindscape Psychedelic Institute",
    text: "Alex is a fantastic communicator who made the website redesign process effortless. I'm thrilled with the outcome and the creative ideas Alex brought to the project that I never would have thought of.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Alexaragon.jpg",
    name: "Alex A.",
    title: "COO at Aragon.org",
    text: "Alex has a strong work ethic and real attention to detail. He's open-minded about how to approach problems, and he's good at getting people on the same page. I'd work with him again without hesitating.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Karrie.jpg",
    name: "Karrie S.",
    title: "CEO at Culminate Strategy Group",
    text: "Alex is one of the best change and program management professionals I've run across in transformation. He approaches each initiative with an eye toward the future technologies and how they impact the organization, productivity, and value creation. He's also just a high EQ leader who loves mentoring and coaching others into the next best version of themselves.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/tessa.jpg",
    name: "Tessa M.",
    title: "Marketing Strategist",
    text: "I had the pleasure of meeting Alex through Lunchclub. We talked about the future and Web3, and it was then that I realized I might have found myself a Web3 mentor. Alex is calm, patient, and is very generous with his knowledge. Alex is a great mentor and I would recommend him to anyone who wants to do a deep dive into Web3.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Sepehr.jpg",
    name: "Sepehr S.",
    title: "Co-Founder & Sr. Software Engineer",
    text: "Alex's energy is contagious - he walks into a room and people actually want to work. His understanding of Scrum is deep and practical, and it made a real difference in how our HR department operates. The whole team runs better when he's involved.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/marco.jpg",
    name: "Marco",
    title: "Sr. Product Designer",
    text: "Alex is professional and genuinely cares about the people he works with. He pushed our team toward continuous improvement without making it feel forced. I'd recommend him to any organization that values both competence and decency.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Evan.jpg",
    name: "Evan H.",
    title: "Head of Strategy",
    text: "Alex was one of the most significant members of the Aragon team throughout 2022 and 2023. He is extraordinarily proactive, doesn't wait to be told what to do, and will always give his ear to bounce ideas off of. If anyone needs this kind of dynamic energy on their team, it is an absolute no brainer that they should speak with Alex.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/Lia-Savillo.webp",
    name: "Lia S.",
    title: "Marketing Strategist",
    text: "Alex really made a huge difference in the operations at Aragon, ensuring every member of the team felt heard and seen - rare in many tech companies today. He also ensured that each member was focused on their personal development and helped us adapt our skills as the organization's needs shifted. He would make a great addition to any project.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "/jasper.jpg",
    name: "Jasper",
    title: "Sr. Manager - Launch by NTT Data",
    text: "Alex is the best SCRUM master I've worked with. He catches risks early and nothing slips past him. He also genuinely cares about helping the people around him grow, which is rare. Great to work with.",
    dataAiHint: "profile person",
  },
];

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
          className="quote-rise relative bg-ink text-white p-8 md:p-12 overflow-hidden"
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

          <p className="font-display text-xl md:text-2xl lg:text-[1.75rem] text-white leading-[1.35] tracking-tight mb-10 max-w-3xl">
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
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex items-center justify-center h-11 w-11 border border-white/20 text-white hover:border-hp-bright hover:text-hp-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hp-electric"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
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
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-none transition-[width,background-color] duration-300 ${
                  i === current ? "w-8 bg-hp-electric" : "w-3 bg-white/25"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
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
      id="testimonials"
      className="py-16 md:py-24 bg-cloud scroll-mt-20 overflow-hidden"
    >
      <BlurFade inView>
        <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-14">
          <div className="grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Social proof
              </p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight leading-[0.98] text-ink">
                <ScrambleText text="What clients say" />
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://thearmchairfuturist.com/#organization",
            name: "The Armchair Futurist",
            url: "https://thearmchairfuturist.com",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "40",
              bestRating: "5",
              worstRating: "1",
            },
            review: testimonialsData.map((t) => ({
              "@type": "Review",
              itemReviewed: {
                "@type": "Organization",
                "@id": "https://thearmchairfuturist.com/#organization",
                name: "The Armchair Futurist",
              },
              author: { "@type": "Person", name: t.name },
              reviewBody: t.text,
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
            })),
          }),
        }}
      />
    </section>
  );
}
