
"use client";
// Removed useEffect and useRef as they are no longer needed for video
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  // Video ref and useEffect for video playback are removed

  return (
    <section className="w-full bg-background py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Text Content Column */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="font-heading tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="block text-primary text-4xl md:text-5xl xl:text-6xl">Shape the Future.</span>
                <span className="block text-accent text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2">Deliver Real Results.</span>
              </h1>
              <p className="text-foreground/80 md:text-xl max-w-2xl mx-auto lg:mx-0">
                Artificial Intelligence is transforming business at breakneck speed. Yet, while AI tools evolve rapidly, many organizations struggle to convert individual AI productivity gains into sustained organizational performance. The missing link? People — their mindsets, emotions, and readiness to embrace profound change.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
                <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Schedule a Discovery Call
                </a>
              </Button>
              <Button
                asChild
                variant="secondary" // Changed for better contrast on light background
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

          {/* Image Column */}
          <div className="flex justify-center items-center lg:order-last">
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96">
              <Image
                src="/profile.webp" // Assuming this is the correct path to your headshot
                alt="Alex Myers Profile"
                fill
                className="rounded-full object-cover shadow-xl" // Kept rounded-full and shadow, removed border
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
