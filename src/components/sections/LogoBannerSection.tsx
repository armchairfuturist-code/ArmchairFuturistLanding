"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon.org" },
  { src: "/culminate.jpg", alt: "Culminate Strategy" },
  { src: "/techstars.jpg", alt: "Techstars" },
  { src: "/launch.jpg", alt: "NTT Data" },
  { src: "/kemin.jpg", alt: "Kemin" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM" },
  { src: "/p2p.png", alt: "P2P" },
  { src: "/mindscape.png", alt: "Mindscape" },
];

export default function LogoBannerSection() {
  return (
    <section className="py-12 md:py-16 bg-background border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <BlurFade inView>
          <p className="text-center text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
            Trusted by founders and teams building with AI
          </p>
        </BlurFade>
      </div>
      <Marquee pauseOnHover className="[--duration:40s] [--gap:2.5rem]">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="relative h-10 w-28 shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
