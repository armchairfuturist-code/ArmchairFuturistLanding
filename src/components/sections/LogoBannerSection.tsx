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
  { src: "/startupbraga.svg", alt: "Startup Braga" },
  { src: "/subvisual.svg", alt: "Subvisual" },
];

export default function LogoBannerSection() {
  return (
    <section className="py-10 md:py-12 bg-secondary/50 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <BlurFade inView>
          <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-widest">
            Select engagements
          </p>
        </BlurFade>
      </div>
      <Marquee pauseOnHover className="[--duration:50s] [--gap:3rem]">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="relative h-12 w-32 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300 flex items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
