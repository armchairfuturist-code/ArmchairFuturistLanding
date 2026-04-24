
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import { Playfair_Display, Lora, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
});

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Armchair Futurist - Alex Myers | AI Strategy Advisor',
    template: '%s | The Armchair Futurist'
  },
  description: 'Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week through human-first execution. Based in Portugal, serving clients worldwide.',
  authors: [
    { 
      name: 'Alex Myers', 
      url: 'https://www.linkedin.com/in/alex-myers-34572a10/' 
    }
  ],
  creator: 'Alex Myers',
  publisher: 'The Armchair Futurist',
  keywords: [
    'AI Strategy',
    'AI Adoption',
    'Change Management',
    'Future of Work',
    'Organizational Design',
    'Digital Transformation',
    'AI Mentoring',
    'Workflow Automation',
    'Accountability Gap',
    'Psychology-Led Adoption',
    'Alex Myers',
    'Certified Futurist',
    'AI Consultant'
  ],
  icons: {
    icon: '/img.jpg',
    apple: '/img.jpg',
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
        type: 'image/jpeg',
      },
    ],
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Armchair Futurist - Alex Myers | AI Strategy Advisor',
    description: 'Alex Myers is a certified futurist and AI strategy advisor who helps leaders navigate AI adoption, close the accountability gap, and reclaim 10-20 hours per week through human-first execution.',
    images: ['/floop.jpg'],
    creator: '@armchairfuturist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(playfairDisplay.variable, lora.variable, inter.variable, jetBrainsMono.variable, "font-sans antialiased flex flex-col min-h-screen")}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        )}
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
        {/* Person Schema - Enhanced with awards, publications, and full credentials */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://thearmchairfuturist.com/#person",
              "name": "Alex Myers",
              "givenName": "Alex",
              "familyName": "Myers",
              "jobTitle": "Certified Futurist & AI Strategy Advisor",
              "url": "https://thearmchairfuturist.com",
              "image": "https://thearmchairfuturist.com/alexheadshot-nobg.png",
              "description": "Alex Myers is a certified futurist, AI strategy advisor, and change management professional who helps leaders and organizations bridge the accountability gap between AI outputs and business results. Based in Portugal, serving clients worldwide.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT",
                "addressLocality": "Portugal"
              },
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
                "AI Mentoring",
                "Psychology-Led Adoption",
                "Human-Machine Workflow Design"
              ],
              "hasCredential": [
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "Certified Futurist & Long-Term Analyst (FLTA)",
                  "description": "Futures thinking and scenario planning certification"
                },
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "Certified Change Management Professional (CCMP)",
                  "description": "Organizational change management methodology"
                },
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "GenAI Academy Expert",
                  "description": "Generative AI implementation expertise"
                },
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "Certified Enterprise Blockchain Professional (CEBP)",
                  "description": "Distributed systems and blockchain architecture"
                },
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "Professional Scrum Master (PSM)",
                  "description": "Agile methodology and Scrum framework"
                },
                { 
                  "@type": "EducationalOccupationalCredential", 
                  "credentialCategory": "certification", 
                  "name": "Professional Agile Leadership (PAL)",
                  "description": "Organizational agility and leadership"
                }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Alex Myers Consulting LLC",
                "url": "https://thearmchairfuturist.com"
              },
              "award": "Certified Futurist & Long-Term Analyst",
              "alumniOf": "GenAI Academy",
              "hasOccupation": {
                "@type": "Occupation",
                "name": "AI Strategy Advisor",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "Portugal"
                },
                "estimatedSalary": {
                  "@type": "MonetaryAmountDistribution",
                  "name": "Service Range",
                  "currency": "USD",
                  "minValue": 97,
                  "maxValue": 55250
                },
                "skills": "AI Strategy, Change Management, Future of Work, Organizational Design"
              }
            })
          }}
        />
        {/* Organization Schema - Enhanced for AI entity recognition */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://thearmchairfuturist.com/#organization",
              "name": "The Armchair Futurist",
              "alternateName": "Alex Myers Consulting",
              "url": "https://thearmchairfuturist.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thearmchairfuturist.com/img.jpg",
                "width": 600,
                "height": 600
              },
              "image": {
                "@type": "ImageObject",
                "url": "https://thearmchairfuturist.com/floop.jpg",
                "width": 1200,
                "height": 630
              },
              "description": "The Armchair Futurist is the advisory practice of Alex Myers, a certified futurist and AI strategy advisor. Alex helps leaders and organizations navigate AI adoption by bridging the Accountability Gap—the space between AI outputs and business results.",
              "founder": { "@id": "https://thearmchairfuturist.com/#person" },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT",
                "addressLocality": "Portugal"
              },
              "areaServed": "Worldwide",
              "sameAs": [
                "https://www.linkedin.com/in/alex-myers-34572a10/",
                "https://armchairfuturist.substack.com/",
                "https://thegenaiacademy.com/expert-hub/alex-myers/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English",
                "areaServed": "Worldwide"
              },
              "knowsAbout": [
                "AI Strategy",
                "AI Adoption",
                "Change Management",
                "Future of Work",
                "Organizational Design",
                "Digital Transformation",
                "AI Mentoring",
                "Workflow Automation"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Strategy & Advisory Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Identity Landing Page",
                      "description": "Interview-ready digital identity site delivered in 2-4 days"
                    },
                    "price": "199",
                    "priceCurrency": "USD"
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "AI Mentoring & Mindset Coaching",
                      "description": "One-on-one AI mentoring from anxiety to agency"
                    },
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
                      "name": "Custom AI Provisioning",
                      "description": "Private AI command center with API integrations"
                    },
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
                      "name": "AI Infusion Lab",
                      "description": "10-week organizational transformation program"
                    },
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
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thearmchairfuturist.com" },
                { "@type": "ListItem", "position": 2, "name": "About", "item": "https://thearmchairfuturist.com/about" },
                { "@type": "ListItem", "position": 3, "name": "Assessment", "item": "https://thearmchairfuturist.com/assessment" },
                { "@type": "ListItem", "position": 4, "name": "Blog", "item": "https://thearmchairfuturist.com/blog" },
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />

        {/* Retargeting Pixels */}
        {/* Meta Pixel */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

        {/* LinkedIn Insight Tag */}
        {process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG && (
          <Script
            id="linkedin-insight"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_TAG}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
