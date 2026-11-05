import { Resend } from 'resend';
import { ALEX_EMAIL } from './email/config';

export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
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
      // The from address is send-only, so replies must go to the inbox.
      const result = await resend.emails.send({ replyTo: ALEX_EMAIL, ...msg });
      if (result.error) throw new Error(result.error.message);
      return { id: result.data?.id ?? '' };
    },
  };
}
