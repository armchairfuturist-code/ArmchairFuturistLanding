export const SITE_URL = 'https://thearmchairfuturist.com';
export const CALENDAR_URL = 'https://calendar.app.google/nAHHwNMfhDvXGv7P7';
// 15-minute fit call (Google appointments schedule) — used by the audit flow.
export const AUDIT_BOOKING_URL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ00YbCp7nC3lquiFi9LfoqKg-Csj9Bl2W9gM3Xf1gYE_1JE3nSowo4K3xY9VMPklsxIqvrZwvCM';
export const GOOGLE_FORM_URL = 'https://forms.gle/ASNfu9Wr1qRLBZ8C8';
export const SUBSTACK_URL = 'https://armchairfuturist.substack.com';
export const BRAGA_AI_BUILDERS_URL = 'https://braga-ai-builders.vercel.app';
export const SPEAKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header';
export const GITHUB_URL = 'https://github.com/armchairfuturist-code';

// WhatsApp — pre-fills the message so the lead arrives with context, not blank.
// The %20 / %2C are URL-encoded spaces and commas.
export const WHATSAPP_BASE_URL = 'https://wa.me/15157706902';
export const WHATSAPP_DEFAULT_MESSAGE = 'Hi Alex, I saw your site. I want to talk about AI for my business.';
export const WHATSAPP_URL =
  WHATSAPP_BASE_URL + '?text=' + encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
