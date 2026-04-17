'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, RotateCcw, Zap, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { trackConversion, trackEvent } from '@/lib/analytics';
import type { Archetype } from '@/lib/assessment/archetypes';
import type { ScoreResult } from '@/lib/assessment/scoring';
import ScoreChart from './ScoreChart';

interface ResultPageProps {
  archetype: Archetype;
  scores: ScoreResult;
}

// Personalized hard-sell CTAs based on archetype and score
const hardSellConfig: Record<string, {
  urgencyText: string;
  guaranteeText: string;
  priceAnchor: string;
  ctaLabel: string;
}> = {
  'stalled-executive': {
    urgencyText: 'Every week you wait costs your organization 10-20 hours per team member.',
    guaranteeText: '5+ hours/week returned guaranteed, or full refund.',
    priceAnchor: 'AI Assessment starts at $599',
    ctaLabel: 'Book Your AI Assessment — $599',
  },
  'curious-professional': {
    urgencyText: 'The AI skills gap is widening every month. Start building your edge now.',
    guaranteeText: 'First session satisfaction guaranteed, or your money back.',
    priceAnchor: 'Mentoring sessions from $97',
    ctaLabel: 'Book Your First Mentoring Session — $97',
  },
  'ready-builder': {
    urgencyText: 'Limited to 5 clients per month. Next available slot fills fast.',
    guaranteeText: 'Delivered in 2-4 days, or your money back.',
    priceAnchor: 'Flat $199',
    ctaLabel: 'Claim Your $199 Landing Page',
  },
  'overwhelmed-leader': {
    urgencyText: 'Your competitors are already moving. Every quarter of delay widens the gap.',
    guaranteeText: 'Strategy call is free. No commitment required.',
    priceAnchor: 'From $10,625 for organizational programs',
    ctaLabel: 'Book Your Free Strategy Call',
  },
};

export default function ResultPage({ archetype, scores }: ResultPageProps) {
  const hardSell = hardSellConfig[archetype.slug] || hardSellConfig['curious-professional'];
  const avgScore = (scores.clarity + scores.readiness + scores.urgency) / 3;
  const isLowReadiness = scores.readiness < 40;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Archetype badge */}
      <BlurFade inView delay={0.1}>
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            Your AI Readiness Profile
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-3">
            {archetype.name}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 font-sans leading-relaxed max-w-2xl mx-auto">
            {archetype.headline}
          </p>
        </div>
      </BlurFade>

      {/* Score visualization */}
      <BlurFade inView delay={0.2}>
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-foreground mb-5">
            Your scores
          </h2>
          <ScoreChart
            clarity={scores.clarity}
            readiness={scores.readiness}
            urgency={scores.urgency}
          />
        </div>
      </BlurFade>

      {/* Diagnosis */}
      <BlurFade inView delay={0.3}>
        <div className="space-y-5 mb-10">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
            What this means
          </h2>
          {archetype.diagnosis.map((paragraph, idx) => (
            <p key={idx} className="text-base md:text-lg text-foreground/80 font-sans leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </BlurFade>

      {/* CTAs */}
      <BlurFade inView delay={0.4}>
        <div className="bg-gradient-to-br from-primary/5 via-background to-primary/5 rounded-2xl border border-border p-6 md:p-8 mb-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-2">
            Your next step
          </h2>
          <p className="text-sm text-muted-foreground mb-6 font-sans">
            Based on your profile, here is what I recommend.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {archetype.primaryCta.external ? (
              <a
                href={archetype.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
                onClick={() => trackConversion('assessment_primary_cta')}
              >
                <Button size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.primaryCta.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href={archetype.primaryCta.href} onClick={() => trackConversion('assessment_primary_cta')}>
                <Button size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}

            {archetype.secondaryCta.external ? (
              <a
                href={archetype.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('assessment_secondary_cta')}
              >
                <Button variant="outline" size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.secondaryCta.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href={archetype.secondaryCta.href} onClick={() => trackEvent('assessment_secondary_cta')}>
                <Button variant="outline" size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.secondaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </BlurFade>

      {/* PERSONALIZED HARD SELL — conversion-focused section */}
      <BlurFade inView delay={0.5}>
        <motion.div
          className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 md:p-8 mb-8 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Urgency badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              Time-Sensitive
            </span>
          </div>

          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3 pr-20">
            {isLowReadiness ? "Don't let this sit on a shelf." : "You're closer than you think."}
          </h3>
          <p className="text-sm text-foreground/80 font-sans mb-4">
            {hardSell.urgencyText}
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{hardSell.guaranteeText}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{hardSell.priceAnchor}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full font-bold text-base h-12 bg-primary hover:bg-primary/90 shadow-lg"
            asChild
            onClick={() => trackConversion('assessment_hard_sell_click')}
          >
            <a href={archetype.primaryCta.href} target={archetype.primaryCta.external ? '_blank' : undefined} rel="noopener noreferrer">
              <Zap className="mr-2 h-4 w-4 fill-current" />
              {hardSell.ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </BlurFade>

      {/* Retake */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Retake the assessment
        </Link>
      </motion.div>
    </div>
  );
}
