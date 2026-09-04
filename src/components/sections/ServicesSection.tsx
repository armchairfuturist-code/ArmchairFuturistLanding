"use client";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Target, Sparkles, Wrench, Globe, Compass, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { AUDIT_PRICE_LABEL, PROGRAM_PRICE_LABEL, GUIDANCE_RANGE_LABEL, formatDualPrice, formatDualRange, SERVICES_PRICING } from '@/lib/pricing';
import { BlurFade } from '@/components/ui/blur-fade';
import { MagneticCard } from '@/components/ui/MagneticCard';
import { staggerContainer, springStaggerItem } from '@/lib/animation-variants';
import { SERVICE_PATHS, type ServiceTier } from "@/content/service-paths";


const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  BookOpen,
  Target,
  Globe,
  Wrench,
  Sparkles,
  Compass,
}


export default function ServicesSection() {

  // Canonical dual-label pricing (critique 2026-08-31): every price shows
  // both currencies from pricing.ts; no toggle, no hydration flip.
  const displayPrice = (tier: ServiceTier) => {
    if (tier.priceKey === "roadmapAudit") return AUDIT_PRICE_LABEL;
    if (tier.priceKey === "selfSufficiency") return PROGRAM_PRICE_LABEL;
    if (tier.priceKey === "guidanceRange") return GUIDANCE_RANGE_LABEL;
    if (tier.priceKey === "digitalIdentity") {
      return formatDualPrice(
        SERVICES_PRICING.digitalIdentity.priceUSD,
        SERVICES_PRICING.digitalIdentity.priceEUR,
      );
    }
    if (tier.priceKey === "customAiProvisioning") {
      return formatDualRange(
        SERVICES_PRICING.customAiProvisioning.minPriceUSD,
        SERVICES_PRICING.customAiProvisioning.maxPriceUSD,
        SERVICES_PRICING.customAiProvisioning.minPriceEUR,
        SERVICES_PRICING.customAiProvisioning.maxPriceEUR,
      );
    }
    return tier.price;
  };

  return (
<section className="py-16 md:py-20 bg-canvas scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-4xl mb-16 grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">Your path to AI independence</p>
                <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium tracking-tight leading-[0.98] text-ink">
                  You leave able to build, launch, and sell your own AI services
                </h2>
              </div>
              <p className="md:col-span-5 text-lg text-charcoal font-sans leading-relaxed md:text-right">
                The divide is not educated versus uneducated. It is AI-fluent versus AI-resistant.
              </p>
              <p className="md:col-span-5 text-base md:text-lg text-charcoal font-sans leading-relaxed md:text-right">
                Installing agents is easy now. Deciding what they own is not. Most AI consultants build systems you depend on. I build your ability to build.
              </p>
            </div>
        </BlurFade>

        <div className="space-y-20">
          {SERVICE_PATHS.map((path) => (
            <div key={path.id}>
              <BlurFade inView>
                {path.id === "together" && (
                  <p className="mb-6 text-sm text-charcoal font-sans md:text-right">
                    Not sure where you stand?{" "}
                    <Link
                      href="/assessment"
                      onClick={() => trackEvent("services_assessment_link")}
                      className="font-semibold text-hp-electric underline underline-offset-4 hover:text-hp-deep transition-colors"
                    >
                      Take the free assessment
                    </Link>{" "}
                    first.
                  </p>
                )}
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-hairline pb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-graphite mb-2 flex items-center gap-2">
                      {path.id === "together" ? (
                        <Sparkles className="h-3.5 w-3.5 text-hp-electric" aria-hidden="true" />
                      ) : (
                        <Wrench className="h-3.5 w-3.5 text-hp-electric" aria-hidden="true" />
                      )}
                      <span>{path.label}</span>
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-medium text-ink">
                      {path.title}
                    </h3>
                    <p className="text-sm text-graphite font-mono mt-1">
                      {path.kicker}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-charcoal font-sans leading-relaxed md:max-w-md md:text-right">
                    {path.description}
                  </p>
                </div>
              </BlurFade>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-1 gap-6 mx-auto ${
                  path.id === 'foryou'
                    ? 'md:grid-cols-2 max-w-4xl'
                    : 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl'
                }`}
              >
                {path.tiers.map((tier) => {
                  const Icon = ICON_MAP[tier.icon];
                  return (
                    <MagneticCard
                      key={tier.name}
                      strength={0.1}
                    >
                      <motion.div
                        variants={springStaggerItem}
                        className="relative flex flex-col border border-ink/10 bg-canvas overflow-hidden transition-[border-color] duration-300 hover:border-hp-electric/35"
                  data-highlighted={tier.highlighted ? "true" : "false"}
                      >

                      <CardHeader className="pt-6 pb-4">
                        <div className="w-10 h-10 rounded-hp-lg flex items-center justify-center mb-3 bg-hp-electric/10 text-hp-electric">
                          <Icon className="w-5 h-5" />
                        </div>
                        {tier.highlighted && (
                          <span className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-widest text-hp-electric bg-hp-electric/10 px-2 py-1 rounded-full border border-hp-electric/20">
                            ★ Build Sprint
                          </span>
                        )}
                        <p className="text-xs font-mono uppercase tracking-widest text-graphite mb-1">
                          {tier.tag}
                        </p>
                        <h4 className="font-heading text-xl font-medium text-ink mb-1">
                          {tier.name}
                        </h4>
                        <div className="flex items-baseline gap-1">
                          <span className="font-medium tabular-nums text-3xl text-hp-electric">
                            {displayPrice(tier)}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 px-6">
                        <p className="text-sm text-charcoal font-sans leading-relaxed mb-5">
                          {tier.description}
                        </p>
                        {tier.note && (
                          <p className="text-xs text-graphite font-mono mb-4 italic">
                            {tier.note}
                          </p>
                        )}
                        <ul className="space-y-2.5">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-hp-electric" aria-hidden="true" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="px-6 pb-6 pt-4 mt-auto">
                        <Button
                          asChild
                          size="lg"
                          className={`w-full font-semibold ${
                            tier.highlighted
                              ? 'bg-hp-electric text-white hover:bg-hp-electric/90 border-2 border-hp-electric'
                              : 'bg-canvas text-ink border-2 border-foreground/10 hover:border-hp-electric hover:text-hp-electric'
                          }`}
                        >
                          <a
                            href={tier.ctaLink}
                            {...(tier.ctaLink.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {tier.cta}
                            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                          </a>
                        </Button>
                      </CardFooter>
                    </motion.div>
                    </MagneticCard>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <BlurFade inView>
          <div className="mt-16 space-y-4 text-center">
            <p className="text-sm text-graphite font-sans">
              Need systems built, not just guidance?{" "}
              <a href="/services" className="text-hp-electric font-semibold hover:underline">
                Open the build catalog
              </a>{" "}
              — data, revenue ops, visibility, front-line help.
            </p>
            <p className="text-sm text-graphite font-sans">
              Not sure which path fits?{" "}
              <a href="/assessment" className="text-hp-electric font-semibold hover:underline">
                Take the free assessment
              </a>{" "}
              and get your personalized AI archetype plus a clear next step.
            </p>
            <p className="text-sm text-charcoal/80 font-sans">
              I also run roundtables and strategy sessions.{" "}
              <a
                href="/#speaking"
                className="text-hp-electric font-semibold hover:underline underline-offset-4"
              >
                See speaking →
              </a>
</p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
