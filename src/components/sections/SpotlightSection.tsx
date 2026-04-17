"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, FileText, Link2, Sparkles, Clock, Building2, User } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { useExperiment } from '@/hooks/useExperiment';
import { GOOGLE_FORM_URL, CALENDAR_URL } from '@/lib/constants';

const individualBenefits = [
  { icon: Globe, text: "A professional site you own, not a Linktree" },
  { icon: FileText, text: "Your LinkedIn vibe + resume, translated into one platform" },
  { icon: Link2, text: "Social links, portfolio, and interview-ready storyline" },
  { icon: Sparkles, text: "Delivered in 2–4 days, $199 flat" },
];

const businessBenefits = [
  { icon: Clock, text: "15 minutes to identify your biggest bottlenecks and how AI can fix them" },
  { icon: Building2, text: "Workflow automation and secure infrastructure" },
  { icon: Sparkles, text: "Reclaim 10-20 hours per week for your team" },
  { icon: Building2, text: "Strategy call included with assessment" },
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
          <div className="border border-border p-8 md:p-12">

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
              Two ways to start
            </h2>

            {/* Two-column layout - asymmetric sizing for visual interest */}
            <div className="grid md:grid-cols-5 gap-8">

              {/* Left Column - Individual (narrower) */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wide">For Individuals</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Digital Identity Page
                </h3>
                <p className="text-3xl font-black text-primary mb-4">$199</p>
                
                <ul className="space-y-2 mb-6">
                  {individualBenefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-2">
                      <b.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{b.text}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={GOOGLE_FORM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackSpotlightCta({ cta_variant: spotlightCtaVariant, offer: 'individual' })}
                  className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 font-semibold text-sm hover:bg-foreground hover:text-background transition-colors"
                >
                  {spotlightCtaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <p className="text-xs text-muted-foreground mt-3">
                  No call required · 2-4 days delivery
                </p>
              </div>

              {/* Right Column - Business (wider, featured) */}
              <div className="md:col-span-3 border-l pl-8 md:pl-12">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wide">For Businesses</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  AI Automation Assessment
                </h3>
                <p className="text-3xl font-black text-primary mb-4">From $599</p>
                
                <ul className="space-y-2 mb-6">
                  {businessBenefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-2">
                      <b.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{b.text}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={CALENDAR_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('spotlight_business_cta')}
                  className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Schedule Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <p className="text-xs text-muted-foreground mt-3">
                  15-min call · Free consultation
                </p>
              </div>

            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
