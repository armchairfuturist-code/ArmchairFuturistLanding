/**
 * Shared motion easings — the single source of truth.
 *
 * The built-in CSS easings (`ease`, `ease-out`, `ease-in-out`) are symmetric
 * and soft, which makes UI motion feel unhurried and therefore disconnected
 * from the pointer. Everything here decelerates hard: near-instant response,
 * long settle. CSS consumers read the same values from `--ease-out` /
 * `--ease-in-out` in globals.css — keep the two in step.
 *
 * motion/react needs raw arrays because it interpolates numerically.
 */

/** Entering, leaving, press feedback, anything answering the pointer. */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** On-screen movement that starts and ends in place (drag, reorder, spine). */
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

/** Duration for an element that answers a click. Never longer. */
export const DURATION_PRESS = 0.15;

/** Duration for dropdowns, popovers, tooltips, small reveals. */
export const DURATION_SMALL = 0.2;

/** Duration for modals, drawers, cards entering a viewport. */
export const DURATION_MEDIUM = 0.35;
