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
    path: "PILLAR 1",
    title: "Psychology-Led Adoption Strategy",
    basePrice: 12500,
    priceNote: "Fixed",
    duration: "3-4 Weeks",
    description: "Rewiring the \"Corporate Immune System.\" I use data-driven profiling to segment your organization, ensuring we don't design for the \"lowest common denominator.\"",
    payload: ["Results Thinker ID", "2nd-Order Coaching", "Low-Friction Diagnostics"],
    idealFor: "Identifying psychological blocks & \"Internal Mavericks\" to lead change.",
    details: [
      { title: "Bypassing Resistance Gates", text: "I identify the \"Results\" thinkers—the top 5% of your staff naturally wired for uncertainty—and empower them to lead the charge." },
      { title: "Second-Order Leadership Coaching", text: "Coaching leaders to shift from \"Command-and-Control\" to \"Complexity\" thinking, essential for managing non-linear challenges." },
      { title: "Low-Friction Diagnostics", text: "Using NLP analysis of neutral text to map team sentiment and readiness without the friction of endless surveys." }
    ],
    cta: "Schedule Diagnostic",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  },
  {
    path: "PILLAR 2",
    title: "Distributed Authority Strategist",
    basePrice: 15000,
    priceNote: "/Month",
    duration: "Monthly Retainer",
    description: "From Hierarchical Bottlenecks to Competence-Based Accountability. Transition to Autonomous Squad Models where decisions follow data, not rank.",
    payload: ["Autonomous Squads", "Role-Based Accountability", "Talent De-Siloing"],
    idealFor: "Replacing rigid reporting lines with dynamic, cross-functional networks.",
    details: [
      { title: "Autonomous Innovation Units", text: "restructure teams into self-sufficient units that operate like internal startups, decoupled from central bureaucracy." },
      { title: "Competence-Based Accountability", text: "Moving away from \"titles\" to \"roles,\" ensuring decisions are made by those with the most relevant data." },
      { title: "Stopping Talent Hoarding", text: "Strategies to release high-performers from departmental silos to seed innovation across the enterprise." }
    ],
    cta: "Discuss Retainer",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  },
  {
    path: "PILLAR 3",
    title: "AI Infusion Strategist",
    basePrice: 45000,
    maxPrice: 65000,
    priceNote: "10-Week Lab",
    duration: "10 Weeks",
    description: "Orchestrating the Flow of Intelligence. A 10-week transformation lab to launch disruptive initiatives at the \"Edge\" and validate new models.",
    payload: ["10-Week Transformation", "Human-Machine WF", "Tactical Prototyping"],
    idealFor: "Testing and validating new business models safely before core integration.",
    details: [
      { title: "The 10-Week Transformation Lab", text: "A high-intensity program designed to launch disruptive initiatives at the \"Edge\" of your company." },
      { title: "Human-Machine Collaboration", text: "Designing workflows where AI agents handle the rote \"output,\" allowing humans to focus on \"outcomes.\"" },
      { title: "Tactical Prototyping (Vibe Coding)", text: "I step in to rapidly prototype functional concepts to provide the \"existence proof\" needed for buy-in." }
    ],
    cta: "Apply for Lab",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: true,
    badge: "Most Transformative"
  },
  {
    path: "PILLAR 4",
    title: "Strategy Provocations",
    basePrice: 18000,
    maxPrice: 30000,
    priceNote: "Single Event",
    duration: "1-2 Days",
    description: "Replacing Superficial Indicators with Value-Driven Data. Facilitated high-stakes sessions to break silos, force alignment, and resolve inertia.",
    payload: ["Strategy Provocations", "Value-Driven Data", "The \"Vibe\" Check"],
    idealFor: "Quarterly planning, breaking silos, and high-stakes leadership alignment.",
    details: [
      { title: "Strategy Provocations", text: "I don't just moderate; I challenge. We identify why tools don't communicate and why touchpoints are fragmented." },
      { title: "Value-Driven Data", text: "Shifting focus from Superficial Indicators (hours, features) to real value metrics (velocity, impact)." },
      { title: "The \"Vibe\" Check", text: "Creating Verified Collaborative Environments where politics, fear, and inertia are resolved." }
    ],
    cta: "Book Session",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  },
  {
    path: "CUSTOM",
    title: "Fractional Autonomy & Alignment Lead",
    basePrice: 0,
    priceNote: "Custom / Retainer",
    duration: "1 Month Minimum",
    description: "Support anything within an organization as a 'fractional autonomy and alignment lead'. Paid on an ad-hoc basis for specific systemic interventions.",
    payload: ["Ad-Hoc Support", "Systemic Alignment", "Culture Coding"],
    idealFor: "Organizations needing flexible, high-level strategic direction without full-time headcount.",
    details: [
      { title: "Flexible Engagement", text: "Designed for leaders who need an on-call strategist to unblock specific friction points." },
      { title: "Scope", text: "Can cover anything from conflict resolution to architectural review or hiring support." }
    ],
    cta: "Discuss Custom Role",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false
  }
];

const ServiceCard = ({ service, pricingContext }: { service: typeof servicesPaths[0], pricingContext: PricingContext }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
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
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{service.path}</h4>
            <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">{service.duration}</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground leading-tight min-h-[3.5rem]">
            {service.title}
          </h3>
        </div>

        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary transition-all duration-500">
              {service.basePrice === 0 ? "Custom" : getPriceDisplay(service, pricingContext)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{service.priceNote}</span>
        </div>

        <p className="text-sm text-foreground/80 mb-6 flex-1">
          {service.description}
        </p>

        {/* Details Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline focus:outline-none mb-3"
          >
            {isExpanded ? "Hide Details" : "View Details"}
            <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>

          <div className={`space-y-3 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {service.details?.map((detail, i) => (
              <div key={i} className="text-sm bg-muted/30 p-3 rounded-lg border border-border/50">
                <span className="font-bold block text-foreground mb-1">{detail.title}</span>
                <span className="text-muted-foreground text-xs leading-relaxed block">{detail.text}</span>
              </div>
            ))}
          </div>
        </div>

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
  );
};


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
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
            The Bottleneck Isn't the Code. It’s the Culture.
          </h2>
          <div className="text-xl text-foreground/80 font-sans leading-relaxed space-y-6">
            <p>
              The era of buying off-the-shelf SaaS to solve unique problems is ending. Your teams will soon be building their own agent-driven solutions. But powerful tools in a rigid, fear-based structure only create faster chaos.
            </p>
            <p>
              <strong>I do not sell software implementations</strong>. I diagnose and resolve the <strong>Organisational Inertia</strong> that stifles them.
            </p>
            <p>
              I operate as a <strong>Distributed Authority Strategist</strong>, <strong>Agile Coach</strong>, and <strong>Change Architect</strong>, helping you build a responsive "Human Operating System" where autonomy, experimentation, and AI are native traits. When needed, I step in tactically to "vibe code" and prototype—not to build the final product, but to demonstrate <em>what is possible</em> and unblock your internal teams.
            </p>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24 justify-center">
          {servicesPaths.map((service, index) => (
            <ServiceCard key={service.title} service={service} pricingContext={pricingContext} />
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

        {/* Engagement Model Footer */}
        <div className="max-w-4xl mx-auto mt-16 text-center border-t border-border pt-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">How I Work: Fractional & Outcome-Based</h3>
          <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto mb-8">
            I am not a "billable hours" contractor looking to fill a seat. I am a fractional partner paid primarily by outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-2">Engagement</h4>
              <p className="text-sm text-foreground/80">Retainers start at 1-month minimums.</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-2">Focus</h4>
              <p className="text-sm text-foreground/80">High-impact diagnosis, "Edge" incubation, and cultural alignment.</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="font-bold text-primary mb-2">Goal</h4>
              <p className="text-sm text-foreground/80">To make myself obsolete by upgrading your internal team’s capability to handle the future alone.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
