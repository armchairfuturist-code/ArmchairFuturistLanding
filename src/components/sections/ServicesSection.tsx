"use client";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Target, Sparkles, Wrench, Globe } from 'lucide-react';
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { BlurFade } from '@/components/ui/blur-fade';
import { MagneticCard } from '@/components/ui/MagneticCard';
import { SectionSpotlight } from '@/components/ui/SectionSpotlight';
import { staggerContainer, springStaggerItem } from '@/lib/animation-variants';
import { SERVICE_PATHS } from "@/content/service-paths";

const ICON_MAP = {
  Zap,
  BookOpen,
  Target,
  Globe,
  Wrench,
  Sparkles,
} as const;

const paths = SERVICE_PATHS.map((path) => ({
  ...path,
  tiers: path.tiers.map((tier) => ({
    ...tier,
    icon: ICON_MAP[tier.icon as keyof typeof ICON_MAP] ?? Zap,
    ctaLink: tier.ctaLink === "CALENDAR_URL" ? CALENDAR_URL : tier.ctaLink,
  })),
}));

export default function ServicesSection() {
  return (
    <SectionSpotlight opacity={0.05} size={450}>
<section id="services" className="py-16 md:py-20 bg-background scroll-mt-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="max-w-4xl mb-16 grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">Your path to AI independence</p>
                <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight leading-[0.98] text-ink">
                  From dependency to independence
                </h2>
              </div>
              <p className="md:col-span-5 text-base md:text-lg text-charcoal font-sans leading-relaxed md:text-right">
                Most AI consultants build systems you depend on. I work as a partner in learning — you leave with the mental models to design, launch, and sell your own AI-powered services.
              </p>
            </div>
        </BlurFade>

        <div className="space-y-20">
          {paths.map((path) => (
            <div key={path.id}>
              <BlurFade inView>
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/60 pb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                      {path.id === "together" ? (
                        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      ) : (
                        <Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      )}
                      <span>{path.label}</span>
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      {path.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono mt-1">
                      {path.kicker}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-foreground/80 font-sans leading-relaxed md:max-w-md md:text-right">
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
                  const Icon = tier.icon;
                  return (
                    <MagneticCard
                      key={tier.name}
                      strength={0.1}
                    >
                      <motion.div
                        variants={springStaggerItem}
                        className="tier-edge flex flex-col border border-ink/10 bg-canvas overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-hp-electric/35 hover:shadow-tint"
                  data-highlighted={tier.highlighted ? "true" : "false"}
                      >

                      <CardHeader className="pt-6 pb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-primary/10 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                          {tier.tag}
                        </p>
                        <h4 className="font-heading text-xl font-bold text-foreground mb-1">
                          {tier.name}
                        </h4>
                        <div className="flex items-baseline gap-1">
                          <span className={`font-bold tabular-nums ${
                            tier.price === "Free" ? 'text-2xl text-primary' : 'text-3xl text-primary'
                          }`}>
                            {tier.price}
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 px-6">
                        <p className="text-sm text-foreground/80 font-sans leading-relaxed mb-5">
                          {tier.description}
                        </p>
                        {tier.note && (
                          <p className="text-xs text-muted-foreground font-mono mb-4 italic">
                            {tier.note}
                          </p>
                        )}
                        <ul className="space-y-2.5">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/70">
                              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="px-6 pb-6 pt-4 mt-auto">
                        <Button
                          asChild
                          size="lg"
                          className="w-full font-semibold bg-background text-foreground border-2 border-foreground/10 hover:border-primary hover:text-primary"
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
            <p className="text-sm text-muted-foreground font-sans">
              Not sure which path fits?{" "}
              <a href="/assessment" className="text-primary font-semibold hover:underline">
                Take the free 3-minute assessment
              </a>{" "}
              — get your personalized AI archetype and a clear next step.
            </p>
            <p className="text-sm text-charcoal/80 font-sans">
              Also run roundtables and strategy sessions.{" "}
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
</SectionSpotlight>
  );
}
