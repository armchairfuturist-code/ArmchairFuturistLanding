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
      "Team spent 4-6 hours per day answering repetitive client queries across email and WhatsApp. Response times stretched 8+ hours. Clients complained about slow turnaround. The team was drowning in busywork, watching their real priorities slip.",
    solution:
      "Built an n8n workflow that routes incoming queries, drafts context-aware responses using AI, and sends them through approved channels. Human reviews only edge cases.",
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
      "Potential clients bounced during service booking. The payment backend required multiple steps, no live chat support, and complex queries went unanswered. High abandonment at checkout. Potential revenue walked away while the checkout flow stood in the way.",
    solution:
      "Redesigned the purchase UX to 2 steps. Added a custom chatbot that handles pricing questions, service comparisons, and booking. Integrated payment backend with one-click checkout.",
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
      "Distributed team held many recurring meetings weekly. Action items got lost in notes. Follow-up ate into everyone's week. Critical decisions slipped through gaps between tools. The team was putting in hours but seeing nothing stick.",
    solution:
      "Built a pipeline that transcribes meetings, extracts action items, assigns owners, creates calendar reminders, and sends weekly digests. Connected Slack, Calendar, and project management tools.",
    patterns: [
      "Transcribed and tagged action items from every recurring meeting",
      "Wired owner-assignment, calendar reminders, and a weekly digest to Slack",
      "Ran a 30-minute team walkthrough plus a written handoff doc",
    ],
    timeline: "Built in 10 days",
    index: "03",
  },
];
