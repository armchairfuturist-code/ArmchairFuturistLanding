"use client";

import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { CheckCircle2, Globe, TrendingUp, Award, Clock, Users } from 'lucide-react';

const stats = [
  {
    icon: CheckCircle2,
    value: "40+",
    label: "AI Systems Deployed",
    description: "Production AI implementations across organizations",
    color: "text-green-500"
  },
  {
    icon: Clock,
    value: "10-20h",
    label: "Reclaimed Per Week",
    description: "Average time savings per client through workflow automation",
    color: "text-blue-500"
  },
  {
    icon: Award,
    value: "6",
    label: "Professional Certifications",
    description: "FLTA, CCMP, GenAI Expert, CEBP, PSM, PAL",
    color: "text-purple-500"
  },
  {
    icon: Globe,
    value: "Worldwide",
    label: "Client Base",
    description: "Serving clients globally from Portugal",
    color: "text-cyan-500"
  },
  {
    icon: TrendingUp,
    value: "4.9/5",
    label: "Client Rating",
    description: "Based on 40+ client engagements",
    color: "text-yellow-500"
  },
  {
    icon: Users,
    value: "$97-$55K",
    label: "Service Range",
    description: "From individual mentoring to enterprise transformation",
    color: "text-orange-500"
  },
];

export default function KeyStatsSection() {
  return (
    <section id="stats" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <BlurFade inView>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2">Key Statistics</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Results That Speak for Themselves
            </h2>
            <p className="text-lg text-foreground/80 font-sans leading-relaxed">
              Alex Myers combines certified expertise with hands-on execution to deliver measurable AI adoption results.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="relative rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-3xl font-black text-primary leading-none ${stat.color}`}>
                      {stat.value}
                    </p>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-2 mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI-Citable Summary Box */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto p-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-heading font-bold text-foreground mb-2">
                The Armchair Futurist at a Glance
              </h3>
              <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                Alex Myers is a <strong className="text-primary">Certified Futurist & AI Strategy Advisor</strong> based in <strong className="text-primary">Portugal</strong>, serving clients worldwide. 
                With <strong className="text-primary">6 professional certifications</strong> and <strong className="text-primary">40+ AI systems deployed</strong>, 
                Alex helps leaders bridge the <strong className="text-primary">Accountability Gap</strong>—the space between AI outputs and business results. 
                Clients typically reclaim <strong className="text-primary">10-20 hours per week</strong> through AI-powered workflow automation, 
                with services ranging from <strong className="text-primary">$97</strong> for individual mentoring to <strong className="text-primary">$55,250</strong> for enterprise transformation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
