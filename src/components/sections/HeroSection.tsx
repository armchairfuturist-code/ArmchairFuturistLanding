"use client";
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
        // Optionally, provide a play button for the user if autoplay fails.
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
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden min-h-[80vh] lg:min-h-[75vh]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/header.mp4" // Assuming header.mp4 is in the public folder
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[1]" /> {/* Dark overlay */}
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-1 text-center items-center"> {/* Centered text */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl xl:text-6xl/none hero-text-shadow">
                <span className="text-hero-title-1">Shape the Future.</span>{' '}
                <span className="block text-hero-title-2 mt-1 md:mt-2">Deliver Real Results.</span>
              </h1>
              <p className="max-w-[600px] mx-auto text-primary-foreground/90 md:text-xl hero-text-shadow">
                Artificial Intelligence is transforming business at breakneck speed. Yet, while AI tools evolve rapidly, many organizations struggle to convert individual AI productivity gains into sustained organizational performance. The missing link? People — their mindsets, emotions, and readiness to embrace profound change.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
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
        </div>
      </div>
    </section>
  );
}
