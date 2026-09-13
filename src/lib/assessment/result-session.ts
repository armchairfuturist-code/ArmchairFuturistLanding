/**
 * Locality shim — canonical result-session seam lives in ./flow.
 * External importers keep working; new code imports from the flow root.
 */
export * from "./flow";
