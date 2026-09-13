/**
 * Locality shim — canonical answer-resolution seam lives in ./flow.
 * External importers keep working; new code imports from the flow root.
 */
export * from "./flow";
