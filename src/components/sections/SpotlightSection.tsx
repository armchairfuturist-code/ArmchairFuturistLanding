"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, FileText, Link2, Sparkles, Clock, Users, Zap, Building2, User } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { useExperiment } from '@/hooks/useExperiment';
import { GOOGLE_FORM_URL, CALENDAR_URL } from '@/lib/constants';

const individualBenefits = [
  { icon: Globe, text: "A professional site you own, not a Linktree" },
  { icon: FileText, text: "Your LinkedIn vibe + resume, translated into one platform" },
  { icon: Link2, text: "Social links, portfolio, and interview-ready storyline" },
  { icon: Sparkles, text: "Delivered in 2–4 days, $199 flat" },
];

const businessBenefits = [
  { icon: Zap, text: "15 minutes. We'll identify what's causing the most headaches in time & money, and how I'll fix it." },
  { icon: Clock, text: "Workflow automation and secure infrastructure" },
  { icon: Building2, text: "Reclaim 10-20 hours per week for your team" },
  { icon: Sparkles, text: "Strategy call included with assessment" },
];

// A/B Test: Spotlight CTA Variants
const spotlightCtaVariants = {
  control: 'Claim Your $199 Page',
  variant_a: 'Get Started for $199',
};

export default function SpotlightSection() {
  // A/B Testing
  const { variant: spotlightCtaVariant, trackConversion: trackSpotlightCta } = useExperiment('SPOTLIGHT_CTA');
  
  const spotlightCtaText = spotlightCtaVariants[spotlightCtaVariant as keyof typeof spotlightCtaVariants] || spotlightCtaVariants.control;
  
  return (
    <section id="spotlight" className="py-12 md:py-16 px-4 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <BlurFade inView>
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/20 p-8 md:p-12 shadow-lg overflow-hidden">
            {/* Subtle gradient glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl -z-10" />

            <BorderBeam size={200} duration={8} colorFrom="hsl(208, 100%, 50%)" colorTo="hsl(208, 100%, 70%)" borderWidth={2} />

            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3 text-center">
              Choose Your Path
            </p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Start where you are. Scale from there.
            </h2>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Left Column - Individual */}
              <div className="relative rounded-xl border border-primary/20 bg-card/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-sm font-mono text-primary uppercase tracking-wide">For Individuals</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Digital Identity Page
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">$199</p>
                
                <ul className="space-y-3 mb-6">
                  {individualBenefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-3">
                      <b.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{b.text}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="w-full h-12 text-base font-bold" onClick={() => trackSpotlightCta({ cta_variant: spotlightCtaVariant, offer: 'individual' })}>
                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                    {spotlightCtaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  No call required · Takes 2 min · <span className="text-muted-foreground/60">+3% fee for cards</span>
                </p>
              </div>

              {/* Right Column - Business */}
              <div className="relative rounded-xl border border-primary/30 bg-primary/5 p-6">
                <div className="absolute -top-3 right-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded">
                  MOST Popular
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-mono text-primary uppercase tracking-wide">For Businesses & Solopreneurs</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  AI Automation Assessment
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">From $599</p>
                
                <ul className="space-y-3 mb-6">
                  {businessBenefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-3">
                      <b.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{b.text}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90" onClick={() => trackEvent('spotlight_business_cta')}>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    Schedule Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  15-min call · Free consultation · <span className="text-muted-foreground/60">+3% fee for cards</span>
                </p>
              </div>

            </div>

            {/* Scarcity indicators */}
            <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Turnaround: 2-4 days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-green-500" />
                <span>47 claimed this month</span>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
