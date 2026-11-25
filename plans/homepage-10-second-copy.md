# Ten-second copy and placement plan (v3)

> **Status: shipped.** Built 2026-11-18. Problem cards replaced the marquee, the hero deck and button carry the two lines, the ten researched FAQs are in `src/content/faqs.ts` (FAQ count is 25, not 24), and the pricing rule is a comment in `src/lib/pricing.ts`. Tests: `src/components/sections/__tests__/ProblemCards.test.tsx`.

## The three lines, tightened

Your draft, cut to the bone. Line 1 loses the stumble; line 3 becomes the button, not a line of text.

> **You hear what AI can do. You try it. It doesn't click.**
> **The missing piece is mental models, not you. I connect the dots with you, on your own work, one to one.**

Button: `Text me on WhatsApp. Free to ask.` (shipped: the price signal went into the button, so no third line was needed).

Why the third line goes: the button is the third line. Below the deck sits one 48px button that says exactly that. A line repeating it costs a full line of the ten seconds. If you want the price signal visible, it belongs in the button: `Text me on WhatsApp. Free to ask.`

Word count: 10 + 21 + button. Two sentences of reading.

Optional third line, only if the button cannot carry it:

> It costs nothing to ask.

## Where each piece goes

| Copy | File | Change |
|---|---|---|
| Headline | `src/components/organism/OrganismHero.tsx` (h1) | **No change.** `Your Last / AI Consultant.` stays. It is the promise and the brand, it is 4 words, and it is the LCP element. A 21-word sentence in 6rem type is a wall, not a headline. |
| The two lines | same file, `<p className="organism-deck">` | Replace the current deck. Class rule is `max-width: 450px; font-size: 16px; line-height: 1.6`, so two lines fit at 450px on desktop and wrap to four on a phone. Supported by `src/app/globals.css` line 144. |
| Price signal | same file, `.organism-deck--offer` | Class already exists for a lighter second line under the deck. One line max, no more. |
| Problem cards | **new** `src/components/sections/ProblemCards.tsx`, added at the marquee slot in `src/lib/homepage-sections.tsx` | Two cards. Quotes pulled by name from `TESTIMONIALS`, prices from label exports in `src/lib/pricing.ts`. |
| Testimonials | `src/components/sections/ProofSection.tsx` | No change. All clients, full text, disclosure. It already does the job the marquee duplicated. |
| FAQ entries | `src/content/faqs.ts` | Append the ten from `plans/research/novice-faq-candidates.json`. `src/app/llms-full.txt/route.ts` and the `FAQPage` JSON-LD in `FAQSection.tsx` both read `FAQ_ITEMS`, so the SEO and AI surfaces update themselves. |

## Should the marquee become the testimonials?

Replace it. Not with the same quotes in a row, but with the two cards, each carrying one quote.

Four reasons:

1. **Wrong order.** The marquee sits second, so a stranger reads praise before knowing what is for sale. Proof first only works for a visitor who already knows you, which is the referral case. The referral visitor still needs the problem named, because they arrived with it and cannot say it.
2. **Motion without an anchor.** The track moves at 0.8px per frame. A reader who loses their place re-reads the first card, then the loop brings it back and they read it again. Nothing accumulates. That reader decides on the first card after roughly two seconds.
3. **Six quotes, one memory slot.** The strongest line you have is Shannon Myers: `saved me over $10,000 a year`, `10 to 20 hours a week`. That number is buried as card two of six. It should be the only number on the first screen after the hero.
4. **A quote attached to a problem argues; a quote floating in a strip decorates.** In the card, the same sentence reads as evidence for the claim two lines above it.

If you keep the marquee anyway, cap it at three quotes and slow it to about 0.3px per frame. That is a compromise, not a fix.

## Order after the change

1. Hero: headline, two lines, one button
2. Problem cards: `Does this happen to you?` Two cards, each with a real quote. **Replaces the marquee.**
3. Services
4. Guidance
5. Results (`ProofSection`): all clients, full text
6. Why (`LastMileSection`)
7. FAQ: now 25 entries
8. Assessment
9. Newsletter
10. Contact

Ten sections still. Nothing is added to the page's length.

## Card 1: the opener

| Field | Copy |
|---|---|
| Problem | The tool is powerful. It will not do the job for you. |
| Client words | "I wasn't even sure what type of training to ask for." |
| Fixed | You know what the model is doing and why. You run the job alone. |
| Steps | Show me what you tried. I explain what the tool was doing. We run the same job together. You run it again alone. You keep the notes. |
| Time and cost | One session: from `SINGLE_SESSION_LABEL`. Packs: `GUIDANCE_RANGE_LABEL`. Program: `PROGRAM_PRICE_LABEL`. |
| Result | Brenda Fonseca, PhD (real quote, full text in `TESTIMONIALS`). |

## Card 2: the money

| Field | Copy |
|---|---|
| Problem | Two subscriptions, one job. Or a month's usage gone by Wednesday. |
| Client words | "I pay twice, and it still runs out." |
| Fixed | One bill. The plan fits the work. Nothing overlaps. |
| Steps | Send the last two bills. I list every bill and what it does. We cancel the overlap. The work moves to the cheaper tool that still does it. You keep the list. |
| Time and cost | The list: one session. Written roadmap: `AUDIT_PRICE_LABEL`. Build: `CUSTOM_PROVISIONING_RANGE_LABEL`. |
| Result | Shannon Myers (real quote): $10,000 a year saved, 10 to 20 hours a week back. |

## Succinctness verdict

Three lines became two lines and a button. That is the whole cut, and it is worth the cut: the third line was doing the button's job.

## Prices

The euro column is the base and the dollar column is charm-rounded up. Checked: €100 becomes $120, €475 becomes $570, €900 becomes $1,100, €1,700 becomes $2,000. That is a rule, not a bug. Say so in a comment in `src/lib/pricing.ts`, or the next person will "fix" one of the pairs and break the rest.
