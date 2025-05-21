import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Mic } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="animated-hero-bg"></div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent">
                Shape the Future. Deliver Real Results.
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">
                Alex Myers – the Armchair Futurist: Advisor to leaders navigating AI, change, and the future of work with grounded, human-first strategy.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
                <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Schedule a Discovery Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-lg transition-transform duration-200 hover:scale-105">
                <a href="mailto:alex@alexmyers.co?subject=Speaking Invitation Request"> {/* Replace with actual email or contact form link */}
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
