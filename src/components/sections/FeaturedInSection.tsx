
"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy logo", name: "GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon.org logo", name: "Aragon.org" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group logo", name: "Culminate Strategy" },
  { src: "/techstars.jpg", alt: "Techstars logo", name: "Techstars" },
  { src: "/launch.jpg", alt: "Launch by NTT Data logo", name: "NTT Data" },
  { src: "/kemin.jpg", alt: "Kemin logo", name: "Kemin" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM logo", name: "Shift DSM" },
  { src: "/p2p.png", alt: "P2P logo", name: "P2P" },
];

// Duplicate three times so there's always content filling the viewport
const track = [...logos, ...logos, ...logos];

export default function FeaturedInSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContentVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 md:py-10 bg-background scroll-mt-20 overflow-hidden">
      <div
        ref={sectionRef}
        className={`scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
      >
        <p className="font-mono text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 px-4">
          Organizations I&apos;ve Advised &amp; Partnered With
        </p>

        {/* Outer overflow clip — no whitespace-nowrap needed; width is driven by flex */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex animate-marquee hover:[animation-play-state:paused] gap-x-10 md:gap-x-14">
            {track.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
