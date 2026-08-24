"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Euro,
  DollarSign,
  FlaskConical,
  Target,
  Users,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { trackConversion } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { staggerContainer, staggerItem } from "@/lib/animation-variants";
import { motion, AnimatePresence } from "motion/react";
import { COACHING_PACKAGES, resolvePricing, type CurrencyCode } from "@/lib/pricing";
import { usePreferredCurrency } from "@/lib/hooks/usePreferredCurrency";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { CALENDAR_URL } from "@/lib/constants";
import { MENTORING_PILLARS } from "@/content/mentoring-pillars";

const ICON_MAP = {
  Lightbulb,
  FlaskConical,
  TrendingUp,
  Target,
  Users,
  Sparkles,
} as const;

const pillars = MENTORING_PILLARS.map((pillar) => ({
  ...pillar,
  icon: ICON_MAP[pillar.icon as keyof typeof ICON_MAP] ?? Lightbulb,
}));

const DEFAULT_VISIBLE = ["single", "pack-20"];
const EXPANDABLE = ["pack-5", "pack-10"];

const CurrencyIcon = ({ currency }: { currency: CurrencyCode }) =>
  currency === "EUR" ? (
    <Euro className="h-4 w-4 text-ink" />
  ) : (
    <DollarSign className="h-4 w-4 text-ink" />
  );

function PricingCard({
  pkg,
  currency,
}: {
  pkg: (typeof COACHING_PACKAGES)[number];
  currency: CurrencyCode;
}) {
  const price = resolvePricing(pkg, currency);
  const symbol = currency === "EUR" ? "€" : "$";

  return (
    <motion.div
      variants={staggerItem}
      className="relative bg-canvas border border-ink/10 transition-[border-color,transform] duration-300 hover:border-hp-electric/40 hover:-translate-y-0.5 flex flex-col"
      data-highlighted={pkg.popular ? "true" : "false"}
    >
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-[11px] font-mono text-graphite uppercase tracking-[0.25em] mb-2">
          {pkg.name}
        </h4>

        <div className="flex flex-wrap items-baseline gap-1 mb-1">
          <CurrencyIcon currency={currency} />
          <span className="text-4xl font-display font-bold text-ink tabular-nums tracking-tight">
            {price.total.toLocaleString()}
          </span>
          <span className="text-sm text-graphite tabular-nums">
            {pkg.sessions > 1
              ? ` (${symbol}${price.perSession}/session)`
              : `/session`}
          </span>
        </div>

        {/* 20-pack: no discount badge — premium coaching, not a coupon */}
        {price.savings > 0 && pkg.id !== "pack-20" && (
          <p className="text-xs font-medium text-hp-electric mb-3 tabular-nums">
            {`Save ${symbol}${price.savings}`}
            {pkg.discountPercent > 0 && ` (${pkg.discountPercent}% off)`}
          </p>
        )}

        <p className="text-xs text-graphite mb-3 tabular-nums font-mono uppercase tracking-wider">
          {pkg.sessions} {pkg.sessions === 1 ? "session" : "sessions"} · 60 min
          each
        </p>

        <p className="text-sm text-charcoal mb-5 leading-relaxed">
          {pkg.description}
        </p>

        <ul className="space-y-2 mb-6 flex-1">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-charcoal"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-hp-electric shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {pkg.upgradeNote && (
          <p className="text-xs text-graphite leading-relaxed mb-5 border-l-2 border-hp-electric/40 pl-3">
            {pkg.upgradeNote}{" "}
            <Link
              href="#services"
              className="text-hp-electric underline underline-offset-2 hover:text-hp-electric/80"
            >
              See the Build Sprint →
            </Link>
          </p>
        )}

        <BookCallButton
          size="sm"
          icon="calendar-days"
          iconClassName="mr-1.5 h-4 w-4"
          className="w-full h-11 text-sm font-semibold"
          location={`guidance_${pkg.id}`}
          value={price.total}
          trackOnClick={false}
          onClick={() => trackConversion(`guidance_${pkg.id}`, price.total, currency)}
          href={`${CALENDAR_URL}?utm_source=site&utm_medium=cta&utm_campaign=mentoring-${pkg.id}`}
        >
          {`Book ${pkg.sessions > 1 ? `${pkg.sessions}-Pack` : "Now"}`}
        </BookCallButton>
      </div>
    </motion.div>
  );
}

export default function MentoringSection() {
  // Prices follow the shared currency preference; the toggle lives in Services.
  const [currency, setCurrency] = usePreferredCurrency();
  const [showAll, setShowAll] = useState(false);

  const defaultPackages = COACHING_PACKAGES.filter((p) =>
    DEFAULT_VISIBLE.includes(p.id),
  );
  const expandablePackages = COACHING_PACKAGES.filter((p) =>
    EXPANDABLE.includes(p.id),
  );

  return (
    <section
      className="scroll-mt-20 bg-ink text-white"
    >
      {/* Ink band header */}
      <div className="relative px-4 pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-hp-electric"
          aria-hidden="true"
        />
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 font-display font-bold text-white/[0.04] text-[min(40vw,14rem)] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          1:1
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-bright mb-5">
            One-on-one AI guidance
          </p>
          <div className="mb-8"><CurrencyToggle currency={currency} onChange={setCurrency} /></div>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium tracking-tight leading-[0.98] text-white max-w-[16ch] mb-6">
            Working at the edge isn&apos;t solo work
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
            Most &quot;training&quot; hands you tools and leaves. This is a
            partnership. We build the mental models that make AI click, then
            test them live on your real work. You leave with judgment you keep.
          </p>
        </div>
      </div>

      {/* Pillars journey on cloud */}
      <div className="bg-cloud text-ink px-4 py-16 md:py-20">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-14 relative">
            <div
              className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-fog"
              aria-hidden="true"
            >
              <div className="h-full w-full bg-hp-electric" />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 md:gap-6 relative"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  variants={staggerItem}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center h-10 w-10 font-display text-lg font-bold bg-hp-electric text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <pillar.icon
                      className="h-5 w-5 text-hp-electric"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-charcoal text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pricing */}
          <BlurFade inView>
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-3">
                  Packages
                </p>
                <h3 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-ink tracking-tight leading-none">
                  Choose your path
                </h3>
                <p className="text-charcoal mt-3 max-w-md">
                  All sessions are 60 minutes, held via video call. Start where
                  you are.
                </p>
              </div>

              {/* Currency toggles live in Services only; both sections read
                  the same synced preference, so prices still follow. */}
            </div>
          </BlurFade>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl"
          >
            {defaultPackages.map((pkg) => (
              <PricingCard key={pkg.id} pkg={pkg} currency={currency} />
            ))}
          </motion.div>

          <div className="mb-8">
            <p className="text-sm text-charcoal mb-3">
              Not sure which fits? Start with a conversation.
            </p>
            <BookCallButton
              size="default"
              icon="calendar-days"
              iconClassName="mr-1.5 h-4 w-4"
              location="guidance_clarity_call"
            >
              Book a Call
            </BookCallButton>
          </div>

          <div className="mb-4">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-hp-electric hover:text-hp-deep transition-colors"
              aria-expanded={showAll}
            >
              {showAll ? "Hide options" : "View 5 and 10-session options"}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-3xl">
                  {expandablePackages.map((pkg) => (
                    <PricingCard key={pkg.id} pkg={pkg} currency={currency} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <BlurFade inView delay={0.2}>
            <details className="group mt-2 border border-ink/10 bg-canvas overflow-hidden">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 hover:bg-cloud transition-colors">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-graphite mb-1">
                    Compare what&apos;s inside
                  </p>
                  <p className="text-base font-display font-semibold text-ink">
                    Side-by-side feature comparison
                  </p>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-hp-electric group-open:hidden">
                  Expand
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-hp-electric hidden group-open:inline">
                  Collapse
                </span>
              </summary>
              <div className="border-t border-ink/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-graphite">
                        What you get
                      </th>
                      <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-graphite text-center">
                        Single
                      </th>
                      <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-graphite text-center">
                        5-pack
                      </th>
                      <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-graphite text-center">
                        10-pack
                      </th>
                      <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-graphite text-center">
                        20-pack
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        {
                          label: "Coaching hours",
                          single: "~1 hr",
                          five: "~5 hrs",
                          ten: "~10–15 hrs",
                          twenty: "~20–40 hrs",
                        },
                        {
                          label: "Practical exercises",
                          single: "Solve your current bottleneck",
                          five: "Build 1 automation from scratch",
                          ten: "Design a multi-step workflow",
                          twenty: "Design your first AI-powered offering",
                        },
                        {
                          label: "Personalised feedback",
                          single: "In-session guidance",
                          five: "In-session + summary",
                          ten: "Session + mid-pack review",
                          twenty: "Personalized 1:1 + between-session follow-up",
                        },
                        {
                          label: "Frameworks & templates",
                          single: "Session notes + 3 action items",
                          five: "Prompts + mini-playbook",
                          ten: "Full toolkit + checklists",
                          twenty: "Core frameworks + deployable playbook templates",
                        },
                        {
                          label: "Post-package resources",
                          single: "Session summary",
                          five: "Summary guide + prompts",
                          ten: "Toolkit + community access",
                          twenty: "Full library + alumni support",
                        },
                        {
                          label: "Skill compounding",
                          single: "Solve one problem",
                          five: "Foundational literacy",
                          ten: "Noticeable independence",
                          twenty: "Independent AI judgment",
                        },
                      ] as const
                    ).map((row, idx) => (
                      <tr
                        key={row.label}
                        className={idx % 2 === 0 ? "bg-cloud/80" : ""}
                      >
                        <td className="px-6 py-3 font-medium text-charcoal">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-center text-charcoal">
                          {row.single}
                        </td>
                        <td className="px-4 py-3 text-center text-charcoal">
                          {row.five}
                        </td>
                        <td className="px-4 py-3 text-center text-charcoal">
                          {row.ten}
                        </td>
                        <td className="px-4 py-3 text-center text-charcoal">
                          {row.twenty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            <div className="border-t border-ink/10 px-6 py-5 bg-hp-electric/[0.04]">
              <p className="text-[11px] font-mono uppercase tracking-widest text-hp-electric mb-2">
                Only in the 8-Week Build Sprint
              </p>
              <p className="text-sm text-charcoal leading-relaxed mb-3">
                These come with the{" "}
                <Link href="#services" className="text-hp-electric underline underline-offset-2">
                  Build Sprint
                </Link>
                , not with any session pack:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {[
                  "Structured build playbook",
                  "Hands-on co-building",
                  "Launch accountability",
                  "Async build support (not just Q&A)",
                  "Infrastructure migration help",
                  "Personal brand framework",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-graphite">
                    <span className="text-hp-electric font-mono shrink-0 mt-px">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </details>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
