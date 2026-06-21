import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionPipeline } from '@/lib/submission-pipeline';
import { createResendEmailSender } from '@/lib/email-sender';
import { getResend } from '@/lib/resend';
import { checkRateLimit, getRateLimitKey } from '@/lib/email-utils';
import type { ContactResult } from '@/lib/submission-pipeline';

const noOpLeadStore = {
  saveAssessmentLead: async () => {},
  saveCaptureLead: async () => {},
};

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request));
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message } = body;

    const submit = createSubmissionPipeline({
      emailSender: createResendEmailSender(getResend()),
      leadStore: noOpLeadStore,
    });

    const result = await submit({ kind: 'contact', name, email, message });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const data = result.data as ContactResult;
    return NextResponse.json({
      success: true,
      emailId: data.emailId,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or reach out directly.' },
      { status: 500 },
    );
  }
}
