"use client";
import { useEffect, useRef, useState } from 'react';
import { Workflow, Wrench, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const strategyItems = [
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: "Systems Optimization",
    content: "I view every business process as interconnected loops. Most bottlenecks aren't technical — they are structural. I rebuild workflows using AI to collapse costs and increase throughput."
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Direct Execution (No Theatre)",
    content: "I don't hand you a strategy deck — I provision the servers, write the system prompts, and manage model integrations myself.",
    tags: ["Architecting Autonomy", "Managed Operations", "Measurable ROI"]
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Data & Privacy Sovereignty",
    content: "Your data is your competitive edge. I build on high-performance, open-standard stacks that ensure you own your logic and your data. No platform taxes, no digital anchors."
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
            How I Operate
          </h2>
          <p className="text-xl text-foreground/80 font-sans leading-relaxed">
            Execution-first. No theatre. Measurable outcomes.
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
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-lg font-sans text-foreground/90">
            <strong>Ready to reclaim your time and focus on high-leverage work? </strong>
            <a
              href="https://calendar.app.google/nAHHwNMfhDvXGv7P7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-4 transition-all duration-200 hover:gap-3"
            >
              Provision your system
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
