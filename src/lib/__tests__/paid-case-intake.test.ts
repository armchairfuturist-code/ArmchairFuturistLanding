import { describe, expect, it, vi } from "vitest";
import { AUDIT_PAID_CASE, IDENTITY_PAID_CASE, submitPaidCaseIntake } from "../paid-case-intake";
import { checkPaidIntakeContact } from "../paid-case";
import { FakeEmailSender, FakeLeadStore } from "./fakes";

/** Sender that always rejects, to model a Resend outage. */
class DeadSender {
  async send(): Promise<never> {
    throw new Error("Resend is down");
  }
}

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

  it("returns ok when mail fails but the case is stored", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const store = new FakeLeadStore();
      const result = await submitPaidCaseIntake(
        validAudit,
        AUDIT_PAID_CASE,
        { emailSender: new DeadSender() as never, leadStore: store },
      );
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.emailId).toBe("");
        expect(result.data.storageFailed).toBe(false);
      }
      expect(store.auditCases).toHaveLength(1);
    } finally {
      error.mockRestore();
    }
  });

  it("returns a 500 only when storage and mail both fail", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      const store = new FakeLeadStore();
      store.saveAuditCase = async () => {
        throw new Error("D1 down");
      };
      const result = await submitPaidCaseIntake(
        validAudit,
        AUDIT_PAID_CASE,
        { emailSender: new DeadSender() as never, leadStore: store },
      );
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(500);
    } finally {
      error.mockRestore();
      warn.mockRestore();
    }
  });
});
