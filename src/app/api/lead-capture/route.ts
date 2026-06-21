import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionPipeline } from '@/lib/submission-pipeline';
import { createResendEmailSender } from '@/lib/email-sender';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { checkRateLimit, getRateLimitKey, RATE_LIMIT_LEAD_CAPTURE } from '@/lib/email-utils';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request), RATE_LIMIT_LEAD_CAPTURE);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, source = 'hero-lead-capture' } = body;

    const submit = createSubmissionPipeline({
      emailSender: createResendEmailSender(getResend()),
      leadStore: createFirestoreLeadStore(() => getDb()),
    });

    const result = await submit({ kind: 'lead-capture', name, email, source });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
