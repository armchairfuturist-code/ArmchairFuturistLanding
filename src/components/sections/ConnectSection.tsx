
"use client";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mic, Mail } from 'lucide-react'; // Added Mail

export default function ConnectSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

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
    <section id="connect" className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 text-center scroll-animate ${
          isContentVisible ? 'is-visible' : ''
        }`}
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Ready to Build an AI-Resilient Workforce That Delivers Impactful Outcomes?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 mb-10 font-sans"> {/* Ensure font-sans for Roboto */}
          The future is not just about AI technology — it’s about unlocking human potential through the right mindsets and leadership.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
             <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer">
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
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              <Mic className="mr-2 h-5 w-5" />
              Invite Me to Speak
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
