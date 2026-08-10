import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { createSubmissionRoute } from '@/lib/submission-route';
import type { ContactInput } from '@/lib/submission-pipeline';
import type { EmailSender } from '@/lib/email-sender';
import type { LeadStore } from '@/lib/lead-store';

const noOpLeadStore: LeadStore = {
  saveAssessmentLead: async () => {},
  saveCaptureLead: async () => {},
};

const okSender: EmailSender = { send: vi.fn().mockResolvedValue({ id: 'test-id' }) };

function makeSpec(overrides: Partial<Parameters<typeof createSubmissionRoute<ContactInput>>[0]> = {}) {
  return {
    kind: 'contact' as const,
    rateLimit: { maxRequests: 1, windowMs: 60_000 },
    leadStore: noOpLeadStore,
    parseBody: (body: unknown) => {
      const { name, email, message } = body as {
        name?: string;
        email?: string;
        message?: string;
      };
      return { kind: 'contact', name, email, message } as ContactInput;
    },
    project: () => ({ emailId: 'test-id' }),
    errorLabel: 'Contact form error:',
    serverErrorMessage: 'Failed to send message.',
    ...overrides,
  };
}

function post(payload: unknown, ip = '10.0.0.1') {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(payload),
  });
}

describe('createSubmissionRoute envelope', () => {
  it('returns 200 with the projected body on success', async () => {
    const POST = createSubmissionRoute(makeSpec(), { emailSender: okSender });
    const res = await POST(post({ name: 'A', email: 'a@b.com', message: 'hi' }, '10.0.0.10'));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, emailId: 'test-id' });
  });

  it('passes a pipeline validation failure through with its status', async () => {
    const POST = createSubmissionRoute(makeSpec(), { emailSender: okSender });
    const res = await POST(post({ name: 'A', email: '', message: 'hi' }, '10.0.0.11'));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  it('returns a parse error with the spec-supplied status', async () => {
    const POST = createSubmissionRoute(
      makeSpec({
        parseBody: () => ({ error: 'Malformed payload.', status: 422 }),
      }),
      { emailSender: okSender },
    );
    const res = await POST(post({}, '10.0.0.12'));
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual({ error: 'Malformed payload.' });
  });

  it('returns 500 with the spec message when the sender throws', async () => {
    const sender: EmailSender = {
      send: vi.fn().mockRejectedValue(new Error('resend down')),
    };
    const POST = createSubmissionRoute(makeSpec(), { emailSender: sender });
    const res = await POST(post({ name: 'A', email: 'a@b.com', message: 'hi' }, '10.0.0.13'));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Failed to send message.' });
  });

  it('returns 429 once the rate-limit bucket is exhausted', async () => {
    const POST = createSubmissionRoute(makeSpec(), { emailSender: okSender });
    const first = await POST(post({ name: 'A', email: 'a@b.com', message: 'hi' }, '10.0.0.20'));
    expect(first.status).toBe(200);
    const second = await POST(post({ name: 'B', email: 'b@c.com', message: 'hi' }, '10.0.0.20'));
    expect(second.status).toBe(429);
    expect(await second.json()).toEqual({ error: 'Too many requests. Please try again later.' });
  });
});
