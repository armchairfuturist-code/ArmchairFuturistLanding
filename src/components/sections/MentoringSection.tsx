"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Lightbulb, TrendingUp, CalendarDays, CheckCircle2, Sparkles, Euro, DollarSign } from 'lucide-react';
import { trackConversion, trackEvent } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { COACHING_PACKAGES, type CurrencyCode } from '@/lib/pricing';
// Inline currency toggle — no separate component needed

const pillars = [
  {
    icon: Heart,
    title: "From Fear to Understanding",
    description: "AI anxiety is real and valid. We start by acknowledging what you're feeling. Then we replace uncertainty with clarity about what AI actually means for your work and life."
  },
  {
    icon: Lightbulb,
    title: "From Understanding to Agency",
    description: "Once the fog lifts, we build your personal AI literacy. Not generic training, but the specific skills and mental models that matter for your role and ambitions."
  },
  {
    icon: TrendingUp,
    title: "From Agency to Optimism",
    description: "The future isn't something that happens to you. With the right frame, AI becomes a lever for your goals: more time, more creative output, more impact."
  }
];

// Compact comparison matrix — absorbed from PackageComparisonSection
const quickCompare = [
  { label: "Coaching hours", five: "~5 hrs", ten: "~10–15 hrs", twenty: "~20–40 hrs" },
  { label: "Practical exercises", five: "Guided demos", ten: "Your real work", twenty: "Real projects end-to-end" },
  { label: "Personalised feedback", five: "Session-based", ten: "Session + reviews", twenty: "Deep 1:1 + async support" },
  { label: "Frameworks & templates", five: "Core prompts & guides", ten: "Full toolkit + checklists", twenty: "Complete system + playbooks" },
  { label: "Post-package resources", five: "Summary guide", ten: "Toolkit + community", twenty: "Full library + support" },
  { label: "Skill compounding", five: "Foundational", ten: "Noticeable growth", twenty: "Exponential" },
];

const CurrencyIcon = ({ currency }: { currency: CurrencyCode }) =>
  currency === 'EUR' ? <Euro className="h-4 w-4 text-foreground" /> : <DollarSign className="h-4 w-4 text-foreground" />;

export default function MentoringSection() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('af_currency');
    if (saved === 'EUR' || saved === 'USD') {
      setCurrency(saved);
    } else {
      try {
        const locale = navigator.language;
        const region = locale.split('-')[1] || '';
        const euroCountries = ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'HR'];
        if (euroCountries.includes(region.toUpperCase())) {
          setCurrency('EUR');
        } else {
          setCurrency('USD');
        }
      } catch {
        setCurrency('USD');
      }
    }
  }, []);

  const handleCurrencyChange = useCallback((c: CurrencyCode) => {
    setCurrency(c);
    localStorage.setItem('af_currency', c);
  }, []);

  const fmtPrice = (eur: number, usd: number) =>
    currency === 'EUR' ? `€${eur.toLocaleString()}` : `$${usd.toLocaleString()}`;

  return (
    <section id="ai-guidance" className="py-16 md:py-24 px-4 bg-secondary scroll-mt-20">
      <div className="container max-w-5xl mx-auto">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2">Last updated: May 2026</p>
            <p className="text-sm font-mono text-primary uppercase tracking-widest mb-3">
              One-on-One AI Guidance
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Navigating the edge isn&apos;t a solo endeavor
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Most &quot;training&quot; teaches tools. This is different. Whether you&apos;re
              a seasoned executive or early in your career, the real barrier
              isn&apos;t technical&mdash;it&apos;s the story you&apos;re telling yourself about
              what&apos;s coming. I help you rewrite that story, one conversation at a
              time.
            </p>
          </div>
        </BlurFade>

        {/* Three pillars — staggered journey */}
        <div className="mb-16 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10" />

          <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className={`relative bg-background rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 cursor-pointer ${
                  index === 1 ? 'md:mt-8' : index === 2 ? 'md:mt-4' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Step number badge */}
                <div className="absolute -top-3 left-4">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                    {index + 1}
                  </span>
                </div>
                <pillar.icon className="h-8 w-8 text-primary mb-4 mt-1" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing packages */}
        <BlurFade inView>
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Choose your path
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-4">
              All sessions are 60 minutes, held via video call. Pick the commitment that fits your goals.
            </p>
            {/* Currency toggle — prominent so users notice pricing is region-aware */}
            <div className="flex justify-center mt-2">
              <div className="inline-flex items-center gap-1.5 bg-background border-2 border-primary/30 rounded-full p-1.5 text-sm font-semibold shadow-sm">
                <button
                  onClick={() => handleCurrencyChange('USD')}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full transition-all duration-200 ${
                    currency === 'USD'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                  aria-pressed={currency === 'USD'}
                  aria-label="Show prices in US Dollars"
                >
                  <DollarSign className="h-4 w-4" aria-hidden="true" />
                  USD
                </button>
                <button
                  onClick={() => handleCurrencyChange('EUR')}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full transition-all duration-200 ${
                    currency === 'EUR'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                  aria-pressed={currency === 'EUR'}
                  aria-label="Show prices in Euros"
                >
                  <Euro className="h-4 w-4" aria-hidden="true" />
                  EUR
                </button>
              </div>
            </div>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {COACHING_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`relative bg-background rounded-xl border ${
                pkg.popular
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-border'
              } transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
            >
              {/* Most Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Package name */}
                <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  {pkg.name}
                </h4>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <CurrencyIcon currency={currency} />
                  <span className="text-3xl font-heading font-bold text-foreground">
                    {currency === 'EUR'
                      ? pkg.totalPrice.toLocaleString()
                      : pkg.totalPriceUSD.toLocaleString()
                    }
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {pkg.sessions > 1
                      ? ` (${currency === 'EUR' ? '€' : '$'}${currency === 'EUR' ? pkg.pricePerSession : pkg.pricePerSessionUSD}/session)`
                      : `/${currency === 'EUR' ? 'session' : 'session'}`}
                  </span>
                </div>

                {/* Savings badge */}
                {pkg.savings > 0 && (
                  <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-3">
                    {currency === 'EUR'
                      ? `Save €${pkg.savings}`
                      : `Save $${pkg.savingsUSD}`
                    }
                    {pkg.discountPercent > 0 && ` — ${pkg.discountPercent}% off`}
                  </p>
                )}

                {/* Sessions count */}
                <p className="text-xs text-muted-foreground mb-3">
                  {pkg.sessions} {pkg.sessions === 1 ? 'session' : 'sessions'} · 60 min each
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground/80 mb-4 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-foreground/80">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  size="sm"
                  className={`w-full h-10 text-sm font-semibold ${
                    pkg.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                  }`}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion(`guidance_${pkg.id}`, pkg.totalPrice)}
                  >
                    <CalendarDays className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    Book {pkg.sessions > 1 ? `${pkg.sessions}-Pack` : 'Now'}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Comparison matrix — absorbed from PackageComparisonSection */}
        <BlurFade inView delay={0.3}>
          <details className="group mt-2 rounded-xl border border-border bg-background overflow-hidden">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 hover:bg-secondary/40 transition-colors">
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">Compare what's inside</p>
                <p className="text-base font-semibold text-foreground">Side-by-side: 5, 10, and 20-session packs</p>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary group-open:hidden">Expand</span>
              <span className="text-xs font-mono uppercase tracking-widest text-primary hidden group-open:inline">Collapse</span>
            </summary>
            <div className="border-t border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">What you get</th>
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">5-pack</th>
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">10-pack</th>
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">20-pack</th>
                  </tr>
                </thead>
                <tbody>
                  {quickCompare.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? "bg-secondary/20" : ""}>
                      <td className="px-6 py-3 font-medium text-foreground/80">{row.label}</td>
                      <td className="px-4 py-3 text-center text-foreground/70">{row.five}</td>
                      <td className="px-4 py-3 text-center text-foreground/70">{row.ten}</td>
                      <td className="px-4 py-3 text-center text-foreground/70">{row.twenty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </BlurFade>
      </div>
    </section>
  );
}

