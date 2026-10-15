import { describe, it } from 'vitest';
import { createSubmissionPipeline } from '@/lib/submission-pipeline';

const sent: { to: string; subject: string; html: string }[] = [];
const sender = { send: async (m: never) => { sent.push(m as never); return { id: 'x' }; } };
const stored: Record<string, unknown>[] = [];
const store = {
  saveAssessmentLead: async () => {}, saveCaptureLead: async () => {},
  saveAuditCase: async (d: unknown) => { stored.push(d as never); },
  saveIdentityCase: async (d: unknown) => { stored.push(d as never); },
};
const pipe = createSubmissionPipeline({ emailSender: sender as never, leadStore: store as never });

describe('PROBE raw-vs-clean', () => {
  it('identity: huge + whitespace-padded field', async () => {
    const huge = 'Z'.repeat(50000);
    await pipe({
      kind: 'identity-intake' as const,
      name: '  Ann  ', email: 'a@b.com', scope: 'individual',
      linkedinUrl: '  https://linkedin.com/in/ann  ',
      resumeUrl: 'https://r.com/cv',
      socialLinks: 'https://s.com', headline: '  Head  ',
      notes: huge,
    });
    const owner = sent.find(m => m.to !== 'a@b.com')!;
    const doc = stored[0] as { intake: Record<string, unknown> };
    console.log('  identity notes  stored len:', String(doc.intake.notes).length,
                '| emailed html len:', owner.html.length);
    console.log('  identity notes  stored:', JSON.stringify(String(doc.intake.notes).slice(0,12)));
    console.log('  identity linkedin stored:', JSON.stringify(doc.intake.linkedinUrl));
    console.log('  identity notes present in email html:', owner.html.includes(huge.slice(0,200)));
  });

  it('audit: same huge field, for comparison', async () => {
    sent.length = 0; stored.length = 0;
    const huge = 'Z'.repeat(50000);
    await pipe({
      kind: 'audit-intake' as const,
      name: 'Ann', email: 'a@b.com', role: 'r', scope: 'individual',
      aiMaturity: 'chat', paidTools: 'p', weekEaters: huge, win90d: 'w',
      triedFailed: 't', biggestQuestion: 'q', availability: 'a',
    });
    const owner = sent.find(m => m.to !== 'a@b.com')!;
    const doc = stored[0] as { intake: Record<string, unknown> };
    console.log('  audit    weekEaters stored len:', String(doc.intake.weekEaters).length,
                '| emailed html len:', owner.html.length);
    console.log('  audit    huge present in email html:', owner.html.includes(huge.slice(0,200)));
  });
});
