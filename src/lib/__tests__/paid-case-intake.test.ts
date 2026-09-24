import { describe, expect, it, vi } from "vitest";
import { AUDIT_PAID_CASE, IDENTITY_PAID_CASE } from "../paid-case-intake";
import { checkPaidIntakeContact } from "../paid-case";

const validAudit = {
  kind: "audit-intake" as const,
  name: "A",
  email: "a@b.com",
  role: "Operator",
  scope: "individual",
  aiMaturity: "chat",
  paidTools: "Some",
  weekEaters: "Reporting",
  win90d: "Save hours",
  triedFailed: "None",
  biggestQuestion: "Where to start?",
  availability: "UTC, mornings",
};

const validIdentity = {
  kind: "identity-intake" as const,
  name: "A",
  email: "a@b.com",
  scope: "individual",
  linkedinUrl: "https://linkedin.com/in/a",
  resumeUrl: "https://example.com/resume",
  socialLinks: "",
  headline: "Operator",
  notes: "",
};

describe("Paid Case intake seam", () => {
  it("keeps kind-specific validation behind the adapter definitions", () => {
    expect(checkPaidIntakeContact(validAudit, AUDIT_PAID_CASE.requiredFields)).toBeNull();
    expect(AUDIT_PAID_CASE.validate?.({ ...validAudit, aiMaturity: "bad" })).toBe(
      "Invalid AI maturity value.",
    );
    expect(checkPaidIntakeContact(validIdentity, IDENTITY_PAID_CASE.requiredFields)).toBeNull();
    expect(IDENTITY_PAID_CASE.validate?.({ ...validIdentity, resumeUrl: "resume.pdf" })).toBe(
      "Resume link must be a full URL.",
    );
  });

  it("declares the complete persistence and notification behavior", () => {
    const auditKeys = Object.keys(AUDIT_PAID_CASE);
    expect(auditKeys).toEqual(
      expect.arrayContaining([
        "buildCase",
        "persist",
        "confirmation",
        "ownerNotification",
        "storageWarning",
      ]),
    );
    const persist = vi.fn(async () => {});
    expect(
      AUDIT_PAID_CASE.persist({ saveAuditCase: persist } as never, {} as never),
    ).toBeInstanceOf(Promise);
  });
});
