import { buildEmailWrapper, EMAIL_BRAND, escapeHtml } from '@/lib/email-utils';

interface LeadProspectData {
  displayName: string;
}

interface LeadNotificationData {
  name: string;
  email: string;
  source: string;
}

/**
 * Welcome email sent to a new lead-capture signup with the
 * two-step onboarding (assessment + booking) CTAs.
 */
export function buildLeadProspectEmail(data: LeadProspectData): string {
  const displayNameHtml = escapeHtml(data.displayName);

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">I help leaders stop chasing AI tools and start building systems that actually work. Here's where to start:</p>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
      <tr>
        <td style="padding:16px;background:#f0f7ff;border-radius:8px;">
          <p style="margin:0;font-weight:700;font-size:16px;">Step 1: Take the Free AI Readiness Assessment</p>
          <p style="margin:8px 0 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};line-height:1.5;">3 minutes. You'll get your personalized profile, clarity score, and a recommended next step — no pitch.</p>
        </td>
      </tr>
    </table>
    <a href="https://thearmchairfuturist.com/assessment" style="display:inline-block;padding:14px 32px;background:${EMAIL_BRAND.brandColor};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Take the Free Assessment →</a>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
      <tr>
        <td style="padding:16px;background:#f0f7ff;border-radius:8px;">
          <p style="margin:0;font-weight:700;font-size:16px;">Step 2: Book a Free Strategy Call</p>
          <p style="margin:8px 0 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};line-height:1.5;">15 minutes. We'll look at your specific situation and find your highest-leverage move. No pitch, no pressure.</p>
        </td>
      </tr>
    </table>
    <a href="${EMAIL_BRAND.calendarUrl}" style="display:inline-block;padding:14px 32px;background:${EMAIL_BRAND.accentColor};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book Your Free Call →</a>
    <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />
    <p style="margin:0;font-size:14px;color:${EMAIL_BRAND.mutedColor};line-height:1.6;">Quick question: what's the biggest AI challenge you're facing right now? Hit reply and tell me — I read every response personally.</p>`;

  const footerHtml = `
    <p style="margin:0;font-size:12px;color:#9ca3af;">Alex Myers · The Armchair Futurist · <a href="https://thearmchairfuturist.com" style="color:${EMAIL_BRAND.accentColor};text-decoration:none;">thearmchairfuturist.com</a></p>
    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">If you didn't sign up for this, you can safely ignore this email.</p>`;

  return buildEmailWrapper({
    headerTitle: `Thanks for signing up, ${displayNameHtml}`,
    bodyHtml,
    footerHtml,
  });
}

/**
 * Internal notification sent to Alex when a new lead is captured.
 */
export function buildLeadNotificationEmail(data: LeadNotificationData): string {
  const nameHtml = escapeHtml(data.name);
  const emailHtml = escapeHtml(data.email);
  const sourceHtml = escapeHtml(data.source);

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:80px;">Name</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${nameHtml}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Email</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${emailHtml}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Source</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${sourceHtml}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Time</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${new Date().toLocaleString()}</td>
      </tr>
    </table>
    <p style="margin:16px 0 0;padding:12px;background:#fef3c7;border-radius:6px;font-size:13px;color:#92400e;">
      <strong>Action:</strong> Send a personal follow-up within 24 hours. They've opted in, warm lead.
    </p>`;

  return buildEmailWrapper({
    headerTitle: 'New Lead Captured',
    bodyHtml,
  });
}
