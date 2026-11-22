import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The link preview is a committed PNG, not a generated route, so nothing in the
// build fails if it goes missing. These two checks are the whole safety net: the
// file is a real 1200x630 image, and every page points at it.
const repo = path.resolve(__dirname, "../../..");
const png = path.join(repo, "public", "og-card.png");

function pngSize(file: string): { width: number; height: number } {
  const bytes = readFileSync(file);
  // PNG signature, then IHDR: width and height are big-endian u32 at 16 and 20.
  expect(bytes.subarray(1, 4).toString("ascii")).toBe("PNG");
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

describe("Open Graph card", () => {
  it("exists as a 1200x630 PNG", () => {
    expect(existsSync(png)).toBe(true);
    expect(pngSize(png)).toEqual({ width: 1200, height: 630 });
  });

  it("is the image every page names", () => {
    const layout = readFileSync(path.join(repo, "src", "app", "layout.tsx"), "utf8");
    expect(layout).toContain('/og-card.png');
    expect(layout).toMatch(/width: 1200/);
  });
});
