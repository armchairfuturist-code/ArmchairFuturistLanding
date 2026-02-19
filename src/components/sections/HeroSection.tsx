"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Terminal } from 'lucide-react';

const stats = [
  { value: '40+', label: 'AI Systems Deployed' },
  { value: '10–20h', label: 'Reclaimed Per Client / Week' },
  { value: '6', label: 'Verified Certifications' },
  { value: '7+', label: 'Podcast Appearances' },
];

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
        poster="/header.webp"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/header.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>

      <div
        ref={contentRef}
        className={`container relative z-10 px-4 md:px-6 text-center max-w-4xl mx-auto scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-mono mb-4 backdrop-blur-sm">
            <Terminal className="w-3 h-3" />
            <span>Trust Quotient: High</span>
          </div>

          <h1 className="tracking-tighter sm:text-5xl xl:text-7xl/none hero-text-shadow">
            <span className="block text-hero-title-1 text-5xl md:text-6xl xl:text-7xl font-heading font-black">
              Intelligence is cheap.
            </span>
            <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading font-bold opacity-90">
              Trust is the new scarcity.
            </span>
          </h1>

          <p className="mt-8 text-primary-foreground/95 text-lg md:text-2xl max-w-4xl mx-auto hero-text-shadow font-sans leading-relaxed">
            I architect outcomes where AI can&apos;t. While others get lost in the noise of exponential change, I provide the Vision, Verification, and Resiliency to turn technical chaos into high-signal execution.
          </p>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl transition-all duration-200 hover:scale-105 h-14 px-8 text-lg font-bold">
              <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
                <Zap className="mr-2 h-5 w-5 fill-current" />
                Book a Free Strategy Call
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-black/40 text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary shadow-xl transition-all duration-200 hover:scale-105 h-14 px-8 text-lg font-bold backdrop-blur-md"
            >
              <a href="#services">
                See How I Work
              </a>
            </Button>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-8 border-t border-white/10 w-full max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl font-black text-white hero-text-shadow">{stat.value}</span>
                <span className="text-[11px] text-primary-foreground/55 font-mono uppercase tracking-widest leading-tight text-center">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="text-primary-foreground/60 text-sm font-mono mt-4 uppercase tracking-widest">
            High Signal &middot; Zero Noise &middot; Full Ownership
          </p>
        </div>
      </div>
    </section>
  );
}
