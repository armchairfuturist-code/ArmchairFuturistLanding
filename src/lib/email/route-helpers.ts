/**
 * Shared API route helper.
 * Reduces boilerplate across contact, lead-capture, and assessment routes.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getResend } from "@/lib/resend";
import { checkRateLimit, getRateLimitKey } from "@/lib/email-utils";
import type { RateLimitConfig } from "@/lib/email-utils";
import { ALEX_EMAIL, FROM_EMAIL } from "@/lib/email/config";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

interface RouteHandlerInput {
  request: NextRequest;
  /** Rate limit configuration (defaults to 10 req/min) */
  rateLimit?: RateLimitConfig;
  /** Required body fields */
  requiredFields: string[];
  /** Build one or more emails from the parsed body */
  buildEmails: (body: Record<string, string>) => EmailPayload[];
}

/**
 * Standard API route handler wrapper.
 *
 * Handles: rate limiting → body parse → field validation → email sending.
 * Each route only needs to provide its specific `buildEmails` logic and validation rules.
 */
export async function handleEmailRoute({
  request,
  rateLimit,
  requiredFields,
  buildEmails,
}: RouteHandlerInput) {
  try {
    // ── Rate limit ──
    const limitResult = checkRateLimit(getRateLimitKey(request), rateLimit);
    if (!limitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // ── Parse body ──
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    // ── Validate required fields ──
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `${missing.join(", ")} required.` },
        { status: 400 },
      );
    }

    // Ensure all required fields are strings
    const invalid = requiredFields.filter((f) => typeof body[f] !== "string");
    if (invalid.length > 0) {
      return NextResponse.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const stringBody = body as Record<string, string>;

    // ── Build and send emails ──
    const emails = buildEmails(stringBody);
    const resend = getResend();

    await Promise.all(
      emails.map((email) =>
        resend.emails.send({ from: FROM_EMAIL, ...email }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email route error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
