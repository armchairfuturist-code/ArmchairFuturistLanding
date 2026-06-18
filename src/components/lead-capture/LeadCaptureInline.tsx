'use client';

import { useState } from 'react';
import { Mail, Loader2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormSubmission } from '@/lib/hooks/useFormSubmission';

export default function LeadCaptureInline() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { loading, success, error, submit } = useFormSubmission({
    endpoint: '/api/lead-capture',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ name: name.trim(), email: email.trim(), source: 'homepage-inline' });
  };

  if (success) {
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
        disabled={loading}
        className="bg-white text-primary hover:bg-white/90 h-10 px-5 font-semibold text-sm whitespace-nowrap"
      >
        {loading ? (
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
