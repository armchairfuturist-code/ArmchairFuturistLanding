'use client';

import { useState } from 'react';
import { Mail, Loader2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/lib/email-utils';

export default function LeadCaptureInline() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setStatus('loading');

    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: 'homepage-inline' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setError('Something went wrong. Try again or email me directly.');
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 justify-center py-3">
        <Check className="h-5 w-5 text-green-400" />
        <p className="text-green-400 font-medium">You're in! Check your inbox for the assessment link.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm h-10"
        />
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm h-10"
        />
      </div>
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="bg-white text-primary hover:bg-white/90 h-10 px-5 font-semibold text-sm whitespace-nowrap"
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Get Your Score
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </>
        )}
      </Button>
      {error && <p className="text-red-300 text-xs text-center sm:hidden">{error}</p>}
    </form>
  );
}
