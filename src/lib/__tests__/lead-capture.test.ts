import { describe, expect, it, vi } from "vitest";
import {
  defaultLeadCaptureError,
  encodeLeadCaptureBody,
  submitLeadCapture,
  validateEmailField,
} from "../lead-capture";

describe("Lead Capture seam", () => {
  it("encodes object bodies as JSON without changing FormData or strings", () => {
    const object = encodeLeadCaptureBody({ email: "a@b.com" });
    expect(object.body).toBe('{"email":"a@b.com"}');
    expect(object.headers).toEqual({ "Content-Type": "application/json" });

    const form = new FormData();
    expect(encodeLeadCaptureBody(form).body).toBe(form);
    expect(encodeLeadCaptureBody("raw").body).toBe("raw");
  });

  it("shares the email rule across form adapters", () => {
    expect(validateEmailField("")).toBe("Email is required");
    expect(validateEmailField("nope")).toContain("valid email");
    expect(validateEmailField("person@example.com")).toBeUndefined();
  });

  it("owns POST, response parsing, and status projection", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(JSON.stringify({ success: true, caseId: "audit_1" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const result = await submitLeadCapture({
      endpoint: "/api/audit/submit",
      values: { email: "person@example.com" },
      fetchImpl,
    });
    expect(fetchImpl).toHaveBeenCalledWith(
      "/api/audit/submit",
      expect.objectContaining({ method: "POST" }),
    );
    expect(result).toEqual({ ok: true, status: 201, data: { success: true, caseId: "audit_1" } });
  });

  it("keeps the user-facing error policy in one place", () => {
    expect(defaultLeadCaptureError({ error: "Already submitted" }, 400)).toBe("Already submitted");
    expect(defaultLeadCaptureError(null, 429)).toContain("Too many requests");
    expect(defaultLeadCaptureError(null, 500)).toContain("Something went wrong");
  });
});
