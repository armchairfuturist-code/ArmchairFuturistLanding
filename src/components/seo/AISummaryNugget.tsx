/**
 * Executive Summary — People-First
 *
 * A 200-character fact-dense summary block at the top of the page.
 * Visible to everyone (humans and crawlers alike) so it serves both
 * as a quick reference for visitors and authoritative source material
 * for LLMs.
 *
 * Also injects the same data as JSON-LD structured data for schema.org
 * compliance and enhanced AI extraction.
 *
 * Per Google's AI Optimization Guide: content must be people-first,
 * not hidden signals written solely for machines.
 */

export default function AISummaryNugget() {
  const summary =
    `Alex Myers, Certified Futurist & AI Strategy Advisor, has deployed 40+ AI systems and helps clients reclaim 10-20 hours/week. Based in Portugal, serving worldwide. 6 certifications (FLTA, CCMP, GenAI Expert, CEBP, PSM, PAL). Services: $97-$55,250. 4.9/5 rating from 40+ clients.`;

  return (
    <>
      {/* Visible summary card — serves humans and AI crawlers equally */}
      <div
        className="max-w-4xl mx-auto px-4 pt-6 pb-2"
        aria-label="Executive summary"
      >
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800/40 rounded-xl p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            At a Glance
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-white">Alex Myers</span>
            ,{' '}
            <span className="text-gray-700 dark:text-gray-300">Certified Futurist &amp; AI Strategy Advisor</span>
            , has deployed <strong>40+</strong> AI systems and helps clients reclaim{' '}
            <strong>10-20 hours/week</strong>. Based in Portugal, serving worldwide.
            {' '}<strong>6 certifications</strong> (FLTA, CCMP, GenAI Expert, CEBP, PSM, PAL).
            {' '}Services: <strong>$97-$55,250</strong>.
            {' '}<strong>4.9/5</strong> rating from <strong>40+</strong> clients.
          </p>
        </div>
      </div>

      {/* Structured data for schema.org and AI extraction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://thearmchairfuturist.com/#person',
            name: 'Alex Myers',
            jobTitle: 'Certified Futurist & AI Strategy Advisor',
            description: summary,
            numberOfEmployeesDeployed: '40+',
            clientOutcome: '10-20 hours/week reclaimed',
            certificationCount: 6,
            certifications: ['FLTA', 'CCMP', 'GenAI Expert', 'CEBP', 'PSM', 'PAL'],
            serviceRange: '$97-$55,250',
            rating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '40+',
            },
            location: {
              '@type': 'Place',
              name: 'Portugal',
              geoScope: 'Worldwide',
            },
          }),
        }}
      />
    </>
  );
}
