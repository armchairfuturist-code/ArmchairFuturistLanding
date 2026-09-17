import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProofSection from "../ProofSection";
import { TESTIMONIALS } from "@/content/testimonials";
import { CASE_STUDIES } from "@/content/case-studies";

 describe("ProofSection", () => {
  it("uses exact source excerpts for both featured clients", () => {
    const { container } = render(<ProofSection />);
    const featured = [...container.querySelectorAll("#testimonials > div > figure")];
    expect(featured).toHaveLength(2);
    for (const figure of featured) {
      const name = figure.querySelector("figcaption p")!.textContent;
      const source = TESTIMONIALS.find((client) => client.name === name)!;
      const excerpt = figure.querySelector("blockquote p")!.textContent!.slice(1, -1);
      expect(source.text).toContain(excerpt);
    }
  });

  it("preserves every full review and photo behind a native disclosure", () => {
    const { container } = render(<ProofSection />);
    const reviews = container.querySelector("#testimonials details")!;
    expect(reviews.hasAttribute("open")).toBe(false);
    expect(reviews.querySelectorAll("figure")).toHaveLength(TESTIMONIALS.length);
    for (const client of TESTIMONIALS) {
      expect(reviews.textContent).toContain(client.text);
      expect(reviews.querySelector(`img[alt="Profile picture of ${client.name}"]`)).not.toBeNull();
    }
  });

  it("keeps legacy anchors and separates composite examples from named clients", () => {
    const { container } = render(<ProofSection />);
    expect(container.querySelector("#testimonials")).not.toBeNull();
    expect(container.querySelector("#stats")).not.toBeNull();
    expect(screen.getByText(/They do not describe the named clients above/)).toBeInTheDocument();
    CASE_STUDIES.forEach((study) => expect(screen.getByText(study.title)).toBeInTheDocument());
    expect(container.querySelector('a[href="/assessment"]')).toBeNull();
  });
});
