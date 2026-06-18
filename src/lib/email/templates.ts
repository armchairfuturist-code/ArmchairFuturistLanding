/**
 * Consolidated email templates for ArmchairFuturistLanding.
 *
 * Previously scattered across three shallow modules:
 *   assessment/email-templates.ts, lead-capture/email-templates.ts, contact/email-templates.ts
 *
 * All templates share the same base (buildEmailWrapper, EMAIL_BRAND, escapeHtml)
 * from @/lib/email-utils.
 */

import { buildEmailWrapper, EMAIL_BRAND, escapeHtml } from '@/lib/email-utils';

// ── Assessment ────────────────────────────────────────────────────────

export interface AssessmentResultData {
  archetype: {
    name: string;
    slug: string;
    headline: string;
    diagnosis: string[];
    primaryCta: { label: string };
  };
  scores: { clarity: number; readiness: number; urgency: number };
  email: string;
}

function buildScoreRow(label: string, value: number, color: string): string {
  const barWidth = Math.max(value, 5);
  return `
    <tr>
      <td style="padding:6px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="font-size:13px;font-weight:600;color:${EMAIL_BRAND.textColor};width:80px;">${label}</td>
            <td style="padding:0 12px;">
              <div style="background:#e5e7eb;border-radius:4px;height:10px;width:100%;">
                <div style="background:${color};border-radius:4px;height:10px;width:${barWidth}%;"></div>
              </div>
            </td>
            <td style="font-size:13px;font-weight:600;color:${EMAIL_BRAND.mutedColor};width:36px;text-align:right;">${value}%</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function buildProspectResultEmail(data: AssessmentResultData): string {
  const { archetype, scores } = data;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:0 0 16px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.accentColor};font-weight:600;">Your Profile</p>
          <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${EMAIL_BRAND.textColor};">${escapeHtml(archetype.name)}</h2>
          <p style="margin:0;font-size:16px;color:${EMAIL_BRAND.mutedColor};line-height:1.5;">${escapeHtml(archetype.headline)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 0 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${buildScoreRow('Clarity', scores.clarity, '#296ef9')}
            ${buildScoreRow('Readiness', scores.readiness, '#10b981' /* semantic-success */)}
            ${buildScoreRow('Urgency', scores.urgency, '#f59e0b' /* semantic-warning */)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 24px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.accentColor};font-weight:600;">What this means</p>
          ${archetype.diagnosis.map(p => `<p style="margin:8px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.textColor};">${p}</p>`).join('')}
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 0;text-align:center;">
          <p style="margin:0 0 16px;font-size:15px;color:${EMAIL_BRAND.mutedColor};">Based on your results, here is what I would recommend:</p>
          <a href="${EMAIL_BRAND.calendarUrl}" style="display:inline-block;padding:14px 32px;background:${EMAIL_BRAND.brandColor};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book a Free Strategy Call</a>
          <p style="margin:16px 0 0;font-size:13px;color:${EMAIL_BRAND.mutedColor};">30 minutes. No pitch. We talk through your specific situation based on what your answers told me.</p>
        </td>
      </tr>`;

  return buildEmailWrapper({
    headerTitle: 'Your AI Readiness Results',
    bodyHtml,
    footerHtml: `
      <p style="margin:0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">Alex Myers / The Armchair Futurist</p>
      <p style="margin:4px 0 0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">
        <a href="https://thearmchairfuturist.com" style="color:${EMAIL_BRAND.accentColor};text-decoration:none;">thearmchairfuturist.com</a>
      </p>`,
  });
}

export function buildAlexNotificationEmail(data: AssessmentResultData): string {
  const { archetype, scores, email } = data;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:100px;">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Archetype</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(archetype.name)} (${escapeHtml(archetype.slug)})</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Clarity</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.clarity}%</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Readiness</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.readiness}%</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Urgency</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.urgency}%</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Recommended</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(archetype.primaryCta.label)}</td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
      <tr>
        <td style="padding:0;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.accentColor};font-weight:600;">Pre-call context</p>
          <p style="margin:8px 0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.textColor};">${escapeHtml(archetype.diagnosis[0] || '')}</p>
        </td>
      </tr>
    </table>`;

  return buildEmailWrapper({
    headerTitle: 'New Assessment Lead',
    bodyHtml,
    footerHtml: `<p style="margin:0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">Sent from thearmchairfuturist.com assessment</p>`,
  });
}

// ── Lead Capture ──────────────────────────────────────────────────────

export interface LeadProspectData {
  displayName: string;
}

export interface LeadNotificationData {
  name: string;
  email: string;
  source: string;
}

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

  return buildEmailWrapper({
    headerTitle: `Thanks for signing up, ${displayNameHtml}`,
    bodyHtml,
    footerHtml: `
      <p style="margin:0;font-size:12px;color:#9ca3af;">Alex Myers · The Armchair Futurist · <a href="https://thearmchairfuturist.com" style="color:${EMAIL_BRAND.accentColor};text-decoration:none;">thearmchairfuturist.com</a></p>
      <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">If you didn't sign up for this, you can safely ignore this email.</p>`,
  });
}

export function buildLeadNotificationEmail(data: LeadNotificationData): string {
  const nameHtml = escapeHtml(data.name);
  const emailHtml = escapeHtml(data.email);
  const sourceHtml = escapeHtml(data.source);

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:80px;">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${nameHtml}</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Email</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${emailHtml}</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Source</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${sourceHtml}</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Time</td><td style="padding:8px 0;font-size:14px;font-weight:600;">${new Date().toLocaleString()}</td></tr>
    </table>
    <p style="margin:16px 0 0;padding:12px;background:#fef3c7;border-radius:6px;font-size:13px;color:#92400e;">
      <strong>Action:</strong> Send a personal follow-up within 24 hours. They've opted in, warm lead.
    </p>`;

  return buildEmailWrapper({
    headerTitle: 'New Lead Captured',
    bodyHtml,
  });
}

// ── Contact ───────────────────────────────────────────────────────────

export interface ContactSubmissionData {
  name: string;
  email: string;
  message: string;
}

export interface ContactAutoReplyData {
  name: string;
}

export function buildContactNotificationEmail(data: ContactSubmissionData): string {
  const nameHtml = escapeHtml(data.name);
  const emailHtml = escapeHtml(data.email);
  const messageHtml = escapeHtml(data.message);

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:100px;border-bottom:1px solid #e5e7eb;vertical-align:top;">Name</td><td style="padding:10px 0;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${nameHtml}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};border-bottom:1px solid #e5e7eb;vertical-align:top;">Email</td><td style="padding:10px 0;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${emailHtml}</td></tr>
      <tr><td style="padding:10px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};vertical-align:top;border-bottom:1px solid #e5e7eb;">Message</td><td style="padding:10px 0;font-size:14px;white-space:pre-wrap;border-bottom:1px solid #e5e7eb;">${messageHtml}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">Submitted at: ${new Date().toLocaleString()}</p>`;

  return buildEmailWrapper({
    headerTitle: 'New Contact Form Submission',
    bodyHtml,
  });
}

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
