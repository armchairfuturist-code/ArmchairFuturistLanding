"use client";
import { useEffect, useRef, useState } from 'react';
import { Target, Zap, Bot, Box, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const strategyItems = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Purpose-Driven Execution",
    content: "Aligning your technical stack with your highest long-term aspirations. We don't build tech for tech's sake; we build to secure your specific future."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Agile Experimentation",
    content: "Moving past slow, linear planning into rapid, iterative implementation that actually delivers. We prototype fast, fail cheap, and scale what works."
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Autonomous Digital Staff",
    content: "Designing on-demand AI systems that scale your capacity without increasing your overhead. Your operational capability should grow faster than your payroll."
  },
  {
    icon: <Box className="h-8 w-8 text-primary" />,
    title: "Scalable Architecture",
    content: "Building modular systems that are ready to pivot as fast as the market moves. I ensure your infrastructure is asset-light and adaptability-heavy."
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
            Strategy & Implementation
          </h2>
          <p className="text-xl text-foreground/80 font-sans leading-relaxed">
            The Generalized Framework for High-TQ Operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
}
