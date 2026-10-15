import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  escapeHtml,
  sanitizeEmailHeaderValue,
} from '@/lib/email/validation';

describe('isValidEmail', () => {
  it('accepts ordinary addresses', () => {
    for (const ok of [
      'a@b.co',
      'alex@thearmchairfuturist.com',
      'first.last+tag@sub.domain.co.uk',
    ]) {
      expect(isValidEmail(ok)).toBe(true);
    }
  });

  it('rejects addresses carrying whitespace or a line break', () => {
    // This is what stops header injection: the address is interpolated into
    // email subjects, so a CRLF must never survive validation.
    for (const bad of [
      'a@b.co\r\nBcc: attacker@evil.com',
      'a@b.co\nBcc: attacker@evil.com',
      'a b@c.co',
      'a@b.co ',
      ' a@b.co',
    ]) {
      expect(isValidEmail(bad)).toBe(false);
    }
  });

  it('rejects addresses missing a part', () => {
    for (const bad of ['', 'plain', 'a@b', '@b.co', 'a@', 'a@b.']) {
      expect(isValidEmail(bad)).toBe(false);
    }
  });
});

describe('escapeHtml', () => {
  it('neutralises an injected script tag', () => {
    const out = escapeHtml('<script>alert(1)</script>');
    expect(out).not.toContain('<script>');
    expect(out).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('escapes every dangerous character', () => {
    expect(escapeHtml(`<>&"'`)).toBe('&lt;&gt;&amp;&quot;&#x27;');
  });

  it('escapes the ampersand first so escapes are not double-encoded', () => {
    // If & were replaced last, the & of &lt; would itself become &amp;lt;.
    expect(escapeHtml('<')).toBe('&lt;');
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
  });

  it('leaves ordinary text alone', () => {
    expect(escapeHtml('Alex Myers — Braga')).toBe('Alex Myers — Braga');
  });

  it('stops an attribute break-out', () => {
    const out = escapeHtml('" onmouseover="alert(1)');
    expect(out).not.toContain('"');
    expect(out).toContain('&quot;');
  });
});

describe('sanitizeEmailHeaderValue', () => {
  it('removes CR and LF so an extra header cannot be injected', () => {
    const out = sanitizeEmailHeaderValue('Subject\r\nBcc: attacker@evil.com');
    expect(out).not.toMatch(/[\r\n]/);
    expect(out).toBe('Subject  Bcc: attacker@evil.com');
  });

  it('trims surrounding whitespace', () => {
    expect(sanitizeEmailHeaderValue('  hello  ')).toBe('hello');
  });

  it('caps the length at 200 characters', () => {
    expect(sanitizeEmailHeaderValue('x'.repeat(500))).toHaveLength(200);
  });
});