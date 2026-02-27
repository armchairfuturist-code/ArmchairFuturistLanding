
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Roboto, Geist_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The Armchair Futurist - Alex Myers | AI Strategy Advisor',
  description: 'Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week through human-first execution.',
  authors: [{ name: 'Alex Myers', url: 'https://www.linkedin.com/in/alex-myers-34572a10/' }],
  icons: {
    icon: '/img.jpg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Armchair Futurist - Alex Myers | AI Strategy Advisor',
    description: 'Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week through human-first execution.',
    url: '/',
    siteName: 'The Armchair Futurist',
    images: [
      {
        url: '/floop.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Myers - The Armchair Futurist - AI Strategy Advisor',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Armchair Futurist - Alex Myers | AI Strategy Advisor',
    description: 'Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week through human-first execution.',
    images: ['/floop.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(roboto.variable, geistMono.variable, dmSans.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-18FCVPH408"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-18FCVPH408');
          `}
        </Script>
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "The Armchair Futurist",
              "url": "https://thearmchairfuturist.com",
              "description": "Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week.",
              "author": { "@id": "https://thearmchairfuturist.com/#person" }
            })
          }}
        />
        {/* ProfessionalService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "The Armchair Futurist - Alex Myers",
              "description": "AI strategy advisory helping leaders close the accountability gap between AI outputs and business results through human-first execution.",
              "url": "https://thearmchairfuturist.com",
              "image": "https://thearmchairfuturist.com/floop.jpg",
              "logo": "https://thearmchairfuturist.com/img.jpg",
              "founder": { "@id": "https://thearmchairfuturist.com/#person" },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT"
              },
              "priceRange": "$97 - $55,250",
              "areaServed": "Worldwide",
              "knowsAbout": ["AI Strategy", "Change Management", "Future of Work", "Digital Transformation", "AI Adoption", "Organizational Design"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Strategy & Advisory Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Identity Landing Page",
                      "description": "Interview-ready digital identity site that translates your LinkedIn, resume, and social links into one professional platform you own. Delivered in 2-4 days.",
                      "provider": { "@id": "https://thearmchairfuturist.com/#person" }
                    },
                    "price": "199",
                    "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom AI Provisioning",
                      "description": "Done-for-you private AI command center with API integrations, workflow automation, and secure infrastructure. Reclaim 10-20 hours per week.",
                      "provider": { "@id": "https://thearmchairfuturist.com/#person" }
                    },
                    "price": "1000",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "minPrice": "1000",
                      "maxPrice": "5000",
                      "priceCurrency": "USD"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Mentoring & Mindset Coaching",
                      "description": "One-on-one AI mentoring that moves you from anxiety to agency. Combines practical tool guidance with mindset reframing for leaders and professionals.",
                      "provider": { "@id": "https://thearmchairfuturist.com/#person" }
                    },
                    "price": "97",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "minPrice": "97",
                      "maxPrice": "497",
                      "priceCurrency": "USD"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Infusion Lab",
                      "description": "10-week organizational transformation lab for launching AI initiatives at the edge, validating new business models, and designing human-machine workflows.",
                      "provider": { "@id": "https://thearmchairfuturist.com/#person" }
                    },
                    "price": "38250",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "minPrice": "38250",
                      "maxPrice": "55250",
                      "priceCurrency": "USD"
                    }
                  }
                ]
              }
            })
          }}
        />
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://thearmchairfuturist.com/#person",
              "name": "Alex Myers",
              "jobTitle": "Certified Futurist & AI Strategy Advisor",
              "url": "https://thearmchairfuturist.com",
              "image": "https://thearmchairfuturist.com/alexheadshot-nobg.png",
              "description": "Alex Myers is a certified futurist, AI strategy advisor, and change management professional who helps leaders and organizations bridge the accountability gap between AI outputs and business results.",
              "sameAs": [
                "https://www.linkedin.com/in/alex-myers-34572a10/",
                "https://armchairfuturist.substack.com/",
                "https://thegenaiacademy.com/expert-hub/alex-myers/"
              ],
              "knowsAbout": [
                "Artificial Intelligence Strategy",
                "AI Adoption & Change Management",
                "Future of Work",
                "Organizational Design",
                "Digital Transformation",
                "Blockchain & Web3",
                "Data Sovereignty",
                "Agile & Scrum",
                "AI Mentoring"
              ],
              "hasCredential": [
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certified Futurist & Long-Term Analyst (FLTA)" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certified Change Management Professional (CCMP)" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "GenAI Academy Expert" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certified Enterprise Blockchain Professional (CEBP)" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Professional Scrum Master (PSM)" },
                { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Professional Agile Leadership (PAL)" }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Alex Myers Consulting LLC"
              }
            })
          }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
