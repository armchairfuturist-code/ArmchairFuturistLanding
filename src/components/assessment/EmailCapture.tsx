"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/ui/blur-fade";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useLeadCapture } from "@/lib/hooks/useLeadCapture";
import { isValidEmail } from "@/lib/email-utils";

interface EmailCaptureProps {
  onComplete: () => void;
  onSkip: () => void;
  answerIndices?: number[];
}

export default function EmailCapture({
  onComplete,
  onSkip,
  answerIndices,
}: EmailCaptureProps) {
  const [honeypot, setHoneypot] = useState("");

  const { values, errors, setField, isLoading, isSuccess, serverError, handleSubmit } =
    useLeadCapture({
      endpoint: "/api/assessment/submit",
      initialValues: { email: "" },
      validate: (v) => {
        if (!v.email.trim()) return { email: "Email is required" };
        if (!isValidEmail(v.email))
          return { email: "Enter a valid email, like name@company.com" };
        return null;
      },
      buildBody: (v) => {
        const body: Record<string, unknown> = {
          email: v.email,
          website: honeypot,
        };
        if (answerIndices && answerIndices.length > 0) {
          body.answerIndices = answerIndices;
        }
        return body;
      },
      onSuccess: () => onComplete(),
    });

  const emailError = serverError ?? errors.email ?? null;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <BlurFade inView delay={0.1}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
          <Mail className="w-6 h-6 text-primary" />
        </div>
      </BlurFade>

      <BlurFade inView delay={0.2}>
        <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-3">
          Want your results by email?
        </h2>
      </BlurFade>

      <BlurFade inView delay={0.3}>
        <p className="text-muted-foreground text-sm md:text-base mb-8 leading-relaxed">
          Your profile is ready below. Add your email and we&apos;ll also send
          it to you, with a concrete first step.
        </p>
      </BlurFade>

      {isSuccess ? (
        <BlurFade inView>
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            Check your inbox — results on the way.
          </div>
        </BlurFade>
      ) : (
        <BlurFade inView delay={0.4}>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Honeypot */}
            <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <label htmlFor="assessment-email" className="sr-only">Email address</label>
            <Input
              id="assessment-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              required
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "assessment-email-error" : undefined}
              className="h-12 text-center"
              disabled={isLoading}
            />

            {emailError && (
              <p id="assessment-email-error" role="alert" className="text-sm text-destructive">
                {emailError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full font-bold"
              disabled={isLoading || !values.email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Email me my results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <button
            type="button"
            onClick={onSkip}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
          >
            Skip — show results without email
          </button>
        </BlurFade>
      )}
    </div>
  );
}
