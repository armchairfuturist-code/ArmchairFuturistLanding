import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { escapeHtml, checkRateLimit, getRateLimitKey } from '@/lib/email-utils';

const ALEX_EMAIL = process.env.ALEX_EMAIL || 'armchairfuturist@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alex Myers <alex@thearmchairfuturist.com>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, source = 'hero-lead-capture' } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const displayName = escapeHtml(name || email.split('@')[0]);

    // Store lead in Firestore (gracefully skips if not configured)
    try {
      const { getDb } = await import('@/lib/firebase-admin');
      const db = getDb();
      const contactRef = db.collection('leads').doc();
      await contactRef.set({
        name: displayName,
        email,
        source,
        createdAt: new Date().toISOString(),
        consulted: false,
      });
    } catch (firestoreError) {
      console.warn('Firestore not configured, skipping lead storage:', firestoreError);
    }

    const resend = getResend();

    // Send welcome email to prospect with assessment link
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your AI Quick Wins — let\'s get started',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#1e3a5f;padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">The Armchair Futurist</p>
              <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;">Thanks for signing up, ${displayName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">I help leaders stop chasing AI tools and start building systems that actually work. Here's where to start:</p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
                <tr>
                  <td style="padding:16px;background:#f0f7ff;border-radius:8px;">
                    <p style="margin:0;font-weight:700;font-size:16px;">Step 1: Take the Free AI Readiness Assessment</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;line-height:1.5;">3 minutes. You'll get your personalized profile, clarity score, and a recommended next step — no pitch.</p>
                  </td>
                </tr>
              </table>
              <a href="https://thearmchairfuturist.com/assessment" style="display:inline-block;padding:14px 32px;background:#1e3a5f;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Take the Free Assessment →</a>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
                <tr>
                  <td style="padding:16px;background:#f0f7ff;border-radius:8px;">
                    <p style="margin:0;font-weight:700;font-size:16px;">Step 2: Book a Free Strategy Call</p>
                    <p style="margin:8px 0 0;font-size:14px;color:#6b7280;line-height:1.5;">15 minutes. We'll look at your specific situation and find your highest-leverage move. No pitch, no pressure.</p>
                  </td>
                </tr>
              </table>
              <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" style="display:inline-block;padding:14px 32px;background:#3b82f6;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book Your Free Call →</a>
              <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
              <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.6;">Quick question: what's the biggest AI challenge you're facing right now? Hit reply and tell me — I read every response personally.</p>
              <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
              <p style="margin:0;font-size:12px;color:#9ca3af;">Alex Myers · The Armchair Futurist · <a href="https://thearmchairfuturist.com" style="color:#3b82f6;text-decoration:none;">thearmchairfuturist.com</a></p>
              <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">If you didn't sign up for this, you can safely ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    // Send notification to Alex
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Lead: ${displayName} <${email}>`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:#1e3a5f;padding:24px 40px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Lead Captured</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#6b7280;width:80px;">Name</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${displayName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#6b7280;">Email</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#6b7280;">Source</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${source}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#6b7280;">Time</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <p style="margin:16px 0 0;padding:12px;background:#fef3c7;border-radius:6px;font-size:13px;color:#92400e;">
                <strong>Action:</strong> Send a personal follow-up within 24 hours. They've opted in, warm lead.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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
