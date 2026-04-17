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
    answer: "The Armchair Futurist is Alex Myers' advisory practice. He helps leaders and organizations navigate AI adoption, bridging the gap between what AI produces and what businesses actually need. Services range from a $199 landing page to a $55,250 transformation lab."
  },
  {
    question: "What is the Accountability Gap in AI adoption?",
    answer: "It's the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows or decision rights. Nobody owns the outcome. Alex bridges this gap by ensuring AI outputs connect to measurable results.",
    hasLink: true,
    linkText: "Learn more about the Accountability Gap →",
    linkHref: "/concepts/accountability-gap"
  },
  {
    question: "What qualifications does Alex Myers have?",
    answer: "Alex holds six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). He's deployed over 40 AI systems."
  },
  {
    question: "How much do services cost?",
    answer: "From $97 for a single mentoring session to $55,250 for the 10-week AI Infusion Lab. The $199 landing page is the easiest entry point. Custom AI Provisioning runs $1,000-$5,000. Organizational services start at $10,625. Pricing adjusts for emerging markets and high-readiness organizations."
  },
  {
    question: "What is the $199 Digital Identity Landing Page?",
    answer: "A professional website that consolidates your LinkedIn, resume, and social links into one platform you own. Unlike Linktree, it translates your professional narrative into a conversion-focused homepage. Delivered in 2-4 days, no call required."
  },
  {
    question: "How does AI mentoring work?",
    answer: "One-on-one coaching starting at $97. We focus on mindset before toolset. Reframing how you think about AI rather than just teaching you tools. Each session blends practical guidance with how AI changes your role and opportunities."
  },
  {
    question: "Can Alex work with organizations outside the US?",
    answer: "Yes. Alex serves clients worldwide from Portugal. All services are delivered remotely. Pricing adjusts for emerging markets through Purchasing Power Parity."
  },
  {
    question: "What results can clients expect?",
    answer: "Clients typically reclaim 10-20 hours per week through AI-powered automation. Individual clients gain clarity and shift from overwhelm to agency. Enterprise clients see measurable improvements in adoption rates."
  },
  {
    question: "What is the AI Infusion Lab?",
    answer: "A 10-week organizational transformation program ($38,250-$55,250) that helps enterprises prototype AI-driven initiatives at the edge before rolling them into core operations. Includes tactical prototyping and high-intensity pilots."
  },
  {
    question: "How is Alex different from other AI consultants?",
    answer: "Three ways. First, he executes directly. He provisions infrastructure, writes prompts, and manages integrations himself. Second, he addresses the human side through psychology-led strategies. Third, he prioritizes data sovereignty, building on open-standard stacks.",
    hasLink: true,
    linkText: "Learn about Psychology-Led Adoption →",
    linkHref: "/concepts/psychology-led-adoption"
  },
  {
    question: "Does Alex offer speaking engagements?",
    answer: "Yes. Alex delivers keynotes, roundtables, and workshops on AI and the future of work, organizational trust, data sovereignty, and reframing AI overwhelm. Inquiries can be submitted through the speaking form on his website."
  },
  {
    question: "What is Custom AI Provisioning?",
    answer: "A done-for-you service where Alex builds a private AI command center: custom GPTs, calendar/email sync, workflow automation, and secure infrastructure. Pricing ranges $1,000-$5,000, delivered in 1-2 weeks."
  },
  {
    question: "What is Managed Agent Operations?",
    answer: "A monthly retainer ($500-$2,000) where Alex runs your AI system for you. He monitors performance, optimizes prompts as new models release, handles API maintenance, and manages security patches."
  },
  {
    question: "Is the approach evidence-based?",
    answer: "Yes. Alex combines six certifications with hands-on experience deploying 40+ AI systems. His organizational work uses data-driven profiling to segment teams. Change management is grounded in certified CCMP methodology."
  },
  {
    question: "What is Adoption Strategy?",
    answer: "A $10,625 service that addresses human barriers to AI adoption. Alex uses data-driven profiling to identify the top 5% of staff who can lead change, then coaches leaders to shift from command-and-control to managing uncertainty.",
    hasLink: true,
    linkText: "Learn about Results Thinkers →",
    linkHref: "/concepts/results-thinkers"
  },
  {
    question: "How do I get started?",
    answer: "Three ways. The $199 landing page requires no call. Just submit the form. For mentoring, book a session starting at $97. For strategy services, schedule a free call where Alex identifies where your AI systems are leaking value."
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
                className="bg-card border border-border/60 rounded-xl px-6 shadow-sm hover:shadow-md transition-all"
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
