import { describe, it, expect, beforeEach } from 'vitest';
import { createSubmissionPipeline, type SubmissionResult } from '../submission-pipeline';
import { FakeEmailSender, FakeLeadStore } from './fakes';

const validIntake = {
  name: 'Test Client',
  email: 'client@example.com',
  scope: 'individual',
  linkedinUrl: 'https://linkedin.com/in/test',
  resumeUrl: 'https://example.com/resume.pdf',
  socialLinks: '',
  headline: 'Ops director, scaling to VP',
  notes: '',
};

describe('identity intake pipeline (Plan 010)', () => {
  let emailSender: FakeEmailSender;
  let leadStore: FakeLeadStore;
  let submit: (input: unknown) => Promise<SubmissionResult>;

  beforeEach(() => {
    emailSender = new FakeEmailSender();
    leadStore = new FakeLeadStore();
    const pipeline = createSubmissionPipeline({ emailSender, leadStore });
    submit = (input) => pipeline(input as never);
  });

  it('happy path: stores identity case, sends 2 emails, returns caseId', async () => {
    const result = await submit({ kind: 'identity-intake', ...validIntake });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const data = result.data as { caseId?: string; storageFailed?: boolean };
    expect(data.caseId).toMatch(/^id_/);
    expect(leadStore.identityCases).toHaveLength(1);
    const c = leadStore.identityCases[0] as unknown as Record<string, unknown>;
    expect(c.offer).toBe('digitalIdentity');
    expect(c.price).toEqual({ usd: 233, eur: 199 });
    expect(emailSender.sent).toHaveLength(2);
    expect(emailSender.sent[0].to).toBe('client@example.com');
    expect(emailSender.sent[1].to).toBe('armchairfuturist@gmail.com');
  });

  it('rejects a non-URL linkedin link', async () => {
    const result = await submit({ kind: 'identity-intake', ...validIntake, linkedinUrl: 'not a url' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(400);
    expect(leadStore.identityCases).toHaveLength(0);
  });

  it('rejects invalid scope', async () => {
    const result = await submit({ kind: 'identity-intake', ...validIntake, scope: 'family' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(400);
  });

  it('invalid email: nothing stored, nothing sent', async () => {
    const result = await submit({ kind: 'identity-intake', ...validIntake, email: 'nope' });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(400);
    expect(leadStore.identityCases).toHaveLength(0);
    expect(emailSender.sent).toHaveLength(0);
  });

  it('Firestore failure degrades gracefully', async () => {
    leadStore.saveIdentityCase = async () => { throw new Error('down'); };
    const result = await submit({ kind: 'identity-intake', ...validIntake });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect((result.data as { storageFailed?: boolean }).storageFailed).toBe(true);
    expect(emailSender.sent).toHaveLength(2);
  });
});
