"use client";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Target, Sparkles, Wrench, Globe, Compass, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import { AUDIT_PRICE_LABEL, PROGRAM_PRICE_LABEL, GUIDANCE_RANGE_LABEL, DIGITAL_IDENTITY_LABEL, CUSTOM_PROVISIONING_RANGE_LABEL } from '@/lib/pricing';
import { BlurFade } from '@/components/ui/blur-fade';
import { staggerContainer, springStaggerItem } from '@/lib/animation-variants';
import { SERVICE_PATHS, type ServiceTier } from "@/content/service-catalog";


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
  // Adapter over the priceKey seam: pricing.ts owns the labels (locality),
  // this module only maps the interface key to a label. Exhaustive — no fallback.
  const displayPrice = (tier: ServiceTier): string => {
    switch (tier.priceKey) {
      case "roadmapAudit": return AUDIT_PRICE_LABEL;
      case "selfSufficiency": return PROGRAM_PRICE_LABEL;
      case "guidanceRange": return GUIDANCE_RANGE_LABEL;
      case "digitalIdentity": return DIGITAL_IDENTITY_LABEL;
      case "customAiProvisioning": return CUSTOM_PROVISIONING_RANGE_LABEL;
      default: {
        const _exhaustive: never = tier.priceKey;
        return _exhaustive;
      }
    }
  };

  return (
<section className="py-16 md:py-20 bg-canvas scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="mb-16 grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-7">
                <h2 className="font-display text-display-lg font-medium tracking-tight text-ink">
                  Build with me, or have me build it for you
                </h2>
              </div>
              <p className="md:col-span-5 text-base md:text-lg text-charcoal font-sans leading-relaxed md:text-right">
                Two paths sit side by side, and the choice comes down to who does the building.
              </p>
            </div>
        </BlurFade>

        <div className="space-y-20">
          {SERVICE_PATHS.map((path) => {
            // All tiers render on mount: both paths show their full option set.
            // (Tiers mounted after a toggle were left at opacity 0 by the
            // whileInView/once stagger — the removed-disclosure bug of 2026-09.)

            return (
            <div key={path.id}>
              <BlurFade inView>
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
                      <motion.div
                        key={tier.name}
                        variants={springStaggerItem}
                        className="relative flex flex-col rounded-hp-xl border border-ink/10 bg-canvas overflow-hidden transition-colors duration-150 ease-out hover:border-hp-electric/35"
                  data-highlighted={tier.highlighted ? "true" : "false"}
                      >

                      <CardHeader className="pt-6 pb-4">
                        <div className="w-10 h-10 rounded-hp-lg flex items-center justify-center mb-3 bg-hp-electric/10 text-hp-electric">
                          <Icon className="w-5 h-5" />
                        </div>
                        {tier.highlighted && (
                          <span className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-widest text-hp-electric bg-hp-electric/10 px-2 py-1 rounded-hp-lg border border-hp-electric/20">
                            ★ Build Sprint
                          </span>
                        )}
                        <p className="text-xs font-mono uppercase tracking-widest text-graphite mb-1">
                          {tier.tag}
                        </p>
                        <h4 className="font-heading text-lg font-medium text-ink mb-2">
                          {tier.name}
                        </h4>
                        <div className="flex items-baseline gap-1">
                          <span className="font-medium tabular-nums text-xl md:text-2xl leading-snug [text-wrap:balance] text-hp-electric">
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
                  );
                })}
              </motion.div>
            </div>
          );
          })}
        </div>

        <BlurFade inView>
          <div className="mt-16 space-y-4 text-center">
            <p className="text-sm text-graphite font-sans">
              If you need the systems built instead of guidance on building them,
              start with the{" "}
              <Link href="/services" className="text-hp-electric font-semibold hover:underline">
                build catalog
              </Link>
              : data, revenue ops, visibility, front-line help.
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
