"use client";

import { useState } from 'react';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { Calculator, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCallButton } from '@/components/ui/BookCallButton';
import { trackEvent, trackConversion } from '@/lib/analytics';


const commonAutomations = [
  {
    id: 'email-triage',
    label: 'Email triage & drafting',
    hoursPerWeek: 5,
    description: 'Sorting, prioritizing, and drafting responses to routine emails',
  },
  {
    id: 'meeting-notes',
    label: 'Meeting notes & action items',
    hoursPerWeek: 3,
    description: 'Transcribing, summarizing, and distributing meeting outcomes',
  },
  {
    id: 'data-entry',
    label: 'Data entry & CRM updates',
    hoursPerWeek: 4,
    description: 'Manual data transfer between systems and CRM maintenance',
  },
  {
    id: 'reporting',
    label: 'Report generation',
    hoursPerWeek: 3,
    description: 'Compiling data from multiple sources into weekly/monthly reports',
  },
  {
    id: 'scheduling',
    label: 'Scheduling & calendar management',
    hoursPerWeek: 2,
    description: 'Coordinating meetings, managing conflicts, sending reminders',
  },
  {
    id: 'client-queries',
    label: 'Client query responses',
    hoursPerWeek: 6,
    description: 'Answering repetitive questions via email, chat, or phone',
  },
  {
    id: 'document-creation',
    label: 'Document & template creation',
    hoursPerWeek: 3,
    description: 'Drafting proposals, contracts, and standard documents',
  },
  {
    id: 'social-media',
    label: 'Social media & content drafting',
    hoursPerWeek: 4,
    description: 'Writing posts, scheduling content, responding to comments',
  },
];

export default function ROICalculatorSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [teamSize, setTeamSize] = useState(1);

  const toggleAutomation = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hoursPerWeek = commonAutomations
    .filter(a => selected.has(a.id))
    .reduce((sum, a) => sum + a.hoursPerWeek, 0);

  const hoursPerMonth = hoursPerWeek * 4;
  const hoursPerYear = hoursPerWeek * 52;
  const teamHoursPerYear = hoursPerYear * teamSize;

  const hasResults = selected.size > 0;

  return (
    <section id="roi-calculator" className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground/60 font-mono mb-3">Time Savings Estimator</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              How Many Hours Could You Save?
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Pick the tasks your team does every week. See what automation could give back.
            </p>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Automation checklist */}
          <BlurFade inView>
            <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-bold text-foreground">Select Your Tasks</h3>
              </div>

              <div className="space-y-3">
                {commonAutomations.map((automation) => {
                  const isSelected = selected.has(automation.id);
                  return (
                    <motion.button
                      key={automation.id}
                      onClick={() => toggleAutomation(automation.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-[border-color,background-color] duration-150 ${
                        isSelected
                          ? 'border-primary/40 bg-primary/5'
                          : 'border-border/40 bg-background hover:border-border'
                      }`}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {automation.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{automation.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                          <span className="text-xs font-mono text-muted-foreground">~{automation.hoursPerWeek}h/wk</span>
                          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-primary border-primary' : 'border-border'
                          }`}>
                            {isSelected && (
                              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Team size */}
              <div className="mt-6 pt-6 border-t border-border/40">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  How many people on your team do these tasks?
                </label>
                <div className="flex items-center gap-4">
                  <button
                    aria-label="Decrease team size"
                    onClick={() => setTeamSize(prev => Math.max(1, prev - 1))}
                    className="h-10 w-10 rounded-lg border border-border bg-background hover:bg-muted transition-colors duration-150 font-bold text-foreground"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-primary w-12 text-center tabular-nums">{teamSize}</span>
                  <button
                    aria-label="Increase team size"
                    onClick={() => setTeamSize(prev => prev + 1)}
                    className="h-10 w-10 rounded-lg border border-border bg-background hover:bg-muted transition-colors duration-150 font-bold text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Right: Results */}
          <BlurFade inView delay={0.15}>
            <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8 lg:sticky lg:top-24">
              <h3 className="font-heading font-bold text-foreground mb-6">Your Estimated Savings</h3>

              {!hasResults ? (
                <p className="text-muted-foreground text-sm">Select at least one task to see your estimate.</p>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-primary tabular-nums">{hoursPerWeek}h</p>
                      <p className="text-xs text-muted-foreground">Per week</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-primary tabular-nums">{hoursPerMonth}h</p>
                      <p className="text-xs text-muted-foreground">Per month</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-primary tabular-nums">{hoursPerYear.toLocaleString()}h</p>
                      <p className="text-xs text-muted-foreground">Per person / year</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <p className="text-2xl font-bold text-primary tabular-nums">{teamHoursPerYear.toLocaleString()}h</p>
                      <p className="text-xs text-muted-foreground tabular-nums">Team of {teamSize} / year</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
                    <Clock className="h-6 w-6 text-primary mx-auto mb-2" aria-hidden="true" />
                    <p className="text-2xl font-semibold text-primary tabular-nums">
                      {hoursPerWeek} hours per week per person
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 tabular-nums">
                      {teamHoursPerYear.toLocaleString()} hours per year for your team of {teamSize}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-3">
                      Planning estimate, not a forecast. Actual recovery depends on workflow, tooling, and adoption.
                    </p>
                  </div>

                  <BookCallButton
                    location="roi_estimate"
                    variant="outline"
                    size="lg"
                    icon="arrow"
                    iconClassName="ml-2 h-4 w-4"
                    className="w-full"
                  >
                    Book a Call to Discuss Your Estimate
                  </BookCallButton>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
