import { Link } from 'react-router-dom';
import { Container } from '@/components/ui';
import { FOOTER_COLUMNS } from '@/data/navigation';
import { ROUTES } from '@/router/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#94A3B8]/12 bg-[#08090D] py-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to={ROUTES.home}
              className="font-display text-lg font-bold tracking-tight text-[#F8FAFC]"
            >
              Gaming Deals
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#94A3B8]">
              An independent gaming discovery and price comparison platform for PC, console, and
              mobile players. Purchases are completed directly on authorized external retailer
              websites.
            </p>
            <p className="mt-4 text-xs text-[#64748B]">
              Affiliate notice: Outbound retailer links may earn a commission at no additional cost
              to you. Sample prices are labeled clearly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h2 className="text-sm font-semibold text-[#F8FAFC]">{column.heading}</h2>
                <ul className="mt-3.5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="inline-block py-0.5 text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#94A3B8]/12 pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center">
          <p>&copy; {currentYear} Gaming Deals. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to={ROUTES.affiliateDisclosure} className="hover:text-[#94A3B8]">
              Affiliate Disclosure
            </Link>
            <Link to={ROUTES.privacyPolicy} className="hover:text-[#94A3B8]">
              Privacy Policy
            </Link>
            <Link to={ROUTES.terms} className="hover:text-[#94A3B8]">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
