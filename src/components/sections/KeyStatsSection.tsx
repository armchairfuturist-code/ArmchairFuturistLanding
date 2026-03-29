"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { BlurFade } from '@/components/ui/blur-fade';
import { CheckCircle2, Globe, TrendingUp, Award, Clock, Users } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';

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

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "GenAI Academy", name: "GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon.org", name: "Aragon.org" },
  { src: "/culminate.jpg", alt: "Culminate Strategy", name: "Culminate" },
  { src: "/techstars.jpg", alt: "Techstars", name: "Techstars" },
  { src: "/launch.jpg", alt: "NTT Data", name: "NTT Data" },
  { src: "/kemin.jpg", alt: "Kemin", name: "Kemin" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM", name: "Shift DSM" },
  { src: "/p2p.png", alt: "P2P", name: "P2P" },
  { src: "/mindscape.png", alt: "Mindscape", name: "Mindscape" },
];

function LogoCard({ logo }: { logo: typeof logos[0] }) {
  return (
    <div
      className="flex flex-col items-center text-center flex-none gap-2"
      style={{ width: '96px' }}
    >
      <div className="relative h-14 w-14 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/50 grayscale hover:grayscale-0">
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="56px"
          className="object-contain p-1"
        />
      </div>
      <span className="text-[10px] font-medium text-muted-foreground/70 leading-tight text-center w-full">
        {logo.name}
      </span>
    </div>
  );
}

export default function KeyStatsSection() {
  return (
    <section id="stats" className="py-16 md:py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Key Stats */}
        <BlurFade inView>
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2 uppercase tracking-widest">Key Statistics</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Results That Speak for Themselves
            </h2>
            <p className="text-lg text-foreground/80 font-sans leading-relaxed">
              Alex Myers combines certified expertise with hands-on execution to deliver measurable AI adoption results.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="relative rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg bg-primary/10 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-2xl md:text-3xl font-black text-primary leading-none ${stat.color}`}>
                      {stat.value}
                    </p>
                    <h3 className="font-heading text-base font-bold text-foreground mt-1.5 mb-0.5">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Organization Logos */}
        <BlurFade inView delay={0.4}>
          <div className="text-center mb-6">
            <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest">
              Organizations I&apos;ve Advised &amp; Partnered With
            </p>
          </div>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
              {logos.map((logo) => (
                <LogoCard key={logo.alt} logo={logo} />
              ))}
            </Marquee>
          </div>
        </BlurFade>

        {/* AI-Citable Summary Box */}
        <motion.div
          className="mt-10 max-w-4xl mx-auto p-6 rounded-xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20"
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
                Alex helps leaders bridge the{' '}
                <Link href="/concepts/accountability-gap" className="text-primary font-semibold hover:underline">
                  Accountability Gap
                </Link>
                —the space between AI outputs and business results. 
                Clients typically reclaim <strong className="text-primary">10-20 hours per week</strong>. 
                Services range from <strong className="text-primary">$97</strong> for individual mentoring to <strong className="text-primary">$55,250</strong> for enterprise transformation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
