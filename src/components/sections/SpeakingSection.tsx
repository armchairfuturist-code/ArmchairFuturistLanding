"use client";

import Image from "next/image";
import { MessageSquare, Mic } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";
import { SPEAKING_FORM_URL } from "@/lib/constants";

const eventPhotos = [
  {
    src: "/marketing3.jpeg",
    alt: "Alex Myers presenting at Sunsetpreneurs on AI strategy",
    label: "Sunsetpreneurs",
    objectPos: "object-[60%_35%]",
  },
  {
    src: "/marketing4.jpeg",
    alt: "Alex Myers leading a session at Startup Braga on AI adoption",
    label: "Startup Braga",
    objectPos: "object-[50%_30%]",
  },
];

/**
 * Slim proof band — stage photos + one CTA.
 * Facilitation detail lives here only as proof; primary paths stay in Services/Mentoring.
 */
export default function SpeakingSection() {
  return (
    <section
      className="scroll-mt-20 bg-background py-16 md:py-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <BlurFade inView>
          <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
                <Mic className="h-3.5 w-3.5" aria-hidden="true" />
                On stage
              </p>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight leading-[1.05] text-ink max-w-[18ch]">
                Also lead rooms that need a decision
              </h2>
            </div>
            <p className="text-charcoal text-base md:text-lg max-w-md md:text-right leading-snug">
              Roundtables, workshops, strategy sessions — structured
              conversations, not keynote fluff.
            </p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
          {eventPhotos.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative aspect-[16/10] overflow-hidden border border-ink/10"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-hp-electric z-10"
                aria-hidden="true"
              />
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={`object-cover ${photo.objectPos} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="absolute bottom-0 inset-x-0 z-10 p-4 md:p-5 bg-ink/70">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/90">
                  {photo.label}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-ink/10 bg-cloud px-5 py-5 md:px-8 md:py-6">
          <p className="text-sm md:text-base text-charcoal max-w-xl leading-relaxed">
            Need someone to lead an executive AI discussion? Bring a real
            decision into the room.
          </p>
          <a
            href={SPEAKING_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("speaking_inquiry_click")}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold uppercase tracking-[0.7px] bg-hp-electric text-white hover:bg-hp-bright transition-colors shrink-0"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Ask About a Date
          </a>
        </div>
      </div>
    </section>
  );
}
