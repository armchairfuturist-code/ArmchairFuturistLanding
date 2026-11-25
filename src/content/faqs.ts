import { PROGRAM_PRICE_LABEL, DIGITAL_IDENTITY_LABEL, CUSTOM_PROVISIONING_RANGE_LABEL, PACK_5_LABEL, SINGLE_SESSION_LABEL } from "@/lib/pricing";

/** FAQ Item content, presentation-free. */
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
      "It's the space between what an AI system produces and what a business needs. Most companies layer AI onto existing processes without rethinking workflows or decision rights. Nobody owns the outcome. I bridge this gap by teaching the literacy required to design and own the outcome yourself.",
    hasLink: true,
    linkText: "Learn more about the Accountability Gap →",
    linkHref: "/concepts/accountability-gap",
  },
  {
    question: "What qualifications do you have?",
    answer:
      "I hold six certifications: Certified Futurist and Long-Term Analyst (FLTA), Certified Change Management Professional (CCMP), GenAI Academy Expert, Certified Enterprise Blockchain Professional (CEBP), Professional Scrum Master (PSM), and Professional Agile Leadership (PAL). I've deployed 40+ AI systems. My organizational work uses data-driven team profiling; my change management is certified CCMP.",
    hasLink: true,
    linkText: "Full bio & certifications →",
    linkHref: "/about",
  },
  {
    question: "How much do services cost?",
    answer:
      `Two paths. Guidance starts at the 5-session pack (${PACK_5_LABEL}) and scales to 20 (up to 15% savings). The ${PROGRAM_PRICE_LABEL} Self-Sufficiency Program is an 8-week build sprint: 10–15 coaching sessions, a playbook, async support. The Digital Identity Landing Page (${DIGITAL_IDENTITY_LABEL}) is the easiest 'I do it for you' entry. Custom AI Provisioning runs ${CUSTOM_PROVISIONING_RANGE_LABEL} by scope.`,
  },
  {
    question: "How does AI guidance work?",
    answer:
      `One-on-one coaching over video, 60 minutes per session. Each session builds on your real work: we pick a bottleneck, work it live, and you leave with something running. A single session is ${SINGLE_SESSION_LABEL}; most clients start with a 5 or 10-session pack.`,
  },
  {
    question: "Why the program over a session pack?",
    answer:
      "Session packs build your AI judgment, at your pace. The Program builds your AI offering: a shipped system, a playbook, co-building, launch accountability, a fixed deliverable by week 8. Buy a pack to get good with AI. Apply to the Program to ship an offering.",
  },
  {
    question: "What happens between sessions?",
    answer:
      "Session packs include WhatsApp follow-up on session topics between calls. Build work is different: configuration, integrations, debugging, and infrastructure support live in the 8-week program, with async support so you are never stuck waiting a week.",
  },
  {
    question: "Can you work with organizations outside the US?",
    answer:
      "Yes. I serve clients worldwide from Portugal. All services are delivered remotely. Pricing is available in USD and EUR.",
  },
  {
    question: "What results can clients expect?",
    answer:
      "Clients typically reclaim 10–20 hours a week. Session clients stop asking whether a tool is safe and start deciding what it should own. By the end of the Program, most have launched an AI-powered service or built a brand around the work.",
  },
  {
    question: "How are you different from other AI consultants?",
    answer:
      "Most consultants sell you a tool. I sell you the judgment to outlast them. Procedural skill is deflating as AI absorbs it, so I build judgment first, then systems. Adoption fails on the human side first, so strategy is psychology-led. Stacks are open standard: you own your data, logic, and infrastructure.",
  },
  {
    question: "What is Custom AI Provisioning?",
    answer:
      `A done-for-you service where I build you a private AI command center: custom business workflows, agent installation (OpenClaw, Hermes), API integrations, calendar/email sync, and secure infrastructure. Pricing ranges ${CUSTOM_PROVISIONING_RANGE_LABEL} depending on scope, delivered in 1–2 weeks. You own everything: code, data, infrastructure.`,
  },
  {
    question: "Who do you work best with, and who isn't a fit?",
    answer:
      "Best fit: founders, creators, and independents who want AI skills they own. People who touch the tools themselves. Small teams ready to build their own AI services. Not a fit: enterprises that want presentation theatre. Leaders who want AI 'in theory'. Anyone expecting AI to fix a culture problem. If your team won't touch the tools, I'm not your consultant.",
  },
  {
    question: "Do you install AI agents?",
    answer:
      "Installation is the easy part; Hermes, Grok, and OpenClaw make it a weekend task. The work is deciding what the agent owns, structuring its workflow, and measuring whether it returns time worth having. I build all three: one owned task, a workflow with human checkpoints, an eight-week measurement loop. Skip those and you automated a guess.",
    hasLink: true,
    linkText: "Read about the Install Trap →",
    linkHref: "/concepts/the-install-trap",
  },
  {
    question: "How do I get started?",
    answer:
      `Three ways, depending on where you are. The Digital Identity Landing Page (${DIGITAL_IDENTITY_LABEL}) requires no call. Submit the intake. For guidance, browse session packs starting at ${SINGLE_SESSION_LABEL} or apply for the AI Self-Sufficiency Program. For done-for-you builds, request a 30-minute fit call and I'll scope the work.`,
  },
  /* Novice questions. Researched from what first-time AI users actually ask
     (plans/research/novice-faq-candidates.json), not invented: each one is a
     question type that recurred across forums before the visitor ever reaches
     a consultant. Answers avoid prices on purpose, because the labels live in
     src/lib/pricing.ts. */
  {
    question: "I hear what AI can do. Why can't I make it work?",
    answer:
      "The tools are real. What is missing is the base: how the model reads your instructions, what it can see, and where it stops. Without that, every attempt looks random. With it, the same tool does the job. I teach the base on your own work, so you test it on something you actually need.",
  },
  {
    question: "Why am I paying twice for AI?",
    answer:
      "Most people end up with two tools that do the same job, because each new app asked for a card before it would work. I list every AI bill you have, mark what each one does, cancel the overlap, and move the work to the cheaper tool that still does it. You keep the list.",
  },
  {
    question: "Why do I run out of AI usage so fast?",
    answer:
      "Usage drains from three places: long chats that never get restarted, the biggest model answering small questions, and the same document pasted in again and again. I check those three, move small jobs to the smaller model, and store your documents once. Most people cut their usage without losing the work they care about.",
  },
  {
    question: "Why does my AI make things up?",
    answer:
      "It invents when it does not have the facts and still has to answer. The fix is to give it your real documents and one rule: quote the source, or say you do not know. Then test it on ten questions where you already know the answer.",
  },
  {
    question: "Why does my AI forget what I told it?",
    answer:
      "A chat only remembers the text still inside it. When the window fills, the oldest lines drop out. Long projects need a file or a saved memory, not a longer chat. I set that up once, so each session starts with the facts already loaded.",
  },
  {
    question: "Why is my AI so slow?",
    answer:
      "The tool is either thinking at length, searching the web, or queued behind other users. You can switch thinking off for simple questions, stop it searching when you did not ask for fresh facts, and keep one chat per task. Each change is a setting, not a new subscription.",
  },
  {
    question: "Which thinking mode should I set?",
    answer:
      "The smallest one that gets the job done. Quick edits, rewording, and drafting need no extra thinking. Planning, code, and maths need the long mode. When unsure, run the question in the small mode first, and switch up only if the answer misses.",
  },
  {
    question: "What is the difference between web chat and AI installed on my computer?",
    answer:
      "Web chat lives in a browser tab. Nothing to install, and it forgets when you close the tab. Installed AI runs on your machine, reads your files and folders, and keeps the work there. Start with web chat. Move to an installed tool when the work needs your own files, or a job that runs without you.",
  },
  {
    question: "How do I get AI to do more of my work?",
    answer:
      "Write down the five jobs you repeat each week. Pick the one with the same steps every time. Automate that one first, keep a person on the exceptions, and measure the hours saved before you touch the next. Most people start with the biggest job and quit, because it has too many exceptions.",
  },
  {
    question: "What does it cost to fix these?",
    answer:
      "A 20-minute call or a WhatsApp message costs nothing. One session is $120 / €100. The roadmap audit is $297 / €247, with a written plan you keep. A full build runs $1,000 to $5,000 / €850 to €4,250 over one to two weeks.",
  },
];
