import { describe, it, expect, beforeEach } from 'vitest';
import { createSubmissionPipeline, type SubmissionInput, type SubmissionResult, type AssessmentResult, type LeadResult } from '../submission-pipeline';
import { FakeEmailSender, FakeLeadStore } from './fakes';
import { QUESTION_COUNT } from '@/lib/assessment/resolve-answers';

describe('createSubmissionPipeline', () => {
  let emailSender: FakeEmailSender;
  let leadStore: FakeLeadStore;
  let submit: (input: SubmissionInput) => Promise<SubmissionResult>;

  beforeEach(() => {
    emailSender = new FakeEmailSender();
    leadStore = new FakeLeadStore();
    submit = createSubmissionPipeline({ emailSender, leadStore });
  });

  // ── Assessment ────────────────────────────────────────────────

  describe('assessment', () => {
    const validAnswers = Array.from({ length: QUESTION_COUNT }, () => 0);
    const validEmail = 'test@example.com';

    it('happy path: returns archetype, scores, sends 2 emails, stores lead', async () => {
      const result = await submit({
        kind: 'assessment',
        email: validEmail,
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      const data = result.data as AssessmentResult;
      expect(data).toHaveProperty('archetypeSlug');
      expect(data).toHaveProperty('scores');
      expect(data).toHaveProperty('emailId');
      expect(data).toHaveProperty('individualSignals');
      expect(data).toHaveProperty('storageFailed', false);

      // Archetype slug should be one of the known archetypes
      const knownSlugs = [
        'stalled-executive',
        'curious-professional',
        'ready-builder',
        'overwhelmed-leader',
      ];
      expect(knownSlugs).toContain(data.archetypeSlug);

      // Scores should be objects with clarity, readiness, urgency
      expect(data.scores).toEqual({
        clarity: expect.any(Number),
        readiness: expect.any(Number),
        urgency: expect.any(Number),
      });

      // Two emails sent: one to prospect, one to Alex
      expect(emailSender.sent).toHaveLength(2);
      expect(emailSender.sent[0].to).toBe(validEmail);
      expect(emailSender.sent[1].to).toBe('armchairfuturist@gmail.com');

      // Lead stored
      expect(leadStore.assessmentLeads).toHaveLength(1);
      expect(leadStore.assessmentLeads[0].email).toBe(validEmail);
      expect(leadStore.assessmentLeads[0].archetypeSlug).toBe(data.archetypeSlug);
    });

    it('invalid email: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'assessment',
        email: 'not-an-email',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/email/i);

      // No emails sent, no lead stored
      expect(emailSender.sent).toHaveLength(0);
      expect(leadStore.assessmentLeads).toHaveLength(0);
    });

    it('empty email: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'assessment',
        email: '',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
    });

    it('invalid answer indices: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'assessment',
        email: validEmail,
        answerIndices: [0, 0], // wrong length (needs 9)
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/answer/i);

      expect(emailSender.sent).toHaveLength(0);
      expect(leadStore.assessmentLeads).toHaveLength(0);
    });

    it('out-of-range answer index: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'assessment',
        email: validEmail,
        answerIndices: [0, 0, 0, 0, 0, 0, 0, 0, 99], // index 99 out of range
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
    });

    it('non-array answer indices: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'assessment',
        email: validEmail,
        answerIndices: 'not-an-array',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
    });

    it('Firestore failure: still ok:true, storageFailed:true, emails still sent', async () => {
      leadStore.saveAssessmentLead = async () => {
        throw new Error('Firestore unavailable');
      };

      const result = await submit({
        kind: 'assessment',
        email: validEmail,
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      const data = result.data as AssessmentResult;
      expect(data.storageFailed).toBe(true);
      expect(data.archetypeSlug).toBeTruthy();
      expect(data.scores).toBeDefined();

      // Emails still sent despite storage failure
      expect(emailSender.sent).toHaveLength(2);
    });
  });

  // ── Lead capture ──────────────────────────────────────────────

  describe('lead capture', () => {
    const validEmail = 'lead@example.com';
    const validName = 'Jane Doe';

    it('happy path: sends 2 emails, stores lead', async () => {
      const result = await submit({
        kind: 'lead-capture',
        name: validName,
        email: validEmail,
        source: 'hero-lead-capture',
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect((result.data as LeadResult).storageFailed).toBe(false);

      // Two emails: prospect + owner
      expect(emailSender.sent).toHaveLength(2);
      expect(emailSender.sent[0].to).toBe(validEmail);
      expect(emailSender.sent[1].to).toBe('armchairfuturist@gmail.com');

      // Lead stored with correct data
      expect(leadStore.captureLeads).toHaveLength(1);
      expect(leadStore.captureLeads[0].name).toBe(validName);
      expect(leadStore.captureLeads[0].email).toBe(validEmail);
      expect(leadStore.captureLeads[0].source).toBe('hero-lead-capture');
    });

    it('invalid email: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'lead-capture',
        name: validName,
        email: 'bad-email',
        source: 'hero-lead-capture',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/email/i);

      expect(emailSender.sent).toHaveLength(0);
      expect(leadStore.captureLeads).toHaveLength(0);
    });

    it('empty email: returns ok:false, status 400', async () => {
      const result = await submit({
        kind: 'lead-capture',
        name: validName,
        email: '',
        source: 'hero-lead-capture',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
    });

    it('missing name defaults to email prefix', async () => {
      const result = await submit({
        kind: 'lead-capture',
        name: '',
        email: validEmail,
        source: 'hero-lead-capture',
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect(leadStore.captureLeads).toHaveLength(1);
      // name '' → trim → '' → fallback to email.split('@')[0] = 'lead'
      expect(leadStore.captureLeads[0].name).toBe('lead');
    });

    it('Firestore failure: still ok:true, storageFailed:true', async () => {
      leadStore.saveCaptureLead = async () => {
        throw new Error('Firestore unavailable');
      };

      const result = await submit({
        kind: 'lead-capture',
        name: validName,
        email: validEmail,
        source: 'hero-lead-capture',
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect((result.data as LeadResult).storageFailed).toBe(true);

      // Emails still sent despite storage failure
      expect(emailSender.sent).toHaveLength(2);
    });
  });

  // ── Contact ───────────────────────────────────────────────────

  describe('contact', () => {
    const validInput = {
      kind: 'contact' as const,
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello, I would like to discuss AI strategy.',
    };

    it('happy path: owner email sent, auto-reply sent', async () => {
      const result = await submit(validInput);

      expect(result.ok).toBe(true);
      if (!result.ok) return;

      const data = result.data as { emailId: string };
      expect(data.emailId).toBe('fake-1');

      // Two emails: owner notification + auto-reply
      expect(emailSender.sent).toHaveLength(2);
      expect(emailSender.sent[0].to).toBe('armchairfuturist@gmail.com');
      expect(emailSender.sent[0].subject).toContain('Alice');
      expect(emailSender.sent[1].to).toBe(validInput.email);
    });

    it('missing name: returns ok:false, status 400', async () => {
      const result = await submit({
        ...validInput,
        name: '',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/required/i);
    });

    it('missing email: returns ok:false, status 400', async () => {
      const result = await submit({
        ...validInput,
        email: '',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/required/i);
    });

    it('missing message: returns ok:false, status 400', async () => {
      const result = await submit({
        ...validInput,
        message: '',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/required/i);
    });

    it('invalid email: returns ok:false, status 400', async () => {
      const result = await submit({
        ...validInput,
        email: 'not-valid',
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(400);
      expect(result.error).toMatch(/email/i);
    });

    it('auto-reply failure: owner email still sent, result still ok:true', async () => {
      let callCount = 0;
      emailSender.send = async (msg) => {
        callCount++;
        if (callCount === 2) {
          throw new Error('Auto-reply delivery failed');
        }
        return { id: `fake-${callCount}` };
      };

      const result = await submit(validInput);

      // Owner notification succeeded (call 1), auto-reply failed (call 2) —
      // pipeline catches auto-reply error and still returns ok
      expect(result.ok).toBe(true);
      if (!result.ok) return;

      const data = result.data as { emailId: string };
      expect(data.emailId).toBe('fake-1');
    });
  });

  // ── Delivery policy ───────────────────────────────────────────
  //
  // One rule across every pipeline: a send failure must not turn a stored
  // submission into an error, because the visitor then resubmits and creates
  // a duplicate while the owner is never told. Before this, assessment failed
  // on the first send and lead capture failed on either, while contact treated
  // the same situation as survivable.

  describe('delivery policy', () => {
    const validAnswers = Array.from({ length: QUESTION_COUNT }, () => 0);

    function senderFailingOn(callToFail: number): FakeEmailSender {
      const sender = new FakeEmailSender();
      let call = 0;
      sender.send = async (msg) => {
        call++;
        if (call === callToFail) throw new Error('resend down');
        sender.sent.push(msg);
        return { id: `fake-${call}` };
      };
      return sender;
    }

    it('assessment: a failed visitor email still stores the lead and returns ok', async () => {
      const sender = senderFailingOn(1);
      const store = new FakeLeadStore();
      const run = createSubmissionPipeline({ emailSender: sender, leadStore: store });

      const result = await run({
        kind: 'assessment',
        email: 'test@example.com',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(true);
      expect(store.assessmentLeads).toHaveLength(1);
    });

    it('assessment: a failed owner notification still returns ok', async () => {
      const sender = senderFailingOn(2);
      const store = new FakeLeadStore();
      const run = createSubmissionPipeline({ emailSender: sender, leadStore: store });

      const result = await run({
        kind: 'assessment',
        email: 'test@example.com',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      const data = result.data as AssessmentResult;
      // The visitor email did go out, so its id survives.
      expect(data.emailId).toBe('fake-1');
    });

    it('lead capture: a failed first send still stores the lead and returns ok', async () => {
      const sender = senderFailingOn(1);
      const store = new FakeLeadStore();
      const run = createSubmissionPipeline({ emailSender: sender, leadStore: store });

      const result = await run({
        kind: 'lead-capture',
        email: 'lead@example.com',
        name: 'Lead',
        source: 'hero',
      });

      expect(result.ok).toBe(true);
      expect(store.captureLeads).toHaveLength(1);
    });

    it('returns 500 only when storage failed and every send failed', async () => {
      const sender = new FakeEmailSender();
      sender.send = async () => {
        throw new Error('resend down');
      };
      const store = new FakeLeadStore();
      store.saveAssessmentLead = async () => {
        throw new Error('firestore down');
      };
      const run = createSubmissionPipeline({ emailSender: sender, leadStore: store });

      const result = await run({
        kind: 'assessment',
        email: 'test@example.com',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.status).toBe(500);
    });

    it('does not 500 when storage failed but a send got through', async () => {
      const sender = senderFailingOn(2); // visitor email succeeds
      const store = new FakeLeadStore();
      store.saveAssessmentLead = async () => {
        throw new Error('firestore down');
      };
      const run = createSubmissionPipeline({ emailSender: sender, leadStore: store });

      const result = await run({
        kind: 'assessment',
        email: 'test@example.com',
        answerIndices: validAnswers,
      });

      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect((result.data as AssessmentResult).storageFailed).toBe(true);
    });
  });
});
