import { Resend } from 'resend';

// Lazy-init to avoid crashing at build time when env vars aren't set
let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set.');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}
