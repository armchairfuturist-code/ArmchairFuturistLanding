import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProblemCards from "../ProblemCards";
import { TESTIMONIALS } from "@/content/testimonials";

/**
 * The section pulls its quotes from TESTIMONIALS by name, so a client who
 * rewrites their review can leave this file holding a sentence they no longer
 * said. These tests fail on that drift rather than on the rendered copy.
 */
describe("ProblemCards", () => {
  it("quotes each featured client verbatim", () => {
    const { container } = render(<ProblemCards />);
    const quotes = [...container.querySelectorAll("blockquote")];
    expect(quotes).toHaveLength(3);

    for (const quote of quotes) {
      const name = quote.querySelector("p + div p")?.textContent;
      const source = TESTIMONIALS.find((client) => client.name === name);
      expect(source, `no testimonial named ${name}`).toBeDefined();
      const excerpt = quote.querySelector("p")!.textContent!;
      // Trailing sentence punctuation is presentation; words are what must match.
      const words = (part: string) => part.replace(/[.,;:!?]+$/, "").trim();
      let cursor = 0;
      for (const fragment of excerpt.split("…").map(words)) {
        const at = source!.text.indexOf(fragment, cursor);
        expect(at, `not found in ${name}'s review: ${fragment}`).toBeGreaterThanOrEqual(0);
        cursor = at + fragment.length;
      }
    }
  });

  it("names all three problems and how each one is fixed", () => {
    render(<ProblemCards />);
    expect(
      screen.getByRole("heading", { name: /does this happen to you\?/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/nothing about your business/i)).toBeInTheDocument();
    expect(screen.getByText(/workflow last month/i)).toBeInTheDocument();
    expect(screen.getByText(/five different AI tabs/i)).toBeInTheDocument();
  });

  it("offers the WhatsApp path from each card", () => {
    render(<ProblemCards />);
    const links = screen.getAllByRole("link", { name: /ask me about this/i });
    expect(links).toHaveLength(3);
    for (const link of links) expect(link).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });
});
