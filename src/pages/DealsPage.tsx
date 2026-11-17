import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RotateCcw, ShieldCheck, Tag } from 'lucide-react';
import { DealCard } from '@/components/cards';
import { SearchBar } from '@/components/filters/SearchBar';
import { SeoHead } from '@/components/seo/SeoHead';
import { Breadcrumbs, Container, EmptyState, MetadataRow } from '@/components/ui';
import { DEALS_CATALOGUE, SEASONAL_COLLECTIONS } from '@/data/deals';
import { ROUTES } from '@/router/routes';

type DealsTab = 'all' | 'coupons' | 'gift-cards' | 'expired';

const TAB_OPTIONS: readonly { value: DealsTab; label: string }[] = [
  { value: 'all', label: 'All Active Deals' },
  { value: 'coupons', label: 'Coupons' },
  { value: 'gift-cards', label: 'Gift Cards & Top-Ups' },
  { value: 'expired', label: 'Expired Archive' },
];

interface DealsPageProps {
  defaultTab?: DealsTab;
}

export function DealsPage({ defaultTab = 'all' }: DealsPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramTab = searchParams.get('tab') as DealsTab | null;
  const initialTab: DealsTab =
    paramTab && TAB_OPTIONS.some((t) => t.value === paramTab) ? paramTab : defaultTab;

  const [activeTab, setActiveTab] = useState<DealsTab>(initialTab);
  const [query, setQuery] = useState('');

  const filteredDeals = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return DEALS_CATALOGUE.filter((deal) => {
      if (activeTab === 'expired') {
        if (!deal.isExpired) return false;
      } else {
        if (deal.isExpired) return false;
        if (activeTab === 'coupons' && !deal.couponCode) return false;
        if (
          activeTab === 'gift-cards' &&
          deal.category !== 'gift-card' &&
          deal.category !== 'subscription'
        ) {
          return false;
        }
      }

      if (normalized) {
        const haystack =
          `${deal.title} ${deal.description} ${deal.retailer} ${deal.couponCode ?? ''}`.toLowerCase();
        if (!haystack.includes(normalized)) return false;
      }

      return true;
    });
  }, [activeTab, query]);

  function handleTabChange(nextTab: DealsTab) {
    setActiveTab(nextTab);
    if (nextTab === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab: nextTab }, { replace: true });
    }
  }

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title="Deals, Coupons & Official Gift Cards"
        description="Explore active sample gaming deals, copyable promo codes, seasonal promotions, and authorized digital gift cards."
        canonicalPath={ROUTES.deals}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          { label: 'Deals & Coupons' },
        ]}
      />

      <div className="mt-5 space-y-3 border-b border-[#94A3B8]/12 pb-7">
        <MetadataRow items={['Active Offers', 'Sample Coupons', 'Gift Cards & Top-Ups']} />
        <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
          Deals, Coupons &amp; Official Top-Ups
        </h1>
        <p className="max-w-2xl text-base text-[#94A3B8]">
          Browse demonstration deals, promo codes, seasonal sale windows, and authorized digital
          wallet top-ups. Expired offers are separated into the archive tab.
        </p>
      </div>

      {/* Seasonal Showcases */}
      <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {SEASONAL_COLLECTIONS.map((season) => (
          <div
            key={season.id}
            className="surface-card flex flex-col justify-between gap-4 p-5 sm:p-6"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#94A3B8]">{season.window}</span>
                <span className="font-mono text-xs font-semibold text-[#22D3EE]">
                  {season.highlightTag}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-[#F8FAFC]">{season.title}</h2>
              <p className="text-sm text-[#94A3B8]">{season.summary}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() =>
                  handleTabChange(season.filterCategory === 'hardware' ? 'coupons' : 'all')
                }
                className="text-xs font-medium text-[#C4B5FD] hover:underline"
              >
                Filter matching offers
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Filter & Search Toolbar */}
      <div className="surface-card mt-8 flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Deals categories" className="flex flex-wrap gap-1.5">
          {TAB_OPTIONS.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.value)}
                className={`min-h-[38px] rounded-[8px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                    : 'bg-[#08090D] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 lg:w-80">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search deals or coupon codes..."
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Reset deal search"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#94A3B8]/20 text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Deals Grid */}
      <div className="mt-8">
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No deals match your current filter"
            description="Switch tabs or clear your search query to inspect available sample offers."
            actionLabel="Show all active deals"
            onAction={() => {
              setQuery('');
              handleTabChange('all');
            }}
            icon={<Tag className="h-5 w-5" aria-hidden="true" />}
          />
        )}
      </div>

      {/* Authorized Gift Cards & Affiliate Transparency Note */}
      <section className="mt-12 rounded-[14px] border border-[#94A3B8]/15 bg-[#10121A] p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#22D3EE]" aria-hidden="true" />
          <div className="space-y-1.5">
            <h2 className="text-base font-semibold text-[#F8FAFC]">
              Authorized Top-Ups &amp; Affiliate Transparency
            </h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              Gaming Deals only lists official first-party storefronts and authorized digital
              distributors for wallet codes and game top-ups. Outbound affiliate links may earn a
              commission at no added cost to you.{' '}
              <Link to={ROUTES.affiliateDisclosure} className="text-[#F8FAFC] underline">
                Read full affiliate disclosure
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
