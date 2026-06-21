import { Resend } from 'resend';

export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface EmailSendResult {
  id: string;
}

export interface EmailSender {
  send(msg: EmailMessage): Promise<EmailSendResult>;
}

export function createResendEmailSender(resend: Resend): EmailSender {
  return {
    async send(msg) {
      const result = await resend.emails.send(msg);
      if (result.error) throw new Error(result.error.message);
      return { id: result.data?.id ?? '' };
    },
  };
}
