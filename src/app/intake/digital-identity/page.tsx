import type { Metadata } from 'next';
import IdentityIntakeForm from '@/components/identity/IdentityIntakeForm';
import { formatDualPrice } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Digital Identity Landing Page — The Armchair Futurist',
  description:
    'An interview-ready digital identity site consolidating your LinkedIn, resume, and social links. Delivered in 2-4 days. You own the code and content. $233 · €199.',
  alternates: { canonical: '/intake/digital-identity' },
};

export default function DigitalIdentityIntakePage() {
  return (
    <main className="min-h-[100dvh] bg-canvas">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
          Digital Identity Landing Page
        </p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-medium tracking-tight leading-[1.02] text-ink mb-6">
          One link that says exactly who you are.
        </h1>
        <p className="text-lg text-charcoal font-sans leading-relaxed mb-4">
          LinkedIn, resume, and social links consolidated into one
          interview-ready platform you own. Like Linktree, but built for
          serious operators.
        </p>
        <p className="text-base text-charcoal font-sans leading-relaxed mb-8">
          <span className="font-bold text-ink">$233 · €199</span>, one-time.
          Delivered in 2-4 days. No payment now — you get a payment request
          after Alex confirms the fit.
        </p>

        <IdentityIntakeForm />

        <p className="text-sm text-graphite font-sans mt-10 text-center">
          Want a full AI roadmap instead of a page?{" "}
          <a href="/audit" className="text-hp-electric underline underline-offset-4">
            Take the Roadmap Audit
          </a>
          .
        </p>
      </div>
    </main>
  );
}
