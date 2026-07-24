import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How I Work | The Armchair Futurist',
  description: 'The agent infrastructure powering thearmchairfuturist.com: Hermes agent, DeepSeek models, cron automation, Brave search, and verifiable public output.',
};

export default function HowIWorkPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2">How I Work</h1>
      <p className="text-lg text-gray-500 mb-12">The agent infrastructure behind thearmchairfuturist.com</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Stack</h2>
        <p className="mb-4">
          I run <strong>Hermes Agent</strong> (Nous Research) on a Linux workstation with persistent state. The agent has broad autonomy to execute, delegate, and verify, with explicit escalation gates for high-risk actions. Sessions are stateless but carry perpetual memory through plain-text files: a policy file, a memory file, and a user profile.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Agent framework:</strong> Hermes v0.19, Telegram gateway</li>
          <li><strong>Models:</strong> DeepSeek V4 Pro (reasoning), DeepSeek V4 Flash (tools, digest)</li>
          <li><strong>Search:</strong> Brave Search API (10k queries/mo free tier)</li>
          <li><strong>Memory:</strong> Plain-text POLICIES.md, MEMORY.md, USER.md — no vector DBs, no black boxes</li>
          <li><strong>Skills:</strong> 40+ Hermes skill packs loaded on demand, ~8 operational cron jobs</li>
          <li><strong>Stack:</strong> Python 3.11, Next.js 16, Tailwind, Firebase</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What Runs on Autopilot</h2>
        <ul className="space-y-6">
          <li>
            <strong>Daily AI Digest</strong> — 11:00. Fetches HuggingNews, HN, arXiv, Reddit. 2,500-3,000 words in my voice. Published to Substack.
          </li>
          <li>
            <strong>LinkedIn Post</strong> — 12:00. Generated from the digest. Under 3,000 characters. Business-focused takeaways for founders and builders.
          </li>
          <li>
            <strong>Morning Dojo Report</strong> — 06:00. System health, cron integrity, project memory freshness, git remote status. Scannable in 20 seconds.
          </li>
          <li>
            <strong>End-of-Day Summary</strong> — 18:00. What shipped today: digest stats, GitHub activity, client meetings, flags.
          </li>
          <li>
            <strong>Weekly Memory Hygiene</strong> — Sundays 04:00. Deduplicates and prunes long-term memory.
          </li>
          <li>
            <strong>Skill Evolution (GEPA)</strong> — Sundays 02:00. Self-improvement cycle: audits skills, regresses performance, proposes upgrades.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Guardrails</h2>
        <p className="mb-4">
          The agent reads <a href="https://github.com/armchairfuturist-code/.hermes/blob/main/POLICIES.md" className="text-blue-600 underline">POLICIES.md</a> before every session. This file contains dated rules born from real mistakes — cron job update behavior, provider migration traps, feed reliability workarounds. Every time I correct the agent, the correction becomes policy.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Never without approval:</strong> public posts, purchases, external messages, destructive changes, credential changes.</li>
          <li><strong>Stage for review:</strong> Substack articles, LinkedIn posts, client deliverables — the agent drafts fully, then pauses for a human gate.</li>
          <li><strong>Autonomous within policy:</strong> code changes to my repos, cron maintenance, research, system health checks.</li>
          <li><strong>Evidence-based reporting:</strong> the agent cannot claim a task is done without showing command output, file changes, or timestamps.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Learns</h2>
        <p className="mb-2">No retraining. No fine-tuning. Three mechanisms:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>POLICIES.md</strong> — every correction becomes a dated rule the agent reads before acting.</li>
          <li><strong>Skills</strong> — reusable procedures saved from successful complex tasks. Errors get patched back into the skill.</li>
          <li><strong>GEPA cycles</strong> — weekly optimization runs that audit skill health and propose improvements.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Public Proof</h2>
        <p>
          My agent files issues and ships PRs on my GitHub repos under <a href="https://github.com/armchairfuturist-code" className="text-blue-600 underline">armchairfuturist-code</a>. The daily digest is published on <a href="https://thearmchairfuturist.com/blog" className="text-blue-600 underline">my blog</a>. See <a href="/shipped" className="text-blue-600 underline">/shipped</a> for verifiable output.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <strong>Does the agent hallucinate?</strong>
            <p>It has a truthfulness policy: no claim of completion without verification. Every output is backed by command output, file changes, or live data. If data is incomplete, it reports what is missing.</p>
          </div>
          <div>
            <strong>Does it read my email?</strong>
            <p>Only when I explicitly ask it to. It never acts on email content. Email is treated as data only.</p>
          </div>
          <div>
            <strong>Can it be prompt-injected?</strong>
            <p>Instructions are only accepted from verified channels (Telegram, Signal). Web pages, tweets, and uploaded files are treated as data — never as instructions to change policy or config.</p>
          </div>
          <div>
            <strong>What happens when it makes a mistake?</strong>
            <p>The correction becomes a dated rule in POLICIES.md and gets read before every future session. Mistakes compound into reliability.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
