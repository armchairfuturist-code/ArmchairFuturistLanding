/** FAQ Item content — presentation-free. */
export interface FaqItem {
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkHref?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is the Armchair Futurist?",
    answer:
      "I'm a partner in learning for founders, creators, and small teams who want to design, launch, and sell AI-powered services on their own terms. However you start, you finish independent.",
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
      "I hold six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). I've deployed 40+ AI systems and run on evidence-based methodology. My organizational work uses data-driven profiling to segment teams, and my change management practice is grounded in certified CCMP methodology.",
    hasLink: true,
    linkText: "Full bio & certifications →",
    linkHref: "/about",
  },
  {
    question: "How much do services cost?",
    answer:
      "Two paths. 'We do it together' guidance starts at the 5-session pack ($570 / €475) and scales through 10 and 20-session packs (up to 15% savings). These build your AI literacy at your own pace. The $2,497 AI Self-Sufficiency Program is an 8-week build sprint where you launch your own AI-powered service or brand, with 10-15 coaching sessions, a structured playbook, and async support. The Digital Identity Landing Page ($233 / €199) is the easiest entry into the 'I do it for you' path. Custom AI Provisioning runs $1,000–$5,000 (€850–€4,275) depending on scope.",
  },
  {
    question: "How does AI guidance work?",
    answer:
      "One-on-one coaching. A single session is $120 (€100). Packs start at $570 (€475) for 5 sessions, with deeper discounts at 10 and 20. I focus on building mental models for how AI works, then testing them live on your real work. Each session blends practical guidance with how AI changes your role, your business, and your opportunities. Most clients start with 5 or 10 sessions.",
  },
  {
    question: "Why the program instead of a session pack?",
    answer:
      "Session packs build your AI judgment — the mental models and literacy to evaluate and use AI well, at your own pace. The Self-Sufficiency Program builds your AI offering — a shipped system, structured playbook, co-building support, and launch accountability, with a fixed deliverable by week 8 (10–15 sessions plus async support between them). Session packs are coaching; the Program is a build engagement with accountability. If you want to get good with AI, buy a pack. If you want to ship an AI offering, apply for the program.",
  },
  {
    question: "What happens between sessions?",
    answer:
      "Session packs include follow-up on session-related topics via WhatsApp — questions, sense-checks, and next-step guidance between calls. Build work is different: configuration, integrations, debugging, and infrastructure support live in the 8-week program, which includes async build support so you're never stuck waiting a week between working sessions.",
  },
  {
    question: "Can you work with organizations outside the US?",
    answer:
      "Yes. I serve clients worldwide from Portugal. All services are delivered remotely. Pricing is available in USD and EUR.",
  },
  {
    question: "What results can clients expect?",
    answer:
      "Clients typically reclaim 10-20 hours per week through AI-powered automation. Individual clients gain clarity and shift from overwhelm to agency. By the end of the AI Self-Sufficiency Program, most clients have launched their own AI-powered service or built their personal brand around the work.",
  },
  {
    question: "How are you different from other AI consultants?",
    answer:
      "Most consultants sell you a tool. I sell you the judgment to outlast the tools. Procedural skill is deflating as AI absorbs it, so I build judgment first, then the systems. I pair that with psychology-led strategy, because adoption fails on the human side first. And I build on open-standard stacks, so you own your data, your logic, and your infrastructure.",
  },
  {
    question: "What is Custom AI Provisioning?",
    answer:
      "A done-for-you service where I build you a private AI command center: custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Pricing ranges $1,000–$5,000 (€850–€4,275) depending on scope, delivered in 1-2 weeks. You own everything: code, data, infrastructure.",
  },
  {
    question: "Who do you work best with, and who isn't a fit?",
    answer:
      "Best fit: founders, creators, and independent professionals who want AI literacy and leverage, not another dependency. People willing to touch the tools themselves. Small teams ready to build their own AI-powered services. Not a fit: large enterprises seeking presentation theatre for board meetings. Leaders who want AI 'in theory' without readiness. Anyone expecting AI to solve underlying culture problems. If your team won't touch the tools, I'm not the right consultant.",
  },
  {
    question: "How do I get started?",
    answer:
      "Three ways, depending on where you are. The Digital Identity Landing Page ($233 / €199) requires no call. Just submit the intake. For guidance, browse session packs starting at $120 (€100) or apply for the AI Self-Sufficiency Program. For done-for-you builds, request a 30-minute fit call and I'll scope the work.",
  },
];
