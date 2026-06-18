import { useState, useCallback } from 'react';
import { isValidEmail } from '@/lib/email-utils';

interface UseFormSubmissionOptions {
  endpoint: string;
  validateEmail?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

interface UseFormSubmissionReturn {
  loading: boolean;
  success: boolean;
  error: string;
  submit: (body: Record<string, unknown>) => Promise<void>;
  reset: () => void;
  setError: (msg: string) => void;
}

export function useFormSubmission({
  endpoint,
  validateEmail = true,
  onSuccess,
  onError,
}: UseFormSubmissionOptions): UseFormSubmissionReturn {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const submit = useCallback(
    async (body: Record<string, unknown>) => {
      if (validateEmail && body.email && !isValidEmail(body.email as string)) {
        setError('Please enter a valid email address.');
        return;
      }

      setError('');
      setLoading(true);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to submit');
        }

        const data = await res.json().catch(() => ({}));
        setSuccess(true);
        onSuccess?.(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        setError(message);
        onError?.(err instanceof Error ? err : new Error(message));
      } finally {
        setLoading(false);
      }
    },
    [endpoint, validateEmail, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setSuccess(false);
    setError('');
  }, []);

  return { loading, success, error, submit, reset, setError };
}
