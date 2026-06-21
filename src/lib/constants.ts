export const CALENDAR_URL = 'https://calendar.app.google/nAHHwNMfhDvXGv7P7';
export const GOOGLE_FORM_URL = 'https://forms.gle/ASNfu9Wr1qRLBZ8C8';
export const SUBSTACK_URL = 'https://armchairfuturist.substack.com';
export const SPEAKING_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe36EU0DrDTMYMsGp32-wD_HlF7M_IPH-IsqpU-hrtJTlPZAg/viewform?usp=header';

// WhatsApp — pre-fills the message so the lead arrives with context, not blank.
// The %20 / %2C are URL-encoded spaces and commas.
export const WHATSAPP_BASE_URL = 'https://wa.me/15157706902';
export const WHATSAPP_DEFAULT_MESSAGE = 'Hi Alex, I came across your site and would like to learn more about your services.';
export const WHATSAPP_URL =
  WHATSAPP_BASE_URL + '?text=' + encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
