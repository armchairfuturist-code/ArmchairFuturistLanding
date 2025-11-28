
"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy logo" },
  { src: "/aragonp.jpg", alt: "Aragon.org logo" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group logo" },
  { src: "/techstars.jpg", alt: "Techstars logo" },
  { src: "/launch.jpg", alt: "Launch by NTT Data logo" },
  { src: "/kemin.jpg", alt: "Kemin logo" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM logo" },
  { src: "/p2p.png", alt: "P2P logo" },
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
        className={`container mx-auto px-4 md:px-6 scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <h2 className="font-heading text-center text-2xl font-semibold text-foreground/90 mb-8">
          Organizations I’ve Partnered With
        </h2>
        
        <div className="overflow-hidden py-4 w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-x-10 md:gap-x-12">
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className="flex flex-col items-center text-center flex-shrink-0">
                <div className="relative h-24 w-24 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50 grayscale hover:grayscale-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
