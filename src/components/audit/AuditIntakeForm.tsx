"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Input } from "@/components/ui/input";
import { trackConversion, trackEvent } from "@/lib/analytics";
import { AUDIT_BOOKING_URL } from "@/lib/constants";
import { AUDIT_PRICE_LABEL } from "@/lib/pricing";
import { readAssessmentResult } from "@/lib/assessment/result-session";
import { useLeadCapture } from "@/lib/hooks/useLeadCapture";
import { isValidEmail } from "@/lib/email-utils";

const AI_MATURITY_OPTIONS = [
  { value: "chat", label: "Mostly chat — I ask, copy, paste" },
  { value: "automations", label: "Automations — scheduled workflows run without me" },
  { value: "agents", label: "Agents — tools that take a goal and come back with finished work" },
  { value: "unsure", label: "I honestly can't tell what's real yet" },
] as const;

interface FormValues extends Record<string, string> {
  name: string;
  email: string;
  role: string;
  scope: string;
  aiMaturity: string;
  paidTools: string;
  weekEaters: string;
  win90d: string;
  triedFailed: string;
  biggestQuestion: string;
  availability: string;
}

const INITIAL: FormValues = {
  name: "",
  email: "",
  role: "",
  scope: "",
  aiMaturity: "",
  paidTools: "",
  weekEaters: "",
  win90d: "",
  triedFailed: "",
  biggestQuestion: "",
  availability: "",
};

const MAX_LENGTHS: Partial<Record<keyof FormValues, number>> = {
  role: 500,
  paidTools: 500,
  weekEaters: 2000,
  win90d: 500,
  triedFailed: 1000,
  biggestQuestion: 500,
  availability: 300,
};

function Field({
  label,
  helper,
  htmlFor,
  error,
  children,
}: {
  label: string;
  helper?: string;
  htmlFor: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink mb-1">
        {label}
      </label>
      {helper && <p className="text-xs text-graphite font-sans mb-2">{helper}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs text-bloom-deep mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default function AuditIntakeForm() {
  const [honeypot, setHoneypot] = useState("");
  const [archetypeName, setArchetypeName] = useState<string | null>(null);
  const [scores, setScores] = useState<{ clarity: number; readiness: number; urgency: number; individualSignals: number } | null>(null);
  const [caseId, setCaseId] = useState<string | null>(null);

  useEffect(() => {
    trackEvent("audit_intake_view");
    const stored = readAssessmentResult();
    if (stored) {
      setArchetypeName(stored.archetypeSlug);
      setScores(stored.scores);
    }
  }, []);

  const { values, errors, serverError, isLoading, isSuccess, setField, handleSubmit } =
    useLeadCapture<FormValues>({
      endpoint: "/api/audit/submit",
      initialValues: INITIAL,
      validate: (v) => {
        const errs: Partial<Record<keyof FormValues, string>> = {};
        if (!v.name.trim()) errs.name = "Name is required";
        if (!v.email.trim()) errs.email = "Email is required";
        else if (!isValidEmail(v.email)) errs.email = "Enter a valid email, like name@company.com";
        if (!v.role.trim()) errs.role = "Tell me what you do — one sentence is enough";
        if (!v.scope) errs.scope = "Pick one — the roadmap differs";
        if (!v.aiMaturity) errs.aiMaturity = "Pick the closest one";
        if (!v.paidTools.trim()) errs.paidTools = "Rough is fine, but I need something";
        if (!v.weekEaters.trim()) errs.weekEaters = "This is the raw material of your roadmap";
        if (!v.win90d.trim()) errs.win90d = "Hours or money — what would a win look like?";
        if (!v.biggestQuestion.trim()) errs.biggestQuestion = "Alex answers this first on the call";
        if (!v.availability.trim()) errs.availability = "Timezone plus rough windows";
        return Object.keys(errs).length ? errs : null;
      },
      buildBody: (v) => ({
        ...v,
        website: honeypot,
        ...(scores ? { scores } : {}),
      }),
      onSuccess: (data) => {
        trackConversion("audit_intake_submit");
        const d = data as { caseId?: string };
        if (d?.caseId) setCaseId(d.caseId);
      },
    });

  if (isSuccess) {
    return (
      <div className="rounded-hp-xl border border-hairline-strong bg-canvas p-6 md:p-10" data-testid="audit-success">
        <BlurFade inView>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-hp-xl bg-hp-electric/10 mb-6">
            <CheckCircle2 className="w-6 h-6 text-hp-electric" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-ink mb-3">
            You&apos;re in the queue.
          </h2>
          <p className="text-base text-charcoal font-sans leading-relaxed mb-6">
            Your briefing is on its way to your inbox. Book the 15-minute fit
            call now while the calendar is open:
          </p>
          <a
            href={AUDIT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion("audit_booking_click")}
          >
            <Button size="lg" className="font-bold bg-hp-electric text-white hover:bg-hp-deep h-12 px-6">
              Book the fit call
              <CalendarDays className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </a>
          <p className="text-sm text-charcoal font-sans leading-relaxed mt-6">
            On the call we answer your biggest question, check the audit is the
            right move, and if it is, you get the payment link there.{" "}
            {AUDIT_PRICE_LABEL} if we proceed. The blueprint is yours either way.
          </p>
          <p className="text-xs text-graphite font-sans mt-4">
            Questions first?{" "}
            <Link href="/#connect" className="text-hp-electric underline underline-offset-4">
              Ask directly
            </Link>
            .
          </p>
        </BlurFade>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-hp-xl border border-hairline-strong bg-canvas p-6 md:p-10 space-y-6"
      noValidate
      data-testid="audit-form"
    >
      {archetypeName && (
        <p className="text-xs font-mono uppercase tracking-widest text-hp-electric">
          Continuing from your assessment profile
        </p>
      )}

      {/* Honeypot — hidden from humans, catnip for bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="audit-website">Website</label>
        <input
          id="audit-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Your name" htmlFor="audit-name" error={errors.name}>
          <Input
            id="audit-name"
            name="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" helper="Where the confirmation goes" htmlFor="audit-email" error={errors.email}>
          <Input
            id="audit-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
        </Field>
      </div>

      <Field
        label="What do you do, and who do you serve?"
        helper="One or two sentences. The roadmap is specific to your work, so this matters."
        htmlFor="audit-role"
        error={errors.role}
      >
        <textarea
          id="audit-role"
          name="role"
          rows={2}
          maxLength={MAX_LENGTHS.role}
          value={values.role}
          onChange={(e) => setField("role", e.target.value)}
          aria-invalid={!!errors.role}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed md:text-sm"
        />
      </Field>

      <Field
        label="Is this audit for you or your organization?"
        helper="The roadmap is structured differently for each."
        htmlFor="audit-scope"
        error={errors.scope}
      >
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
      </Field>

      <Field
        label="Where does AI sit in your work right now?"
        helper="Closest answer wins. This decides what the roadmap builds on."
        htmlFor="audit-aiMaturity"
        error={errors.aiMaturity}
      >
        <div className="space-y-2">
          {AI_MATURITY_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3 rounded-hp-lg border cursor-pointer transition-colors ${
                values.aiMaturity === opt.value
                  ? "border-hp-electric bg-hp-electric/5"
                  : "border-hairline hover:border-hairline-strong"
              }`}
            >
              <input
                type="radio"
                name="aiMaturity"
                value={opt.value}
                checked={values.aiMaturity === opt.value}
                onChange={() => setField("aiMaturity", opt.value)}
                className="mt-0.5 accent-[#024ad8]"
              />
              <span className="text-sm text-charcoal font-sans">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.aiMaturity && (
          <p role="alert" className="text-xs text-bloom-deep mt-1">
            {errors.aiMaturity}
          </p>
        )}
      </Field>

      <Field
        label="What are you already paying for?"
        helper="Tools, subscriptions, consultants. Rough is fine."
        htmlFor="audit-paidTools"
        error={errors.paidTools}
      >
        <Input
          id="audit-paidTools"
          name="paidTools"
          value={values.paidTools}
          onChange={(e) => setField("paidTools", e.target.value)}
          aria-invalid={!!errors.paidTools}
        />
      </Field>

      <Field
        label="What work eats your week that shouldn't?"
        helper="The more specific, the better the roadmap."
        htmlFor="audit-weekEaters"
        error={errors.weekEaters}
      >
        <textarea
          id="audit-weekEaters"
          name="weekEaters"
          rows={3}
          maxLength={MAX_LENGTHS.weekEaters}
          value={values.weekEaters}
          onChange={(e) => setField("weekEaters", e.target.value)}
          aria-invalid={!!errors.weekEaters}
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hp-electric md:text-sm"
        />
      </Field>

      <Field
        label="What would a win in 90 days look like?"
        helper="Hours or money. Your words."
        htmlFor="audit-win90d"
        error={errors.win90d}
      >
        <Input
          id="audit-win90d"
          name="win90d"
          maxLength={MAX_LENGTHS.win90d}
          value={values.win90d}
          onChange={(e) => setField("win90d", e.target.value)}
          aria-invalid={!!errors.win90d}
        />
      </Field>

      <Field
        label="What have you tried that didn't stick?"
        helper="Optional. Courses, tools, consultants."
        htmlFor="audit-triedFailed"
        error={errors.triedFailed}
      >
        <Input
          id="audit-triedFailed"
          name="triedFailed"
          maxLength={MAX_LENGTHS.triedFailed}
          value={values.triedFailed}
          onChange={(e) => setField("triedFailed", e.target.value)}
          aria-invalid={!!errors.triedFailed}
        />
      </Field>

      <Field
        label="What's your biggest AI question right now?"
        helper="Alex answers this first, with the current state of the field."
        htmlFor="audit-biggestQuestion"
        error={errors.biggestQuestion}
      >
        <Input
          id="audit-biggestQuestion"
          name="biggestQuestion"
          maxLength={MAX_LENGTHS.biggestQuestion}
          value={values.biggestQuestion}
          onChange={(e) => setField("biggestQuestion", e.target.value)}
          aria-invalid={!!errors.biggestQuestion}
        />
      </Field>

      <Field
        label="When can you do a 15-minute fit call?"
        helper="Timezone plus rough windows. Mornings, afternoons, whatever's true."
        htmlFor="audit-availability"
        error={errors.availability}
      >
        <Input
          id="audit-availability"
          name="availability"
          maxLength={MAX_LENGTHS.availability}
          value={values.availability}
          onChange={(e) => setField("availability", e.target.value)}
          aria-invalid={!!errors.availability}
        />
      </Field>

      {serverError && (
        <p role="alert" className="text-sm text-bloom-deep">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full font-bold bg-hp-electric text-white hover:bg-hp-deep h-12"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <>
            Send my briefing
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="text-xs text-graphite font-sans text-center">
        No payment now. The 15-minute fit call comes first.
      </p>
    </form>
  );
}
