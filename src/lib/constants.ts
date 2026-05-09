export const CALENDAR_URL = 'https://calendar.app.google/nAHHwNMfhDvXGv7P7';
export const GOOGLE_FORM_URL = 'https://forms.gle/ASNfu9Wr1qRLBZ8C8';
export const SUBSTACK_URL = 'https://armchairfuturist.substack.com';
export const SPEAKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header';

// Round USD pricing (single session baseline: $120)
export const EUR_USD_RATE = 1.17;

export type CurrencyCode = 'EUR' | 'USD';

// Coaching package pricing (base in EUR, USD at current exchange rate)
export const COACHING_PACKAGES = [
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
    description: 'One 60-minute 1-on-1 AI mentoring session',
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
