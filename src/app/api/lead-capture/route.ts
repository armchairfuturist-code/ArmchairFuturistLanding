import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import {
  checkRateLimit,
  getRateLimitKey,
  isValidEmail,
  RATE_LIMIT_LEAD_CAPTURE,
  sanitizeEmailHeaderValue,
} from '@/lib/email-utils';
import {
  buildLeadProspectEmail,
  buildLeadNotificationEmail,
} from '@/lib/lead-capture/email-templates';

const ALEX_EMAIL = process.env.ALEX_EMAIL || 'armchairfuturist@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alex Myers <alex@thearmchairfuturist.com>';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request), RATE_LIMIT_LEAD_CAPTURE);
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, source = 'hero-lead-capture' } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const rawName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
    const storedName = rawName || email.split('@')[0];
    const safeSource =
      typeof source === 'string' ? source.trim().slice(0, 80) : 'hero-lead-capture';

    try {
      const { getDb } = await import('@/lib/firebase-admin');
      const db = getDb();
      const contactRef = db.collection('leads').doc();
      await contactRef.set({
        name: storedName,
        email,
        source: safeSource,
        createdAt: new Date().toISOString(),
        consulted: false,
      });
    } catch (firestoreError) {
      console.warn('Firestore not configured, skipping lead storage:', firestoreError);
    }

    const resend = getResend();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your AI Quick Wins — let's get started",
      html: buildLeadProspectEmail({ displayName: storedName }),
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Lead: ${sanitizeEmailHeaderValue(storedName)} <${email}>`,
      html: buildLeadNotificationEmail({ name: storedName, email, source: safeSource }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
