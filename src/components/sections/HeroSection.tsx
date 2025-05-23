
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-background text-foreground overflow-hidden">
      {/* The main container for the hero content and image, using Next.js App Router conventions */}
      <div className="container mx-auto px-4 md:px-6 min-h-[80vh] lg:min-h-[75vh] grid lg:grid-cols-2 items-center gap-x-8 gap-y-12 py-12 md:py-24">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col justify-center space-y-6 text-center lg:text-left relative z-10 order-last lg:order-first">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
              <span className="text-hero-title-1">Shape the Future.</span> <span className="text-hero-title-2 block mt-1">Deliver Real Results.</span>
            </h1>
            <p className="max-w-[600px] text-foreground/80 md:text-xl lg:mx-0 mx-auto">
              Artificial Intelligence is transforming business at breakneck speed. Yet, while AI tools evolve rapidly, many organizations struggle to convert individual AI productivity gains into sustained organizational performance. The missing link? People — their mindsets, emotions, and readiness to embrace profound change.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-start justify-center">
            <Button asChild size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105">
              <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
                <CalendarDays className="mr-2 h-5 w-5" />
                Schedule a Discovery Call
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-black/20 text-primary-foreground border-2 border-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <a href="mailto:alex@alexmyers.co?subject=Speaking Invitation Request">
                <Mic className="mr-2 h-5 w-5" />
                Invite Me to Speak
              </a>
            </Button>
          </div>
        </div>

        {/* Right Column: Image with Fade Effect */}
        <div className="relative w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[calc(75vh-6rem)] order-first lg:order-last overflow-hidden"> {/* Added overflow-hidden */}
          {/* Subtle lighting elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/3 w-2/3 h-2/3 bg-primary/10 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow opacity-70 dark:opacity-40"></div>
            <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[100px] animate-pulse-slower opacity-50 dark:opacity-30"></div>
          </div>

          <div
            className="relative w-full h-full z-[5]" // This div takes full width/height of its parent
            style={{
              maskImage: 'linear-gradient(to left, black 90%, transparent 70%)', // Relaxed mask
              WebkitMaskImage: 'linear-gradient(to left, black 90%, transparent 70%)', 
            }}
          >
            <Image
              src="/hero.webp" 
              alt="Alex Myers - Armchair Futurist"
              fill
              className="object-cover object-center" 
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
