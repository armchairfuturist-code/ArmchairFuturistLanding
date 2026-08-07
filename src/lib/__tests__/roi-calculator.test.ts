import { describe, it, expect } from "vitest";
import {
  calculateROI,
  clampTeamSize,
  toggleSelection,
  COMMON_AUTOMATIONS,
} from "@/lib/roi-calculator";

describe("ROI Calculator", () => {
  it("returns empty projection with no selections", () => {
    const result = calculateROI({ selectedIds: [], teamSize: 1 });
    expect(result.hasResults).toBe(false);
    expect(result.hoursPerWeek).toBe(0);
    expect(result.selectedCount).toBe(0);
  });

  it("sums hours for selected tasks", () => {
    const a = COMMON_AUTOMATIONS[0];
    const b = COMMON_AUTOMATIONS[1];
    const result = calculateROI({
      selectedIds: [a.id, b.id],
      teamSize: 1,
    });
    expect(result.hoursPerWeek).toBe(a.hoursPerWeek + b.hoursPerWeek);
    expect(result.hoursPerMonth).toBe(result.hoursPerWeek * 4);
    expect(result.hoursPerYear).toBe(result.hoursPerWeek * 52);
    expect(result.hasResults).toBe(true);
  });

  it("scales team hours by team size", () => {
    const a = COMMON_AUTOMATIONS[0];
    const result = calculateROI({ selectedIds: [a.id], teamSize: 3 });
    expect(result.teamHoursPerYear).toBe(a.hoursPerWeek * 52 * 3);
  });

  it("clamps invalid team size to minimum", () => {
    const a = COMMON_AUTOMATIONS[0];
    const result = calculateROI({ selectedIds: [a.id], teamSize: 0 });
    expect(result.teamHoursPerYear).toBe(a.hoursPerWeek * 52 * 1);
  });

  it("toggleSelection adds and removes ids", () => {
    let set = toggleSelection([], "a");
    expect(set.has("a")).toBe(true);
    set = toggleSelection(set, "a");
    expect(set.has("a")).toBe(false);
  });

  it("clampTeamSize floors and enforces min", () => {
    expect(clampTeamSize(3.9)).toBe(3);
    expect(clampTeamSize(-2)).toBe(1);
    expect(clampTeamSize(Number.NaN)).toBe(1);
  });
});
