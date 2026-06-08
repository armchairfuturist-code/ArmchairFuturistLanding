/**
 * Shared pricing constants used across UI components and structured data.
 * Single source of truth — update here and both UI and SEO schema stay in sync.
 */

export const PRICING = {
  digitalIdentity: {
    name: "Digital Identity Landing Page",
    price: 199,
    currency: "USD",
    description:
      "Interview-ready digital identity site that translates your LinkedIn, resume, and social links into one professional platform you own. Delivered in 2-4 days.",
  },
  customAiProvisioning: {
    name: "Custom AI Provisioning",
    price: 1000,
    minPrice: 1000,
    maxPrice: 5000,
    currency: "USD",
    description:
      "Done-for-you private AI command center with API integrations, workflow automation, and secure infrastructure. Reclaim 10-20 hours per week.",
  },
  aiGuidanceSingle: {
    name: "AI Guidance - Single Session",
    price: 116,
    currency: "EUR",
    description:
      "One 60-minute 1-on-1 AI guidance session. Personal mindset coaching, practical framework, and actionable next steps.",
  },
  aiGuidance5Pack: {
    name: "AI Guidance - 5-Session Pack",
    price: 475,
    currency: "EUR",
    description:
      "Five 1-on-1 AI guidance sessions with progress tracking, priority scheduling, and personalized learning roadmap.",
  },
  aiGuidance10Pack: {
    name: "AI Guidance - 10-Session Pack",
    price: 900,
    currency: "EUR",
    description:
      "Ten 1-on-1 AI guidance sessions with custom AI literacy curriculum, async support, and quarterly progress review. Most popular option.",
  },
  aiGuidance20Pack: {
    name: "AI Guidance - 20-Session Pack",
    price: 1700,
    currency: "EUR",
    description:
      "Twenty 1-on-1 AI guidance sessions with dedicated account management, unlimited async support, and priority rescheduling. Executive-level coaching.",
  },
  aiIndependenceIncubator: {
    name: "AI Independence Incubator",
    price: 12000,
    currency: "USD",
    description:
      "3-month executive program for AI-powered service launches, with accountability, peer cohort, and full launch support.",
  },
} as const;

export type PricingKey = keyof typeof PRICING;

/** Derived: cheapest and most expensive service for priceRange display */
export const PRICE_RANGE = (() => {
  const prices = Object.values(PRICING).map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
})();
