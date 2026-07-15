"use client";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Target, Sparkles, Wrench, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { BlurFade } from '@/components/ui/blur-fade';
import { staggerContainer, staggerItem } from '@/lib/animation-variants';

interface Tier {
  name: string;
  price: string;
  tag: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
  icon: React.ElementType;
  note?: string;
}

interface Path {
  id: string;
  label: string;
  title: string;
  kicker: string;
  description: string;
  tiers: Tier[];
}

const paths: Path[] = [
  {
    id: "together",
    label: "Guidance & Education",
    title: "We Do It Together",
    kicker: "Build the literacy to do it yourself",
    description:
      "I teach you the AI literacy required to design, launch, and sell your own AI-powered services. From a session pack to a 3-month executive intensive — every path leads to the same place: you, independent.",
    tiers: [
      {
        name: "AI Readiness Assessment",
        price: "Free",
        tag: "3 Minutes",
        description:
          "Not sure where you stand? Take the free 3-minute diagnostic. You'll get your personalized AI archetype, clarity score, and a clear recommended next step — no pitch, no pressure.",
        features: [
          "3-minute quiz",
          "Personalized AI archetype",
          "Clarity & readiness score",
          "Recommended next step",
        ],
        cta: "Take the Assessment",
        ctaLink: "/assessment",
        highlighted: false,
        icon: Zap,
      },
      {
        name: "1-on-1 AI Guidance",
        price: "$600 – $2,000",
        tag: "5 · 10 · 20 Packs",
        description:
          "The proven foundation. Start with a 5-session pack and scale up. Most clients start with 5 or 10 sessions. Each one builds your AI literacy — from understanding to agency to independence.",
        features: [
          "60-minute 1-on-1 video sessions",
          "From fear to understanding to action",
          "Custom to your role and goals",
          "Recording + follow-up notes",
          "Flexible scheduling",
        ],
        cta: "Browse Session Packs",
        ctaLink: "/#ai-guidance",
        highlighted: false,
        icon: BookOpen,
        note: "5, 10, and 20-session packs save up to 15%",
      },
      {
        name: "AI Self-Sufficiency Program",
        price: "$2,497",
        tag: "8 Weeks",
        description:
          "The core transformation. An 8-week structured program where you build your own AI-powered service or brand as you learn. Weekly 1-on-1 sessions, a proven playbook, and real outputs — by week 8 you're the expert.",
        features: [
          "Weekly 1-on-1 coaching sessions",
          "Structured AI literacy playbook",
          "Build your own AI-powered offering",
          "Personal brand & service framework",
          "Ongoing async support",
          "Lifetime alumni access",
        ],
        cta: "Apply for the Program",
        ctaLink: CALENDAR_URL,
        highlighted: true,
        icon: Target,
      },
    ],
  },
  {
    id: "foryou",
    label: "Done-For-You Implementation",
    title: "I Do It For You",
    kicker: "Production-ready AI, built and shipped",
    description:
      "When you need a working AI system this week — not a curriculum. I provision the servers, install the agents, connect the tools, and hand you a system you actually own.",
    tiers: [
      {
        name: "Digital Identity Landing Page",
        price: "$199",
        tag: "Delivered in 2-4 Days",
        description:
          "An interview-ready digital identity site that consolidates your LinkedIn, resume, and social links into one professional platform you own. Like Linktree, but built for serious operators.",
        features: [
          "Custom-designed landing page",
          "LinkedIn, resume, and social links",
          "Conversion-focused layout",
          "Mobile-optimized",
          "You own the code and content",
        ],
        cta: "Start the Intake",
        ctaLink: "https://forms.gle/Ak5af4CUkCfRk8mM9",
        highlighted: false,
        icon: Globe,
      },
      {
        name: "Custom AI Provisioning",
        price: "$1,000 – $5,000",
        tag: "1-2 Weeks",
        description:
          "A done-for-you private AI command center. Custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Reclaim 10-20 hours a week.",
        features: [
          "Custom business workflows",
          "Agent installation (OpenClaw, Hermes)",
          "Private AI command center",
          "Calendar, email, and tool integrations",
          "Open-standard stack — no lock-in",
          "You own the infrastructure",
        ],
        cta: "Request a Build",
        ctaLink: CALENDAR_URL,
        highlighted: false,
        icon: Wrench,
        note: "Scope and price finalized in a 30-min fit call",
      },
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 bg-background scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-mono text-primary mb-2">Your Path to AI Independence</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
              From Dependency to Independence
            </h2>
            <p className="text-lg text-foreground/80 font-sans leading-relaxed">
              Most AI consultants build systems you depend on. I build understanding you keep — so deep you can design, launch, and sell your own AI-powered services. Pick the path that fits where you are today.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-20">
          {paths.map((path) => (
            <div key={path.id}>
              <BlurFade inView>
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/60 pb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                      {path.id === "together" ? (
                        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      ) : (
                        <Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      )}
                      <span>{path.label}</span>
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      {path.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono mt-1">
                      {path.kicker}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 font-sans leading-relaxed md:max-w-md md:text-right">
                    {path.description}
                  </p>
                </div>
              </BlurFade>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-1 gap-6 mx-auto ${
                  path.id === 'foryou'
                    ? 'md:grid-cols-2 max-w-4xl'
                    : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
                }`}
              >
                {path.tiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <motion.div
                      key={tier.name}
                      variants={staggerItem}
                      className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-tint"
                    >

                      <CardHeader className="pt-6 pb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-primary/10 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          {tier.tag}
                        </p>
                        <h4 className="font-heading text-xl font-bold text-foreground mb-1">
                          {tier.name}
                        </h4>
                        <div className="flex items-baseline gap-1">
                          <span className={`font-bold tabular-nums ${
                            tier.price === "Free" ? 'text-2xl text-primary' : 'text-3xl text-primary'
                          }`}>
                            {tier.price}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 px-6">
                        <p className="text-sm text-foreground/80 font-sans leading-relaxed mb-5">
                          {tier.description}
                        </p>
                        {tier.note && (
                          <p className="text-xs text-muted-foreground font-mono mb-4 italic">
                            {tier.note}
                          </p>
                        )}
                        <ul className="space-y-2.5">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/70">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="px-6 pb-6 pt-4 mt-auto">
                        <Button
                          asChild
                          size="lg"
                          className="w-full font-semibold bg-background text-foreground border-2 border-foreground/10 hover:border-primary hover:text-primary"
                        >
                          <a
                            href={tier.ctaLink}
                            {...(tier.ctaLink.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {tier.cta}
                            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                          </a>
                        </Button>
                      </CardFooter>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <BlurFade inView>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              Not sure which path fits?{" "}
              <a href="/assessment" className="text-primary font-semibold hover:underline">
                Take the free 3-minute assessment
              </a>{" "}
              — get your personalized AI archetype and a clear next step.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
