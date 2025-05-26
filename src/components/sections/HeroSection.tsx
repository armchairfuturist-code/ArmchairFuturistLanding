
"use client";
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });

      const handleVideoEnd = () => {
        if (videoElement) {
          videoElement.currentTime = 0;
          videoElement.play().catch(error => {
            console.error("Video loop play was prevented:", error);
          });
        }
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      return () => {
        if (videoElement) {
          videoElement.removeEventListener('ended', handleVideoEnd);
        }
      };
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden min-h-[80vh] lg:min-h-[75vh] flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/header.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[1]" />

      <div className="relative z-10 h-full flex flex-col justify-center"> {/* Changed to justify-center for better vertical alignment */}
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Text Content Column */}
            <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="font-heading tracking-tighter sm:text-5xl xl:text-6xl/none hero-text-shadow">
                  <span className="block text-hero-title-1 text-4xl md:text-5xl xl:text-6xl">Shape the Future.</span>
                  <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2">Deliver Real Results.</span>
                </h1>
                <p className="text-primary-foreground/90 md:text-xl hero-text-shadow mx-auto lg:mx-0">
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

            {/* Image Column */}
            <div className="lg:col-span-2 flex justify-center items-center lg:justify-end">
              <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96">
                <Image
                  src="/profile.webp"
                  alt="Alex Myers Profile"
                  fill
                  className="rounded-full object-cover shadow-xl border-4 border-primary-foreground"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
