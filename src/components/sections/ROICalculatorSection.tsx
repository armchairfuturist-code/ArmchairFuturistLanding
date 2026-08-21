"use client";

import { useMemo, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Clock } from "lucide-react";
import { BookCallButton } from "@/components/ui/BookCallButton";
import {
  COMMON_AUTOMATIONS,
  calculateROI,
  clampTeamSize,
  toggleSelection,
} from "@/lib/roi-calculator";

/**
 * Thin UI adapter over the ROI Calculator module.
 */
export default function ROICalculatorSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [teamSize, setTeamSize] = useState(1);

  const projection = useMemo(
    () =>
      calculateROI({
        selectedIds: Array.from(selected),
        teamSize,
      }),
    [selected, teamSize],
  );

  const {
    hoursPerWeek,
    hoursPerMonth,
    hoursPerYear,
    teamHoursPerYear,
    hasResults,
  } = projection;

  return (
    <section
      id="roi-calculator"
      className="py-12 md:py-20 bg-canvas scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <BlurFade inView>
          <div className="mb-12 grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                Time savings estimator
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium tracking-tight leading-[0.98] text-ink">
                How many hours could you save?
              </h2>
            </div>
            <p className="md:col-span-5 text-lg text-charcoal md:text-right max-w-sm md:ml-auto">
              Pick the tasks your team does every week. See what automation
              could give back.
            </p>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-8">
          <BlurFade inView>
            <div className="bg-canvas rounded-hp-xl border border-hairline p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-hp-electric" />
                <h3 className="font-heading font-medium text-ink">
                  Select Your Tasks
                </h3>
              </div>

              <div className="space-y-3">
                {COMMON_AUTOMATIONS.map((automation) => {
                  const isSelected = selected.has(automation.id);
                  return (
                    <motion.button
                      key={automation.id}
                      onClick={() =>
                        setSelected((prev) => toggleSelection(prev, automation.id))
                      }
                      aria-pressed={isSelected}
                      className={`w-full text-left p-4 rounded-hp-md border transition-[border-color,background-color] duration-150 ${
                        isSelected
                          ? "border-hp-electric/40 bg-hp-electric/5"
                          : "border-hairline-strong/60 bg-canvas hover:border-hairline-strong"
                      }`}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className={`font-medium text-sm ${
                              isSelected ? "text-hp-electric" : "text-ink"
                            }`}
                          >
                            {automation.label}
                          </p>
                          <p className="text-xs text-graphite mt-0.5">
                            {automation.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <Clock
                            className="h-3.5 w-3.5 text-graphite"
                            aria-hidden="true"
                          />
                          <span className="text-xs font-mono text-graphite">
                            ~{automation.hoursPerWeek}h/wk
                          </span>
                          <div
                            className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-hp-electric border-hp-electric"
                                : "border-hairline-strong"
                            }`}
                          >
                            {isSelected && (
                              <svg
                                className="h-3 w-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-hairline-strong/60">
                <label className="text-sm font-medium text-ink mb-2 block">
                  How many people on your team do these tasks?
                </label>
                <div className="flex items-center gap-4">
                  <button
                    aria-label="Decrease team size"
                    onClick={() =>
                      setTeamSize((prev) => clampTeamSize(prev - 1))
                    }
                    className="h-10 w-10 rounded-hp-md border border-hairline-strong bg-canvas hover:bg-cloud transition-colors duration-150 font-semibold text-ink"
                  >
                    -
                  </button>
                  <span className="text-2xl font-medium text-hp-electric w-12 text-center tabular-nums">
                    {teamSize}
                  </span>
                  <button
                    aria-label="Increase team size"
                    onClick={() =>
                      setTeamSize((prev) => clampTeamSize(prev + 1))
                    }
                    className="h-10 w-10 rounded-hp-md border border-hairline-strong bg-canvas hover:bg-cloud transition-colors duration-150 font-semibold text-ink"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.15}>
            <div
              className="bg-canvas rounded-hp-xl border border-hairline p-6 md:p-8 lg:sticky lg:top-24"
              aria-live="polite"
            >
              <h3 className="font-heading font-medium text-ink mb-6">
                Your Estimated Savings
              </h3>

              <AnimatePresence mode="wait">
                {!hasResults ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-graphite text-sm"
                  >
                    Select at least one task to see your estimate.
                  </motion.p>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-hp-lg bg-cloud">
                        <p className="text-2xl font-medium text-hp-electric tabular-nums">
                          {hoursPerWeek}h
                        </p>
                        <p className="text-xs text-graphite">Per week</p>
                      </div>
                      <div className="p-4 rounded-hp-lg bg-cloud">
                        <p className="text-2xl font-medium text-hp-electric tabular-nums">
                          {hoursPerMonth}h
                        </p>
                        <p className="text-xs text-graphite">
                          Per month
                        </p>
                      </div>
                      <div className="p-4 rounded-hp-lg bg-cloud">
                        <p className="text-2xl font-medium text-hp-electric tabular-nums">
                          {hoursPerYear.toLocaleString()}h
                        </p>
                        <p className="text-xs text-graphite">
                          Per person / year
                        </p>
                      </div>
                      <div className="p-4 rounded-hp-lg bg-hp-electric/10 border border-hp-electric/20">
                        <p className="text-2xl font-medium text-hp-electric tabular-nums">
                          {teamHoursPerYear.toLocaleString()}h
                        </p>
                        <p className="text-xs text-graphite tabular-nums">
                          Team of {teamSize} / year
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-hp-lg bg-hp-electric/5 border border-hp-electric/20 text-center">
                      <Clock
                        className="h-6 w-6 text-hp-electric mx-auto mb-2"
                        aria-hidden="true"
                      />
                      <p className="text-2xl font-semibold text-hp-electric tabular-nums">
                        {hoursPerWeek} hours per week per person
                      </p>
                      <p className="text-sm text-graphite mt-1 tabular-nums">
                        {teamHoursPerYear.toLocaleString()} hours per year for
                        your team of {teamSize}
                      </p>
                      <p className="text-xs text-graphite/80 mt-3">
                        Planning estimate, not a forecast. Actual recovery
                        depends on workflow, tooling, and adoption.
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
                      Book a Call
                    </BookCallButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
