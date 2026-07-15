import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import Header from "@/components/layout/Header";

/**
 * Regression coverage for the responsive header.
 *
 * Root cause fixed: the desktop nav appeared at the `md` (768px) breakpoint
 * but its intrinsic width (~960px) did not fit until ~1000px, causing 60–192px
 * of horizontal page overflow on every tablet width. The fix raised the
 * breakpoint to `lg` (1024px) so the compact mobile header (hamburger) is used
 * for the entire tablet range and the desktop nav only renders where it fits.
 *
 * These tests lock in that behaviour structurally and behaviourally.
 *
 * NOTE: jsdom does not apply Tailwind CSS, so `hidden`/`lg:flex` do not
 * actually hide elements here. We assert the responsive *contract* (the
 * breakpoint classes) and scope mobile-menu queries to the open dialog so
 * desktop duplicates are ignored. The browser-based audit (audit.mjs)
 * verifies real rendered overflow across viewports.
 */
describe("Header responsive layout", () => {
  it("hides the desktop nav below lg and shows it at lg+", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    // `hidden lg:flex` => not displayed until the lg breakpoint (1024px)
    expect(nav.className).toContain("hidden");
    expect(nav.className).toContain("lg:flex");
    // Must NOT revert to the buggy `md` breakpoint
    expect(nav.className).not.toContain("md:flex");
  });

  it("renders a mobile menu trigger inside a lg:hidden compact CTA group", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: /toggle menu/i });
    expect(trigger).toBeInTheDocument();

    // Compact mobile CTAs (WhatsApp + Book + hamburger) are hidden at lg+
    const mobileGroup = trigger.closest("div");
    expect(mobileGroup?.className).toContain("lg:hidden");
  });

  it("opens the mobile navigation sheet with its primary actions", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(trigger);

    // Radix Dialog renders the mobile menu into a portal with role="dialog"
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // The mobile menu must expose the primary navigation actions
    // (scoped to the dialog so the desktop duplicates are ignored)
    expect(
      within(dialog).getByRole("link", { name: /free ai assessment/i }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole("link", { name: /book a call/i }),
    ).toBeInTheDocument();
  });
});
