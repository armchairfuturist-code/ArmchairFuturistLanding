import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { getResend } from '@/lib/resend';
import { getArchetypeBySlug } from '@/lib/assessment/archetypes';
import {
  buildProspectResultEmail,
  buildAlexNotificationEmail,
} from '@/lib/assessment/email-templates';

const ALEX_EMAIL = 'armchairfuturist@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alex Myers <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, archetypeSlug, scores } = body;

    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (!archetypeSlug || !scores) {
      return NextResponse.json({ error: 'Missing assessment data.' }, { status: 400 });
    }

    const archetype = getArchetypeBySlug(archetypeSlug);
    if (!archetype) {
      return NextResponse.json({ error: 'Invalid archetype.' }, { status: 400 });
    }

    const { clarity, readiness, urgency } = scores;

    // Store contact in Firestore
    const db = getDb();
    const contactRef = db.collection('assessment_leads').doc();
    await contactRef.set({
      email,
      archetypeSlug,
      archetypeName: archetype.name,
      scores: { clarity, readiness, urgency },
      createdAt: new Date().toISOString(),
      source: 'assessment',
    });

    // Send results email to prospect
    const resend = getResend();
    const prospectEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your AI Readiness Profile: ${archetype.name}`,
      html: buildProspectResultEmail({ archetype, scores, email }),
    });

    // Send notification email to Alex
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Assessment Lead: ${archetype.name}`,
      html: buildAlexNotificationEmail({ archetype, scores, email }),
    });

    return NextResponse.json({
      success: true,
      emailId: prospectEmailResult.data?.id,
    });
  } catch (error) {
    console.error('Assessment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment. Please try again.' },
      { status: 500 },
    );
  }
}
