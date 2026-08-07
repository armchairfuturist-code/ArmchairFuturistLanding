"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/content/faqs";

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
    answer:
      "I’m a partner in learning for founders, creators, and small teams who want to design, launch, and sell AI-powered services on their own terms. However you start, you finish independent.",
  },
  {
    question: "What is the Accountability Gap in AI adoption?",
    answer:
      "It's the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows or decision rights. Nobody owns the outcome. I bridge this gap by teaching the literacy required to design and own the outcome yourself.",
    hasLink: true,
    linkText: "Learn more about the Accountability Gap →",
    linkHref: "/concepts/accountability-gap",
  },
  {
    question: "What qualifications do you have?",
    answer:
      "I hold six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). I've deployed 40+ AI systems and run on evidence-based methodology — my organizational work uses data-driven profiling to segment teams, and my change management practice is grounded in certified CCMP methodology.",
    hasLink: true,
    linkText: "Full bio & certifications →",
    linkHref: "/about",
  },
  {
    question: "How much do services cost?",
    answer:
      "Two paths. 'We do it together' guidance starts at the 5-session pack ($600 / €500) and scales through 10 and 20-session packs (up to 15% savings) — these build your AI literacy at your own pace. The $2,497 AI Self-Sufficiency Program is an 8-week build sprint where you launch your own AI-powered service or brand, with 10–15 coaching sessions, a structured playbook, and async support. The $199 Digital Identity Landing Page is the easiest entry point into the 'I do it for you' path. Custom AI Provisioning runs $1,000–$5,000 depending on scope. Pricing is in USD and EUR.",
  },
  {
    question: "How does AI guidance work?",
    answer:
      "One-on-one coaching starting at $120 (€100) per 60-minute session for the 5-session pack, with deeper discounts at 10 and 20 sessions. I focus on building mental models for how AI works, then testing them live on your real work. Each session blends practical guidance with how AI changes your role, your business, and your opportunities. Most clients start with 5 or 10 sessions.",
  },
  {
    question: "Why the program instead of a session pack?",
    answer:
      "Session packs build AI literacy at your own pace — you get capable with AI and apply it to your work. The Self-Sufficiency Program is for when you want to launch something: an AI-powered service, a personal brand, a sellable offering. It's a structured 8-week build with a playbook, 10–15 coaching sessions, async support between sessions, and a fixed deliverable by week 8. If you want to get good with AI, buy a pack. If you want to ship an AI offering, apply for the program.",
  },
  {
    question: "Can you work with organizations outside the US?",
    answer:
      "Yes. I serve clients worldwide from Portugal. All services are delivered remotely. Pricing is available in USD and EUR.",
  },
  {
    question: "What results can clients expect?",
    answer:
      "Clients typically reclaim 10-20 hours per week through AI-powered automation. Individual clients gain clarity and shift from overwhelm to agency. By the end of the AI Self-Sufficiency Program, most clients have launched their own AI-powered service or built their personal brand around the work.", hasLink: false,
  },
  {
    question: "How are you different from other AI consultants?",
    answer:
      "Three ways. I work as a partner in learning — you leave with the literacy to keep going, not a dependency on me. I combine technical depth with psychology-led strategy, addressing the human side of adoption. And I build on open-standard stacks with no platform lock-in. You own your data, your logic, and your infrastructure.",
  },
  {
    question: "What is Custom AI Provisioning?",
    answer:
      "A done-for-you service where I build you a private AI command center: custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Pricing ranges $1,000-$5,000 depending on scope, delivered in 1-2 weeks. You own everything — code, data, infrastructure.",
  },
  {
    question: "Who do you work best with — and who isn't a fit?",
    answer:
      "Best fit: founders, creators, and independent professionals who want AI literacy and leverage — not another dependency. People willing to touch the tools themselves. Small teams ready to build their own AI-powered services. Not a fit: large enterprises seeking presentation theatre for board meetings. Leaders who want AI 'in theory' without readiness. Anyone expecting AI to solve underlying culture problems. If your team won't touch the tools, I'm not the right consultant.",
  },
  {
    question: "How do I get started?",
    answer:
      "Three ways, depending on where you are. The $199 Digital Identity Landing Page requires no call — just submit the intake. For guidance, browse session packs starting at $120 (€100) or apply for the AI Self-Sufficiency Program. For done-for-you builds, request a 30-minute fit call and I'll scope the work.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-cloud scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <div className="mb-12 grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
                FAQ
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[0.98] text-ink">
                Real questions people ask me
              </h2>
            </div>
            <p className="md:col-span-5 text-charcoal text-base md:text-lg md:text-right max-w-sm md:ml-auto">
              Straight answers about working together, pricing, and what to
              expect.
            </p>
          </div>
        </BlurFade>

        <ScrollReveal>
          <Accordion type="single" collapsible className="w-full space-y-0 border-t border-ink/15">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-ink/15 px-0 data-[state=open]:bg-canvas"
              >
                <AccordionTrigger className="py-5 px-1 text-left font-display font-semibold text-ink hover:no-underline hover:text-hp-electric transition-colors duration-150">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 px-1 text-charcoal font-sans leading-relaxed">
                  {item.answer}
                  {item.hasLink && item.linkHref && (
                    <Link
                      href={item.linkHref}
                      className="block mt-3 text-sm text-hp-electric font-semibold hover:underline"
                    >
                      {item.linkText}
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
