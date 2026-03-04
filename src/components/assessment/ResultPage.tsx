'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import type { Archetype } from '@/lib/assessment/archetypes';
import type { ScoreResult } from '@/lib/assessment/scoring';
import ScoreChart from './ScoreChart';

interface ResultPageProps {
  archetype: Archetype;
  scores: ScoreResult;
}

export default function ResultPage({ archetype, scores }: ResultPageProps) {
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
              >
                <Button size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.primaryCta.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href={archetype.primaryCta.href}>
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
              >
                <Button variant="outline" size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.secondaryCta.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            ) : (
              <Link href={archetype.secondaryCta.href}>
                <Button variant="outline" size="lg" className="font-bold w-full sm:w-auto">
                  {archetype.secondaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
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
