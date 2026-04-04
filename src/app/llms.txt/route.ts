import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# The Armchair Futurist

## About
The Armchair Futurist is the advisory practice of Alex Myers, a certified futurist and AI strategy advisor. Alex helps leaders and organizations navigate AI adoption by bridging the Accountability Gap - the space between AI outputs and business results.

## Services
- Digital Identity Landing Page ($199) - Professional site delivered in 2-4 days
- AI Tools Assessment ($599-$999) - Custom tool recommendations with implementation plan
- Custom AI Provisioning ($1,000-$5,000) - Private AI command center with workflow automation
- AI Mentoring ($97-$497) - One-on-one coaching from anxiety to agency
- Adoption Strategy ($10,625) - Psychology-led organizational AI adoption
- 10-Week Transformation Lab ($38,250-$55,250) - Enterprise AI transformation program

## Key Concepts
- **Accountability Gap**: The space between what an AI system produces and what a business actually needs
- **Psychology-Led Adoption**: Addressing human barriers to AI adoption before technical ones
- **Data Sovereignty**: Building on open-standard stacks so clients own their logic and data

## Credentials
- Certified Futurist & Long-Term Analyst (FLTA)
- Certified Change Management Professional (CCMP)
- GenAI Academy Expert
- Certified Enterprise Blockchain Professional (CEBP)
- Professional Scrum Master (PSM)
- Professional Agile Leadership (PAL)
- 40+ AI systems deployed

## Contact
- Website: https://thearmchairfuturist.com
- LinkedIn: https://www.linkedin.com/in/alex-myers-34572a10/
- Substack: https://armchairfuturist.substack.com
- Email: armchairfuturist@gmail.com
- Location: Portugal (serving clients worldwide)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
