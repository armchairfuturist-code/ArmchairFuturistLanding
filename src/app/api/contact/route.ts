import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { checkRateLimit, getRateLimitKey, isValidEmail, sanitizeEmailHeaderValue } from '@/lib/email-utils';
import { ALEX_EMAIL, FROM_EMAIL } from '@/lib/email/config';
import {
  buildContactNotificationEmail,
  buildContactAutoReplyEmail,
} from '@/lib/email/templates';

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = checkRateLimit(getRateLimitKey(request));
    if (!rateLimitResult.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
    }

    const trimmedName = name.trim().slice(0, MAX_NAME_LENGTH);
    const trimmedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const resend = getResend();

    const emailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Contact: ${sanitizeEmailHeaderValue(trimmedName)} - ${email}`,
      html: buildContactNotificationEmail({ name: trimmedName, email, message: trimmedMessage }),
    });

    // Auto-reply is best-effort; inbound notification is the success criterion.
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Thanks for reaching out - Alex will be in touch soon',
        html: buildContactAutoReplyEmail({ name: trimmedName }),
      });
    } catch (autoReplyError) {
      console.warn('Contact auto-reply failed (inbound notification was sent):', autoReplyError);
    }

    return NextResponse.json({
      success: true,
      emailId: emailResult.data?.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or reach out directly.' },
      { status: 500 },
    );
  }
}
