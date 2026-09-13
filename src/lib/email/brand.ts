import { CALENDAR_URL } from "@/lib/constants";

/** Single source of truth for the booking URL is CALENDAR_URL in constants.ts. */
export const EMAIL_BRAND = {
  brandColor: "#024ad8",
  accentColor: "#296ef9",
  textColor: "#1a1a1a",
  mutedColor: "#6b7280",
  bgColor: "#f8fafc",
  calendarUrl: CALENDAR_URL,
} as const;

export function buildEmailWrapper(opts: {
  headerTitle: string;
  bodyHtml: string;
  footerHtml?: string;
}): string {
  const { headerTitle, bodyHtml, footerHtml } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.bgColor};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_BRAND.textColor};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${EMAIL_BRAND.bgColor};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background:${EMAIL_BRAND.brandColor};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">The Armchair Futurist</p>
              <h1 style="margin:12px 0 0;font-size:24px;font-weight:700;color:#ffffff;">${headerTitle}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              ${bodyHtml}
            </td>
          </tr>
          ${footerHtml ? `<tr><td style="padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">${footerHtml}</td></tr>` : ""}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
