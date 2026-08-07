"use client";

import { useCallback, useState, type FormEvent } from "react";

export type LeadCaptureStatus = "idle" | "loading" | "success" | "error";

export interface UseLeadCaptureOptions<T extends Record<string, string>> {
  endpoint: string;
  initialValues: T;
  /** Return field errors; empty/undefined = valid */
  validate?: (values: T) => Partial<Record<keyof T, string>> | null;
  /**
   * Build fetch body. Default: JSON.stringify(values).
   * Return FormData or a plain object (auto-JSON).
   */
  buildBody?: (values: T) => BodyInit | Record<string, unknown>;
  headers?: HeadersInit;
  onSuccess?: (data: unknown) => void;
  onError?: (message: string) => void;
  /** Map server JSON to a user-facing error string */
  parseError?: (data: unknown, status: number) => string;
}

export interface UseLeadCaptureReturn<T extends Record<string, string>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  status: LeadCaptureStatus;
  serverError: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  setValues: (next: T | ((prev: T) => T)) => void;
  reset: () => void;
  submit: (e?: FormEvent) => Promise<void>;
  handleSubmit: (e: FormEvent) => void;
}

const defaultParseError = (data: unknown, status: number): string => {
  if (data && typeof data === "object" && "error" in data) {
    const err = (data as { error: unknown }).error;
    if (typeof err === "string") return err;
  }
  if (status === 429) return "Too many requests. Please try again later.";
  return "Something went wrong. Please try again.";
};

/**
 * Client Lead Capture adapter — one seam over form state + POST.
 * Connect, EmailCapture, and future forms bind layout only.
 * Server Lead Intake (submission-pipeline) stays behind the API route.
 */
export function useLeadCapture<T extends Record<string, string>>(
  options: UseLeadCaptureOptions<T>,
): UseLeadCaptureReturn<T> {
  const {
    endpoint,
    initialValues,
    validate,
    buildBody,
    headers,
    onSuccess,
    onError,
    parseError = defaultParseError,
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [status, setStatus] = useState<LeadCaptureStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setServerError(null);
  }, [initialValues]);

  const submit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      setServerError(null);

      if (validate) {
        const fieldErrors = validate(values);
        if (fieldErrors && Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
          setStatus("error");
          return;
        }
      }
      setErrors({});
      setStatus("loading");

      try {
        const rawBody = buildBody ? buildBody(values) : values;
        let body: BodyInit;
        let nextHeaders: HeadersInit | undefined = headers;

        if (rawBody instanceof FormData) {
          body = rawBody;
        } else if (typeof rawBody === "string") {
          body = rawBody;
        } else {
          body = JSON.stringify(rawBody);
          nextHeaders = {
            "Content-Type": "application/json",
            ...headers,
          };
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: nextHeaders,
          body,
        });

        let data: unknown = null;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          const message = parseError(data, response.status);
          setServerError(message);
          setStatus("error");
          onError?.(message);
          return;
        }

        setStatus("success");
        onSuccess?.(data);
      } catch {
        const message = "Network error. Please check your connection.";
        setServerError(message);
        setStatus("error");
        onError?.(message);
      }
    },
    [
      buildBody,
      endpoint,
      headers,
      onError,
      onSuccess,
      parseError,
      validate,
      values,
    ],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      void submit(e);
    },
    [submit],
  );

  return {
    values,
    errors,
    status,
    serverError,
    isLoading: status === "loading",
    isSuccess: status === "success",
    setField,
    setValues,
    reset,
    submit,
    handleSubmit,
  };
}
