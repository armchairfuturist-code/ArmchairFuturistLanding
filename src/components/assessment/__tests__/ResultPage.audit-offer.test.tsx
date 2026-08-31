import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
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

describe("ResultPage audit offer (Plan 008)", () => {
  it("renders the AI Roadmap Audit offer card with the intake link", () => {
    const curious = archetypes.find(
      (a) => a.name === "The Curious Professional",
    );
    render(<ResultPage archetype={curious!} scores={scores} />);
    expect(screen.getByText(/The AI Roadmap Audit/)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Get the Roadmap Audit/i });
    expect(link).toHaveAttribute("href", "/audit");
    expect(link).not.toHaveAttribute("target");
  });

  it("shows launch pricing as plain text with the anchor, no fake urgency", () => {
    const stalled = archetypes.find((a) => a.name === "The Stalled Executive");
    render(<ResultPage archetype={stalled!} scores={scores} />);
    expect(screen.getByText(/\$297/)).toBeInTheDocument();
    expect(screen.getByText(/normally \$497/i)).toBeInTheDocument();
    expect(screen.queryByText(/hours left/i)).toBeNull();
    expect(screen.queryByText(/ends (in|soon|today)/i)).toBeNull();
  });

  it("fires audit_offer_view on mount and audit_offer_click on click", async () => {
    const { trackEvent, trackConversion } = await import("@/lib/analytics");
    const curious = archetypes.find(
      (a) => a.name === "The Curious Professional",
    );
    render(<ResultPage archetype={curious!} scores={scores} />);
    expect(trackEvent).toHaveBeenCalledWith("audit_offer_view");
    const user = (await import("@testing-library/user-event")).default.setup();
    await user.click(screen.getByRole("link", { name: /Get the Roadmap Audit/i }));
    expect(trackConversion).toHaveBeenCalledWith("audit_offer_click");
  });
});
