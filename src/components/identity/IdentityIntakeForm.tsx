"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Input } from "@/components/ui/input";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { useLeadCapture } from "@/lib/hooks/useLeadCapture";
import { isValidEmail } from "@/lib/email-utils";
import { formatDualPrice, SERVICES_PRICING } from "@/lib/pricing";

const PRICE = formatDualPrice(
  SERVICES_PRICING.digitalIdentity.priceUSD,
  SERVICES_PRICING.digitalIdentity.priceEUR,
);

interface FormValues extends Record<string, string> {
  name: string;
  email: string;
  scope: string;
  linkedinUrl: string;
  resumeUrl: string;
  socialLinks: string;
  headline: string;
  notes: string;
}

const INITIAL: FormValues = {
  name: "",
  email: "",
  scope: "",
  linkedinUrl: "",
  resumeUrl: "",
  socialLinks: "",
  headline: "",
  notes: "",
};

export default function IdentityIntakeForm() {
  const [honeypot, setHoneypot] = useState("");
  const [caseId, setCaseId] = useState<string | null>(null);

  const { values, errors, serverError, isLoading, isSuccess, setField, handleSubmit } =
    useLeadCapture<FormValues>({
      endpoint: "/api/identity/submit",
      initialValues: INITIAL,
      validate: (v) => {
        const errs: Partial<Record<keyof FormValues, string>> = {};
        if (!v.name.trim()) errs.name = "Name is required";
        if (!v.email.trim()) errs.email = "Email is required";
        else if (!isValidEmail(v.email)) errs.email = "Enter a valid email, like name@company.com";
        if (!v.scope) errs.scope = "Pick one";
        if (!v.linkedinUrl.trim()) errs.linkedinUrl = "Your LinkedIn profile URL";
        else if (!/^https?:\/\//.test(v.linkedinUrl.trim())) errs.linkedinUrl = "Full URL, including https://";
        if (!v.resumeUrl.trim()) errs.resumeUrl = "A link to your resume (Drive, Dropbox, personal site)";
        else if (!/^https?:\/\//.test(v.resumeUrl.trim())) errs.resumeUrl = "Full URL, including https://";
        if (!v.headline.trim()) errs.headline = "What should the page say you do?";
        return Object.keys(errs).length ? errs : null;
      },
      buildBody: (v) => ({ ...v, website: honeypot }),
      onSuccess: (data) => {
        trackConversion("di_intake_submit");
        const d = data as { caseId?: string };
        if (d?.caseId) setCaseId(d.caseId);
      },
    });

  if (isSuccess) {
    return (
      <div className="rounded-hp-xl border border-hairline-strong bg-canvas p-6 md:p-10" data-testid="di-success">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-hp-xl bg-hp-electric/10 mb-6">
          <CheckCircle2 className="w-6 h-6 text-hp-electric" />
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-ink mb-3">
          Intake received.
        </h2>
        <div className="space-y-3 text-base text-charcoal font-sans leading-relaxed mb-6">
          <p><span className="font-bold text-ink">1.</span> Alex reviews your links and confirms the fit (usually same day).</p>
          <p><span className="font-bold text-ink">2.</span> You get a payment request. {PRICE}, one-time. No subscription.</p>
          <p><span className="font-bold text-ink">3.</span> Your page is built and delivered in 2-4 days with a handoff doc. You own the code and content.</p>
        </div>
        <p className="text-sm text-graphite font-sans">
          Questions in the meantime?{" "}
          <Link href="/#connect" className="text-hp-electric underline underline-offset-4">
            Ask directly
          </Link>
          .
        </p>
      </div>
    );
  }

  const inputCls = "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hp-electric md:text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-hp-xl border border-hairline-strong bg-canvas p-6 md:p-10 space-y-6"
      noValidate
      data-testid="di-form"
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="di-website">Website</label>
        <input
          id="di-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="di-name" className="block text-sm font-medium text-ink mb-1">Your name</label>
          <Input id="di-name" name="name" value={values.name} onChange={(e) => setField("name", e.target.value)} aria-invalid={!!errors.name} autoComplete="name" />
          {errors.name && <p role="alert" className="text-xs text-bloom-deep mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="di-email" className="block text-sm font-medium text-ink mb-1">Email</label>
          <Input
            id="di-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          {errors.email && <p role="alert" className="text-xs text-bloom-deep mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink mb-2">Is this page for you or your organization?</span>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "individual", label: "For me" },
            { value: "organization", label: "For my organization" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 rounded-hp-lg border cursor-pointer transition-colors ${
                values.scope === opt.value
                  ? "border-hp-electric bg-hp-electric/5"
                  : "border-hairline hover:border-hairline-strong"
              }`}
            >
              <input
                type="radio"
                name="scope"
                value={opt.value}
                checked={values.scope === opt.value}
                onChange={() => setField("scope", opt.value)}
                className="accent-[#024ad8]"
              />
              <span className="text-sm text-charcoal font-sans">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.scope && (
          <p role="alert" className="text-xs text-bloom-deep mt-1">
            {errors.scope}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="di-linkedin" className="block text-sm font-medium text-ink mb-1">LinkedIn profile URL</label>
        <input
          id="di-linkedin"
          name="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/you"
          value={values.linkedinUrl}
          onChange={(e) => setField("linkedinUrl", e.target.value)}
          aria-invalid={!!errors.linkedinUrl}
          className={inputCls}
        />
        {errors.linkedinUrl && <p role="alert" className="text-xs text-bloom-deep mt-1">{errors.linkedinUrl}</p>}
      </div>

      <div>
        <label htmlFor="di-resume" className="block text-sm font-medium text-ink mb-1">Resume link</label>
        <p className="text-xs text-graphite font-sans mb-2">A shareable link — Google Docs, Drive, Dropbox, or your site.</p>
        <input
          id="di-resume"
          name="resumeUrl"
          type="url"
          placeholder="https://..."
          value={values.resumeUrl}
          onChange={(e) => setField("resumeUrl", e.target.value)}
          aria-invalid={!!errors.resumeUrl}
          className={inputCls}
        />
        {errors.resumeUrl && <p role="alert" className="text-xs text-bloom-deep mt-1">{errors.resumeUrl}</p>}
      </div>

      <div>
        <label htmlFor="di-social" className="block text-sm font-medium text-ink mb-1">Other social or portfolio links</label>
        <p className="text-xs text-graphite font-sans mb-2">Optional. Comma-separated.</p>
        <input
          id="di-social"
          name="socialLinks"
          value={values.socialLinks}
          onChange={(e) => setField("socialLinks", e.target.value)}
          placeholder="github.com/you, x.com/you"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="di-headline" className="block text-sm font-medium text-ink mb-1">What should the page say you do?</label>
        <p className="text-xs text-graphite font-sans mb-2">One line. The headline of the page and the pitch.</p>
        <input
          id="di-headline"
          name="headline"
          maxLength={200}
          value={values.headline}
          onChange={(e) => setField("headline", e.target.value)}
          aria-invalid={!!errors.headline}
          className={inputCls}
        />
        {errors.headline && <p role="alert" className="text-xs text-bloom-deep mt-1">{errors.headline}</p>}
      </div>

      <div>
        <label htmlFor="di-notes" className="block text-sm font-medium text-ink mb-1">Anything else?</label>
        <p className="text-xs text-graphite font-sans mb-2">Optional. Color preferences, examples you like, deadlines.</p>
        <textarea id="di-notes" name="notes" rows={3} value={values.notes} onChange={(e) => setField("notes", e.target.value)} className={inputCls} />
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-bloom-deep">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={isLoading} className="w-full font-bold bg-hp-electric text-white hover:bg-hp-deep h-12">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            Start my intake
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="text-xs text-graphite font-sans text-center">
        No payment now. You get a payment request after Alex confirms the fit.
      </p>
    </form>
  );
}
