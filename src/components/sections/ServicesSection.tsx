"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Rocket,
  Zap,
  Workflow,
  Database,
  ArrowRight,
  CheckCircle2,
  Globe2,
  TrendingUp,
  ShieldCheck,
  Calculator
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PricingContext = 'standard' | 'ppp' | 'agile';

const servicesPaths = [
  {
    path: "PATH 1",
    title: "The Systemic Friction Audit",
    basePrice: 9500,
    priceNote: "Fixed",
    description: "You cannot automate chaos. A 14-day diagnostic to identify \"Value Leaks\" and finding the \"Internal Mavericks\" already using AI.",
    payload: ["Social Logic Map", "Friction Audit", "Strike Team ID"],
    idealFor: "Leadership teams who know they are slow but don't know why.",
    cta: "Schedule Systemic Review",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  },
  {
    path: "PATH 2",
    title: "The Convergence Sprint",
    basePrice: 35000,
    maxPrice: 50000,
    priceNote: "per Sprint",
    description: "A high-velocity, 4-6 week execution cycle. Moving a specific pilot project from \"Idea\" to \"Production\" with live code.",
    payload: ["n8n Workflows", "Custom Agents", "GitHub Repos"],
    idealFor: "Moving a specific pilot from \"Idea\" to \"Production.\"",
    cta: "Apply for Sprint",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: true,
    badge: "Highest ROI"
  },
  {
    path: "PATH 3",
    title: "The Systemic Architect",
    basePrice: 8500,
    priceNote: "/Month (Frac.)",
    description: "External pressure to keep the system fluid. Ongoing optimization of the AI stack and Agile coaching for strike teams.",
    payload: ["Stack Optimization", "Agile Coaching", "Monthly Briefs"],
    idealFor: "Maintaining the velocity gained in the Sprints.",
    cta: "Discuss Retainer",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  },
  {
    path: "PATH 4",
    title: "Strategic Provocations",
    basePrice: 15000,
    maxPrice: 25000,
    priceNote: "Single Event",
    description: "Breaking the \"Mental Silos.\" A high-impact forcing function for executives. Live demonstrations of \"Functional Collapse.\"",
    payload: ["Keynote / Workshop", "Live Demo", "Exec Alignment"],
    idealFor: "Annual retreats or high-stakes leadership alignment.",
    cta: "Book Event",
    ctaLink: "https://calendar.app.google.com/v2iqrJhw6AqGjE459",
    highlight: false
  }
];

const getPriceDisplay = (service: typeof servicesPaths[0], context: PricingContext) => {
  let multiplier = 1;
  if (context === 'ppp') multiplier = 0.6;
  if (context === 'agile') multiplier = 0.85;

  const format = (val: number) => {
    const adjusted = Math.round((val * multiplier) / 100) * 100;
    return context === 'standard'
      ? `$${(adjusted / 1000).toFixed(1).replace('.0', '')}k`
      : `$${(adjusted / 1000).toFixed(1).replace('.0', '')}k*`; // Add asterisk for adjusted
  };

  if (service.title === "The Systemic Friction Audit" || service.title === "The Systemic Architect") {
    // Precise pricing for smaller amounts
    const adjusted = Math.round(service.basePrice * multiplier);
    return `$${adjusted.toLocaleString()}`;
  }

  if (service.maxPrice) {
    return `${format(service.basePrice)} - ${format(service.maxPrice)}`;
  }
  return format(service.basePrice);
};

export default function ServicesSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [pricingContext, setPricingContext] = useState<PricingContext>('standard');

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
    <section id="services" className="py-24 bg-background scroll-mt-20 relative">
      <div
        ref={contentRef}
        className={`container mx-auto px-4 md:px-6 scroll-animate ${isContentVisible ? 'is-visible' : ''
          }`}
      >
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
            Refactor Your Organization for the Age of Convergence.
          </h2>
          <p className="text-xl text-foreground/80 font-sans leading-relaxed">
            Traditional silos are technical debt. I use Agile frameworks and AI automation (n8n/Custom Agents) to collapse functional barriers, turning your organization into a high-throughput system. <span className="text-primary font-semibold">I don't just give you a report; I build the plumbing.</span>
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <Image
            src="/IMG_3458.png"
            alt="Services overview image showing strategic collaboration"
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full max-w-3xl h-auto"
            data-ai-hint="strategy collaboration"
          />
        </div>

        {/* Pricing Context Toggle */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Organizational Context Selector</span>
          <Tabs defaultValue="standard" className="w-[400px] md:w-auto" onValueChange={(val) => setPricingContext(val as PricingContext)}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10">
              <TabsTrigger value="standard">Standard (Enterprise)</TabsTrigger>
              <TabsTrigger value="ppp">Emerging Market (PPP)</TabsTrigger>
              <TabsTrigger value="agile">High-Readiness (Agile)</TabsTrigger>
            </TabsList>
          </Tabs>
          {pricingContext !== 'standard' && (
            <p className="mt-3 text-xs text-primary animate-pulse italic">
              * Pricing adjusted based on {pricingContext === 'ppp' ? 'Purchasing Power Parity' : 'Agile Readiness Assessment'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-24">
          {servicesPaths.map((service, index) => (
            <div
              key={service.title}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card
                    ${service.highlight
                  ? 'border-primary shadow-[0_0_20px_rgba(76,29,149,0.15)] ring-1 ring-primary/20 scale-105 z-10'
                  : 'border-border shadow-sm hover:border-primary/50'
                }
                `}
            >
              {service.highlight && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm px-4 py-1 rounded-full font-bold shadow-lg uppercase tracking-wider flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">{service.path}</h4>
                  <h3 className="font-heading text-xl font-bold text-foreground leading-tight min-h-[3.5rem]">
                    {service.title}
                  </h3>
                </div>

                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary transition-all duration-500">
                      {getPriceDisplay(service, pricingContext)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{service.priceNote}</span>
                </div>

                <p className="text-sm text-foreground/80 mb-6 flex-1">
                  {service.description}
                </p>

                <div className="bg-muted/50 rounded-lg p-3 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Technical Payload:</p>
                  <ul className="space-y-1">
                    {service.payload.map((item, i) => (
                      <li key={i} className="text-xs font-mono text-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button asChild className={`w-full ${service.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}>
                    <a href={service.ctaLink} target="_blank" rel="noopener noreferrer">
                      {service.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Variable Pricing Section */}
        <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 bg-zinc-900 rounded-3xl border border-zinc-800 text-left">
          <h3 className="text-3xl font-heading font-bold text-white mb-6">Architectural Variable Pricing</h3>
          <p className="text-lg text-zinc-300 mb-10 leading-relaxed font-sans">
            I view pricing as a reflection of systemic variables, not a static barrier to entry. My rates are indexed based on three primary factors to ensure the highest probability of successful convergence:
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Zap className="w-5 h-5" /> <h3>1. Team Readiness Index</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Organizations with existing Agile workflows or high technical literacy require less 'foundational repair.' If your team is ready to run, my fee adjusts to reflect the reduced friction.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Globe2 className="w-5 h-5" /> <h3>2. Geographic Alignment</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Innovation isn’t exclusive to high-GDP zones. I utilize Purchasing Power Parity (PPP) models to ensure my systemic blueprints are accessible to growth-stage organizations in emerging markets.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <TrendingUp className="w-5 h-5" /> <h3>3. Performance Alignment</h3>
              </div>
              <p className="text-sm text-zinc-400">
                For high-impact 'Convergence Sprints,' I am open to structured 'Success Fees.' If we are measurably collapsing costs and increasing throughput, I am willing to share the risk—and the reward.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-800">
            <div className="text-zinc-200 font-semibold text-lg flex items-center gap-2">
              Have a unique organizational context? <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <Button asChild size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200 font-bold">
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM" target="_blank" rel="noopener noreferrer">
                <Calculator className="w-4 h-4 mr-2" />
                Submit Organizational Profile for Pricing Alignment
              </a>
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-500 font-mono italic">
            Note: My engagement capacity is capped to ensure architectural integrity. I prioritize projects based on systemic ROI and the 'Internal Catalyst' potential of the team.
          </p>
        </div>

      </div>
    </section>
  );
}
