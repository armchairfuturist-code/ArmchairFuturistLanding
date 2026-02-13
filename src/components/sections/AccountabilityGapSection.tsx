"use client";

import { useEffect, useRef, useState } from 'react';
import { Compass, Bot, ShieldCheck } from 'lucide-react';

const accountabilitySignals = [
  {
    icon: Compass,
    title: 'Human Architect',
    body: 'Direction-setting with business context, decision rights, and measurable ownership.',
  },
  {
    icon: Bot,
    title: 'High-Vocabulary Prompting',
    body: 'Clear intent capture to reduce ambiguity before execution enters production.',
  },
  {
    icon: ShieldCheck,
    title: 'Last Mile Polishing',
    body: 'Polishing means recognizing AI is often middle-to-middle, not end-to-end. AI is a construction crane: it can raise most of the building, but the final finish still needs human tweezers.',
  },
];

export default function AccountabilityGapSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="accountability-gap" className="py-16 md:py-24 bg-secondary/40 scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-5">
            The Accountability Gap
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed">
            AI moves fast, but it doesn't have a compass. Most adoption stalls at the Accountability Gap - the space between an AI output and a business result. I bridge that gap by acting as your <strong className="text-primary">Trusted Human Architect</strong>. I provide the high-vocabulary Prompting to set the direction and the precision Polishing to ensure the final result is human-accountable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {accountabilitySignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <article
                key={signal.title}
                className={`rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 scroll-animate ${isVisible ? 'is-visible' : ''}`}
                style={{ animationDelay: `${index * 110}ms` }}
              >
                <div className="inline-flex p-2 rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{signal.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{signal.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
