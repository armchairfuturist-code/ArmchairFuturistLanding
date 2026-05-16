import type { Archetype } from './archetypes';
import { buildEmailWrapper, EMAIL_BRAND, escapeHtml } from '@/lib/email-utils';

interface ResultEmailData {
  archetype: Archetype;
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

/**
 * HTML email sent to the prospect with their assessment results,
 * archetype diagnosis, and a CTA to book a call.
 */
export function buildProspectResultEmail(data: ResultEmailData): string {
  const { archetype, scores } = data;

  const bodyHtml = `
    <!-- Archetype -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:0 0 16px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.accentColor};font-weight:600;">Your Profile</p>
          <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${EMAIL_BRAND.textColor};">${escapeHtml(archetype.name)}</h2>
          <p style="margin:0;font-size:16px;color:${EMAIL_BRAND.mutedColor};line-height:1.5;">${escapeHtml(archetype.headline)}</p>
        </td>
      </tr>

      <!-- Scores -->
      <tr>
        <td style="padding:16px 0 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${buildScoreRow('Clarity', scores.clarity, '#3b82f6')}
            ${buildScoreRow('Readiness', scores.readiness, '#10b981')}
            ${buildScoreRow('Urgency', scores.urgency, '#f59e0b')}
          </table>
        </td>
      </tr>

      <!-- Diagnosis -->
      <tr>
        <td style="padding:0 0 24px;">
          <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.accentColor};font-weight:600;">What this means</p>
          ${archetype.diagnosis.map(p => `<p style="margin:8px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.textColor};">${p}</p>`).join('')}
        </td>
      </tr>

      <!-- CTA -->
      <tr>
        <td style="padding:8px 0 0;text-align:center;">
          <p style="margin:0 0 16px;font-size:15px;color:${EMAIL_BRAND.mutedColor};">Based on your results, here is what I would recommend:</p>
          <a href="${EMAIL_BRAND.calendarUrl}" style="display:inline-block;padding:14px 32px;background:${EMAIL_BRAND.brandColor};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book a Free Strategy Call</a>
          <p style="margin:16px 0 0;font-size:13px;color:${EMAIL_BRAND.mutedColor};">30 minutes. No pitch. We talk through your specific situation based on what your answers told me.</p>
        </td>
      </tr>`;

  const footerHtml = `
    <p style="margin:0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">Alex Myers / The Armchair Futurist</p>
    <p style="margin:4px 0 0;font-size:12px;color:${EMAIL_BRAND.mutedColor};">
      <a href="https://thearmchairfuturist.com" style="color:${EMAIL_BRAND.accentColor};text-decoration:none;">thearmchairfuturist.com</a>
    </p>`;

  return buildEmailWrapper({
    headerTitle: 'Your AI Readiness Results',
    bodyHtml,
    footerHtml,
  });
}

/**
 * HTML email sent to Alex as a lead notification.
 * Includes the prospect's email, archetype, scores, and recommended path.
 */
export function buildAlexNotificationEmail(data: ResultEmailData): string {
  const { archetype, scores, email } = data;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};width:100px;">Email</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(email)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Archetype</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(archetype.name)} (${escapeHtml(archetype.slug)})</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Clarity</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.clarity}%</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Readiness</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.readiness}%</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Urgency</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.urgency}%</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:14px;color:${EMAIL_BRAND.mutedColor};">Recommended</td>
        <td style="padding:8px 0;font-size:14px;font-weight:600;">${escapeHtml(archetype.primaryCta.label)}</td>
      </tr>
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
