/**
 * Shared pricing — single source of truth across UI components and structured data.
 * Update here and both UI and SEO schema stay in sync.
 *
 * Previously split across constants.ts (COACHING_PACKAGES for UI) and
 * pricing.ts (PRICING for SEO) — now consolidated.
 */

export type CurrencyCode = 'EUR' | 'USD';

// ── Service pricing (used by StructuredData + ServicesSection) ──

export const SERVICES_PRICING = {
  digitalIdentity: {
    name: "Digital Identity Landing Page",
    price: 199,
    currency: "USD" as const,
    description:
      "Interview-ready digital identity site that translates your LinkedIn, resume, and social links into one professional platform you own. Delivered in 2-4 days.",
  },
  customAiProvisioning: {
    name: "Custom AI Provisioning",
    price: 1000,
    minPrice: 1000,
    maxPrice: 5000,
    currency: "USD" as const,
    description:
      "Done-for-you private AI command center with API integrations, workflow automation, and secure infrastructure. Reclaim 10-20 hours per week.",
  },

} as const;

// ── Coaching / mentoring packages (used by MentoringSection) ──

export interface CoachingPackage {
  id: string;
  name: string;
  sessions: number;
  totalPrice: number;
  totalPriceUSD: number;
  pricePerSession: number;
  pricePerSessionUSD: number;
  discountPercent: number;
  savings: number;
  savingsUSD: number;
  description: string;
  features: string[];
  popular: boolean;
}

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    id: 'single',
    name: 'Single Session',
    sessions: 1,
    totalPrice: 100,
    totalPriceUSD: 120,
    pricePerSession: 100,
    pricePerSessionUSD: 120,
    discountPercent: 0,
    savings: 0,
    savingsUSD: 0,
    description: 'One 60-minute 1-on-1 AI guidance session',
    features: [
      'Personal AI mindset coaching',
      'Practical framework for your context',
      'Actionable next steps',
    ],
    popular: false,
  },
  {
    id: 'pack-5',
    name: '5-Session Pack',
    sessions: 5,
    totalPrice: 475,
    totalPriceUSD: 570,
    pricePerSession: 95,
    pricePerSessionUSD: 114,
    discountPercent: 5,
    savings: 25,
    savingsUSD: 30,
    description: 'Five sessions with progress tracking and priority scheduling',
    features: [
      'Everything in Single Session',
      'Priority scheduling',
      'Progress tracking between sessions',
      'Personalized learning roadmap',
    ],
    popular: false,
  },
  {
    id: 'pack-10',
    name: '10-Session Pack',
    sessions: 10,
    totalPrice: 900,
    totalPriceUSD: 1100,
    pricePerSession: 90,
    pricePerSessionUSD: 110,
    discountPercent: 10,
    savings: 100,
    savingsUSD: 100,
    description: 'Deep transformation with sustained support and accountability',
    features: [
      'Everything in 5-Session Pack',
      'Custom AI literacy curriculum',
      'Between-session async support',
      'Quarterly progress review',
    ],
    popular: false,
  },
  {
    id: 'pack-20',
    name: '20-Session Pack',
    sessions: 20,
    totalPrice: 1700,
    totalPriceUSD: 2000,
    pricePerSession: 85,
    pricePerSessionUSD: 100,
    discountPercent: 15,
    savings: 300,
    savingsUSD: 400,
    description: 'Executive-level coaching with maximum savings and dedicated support',
    features: [
      'Everything in 10-Session Pack',
      'Dedicated account management',
      'Unlimited async support',
      'Custom session planning',
      'Priority rescheduling',
    ],
    popular: true,
  },
];

// ── Derived values ──

/** Coaching packages keyed by id for O(1) lookup */
export const COACHING_PACKAGES_BY_ID: Record<string, CoachingPackage> = Object.fromEntries(
  COACHING_PACKAGES.map((p) => [p.id, p]),
);

/** All prices from services + coaching for priceRange display */
const ALL_PRICES: number[] = [
  ...Object.values(SERVICES_PRICING).map((s) => s.price),
  ...COACHING_PACKAGES.flatMap((p) => [p.totalPrice, p.totalPriceUSD]),
];

export const PRICE_RANGE = {
  min: Math.min(...ALL_PRICES),
  max: Math.max(...ALL_PRICES),
};

// ── Backward-compat aliases (for StructuredData) ──

export const PRICING = SERVICES_PRICING;
export type PricingKey = keyof typeof SERVICES_PRICING;

/** Coaching entries in the old flat format used by StructuredData */
export const COACHING_PRICING: Record<string, { name: string; price: number; currency: string; description: string }> = Object.fromEntries(
  COACHING_PACKAGES.map((pkg) => [
    pkg.id,
    { name: pkg.name, price: pkg.totalPrice, currency: 'EUR', description: pkg.description },
  ]),
);

export const EUR_USD_RATE = 1.17;