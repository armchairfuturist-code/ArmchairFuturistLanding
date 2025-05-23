
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
        // Autoplay was prevented.
        // You might want to show a play button or take other actions.
      });
    }
  }, []);

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/header.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-[1]"></div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none hero-text-shadow">
                <span className="text-hero-title-1">Shape the Future.</span> <span className="text-hero-title-2 block mt-1">Deliver Real Results.</span>
              </h1>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl hero-text-shadow">
                Artificial Intelligence is transforming business at breakneck speed. Yet, while AI tools evolve rapidly, many organizations struggle to convert individual AI productivity gains into sustained organizational performance. The missing link? People — their mindsets, emotions, and readiness to embrace profound change.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
                <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Schedule a Discovery Call
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="shadow-lg transition-transform duration-200 hover:scale-105 border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="mailto:alex@alexmyers.co?subject=Speaking Invitation Request">
                  <Mic className="mr-2 h-5 w-5" />
                  Invite Me to Speak
                </a>
              </Button>
            </div>
          </div>
          <Image
            src="/hero-alex-myers.png"
            alt="Alex Myers - Armchair Futurist"
            width={600}
            height={600}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
