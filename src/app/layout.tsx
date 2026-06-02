import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";
import FirebaseAnalytics from "@/components/analytics/FirebaseAnalytics";

// Apple SF Pro design system
// Display headlines: system-ui, -apple-system, sans-serif (SF Pro on Apple, Inter substitute)
// Body/UI: Inter, system-ui, sans-serif — SF Pro substitute with Apple tracking rules

const siteUrl = "https://thearmchairfuturist.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alex Myers - AI Literacy Mentor",
    template: "%s | Alex Myers - AI Literacy Mentor",
  },
  description:
    "Alex Myers is an AI literacy mentor who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
  authors: [
    {
      name: "Alex Myers",
      url: "https://www.linkedin.com/in/alex-myers-34572a10/",
    },
  ],
  creator: "Alex Myers",
  publisher: "The Armchair Futurist",
  keywords: [
    "AI Strategy",
    "AI Adoption",
    "Change Management",
    "Future of Work",
    "Organizational Design",
    "Digital Transformation",
    "AI Mentoring",
    "Workflow Automation",
    "Accountability Gap",
    "Psychology-Led Adoption",
    "Alex Myers",
    "Certified Futurist",
    "AI Consultant",
    "AI literacy",
    "AI mentorship",
    "AI training",
    "AI education",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Myers - AI Literacy Mentor",
    description:
      "Alex Myers is an AI literacy mentor who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
    url: "/",
    siteName: "AI Literacy Mentor",
    images: [
      {
        url: "/floop.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Myers - AI Literacy Mentor",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_US",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Myers - AI Literacy Mentor",
    description:
      "Alex Myers is an AI literacy mentor who teaches you to design, launch, and sell your own AI-powered services. No dependency. No retainer. Just understanding.",
    images: ["/floop.jpg"],
    creator: "@armchairfuturist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Display font: Space Grotesk (Google Fonts) — geometric sans with
// single-story 'a' and tight apertures. Pairs well with Manrope for body.
// To re-add Forma DJR Micro as primary, prepend it to --font-display in
// globals.css when licensing is secured.
import { Manrope, Space_Grotesk } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          manrope.variable,
          spaceGrotesk.variable,
          "font-sans antialiased flex flex-col min-h-[100dvh]",
        )}
      >
        {/* Skip to content - first focusable element for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Script id="google-analytics" strategy="afterInteractive">
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
              name: "The Armchair Futurist",
              url: "https://thearmchairfuturist.com",
              description:
                "Alex Myers is an AI literacy mentor who teaches you to design, launch, and sell your own AI-powered services — no dependency, no retainer, just understanding.",
              author: { "@id": "https://thearmchairfuturist.com/#person" },
            }),
          }}
        />
        {/* ProfessionalService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "The Armchair Futurist - Alex Myers",
              description:
                "AI literacy mentorship and done-for-you AI implementation. Alex teaches you to design, launch, and sell your own AI-powered services.",
              url: "https://thearmchairfuturist.com",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "40",
                bestRating: "5",
                worstRating: "1"
              },
              image: "https://thearmchairfuturist.com/floop.jpg",
              logo: "https://thearmchairfuturist.com/img.jpg",
              founder: { "@id": "https://thearmchairfuturist.com/#person" },
              address: {
                "@type": "PostalAddress",
                addressCountry: "PT",
              },
              priceRange: "$116 - $12,000",
              areaServed: "Worldwide",
              knowsAbout: [
                "AI Strategy",
                "Change Management",
                "Future of Work",
                "Digital Transformation",
                "AI Adoption",
                "Organizational Design",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI Strategy & Advisory Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Identity Landing Page",
                      description:
                        "Interview-ready digital identity site that translates your LinkedIn, resume, and social links into one professional platform you own. Delivered in 2-4 days.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "199",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom AI Provisioning",
                      description:
                        "Done-for-you private AI command center with API integrations, workflow automation, and secure infrastructure. Reclaim 10-20 hours per week.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "1000",
                    priceCurrency: "USD",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      minPrice: "1000",
                      maxPrice: "5000",
                      priceCurrency: "USD",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - Single Session",
                      description:
                        "One 60-minute 1-on-1 AI mentoring session. Personal mindset coaching, practical framework, and actionable next steps.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "100",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 5-Session Pack",
                      description:
                        "Five 1-on-1 AI mentoring sessions with progress tracking, priority scheduling, and personalized learning roadmap.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "475",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 10-Session Pack",
                      description:
                        "Ten 1-on-1 AI mentoring sessions with custom AI literacy curriculum, async support, and quarterly progress review. Most popular option.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "900",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 20-Session Pack",
                      description:
                        "Twenty 1-on-1 AI mentoring sessions with dedicated account management, unlimited async support, and priority rescheduling. Executive-level coaching.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "1700",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Independence Incubator",
                      description:
                        "3-month executive program for AI-powered service launches, with accountability, peer cohort, and full launch support.",
                      provider: {
                        "@id": "https://thearmchairfuturist.com/#person",
                      },
                    },
                    price: "12000",
                    priceCurrency: "USD",
                  },
                ],
              },
            }),
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
              name: "Alex Myers",
              givenName: "Alex",
              familyName: "Myers",
              jobTitle: "AI Literacy Mentor",
              url: "https://thearmchairfuturist.com",
              image: "https://thearmchairfuturist.com/alexheadshot-nobg.png",
              description:
                "Alex Myers is an AI literacy mentor who teaches individuals and businesses to design, launch, and sell their own AI-powered services. Based in Portugal, serving clients worldwide.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PT",
                addressLocality: "Portugal",
              },
              sameAs: [
                "https://www.linkedin.com/in/alex-myers-34572a10/",
                "https://armchairfuturist.substack.com/",
                "https://thegenaiacademy.com/expert-hub/alex-myers/",
              ],
              knowsAbout: [
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
                "Human-Machine Workflow Design",
              ],
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "Certified Futurist & Long-Term Analyst (FLTA)",
                  description:
                    "Futures thinking and scenario planning certification",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "Certified Change Management Professional (CCMP)",
                  description: "Organizational change management methodology",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "GenAI Academy Expert",
                  description: "Generative AI implementation expertise",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "Certified Enterprise Blockchain Professional (CEBP)",
                  description:
                    "Distributed systems and blockchain architecture",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "Professional Scrum Master (PSM)",
                  description: "Agile methodology and Scrum framework",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "certification",
                  name: "Professional Agile Leadership (PAL)",
                  description: "Organizational agility and leadership",
                },
              ],
              worksFor: {
                "@type": "Organization",
                name: "Alex Myers Consulting LLC",
                url: "https://thearmchairfuturist.com",
              },
              award: "Certified Futurist & Long-Term Analyst",
              alumniOf: "GenAI Academy",
              hasOccupation: {
                "@type": "Occupation",
                name: "AI Literacy Mentor",
                occupationLocation: {
                  "@type": "Country",
                  name: "Portugal",
                },
                estimatedSalary: {
                  "@type": "MonetaryAmountDistribution",
                  name: "Service Range",
                  currency: "EUR",
                  minValue: 100,
                  maxValue: 12000,
                },
                skills:
                  "AI Strategy, Change Management, Future of Work, Organizational Design",
              },
            }),
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
              name: "The Armchair Futurist",
              alternateName: "Alex Myers Consulting",
              url: "https://thearmchairfuturist.com",
              logo: {
                "@type": "ImageObject",
                url: "https://thearmchairfuturist.com/img.jpg",
                width: 600,
                height: 600,
              },
              image: {
                "@type": "ImageObject",
                url: "https://thearmchairfuturist.com/floop.jpg",
                width: 1200,
                height: 630,
              },
              description:
                "The Armchair Futurist is the AI literacy practice of Alex Myers. He teaches individuals and businesses to design, launch, and sell their own AI-powered services — no dependency, no retainer, just understanding.",
              founder: { "@id": "https://thearmchairfuturist.com/#person" },
              address: {
                "@type": "PostalAddress",
                addressCountry: "PT",
                addressLocality: "Portugal",
              },
              areaServed: "Worldwide",
              sameAs: [
                "https://www.linkedin.com/in/alex-myers-34572a10/",
                "https://armchairfuturist.substack.com/",
                "https://thegenaiacademy.com/expert-hub/alex-myers/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
                areaServed: "Worldwide",
              },
              knowsAbout: [
                "AI Strategy",
                "AI Adoption",
                "Change Management",
                "Future of Work",
                "Organizational Design",
                "Digital Transformation",
                "AI Mentoring",
                "Workflow Automation",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI Literacy Mentorship & Done-For-You Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Identity Landing Page",
                      description:
                        "Interview-ready digital identity site delivered in 2-4 days",
                    },
                    price: "199",
                    priceCurrency: "USD",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - Single Session",
                      description:
                        "One 60-minute 1-on-1 AI mentoring session",
                    },
                    price: "100",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 5-Session Pack",
                      description:
                        "Five 1-on-1 AI mentoring sessions with progress tracking",
                    },
                    price: "475",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 10-Session Pack",
                      description:
                        "Ten 1-on-1 AI mentoring sessions, most popular option",
                    },
                    price: "900",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Mentoring - 20-Session Pack",
                      description:
                        "Twenty 1-on-1 AI mentoring sessions, executive-level",
                    },
                    price: "1700",
                    priceCurrency: "EUR",
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom AI Provisioning",
                      description:
                        "Private AI command center with API integrations",
                    },
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      minPrice: "1000",
                      maxPrice: "5000",
                      priceCurrency: "USD",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Independence Incubator",
                      description:
                        "3-month executive program for launching your own AI-powered service with accountability, peer cohort, and full launch support.",
                    },
                    price: "12000",
                    priceCurrency: "USD",
                  },
                ],
              },
            }),
          }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://thearmchairfuturist.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About",
                  item: "https://thearmchairfuturist.com/about",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Assessment",
                  item: "https://thearmchairfuturist.com/assessment",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Blog",
                  item: "https://thearmchairfuturist.com/blog",
                },
              ],
            }),
          }}
        />
        <Header />
        <main id="main-content" className="flex-grow">{children}</main>
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
                style={{ display: "none" }}
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
