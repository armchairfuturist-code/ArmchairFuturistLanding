
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

export default function FeaturedInSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContentVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-8 md:py-10 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isContentVisible ? 'is-visible' : ''
          }`}
      >
        <p className="font-mono text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Organizations I&apos;ve Advised &amp; Partnered With
        </p>

        <div className="overflow-hidden py-4 w-full group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap gap-x-10 md:gap-x-14">
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className="flex flex-col items-center text-center flex-shrink-0 gap-2 w-24">
                <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50 grayscale hover:grayscale-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground/70 leading-tight whitespace-normal text-center">
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
