interface FaqQuestion {
  name: string;
  acceptedAnswer: { text: string };
}

interface ConceptFaqProps {
  items: readonly FaqQuestion[];
  heading?: string;
}

/**
 * Visible FAQ plus its FAQPage JSON-LD, from one item list.
 *
 * The schema-only version put question text in the HTML but not on the page.
 * Answer engines read rendered text, and structured data must match what a
 * reader can see, so the same array renders the disclosure list and the block.
 */
export default function ConceptFaq({ items, heading = "Frequently asked questions" }: ConceptFaqProps) {
  return (
    <section className="bg-cloud py-12 md:py-16" aria-labelledby="concept-faq-heading">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <h2 id="concept-faq-heading" className="font-display text-2xl md:text-3xl font-medium text-ink mb-6">
          {heading}
        </h2>
        <div className="border-t border-ink/15 divide-y divide-ink/15">
          {items.map((item) => (
            <details key={item.name} className="group py-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.name}
                <span aria-hidden="true" className="mt-0.5 shrink-0 font-mono text-hp-electric transition-transform duration-200 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-charcoal leading-relaxed">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items,
          }),
        }}
      />
    </section>
  );
}
