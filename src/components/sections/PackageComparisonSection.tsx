"use client";

import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { Check, Minus, Sparkles, ArrowRight, Brain, CalendarDays } from 'lucide-react';
import { Settings, Building2, RefreshCw } from 'lucide-react';
import { CALENDAR_URL } from '@/lib/constants';

interface FeatureRow {
  label: string;
  five: string | boolean;
  ten: string | boolean;
  twenty: string | boolean;
}

const categories = [
  {
    icon: Brain,
    label: 'Understanding AI & Prompting',
    features: [
      { label: 'How LLMs actually work (not the hype)', five: 'Core concepts', ten: 'Deep understanding', twenty: 'Full mental model' },
      { label: 'Prompt engineering fundamentals', five: 'Structure, context, iteration', ten: 'Advanced techniques', twenty: 'Mastery' },
      { label: 'Why AI hallucinates — how to catch it', five: 'High-level awareness', ten: 'Verification frameworks', twenty: 'Systematic truth-checking' },
      { label: 'Adversarial prompting (making AI disagree)', five: false, ten: 'Introduction', twenty: 'Built into every session' },
    ],
  },
  {
    icon: Settings,
    label: 'Applying AI to Real Work',
    features: [
      { label: 'Using AI as a thinking partner, not a crutch', five: 'Introduction', ten: 'Daily practice', twenty: 'Automatic habit' },
      { label: 'The Feynman method: explaining concepts to AI', five: false, ten: 'Learn the technique', twenty: 'Mastery across any domain' },
      { label: 'Building agentic workflows (chains, routing, reflection)', five: false, ten: 'Core patterns', twenty: 'Full agentic design toolkit' },
      { label: 'Tool use & function calling', five: false, ten: 'Introduction', twenty: 'Hands-on implementation' },
      { label: 'Human-in-the-loop design', five: false, ten: false, twenty: 'Production-ready patterns' },
    ],
  },
  {
    icon: Building2,
    label: 'Organisational & Strategic',
    features: [
      { label: 'Why AI fails at chaotic companies — how to fix it', five: 'Awareness', ten: 'Diagnosis tools', twenty: 'Full transformation roadmap' },
      { label: 'Defining goals AI can actually execute on', five: 'Basic framework', ten: 'Structured process', twenty: 'Org-wide clarity system' },
      { label: 'Building self-aware teams and workflows', five: false, ten: 'Assessment', twenty: 'Continuous improvement loop' },
      { label: 'Leading AI adoption in your organisation', five: false, ten: false, twenty: 'Change management & scaling' },
    ],
  },
  {
    icon: RefreshCw,
    label: 'The Settingsnitive Growth Protocol',
    features: [
      { label: 'Think first, prompt second', five: 'Core habit', ten: 'Embedded', twenty: 'Automatic' },
      { label: 'Verify load-bearing claims', five: 'Introduction', ten: 'Structured practice', twenty: 'Second nature' },
      { label: 'Write synthesis without AI open', five: 'Awareness', ten: 'Regular practice', twenty: 'Non-negotiable habit' },
      { label: 'Compounding skill vs. skill erosion', five: 'Understand the fork', ten: 'Choosing growth daily', twenty: 'Leading others to growth' },
    ],
  },
];

const quickCompare = [
  { label: 'Coaching hours', five: '~5 hrs', ten: '~10–15 hrs', twenty: '~20–40 hrs' },
  { label: 'Practical exercises', five: 'Guided demos', ten: 'Your real work', twenty: 'Real projects end-to-end' },
  { label: 'Personalised feedback', five: 'Session-based', ten: 'Session + reviews', twenty: 'Deep 1:1 + async support' },
  { label: 'Frameworks & templates', five: 'Core prompts & guides', ten: 'Full toolkit + checklists', twenty: 'Complete system + playbooks' },
  { label: 'Post-package resources', five: 'Summary guide', ten: 'Toolkit + community', twenty: 'Full library + support' },
  { label: 'Skill compounding', five: 'Foundational', ten: 'Noticeable growth', twenty: 'Exponential' },
  ];

function Cell({ content }: { content: string | boolean }) {
  if (content === false) {
    return <Minus className="h-4 w-4 text-muted-foreground/30 mx-auto shrink-0" aria-hidden="true" />;
  }
  return (
    <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed block break-words">
      {typeof content === 'string' ? content : ''}
    </span>
  );
}

function ColumnHeader({ label, sessions, price, popular }: { label: string; sessions: string; price: string; popular?: boolean }) {
  return (
    <div className={`text-center p-3 sm:p-4 rounded-lg ${popular ? 'bg-primary/5 ring-1 ring-primary/20' : 'bg-muted/50'}`}>
      {popular && (
        <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
          <Sparkles className="h-2.5 w-2.5" />
          Most Popular
        </span>
      )}
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</div>
      <div className="text-lg sm:text-xl font-heading font-bold text-foreground mt-0.5">{sessions}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{price}</div>
    </div>
  );
}

export default function PackageComparisonSection() {
  return (
    <section id="package-comparison" className="py-16 md:py-24 px-4 bg-background scroll-mt-20">
      <div className="container max-w-6xl mx-auto">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-3">
              Compare Packages
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              See what's included
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Not all packages are created equal. Here&apos;s exactly what you&apos;ll learn at each level.
            </p>
          </div>
        </BlurFade>

        {/* Column headers */}
        <BlurFade inView delay={0.1}>
          <div role="table" className="hidden md:grid grid-cols-[200px_1fr_1fr_1fr] gap-3 mb-6 items-start">
            <div role="columnheader" />
            <div role="columnheader"><ColumnHeader label="Foundation" sessions="5 Sessions" price="$570" /></div>
            <div role="columnheader"><ColumnHeader label="Accelerator" sessions="10 Sessions" price="$1,100" /></div>
            <div role="columnheader"><ColumnHeader label="Transformation" sessions="20 Sessions" price="$2,000" popular /></div>
          </div>

          {/* Mobile column headers */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4">
            <div role="table" className="min-w-[500px] grid grid-cols-[140px_1fr_1fr_1fr] gap-2 mb-6">
              <div role="columnheader" />
              <div role="columnheader"><ColumnHeader label="Foundation" sessions="5" price="$570" /></div>
              <div role="columnheader"><ColumnHeader label="Accelerator" sessions="10" price="$1,100" /></div>
              <div role="columnheader"><ColumnHeader label="Transformation" sessions="20" price="$2,000" popular /></div>
            </div>
          </div>
        </BlurFade>

        {/* Category groups */}
        {categories.map((category, ci) => (
          <BlurFade key={category.label} inView delay={0.1 + ci * 0.08}>
            <div className="mb-8">
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <category.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{category.label}</h3>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              {/* Desktop table */}
              <div role="table" className="hidden md:grid grid-cols-[200px_1fr_1fr_1fr] gap-3">
                {category.features.map((row, ri) => (
                  <div key={ri} role="row" className="contents">
                    <div role="cell" className="text-xs sm:text-sm text-foreground font-medium py-2 flex items-center">
                      {row.label}
                    </div>
                    <div role="cell" className="py-2 flex items-center"><Cell content={row.five} /></div>
                    <div role="cell" className="py-2 flex items-center bg-primary/[0.02] rounded px-2"><Cell content={row.ten} /></div>
                    <div role="cell" className="py-2 flex items-center"><Cell content={row.twenty} /></div>
                  </div>
                ))}
              </div>

              {/* Mobile table — horizontally scrollable */}
              <div className="md:hidden overflow-x-auto -mx-4 px-4">
                <div role="table" className="min-w-[500px]">
                  {category.features.map((row) => (
                    <div key={row.label} role="row" className="grid grid-cols-[140px_1fr_1fr_1fr] gap-2 py-2 border-b border-border/40 last:border-0 items-start">
                      <span role="cell" className="text-[11px] text-foreground font-medium leading-snug">{row.label}</span>
                      <Cell content={row.five} />
                      <Cell content={row.ten} />
                      <Cell content={row.twenty} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}

        {/* Quick comparison summary */}
        <BlurFade inView delay={0.4}>
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 text-center">Quick Comparison</h3>
            <div role="table" className="hidden md:grid grid-cols-[200px_1fr_1fr_1fr] gap-3">
              {quickCompare.map((row) => (
                <div key={row.label} role="row" className="contents">
                  <div role="cell" className="text-xs sm:text-sm text-foreground font-medium py-2 flex items-center">{row.label}</div>
                  <div role="cell" className="py-2 flex items-center"><span className="text-xs sm:text-sm text-foreground/80">{row.five}</span></div>
                  <div role="cell" className="py-2 flex items-center bg-primary/[0.02] rounded px-2"><span className="text-xs sm:text-sm text-foreground/80">{row.ten}</span></div>
                  <div role="cell" className="py-2 flex items-center"><span className="text-xs sm:text-sm text-foreground/80">{row.twenty}</span></div>
                </div>
              ))}
            </div>
            <div className="md:hidden overflow-x-auto -mx-4 px-4">
              <div role="table" className="min-w-[500px]">
                {quickCompare.map((row) => (
                  <div key={row.label} role="row" className="grid grid-cols-[140px_1fr_1fr_1fr] gap-2 py-2 border-b border-border/40 last:border-0 items-start">
                    <span role="cell" className="text-[11px] text-foreground font-medium leading-snug">{row.label}</span>
                    <span role="cell" className="text-[11px] text-foreground/70 leading-snug">{row.five}</span>
                    <span role="cell" className="text-[11px] text-foreground/70 leading-snug">{row.ten}</span>
                    <span role="cell" className="text-[11px] text-foreground/70 leading-snug">{row.twenty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Progression visualization */}
        <BlurFade inView delay={0.5}>
          <div className="mt-16 bg-muted/50 rounded-xl p-6 sm:p-8 border border-border">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: '5 Sessions',
                  sub: 'Foundation',
                  what: 'You learn WHAT AI can do and how to prompt it safely.',
                  outcome: 'Awareness and a solid foundation.',
                },
                {
                  label: '10 Sessions',
                  sub: 'Accelerator',
                  what: 'You learn HOW to make AI work for you daily — and spot when it\'s wrong.',
                  outcome: 'A working toolkit and practice routine.',
                },
                {
                  label: '20 Sessions',
                  sub: 'Transformation',
                  what: 'You learn WHY and SYSTEM — and can teach others. Your entire approach to work transforms.',
                  outcome: 'You architect AI-powered systems and compound skills faster every month.',
                  popular: true,
                },
              ].map((col) => (
                <div
                  key={col.label}
                  className={`text-center p-4 rounded-lg ${col.popular ? 'bg-primary/5 ring-1 ring-primary/20' : ''}`}
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{col.sub}</span>
                  <div className="text-xl font-heading font-bold text-foreground mt-0.5">{col.label}</div>
                  <ArrowRight className="h-4 w-4 text-primary mx-auto my-3" />
                  <p className="text-xs text-foreground/80 leading-relaxed mb-2">{col.what}</p>
                  <p className="text-xs font-medium text-foreground">{col.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Bottom CTA */}
        <BlurFade inView delay={0.6}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-4">
              Still unsure? Book a free 15-minute call — we&apos;ll find the right package for your goals.
            </p>
            <Button asChild size="lg" className="h-12 px-8 text-base font-bold">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Free Call
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
