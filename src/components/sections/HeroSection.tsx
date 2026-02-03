"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, Mic, Zap, Terminal } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

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

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] lg:min-h-[85vh] overflow-hidden flex items-center justify-center">
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
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>

      <div
        ref={contentRef}
        className={`container relative z-10 px-4 md:px-6 text-center max-w-4xl mx-auto scroll-animate ${isContentVisible ? 'is-visible' : ''
          }`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-mono mb-4 backdrop-blur-sm animate-pulse">
            <Terminal className="w-3 h-3" />
            <span>Agent Operations v2026.02</span>
          </div>
          
          <h1 className="tracking-tighter sm:text-5xl xl:text-7xl/none hero-text-shadow">
            <span className="block text-hero-title-1 text-5xl md:text-6xl xl:text-7xl font-heading font-black">
              Own Your Time.
            </span>
            <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading font-bold opacity-90">
              Automate Your Execution.
            </span>
          </h1>
          
          <p className="mt-8 text-primary-foreground/95 text-lg md:text-2xl max-w-3xl mx-auto hero-text-shadow font-sans leading-relaxed">
            I architect and operate the private AI systems that high-performance founders use to reclaim 20+ hours a week. Stop managing tech—start getting results with your own <span className="font-bold text-accent italic">Autonomous Digital Staff</span>.
          </p>
          
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl transition-all duration-200 hover:scale-105 h-14 px-8 text-lg font-bold">
              <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
                <Zap className="mr-2 h-5 w-5 fill-current" />
                Provision Your AI Assistant
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-black/40 text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary shadow-xl transition-all duration-200 hover:scale-105 h-14 px-8 text-lg font-bold backdrop-blur-md"
            >
              <a href="#services">
                View Managed Services
              </a>
            </Button>
          </div>
          
          <p className="text-primary-foreground/60 text-sm font-mono mt-8 uppercase tracking-widest">
            Direct Implementation &middot; Zero Friction &middot; Full Ownership
          </p>
        </div>
      </div>
    </section>
  );
}
