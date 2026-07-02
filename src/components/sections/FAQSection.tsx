"use client";

import Link from 'next/link';
import { BlurFade } from '@/components/ui/blur-fade';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkHref?: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is the Armchair Futurist?",
    answer: "My AI literacy practice. I teach individuals, founders, and small teams to design, launch, and sell their own AI-powered services — from a $199 landing page to $2,497 for the 8-week Self-Sufficiency Program. The end-state in every case: you, independent, no dependency."
  },
  {
    question: "What is the Accountability Gap in AI adoption?",
    answer: "It's the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows or decision rights. Nobody owns the outcome. I bridge this gap by teaching the literacy required to design and own the outcome yourself.",
    hasLink: true,
    linkText: "Learn more about the Accountability Gap →",
    linkHref: "/concepts/accountability-gap"
  },
  {
    question: "What qualifications do you have?",
    answer: "I hold six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). I've deployed 40+ AI systems and run on evidence-based methodology — my organizational work uses data-driven profiling to segment teams, and my change management practice is grounded in certified CCMP methodology."
  },
  {
    question: "How much do services cost?",
    answer: "Two paths. 'We do it together' guidance starts at the 5-session pack ($570 / €475) and scales through 10 and 20-session packs (up to 15% savings), with the $2,497 AI Self-Sufficiency Program as the core transformation. The $199 Digital Identity Landing Page is the easiest entry point into the 'I do it for you' path. Custom AI Provisioning runs $1,000-$5,000 depending on scope. Pricing is in USD and EUR."
  },
  {
    question: "How does AI guidance work?",
    answer: "One-on-one coaching starting at $95 (€90) per 60-minute session for the 5-session pack, with deeper discounts at 10 and 20 sessions. I focus on mindset before toolset — reframing how you think about AI rather than just teaching you tools. Each session blends practical guidance with how AI changes your role, your business, and your opportunities. Most clients start with 5 or 10 sessions."
  },
  {
    question: "Can you work with organizations outside the US?",
    answer: "Yes. I serve clients worldwide from Portugal. All services are delivered remotely. Pricing is available in USD and EUR."
  },
  {
    question: "What results can clients expect?",
    answer: "Clients typically reclaim 10-20 hours per week through AI-powered automation. Individual clients gain clarity and shift from overwhelm to agency. By the end of the AI Self-Sufficiency Program, most clients have launched their own AI-powered service or built their personal brand around the work."
  },
  {
    question: "How are you different from other AI consultants?",
    answer: "Three ways. First, I teach rather than build for you — you leave with the literacy to keep going, not a dependency on me. Second, I combine technical depth with psychology-led strategy, addressing the human side of adoption. Third, I prioritize data sovereignty, building on open-standard stacks with no platform lock-in. I also deliver keynotes, roundtables, and workshops on AI and the future of work, organizational trust, and reframing AI overwhelm — inquiries via the speaking form."
  },
  {
    question: "What is Custom AI Provisioning?",
    answer: "A done-for-you service where I build you a private AI command center: custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Pricing ranges $1,000-$5,000 depending on scope, delivered in 1-2 weeks. You own everything — code, data, infrastructure."
  },
  {
    question: "Who do you work best with — and who isn't a fit?",
    answer: "Best fit: founders, creators, and independent professionals who want AI literacy and leverage — not another dependency. People willing to touch the tools themselves. Small teams ready to build their own AI-powered services. Not a fit: large enterprises seeking presentation theatre for board meetings. Leaders who want AI 'in theory' without readiness to execute. Anyone expecting AI to solve underlying culture problems. If your team won't touch the tools, I'm not the right consultant."
  },
  {
    question: "How do I get started?",
    answer: "Three ways, depending on where you are. The $199 Digital Identity Landing Page requires no call — just submit the intake. For guidance, browse session packs starting at $120 (€100) or apply for the AI Self-Sufficiency Program. For done-for-you builds, request a 30-minute fit call and I'll scope the work.",
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Real questions people ask me
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Straight answers about working together, pricing, and what to expect.
            </p>
          </div>
        </BlurFade>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border/60 rounded-xl px-6 hover:border-primary/30 transition-[border-color]"
              >
                <AccordionTrigger className="py-5 text-left font-heading font-semibold text-foreground hover:no-underline hover:text-primary transition-colors duration-150">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-foreground/80 font-sans leading-relaxed">
                  {item.answer}
                  {item.hasLink && item.linkHref && (
                    <Link
                      href={item.linkHref!}
                      className="block mt-3 text-sm text-primary font-semibold hover:underline"
                    >
                      {item.linkText}
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
