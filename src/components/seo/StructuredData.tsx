import { PRICING, PRICE_RANGE, COACHING_PRICING } from "@/lib/pricing";

const siteUrl = "https://thearmchairfuturist.com";
const personId = `${siteUrl}/#person`;

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
            description:
              "Alex Myers is an AI guide who teaches you to design, launch, and sell your own AI-powered services — no dependency, no retainer, just understanding.",
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
            description:
              "AI guidance and done-for-you AI implementation. Alex teaches you to design, launch, and sell your own AI-powered services.",
            url: siteUrl,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "40",
              bestRating: "5",
              worstRating: "1",
            },
            image: `${siteUrl}/og-image.jpg`,
            logo: `${siteUrl}/img.jpg`,
            founder: { "@id": personId },
            address: {
              "@type": "PostalAddress",
              addressCountry: "PT",
            },
            priceRange: `$${PRICE_RANGE.min} - $${PRICE_RANGE.max}`,
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
                    name: PRICING.digitalIdentity.name,
                    description: PRICING.digitalIdentity.description,
                    provider: { "@id": personId },
                  },
                  price: String(PRICING.digitalIdentity.price),
                  priceCurrency: PRICING.digitalIdentity.currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: PRICING.customAiProvisioning.name,
                    description: PRICING.customAiProvisioning.description,
                    provider: { "@id": personId },
                  },
                  price: String(PRICING.customAiProvisioning.price),
                  priceCurrency: PRICING.customAiProvisioning.currency,
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: String(PRICING.customAiProvisioning.minPrice),
                    maxPrice: String(PRICING.customAiProvisioning.maxPrice),
                    priceCurrency: PRICING.customAiProvisioning.currency,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PRICING.single.name,
                    description: COACHING_PRICING.single.description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PRICING.single.price),
                  priceCurrency: COACHING_PRICING.single.currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PRICING['pack-5'].name,
                    description: COACHING_PRICING['pack-5'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PRICING['pack-5'].price),
                  priceCurrency: COACHING_PRICING['pack-5'].currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PRICING['pack-10'].name,
                    description: COACHING_PRICING['pack-10'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PRICING['pack-10'].price),
                  priceCurrency: COACHING_PRICING['pack-10'].currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: COACHING_PRICING['pack-20'].name,
                    description: COACHING_PRICING['pack-20'].description,
                    provider: { "@id": personId },
                  },
                  price: String(COACHING_PRICING['pack-20'].price),
                  priceCurrency: COACHING_PRICING['pack-20'].currency,
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: PRICING.aiIndependenceIncubator.name,
                    description: PRICING.aiIndependenceIncubator.description,
                    provider: { "@id": personId },
                  },
                  price: String(PRICING.aiIndependenceIncubator.price),
                  priceCurrency: PRICING.aiIndependenceIncubator.currency,
                },
              ],
            },
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
            jobTitle: "AI Guide",
            url: siteUrl,
            image: `${siteUrl}/alexheadshot-nobg.png`,
            description:
              "Alex Myers is an AI guide who teaches individuals and businesses to design, launch, and sell their own AI-powered services. Based in Portugal, serving clients worldwide.",
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
              "AI Guidance",
              "Psychology-Led Adoption",
              "Human-Machine Workflow Design",
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
            worksFor: {
              "@type": "Organization",
              name: "Alex Myers Consulting LLC",
              url: siteUrl,
            },
            award: "Certified Futurist & Long-Term Analyst",
            alumniOf: "GenAI Academy",
            hasOccupation: {
              "@type": "Occupation",
              name: "AI Guide",
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
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: `${siteUrl}/about`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Assessment",
                item: `${siteUrl}/assessment`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Blog",
                item: `${siteUrl}/blog`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
