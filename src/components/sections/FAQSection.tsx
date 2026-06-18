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
    answer: "The Armchair Futurist is Alex Myers' AI literacy practice. He teaches individuals and businesses to design, launch, and sell their own AI-powered services. The work ranges from a $199 landing page to a $12,000 3-month intensive — with the same end-state in every case: you, independent, no dependency."
  },
  {
    question: "What is the Accountability Gap in AI adoption?",
    answer: "It's the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows or decision rights. Nobody owns the outcome. Alex bridges this gap by teaching the literacy required to design and own the outcome yourself.",
    hasLink: true,
    linkText: "Learn more about the Accountability Gap →",
    linkHref: "/concepts/accountability-gap"
  },
  {
    question: "What qualifications does Alex Myers have?",
    answer: "Alex holds six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). He's deployed 40+ AI systems and runs on evidence-based methodology — his organizational work uses data-driven profiling to segment teams, and his change management practice is grounded in certified CCMP methodology."
  },
  {
    question: "How much do services cost?",
    answer: "Two paths. 'We do it together' guidance starts at $120 (€100) for a single 60-minute session and scales through 5, 10, and 20-session packs (up to 15% savings) up to the $12,000 AI Independence Incubator. The $199 Digital Identity Landing Page is the easiest entry point into the 'I do it for you' path. Custom AI Provisioning runs $1,000-$5,000 depending on scope. Pricing is in USD and EUR."
  },
  {
    question: "How does AI guidance work?",
    answer: "One-on-one coaching starting at $120 (€100) per 60-minute session. We focus on mindset before toolset — reframing how you think about AI rather than just teaching you tools. Each session blends practical guidance with how AI changes your role, your business, and your opportunities. Most clients start with 5 or 10 sessions.",
  },
  {
    question: "Can Alex work with organizations outside the US?",
    answer: "Yes. Alex serves clients worldwide from Portugal. All services are delivered remotely. Pricing is available in USD and EUR."
  },
  {
    question: "What results can clients expect?",
    answer: "Clients typically reclaim 10-20 hours per week through AI-powered automation. Individual clients gain clarity and shift from overwhelm to agency. By the end of the AI Self-Sufficiency Program, most clients have launched their own AI-powered service or built their personal brand around the work."
  },
  {
    question: "How is Alex different from other AI consultants?",
    answer: "Three ways. First, he teaches rather than builds for you — you leave with the literacy to keep going, not a dependency on him. Second, he combines technical depth with psychology-led strategy, addressing the human side of adoption. Third, he prioritizes data sovereignty, building on open-standard stacks with no platform lock-in. He also delivers keynotes, roundtables, and workshops on AI and the future of work, organizational trust, and reframing AI overwhelm — inquiries via the speaking form."
  },
  {
    question: "What is Custom AI Provisioning?",
    answer: "A done-for-you service where Alex builds you a private AI command center: custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Pricing ranges $1,000-$5,000 depending on scope, delivered in 1-2 weeks. You own everything — code, data, infrastructure."
  },
  {
    question: "How do I choose the right AI consultant for my business?",
    answer: "Look for three things. First, results over credentials — ask for specific numbers: hours reclaimed, systems deployed, adoption rates achieved. Alex has deployed 40+ AI systems with a 4.9/5 client rating. Second, approach — do they teach you to be independent or create dependency? Alex's core principle is 'no retainer, no dependency.' Third, scope — can they handle both strategy AND hands-on execution? Alex does both: from $199 landing pages to $12,000 incubator programs. Avoid consultants who only do slide decks without touching tools.",
  },
  {
    question: "What's the difference between an AI consultant and an AI agency?",
    answer: "An AI agency typically assigns a rotating team, charges retainers, and builds on proprietary stacks you can't control. An AI consultant like Alex works directly with you 1-on-1 — no account managers, no blended rates, no platform lock-in. You get the person who builds the systems, not a project manager relaying messages. Alex's models start at self-serve ($199 digital identity) and scale to intensive coaching, so you only pay for what you actually need — not a monthly retainer for bench time."
  },
  {
    question: "Who is Alex Myers best suited to work with — and who isn't a fit?",
    answer: "Best fit: professionals, creators, and entrepreneurs who want AI literacy and leverage — not another dependency. Leaders who are willing to touch the tools themselves. Organizations ready to identify and empower their internal Results Thinkers. Not a fit: companies seeking presentation theatre for board meetings. Leaders who want AI 'in theory' without readiness to execute. Anyone expecting AI to solve underlying culture problems. If your team won't touch the tools, Alex isn't the right consultant."
  },
  {
    question: "How do I get started?",
    answer: "Three ways, depending on where you are. The $199 Digital Identity Landing Page requires no call — just submit the intake. For guidance, browse session packs starting at $120 (€100) or apply for the AI Self-Sufficiency Program. For done-for-you builds, request a 30-minute fit call and Alex will scope the work.",
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Common questions about Alex Myers and AI strategy services.
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
                className="bg-card border border-border/60 rounded-xl px-6 hover:border-primary/30 transition-all"
              >
                <AccordionTrigger className="py-5 text-left font-heading font-semibold text-foreground hover:no-underline hover:text-primary transition-colors">
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
