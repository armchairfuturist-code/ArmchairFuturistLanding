import { SERVICES_PRICING, COACHING_PACKAGES_BY_ID, formatSchemaPriceRange } from "@/lib/pricing";
import { CALENDAR_URL } from "@/lib/constants";

const siteUrl = "https://thearmchairfuturist.com";
const personId = `${siteUrl}/#person`;
const orgId = `${siteUrl}/#organization`;

/**
 * Structured data (JSON-LD) for the site.
 * Extracted from layout.tsx to keep the layout focused on composition.
 */
export default function StructuredData() {
  return (
    <>
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "The Armchair Futurist",
            url: siteUrl,
            description: "Alex Myers is an AI Technical Literacy & Workflow Strategy Consultant and founder of The Armchair Futurist. He has deployed 40+ AI systems and teaches professionals to build AI skills they own instead of rent.",
            author: { "@id": personId },
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
            description: "Alex Myers is an AI Technical Literacy & Workflow Strategy Consultant and founder of The Armchair Futurist. He has deployed 40+ AI systems and teaches professionals to build AI skills they own instead of rent.",
            url: siteUrl,
            image: `${siteUrl}/opengraph-image`,
            logo: `${siteUrl}/img.jpg`,
            founder: { "@id": personId },
            address: {
              "@type": "PostalAddress",
              addressCountry: "PT",
            },
            priceRange: formatSchemaPriceRange(),
            areaServed: "Worldwide",
            knowsAbout: [
              "AI Technical Literacy",
              "AI Workflow Strategy",
              "AI Workflow Automation",
              "Change Management",
              "Future of Work",
              "Digital Transformation",
              "AI Adoption",
              "Personal Leverage",
            ],
            // Machine-actionable booking: lets agents/crawlers discover the
            // scheduling entry point without scraping a CTA.
            potentialAction: {
              "@type": "ReserveAction",
              name: "Book a 15-minute call",
              target: {
                "@type": "EntryPoint",
                urlTemplate: CALENDAR_URL,
                actionPlatform: [
                  "https://schema.org/DesktopWebPlatform",
                  "https://schema.org/MobileWebPlatform",
                ],
              },
              result: {
                "@type": "Reservation",
                name: "15-minute intro call",
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "AI Strategy & Advisory Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: SERVICES_PRICING.roadmapAudit.name,
                    description: SERVICES_PRICING.roadmapAudit.description,
                    provider: { "@id": personId },
                  },
                  price: String(SERVICES_PRICING.roadmapAudit.priceUSD),
                  priceCurrency: SERVICES_PRICING.roadmapAudit.currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: SERVICES_PRICING.selfSufficiency.name,
                    description: SERVICES_PRICING.selfSufficiency.description,
                    provider: { "@id": personId },
                  },
                  price: String(SERVICES_PRICING.selfSufficiency.priceUSD),
                  priceCurrency: SERVICES_PRICING.selfSufficiency.currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: SERVICES_PRICING.digitalIdentity.name,
                    description: SERVICES_PRICING.digitalIdentity.description,
                    provider: { "@id": personId },
                  },
                  price: String(SERVICES_PRICING.digitalIdentity.priceUSD),
                  priceCurrency: SERVICES_PRICING.digitalIdentity.currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: SERVICES_PRICING.customAiProvisioning.name,
                    description: SERVICES_PRICING.customAiProvisioning.description,
                    provider: { "@id": personId },
                  },
                  price: String(SERVICES_PRICING.customAiProvisioning.priceUSD),
                  priceCurrency: SERVICES_PRICING.customAiProvisioning.currency,
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: String(SERVICES_PRICING.customAiProvisioning.minPriceUSD),
                    maxPrice: String(SERVICES_PRICING.customAiProvisioning.maxPriceUSD),
                    priceCurrency: SERVICES_PRICING.customAiProvisioning.currency,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PACKAGES_BY_ID['single'].name,
                    description: COACHING_PACKAGES_BY_ID['single'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PACKAGES_BY_ID['single'].totalPriceUSD),
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PACKAGES_BY_ID['pack-5'].name,
                    description: COACHING_PACKAGES_BY_ID['pack-5'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PACKAGES_BY_ID['pack-5'].totalPriceUSD),
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PACKAGES_BY_ID['pack-10'].name,
                    description: COACHING_PACKAGES_BY_ID['pack-10'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PACKAGES_BY_ID['pack-10'].totalPriceUSD),
                  priceCurrency: "USD",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PACKAGES_BY_ID['pack-20'].name,
                    description: COACHING_PACKAGES_BY_ID['pack-20'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PACKAGES_BY_ID['pack-20'].totalPriceUSD),
                  priceCurrency: "USD",
                },

                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: SERVICES_PRICING.speakingFacilitation.name,
                    description: SERVICES_PRICING.speakingFacilitation.description,
                    provider: { "@id": personId },
                  },
                },

              ],
            },
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": orgId,
            name: "The Armchair Futurist",
            alternateName: "Alex Myers Consulting",
            url: siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/img.jpg`,
              width: 32,
              height: 32,
            },
            founder: { "@id": personId },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "armchairfuturist@gmail.com",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.linkedin.com/in/alex-myers-34572a10/",
              "https://armchairfuturist.substack.com/",
            ],
          }),
        }}
      />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": personId,
            name: "Alex Myers",
            givenName: "Alex",
            familyName: "Myers",
            jobTitle: "AI Technical Literacy & Workflow Strategy Consultant",
            url: siteUrl,
            image: `${siteUrl}/alexheadshot-nobg.png`,
            description: "Alex Myers is an AI Technical Literacy & Workflow Strategy Consultant and founder of The Armchair Futurist. He has deployed 40+ AI systems and teaches professionals to build AI skills they own instead of rent.",
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
              "AI Technical Literacy",
              "AI Workflow Strategy",
              "AI Workflow Automation",
              "AI Adoption & Change Management",
              "Future of Work",
              "Digital Transformation",
              "AI Consulting",
              "AI Instruction",
              "Personal Leverage",
              "Business Leverage",
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "certification",
                name: "Certified Futurist & Long-Term Analyst (FLTA)",
                description: "Futures thinking and scenario planning certification",
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
                description: "Distributed systems and blockchain architecture",
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
            worksFor: { "@id": orgId },
            award: "Certified Futurist & Long-Term Analyst",
            alumniOf: "GenAI Academy",
          }),
        }}
      />

      {/* BreadcrumbList Schema — page-specific breadcrumbs are managed by the Breadcrumbs component */}
    </>
  );
}
