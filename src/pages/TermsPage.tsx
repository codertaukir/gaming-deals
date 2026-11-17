import { Link } from 'react-router-dom';
import { TrustPageShell } from '@/components/legal/TrustPageShell';
import { ROUTES } from '@/router/routes';

export function TermsPage() {
  return (
    <TrustPageShell
      title="Terms & Conditions"
      description="Terms governing informational use of the Gaming Deals discovery platform, sample pricing notices, and outbound retailer links."
      canonicalPath={ROUTES.terms}
      metadata={['Terms of Use', 'Effective November 2026', 'Informational Discovery Only']}
    >
      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">1. Discovery Platform Only</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Gaming Deals is an informational catalogue, hardware comparison, and deal discovery
          website. We do not process payments, issue digital activation keys, ship physical
          merchandise, or provide customer support or refunds for third-party purchases. All
          transactions occur solely between you and the external merchant you select.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          2. Sample Pricing &amp; Accuracy Disclaimer
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Prices, discounts, promo codes, and retailer availability shown across Gaming Deals are
          labeled as <strong className="font-medium text-[#F8FAFC]">sample / demonstration</strong>{' '}
          data or static reference snapshots. Live pricing, regional taxes (such as GST), stock
          status, and region activation locks are controlled exclusively by each retailer and may
          change without notice. Always confirm final terms on the destination checkout page before
          buying.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">3. Outbound Third-Party Links</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Outbound retailer links open external websites operated independently of Gaming Deals. We
          are not responsible for the content, availability, warranty policies, or fulfillment
          practices of third-party stores. Review our{' '}
          <Link to={ROUTES.affiliateDisclosure} className="text-[#22D3EE] underline">
            Affiliate Disclosure
          </Link>{' '}
          and{' '}
          <Link to={ROUTES.privacyPolicy} className="text-[#22D3EE] underline">
            Privacy Policy
          </Link>{' '}
          before leaving the site.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          4. Intellectual Property &amp; Trademarks
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          All game titles, publisher names, console ecosystems (PC, PlayStation, Xbox, Android,
          iOS), and hardware brand names referenced in comparison tables and editorial guides remain
          the trademarks of their respective owners and are used strictly for descriptive
          identification.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">5. Limitation of Liability</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Gaming Deals is provided &ldquo;as is&rdquo; without warranties of uninterrupted
          availability or live price accuracy. To the extent permitted by applicable law, we are not
          liable for indirect or consequential losses arising from reliance on reference listings or
          third-party purchases.
        </p>
      </section>
    </TrustPageShell>
  );
}
