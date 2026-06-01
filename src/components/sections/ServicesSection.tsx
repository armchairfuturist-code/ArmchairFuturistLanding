"use client";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Target, Rocket, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import { CALENDAR_URL, COACHING_PACKAGES } from '@/lib/constants';
import { BlurFade } from '@/components/ui/blur-fade';

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

const tiers: Tier[] = [
  {
    name: "AI Readiness Assessment",
    price: "$0",
    tag: "3 Minutes",
    description: "Not sure where you stand? Take the free 3-minute diagnostic. You'll get your personalized AI archetype, clarity score, and a clear recommended next step — no pitch, no pressure.",
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
    name: "1-on-1 AI Mentoring",
    price: "$100 – $2,000",
    tag: "Flexible Sessions",
    description: "The proven foundation. Start with a single 60-minute session and scale up. Each session builds your AI literacy — from understanding to agency to independence. Most clients start with 5 or 10 sessions.",
    features: [
      "60-minute 1-on-1 video sessions",
      "From fear to understanding to action",
      "Custom to your role and goals",
      "Recording + follow-up notes",
      "Flexible scheduling",
    ],
    cta: "Browse Session Packs",
    ctaLink: "/#ai-mentoring",
    highlighted: false,
    icon: BookOpen,
    note: "Also available as 5, 10, and 20-session packs with up to 30% savings",
  },
  {
    name: "AI Self-Sufficiency Program",
    price: "$2,497",
    tag: "8 Weeks",
    description: "The core transformation. An 8-week structured mentorship where you build your own AI-powered service or brand as you learn. Weekly 1-on-1 sessions, a proven playbook, and real outputs — by week 8 you're the expert.",
    features: [
      "Weekly 1-on-1 coaching sessions",
      "Structured AI literacy playbook",
      "Build your own AI-powered offering",
      "Personal brand & service framework",
      "Ongoing async support between sessions",
      "Lifetime alumni access",
    ],
    cta: "Apply for the Program",
    ctaLink: CALENDAR_URL,
    highlighted: true,
    icon: Target,
  },
  {
    name: "AI Independence Incubator",
    price: "$12,000",
    tag: "3 Months",
    description: "A high-touch intensive for practitioners who want to become recognized AI leaders in their field. Custom curriculum, weekly strategy sessions, and launching your first AI-powered offering together.",
    features: [
      "3-month 1-on-1 intensive",
      "Custom curriculum for your industry",
      "Weekly strategy sessions",
      "Launch your first AI offering",
      "Lifetime alumni access",
      "Priority ongoing support",
    ],
    cta: "Book a Discovery Call",
    ctaLink: CALENDAR_URL,
    highlighted: false,
    icon: Rocket,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 bg-background scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-2">Your Path to AI Independence</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
              From Dependency to Independence
            </h2>
            <div className="text-lg text-foreground/80 font-sans leading-relaxed space-y-4">
              <p>Most AI consultants build systems you depend on. I build understanding you keep — so deep you can design, launch, and sell your own AI-powered services.</p>
              <p>Start with a single mentoring session, or jump straight into the full program. Every path leads to the same place: <strong>you, empowered, independent.</strong></p>
              <p><strong>My promise:</strong> If you aren&apos;t happy after our initial discussions, I&apos;ll refund you. No questions asked.</p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-primary/50 bg-primary/[0.03] shadow-lg shadow-primary/5 ring-1 ring-primary/20 scale-[1.02] md:scale-105 relative'
                    : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-xs font-bold py-1.5 text-center font-mono uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`${tier.highlighted ? 'pt-10' : 'pt-6'} pb-4`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    tier.highlighted ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    {tier.tag}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-bold tabular-nums ${
                      tier.price === "$0" ? 'text-2xl text-primary' : 'text-3xl text-primary'
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
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tier.highlighted ? 'text-primary' : 'text-green-500'
                        }`} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-4 mt-auto">
                  <Button
                    asChild
                    size="lg"
                    className={`w-full font-semibold ${
                      tier.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
                        : 'bg-background text-foreground border-2 border-foreground/10 hover:border-primary hover:text-primary'
                    }`}
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
        </div>

        <BlurFade inView>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              Not sure where to start? <a href="/assessment" className="text-primary font-semibold hover:underline">Take the free 3-minute assessment</a> — get your personalized AI archetype and the right first step.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
