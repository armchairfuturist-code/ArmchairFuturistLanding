import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';

const ALEX_EMAIL = 'armchairfuturist@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Alex Myers <alex@thearmchairfuturist.com>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const resend = getResend();

    const emailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEX_EMAIL,
      subject: `New Contact: ${name} - ${email}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e5e5; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thanks for reaching out - Alex will be in touch soon',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thanks for reaching out, ${name}!</h2>
          <p style="color: #333; line-height: 1.6;">
            I've received your message and will get back to you as soon as possible—usually within 24 hours.
          </p>
          <p style="color: #333; line-height: 1.6;">
            In the meantime, feel free to book a free strategy call if you'd like to speed things up:
          </p>
          <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" style="display: inline-block; margin-top: 10px; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Book a Free Strategy Call
          </a>
        </div>
      `,
    });

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
