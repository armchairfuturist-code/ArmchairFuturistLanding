import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { AUDIT_PRICE_LABEL } from "@/lib/pricing";
import { SITE_URL } from "@/lib/constants";
import { SERVICE_SYSTEMS, type ServiceSystem } from "@/content/service-catalog";

const siteUrl = SITE_URL;

export function serviceSystemMetadata(system: ServiceSystem): Metadata {
  return {
    title: system.seo.title,
    description: system.seo.description,
    alternates: { canonical: system.href },
    openGraph: {
      title: system.label,
      description: system.seo.openGraphDescription,
      url: system.href,
      siteName: "The Armchair Futurist",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: system.label,
      description: system.seo.openGraphDescription,
    },
  };
}

function serviceSchema(system: ServiceSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: system.schemaName,
    provider: { "@id": `${siteUrl}/#person` },
    description: system.schemaDescription,
    mainEntityOfPage: `${siteUrl}${system.href}`,
  };
}

function faqSchema(system: ServiceSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: system.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Shared adapter for the four Service System spoke pages. */
export default function ServiceSystemPage({ system }: { system: ServiceSystem }) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: system.label, href: system.href },
          ]}
        />
        <nav aria-label="Systems" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-sans">
          {SERVICE_SYSTEMS.map((candidate) => (
            <Link
              key={candidate.slug}
              href={candidate.href}
              aria-current={candidate.slug === system.slug ? "page" : undefined}
              className={
                candidate.slug === system.slug
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground hover:text-primary transition-colors"
              }
            >
              {candidate.label}
            </Link>
          ))}
        </nav>
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {system.heroTitle}
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-8">
              {system.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/audit">Get the ROI Blueprint</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">All systems</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/Service">
        <span itemProp="name">{system.schemaName}</span>
        <span itemProp="provider">Alex Myers, The Armchair Futurist</span>
        <span itemProp="description">{system.schemaDescription}</span>
      </div>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 gap-6">
            {system.blocks.map((block) => (
              <article key={block.title} className="p-6 rounded-xl border border-border/60 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">{block.title}</h2>
                <p className="text-foreground/80 leading-relaxed">{block.content}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-xl border border-border/60 bg-card">
            <h2 className="font-heading text-lg font-bold text-foreground mb-2">You keep</h2>
            <p className="text-foreground/80 text-sm leading-relaxed">{system.keep}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Not for you if</h2>
          <div className="p-6 rounded-xl border border-border/60 bg-card mb-10">
            <ul className="space-y-2 text-foreground/80 text-sm leading-relaxed">
              {system.notFor.map((item) => <li key={item}>· {item}</li>)}
            </ul>
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Asked before an audit</h2>
          <div className="grid grid-cols-1 gap-4">
            {system.faqs.map((faq) => (
              <details key={faq.question} className="p-5 rounded-xl border border-border/60 bg-card">
                <summary className="font-semibold text-foreground cursor-pointer">{faq.question}</summary>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">{system.ctaTitle}</h2>
            <p className="text-lg text-foreground/80 mb-4">{system.ctaDescription}</p>
            <p className="text-sm text-foreground/70 mb-8">
              {AUDIT_PRICE_LABEL}. Ranked actions and wiring order. Fewer than three ranked actions, you do not pay.
            </p>
            <Button asChild size="lg" className="font-bold">
              <Link href="/audit">Get the ROI Blueprint</Link>
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(system)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(system)) }}
      />
    </div>
  );
}
