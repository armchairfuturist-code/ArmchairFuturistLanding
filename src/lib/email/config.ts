/**
 * Shared email configuration for API routes.
 * Previously ALEX_EMAIL and FROM_EMAIL were duplicated in 3 route files.
 */

export const ALEX_EMAIL =
  process.env.ALEX_EMAIL || "armchairfuturist@gmail.com";

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Alex Myers <alex@thearmchairfuturist.com>";
