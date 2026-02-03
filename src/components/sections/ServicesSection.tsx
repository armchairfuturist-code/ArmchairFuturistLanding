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
  Calculator,
  Layout,
  Settings,
  BookOpen
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';

type PricingContext = 'standard' | 'ppp' | 'agile';

const servicesPaths = [
  {
    path: "SERVICE 1",
    title: "Custom AI Provisioning (Done-For-You)",
    basePrice: 1000,
    maxPrice: 5000,
    priceNote: "Fixed Project",
    duration: "1-2 Weeks",
    description: "I build your private AI command center so you don't have to learn the tech. I handle the API integrations, skill configuration, and system architecture to deliver a turnkey solution ready for immediate use.",
    payload: ["Custom GPTs/Agents", "Calendar & Email Sync", "Workflow Automation", "Secure Infrastructure"],
    idealFor: "Busy professionals who need the 'result' of an AI assistant without the learning curve.",
    details: [
      {
        title: "Architecture & Setup",
        text: "I handle the heavy lifting: from provisioning the environment to configuring custom skills and cross-platform integrations."
      },
      {
        title: "Ownership & Privacy",
        text: "You own the final system. I move your data and logic away from rigid silos into high-speed stacks that you control."
      },
      {
        title: "Immediate Throughput",
        text: "My goal is to reclaim 10-20 hours of your week by automating rote scheduling, drafting, and research tasks."
      }
    ],
    cta: "Request Setup",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: true,
    badge: "Most Popular",
    icon: Layout
  },
  {
    path: "SERVICE 2",
    title: "Managed Agent Operations (AIaaS)",
    basePrice: 500,
    maxPrice: 2000,
    priceNote: "/Month",
    duration: "Monthly Retainer",
    description: "I don't just build the system and walk away; I run it for you. As your Agent Operator, I manage and optimize your AI infrastructure on a monthly retainer so it evolves with your business.",
    payload: ["Daily Monitoring", "System Optimization", "New Skill Integration", "API Maintenance"],
    idealFor: "Founders and agencies who want a world-class assistant without the overhead of a human hire.",
    details: [
      {
        title: "Continuous Optimization",
        text: "I monitor performance and update your prompts and logic as new models are released, ensuring your system never becomes obsolete."
      },
      {
        title: "Managed Infrastructure",
        text: "I handle model updates, API key management, and security patches. You focus on the output, not the maintenance."
      },
      {
        title: "Scalable Operations",
        text: "As your business grows, I add new capabilities and integrations to your assistant to handle increased volume and complexity."
      }
    ],
    cta: "Discuss Retainer",
    ctaLink: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM",
    highlight: false,
    icon: Settings
  },
  {
    path: "SERVICE 3",
    title: "The Implementation Library",
    basePrice: 47,
    maxPrice: 497,
    priceNote: "One-time",
    duration: "Lifetime Access",
    description: "Practical blueprints for the self-reliant professional. I package my own internal workflows into templates and guides that you can implement today.",
    payload: ["Prompt Architectures", "Skill Bundles", "Implementation Guides", "Workflow Blueprints"],
    idealFor: "Individuals who want the 'how' and prefer to build their own systems using proven logic.",
    details: [
      {
        title: "Battle-Tested Blueprints",
        text: "Get access to the exact prompts and logic I use to run my own autonomous systems and client implementations."
      },
      {
        title: "Step-by-Step Training",
        text: "No surface-level theory. I provide clear, technical walkthroughs that focus on execution and measurable results."
      },
      {
        title: "Reusable Assets",
        text: "Includes downloadable skill templates and workflow maps that you can plug into your own AI setup immediately."
      }
    ],
    cta: "Browse Library",
    ctaLink: "https://thearmchairfuturist.com",
    highlight: false,
    icon: BookOpen
  }
];

const RollingPrice = ({ value, context }: { value: number, context: PricingContext }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const springValue = useSpring(value, { stiffness: 100, damping: 30 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [rounded]);

  if (value === 0) return <span>Custom</span>;

  // Formatting logic for specific price points
  if (value < 1000) {
    return <span>${displayValue}</span>;
  }

  const format = (val: number) => {
    return context === 'standard'
      ? `$${(val / 1000).toFixed(1).replace('.0', '')}k`
      : `$${(val / 1000).toFixed(1).replace('.0', '')}k*`;
  };

  return <span>{format(displayValue)}</span>;
};

const ServiceAccordionItem = ({ service, pricingContext }: { service: typeof servicesPaths[0], pricingContext: PricingContext }) => {
  let multiplier = 1;
  if (pricingContext === 'ppp') multiplier = 0.6;
  if (pricingContext === 'agile') multiplier = 0.85;

  const basePriceAdjusted = Math.round(service.basePrice * multiplier);
  const maxPriceAdjusted = service.maxPrice ? Math.round(service.maxPrice * multiplier) : null;
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="w-full"
    >
      <AccordionItem value={service.title} className={`bg-card border rounded-xl px-2 mb-4 overflow-hidden shadow-sm transition-all hover:shadow-md 
                ${service.highlight
          ? 'border-primary/50 ring-1 ring-primary/10 shadow-[0_0_15px_rgba(76,29,149,0.05)]'
          : 'border-border hover:border-primary/50'}
                data-[state=open]:ring-1 data-[state=open]:ring-primary/20 data-[state=open]:shadow-lg relative group
            `}>
        {service.highlight && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        )}

        <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>div>div>svg]:rotate-180">
          <div className="flex flex-col md:flex-row w-full items-start md:items-center gap-4 text-left z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{service.path}</span>
                {service.highlight && (
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1 shadow-sm">
                    <Rocket className="w-3 h-3" />
                    {service.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-6 border-l border-r border-border/50 h-10 min-w-[140px] justify-center">
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{service.duration}</span>
            </div>

            <div className="hidden md:flex flex-col items-end min-w-[140px]">
              <span className="text-xl font-bold text-primary tabular-nums">
                <RollingPrice value={basePriceAdjusted} context={pricingContext} />
                {maxPriceAdjusted && (
                  <> - <RollingPrice value={maxPriceAdjusted} context={pricingContext} /></>
                )}
              </span>
              <span className="text-xs text-muted-foreground">{service.priceNote}</span>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-4 pb-6 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-border/50 pt-6">
            <div className="lg:hidden flex justify-between items-center bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Duration</span>
                <span className="text-sm font-semibold text-foreground">{service.duration}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Investment</span>
                <div className="text-right">
                  <span className="block text-lg font-bold text-primary leading-none tabular-nums">
                    <RollingPrice value={basePriceAdjusted} context={pricingContext} />
                    {maxPriceAdjusted && (
                      <> - <RollingPrice value={maxPriceAdjusted} context={pricingContext} /></>
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{service.priceNote}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <p className="text-base md:text-lg text-foreground/90 font-sans leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.details?.map((detail, i) => (
                  <div key={i} className="bg-muted/20 p-4 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors">
                    <h5 className="font-bold text-foreground text-sm mb-1.5 flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-primary" />
                      {detail.title}
                    </h5>
                    <p className="text-xs text-muted-foreground ml-3.5 leading-base">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col h-full bg-muted/10 rounded-xl p-6 border border-border/50">
              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> System Components
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.payload.map((item, i) => (
                    <div key={i} className="text-[11px] font-mono font-medium text-foreground px-2.5 py-1.5 bg-background border border-border/50 rounded-md shadow-sm flex items-center gap-2 hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border/30">
                <Button asChild size="lg" className={`w-full font-bold shadow-lg overflow-hidden group/btn relative ${service.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-background text-foreground border-2 border-foreground/10 hover:border-primary hover:text-primary hover:bg-primary/5'}`}>
                  <a href={service.ctaLink} target="_blank" rel="noopener noreferrer" className="relative z-10">
                    {service.cta} <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    {service.highlight && <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover/btn:animate-shimmer" />}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
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
            Execution-First AI Engineering.
          </h2>
          <div className="text-xl text-foreground/80 font-sans leading-relaxed space-y-6">
            <p>
              I build and manage the autonomous systems that allow you to focus on your highest-leverage work. 
            </p>
            <p>
              I don't sell theoretical strategy—I deliver functioning, high-performance AI infrastructure that I architect and operate directly.
            </p>
            <p>
              <strong>My Promise:</strong> Partner with an operator who executes with you as your needs evolve. If you aren't happy with our initial prototyping and ideation discussions, I will happily refund you.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <Image
            src="/IMG_3458.png"
            alt="Strategic collaboration overview"
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full max-w-3xl h-auto"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-card p-6 rounded-xl border border-border text-left">
            <h4 className="font-bold text-primary mb-2">Structure</h4>
            <p className="text-sm text-foreground/80 italic">From one-time builds to ongoing management.</p>
          </div>
          <span className="text-primary text-2xl hidden md:block">→</span>
          <div className="bg-card p-6 rounded-xl border border-border text-left">
            <h4 className="font-bold text-primary mb-2">Focus</h4>
            <p className="text-sm text-foreground/80 italic">API Integration, Agent Operations, and Efficiency Engineering.</p>
          </div>
          <span className="text-primary text-2xl hidden md:block">→</span>
          <div className="bg-card p-6 rounded-xl border border-border text-left">
            <h4 className="font-bold text-primary mb-2">Result</h4>
            <p className="text-sm text-foreground/80 italic">To provide you with a turnkey 'Digital Staff' that handles the rote work so you don't have to.</p>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <Tabs defaultValue="standard" className="w-[400px] md:w-auto" onValueChange={(val) => setPricingContext(val as PricingContext)}>
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10">
              <TabsTrigger value="standard">Standard Rate</TabsTrigger>
              <TabsTrigger value="ppp">Emerging Market (PPP)</TabsTrigger>
              <TabsTrigger value="agile">High-Readiness (Agile)</TabsTrigger>
            </TabsList>
          </Tabs>
          {pricingContext !== 'standard' && (
            <p className="mt-3 text-xs text-primary animate-pulse italic">
              * Pricing adjusted based on {pricingContext === 'ppp' ? 'Purchasing Power Parity' : 'Agile Readiness'}
            </p>
          )}
        </div>

        <div className="max-w-5xl mx-auto mb-24 min-h-[600px]">
          <Accordion type="single" collapsible className="w-full space-y-3">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {servicesPaths.map((service, index) => (
                <ServiceAccordionItem key={service.title} service={service} pricingContext={pricingContext} />
              ))}
            </motion.div>
          </Accordion>
        </div>

        <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 bg-zinc-900 rounded-3xl border border-zinc-800 text-left">
          <h3 className="text-3xl font-heading font-bold text-white mb-6">Variable Pricing Logic</h3>
          <p className="text-lg text-zinc-300 mb-10 leading-relaxed font-sans">
            I index my rates based on three primary factors to ensure accessible, high-ROI engineering:
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Zap className="w-5 h-5" /> <h3>1. Client Readiness</h3>
              </div>
              <p className="text-sm text-zinc-400">
                If your business has existing documented workflows or high technical literacy, my fee adjusts to reflect the reduced friction of implementation.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Globe2 className="w-5 h-5" /> <h3>2. Geographic Parity</h3>
              </div>
              <p className="text-sm text-zinc-400">
                I utilize Purchasing Power Parity (PPP) models to ensure my implementation blueprints are accessible to entrepreneurs in emerging markets.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold">
                <TrendingUp className="w-5 h-5" /> <h3>3. Measured Impact</h3>
              </div>
              <p className="text-sm text-zinc-400">
                For high-volume automation sprints, I am open to structured performance-based fees. If I demonstrably collapse your costs, I'm willing to share the risk.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-800">
            <div className="text-zinc-200 font-semibold text-lg flex items-center gap-2">
              Ready to automate? <ArrowRight className="w-5 h-5 text-primary" />
            </div>
            <Button asChild size="lg" className="bg-white text-zinc-900 hover:bg-zinc-200 font-bold">
              <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM" target="_blank" rel="noopener noreferrer">
                <Calculator className="w-4 h-4 mr-2" />
                Discuss Your Project
              </a>
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-500 font-mono italic">
            Note: I limit my active managed accounts to ensure the architectural integrity of every system I operate.
          </p>
        </div>
      </div>
    </section>
  );
}
