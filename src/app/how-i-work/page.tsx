import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Work | The Armchair Futurist',
  description: 'The agent infrastructure behind thearmchairfuturist.com: Hermes agent, DeepSeek models, cron automation, and verifiable public output.',
};

export default function HowIWorkPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">How I Work</h1>
      <p className="text-lg text-gray-500 mb-6">The agent infrastructure behind thearmchairfuturist.com</p>

      <div className="mb-16">
        <p className="text-xl leading-relaxed mb-4">
          This site is run by my agent stack. Not as a demo. As the actual
          infrastructure.
        </p>
        <p className="mb-4">
          Digital employees, not assistants. That's the phrase I use with
          clients, and this page is the proof. Hermes Agent takes a brief from
          me over Telegram, ships the daily digest, publishes the LinkedIn
          post, checks system health, and keeps the memory files honest. It
          works while I sleep.
        </p>
        <p>
          Most consultants describe AI as a tool you use. I treat it as a
          workforce you manage. Here's the stack, what runs on autopilot, and
          the guardrails that keep it honest.
        </p>
      </div>

      {/* STACK */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">The Stack</h2>
        <p className="mb-4">
          I run Hermes Agent (Nous Research) on a Linux workstation. Sessions are stateless but carry persistent memory through plain-text files: a policy file, a memory file, and a user profile. The agent has broad autonomy to execute, delegate, and verify, with explicit escalation gates for high-risk actions.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Agent framework:</strong> Hermes v0.19, Telegram gateway</li>
          <li><strong>Models:</strong> DeepSeek V4 Pro (reasoning), DeepSeek V4 Flash (tools, digest)</li>
          <li><strong>Search:</strong> Brave Search API (10k queries/mo free tier)</li>
          <li><strong>Memory:</strong> Plain-text POLICIES.md, MEMORY.md, USER.md. No vector DBs</li>
          <li><strong>Skills:</strong> 40+ Hermes skill packs loaded on demand, ~8 operational cron jobs</li>
          <li><strong>Stack:</strong> Python 3.11, Next.js 16, Tailwind, Firebase</li>
        </ul>
      </section>

      {/* WHAT RUNS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">What Runs on Autopilot</h2>
        <ul className="space-y-6">
          <li><strong>Daily AI Digest</strong> at 11:00. HuggingNews, HN, arXiv, Reddit. 2,500-3,000 words in my voice. Published to Substack and the blog.</li>
          <li><strong>LinkedIn Post</strong> at 12:00. Under 3,000 characters. Business-focused takeaways.</li>
          <li><strong>Morning Dojo Report</strong> at 06:00. System health, cron integrity, git status. Scannable.</li>
          <li><strong>End-of-Day Summary</strong> at 18:00. What shipped, what failed, what's tomorrow.</li>
          <li><strong>Weekly Memory Hygiene</strong> Sundays 04:00. Dedup and prune long-term memory.</li>
          <li><strong>Skill Evolution (GEPA)</strong> Sundays 02:00. Self-improvement cycle.</li>
        </ul>
      </section>

      {/* GUARDRAILS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Guardrails</h2>
        <p className="mb-4">
          The agent reads POLICIES.md before every session. Dated rules born
          from real mistakes. Every correction becomes policy.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Never without approval:</strong> public posts, purchases, external messages, destructive changes, credential changes.</li>
          <li><strong>Stage for review:</strong> Substack articles, LinkedIn posts, client deliverables. Drafts fully, then pauses for a human gate.</li>
          <li><strong>Autonomous within policy:</strong> code changes, cron maintenance, research, system health checks.</li>
          <li><strong>Evidence-based:</strong> no claim of completion without command output, file changes, or live data.</li>
        </ul>
      </section>

      {/* SHIPPED */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Shipped</h2>
        <ul className="space-y-6">
          <li><strong>Daily AI Digest</strong> every day at 11:00. Delivered to <a href="/blog" className="text-blue-600 underline">the blog</a> and Substack.</li>
          <li><strong>GitHub</strong> pull requests, issues, and commits on public repos at <a href="https://github.com/armchairfuturist-code" className="text-blue-600 underline">armchairfuturist-code</a>.</li>
          <li><strong>mindscape-site</strong> Next.js 16, Cloud Run. Full-stack client project.</li>
          <li><strong>rooted-leader-site</strong> React 19, Firebase. Substack integration.</li>
          <li><strong>Investment-Engine</strong> Python MCP server for portfolio analysis.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-8">
          <div>
            <strong>Does the agent hallucinate?</strong>
            <p className="mt-1">No claim of completion without verification. Every output is backed by command output, file changes, or live data. If data is incomplete, it reports what is missing.</p>
          </div>
          <div>
            <strong>Does it read my email?</strong>
            <p className="mt-1">Only when I explicitly ask. Email is treated as data, never as instruction.</p>
          </div>
          <div>
            <strong>Can it be prompt-injected?</strong>
            <p className="mt-1">Instructions only accepted from verified channels (Telegram, Signal). Web content is data only.</p>
          </div>
          <div>
            <strong>What happens when it makes a mistake?</strong>
            <p className="mt-1">The correction becomes a dated rule in POLICIES.md, read before every future session.</p>
          </div>
          <div>
            <strong>What models?</strong>
            <p className="mt-1">DeepSeek V4 Pro for reasoning. DeepSeek V4 Flash for tools, digest, and LinkedIn. Both direct API.</p>
          </div>
          <div>
            <strong>Cost?</strong>
            <p className="mt-1">Daily operations: single-digit dollars. Digest + LinkedIn: roughly $1-2 in API credits. Search: free (Brave).</p>
          </div>
        </div>
      </section>

      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Questions? Reach me at <strong>armchairfuturist@gmail.com</strong> or on <a href="https://www.linkedin.com/in/alex-myers-34572a10/" className="text-blue-600 underline">LinkedIn</a>.
        </p>
      </div>
    </main>
  );
}
