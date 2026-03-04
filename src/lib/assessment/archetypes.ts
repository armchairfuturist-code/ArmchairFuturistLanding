import { CALENDAR_URL, GOOGLE_FORM_URL, SUBSTACK_URL } from '@/lib/constants';

export interface Archetype {
  slug: string;
  name: string;
  headline: string;
  diagnosis: string[];
  primaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  faq: Array<{ question: string; answer: string }>;
  metaTitle: string;
  metaDescription: string;
}

export const archetypes: Archetype[] = [
  {
    slug: 'stalled-executive',
    name: 'The Stalled Executive',
    headline: 'You know AI matters. Your organization doesn\'t move.',
    diagnosis: [
      'You see the wave coming. You\'ve probably been talking about it for a year or more. But every time you push for action, the same thing happens: committees form, pilots launch, reports get written, and nothing changes. The organization treats AI adoption like a risk to manage instead of a direction to commit to.',
      'This isn\'t a technology problem. It\'s an organizational inertia problem disguised as due diligence. The pilots aren\'t failing because the tools are wrong. They\'re failing because nobody has the authority or the framework to say "this is how we work now" and follow through.',
      'You need someone who speaks both languages: organizational design and AI logic. Not a vendor pitch. Not another strategy deck. A working session that ends with decisions, not recommendations.',
    ],
    primaryCta: {
      label: 'Book a Strategy Call',
      href: CALENDAR_URL,
      external: true,
    },
    secondaryCta: {
      label: 'See how I work with executive teams',
      href: '/#services',
    },
    faq: [
      {
        question: 'What does it mean if my AI readiness score shows "Stalled Executive"?',
        answer: 'It means you have high urgency and awareness about AI but your organization lacks the clarity and readiness to execute. The bottleneck is organizational, not technical. You understand the stakes but can\'t get your teams to move past pilot programs and committee meetings.',
      },
      {
        question: 'How can a stalled executive improve their AI strategy?',
        answer: 'Focus on organizational design before tool selection. The problem is usually authority gaps, unclear ownership, and pilot fatigue. A strategy call with Alex Myers can identify the specific blockers in your org and create a framework for committed action rather than perpetual exploration.',
      },
      {
        question: 'What services help executives whose AI initiatives keep stalling?',
        answer: 'The AI Infusion Lab is a 10-week organizational transformation program designed for exactly this situation. For a faster start, a strategy call can diagnose the specific blockers and create an action plan in a single session.',
      },
    ],
    metaTitle: 'AI Readiness: The Stalled Executive | The Armchair Futurist',
    metaDescription: 'Your AI readiness assessment shows high urgency but low organizational readiness. Alex Myers helps executives break through AI adoption paralysis with human-first strategy.',
  },
  {
    slug: 'curious-professional',
    name: 'The Curious Professional',
    headline: 'You\'re interested but you haven\'t committed to a direction yet.',
    diagnosis: [
      'You\'re reading the newsletters, watching the demos, maybe trying a tool here and there. You know AI is important but you haven\'t found a framework that connects the dots between "interesting technology" and "what I actually do with my career."',
      'The overwhelm you feel comes from consuming without a filter. Every week there\'s a new model, a new app, a new prediction about which jobs disappear next. Without a mental model for sorting signal from noise, all of it feels equally urgent and equally confusing.',
      'You don\'t need more information. You need a thinking partner who can help you build your own filter, so you stop reacting to the news cycle and start making deliberate choices about where AI fits in your work.',
    ],
    primaryCta: {
      label: 'Start with AI Mentoring',
      href: '/#ai-mentoring',
    },
    secondaryCta: {
      label: 'Get the weekly newsletter',
      href: SUBSTACK_URL,
      external: true,
    },
    faq: [
      {
        question: 'What does it mean if my AI readiness score shows "Curious Professional"?',
        answer: 'It means you\'re actively interested in AI but haven\'t committed to a specific direction. You\'re consuming information without a framework for filtering it. This is the most common profile and the easiest to address with the right mentoring.',
      },
      {
        question: 'How can a curious professional build AI readiness?',
        answer: 'Stop trying to track every tool and start building a mental model for evaluating which ones matter to your specific context. AI Mentoring with Alex Myers provides a structured framework for moving from overwhelmed consumer to confident decision-maker.',
      },
      {
        question: 'What services help professionals who feel overwhelmed by AI?',
        answer: 'AI Mentoring and Mindset Coaching sessions range from $97 to $497 and focus on building your personal framework for navigating AI. The weekly Substack newsletter provides ongoing high-signal insights without the noise.',
      },
    ],
    metaTitle: 'AI Readiness: The Curious Professional | The Armchair Futurist',
    metaDescription: 'Your AI readiness assessment shows curiosity without direction. Alex Myers helps professionals build a personal framework for navigating AI with clarity and confidence.',
  },
  {
    slug: 'ready-builder',
    name: 'The Ready Builder',
    headline: 'You know what you need. You need someone to build it.',
    diagnosis: [
      'You\'ve done the thinking. You have a vision for how AI fits into your work or your business. What\'s missing isn\'t more strategy sessions or another course. It\'s execution capacity: someone who can take your vision and turn it into a specific, working deliverable.',
      'Maybe it\'s a professional identity that matches where you\'re headed. Maybe it\'s a custom AI workflow that automates the parts of your job that don\'t need you. Either way, you\'re past the exploration phase. You know what you want; you just need the right partner to build it.',
      'The good news: you\'re the easiest person to help, because you\'ve already done the hard part. You\'ve made the decision. Now it\'s about execution.',
    ],
    primaryCta: {
      label: 'Claim Your $199 Digital Identity Page',
      href: GOOGLE_FORM_URL,
      external: true,
    },
    secondaryCta: {
      label: 'Explore custom AI solutions',
      href: '/#services',
    },
    faq: [
      {
        question: 'What does it mean if my AI readiness score shows "Ready Builder"?',
        answer: 'It means you have high clarity and readiness. You understand what you need and you\'re prepared to invest in getting it built. You don\'t need more strategy; you need execution.',
      },
      {
        question: 'How can a ready builder take the next step with AI?',
        answer: 'Start with a specific deliverable. The $199 Digital Identity Landing Page is the fastest way to get a tangible result: a professional site that reflects where you\'re going, delivered in 2-4 days. For larger projects, Custom AI Provisioning builds private AI workflows tailored to your business.',
      },
      {
        question: 'What services are available for people ready to build with AI?',
        answer: 'The Digital Identity Landing Page ($199) delivers a professional site in 2-4 days. Custom AI Provisioning ($1,000-$5,000) builds private AI command centers with API integrations and workflow automation.',
      },
    ],
    metaTitle: 'AI Readiness: The Ready Builder | The Armchair Futurist',
    metaDescription: 'Your AI readiness assessment shows high clarity and readiness. Alex Myers helps builders execute with Digital Identity pages and custom AI solutions.',
  },
  {
    slug: 'overwhelmed-leader',
    name: 'The Overwhelmed Leader',
    headline: 'You see it clearly. Your organization is frozen.',
    diagnosis: [
      'This is the hardest place to be. You\'re not confused about AI. You understand what needs to happen. But your organization can\'t metabolize the change. Every initiative gets watered down by consensus. Every timeline gets stretched by "stakeholder alignment." The gap between your clarity and your org\'s readiness is exhausting.',
      'The bottleneck isn\'t technical and it isn\'t strategic. It\'s cultural. The organization is optimized for stability, and AI adoption requires instability. You can\'t solve this with a better tool selection process or a more compelling business case. You need to change how the organization relates to change itself.',
      'This is transformation work, not tool selection. It requires someone who understands group dynamics, organizational inertia, and how to create the conditions where committed action becomes possible.',
    ],
    primaryCta: {
      label: 'Book a Strategy Call',
      href: CALENDAR_URL,
      external: true,
    },
    secondaryCta: {
      label: 'Learn about the AI Infusion Lab',
      href: '/#services',
    },
    faq: [
      {
        question: 'What does it mean if my AI readiness score shows "Overwhelmed Leader"?',
        answer: 'It means you have high clarity and urgency but low organizational readiness. You understand AI\'s importance and you see what needs to happen, but your organization resists change. The problem is cultural, not technical.',
      },
      {
        question: 'How can an overwhelmed leader unfreeze their organization for AI?',
        answer: 'Stop trying to convince and start creating conditions for change. The AI Infusion Lab is a 10-week program that works at the organizational level, addressing the cultural and structural barriers that keep teams stuck in pilot mode.',
      },
      {
        question: 'What services help leaders dealing with organizational AI resistance?',
        answer: 'A strategy call is the fastest way to diagnose your specific situation. For sustained transformation, the AI Infusion Lab ($38,250-$55,250) is a 10-week program designed for organizations stuck between AI awareness and AI action.',
      },
    ],
    metaTitle: 'AI Readiness: The Overwhelmed Leader | The Armchair Futurist',
    metaDescription: 'Your AI readiness assessment shows high clarity but frozen organizational readiness. Alex Myers helps leaders break through cultural resistance to AI adoption.',
  },
];

export const ARCHETYPE_SLUGS = archetypes.map((a) => a.slug);

export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug);
}
