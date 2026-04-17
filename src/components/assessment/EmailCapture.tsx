'use client';

import { useState } from 'react';
import { Mail, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { trackEvent } from '@/lib/analytics';

interface EmailCaptureProps {
  onComplete: () => void;
  onSkip: () => void;
  archetypeSlug: string;
  scores: { clarity: number; readiness: number; urgency: number };
}

export default function EmailCapture({ onComplete, onSkip, archetypeSlug, scores }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, archetypeSlug, scores }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send results.');
      }

      trackEvent('assessment_email_capture', { email_provided: true });
      setSent(true);

      // Brief pause so they see the confirmation, then navigate
      setTimeout(() => onComplete(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">
          Results sent!
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          Check your inbox. Loading your results now...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
          Get your results by email
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6 font-sans">
        Your personalized AI readiness profile, diagnosis, and recommended next step, delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <div>
          <label htmlFor="assessment-email" className="sr-only">Email address</label>
          <input
            id="assessment-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground text-sm
              placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            disabled={loading}
            required
          />
          {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
        </div>
        <Button type="submit" className="w-full h-11 font-bold" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send My Results
            </>
          )}
        </Button>
        <p className="text-[10px] text-muted-foreground/50 font-mono">
          No spam. Your data stays private.
        </p>
      </form>

      <button
        onClick={() => {
          trackEvent('assessment_email_skip');
          onSkip();
        }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        Skip and see my results
        <ArrowRight className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
