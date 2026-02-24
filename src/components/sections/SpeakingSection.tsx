"use client";

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Users, Brain, TrendingUp, Shield } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const topics = [
  { icon: Brain, text: "AI & the Future of Work — what actually changes" },
  { icon: TrendingUp, text: "From Overwhelm to Agency — reframing the AI landscape" },
  { icon: Users, text: "Organizational Trust in the Age of Automation" },
  { icon: Shield, text: "Data Sovereignty & the End of Platform Dependency" },
];

export default function SpeakingSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsContentVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-16 px-4 scroll-mt-20">
      <div
        ref={contentRef}
        className={`max-w-3xl mx-auto scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
      >
        <div className="relative rounded-2xl bg-gradient-to-br from-foreground/[0.03] via-background to-foreground/[0.03] border border-border p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              Speaking &amp; Roundtables
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Bring the conversation to your team.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Keynotes, executive roundtables, and workshops for organizations ready to think clearly about AI — not just adopt it.
          </p>

          <ul className="space-y-3 mb-8">
            {topics.map((t) => (
              <li key={t.text} className="flex items-start gap-3">
                <t.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground">{t.text}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mb-6">
            For event organizers, podcast hosts, and executive leadership teams.
          </p>

          <Button asChild size="lg" className="h-12 px-6 text-base font-bold">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('speaking_inquiry_click')}
            >
              <Mic className="mr-2 h-4 w-4" />
              Invite Me to Speak
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
