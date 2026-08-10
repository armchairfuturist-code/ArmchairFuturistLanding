import { NextRequest, NextResponse } from 'next/server';
import {
  createSubmissionPipeline,
  type SubmissionInput,
  type SubmissionResult,
} from './submission-pipeline';
import { createResendEmailSender, type EmailSender } from './email-sender';
import { getResend } from './resend';
import { checkRateLimit, getRateLimitKey, type RateLimitConfig } from './email-utils';
import type { LeadStore } from './lead-store';

/**
 * A pure parse failure: the body was reachable but shaped wrong.
 * Pipeline-level validation (required fields, email format, message
 * length) still flows through {@link SubmissionResult} as a 400.
 */
export interface ParseError {
  error: string;
  status: 400 | 422;
}

/**
 * Declarative spec for one submission HTTP route. The factory owns the
 * envelope (rate limit, JSON parse, pipeline wiring, error mapping);
 * each route supplies only what actually varies: the input shape, the
 * lead store, the rate-limit bucket, and the success projection.
 */
export interface SubmissionRouteSpec<TInput extends SubmissionInput> {
  /** Discriminator forwarded to the pipeline as `input.kind`. */
  readonly kind: TInput['kind'];
  /** Rate-limit bucket; omit for the default. */
  readonly rateLimit?: RateLimitConfig;
  /** Lead store for this route (no-op for contact). */
  readonly leadStore: LeadStore;
  /** Pure: shape the raw JSON body into a pipeline input, or reject it. */
  readonly parseBody: (body: unknown) => TInput | ParseError;
  /** Pure: project a successful payload into the JSON response body. */
  readonly project: (
    data: Extract<SubmissionResult, { ok: true }>['data'],
  ) => Record<string, unknown>;
  /** Label for `console.error` on an unexpected failure. */
  readonly errorLabel: string;
  /** User-facing message returned on a 500. */
  readonly serverErrorMessage: string;
}

/** Test seam: inject a fake sender instead of building the Resend one. */
export interface SubmissionRouteDeps {
  readonly emailSender?: EmailSender;
}

/**
 * Build a `POST` handler for a submission route from a declarative spec.
 * Concentrates the rate-limit → parse → pipeline → status envelope behind
 * one deep adapter so the three submission routes cannot drift apart.
 */
export function createSubmissionRoute<TInput extends SubmissionInput>(
  spec: SubmissionRouteSpec<TInput>,
  deps: SubmissionRouteDeps = {},
) {
  return async function POST(request: NextRequest): Promise<NextResponse> {
    try {
      const rateLimitResult = checkRateLimit(getRateLimitKey(request), spec.rateLimit);
      if (!rateLimitResult.allowed) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 },
        );
      }

      const body = await request.json();
      const parsed = spec.parseBody(body);
      if ('error' in parsed) {
        return NextResponse.json({ error: parsed.error }, { status: parsed.status });
      }

      const submit = createSubmissionPipeline({
        emailSender: deps.emailSender ?? createResendEmailSender(getResend()),
        leadStore: spec.leadStore,
      });

      const result = await submit(parsed);
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: result.status });
      }

      return NextResponse.json({ success: true, ...spec.project(result.data) });
    } catch (error) {
      console.error(spec.errorLabel, error);
      return NextResponse.json({ error: spec.serverErrorMessage }, { status: 500 });
    }
  };
}
