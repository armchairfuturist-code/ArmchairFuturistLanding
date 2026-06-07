import { buildEmailWrapper, EMAIL_BRAND, escapeHtml } from '@/lib/email-utils';

interface ContactSubmissionData {
  name: string;
  email: string;
  message: string;
}

interface ContactAutoReplyData {
  name: string;
}

/**
 * Internal notification sent to Alex when a contact form is submitted.
 */
export function buildContactNotificationEmail(data: ContactSubmissionData): string {
  const nameHtml = escapeHtml(data.name);
  const emailHtml = escapeHtml(data.email);
  const messageHtml = escapeHtml(data.message);

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:100px;border-bottom:1px solid #e5e7eb;vertical-align:top;">Name</td>
        <td style="padding:10px 0;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${nameHtml}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};border-bottom:1px solid #e5e7eb;vertical-align:top;">Email</td>
        <td style="padding:10px 0;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${emailHtml}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};vertical-align:top;border-bottom:1px solid #e5e7eb;">Message</td>
        <td style="padding:10px 0;font-size:14px;white-space:pre-wrap;border-bottom:1px solid #e5e7eb;">${messageHtml}</td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">Submitted at: ${new Date().toLocaleString()}</p>`;

  return buildEmailWrapper({
    headerTitle: 'New Contact Form Submission',
    bodyHtml,
  });
}

/**
 * Auto-reply sent to the contact-form submitter confirming receipt
 * and offering a strategy-call CTA.
 */
export function buildContactAutoReplyEmail(data: ContactAutoReplyData): string {
  const nameHtml = escapeHtml(data.name);

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${EMAIL_BRAND.textColor};">
      Thanks for reaching out, ${nameHtml}! I've received your message and will get back to you as soon as possible — usually within 24 hours.
    </p>
    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:${EMAIL_BRAND.textColor};">
      In the meantime, feel free to book a free strategy call if you'd like to speed things up:
    </p>
    <a href="${EMAIL_BRAND.calendarUrl}" style="display:inline-block;padding:14px 32px;background:${EMAIL_BRAND.brandColor};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book a Free Strategy Call</a>`;

  return buildEmailWrapper({
    headerTitle: 'Thanks for reaching out',
    bodyHtml,
  });
}
