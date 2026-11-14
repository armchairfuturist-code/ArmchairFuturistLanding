import { describe, expect, it } from "vitest";
import {
  datasetTagFor,
  staticSvgIsArtwork,
  transitionPhase,
} from "../runtime-state";
import type { OrganismEvent, OrganismPhase } from "../runtime-state";

const step = (from: OrganismPhase, event: OrganismEvent) =>
  transitionPhase(from, event);

describe("organism runtime state machine", () => {
  it("boots into webgl when the engine starts", () => {
    expect(step({ kind: "booting" }, { type: "INIT_SUCCESS" })).toEqual({
      kind: "webgl",
    });
  });

  it("lands on the static SVG with a reason when the engine cannot start", () => {
    expect(
      step({ kind: "booting" }, { type: "INIT_FAILED", reason: "no-webgl2" }),
    ).toEqual({ kind: "fallback", reason: "no-webgl2" });
  });

  // Regression: the context-loss path used to flip the dataset tag to
  // "fallback" without ever mounting the static SVG — a blank hero until the
  // context restored, against the spec ("context loss falls back to a static
  // SVG scribble"). In the machine this is a state transition, so the SVG
  // mounts by construction.
  it("drops to the static SVG on WebGL context loss", () => {
    expect(step({ kind: "webgl" }, { type: "CONTEXT_LOST" })).toEqual({
      kind: "fallback",
      reason: "context-lost",
    });
    expect(
      staticSvgIsArtwork({ kind: "fallback", reason: "context-lost" }),
    ).toBe(true);
  });

  it("rebuilds from the static SVG when the context returns", () => {
    const after = step(
      step({ kind: "webgl" }, { type: "CONTEXT_LOST" }),
      { type: "CONTEXT_RESTORED" },
    );
    expect(after).toEqual({ kind: "booting" });
    expect(step(after, { type: "INIT_SUCCESS" })).toEqual({ kind: "webgl" });
  });

  it("locks to reduced motion and only leaves it when the visitor unmutes", () => {
    const reduced = step({ kind: "booting" }, { type: "REDUCED" });
    expect(reduced).toEqual({ kind: "reduced" });
    expect(step(reduced, { type: "CONTEXT_LOST" })).toEqual(reduced);
    expect(step(reduced, { type: "UNREDUCED" })).toEqual({ kind: "webgl" });
  });

  it("treats exactly reduced and fallback as 'SVG is the artwork'", () => {
    expect(staticSvgIsArtwork({ kind: "booting" })).toBe(false);
    expect(staticSvgIsArtwork({ kind: "webgl" })).toBe(false);
    expect(staticSvgIsArtwork({ kind: "reduced" })).toBe(true);
    expect(
      staticSvgIsArtwork({ kind: "fallback", reason: "init-failed" }),
    ).toBe(true);
  });

  it("mirrors the phase onto the canvas dataset tag", () => {
    expect(datasetTagFor({ kind: "webgl" })).toBe("webgl");
    expect(
      datasetTagFor({ kind: "fallback", reason: "context-lost" }),
    ).toBe("fallback");
    expect(datasetTagFor({ kind: "booting" })).toBeUndefined();
  });
});
