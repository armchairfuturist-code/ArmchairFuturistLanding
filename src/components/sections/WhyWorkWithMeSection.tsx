"use client";
import { useEffect, useRef, useState } from 'react';
import { Workflow, Wrench, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CALENDAR_URL } from '@/lib/constants';

const strategyItems = [
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: "Fix the bottleneck, not the symptom",
    content: "Most problems aren't technical. They're structural. I look at how work actually flows through your business, then rebuild the parts that are bleeding time and money."
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "I build it, I don't hand you a deck",
    content: "I provision the servers, write the prompts, connect the tools. You get a working system, not a 40-slide strategy deck you'll never open."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Your data stays yours",
    content: "I build on open-standard stacks. No platform lock-in, no vendor tax. You own your logic, your data, and your infrastructure."
  }
];

export default function WhyWorkWithMeSection() {
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

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="strategy" className="py-20 md:py-28 bg-background scroll-mt-20">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
      >
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
            How I work
          </h2>
          <p className="text-xl text-foreground/80 font-sans leading-relaxed">
            Three principles. No fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategyItems.map((item, index) => (
            <Card key={index} className="border-none shadow-none bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 bg-background rounded-xl w-fit border border-border shadow-sm">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 leading-relaxed font-sans">
                  {item.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-lg font-sans text-foreground/90">
            <strong>Ready to stop wasting time on AI chaos? </strong>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 transition-all duration-200 hover:gap-3"
            >
              Book a call
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
