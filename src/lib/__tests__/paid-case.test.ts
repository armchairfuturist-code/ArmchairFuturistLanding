import { describe, it, expect, vi } from 'vitest';
import {
  basePaidCase,
  canTransitionIn,
  checkPaidIntakeContact,
  cleanField,
  findMissingField,
  generateCaseId,
  persistBestEffort,
  sendCaseNotificationPair,
} from '../paid-case';
import { FakeEmailSender } from './fakes';

describe('paid-case engine', () => {
  it('generateCaseId prefixes and stays unique-ish', () => {
    expect(generateCaseId('audit')).toMatch(/^audit_[a-z0-9]+_[a-z0-9]+$/);
    expect(generateCaseId('id')).toMatch(/^id_/);
    expect(generateCaseId('audit')).not.toBe(generateCaseId('audit'));
  });

  it('cleanField trims, caps, and coerces non-strings', () => {
    expect(cleanField('  hi  ', 10)).toBe('hi');
    expect(cleanField('abcdef', 3)).toBe('abc');
    expect(cleanField(undefined, 10)).toBe('');
    expect(cleanField(42, 10)).toBe('');
  });

  it('findMissingField reports the first blank field', () => {
    expect(findMissingField({ a: 'x', b: '  ' }, ['a', 'b'])).toBe('b');
    expect(findMissingField({ a: 'x' }, ['a', 'missing'])).toBe('missing');
    expect(findMissingField({ a: 'x' }, ['a'])).toBeNull();
  });

  it('checkPaidIntakeContact: missing field beats bad email', () => {
    expect(checkPaidIntakeContact({ email: 'nope' }, ['name', 'email'])).toBe(
      'Missing field: name.',
    );
    expect(checkPaidIntakeContact({ name: 'A', email: 'nope' }, ['name', 'email'])).toBe(
      'Invalid email address.',
    );
    expect(
      checkPaidIntakeContact({ name: 'A', email: 'a@b.com' }, ['name', 'email']),
    ).toBeNull();
  });

  it('persistBestEffort returns the storageFailed flag', async () => {
    await expect(persistBestEffort(async () => {}, 'label:')).resolves.toBe(false);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      await expect(
        persistBestEffort(async () => { throw new Error('down'); }, 'Case storage failed:'),
      ).resolves.toBe(true);
      expect(warn).toHaveBeenCalledWith('Case storage failed:', expect.any(Error));
    } finally {
      warn.mockRestore();
    }
  });

  it('sendCaseNotificationPair: prospect first, Alex second, returns confirm id', async () => {
    const sender = new FakeEmailSender();
    const id = await sendCaseNotificationPair(
      sender,
      { to: 'client@example.com', subject: 'Confirm', html: '<p>hi</p>' },
      { subject: 'Owner note', html: '<p>lead</p>' },
    );
    expect(id).toBe('fake-1');
    expect(sender.sent).toHaveLength(2);
    expect(sender.sent[0].to).toBe('client@example.com');
    expect(sender.sent[1].to).toBe('armchairfuturist@gmail.com');
  });

  it('basePaidCase stamps the shared envelope', () => {
    const base = basePaidCase({ name: 'A', email: 'a@b.com' }, 'audit_x', '2026-09-01T00:00:00Z');
    expect(base).toEqual({
      caseId: 'audit_x',
      createdAt: '2026-09-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
      status: 'submitted',
      name: 'A',
      email: 'a@b.com',
    });
  });

  it('canTransitionIn follows the table', () => {
    const table = { a: ['b'], b: [] } as const;
    expect(canTransitionIn(table, 'a', 'b')).toBe(true);
    expect(canTransitionIn(table, 'b', 'a')).toBe(false);
    expect(canTransitionIn(table, 'a', 'a')).toBe(false);
  });
});
