import { describe, expect, it } from "vitest";
import {
  buildAuditConfirmationEmail,
  buildAuditLeadNotificationEmail,
} from "../templates";

describe("audit intake emails (Plan 009 Phase B)", () => {
  it("confirmation carries the guarantee, dual price, booking CTA, and their question", () => {
    const html = buildAuditConfirmationEmail({
      name: "Sam",
      archetypeName: "The Ready Builder",
      biggestQuestion: "Can agents do my research?",
      availability: "Mornings WET",
      aiMaturity: "automations",
    });
    expect(html).toContain("Sam");
    expect(html).toContain("Can agents do my research?");
    expect(html).toContain("$297 · €247");
    expect(html).toContain("normally $497 · €417");
    expect(html).toContain("at least three concrete, ranked actions");
    expect(html).toContain("Book the 15-minute fit call");
    expect(html).toContain("calendar.app.google");
    // No screener for automation+ maturity
    expect(html).not.toContain("1-on-1 guidance session may be the better first step");
  });

  it("adds the honest screener note for chat/unsure maturity", () => {
    const html = buildAuditConfirmationEmail({
      name: "Sam",
      biggestQuestion: "Is any of this real?",
      availability: "Afternoons",
      aiMaturity: "chat",
    });
    expect(html).toContain("guidance session may be the better first step");
  });

  it("lead notification formats the full intake for the sales-prep run", () => {
    const html = buildAuditLeadNotificationEmail({
      name: "Test Client",
      email: "client@example.com",
      archetypeName: "The Ready Builder",
      intake: { Role: "Consultant", "Biggest question": "Can agents help?" },
    });
    expect(html).toContain("New Audit Intake");
    expect(html).toContain("client@example.com");
    expect(html).toContain("sales-prep prompt");
    expect(html).toContain("Biggest question");
  });
});
