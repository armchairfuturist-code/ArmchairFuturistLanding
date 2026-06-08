import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { getArchetypeBySlug } from '@/lib/assessment/archetypes';
import { scoreFromAnswerIndices } from '@/lib/assessment/resolve-answers';
import {
  buildProspectResultEmail,
  buildAlexNotificationEmail,
} from '@/lib/email/templates';
import {
  checkRateLimit,
  getRateLimitKey,
  isValidEmail,
  RATE_LIMIT_ASSESSMENT,
} from '@/lib/email-utils';

const ALEX_EMAIL = process.env.ALEX_EMAIL || 'armchairfuturist@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alex Myers <alex@thearmchairfuturist.com>';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request), RATE_LIMIT_ASSESSMENT);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { email, answerIndices } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    let scored;
    try {
      scored = scoreFromAnswerIndices(answerIndices);
    } catch {
      return NextResponse.json({ error: 'Invalid assessment answers.' }, { status: 400 });
    }

    const { archetypeSlug, clarity, readiness, urgency } = scored;
    const scores = { clarity, readiness, urgency };

    const archetype = getArchetypeBySlug(archetypeSlug);
    if (!archetype) {
      return NextResponse.json({ error: 'Invalid archetype.' }, { status: 400 });
    }

    try {
      const { getDb } = await import('@/lib/firebase-admin');
      const db = getDb();
      const contactRef = db.collection('assessment_leads').doc();
      await contactRef.set({
        email,
        archetypeSlug,
        archetypeName: archetype.name,
        scores,
        individualSignals: scored.individualSignals,
        createdAt: new Date().toISOString(),
        source: 'assessment',
      });
    } catch (firestoreError) {
      console.warn('Firestore not configured, skipping lead storage:', firestoreError);
    }

    const resend = getResend();
    const prospectEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your AI Readiness Profile: ${archetype.name}`,
      html: buildProspectResultEmail({ archetype, scores, email }),
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Assessment Lead: ${archetype.name}`,
      html: buildAlexNotificationEmail({ archetype, scores, email }),
    });

    return NextResponse.json({
      success: true,
      emailId: prospectEmailResult.data?.id,
      archetypeSlug,
      scores,
      individualSignals: scored.individualSignals,
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment. Please try again.' },
      { status: 500 },
    );
  }
}
