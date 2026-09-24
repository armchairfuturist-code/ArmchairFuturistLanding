import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ArrowRight } from "lucide-react";
import { AUDIT_PRICE_LABEL } from "@/lib/pricing";
import { SITE_URL } from "@/lib/constants";
import {
  SERVICE_HUB_COLLECTION_DESCRIPTION,
  SERVICE_HUB_CTA,
  SERVICE_HUB_DESCRIPTION,
  SERVICE_HUB_FAQS,
  SERVICE_HUB_HERO,
  SERVICE_HUB_STATS,
  SERVICE_HUB_STEPS,
  SERVICE_HUB_TRAINING,
  SERVICE_SYSTEMS,
} from "@/content/service-catalog";

export const metadata: Metadata = {
  title: "AI Systems That Pay Off | The Armchair Futurist",
  description: `Work I build with you, systems you own. ROI Blueprint, data groundwork, revenue ops, reporting, and front-line agents. Starts with a ${AUDIT_PRICE_LABEL} audit.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "AI Systems That Pay Off | The Armchair Futurist",
    description:
      "Work I build with you, systems you own. Four build groups, one starting audit, full ownership on handoff.",
    url: "/services",
    siteName: "The Armchair Futurist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Systems That Pay Off | The Armchair Futurist",
    description: "Work I build with you, systems you own. Starts with the ROI Blueprint.",
  },
};

export default function ServicesHubPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </div>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <BlurFade inView>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {SERVICE_HUB_HERO.title}
            </h1>
            <p className="text-xl text-foreground/80 font-sans leading-relaxed mb-4">
              {SERVICE_HUB_HERO.lead}
            </p>
            <p className="text-base text-foreground/70 font-sans leading-relaxed mb-8">
              {SERVICE_HUB_HERO.support}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/audit">Get the ROI Blueprint</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/assessment">{SERVICE_HUB_HERO.assessmentCta}</Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true" itemScope itemType="https://schema.org/CollectionPage">
        <span itemProp="name">AI Systems That Pay Off</span>
        <span itemProp="description">{SERVICE_HUB_COLLECTION_DESCRIPTION}</span>
      </div>

      <section className="py-10 border-y border-border/60 bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <p className="text-sm text-foreground/80 font-sans leading-relaxed">
            <strong className="text-foreground">{SERVICE_HUB_STATS.proof}</strong> {SERVICE_HUB_STATS.result}
          </p>
          <Link href="/case-studies" className="text-sm font-semibold text-primary hover:underline shrink-0">
            See the cases
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICE_SYSTEMS.map((system) => (
              <div key={system.href}>
                <Link
                  href={system.href}
                  className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg transition-[border-color,box-shadow] h-full"
                >
                  <h2 className="font-heading text-xl font-bold text-foreground group-hover:underline mb-2">
                    {system.label}
                  </h2>
                  <p className="text-foreground/80 mb-4 text-sm leading-relaxed">{system.hubDescription}</p>
                  <p className="text-xs text-muted-foreground mb-4">{system.covers}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-border/60 bg-card">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">
              {SERVICE_HUB_TRAINING.title}
            </h2>
            <p className="text-foreground/80 text-sm leading-relaxed mb-3">
              {SERVICE_HUB_TRAINING.description}
            </p>
            <Link href={SERVICE_HUB_TRAINING.href} className="text-sm font-semibold text-primary hover:underline">
              {SERVICE_HUB_TRAINING.linkLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">How we start</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {SERVICE_HUB_STEPS.map((step) => (
              <li key={step.title} className="p-5 rounded-xl border border-border/60 bg-card">
                <h3 className="font-heading font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">{SERVICE_HUB_CTA.title}</h2>
            <p className="text-lg text-foreground/80 mb-8">
              {SERVICE_HUB_CTA.description.replace("{price}", AUDIT_PRICE_LABEL)}
            </p>
            <Button asChild size="lg" className="font-bold">
              <Link href="/audit">Get the ROI Blueprint</Link>
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Systems That Pay Off | The Armchair Futurist",
            description: SERVICE_HUB_DESCRIPTION,
            author: { "@id": `${SITE_URL}/#person` },
            publisher: { "@id": `${SITE_URL}/#organization` },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: SERVICE_HUB_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  );
}
