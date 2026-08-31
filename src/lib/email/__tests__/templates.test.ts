import { describe, expect, it } from "vitest";
import {
  buildAuditOfferEmail,
  buildProgramInvitationEmail,
} from "../templates";

describe("assessment nurture ladder templates (Plan 008)", () => {
  it("audit offer email names the archetype, price, and intake URL", () => {
    const html = buildAuditOfferEmail({ archetypeName: "The Ready Builder" });
    expect(html).toContain("The Ready Builder");
    expect(html).toContain("$297");
    expect(html).toContain("normally $497");
    expect(html).toContain("/audit");
    expect(html).not.toContain("undefined");
  });

  it("program invitation email keeps the two-path framing and calendar link", () => {
    const html = buildProgramInvitationEmail({ archetypeName: "The Ready Builder" });
    expect(html).toContain("Self-Sufficiency Program");
    expect(html).toContain("calendar.app.google");
    expect(html).toContain("The blueprint is yours");
  });
});
