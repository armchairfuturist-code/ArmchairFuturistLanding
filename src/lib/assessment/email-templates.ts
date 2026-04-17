import type { Archetype } from './archetypes';

const BRAND_COLOR = '#1e3a5f';
const ACCENT_COLOR = '#3b82f6';
const TEXT_COLOR = '#1a1a2e';
const MUTED_COLOR = '#6b7280';
const BG_COLOR = '#f8fafc';
const CALENDAR_URL = 'https://calendar.app.google/nAHHwNMfhDvXGv7P7';

interface ResultEmailData {
  archetype: Archetype;
  scores: { clarity: number; readiness: number; urgency: number };
  email: string;
}

/**
 * HTML email sent to the prospect with their assessment results,
 * archetype diagnosis, and a CTA to book a call.
 */
export function buildProspectResultEmail(data: ResultEmailData): string {
  const { archetype, scores } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your AI Readiness Results</title>
</head>
<body style="margin:0;padding:0;background:${BG_COLOR};font-family:Arial,Helvetica,sans-serif;color:${TEXT_COLOR};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${BG_COLOR};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">The Armchair Futurist</p>
              <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;">Your AI Readiness Results</h1>
            </td>
          </tr>

          <!-- Archetype -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${ACCENT_COLOR};font-weight:600;">Your Profile</p>
              <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${TEXT_COLOR};">${archetype.name}</h2>
              <p style="margin:0;font-size:16px;color:${MUTED_COLOR};line-height:1.5;">${archetype.headline}</p>
            </td>
          </tr>

          <!-- Scores -->
          <tr>
            <td style="padding:16px 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${buildScoreRow('Clarity', scores.clarity, '#3b82f6')}
                ${buildScoreRow('Readiness', scores.readiness, '#10b981')}
                ${buildScoreRow('Urgency', scores.urgency, '#f59e0b')}
              </table>
            </td>
          </tr>

          <!-- Diagnosis -->
          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${ACCENT_COLOR};font-weight:600;">What this means</p>
              ${archetype.diagnosis.map(p => `<p style="margin:8px 0;font-size:15px;line-height:1.6;color:${TEXT_COLOR};">${p}</p>`).join('')}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:8px 40px 32px;text-align:center;">
              <p style="margin:0 0 16px;font-size:15px;color:${MUTED_COLOR};">Based on your results, here is what I would recommend:</p>
              <a href="${CALENDAR_URL}" style="display:inline-block;padding:14px 32px;background:${BRAND_COLOR};color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:6px;">Book a Free Strategy Call</a>
              <p style="margin:16px 0 0;font-size:13px;color:${MUTED_COLOR};">30 minutes. No pitch. We talk through your specific situation based on what your answers told me.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:${MUTED_COLOR};">Alex Myers / The Armchair Futurist</p>
              <p style="margin:4px 0 0;font-size:12px;color:${MUTED_COLOR};">
                <a href="https://thearmchairfuturist.com" style="color:${ACCENT_COLOR};text-decoration:none;">thearmchairfuturist.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildScoreRow(label: string, value: number, color: string): string {
  const barWidth = Math.max(value, 5);
  return `
    <tr>
      <td style="padding:6px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="font-size:13px;font-weight:600;color:${TEXT_COLOR};width:80px;">${label}</td>
            <td style="padding:0 12px;">
              <div style="background:#e5e7eb;border-radius:4px;height:10px;width:100%;">
                <div style="background:${color};border-radius:4px;height:10px;width:${barWidth}%;"></div>
              </div>
            </td>
            <td style="font-size:13px;font-weight:600;color:${MUTED_COLOR};width:36px;text-align:right;">${value}%</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

/**
 * HTML email sent to Alex as a lead notification.
 * Includes the prospect's email, archetype, scores, and recommended path.
 */
export function buildAlexNotificationEmail(data: ResultEmailData): string {
  const { archetype, scores, email } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Assessment Lead</title>
</head>
<body style="margin:0;padding:0;background:${BG_COLOR};font-family:Arial,Helvetica,sans-serif;color:${TEXT_COLOR};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${BG_COLOR};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">

          <tr>
            <td style="background:${BRAND_COLOR};padding:24px 40px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">New Assessment Lead</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};width:100px;">Email</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};">Archetype</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${archetype.name} (${archetype.slug})</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};">Clarity</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.clarity}%</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};">Readiness</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.readiness}%</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};">Urgency</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${scores.urgency}%</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:${MUTED_COLOR};">Recommended</td>
                  <td style="padding:8px 0;font-size:14px;font-weight:600;">${archetype.primaryCta.label}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 24px;">
              <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${ACCENT_COLOR};font-weight:600;">Pre-call context</p>
              <p style="margin:8px 0;font-size:14px;line-height:1.6;color:${TEXT_COLOR};">${archetype.diagnosis[0]}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 40px 24px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:${MUTED_COLOR};">Sent from thearmchairfuturist.com assessment</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
