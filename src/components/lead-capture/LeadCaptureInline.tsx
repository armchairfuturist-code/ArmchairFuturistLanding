'use client';

import { Loader2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/email-utils';
import { useLeadCapture } from '@/lib/hooks/useLeadCapture';

const INITIAL_VALUES = { name: '', email: '' };

export default function LeadCaptureInline() {
  const { values, errors, setField, handleSubmit, isLoading, isSuccess, serverError } =
    useLeadCapture({
      endpoint: '/api/lead-capture',
      initialValues: INITIAL_VALUES,
      validate: (v) => {
        const fieldErrors: Partial<Record<keyof typeof INITIAL_VALUES, string>> = {};
        const email = v.email.trim();
        if (!email) fieldErrors.email = 'Please enter your email.';
        else if (!isValidEmail(email)) fieldErrors.email = 'Please enter a valid email address.';
        return fieldErrors;
      },
      buildBody: (v) => ({
        name: v.name.trim(),
        email: v.email.trim(),
        source: 'homepage-inline',
      }),
    });

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 justify-center py-3">
        <Check className="h-5 w-5 text-green-400" />
        <p className="text-green-400 font-medium">
          You&apos;re in! Check your inbox for the assessment link.
        </p>
      </div>
    );
  }

  const errorMessage = serverError ?? errors.email ?? null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="First name"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm h-10"
        />
        <Input
          type="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          required
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm h-10"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-white text-primary hover:bg-white/90 h-10 px-5 font-semibold text-sm whitespace-nowrap"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Get Your Score
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </>
        )}
      </Button>
      {errorMessage && <p className="text-red-300 text-xs text-center sm:hidden">{errorMessage}</p>}
    </form>
  );
}
