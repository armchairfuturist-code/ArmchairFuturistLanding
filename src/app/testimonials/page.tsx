import type { Metadata } from 'next';
import Image from 'next/image';
import { TESTIMONIALS } from '@/content/testimonials';
import { BlurFade } from '@/components/ui/blur-fade';

const siteUrl = 'https://thearmchairfuturist.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Client Testimonials | Alex Myers | The Armchair Futurist',
  description:
    'What clients say about working with Alex Myers. AI coaching, build sprints, and websites: in their own words, at full length.',
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Client Testimonials | The Armchair Futurist',
    description:
      'AI coaching, build sprints, and websites: what clients report, in their own words.',
    url: '/testimonials',
    siteName: 'The Armchair Futurist',
    type: 'website',
  },
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** /testimonials, the long-form proof, one card per client. */
export default function TestimonialsPage() {
  return (
    <main id="main-content" className="flex flex-col bg-background">
      <section className="bg-ink py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <p className="mb-3 font-mono text-sm  text-hp-electric">
            In their words
          </p>
          <h1 className="max-w-[24ch] font-display text-4xl font-medium text-white md:text-5xl">
            What clients report, at full length.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Short quotes fit on a homepage. These do not. Every word below came
            from a client, unedited except for length.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((client, i) => (
              <BlurFade inView key={client.name} delay={(i % 2) * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 md:p-8">
                  <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/85">
                    <p>{client.fullText ?? client.text}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                    {client.imageSrc ? (
                      <Image
                        src={client.imageSrc}
                        alt={`Portrait of ${client.name}`}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hp-electric/10 font-display text-sm font-medium text-hp-electric"
                      >
                        {initialsOf(client.name)}
                      </span>
                    )}
                    <span>
                      <span className="block font-display text-base font-medium text-ink">
                        {client.name}
                      </span>
                      {client.title ? (
                        <span className="block text-sm text-charcoal">{client.title}</span>
                      ) : null}
                    </span>
                  </figcaption>
                </figure>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
