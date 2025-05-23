
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-background overflow-hidden min-h-[80vh] lg:min-h-[75vh]">
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full py-12 md:py-20">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col justify-center space-y-6 z-10">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                <span className="text-primary">Shape the Future.</span>{' '}
                <span className="text-accent block mt-1 md:mt-2">Deliver Real Results.</span>
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">
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
                variant="secondary"
                size="lg"
                className="shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <a href="mailto:alex@alexmyers.co?subject=Speaking Invitation Request">
                  <Mic className="mr-2 h-5 w-5" />
                  Invite Me to Speak
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Image with Fading Effect & Lighting */}
          <div className="relative h-[50vh] md:h-[60vh] lg:h-full w-full order-first lg:order-last">
            {/* Subtle Lighting Effect 1 */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-3/4 h-3/4 bg-primary/5 rounded-full blur-3xl animate-pulse-slow opacity-50"></div>
            </div>
            {/* Subtle Lighting Effect 2 */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl animate-pulse-slower opacity-30" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Image Container with Mask */}
            <div
              className="absolute inset-0 z-[5] w-full h-full"
              style={{
                maskImage: 'linear-gradient(to left, black 70%, transparent 35%)',
                WebkitMaskImage: 'linear-gradient(to left, black 70%, transparent 35%)', // For Safari
              }}
            >
              <Image
                src="/Hero.webp" // Ensure Hero.webp is in public folder
                alt="Alex Myers - Armchair Futurist"
                fill
                className="object-cover object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
