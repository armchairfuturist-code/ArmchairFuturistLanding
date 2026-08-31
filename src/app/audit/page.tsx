import type { Metadata } from 'next';
import AuditIntakeForm from '@/components/audit/AuditIntakeForm';
import { AUDIT_PRICE_LABEL, AUDIT_LIST_LABEL } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'AI Roadmap Audit — The Armchair Futurist',
  description:
    'A 90-minute working session on your actual workflows, scored against current-generation agents and tooling. Written report and video walkthrough, yours to keep. $297 · €247 launch pricing.',
  alternates: { canonical: '/audit' },
};

export default function AuditPage() {
  return (
    <main className="min-h-[100dvh] bg-canvas">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Pitch header */}
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-hp-electric mb-4">
          AI Roadmap Audit
        </p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-medium tracking-tight leading-[1.02] text-ink mb-6">
          Your roadmap, mapped.
        </h1>
        <p className="text-lg text-charcoal font-sans leading-relaxed mb-4">
          You took the assessment. You know where you stand. The Audit is the
          next 90 minutes: we sit with your actual workflows, your actual
          tools, and the work eating your week, and we rank what to automate,
          what to buy, and what to build. In that order.
        </p>
        <p className="text-base text-charcoal font-sans leading-relaxed mb-8">
          <span className="font-bold text-ink">{AUDIT_PRICE_LABEL}</span>{" "}
          launch pricing (normally {AUDIT_LIST_LABEL}) while the format is
          new. If the audit doesn&apos;t map at least three concrete, ranked
          actions for your business, you don&apos;t pay.
        </p>

        <AuditIntakeForm />

        <p className="text-sm text-graphite font-sans mt-10 text-center">
          Not sure the audit is the right fit? The 15-minute call is free
          either way.
        </p>
      </div>
    </main>
  );
}
