"use client";
import Image from 'next/image';
import { BlurFade } from '@/components/ui/blur-fade';
import { Marquee } from '@/components/ui/marquee';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy logo", name: "GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon.org logo", name: "Aragon.org" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group logo", name: "Culminate Strategy" },
  { src: "/techstars.jpg", alt: "Techstars logo", name: "Techstars" },
  { src: "/launch.jpg", alt: "Launch by NTT Data logo", name: "NTT Data" },
  { src: "/kemin.jpg", alt: "Kemin logo", name: "Kemin" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM logo", name: "Shift DSM" },
  { src: "/p2p.png", alt: "P2P logo", name: "P2P" },
  { src: "/mindscape.png", alt: "Mindscape Psychedelic Institute logo", name: "Mindscape" },
];

function LogoCard({ logo }: { logo: typeof logos[0] }) {
  return (
    <div
      className="flex flex-col items-center text-center flex-none gap-2"
      style={{ width: '96px' }}
    >
      <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/50 grayscale hover:grayscale-0">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground/70 leading-tight text-center w-full">
        {logo.name}
      </span>
    </div>
  );
}

export default function FeaturedInSection() {
  return (
    <section className="py-8 md:py-10 bg-background scroll-mt-20 overflow-hidden">
      <BlurFade inView>
        <p className="font-mono text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 px-4">
          Organizations I&apos;ve Advised &amp; Partnered With
        </p>
      </BlurFade>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:2.5rem] md:[--gap:3.5rem]">
          {logos.map((logo) => (
            <LogoCard key={logo.alt} logo={logo} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
