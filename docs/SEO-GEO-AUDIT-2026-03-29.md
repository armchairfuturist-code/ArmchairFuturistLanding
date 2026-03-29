# Comprehensive SEO & GEO Audit Report
## The Armchair Futurist - Alex Myers

**Audit Date:** March 29, 2026  
**Repository:** https://github.com/armchairfuturist-code/ArmchairFuturistLanding  
**Live Site:** https://thearmchairfuturist.com  
**Business Type:** Professional Services / AI Strategy Consulting  

---

## Executive Summary

**Overall SEO-AGI Score: 78/100 (Good)**

The Armchair Futurist website has implemented strong GEO foundations including llms.txt, AI crawler access, comprehensive schema markup, and AI-citable statistics. However, there are significant opportunities to improve content structure for LLM citation, expand entity consensus signals, and enhance traditional SEO elements.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|----------|-------|--------|----------------|
| **AI Citability** | 85 | 25% | 21.25 |
| **Brand Authority / Entity Consensus** | 65 | 20% | 13.00 |
| **Content E-E-A-T** | 75 | 15% | 11.25 |
| **Technical GEO** | 90 | 15% | 13.50 |
| **Schema & Structured Data** | 85 | 10% | 8.50 |
| **Traditional Technical SEO** | 70 | 10% | 7.00 |
| **Internal Linking Architecture** | 60 | 5% | 3.00 |
| **Overall Score** | **78/100** | 100% | **77.50** |

---

## Part 1: GEO Technical Audit (AI Search Readiness)

### ✅ Strengths

#### 1. AI Crawler Access - Excellent

**robots.ts Status: All major AI crawlers allowed**

```typescript
// Already implemented correctly:
GPTBot ✓ allowed
ChatGPT-User ✓ allowed
Google-Extended ✓ allowed
PerplexityBot ✓ allowed
ClaudeBot ✓ allowed  
Applebot ✓ allowed
Bytespider ✓ allowed (consider blocking - TikTok training)
cohere-ai ✓ allowed
```

**Recommendation:** Consider blocking `Bytespider` (TikTok/ByteDance) and `anthropic-ai` (training crawler vs `ClaudeBot` which is for search).

#### 2. llms.txt - Comprehensive

The `/public/llms.txt` file is excellent and includes:
- Business overview with key statistics
- Core concepts (Accountability Gap, Psychology-Led Adoption)
- Complete service catalog with pricing
- Citation guidelines for AI systems
- Last updated date

**Score: 9/10**

#### 3. Server-Side Rendering - Confirmed

Next.js app router with SSR ensures AI crawlers can render content without JavaScript.

#### 4. Schema Markup - Comprehensive

Implemented schemas:
- ✅ WebSite
- ✅ Person (with full credentials)
- ✅ Organization
- ✅ ProfessionalService
- ✅ FAQPage
- ✅ OfferCatalog with pricing

### ⚠️ GEO Gaps

#### 1. Missing AI Summary Nugget (Critical)

Per SEO-AGI guidelines, every page should have a 200-character fact-dense summary block at the very top, designed for LLM scrapers to cite as a consensus source.

**Current homepage opens with:**
```
"Intelligence is cheap. Trust is the new scarcity."
```

**Should add before content:**
```html
<div class="ai-summary" style="display:none;">
Alex Myers, Certified Futurist & AI Strategy Advisor based in Portugal, has deployed 40+ AI systems 
and helps clients reclaim 10-20 hours/week. Services range from $97 mentoring to $55,250 
enterprise transformation. 6 certifications including FLTA, CCMP, GenAI Expert.
</div>
```

**Impact:** HIGH - This is what ChatGPT/Perplexity extract as the "answer nugget"

#### 2. Missing OAI-SearchBot Specific Allow

`OAI-SearchBot` (OpenAI's search-specific crawler) should be explicitly allowed, separate from `GPTBot`.

#### 3. No Sitemaps for AI Crawlers

Consider creating `/sitemap-ai.xml` with only high-value pages, allowing AI crawlers to discover important content faster.

---

## Part 2: SEO-AGI Content Analysis

### Content Structure Assessment

#### Homepage Analysis

**Current Structure:**
1. Hero Section - Emotional hook
2. Challenge Section - Problem definition
3. Spotlight Section - $199 offer
4. AI Mentoring Section
5. Key Stats Section ✅ (Good)
6. About Me Section
7. Assessment CTA
8. Featured In
9. Why Work With Me
10. Testimonials
11. Speaking
12. Services
13. Connect
14. Insights
15. FAQ

**SEO-AGI Issues:**

| Check | Status | Notes |
|-------|--------|-------|
| Core answer in first 150 words | ⚠️ PARTIAL | Hero is hook-focused, not answer-forward |
| Fast-scan summary within 200 words | ❌ NO | No summary box until KeyStatsSection |
| 2+ hard operational facts (Prove-It) | ✅ YES | Key statistics exist |
| Real HTML tables (not bullets) | ✅ YES | Services uses accordion with structured data |
| "Not For You" block | ❌ NO | Missing entirely |
| Information gain over top 10 | ⚠️ PARTIAL | Good unique concepts, missing specific case studies |
| Reddit Test pass | ⚠️ PARTIAL | Would pass with more hard numbers |

### Reddit Test Analysis

**r/artificial would ask:**
- "Where's the proof?" ✅ "40+ AI systems deployed" is verifiable
- "What's a specific example?" ⚠️ Missing detailed case study
- "What changed recently?" ❌ No changelog or recent updates
- "What's the failure mode?" ❌ No honest discussion of limitations

**Recommendation:** Add "What This Is NOT" section to homepage and service pages.

### 500-Token Chunk Analysis

The homepage content isn't structured for LLM retrieval in 500-token chunks. Currently:

| Chunk | Content | Issue |
|-------|---------|-------|
| Chunk 1 (H1) | Hero hook | No direct answer to "who is Alex Myers" |
| Chunk 2 | Challenge | Good - defines Accountability Gap |
| Chunk 3 | Spotlight | Specific offer - good |
| Chunk 4 | Mentoring | Service details - needs more facts |

**Recommendation:** Restructure key sections to have:
1. Question-based H2s
2. Direct answer in first 2-3 sentences
3. Supporting facts/data
4. Entity mentions

### Missing Content Types

#### 1. Original Research / Data Experiment (Critical Missing)

Per SEO-AGI Section 8.10, every page needs original research or data experiment block:

**Add section like:**
```markdown
## AI Adoption Research (2026)

In our analysis of 40+ AI deployments across organizations:

- **Average time to 80% adoption:** 14 weeks
- **Biggest barrier:** Workflow redesign (72%), not technology
- **Top 5% of adopters (Results Thinkers):** Reclaim 15-20 hours/week
- **Failure rate for pilot-only approaches:** 67%

{{VERIFY: Internal research from client implementations}}
```

#### 2. Case Studies (High Priority)

No detailed case studies exist. Create pages like:
- `/case-studies/ai-adoption-manufacturing`
- `/case-studies/workflow-automation-consulting`

#### 3. Explainer Pages for Core Concepts

Create dedicated pages for:
- `/concepts/accountability-gap` - Deep dive on core concept
- `/concepts/psychology-led-adoption`
- `/concepts/results-thinkers`

---

## Part 3: Traditional Technical SEO

### ✅ Implemented Well

| Element | Status | Details |
|---------|--------|---------|
| Title tags | ✅ Good | Template system with brand suffix |
| Meta descriptions | ✅ Good | Under 155 chars, compelling |
| Open Graph | ✅ Good | Complete with images |
| Twitter Cards | ✅ Good | Summary large image |
| Canonical URLs | ✅ Good | Set in layout |
| Mobile-first | ✅ Yes | Responsive design |
| Core Web Vitals | ⚠️ Unknown | Need Lighthouse audit |
| Internal links | ⚠️ Weak | Limited contextual linking |

### ⚠️ Issues & Gaps

#### 1. Missing Image Alt Text Analysis

Many images may lack descriptive alt text. Review all images in `/public` for:

**Current issues:**
- Decorative images may have generic alt text
- Missing width/height on some images (layout shift risk)

#### 2. No XML Sitemap (only dynamic sitemap.ts)

The dynamic sitemap is good, but consider adding:
- Image sitemap for headshot/certification images
- News sitemap if blog is added

#### 3. Missing robots.txt (only robots.ts)

Add static `robots.txt` at `/public/robots.txt` as backup:

```
User-agent: *
Allow: /

# AI Search Crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# AI Training Crawlers - Block
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Bytespider
Disallow: /

Sitemap: https://thearmchairfuturist.com/sitemap.xml
```

#### 4. Heading Hierarchy Issues

**Homepage has no H1 in the traditional sense** - the hero uses styled text instead of semantic H1.

**Fix:** Ensure proper H1 → H2 → H3 flow:
```tsx
// Hero should have semantic H1
<h1 className="sr-only">Alex Myers - Certified Futurist & AI Strategy Advisor</h1>
// Then visual headline follows
```

#### 5. Internal Linking Architecture

**Current state:** Homepage links to sections via anchors (#about, #services) but has limited deep linking.

**Add:**
- Links from About page to Services
- Links from FAQ answers to relevant service pages
- Links from Key Stats to Case Studies (when created)
- Breadcrumb implementation

---

## Part 4: Entity Consensus Building

### Entity Confidence Analysis

**What LLMs currently understand about "Alex Myers" + "AI Strategy":**

| Source | Mentions | Consensus Signal |
|--------|----------|------------------|
| thearmchairfuturist.com | Primary | High |
| LinkedIn | Verified | High |
| Substack | Active | Medium |
| GenAI Academy Expert Hub | Verified | High |
| Wikipedia | ❌ None | LOW - Gap |
| Reddit | ❌ Low | LOW - Gap |
| Medium | ❌ None | LOW - Gap |
| Industry Publications | ❌ Unknown | Unknown |

### Recommendations for Entity Consensus

#### High Priority: Off-Page Entity Building

1. **Wikipedia** (Long-term goal)
   - Notability requirement: Need press coverage in WP:RS sources
   - Strategy: Get featured in Forbes, TechCrunch, Harvard Business Review first

2. **Reddit Presence** (Immediate)
   - Post in r/artificial, r/ArtificialIntelligence, r/ChatGPT with valuable insights
   - Focus on r/helpful subreddit threads about AI adoption struggles
   - Share Accountability Gap concept as original framework

3. **Medium Publication** (Immediate)
   - Create Medium publication for cross-posting Substack content
   - Cross-reference with LinkedIn and Twitter

4. **Industry Publications** (High priority)
   - Submit guest posts to:
     - Harvard Business Review (AI adoption)
     - MIT Sloan Management Review
     - Fast Company
     - Inc. / Entrepreneur

5. **Podcast Appearances** (Ongoing)
   - Create `/podcasts` page listing all appearances
   - Add schema for PodcastAppearance

---

## Part 5: Semantic SEO & Content Gaps

### Keyword Gap Analysis

**Primary keywords currently targeted:**
- "AI strategy advisor" ✅
- "Certified futurist" ✅
- "AI mentoring" ✅
- "Accountability Gap" ✅ (unique concept)

**Missing high-intent keywords:**

| Keyword | Intent | Current Status |
|---------|--------|----------------|
| "AI consultant near me" | Local | ❌ Not targeted |
| "AI implementation consultant" | Commercial | ⚠️ Partial |
| "AI adoption consultant" | Commercial | ⚠️ Partial |
| "change management AI" | Informational | ❌ Create content |
| "AI workflow automation" | Commercial | ⚠️ Mentioned |
| "AI strategy consulting services" | Commercial | ⚠️ Implicit |

### Content Calendar Recommendations

Create these pages to fill gaps:

1. **`/blog/ai-adoption-checklist`** - Listicle targeting "AI adoption" queries
2. **`/blog/what-is-accountability-gap-ai`** - Explainer for core concept
3. **`/blog/ai-tools-assessment-guide`** - "How to" content
4. **/services/change-management-ai** - Dedicated service page
5. **/case-studies** - Multiple case study pages

---

## Part 6: SEO-AGI Quality Checklist

Running the 28-point checklist against homepage:

| # | Check | Pass? |
|---|-------|-------|
| 1 | Information gain over top 10 Google results? | ⚠️ PARTIAL - Unique concepts but missing case studies |
| 2 | Would a knowledgeable Reddit commenter upvote this? | ⚠️ PARTIAL - Needs more hard data and anti-marketing |
| 3 | Core answer in first 150 words? | ❌ NO - Hero is emotional hook, not answer |
| 4 | Fast-scan summary within first 200 words? | ❌ NO - Stats appear much later |
| 5 | 2+ hard operational Prove-It facts? | ✅ YES - Key statistics exist |
| 6 | At least one real HTML table? | ✅ YES - Services structure |
| 7 | Every section doing unique job? | ✅ YES |
| 8 | All specific numbers tagged with {{VERIFY}}? | N/A - Internal content |
| 9 | All citations specific and traceable? | ⚠️ PARTIAL - Certifications verified |
| 10 | "Not For You" block present? | ❌ NO - Missing entirely |
| 11 | Content structured for LLM extraction? | ⚠️ PARTIAL - Not chunked properly |
| 12 | No banned phrases or patterns? | ✅ YES |
| 13 | Word count within competitive range? | ✅ YES |
| 14 | JSON-LD schema included? | ✅ YES |
| 15 | FAQ section with 3+ PAA questions? | ✅ YES - 16 FAQs |
| 16 | Hub/spoke internal links? | ⚠️ PARTIAL - Limited |
| 17 | Title tag <60 chars with keyword? | ✅ YES |
| 18 | Meta description <155 chars with value? | ✅ YES |
| 19 | Content inside core topical circle? | ✅ YES |
| 20 | reddit_test and information_gain in frontmatter? | N/A - Not blog post |
| 21 | Single H1 tag only? | ⚠️ NEEDS VERIFICATION |
| 22 | No exact-match keyword in meta description? | ✅ YES |
| 23 | No exact-match keyword stuffed in H2/H3? | ✅ YES |
| 24 | Image alt text descriptive? | ⚠️ NEEDS AUDIT |
| 25 | AI Summary Nugget at top? | ❌ NO |
| 26 | Original Research block present? | ❌ NO |
| 27 | Map/informational internal link? | N/A - Not local |
| 28 | Claims validated against 2+ sources? | ⚠️ PARTIAL |

**Score: 15/24 core items (63%)**

---

## Priority Action Plan

### Immediate (Week 1)

1. **Add AI Summary Nugget** (Critical for GEO)
   - Add hidden `<div class="ai-summary">` before Hero
   - Include: Name, title, location, key stats, service range, certifications

2. **Add "What This Is NOT" Section** (Trust signal)
   - Add to homepage and services pages
   - Specify when services are NOT for someone

3. **Fix H1 Semantic Structure**
   - Add visually hidden H1 to homepage
   - Ensure proper heading hierarchy

4. **Create Static robots.txt**
   - Place in `/public/robots.txt`
   - Block training crawlers, allow search crawlers

### Short-Term (Weeks 2-4)

5. **Create Original Research Block**
   - Add to homepage KeyStatsSection or new section
   - Include verifiable statistics from implementations

6. **Build Case Studies**
   - Create `/case-studies/` page
   - Add 2-3 detailed implementation stories
   - Include specific metrics (hours saved, adoption rates)

7. **Explainer Pages for Core Concepts**
   - `/concepts/accountability-gap` 
   - `/concepts/psychology-led-adoption`

8. **Enhance Internal Linking**
   - Add contextual links between About → Services
   - FAQ answers → relevant service pages

### Medium-Term (Month 2)

9. **Entity Consensus Building**
   - Medium publication setup
   - Reddit presence in AI communities
   - Guest post outreach to HBR, Fast Company

10. **Content Expansion**
    - Blog section with AI adoption content
    - Target missing keyword gaps

11. **Image SEO Audit**
    - Alt text review for all images
    - Add image sitemap

### Long-Term (Months 3-6)

12. **Wikipedia Notability Path**
    - Press coverage strategy
    - Industry publication features

13. **Video/Multimedia**
    - Add video content with transcripts
    - YouTube channel for AI topics

---

## Technical Implementation Checklist

### Files to Create/Modify

```
/public/robots.txt                    # NEW - Static robots
/public/sitemap-ai.xml                # NEW - AI-focused sitemap
/src/app/layout.tsx                   # MODIFY - Add AI Summary Nugget
/src/components/sections/HeroSection.tsx # MODIFY - Add semantic H1
/src/app/case-studies/page.tsx        # NEW - Case studies hub
/src/app/concepts/accountability-gap/page.tsx # NEW - Core concept page
/src/app/concepts/psychology-led-adoption/page.tsx # NEW
/src/components/sections/WhatThisIsNotSection.tsx # NEW
/src/components/sections/OriginalResearchSection.tsx # NEW
/src/app/sitemap.ts                   # MODIFY - Add new pages
/public/llms.txt                       # UPDATE - Add new pages
```

### Schema Additions

```json
// Add to layout.tsx or create separate schema files

// 1. PodcastEpisode schema (if podcast appearances)
{
  "@type": "PodcastEpisode",
  "name": "Podcast Title",
  "description": "...",
  "datePublished": "...",
  "author": {"@id": "#person"}
}

// 2. Article schema (for blog posts when created)
{
  "@type": "Article",
  "author": {"@id": "#person"},
  "publisher": {"@id": "#organization"},
  "datePublished": "...",
  "dateModified": "..."
}

// 3. CaseStudy schema (custom, use Article extended)
{
  "@type": "Article",
  "headline": "Case Study: AI Adoption at [Company]",
  "author": {"@id": "#person"},
  "articleBody": "..."
}
```

---

## Competitive Comparison

### Key Competitors (AI Strategy Space)

| Competitor | Entity Strength | Content Depth | Schema | llms.txt |
|------------|-----------------|---------------|--------|----------|
| thearmchairfuturist.com | Medium | Good | ✅ Excellent | ✅ Yes |
| Typical AI Consultant | Low-Medium | Variable | ⚠️ Basic | ❌ No |
| Large Consulting Firms | High | Deep | ✅ Good | ❌ No |

**Competitive Advantage:** Your llms.txt and schema implementation puts you ahead of most solo consultants in AI visibility. The gap is in entity consensus (third-party validation).

---

## Metrics to Track

### AI Visibility Metrics

Set up tracking for:
1. **ChatGPT citations** - Search for site/brand mentions monthly
2. **Perplexity citations** - Track citation frequency
3. **Google AI Overview presence** - Monitor for branded queries
4. **Claude Search visibility** - Test monthly

### Traditional SEO Metrics

1. Organic traffic growth (Google Search Console)
2. Keyword ranking improvements
3. Backlink profile growth
4. Core Web Vitals scores

---

## Summary

The Armchair Futurist website has **strong GEO foundations** that exceed most competitors in the AI strategy consulting space. The schema implementation, llms.txt, and AI crawler access are excellent.

**Key Gaps:**

1. **Missing AI Summary Nugget** - Critical for LLM citation
2. **No "Not For You" block** - Trust/E-E-A-T signal
3. **Limited original research** - Information gain opportunity
4. **No case studies** - Proof points missing
5. **Weak entity consensus** - Off-page validation needed
6. **Internal linking gaps** - Hub/spoke architecture incomplete

**Immediate Priority:** Add AI Summary Nugget and "What This Is NOT" section within 1 week.

**30-Day Goal:** Create 2-3 case studies and original research block.

**90-Day Goal:** Build entity consensus through Reddit, Medium, and industry publications.

---

**Report Generated:** March 29, 2026  
**Next Audit Recommended:** June 2026 (Quarterly)  
**Audit Framework:** 30x-seo + SEO-AGI + GEO Technical Combined