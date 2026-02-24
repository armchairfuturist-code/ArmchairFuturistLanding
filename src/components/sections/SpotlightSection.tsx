"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, FileText, Link2, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const benefits = [
  { icon: Globe, text: "A professional site you own — not a Linktree" },
  { icon: FileText, text: "Your LinkedIn vibe + resume, translated into one platform" },
  { icon: Link2, text: "Social links, portfolio, and interview-ready storyline" },
  { icon: Sparkles, text: "Delivered in 2–4 days, $199 flat" },
];

export default function SpotlightSection() {
  return (
    <section className="py-12 md:py-16 px-4 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/20 p-8 md:p-12 shadow-lg">
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-xl -z-10" />

          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-3">
            Entry Offer
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Not ready for a strategy call? Start here.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Your resume is not enough in 2026. I build you an interview-ready digital identity site — one high-signal platform you own.
          </p>

          <ul className="space-y-4 mb-8">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-start gap-3">
                <b.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="h-12 px-6 text-base font-bold">
              <a href="#services" onClick={() => trackEvent('spotlight_claim_199')}>
                Claim Your $199 Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground self-center">
              No call required — just scroll to services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
