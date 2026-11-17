import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { DealCard, GameCard, ProductCard } from '@/components/cards';
import { SearchBar } from '@/components/filters/SearchBar';
import { SeoHead } from '@/components/seo/SeoHead';
import { Breadcrumbs, Container, EmptyState, MetadataRow } from '@/components/ui';
import { DEALS_CATALOGUE } from '@/data/deals';
import { GAMES_CATALOGUE } from '@/data/games';
import { HARDWARE_CATALOGUE } from '@/data/hardware';
import { ROUTES } from '@/router/routes';
import type { PlatformId } from '@/types/marketplace';
import { filterAndSortGames } from '@/utils/gameFilters';

type PlatformFilter = 'all' | PlatformId;

const PLATFORM_FILTER_OPTIONS: readonly { value: PlatformFilter; label: string }[] = [
  { value: 'all', label: 'All platforms' },
  { value: 'pc', label: 'PC' },
  { value: 'playstation', label: 'PlayStation' },
  { value: 'xbox', label: 'Xbox' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
];

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');

  const normalized = query.trim().toLowerCase();

  const matchingGames = useMemo(
    () =>
      filterAndSortGames(GAMES_CATALOGUE, {
        query,
        platformScope: platformFilter === 'all' ? [] : [platformFilter],
        genre: 'all',
        dealsOnly: false,
        sortBy: 'featured',
      }),
    [query, platformFilter]
  );

  const matchingHardware = useMemo(() => {
    if (platformFilter !== 'all' && platformFilter !== 'pc') return [];
    if (!normalized) return [...HARDWARE_CATALOGUE];
    return HARDWARE_CATALOGUE.filter((item) =>
      `${item.name} ${item.brand} ${item.description} ${item.category}`
        .toLowerCase()
        .includes(normalized)
    );
  }, [normalized, platformFilter]);

  const matchingDeals = useMemo(() => {
    return DEALS_CATALOGUE.filter((deal) => {
      if (platformFilter !== 'all' && deal.platform && deal.platform !== platformFilter) {
        return false;
      }
      if (!normalized) return true;
      return `${deal.title} ${deal.description} ${deal.retailer} ${deal.category}`
        .toLowerCase()
        .includes(normalized);
    });
  }, [normalized, platformFilter]);

  const totalCount = matchingGames.length + matchingHardware.length + matchingDeals.length;

  function handleSearchSubmit() {
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  }

  function handleReset() {
    setQuery('');
    setPlatformFilter('all');
    setSearchParams({});
  }

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={query.trim() ? `Search: ${query.trim()}` : 'Search Catalogue'}
        description="Search across PC, PlayStation, Xbox, Android, and iOS games, gaming hardware, accessories, and verified deals."
        canonicalPath={ROUTES.search}
      />

      <Breadcrumbs
        items={[{ label: 'Home', onClick: () => navigate(ROUTES.home) }, { label: 'Search' }]}
      />

      <div className="mt-5 space-y-5 border-b border-[#94A3B8]/12 pb-8">
        <MetadataRow items={['Games', 'Hardware', 'Deals & Coupons', 'Sample Catalogue']} />
        <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
          Search Catalogue
        </h1>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar
            value={query}
            onChange={(val) => {
              setQuery(val);
              if (!val.trim() && searchParams.has('q')) {
                setSearchParams({});
              }
            }}
            onSubmit={handleSearchSubmit}
            className="lg:max-w-lg"
          />

          <div className="flex flex-wrap items-center gap-1.5">
            {PLATFORM_FILTER_OPTIONS.map((option) => {
              const active = platformFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPlatformFilter(option.value)}
                  className={`min-h-[36px] rounded-[8px] px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                      : 'bg-[#10121A] text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No results matched your search"
            description="Try another game title, hardware category, or clear active platform filters."
            actionLabel="Reset search"
            onAction={handleReset}
            icon={<SearchX className="h-5 w-5" aria-hidden="true" />}
          />
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {matchingGames.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">Games</h2>
                <span className="font-mono text-xs tabular-nums text-[#94A3B8]">
                  {matchingGames.length} {matchingGames.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matchingGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {matchingHardware.length > 0 && (
            <section className="space-y-5 border-t border-[#94A3B8]/12 pt-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">Accessories &amp; Hardware</h2>
                <span className="font-mono text-xs tabular-nums text-[#94A3B8]">
                  {matchingHardware.length} {matchingHardware.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matchingHardware.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {matchingDeals.length > 0 && (
            <section className="space-y-5 border-t border-[#94A3B8]/12 pt-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">Deals &amp; Coupons</h2>
                <span className="font-mono text-xs tabular-nums text-[#94A3B8]">
                  {matchingDeals.length} {matchingDeals.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {matchingDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </Container>
  );
}
