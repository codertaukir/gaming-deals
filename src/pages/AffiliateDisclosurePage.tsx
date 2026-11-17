import { Link } from 'react-router-dom';
import { TrustPageShell } from '@/components/legal/TrustPageShell';
import { ROUTES } from '@/router/routes';

export function AffiliateDisclosurePage() {
  return (
    <TrustPageShell
      title="Affiliate Disclosure"
      description="Clear disclosure of how affiliate links work on Gaming Deals, how editorial independence is protected, and how outbound retailer links are labeled."
      canonicalPath={ROUTES.affiliateDisclosure}
      metadata={['Transparency', 'FTC & ASCI Aligned', 'Updated November 2026']}
    >
      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">1. How Affiliate Links Work</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Some outbound links on Gaming Deals directing to authorized digital stores or hardware
          retailers may include affiliate or referral attribution (marked in markup with{' '}
          <code className="font-mono text-xs text-[#F8FAFC]">rel=&quot;sponsored&quot;</code> where
          applicable). If you click an affiliate link and complete an eligible purchase on a partner
          store, Gaming Deals may earn a commission at no extra cost to you.
        </p>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Not every store, game, or hardware listing participates in an affiliate program, and
          partner eligibility varies by country, product category, and merchant terms—we make no
          claim of guaranteed commissions on outbound clicks.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          2. Zero Extra Cost &amp; Fair Pricing
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Using an outbound link from Gaming Deals never increases the checkout price you pay on an
          external retailer&apos;s site. In this static preview release, all sample prices and promo
          codes are labeled as demonstration figures; always confirm the live store checkout total
          before paying.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          3. Editorial Independence Across Reviews &amp; Comparisons
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Inclusion in our{' '}
          <Link to={ROUTES.compare} className="text-[#22D3EE] underline">
            Comparison Matrix
          </Link>
          ,{' '}
          <Link to={ROUTES.reviews} className="text-[#22D3EE] underline">
            Reviews
          </Link>
          , and{' '}
          <Link to={ROUTES.guides} className="text-[#22D3EE] underline">
            Buying Guides
          </Link>{' '}
          is determined by platform coverage, technical specifications, and practical buyer fit—not
          commission rates. We list trade-offs alongside strengths and never accept payment to
          suppress drawbacks or fabricate scores.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          4. Authorized Retailers &amp; Reporting Issues
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          We prioritize authorized storefronts for PC keys, console digital top-ups, and gaming
          peripherals in India and international regions. If you spot a broken link, expired deal,
          or misleading retailer description, please let us know on our{' '}
          <Link to={ROUTES.contact} className="text-[#22D3EE] underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
