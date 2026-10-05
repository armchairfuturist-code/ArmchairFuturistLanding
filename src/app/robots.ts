import type { MetadataRoute } from 'next';

/**
 * SINGLE SOURCE of robots rules. public/robots.txt was deleted; do not recreate it
 * (a static file would shadow or conflict with this route).
 *
 * Robots.txt configuration for AI Search optimization
 * 
 * AI Search Crawlers (ALLOW): These power search features in ChatGPT, Claude, Perplexity, etc.
 * AI Training Crawlers (BLOCK): These scrape content for model training without citation benefit.
 * 
 * distinction is important for GEO (Generative Engine Optimization):
 * - Search crawlers drive referral traffic and citations
 * - Training crawlers don't provide attribution or traffic
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },

      // === AI SEARCH CRAWLERS (ALLOW) ===
      // These crawlers power search features that cite sources and drive traffic
      
      {
        userAgent: 'GPTBot', // OpenAI's training crawler (per OpenAI docs; DECISION: allowed today)
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot', // OpenAI's search bot (this is the one that drives ChatGPT search citations)
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Gemini training/grounding control; does not affect Search or AI Overviews (DECISION: allowed today)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI search
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', // Anthropic's crawler
        allow: '/',
      },
      {
        userAgent: 'Claude-User', // Claude user-initiated fetches
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot', // Anthropic's search crawler
        allow: '/',
      },
      {
        userAgent: 'Perplexity-User', // Perplexity user-initiated fetches
        allow: '/',
      },
      {
        userAgent: 'Meta-ExternalAgent', // Meta AI assistant
        allow: '/',
      },
      {
        userAgent: 'Amazonbot', // Alexa / Amazon AI
        allow: '/',
      },
      {
        userAgent: 'Applebot', // Apple's crawler (Siri, Spotlight)
        allow: '/',
      },

      // === AI TRAINING CRAWLERS (BLOCK) ===
      // These scrape content for model training without providing citations or traffic
      
      {
        userAgent: 'CCBot', // Common Crawl - used for training data
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Anthropic's training crawler
        disallow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance/TikTok training
        disallow: '/',
      },
      {
        userAgent: 'cohere-ai', // Cohere training
        disallow: '/',
      },
      {
        userAgent: 'Applebot-Extended', // Apple training-only
        disallow: '/',
      },

      // === TRADITIONAL SEARCH CRAWLERS ===
      // Google, Bing, etc. are covered by the default '*' rule above
    ],
    sitemap: [
      'https://thearmchairfuturist.com/sitemap.xml',
      'https://thearmchairfuturist.com/sitemap-ai.xml',
    ],
  };
}