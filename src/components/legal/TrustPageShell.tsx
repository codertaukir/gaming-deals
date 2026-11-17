import type { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import { Breadcrumbs, Container, MetadataRow } from '@/components/ui';
import { SITE_CONFIG } from '@/config/site';
import { ROUTES } from '@/router/routes';

const TRUST_NAV_LINKS = [
  { label: 'About Gaming Deals', to: ROUTES.about },
  { label: 'Contact & Corrections', to: ROUTES.contact },
  { label: 'Affiliate Disclosure', to: ROUTES.affiliateDisclosure },
  { label: 'Privacy Policy', to: ROUTES.privacyPolicy },
  { label: 'Terms & Conditions', to: ROUTES.terms },
] as const;

interface TrustPageShellProps {
  title: string;
  description: string;
  canonicalPath: string;
  metadata: string[];
  structuredDataType?: 'WebPage' | 'AboutPage' | 'ContactPage';
  children: ReactNode;
}

export function TrustPageShell({
  title,
  description,
  canonicalPath,
  metadata,
  structuredDataType = 'WebPage',
  children,
}: TrustPageShellProps) {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': structuredDataType,
    name: title,
    description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        structuredData={structuredData}
      />

      <Breadcrumbs
        items={[{ label: 'Home', onClick: () => navigate(ROUTES.home) }, { label: title }]}
      />

      <header className="mt-5 border-b border-[#94A3B8]/12 pb-8">
        <MetadataRow items={metadata} />
        <h1 className="mt-2.5 max-w-3xl text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#94A3B8]">{description}</p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <article className="space-y-8 lg:col-span-8">{children}</article>

        <aside className="space-y-6 lg:col-span-4">
          <div className="surface-card p-5">
            <h2 className="text-sm font-semibold text-[#F8FAFC]">Trust &amp; Legal Directory</h2>
            <nav aria-label="Trust and legal pages" className="mt-3">
              <ul className="space-y-1">
                {TRUST_NAV_LINKS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex min-h-[40px] items-center rounded-[8px] px-3 text-sm transition-colors ${
                          isActive
                            ? 'bg-[#8B5CF6]/16 font-medium text-[#F8FAFC]'
                            : 'text-[#94A3B8] hover:bg-[#171A26] hover:text-[#F8FAFC]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="surface-card space-y-3 p-5 text-xs leading-relaxed text-[#94A3B8]">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F8FAFC]">
              <ShieldCheck className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
              <span>Static Discovery Guarantee</span>
            </div>
            <p>
              Gaming Deals is a client-side discovery guide. We do not sell game keys directly,
              require user accounts, or store personal browsing databases.
            </p>
            <p>
              Questions or listing corrections? Email{' '}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-medium text-[#22D3EE] hover:underline"
              >
                {SITE_CONFIG.contactEmail}
              </a>{' '}
              or visit{' '}
              <Link to={ROUTES.contact} className="font-medium text-[#F8FAFC] hover:underline">
                Contact
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
