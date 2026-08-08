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

const faqItems: FAQItem[] = FAQ_ITEMS;

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
