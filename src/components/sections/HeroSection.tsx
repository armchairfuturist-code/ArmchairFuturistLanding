
"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, Mic } from 'lucide-react';

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
    <section className="relative w-full min-h-[80vh] lg:min-h-[75vh] overflow-hidden flex items-center justify-center">
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
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[1]"></div>

      <div
        ref={contentRef}
        className={`container relative z-10 px-4 md:px-6 text-center max-w-3xl mx-auto scroll-animate ${isContentVisible ? 'is-visible' : ''
          }`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-center lg:text-left">
          <h1 className="tracking-tighter sm:text-5xl xl:text-6xl/none hero-text-shadow">
            <span className="block text-hero-title-1 text-4xl md:text-5xl xl:text-6xl font-heading">
              Don't Let AI Outpace Your People.
            </span>
            <span className="block text-hero-title-2 text-4xl md:text-5xl xl:text-6xl mt-1 md:mt-2 font-heading">
              Bridge the Gap. Unlock Real Value.
            </span>
          </h1>
          <p className="mt-6 text-primary-foreground/90 md:text-xl max-w-2xl mx-auto hero-text-shadow font-sans">
            AI insights are free. Belief change is priceless. I help you stop burning budget on strategies your team will never execute, and start building a culture that treats AI as a competitive edge, not a threat.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                <Mic className="mr-2 h-5 w-5" />
                Invite Me to Speak
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
