import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { GameCard } from '@/components/cards';
import { CatalogueToolbar, type FilterTabOption } from '@/components/filters/CatalogueToolbar';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Container,
  EmptyState,
  MetadataRow,
  Pagination,
  type DropdownOption,
} from '@/components/ui';
import { GAMES_CATALOGUE } from '@/data/games';
import { ROUTES } from '@/router/routes';
import type { PlatformId } from '@/types/marketplace';
import { filterAndSortGames, getUniqueGenres, type GameSortOption } from '@/utils/gameFilters';

export type CatalogueVariant = 'pc' | 'playstation' | 'xbox' | 'mobile';

interface CatalogueConfig {
  title: string;
  description: string;
  canonicalPath: string;
  platforms: PlatformId[];
  storeSummary: string;
  mobileTabs?: readonly FilterTabOption[];
}

const CATALOGUE_CONFIGS: Record<CatalogueVariant, CatalogueConfig> = {
  pc: {
    title: 'PC Games',
    description:
      'Discover PC games and compare sample prices across authorized digital storefronts including Steam, GOG, and Epic Games Store.',
    canonicalPath: ROUTES.pcGames,
    platforms: ['pc'],
    storeSummary: 'Steam, GOG & Epic Games Store (Sample)',
  },
  playstation: {
    title: 'PlayStation Games',
    description:
      'Browse PlayStation 5 and PS4 titles with transparent sample pricing from PlayStation Store and authorized partners.',
    canonicalPath: ROUTES.playstation,
    platforms: ['playstation'],
    storeSummary: 'PlayStation Store & Direct (Sample)',
  },
  xbox: {
    title: 'Xbox Games',
    description:
      'Compare Xbox Series X|S editions and Smart Delivery releases across authorized digital stores.',
    canonicalPath: ROUTES.xbox,
    platforms: ['xbox'],
    storeSummary: 'Xbox Digital Store (Sample)',
  },
  mobile: {
    title: 'Mobile Games (Android & iOS)',
    description:
      'Explore Android and iOS gaming titles with verified Google Play and Apple App Store links.',
    canonicalPath: ROUTES.mobileGames,
    platforms: ['android', 'ios'],
    storeSummary: 'Google Play & Apple App Store (Sample)',
    mobileTabs: [
      { value: 'all', label: 'All Mobile' },
      { value: 'android', label: 'Android' },
      { value: 'ios', label: 'iOS' },
    ],
  },
};

const SORT_OPTIONS: readonly DropdownOption[] = [
  { value: 'featured', label: 'Featured titles' },
  { value: 'discount-desc', label: 'Biggest sample discount' },
  { value: 'price-asc', label: 'Sample price: Low to high' },
  { value: 'price-desc', label: 'Sample price: High to low' },
  { value: 'newest', label: 'Newest releases' },
];

const PAGE_SIZE = 6;

interface GamesCataloguePageProps {
  variant: CatalogueVariant;
}

export function GamesCataloguePage({ variant }: GamesCataloguePageProps) {
  const config = CATALOGUE_CONFIGS[variant];
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMobileOs = searchParams.get('os');
  const [mobileOs, setMobileOs] = useState<string>(
    variant === 'mobile' && (initialMobileOs === 'android' || initialMobileOs === 'ios')
      ? initialMobileOs
      : 'all'
  );
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [dealsOnly, setDealsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<GameSortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const activePlatformScope: PlatformId[] = useMemo(() => {
    if (variant !== 'mobile') return config.platforms;
    if (mobileOs === 'android') return ['android'];
    if (mobileOs === 'ios') return ['ios'];
    return ['android', 'ios'];
  }, [variant, config.platforms, mobileOs]);

  const platformBaseGames = useMemo(
    () =>
      GAMES_CATALOGUE.filter((game) =>
        game.platforms.some((platform) => activePlatformScope.includes(platform))
      ),
    [activePlatformScope]
  );

  const availableGenres = useMemo(() => getUniqueGenres(platformBaseGames), [platformBaseGames]);

  const filteredGames = useMemo(
    () =>
      filterAndSortGames(GAMES_CATALOGUE, {
        query,
        platformScope: activePlatformScope,
        genre: selectedGenre,
        dealsOnly,
        sortBy,
      }),
    [query, activePlatformScope, selectedGenre, dealsOnly, sortBy]
  );

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedGames = filteredGames.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedGenre !== 'all' ||
    dealsOnly ||
    (variant === 'mobile' && mobileOs !== 'all');

  function handleResetFilters() {
    setQuery('');
    setSelectedGenre('all');
    setDealsOnly(false);
    setSortBy('featured');
    setMobileOs('all');
    setCurrentPage(1);
    if (variant === 'mobile' && searchParams.has('os')) {
      setSearchParams({});
    }
  }

  function handleMobileTabChange(value: string) {
    setMobileOs(value);
    setSelectedGenre('all');
    setCurrentPage(1);
    if (value === 'android' || value === 'ios') {
      setSearchParams({ os: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={config.title}
        description={config.description}
        canonicalPath={config.canonicalPath}
      />

      <Breadcrumbs
        items={[{ label: 'Home', onClick: () => navigate(ROUTES.home) }, { label: config.title }]}
      />

      <div className="mt-5 space-y-3 border-b border-[#94A3B8]/12 pb-7">
        <MetadataRow items={[config.storeSummary, 'Sample Catalogue Data']} />
        <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
          {config.title}
        </h1>
        <p className="max-w-2xl text-base text-[#94A3B8]">{config.description}</p>
      </div>

      <div className="mt-8 space-y-8">
        <CatalogueToolbar
          query={query}
          onQueryChange={(val) => {
            setQuery(val);
            setCurrentPage(1);
          }}
          genres={availableGenres}
          selectedGenre={selectedGenre}
          onGenreChange={(genre) => {
            setSelectedGenre(genre);
            setCurrentPage(1);
          }}
          sortOptions={SORT_OPTIONS}
          sortValue={sortBy}
          onSortChange={(val) => {
            setSortBy(val as GameSortOption);
            setCurrentPage(1);
          }}
          dealsOnly={dealsOnly}
          onToggleDealsOnly={() => {
            setDealsOnly((prev) => !prev);
            setCurrentPage(1);
          }}
          platformTabs={config.mobileTabs}
          selectedPlatformTab={mobileOs}
          onPlatformTabChange={handleMobileTabChange}
          totalResults={filteredGames.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {paginatedGames.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        ) : (
          <EmptyState
            title="No matching games found"
            description="Try clearing your search term, switching genres, or disabling the discounted-only filter."
            actionLabel="Reset all filters"
            onAction={handleResetFilters}
            icon={<SlidersHorizontal className="h-5 w-5" aria-hidden="true" />}
          />
        )}
      </div>
    </Container>
  );
}
