import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionPipeline } from '@/lib/submission-pipeline';
import { createResendEmailSender } from '@/lib/email-sender';
import { createFirestoreLeadStore } from '@/lib/lead-store';
import { getResend } from '@/lib/resend';
import { getDb } from '@/lib/firebase-admin';
import { checkRateLimit, getRateLimitKey, RATE_LIMIT_ASSESSMENT } from '@/lib/email-utils';
import type { AssessmentResult } from '@/lib/submission-pipeline';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request), RATE_LIMIT_ASSESSMENT);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { email, answerIndices } = body;

    const submit = createSubmissionPipeline({
      emailSender: createResendEmailSender(getResend()),
      leadStore: createFirestoreLeadStore(() => getDb()),
    });

    const result = await submit({ kind: 'assessment', email, answerIndices });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const data = result.data as AssessmentResult;
    return NextResponse.json({
      success: true,
      emailId: data.emailId,
      archetypeSlug: data.archetypeSlug,
      scores: data.scores,
      individualSignals: data.individualSignals,
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment. Please try again.' },
      { status: 500 },
    );
  }
}
