/**
 * The hero organism's runtime states — the one place on this site with real
 * motion state, made explicit.
 *
 * The runtime used to be two booleans (showFallback, fallbackIsPermanent)
 * plus a canvas dataset tag written by hand in each handler. That let one
 * transition fall through: on `webglcontextlost` the dataset flipped to
 * "fallback" but the static SVG never mounted (it mounts only when
 * "permanent"), so a GPU hiccup blanked the hero until the context came
 * back — against the spec's "context loss falls back to a static SVG".
 *
 * This is that transition table, typed, with one source of truth:
 *
 *   booting  ──INIT_SUCCESS──────▶ webgl
 *   booting  ──INIT_FAILED───────▶ fallback (no-webgl2 | init-failed)
 *   booting  ──REDUCED───────────▶ reduced
 *   webgl    ──CONTEXT_LOST──────▶ fallback (context-lost)
 *   webgl    ──REDUCED───────────▶ reduced
 *   reduced  ──UNREDUCED─────────▶ webgl   (engine rebuilt/sprung if gone)
 *   fallback ─CONTEXT_RESTORED──▶ booting (fresh engine against the
 *                                          restored context)
 *   fallback ─REDUCED────────────▶ reduced
 *
 * "reduced" and "fallback" are the two states where the static SVG is the
 * artwork. No other state may mount it — the old loading-placeholder phase
 * is gone on purpose.
 */

export type FallbackReason = "no-webgl2" | "init-failed" | "context-lost";

export type OrganismPhase =
  | { kind: "booting" }
  | { kind: "webgl" }
  | { kind: "reduced" }
  | { kind: "fallback"; reason: FallbackReason };

export type OrganismEvent =
  | { type: "INIT_SUCCESS" }
  | { type: "INIT_FAILED"; reason: "no-webgl2" | "init-failed" }
  | { type: "REDUCED" }
  | { type: "UNREDUCED" }
  | { type: "CONTEXT_LOST" }
  | { type: "CONTEXT_RESTORED" };

export function transitionPhase(
  phase: OrganismPhase,
  event: OrganismEvent,
): OrganismPhase {
  switch (phase.kind) {
    case "booting":
      switch (event.type) {
        case "INIT_SUCCESS":
          return { kind: "webgl" };
        case "INIT_FAILED":
          return { kind: "fallback", reason: event.reason };
        case "REDUCED":
          return { kind: "reduced" };
        default:
          return phase;
      }
    case "webgl":
      switch (event.type) {
        case "CONTEXT_LOST":
          return { kind: "fallback", reason: "context-lost" };
        case "REDUCED":
          return { kind: "reduced" };
        default:
          return phase;
      }
    case "reduced":
      return event.type === "UNREDUCED" ? { kind: "webgl" } : phase;
    case "fallback":
      switch (event.type) {
        case "CONTEXT_RESTORED":
          return { kind: "booting" };
        case "REDUCED":
          return { kind: "reduced" };
        default:
          return phase;
      }
  }
}

/** True exactly when the static SVG, not the canvas, is the hero artwork. */
export function staticSvgIsArtwork(phase: OrganismPhase): boolean {
  return phase.kind === "reduced" || phase.kind === "fallback";
}

/** The diagnostic tag mirrored onto canvas.dataset.organism. */
export function datasetTagFor(
  phase: OrganismPhase,
): "webgl" | "fallback" | undefined {
  if (phase.kind === "webgl") return "webgl";
  if (phase.kind === "fallback") return "fallback";
  return undefined;
}
