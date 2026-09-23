import { describe, it, expect } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { OrganismCanvas, isSoftwareRenderer } from "../OrganismCanvas";

/**
 * The hero organism must degrade to its static scribble, loudly and
 * diagnosably, on any engine that can't give it a WebGL2 context — Firefox on
 * a machine without GPU acceleration, privacy-hardened Firefox, old mobile
 * browsers. jsdom has no WebGL2, which makes the failure path the default path
 * here: exactly the case that used to differ between Chrome and Firefox.
 */
describe("OrganismCanvas fallback", () => {
  it("flags the canvas as fallback with a machine-readable reason when WebGL2 is unavailable", async () => {
    const { container } = render(<OrganismCanvas />);
    const canvas = container.querySelector("canvas")!;
    await waitFor(() => {
      expect(canvas.dataset.organism).toBe("fallback");
    });
    expect(canvas.dataset.organismReason).toBe("no-webgl2");
  });

  it("keeps the static fallback SVG mounted alongside the canvas", () => {
    const { container } = render(<OrganismCanvas />);
    expect(container.querySelector("canvas")).not.toBeNull();
    expect(container.querySelector("svg.organism-fallback")).not.toBeNull();
  });

  it("treats software rasterizers as the reason Chrome passes and Firefox does not", () => {
    // Firefox on Linux without GPU acceleration.
    expect(isSoftwareRenderer("Mesa/X.org, AMD OpenGL, llvmpipe (LLVM 15.0.7, 256 bits)")).toBe(true);
    expect(isSoftwareRenderer("Google SwiftShader")).toBe(true);
    expect(isSoftwareRenderer("ANGLE (NVIDIA GeForce RTX 3080 Direct3D11)")).toBe(false);
    expect(isSoftwareRenderer("Apple M2 Pro")).toBe(false);
  });
});
