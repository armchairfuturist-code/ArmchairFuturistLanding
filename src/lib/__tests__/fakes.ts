import type { EmailSender, EmailMessage, EmailSendResult } from '../email-sender';
import type { LeadStore, AssessmentLeadData, CaptureLeadData, AuditCaseData } from '../lead-store';

export class FakeEmailSender implements EmailSender {
  public sent: EmailMessage[] = [];
  private nextId = 1;

  async send(msg: EmailMessage): Promise<EmailSendResult> {
    this.sent.push(msg);
    return { id: `fake-${this.nextId++}` };
  }
}

export class FakeLeadStore implements LeadStore {
  public assessmentLeads: AssessmentLeadData[] = [];
  public captureLeads: CaptureLeadData[] = [];
  public auditCases: AuditCaseData[] = [];

  async saveAssessmentLead(data: AssessmentLeadData): Promise<void> {
    this.assessmentLeads.push(data);
  }

  async saveCaptureLead(data: CaptureLeadData): Promise<void> {
    this.captureLeads.push(data);
  }

  async saveAuditCase(data: AuditCaseData): Promise<void> {
    this.auditCases.push(data);
  }
}
