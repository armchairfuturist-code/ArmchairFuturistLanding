"use client";

import { BlurFade } from '@/components/ui/blur-fade';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is the Armchair Futurist?",
    answer: "The Armchair Futurist is the advisory practice of Alex Myers, a certified futurist and AI strategy advisor. Alex helps leaders and organizations navigate AI adoption by bridging the Accountability Gap — the space between an AI output and a business result. Services range from a $199 digital identity landing page to a $55,250 ten-week AI Infusion Lab for enterprises. The practice is based in Portugal and serves clients worldwide."
  },
  {
    question: "What is the Accountability Gap in AI adoption?",
    answer: "The Accountability Gap is the space between what an AI system produces and what a business actually needs. Most companies layer AI onto existing processes without rethinking workflows, incentives, or decision rights. The result is that nobody owns the outcome — the AI generated a draft, but who verified it, refined it, and made it actionable? Alex Myers bridges this gap by acting as a Trusted Human Architect who ensures AI outputs connect to measurable business results."
  },
  {
    question: "What qualifications does Alex Myers have?",
    answer: "Alex Myers holds six professional certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). He has deployed over 40 AI systems and has been featured by organizations including Techstars, NTT Data, GenAI Academy, and Aragon.org."
  },
  {
    question: "How much do the Armchair Futurist's services cost?",
    answer: "Services range from $97 for a single AI mentoring session to $55,250 for the full 10-week AI Infusion Lab. The $199 Digital Identity Landing Page is the most accessible entry point — a professional site delivered in 2-4 days. Custom AI Provisioning runs $1,000-$5,000 as a fixed project. Managed Agent Operations cost $500-$2,000 per month. Organizational services start at $10,625. Pricing adjusts for emerging markets through Purchasing Power Parity and for high-readiness organizations through Agile Readiness discounts."
  },
  {
    question: "What is the $199 Digital Identity Landing Page?",
    answer: "The $199 Digital Identity Landing Page is a professional website that consolidates your LinkedIn profile, resume, and social links into one interview-ready platform you own. Unlike Linktree or a basic portfolio, it translates your professional narrative into a conversion-focused homepage with clear differentiators and a cohesive storyline. It is delivered in 2-4 days with no call required to get started."
  },
  {
    question: "How does AI mentoring work with Alex Myers?",
    answer: "AI mentoring with Alex Myers is one-on-one coaching that helps individuals move from AI anxiety to agency. Sessions start at $97 and focus on mindset before toolset — reframing how you think about AI rather than just teaching you how to use tools. Each session blends practical guidance with the bigger picture of how AI changes your role, your industry, and your opportunities. The approach follows three stages: from fear to understanding, from understanding to agency, and from agency to optimism."
  },
  {
    question: "Can Alex Myers work with organizations outside the United States?",
    answer: "Yes. Alex Myers serves clients worldwide from his base in Portugal. All advisory services, mentoring sessions, and strategy engagements are delivered remotely. The practice uses Purchasing Power Parity pricing to make services accessible to organizations in emerging markets. Alex has worked with international organizations including Aragon.org, Techstars, and NTT Data across multiple continents."
  },
  {
    question: "What results can clients expect from working with Alex Myers?",
    answer: "Clients typically reclaim 10-20 hours per week through AI-powered workflow automation. Individual clients gain clarity on their AI strategy and a shift from overwhelm to agency. Enterprise clients see measurable improvements in adoption rates by addressing psychological barriers before technical ones. Alex has deployed over 40 AI systems and approaches every engagement with an execution-first methodology — he provisions servers, writes system prompts, and manages model integrations directly rather than handing over a strategy deck."
  },
  {
    question: "What is the AI Infusion Lab?",
    answer: "The AI Infusion Lab is a 10-week organizational transformation program priced between $38,250 and $55,250. It helps enterprises launch AI-driven initiatives at the organizational edge and validate new business models safely before core integration. The lab includes tactical prototyping, human-machine workflow design, and high-intensity pilots designed to secure measurable ROI and cultural momentum. It is designed for organizations that want to test and validate new approaches without disrupting current operations."
  },
  {
    question: "How is Alex Myers different from other AI consultants?",
    answer: "Alex Myers differs from typical AI consultants in three ways. First, he executes directly — he does not hand over a strategy deck but instead provisions infrastructure, writes system prompts, and manages integrations himself. Second, he addresses the human side of AI adoption through psychology-led strategies and certified change management expertise. Third, he prioritizes data and privacy sovereignty, building on open-standard stacks so clients own their logic and data without platform dependency."
  },
  {
    question: "Does Alex Myers offer speaking engagements or keynotes?",
    answer: "Yes. Alex Myers delivers keynotes, executive roundtables, and workshops on topics including AI and the Future of Work, organizational trust in the age of automation, data sovereignty, and reframing AI overwhelm into agency. He speaks to corporate leadership teams, event organizers, and podcast audiences. Inquiries can be submitted through the speaking inquiry form on his website."
  },
  {
    question: "What is Custom AI Provisioning?",
    answer: "Custom AI Provisioning is a done-for-you service where Alex builds a private AI command center tailored to your needs. This includes custom GPTs and agents, calendar and email synchronization, workflow automation, and secure infrastructure — all delivered as a turnkey solution. The goal is to reclaim 10-20 hours of your week by automating scheduling, drafting, and research tasks. Pricing ranges from $1,000 to $5,000 as a fixed project delivered in 1-2 weeks."
  },
  {
    question: "What is Managed Agent Operations (AIaaS)?",
    answer: "Managed Agent Operations is a monthly retainer service where Alex does not just build your AI system but runs it for you. As your Agent Operator, he monitors daily performance, optimizes prompts and logic as new models are released, integrates new capabilities, and handles API maintenance and security patches. This service costs $500-$2,000 per month and is designed for founders and agencies who want a world-class AI assistant without the overhead of a human hire."
  },
  {
    question: "Is the Armchair Futurist's approach evidence-based?",
    answer: "Yes. Alex Myers combines six professional certifications with hands-on experience deploying over 40 AI systems. His organizational work uses data-driven profiling to segment teams and identify psychological barriers to adoption, rather than applying one-size-fits-all training. His change management approach is grounded in certified CCMP methodology, and his futurist perspective draws on FLTA certification training in long-term analysis and scenario planning."
  },
  {
    question: "What is Psychology-Led Adoption Strategy?",
    answer: "Psychology-Led Adoption Strategy is an organizational service priced at $10,625 that addresses the human barriers to AI adoption. Alex uses data-driven profiling to segment your organization and identify the top 5% of staff — called Results Thinkers — who are naturally wired for uncertainty and can lead change. The engagement includes complexity coaching for leaders to shift from command-and-control to complexity thinking, bypassing the corporate immune system that typically kills transformation efforts."
  },
  {
    question: "How do I get started with the Armchair Futurist?",
    answer: "There are three ways to get started. The lowest commitment option is to claim the $199 Digital Identity Landing Page — no call required, just submit the form. For AI mentoring, book a session starting at $97 through the calendar link. For strategy and advisory services, schedule a free strategy call where Alex will identify where your AI systems are leaking value and what to do about it, with no obligation and no pitch deck."
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <BlurFade inView>
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground/60 font-mono mb-2">Last updated: February 2026</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/80 font-sans max-w-2xl mx-auto">
              Answers to common questions about Alex Myers, the Armchair Futurist, and AI strategy advisory services.
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
