/** Case Study content — presentation-free. */
export interface CaseStudy {
  title: string;
  client: string;
  problem: string;
  solution: string;
  patterns: string[];
  timeline: string;
  index: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Automated Client Response System",
    client: "Professional Services Firm",
    problem:
      "The team was spending four to six hours a day answering the same client questions across email and WhatsApp, which pushed response times past eight hours and brought complaints about slow turnaround. Nobody had time to look at why the queue kept filling up, so the work that mattered kept sliding to the next week.",
    solution:
      "We built an n8n workflow that routes each incoming query, drafts a context-aware response with AI, and sends it through the channels the team had already approved, so a person now only reads the edge cases that the routing rules cannot classify.",
    patterns: [
      "Mapped 14 repetitive query categories across email and WhatsApp",
      "Drafted 6 reusable response templates with human-review escalation rules",
      "Handed off a runbook plus a 2-person training session for the ops team",
    ],
    timeline: "Built in 5 days",
    index: "01",
  },
  {
    title: "Frictionless Service Purchase Flow",
    client: "Consulting & Advisory Practice",
    problem:
      "People who were ready to buy gave up during booking, because the payment backend demanded several steps, there was no live chat to answer a question, and anything complex went unanswered until the next day. Put simply, revenue walked away while the checkout stood in the way of it.",
    solution:
      "We redesigned the purchase flow down to two steps and added a custom chatbot to handle pricing questions, service comparisons, and booking, then connected the payment backend so a buyer can complete the whole thing in one click.",
    patterns: [
      "Redesigned checkout to a 2-step flow with one-click payment",
      "Built a pricing-comparison chatbot covering the top service questions",
      "Wrote a short sales-script guide for the team to handle chatbot handoffs",
    ],
    timeline: "Delivered in 2 weeks",
    index: "02",
  },
  {
    title: "Automated Meeting-to-Action Pipeline",
    client: "Remote Operations Team",
    problem:
      "The team met on a fixed weekly rhythm and wrote good notes, but the action items inside those notes never became anyone's job, so follow-up quietly ate a slice of every week while decisions fell through the gaps between the tools they already paid for. They were putting in the hours and still watching nothing stick.",
    solution:
      "We built a pipeline that transcribes each meeting, extracts the action items, assigns an owner, sets the calendar reminder, and sends a weekly digest, with Slack, Calendar, and the project tool all reading from the same record.",
    patterns: [
      "Transcribed and tagged action items from every recurring meeting",
      "Wired owner-assignment, calendar reminders, and a weekly digest to Slack",
      "Ran a 30-minute team walkthrough plus a written handoff doc",
    ],
    timeline: "Built in 10 days",
    index: "03",
  },
];
