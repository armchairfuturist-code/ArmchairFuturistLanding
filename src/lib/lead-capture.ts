import { isValidEmail } from "@/lib/email-utils";

export interface LeadCaptureRequest {
  endpoint: string;
  values: BodyInit | Record<string, unknown>;
  headers?: HeadersInit;
  fetchImpl?: typeof fetch;
}

export interface LeadCaptureResponse {
  data: unknown;
  status: number;
  ok: boolean;
}

export function encodeLeadCaptureBody(
  values: BodyInit | Record<string, unknown>,
  headers?: HeadersInit,
): { body: BodyInit; headers?: HeadersInit } {
  if (values instanceof FormData || typeof values === "string") {
    return { body: values, headers };
  }
  return {
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json", ...headers },
  };
}

export async function readLeadCaptureResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function defaultLeadCaptureError(data: unknown, status: number): string {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error: unknown }).error;
    if (typeof error === "string") return error;
  }
  if (status === 429) return "Too many requests. Please try again later.";
  return "Something went wrong. Please try again.";
}

/** One transport seam shared by every Lead Capture form. */
export async function submitLeadCapture({
  endpoint,
  values,
  headers,
  fetchImpl = fetch,
}: LeadCaptureRequest): Promise<LeadCaptureResponse> {
  const encoded = encodeLeadCaptureBody(values, headers);
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: encoded.headers,
    body: encoded.body,
  });
  return {
    data: await readLeadCaptureResponse(response),
    status: response.status,
    ok: response.ok,
  };
}

/** Shared field-level rule; forms only supply their wording. */
export function validateEmailField(
  value: string,
  requiredMessage = "Email is required",
  invalidMessage = "Enter a valid email, like name@company.com",
): string | undefined {
  if (!value.trim()) return requiredMessage;
  if (!isValidEmail(value)) return invalidMessage;
  return undefined;
}

