import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResultPage from "@/components/assessment/ResultPage";
import { archetypes } from "@/lib/assessment/archetypes";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
  trackConversion: vi.fn(),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const scores = {
  clarity: 50,
  readiness: 50,
  urgency: 50,
  individualSignals: 0,
  archetypeSlug: "test",
};

describe("ResultPage booking fallback", () => {
  it("shows a booking link for archetypes whose CTAs are not the calendar", () => {
    const curious = archetypes.find(
      (a) => a.name === "The Curious Professional",
    );
    expect(curious).toBeDefined();
    render(<ResultPage archetype={curious!} scores={scores} />);
    const link = screen.getByRole("link", {
      name: /Prefer to talk it through/i,
    });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("calendar.app.google"),
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not duplicate the booking link when the primary CTA already books a call", () => {
    const stalled = archetypes.find((a) => a.name === "The Stalled Executive");
    expect(stalled).toBeDefined();
    render(<ResultPage archetype={stalled!} scores={scores} />);
    expect(
      screen.queryByRole("link", { name: /Prefer to talk it through/i }),
    ).toBeNull();
  });
});
