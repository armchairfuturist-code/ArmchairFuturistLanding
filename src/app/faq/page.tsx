import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | The Armchair Futurist',
  description: 'Common questions about my AI agent infrastructure, consulting work, and how I use AI to ship faster.',
};

const faqs = [
  {
    q: 'Does your AI agent hallucinate?',
    a: 'My agent has a truthfulness policy built in: it cannot claim a task is complete without showing command output, file changes, or live data. If data is incomplete, it reports what is missing and where it looked. No "it should work" claims. No fabricated output. Evidence-based reporting is the binding contract.',
  },
  {
    q: 'Does your agent read my email or messages?',
    a: 'Never by default. I explicitly ask it to check specific emails or threads. It never acts on email content on its own. Email and web pages are treated as data only, not instructions. The only channels it accepts instructions from are my verified Telegram and Signal accounts.',
  },
  {
    q: 'Can your agent be prompt-injected or jailbroken?',
    a: 'Multiple defense layers. Web content, tweets, uploaded files, and transcripts are treated as untrusted data. Instructions are only accepted from verified channels. The agent cannot edit its own core configuration (SOUL.md) without my explicit approval. Security policies are dated and versioned.',
  },
  {
    q: 'What happens when the agent makes a mistake?',
    a: 'Every mistake becomes a dated rule in POLICIES.md, which the agent reads before every session. If a cron job silently reset itself because I updated the prompt wrong, that becomes a policy. If I tell the agent "never do X without asking," that becomes a policy. Corrections compound into reliability. Nothing gets forgotten because nothing lives in a black box.',
  },
  {
    q: 'Why not just use ChatGPT or Claude directly?',
    a: 'Single-session chatbots do not retain context across conversations, cannot run cron jobs, cannot delegate to sub-agents, and cannot maintain long-term memory in plain-text files I control. My agent infrastructure gives me persistent automation that gets better over time. The digest that fires at 11:00 every day has been running for months. It does not forget the rules between sessions.',
  },
  {
    q: 'What models do you use?',
    a: 'DeepSeek V4 Pro for reasoning-heavy tasks. DeepSeek V4 Flash for tools, digest generation, and LinkedIn posts. Both accessed through DeepSeek\'s direct API. No vector databases, no embedding pipelines, no fine-tuning. Just plain-text policies, memory, and skills that the agent reads at session start.',
  },
  {
    q: 'Is this expensive to run?',
    a: 'Daily operational costs are in the single-digit dollars. The digest (2,500 words) and LinkedIn post together cost roughly $1-2 in API credits. Search is free through Brave\'s 10k query/month tier. The expensive part is the initial setup and ongoing tuning — but that is where the competitive advantage lives.',
  },
  {
    q: 'How do I hire you to set this up for my company?',
    a: 'I work with founders, small teams, and professionals who want practical AI automation. I do not sell the agent. I teach you how to build and run your own. Reach me at alex@thearmchairfuturist.com or find me on LinkedIn.',
  },
  {
    q: 'Do you take investment money for the agent itself?',
    a: 'No. This is my personal infrastructure. I consult and build for clients. The agent is the tool, not the product.',
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">FAQ</h1>
      <p className="text-lg text-gray-500 mb-12">Common questions about my agent infrastructure</p>

      <div className="space-y-10">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h2 className="text-xl font-semibold mb-2">{faq.q}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Something else? Email me at <strong>alex@thearmchairfuturist.com</strong>.
        </p>
      </div>
    </main>
  );
}
