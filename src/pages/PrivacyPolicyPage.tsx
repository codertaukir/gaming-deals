import { Link } from 'react-router-dom';
import { TrustPageShell } from '@/components/legal/TrustPageShell';
import { SITE_CONFIG } from '@/config/site';
import { ROUTES } from '@/router/routes';

export function PrivacyPolicyPage() {
  return (
    <TrustPageShell
      title="Privacy Policy"
      description="How Gaming Deals handles privacy on a 100% static frontend platform with zero user accounts, server databases, or behavioral ad tracking."
      canonicalPath={ROUTES.privacyPolicy}
      metadata={['Legal & Privacy', 'Effective November 2026', 'No User Accounts']}
    >
      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          1. Zero Account or Database Tracking
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Gaming Deals operates as a static discovery website. We do not offer user login accounts,
          store personal profiles in a backend database, collect payment credentials, or run
          cross-site behavioral advertising scripts.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          2. Information Processed Locally in Your Browser
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Interactive tools—such as search queries, platform filters, side-by-side comparison tabs,
          and coupon code clipboard actions—execute entirely inside your web browser. Filter state
          may appear in the page URL query string (for example,{' '}
          <code className="font-mono text-xs text-[#F8FAFC]">/search?q=oled</code>) so you can
          bookmark or share a view.
        </p>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          If you use the draft composer on our{' '}
          <Link to={ROUTES.contact} className="text-[#22D3EE] underline">
            Contact page
          </Link>
          , your input stays on your device until you choose to send an email via your own mail
          client.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          3. External Retailer &amp; Affiliate Cookies
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          When you follow an outbound link to an external storefront or affiliate partner (such as
          Steam, PlayStation Store, Xbox, Amazon, or hardware retailers), you leave Gaming Deals.
          Those third-party websites may set their own cookies or referral tags to recognize an
          affiliate visit or complete a purchase under their respective privacy policies.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">
          4. Static Hosting Logs &amp; Third-Party Assets
        </h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          Standard static web hosting infrastructure (such as GitHub Pages) may process basic HTTP
          request metadata (IP address, browser user agent, and timestamp) strictly for security,
          caching, and delivery reliability. Typography styles loaded from Google Fonts are subject
          to Google&apos;s font delivery privacy terms.
        </p>
      </section>

      <section className="surface-card space-y-3 p-6 sm:p-7">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">5. Contact for Privacy Questions</h2>
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          If you have any questions regarding this privacy policy or wish to report an external link
          issue, email{' '}
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="font-medium text-[#22D3EE] underline"
          >
            {SITE_CONFIG.contactEmail}
          </a>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
