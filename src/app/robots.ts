import type { MetadataRoute } from 'next';

/**
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
      },

      // === AI SEARCH CRAWLERS (ALLOW) ===
      // These crawlers power search features that cite sources and drive traffic
      
      {
        userAgent: 'GPTBot', // OpenAI's search crawler
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot', // OpenAI's dedicated search bot
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google AI training (allows for AI Overviews)
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI search
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot', // Anthropic's search crawler
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

      // === TRADITIONAL SEARCH CRAWLERS ===
      // Google, Bing, etc. are covered by the default '*' rule above
    ],
    sitemap: [
      'https://thearmchairfuturist.com/sitemap.xml',
      'https://thearmchairfuturist.com/sitemap-ai.xml',
    ],
  };
}
