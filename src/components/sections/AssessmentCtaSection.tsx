'use client';
import Link from 'next/link';
import { ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { trackEvent } from '@/lib/analytics';

export default function AssessmentCtaSection() {
  return (
    <section className="py-20 md:py-24 bg-hp-deep border-y border-border/30 scroll-mt-20">
      <ScrollReveal className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white text-xs font-mono mb-3">
              <Brain className="w-3 h-3" />
              <span>Free Assessment</span>
            </div>
            <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              Not sure where to start?
            </h2>
            <p className="text-sm text-white/70 font-sans leading-relaxed">
              Take the 3-minute AI Readiness Assessment. 9 honest questions, a personalized diagnosis, and a clear next step.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/assessment" onClick={() => trackEvent('homepage_assessment_cta')}>
              <Button size="lg" className="font-bold">
                Take the Assessment
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
