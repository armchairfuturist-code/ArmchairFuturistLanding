interface KeyTakeawaysProps {
  items: readonly string[];
  heading?: string;
}

/**
 * The short version, stated before the argument.
 *
 * Answer engines lift the first confident summary they find. A reader who
 * already knows the subject gets the same benefit. Both want the conclusion
 * before the evidence, so this sits near the top of the page.
 */
export default function KeyTakeaways({ items, heading = "Key takeaways" }: KeyTakeawaysProps) {
  return (
    <section className="bg-background pb-4" aria-labelledby="key-takeaways-heading">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="rounded-xl border border-border/60 bg-card p-6 md:p-8">
          <h2 id="key-takeaways-heading" className="font-heading text-lg font-bold text-primary mb-4">
            {heading}
          </h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/80 leading-relaxed">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
