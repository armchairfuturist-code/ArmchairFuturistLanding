"use client";
import { useEffect, useState } from 'react';
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
  BookOpen,
  BrainCircuit,
  Users,
  FlaskConical,
  Trophy
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'motion/react';
import { CALENDAR_URL, GOOGLE_FORM_URL } from '@/lib/constants';
import { ShineBorder } from '@/components/ui/shine-border';
import { BlurFade } from '@/components/ui/blur-fade';

type PricingContext = 'standard' | 'ppp' | 'agile';
type ServiceTrack = 'entrepreneur' | 'organization';

interface ServiceDetail {
  title: string;
  text: string;
}

interface Service {
  path: string;
  title: string;
  basePrice: number;
  maxPrice?: number;
  priceNote: string;
  duration: string;
  description: string;
  payload: string[];
  idealFor: string;
  details: ServiceDetail[];
  cta: string;
  ctaLink: string;
  highlight: boolean;
  badge?: string;
  icon: React.ElementType;
}

const entrepreneurServices = [
  {
    path: "ENTRY OFFER",
    title: "Own Your Identity: The $199 Landing Page",
    basePrice: 199,
    priceNote: "Flat",
    duration: "2-4 Days",
    description: "Linktree is dead. In an interview economy, you need a platform you own. I build a site that translates your LinkedIn, resume, and social links into one interview-ready portfolio.",
    payload: ["LinkedIn Profile Rewrite", "Resume Translation", "Social Links Setup", "Your Story, One Page"],
    idealFor: "Professionals who want to stand out before the first interview question is asked.",
    details: [
      { title: "Personal Brand Landing Page", text: "A homepage built around your differentiators, voice, and target opportunities." },
      { title: "LinkedIn & Resume Synthesis", text: "I pull the signal from your existing profiles into clear narrative blocks." },
      { title: "Social Links + Contact", text: "All your links and booking options in one place you own." }
    ],
    cta: "Claim Your $199 Page",
    ctaLink: GOOGLE_FORM_URL,
    highlight: false,
    badge: "Entry Offer",
    icon: Globe2
  },
  {
    path: "PREMIER OFFER",
    title: "AI Tools Assessment",
    basePrice: 599,
    maxPrice: 999,
    priceNote: "Fixed Project",
    duration: "1 Week",
    description: "You've seen the demos. You've tried ChatGPT. But you're stuck—drowning in tools with no idea which ones solve your specific problems. You need someone who can look at your workflows and say: 'This tool. This process. This is where you start.'",
    payload: ["45-Min Discovery Call", "Your Top 5 Tool Picks", "Written Report", "30-Min Review"],
    idealFor: "Business owners who need clarity on which AI tools will actually save them time.",
    details: [
      { title: "Step 1: Discovery", text: "45-minute Zoom. I ask what problems waste your time—not what you think you should automate." },
      { title: "Step 2: Analysis", text: "I find 5-7 areas where tools could save hours. Each recommendation comes with estimated time savings." },
      { title: "Step 3: Report", text: "You get a clear document: where to start, what to try, and how much time you'll save." },
      { title: "Step 4: Review", text: "We walk through the report together. I answer questions. Most clients move to implementation after this." }
    ],
    cta: "Start Your Assessment",
    ctaLink: CALENDAR_URL,
    highlight: true,
    badge: "Premier Offer",
    icon: Rocket
  },
  {
    path: "IMPLEMENTATION",
    title: "Implementation & Scaling",
    basePrice: 1000,
    maxPrice: 10000,
    priceNote: "Fixed Project",
    duration: "2-6 Weeks",
    description: "60% of assessment clients want help implementing recommendations. That's where the real results live. I build the workflows, automate the connections, and hand you a system that works.",
    payload: ["Fix Your Slow Processes", "Automate the Repetitive Stuff", "Build a Team Chatbot", "One-Click Workflows"],
    idealFor: "Assessment clients ready to move from recommendations to results.",
    details: [
      { title: "Process Fix ($3K-$5K)", text: "Map how work flows now, redesign the bottlenecks, automate the rest. For businesses losing hours weekly." },
      { title: "Automation ($1K-$3K)", text: "Connect your existing tools with Zapier or Make.com. I build it and teach you how to maintain it." },
      { title: "Team Chatbot ($3K+)", text: "Have docs nobody reads? I build a chatbot your team actually uses instead." },
      { title: "One-Click Workflows ($3K-$5K)", text: "Turn 10-step manual processes into single-click operations." },
      { title: "Full AI Setup ($5K-$10K+)", text: "Complete AI infrastructure for teams ready to go all-in." }
    ],
    cta: "Discuss Implementation",
    ctaLink: CALENDAR_URL,
    highlight: false,
    badge: "Where 60% Go",
    icon: Workflow
  },
  {
    path: "MENTORING",
    title: "AI Mentoring & Mindset Coaching",
    basePrice: 97,
    maxPrice: 497,
    priceNote: "Per Session / Package",
    duration: "Ongoing",
    description: "AI is a thinking problem, not just a tool problem. Most people aren't overwhelmed by the technology; they're overwhelmed by what it means for their future. I help you move from anxiety to agency.",
    payload: ["1-on-1 Mentoring", "Mindset Reframing", "Practical Tool Guidance", "Future-Optimistic Framework"],
    idealFor: "Anyone who feels overwhelmed by AI and wants to think differently about what's coming.",
    details: [
      { title: "Mindset Before Toolset", text: "We start with how you think about AI, not how you use it. The shift from fear to agency unlocks everything else." },
      { title: "Practical & Personal", text: "Every session blends hands-on tool guidance with the bigger picture: how AI changes your role and opportunities." },
      { title: "Optimism Through Understanding", text: "I help you see AI as a lever for your ambitions instead of a threat to your relevance." }
    ],
    cta: "Book a Mentoring Session",
    ctaLink: CALENDAR_URL,
    highlight: false,
    icon: BookOpen
  }
];

const organizationServices = [
  {
    path: "PILLAR 1",
    title: "Adoption Strategy",
    basePrice: 10625,
    priceNote: "Fixed",
    duration: "3-4 Weeks",
    description: "Most transformation efforts stall because they ignore the people. I use data-driven profiling to segment your organization and find the 5% of staff who naturally embrace uncertainty—the ones who can actually lead change.",
    payload: ["Results Thinker ID", "2nd-Order Coaching", "Low-Friction Diagnostics"],
    idealFor: "Organizations that have tried AI training and gotten nowhere.",
    details: [
      { title: "The Problem", text: "You can't automate away resistance. Corporate antibodies kill transformation efforts before they start." },
      { title: "Find the Leaders", text: "I identify the top 5% of your staff who think in outcomes, not processes. Then I empower them to lead." },
      { title: "Coach the Rest", text: "Help leaders shift from command-and-control to managing uncertainty—essential for AI adoption." }
    ],
    cta: "Schedule Diagnostic",
    ctaLink: CALENDAR_URL,
    highlight: false,
    icon: BrainCircuit
  },
  {
    path: "PILLAR 2",
    title: "Team Structure Redesign",
    basePrice: 12750,
    priceNote: "/Month",
    duration: "Monthly Retainer",
    description: "As AI collapses job functions, old departmental silos become liabilities. I help you move decisions to the edge—where the data actually is.",
    payload: ["Autonomous Squads", "Role-Based Accountability", "Talent De-Siloing"],
    idealFor: "Companies where decisions bottleneck at the top.",
    details: [
      { title: "The Reality", text: "Rigid reporting lines slow everything down. AI moves fast; your org structure has to match." },
      { title: "Autonomous Units", text: "Restructure teams into self-sufficient units that operate like internal startups." },
      { title: "Roles Over Titles", text: "Move away from job titles to roles—decisions get made by whoever has the most relevant data." }
    ],
    cta: "Discuss Retainer",
    ctaLink: CALENDAR_URL,
    highlight: false,
    icon: Users
  },
  {
    path: "PILLAR 3",
    title: "10-Week Transformation Lab",
    basePrice: 38250,
    maxPrice: 55250,
    priceNote: "10-Week Lab",
    duration: "10 Weeks",
    description: "A hands-on lab to prototype AI-driven initiatives at the edge of your organization. Test new models safely before rolling them into core operations.",
    payload: ["10-Week Transformation", "Human-Machine WF", "Tactical Prototyping"],
    idealFor: "Organizations that want to test AI ideas without disrupting current operations.",
    details: [
      { title: "Prototype, Don't Plan", text: "Build functional concepts to prove the idea works before asking for buy-in." },
      { title: "Human + Machine", text: "Design workflows where AI handles the rote output, humans focus on outcomes." },
      { title: "High-Impact Sprints", text: "10-week pilots designed to show measurable ROI and build cultural momentum." }
    ],
    cta: "Apply for Lab",
    ctaLink: CALENDAR_URL,
    highlight: true,
    badge: "Most Transformative",
    icon: FlaskConical
  }
];

const RollingPrice = ({ value, context }: { value: number, context: PricingContext }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const springValue = useSpring(value, { stiffness: 100, damping: 30 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => { springValue.set(value); }, [value, springValue]);
  useEffect(() => { return rounded.on("change", (v) => setDisplayValue(v)); }, [rounded]);

  if (value === 0) return <span>Custom</span>;
  if (value < 1000) return <span>${displayValue}</span>;

  const format = (val: number) => {
    return context === 'standard'
      ? `$${(val / 1000).toFixed(1).replace('.0', '')}k`
      : `$${(val / 1000).toFixed(1).replace('.0', '')}k*`;
  };

  return <span>{format(displayValue)}</span>;
};

const ServiceAccordionItem = ({ service, pricingContext, index }: { service: Service, pricingContext: PricingContext, index: number }) => {
  let multiplier = 1;
  if (pricingContext === 'ppp') multiplier = 0.6;
  if (pricingContext === 'agile') multiplier = 0.85;

  const basePriceAdjusted = Math.round(service.basePrice * multiplier);
  const maxPriceAdjusted = service.maxPrice ? Math.round(service.maxPrice * multiplier) : null;
  const Icon = service.icon;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.06 }}
    >
      <AccordionItem value={service.title} className={`bg-card border rounded-xl px-2 mb-4 overflow-hidden shadow-sm transition-all hover:shadow-md
                ${service.highlight ? 'border-primary/50 ring-1 ring-primary/10 shadow-[0_0_15px_rgba(76,29,149,0.05)]' : 'border-border hover:border-primary/50'}
                data-[state=open]:ring-1 data-[state=open]:ring-primary/20 data-[state=open]:shadow-lg relative group`}>
        {service.highlight && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <ShineBorder shineColor={["hsl(208, 100%, 50%)", "hsl(208, 100%, 70%)"]} borderWidth={2} duration={10} />
          </>
        )}
        <AccordionTrigger className="px-4 py-6 hover:no-underline [&[data-state=open]>div>div>svg]:rotate-180">
          <div className="flex flex-col md:flex-row w-full items-start md:items-center gap-4 text-left z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{service.path}</span>
                {service.highlight && (
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1 shadow-sm">
                    <Rocket className="w-3 h-3" /> {service.badge}
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
                {maxPriceAdjusted && (<> - <RollingPrice value={maxPriceAdjusted} context={pricingContext} /></>)}
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
                    {maxPriceAdjusted && (<> - <RollingPrice value={maxPriceAdjusted} context={pricingContext} /></>)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{service.priceNote}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <p className="text-base md:text-lg text-foreground/90 font-sans leading-relaxed">{service.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.details?.map((detail: ServiceDetail, i: number) => (
                  <div key={i} className="bg-muted/20 p-4 rounded-lg border border-border/30 hover:bg-muted/40 transition-colors">
                    <h5 className="font-bold text-foreground text-sm mb-1.5 flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] min-h-[6px] rounded-full bg-primary" /> {detail.title}
                    </h5>
                    <p className="text-xs text-muted-foreground ml-3.5 leading-base">{detail.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1 flex flex-col h-full bg-muted/10 rounded-xl p-6 border border-border/50">
              <div className="mb-6">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> {service.path.startsWith('SERVICE') ? 'System Components' : 'Strategy Assets'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.payload.map((item: string, i: number) => (
                    <div key={i} className="text-[11px] font-mono font-medium text-foreground px-2.5 py-1.5 bg-background border border-border/50 rounded-md shadow-sm flex items-center gap-2 hover:border-primary/30 transition-colors">
                      <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-border/30">
                <Button asChild size="lg" className={`w-full font-bold shadow-lg overflow-hidden group/btn relative ${service.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-background text-foreground border-2 border-foreground/10 hover:border-primary hover:text-primary hover:bg-primary/5'}`}>
                  <a href={service.ctaLink} target="_blank" rel="noopener noreferrer" className="relative z-10">
                    {service.cta} <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
  const [pricingContext, setPricingContext] = useState<PricingContext>('standard');
  const [activeTrack, setActiveTrack] = useState<ServiceTrack>('entrepreneur');
  const [showPricingOptions, setShowPricingOptions] = useState(false);

  return (
    <section id="services" className="py-24 bg-background scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
            What I offer
          </h2>
          <div className="text-xl text-foreground/80 font-sans leading-relaxed space-y-6">
            <p>Services from $97 to $55,250. Start with the $199 landing page or the $599 assessment. <strong>Most clients start with assessment—then scale into implementation.</strong></p>
            <p><strong>My promise:</strong> If you aren't happy with our initial discussions, I'll refund you.</p>
          </div>
        </div>
        </BlurFade>

        {/* Track Selector Toggle */}
        <div className="flex flex-col items-center mb-16">
          <div className="bg-muted p-1.5 rounded-2xl inline-flex gap-2 mb-4 border border-border shadow-inner">
            <button
              onClick={() => setActiveTrack('entrepreneur')}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${activeTrack === 'entrepreneur' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Layout className="w-4 h-4" /> Founders & Small Teams
            </button>
            <button
              onClick={() => setActiveTrack('organization')}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${activeTrack === 'organization' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Users className="w-4 h-4" /> Organizations & Enterprises
            </button>
          </div>
          <p className="text-sm text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-2 duration-700">
            {activeTrack === 'entrepreneur' ? "For business owners ready to stop drowning in tools and start getting results." : "Structural architecture for organizational scale."}
          </p>
        </div>

        <div className="flex flex-col items-center mb-12">
          <button
            onClick={() => setShowPricingOptions(!showPricingOptions)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 underline underline-offset-2 mb-3 cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            {showPricingOptions ? 'Hide pricing options' : 'Adjust pricing for your region or readiness level'}
          </button>
          {showPricingOptions && (
            <div className="flex flex-col items-center">
              <Tabs defaultValue="standard" className="w-full max-w-sm md:w-auto md:max-w-none" onValueChange={(val) => setPricingContext(val as PricingContext)}>
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-10">
                  <TabsTrigger value="standard">Standard Rate</TabsTrigger>
                  <TabsTrigger value="ppp">Emerging Market (PPP)</TabsTrigger>
                  <TabsTrigger value="agile">High-Readiness (Agile)</TabsTrigger>
                </TabsList>
              </Tabs>
              {pricingContext !== 'standard' && (
                <p className="mt-3 text-xs text-primary italic">
                  * Pricing adjusted based on {pricingContext === 'ppp' ? 'Purchasing Power Parity' : 'Agile Readiness'}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="max-w-5xl mx-auto mb-24 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0, x: activeTrack === 'entrepreneur' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTrack === 'entrepreneur' ? 20 : -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {(activeTrack === 'entrepreneur' ? entrepreneurServices : organizationServices).map((service, index) => (
                  <ServiceAccordionItem key={service.title} service={service} pricingContext={pricingContext} index={index} />
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
