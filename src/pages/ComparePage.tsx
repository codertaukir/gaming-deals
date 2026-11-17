import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ExternalLink, Plus, X } from 'lucide-react';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Button,
  Container,
  Dropdown,
  EmptyState,
  ImageWithFallback,
  PriceDisplay,
  type DropdownOption,
} from '@/components/ui';
import { GAMES_CATALOGUE } from '@/data/games';
import { HARDWARE_CATALOGUE } from '@/data/hardware';
import { ROUTES } from '@/router/routes';
import type { Game, PlatformId, Product } from '@/types/marketplace';
import { getLowestGamePrice, getMaxGameDiscountPercent } from '@/utils/gameFilters';
import { getLowestProductPrice, getMaxProductDiscountPercent } from '@/utils/productFilters';

type CompareMode = 'games' | 'products';

const PLATFORM_LABELS: Record<PlatformId, string> = {
  pc: 'PC',
  playstation: 'PlayStation',
  xbox: 'Xbox',
  android: 'Android',
  ios: 'iOS',
};

const MAX_COMPARE_ITEMS = 3;

export function ComparePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMode: CompareMode = useMemo(() => {
    const rawMode = searchParams.get('mode');
    if (rawMode === 'products') return 'products';
    const rawItems = searchParams.get('items');
    if (rawItems) {
      const firstSlug = rawItems.split(',')[0]?.trim();
      if (firstSlug && HARDWARE_CATALOGUE.some((p) => p.slug === firstSlug)) {
        return 'products';
      }
    }
    return 'games';
  }, [searchParams]);

  const [mode, setMode] = useState<CompareMode>(initialMode);

  const initialGameSlugs = useMemo(() => {
    if (initialMode !== 'games') return [GAMES_CATALOGUE[0].slug, GAMES_CATALOGUE[1].slug];
    const raw = searchParams.get('items');
    if (raw) {
      const parsed = raw
        .split(',')
        .map((s) => s.trim())
        .filter((slug) => GAMES_CATALOGUE.some((g) => g.slug === slug))
        .slice(0, MAX_COMPARE_ITEMS);
      if (parsed.length > 0) return parsed;
    }
    return [GAMES_CATALOGUE[0].slug, GAMES_CATALOGUE[1].slug];
  }, [initialMode, searchParams]);

  const initialProductSlugs = useMemo(() => {
    if (initialMode !== 'products') {
      return [HARDWARE_CATALOGUE[0].slug, HARDWARE_CATALOGUE[1].slug];
    }
    const raw = searchParams.get('items');
    if (raw) {
      const parsed = raw
        .split(',')
        .map((s) => s.trim())
        .filter((slug) => HARDWARE_CATALOGUE.some((p) => p.slug === slug))
        .slice(0, MAX_COMPARE_ITEMS);
      if (parsed.length > 0) return parsed;
    }
    return [HARDWARE_CATALOGUE[0].slug, HARDWARE_CATALOGUE[1].slug];
  }, [initialMode, searchParams]);

  const [gameSlugs, setGameSlugs] = useState<string[]>(initialGameSlugs);
  const [productSlugs, setProductSlugs] = useState<string[]>(initialProductSlugs);

  const activeSlugs = mode === 'games' ? gameSlugs : productSlugs;

  const [candidateSlug, setCandidateSlug] = useState<string>(() => {
    if (initialMode === 'products') {
      return (
        HARDWARE_CATALOGUE.find((p) => !initialProductSlugs.includes(p.slug))?.slug ??
        HARDWARE_CATALOGUE[0].slug
      );
    }
    return (
      GAMES_CATALOGUE.find((g) => !initialGameSlugs.includes(g.slug))?.slug ??
      GAMES_CATALOGUE[0].slug
    );
  });

  const comparedGames: Game[] = useMemo(
    () =>
      gameSlugs
        .map((slug) => GAMES_CATALOGUE.find((g) => g.slug === slug))
        .filter((g): g is Game => Boolean(g)),
    [gameSlugs]
  );

  const comparedProducts: Product[] = useMemo(
    () =>
      productSlugs
        .map((slug) => HARDWARE_CATALOGUE.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p)),
    [productSlugs]
  );

  const mergedSpecLabels: string[] = useMemo(() => {
    const labelSet = new Set<string>();
    for (const product of comparedProducts) {
      for (const spec of product.specifications) {
        labelSet.add(spec.label);
      }
    }
    return Array.from(labelSet);
  }, [comparedProducts]);

  const availableOptions: DropdownOption[] = useMemo(() => {
    if (mode === 'games') {
      return GAMES_CATALOGUE.filter((g) => !gameSlugs.includes(g.slug)).map((g) => ({
        value: g.slug,
        label: g.title,
      }));
    }
    return HARDWARE_CATALOGUE.filter((p) => !productSlugs.includes(p.slug)).map((p) => ({
      value: p.slug,
      label: p.name,
    }));
  }, [mode, gameSlugs, productSlugs]);

  function syncUrl(nextMode: CompareMode, nextSlugs: string[]) {
    if (nextSlugs.length > 0) {
      setSearchParams({ mode: nextMode, items: nextSlugs.join(',') }, { replace: true });
    } else {
      setSearchParams({ mode: nextMode }, { replace: true });
    }
  }

  function handleModeSwitch(nextMode: CompareMode) {
    setMode(nextMode);
    const nextSlugs = nextMode === 'games' ? gameSlugs : productSlugs;
    syncUrl(nextMode, nextSlugs);
    if (nextMode === 'games') {
      const nextUnused = GAMES_CATALOGUE.find((g) => !gameSlugs.includes(g.slug));
      if (nextUnused) setCandidateSlug(nextUnused.slug);
    } else {
      const nextUnused = HARDWARE_CATALOGUE.find((p) => !productSlugs.includes(p.slug));
      if (nextUnused) setCandidateSlug(nextUnused.slug);
    }
  }

  function handleAdd() {
    if (activeSlugs.length >= MAX_COMPARE_ITEMS || !candidateSlug) return;
    if (activeSlugs.includes(candidateSlug)) return;

    const nextSlugs = [...activeSlugs, candidateSlug];
    if (mode === 'games') {
      setGameSlugs(nextSlugs);
      const nextUnused = GAMES_CATALOGUE.find((g) => !nextSlugs.includes(g.slug));
      if (nextUnused) setCandidateSlug(nextUnused.slug);
    } else {
      setProductSlugs(nextSlugs);
      const nextUnused = HARDWARE_CATALOGUE.find((p) => !nextSlugs.includes(p.slug));
      if (nextUnused) setCandidateSlug(nextUnused.slug);
    }
    syncUrl(mode, nextSlugs);
  }

  function handleRemove(slug: string) {
    const nextSlugs = activeSlugs.filter((item) => item !== slug);
    if (mode === 'games') {
      setGameSlugs(nextSlugs);
    } else {
      setProductSlugs(nextSlugs);
    }
    syncUrl(mode, nextSlugs);
  }

  const activeCount = mode === 'games' ? comparedGames.length : comparedProducts.length;

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title="Compare Games & Hardware"
        description="Compare games, accessories, and gaming hardware side by side across specifications, platforms, and sample retailer prices."
        canonicalPath={ROUTES.compare}
      />

      <Breadcrumbs
        items={[{ label: 'Home', onClick: () => navigate(ROUTES.home) }, { label: 'Compare' }]}
      />

      <div className="mt-5 flex flex-col justify-between gap-6 border-b border-[#94A3B8]/12 pb-7 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <div
            role="tablist"
            aria-label="Comparison category"
            className="inline-flex rounded-[10px] border border-[#94A3B8]/15 bg-[#10121A] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'games'}
              onClick={() => handleModeSwitch('games')}
              className={`min-h-[38px] rounded-[7px] px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                mode === 'games'
                  ? 'bg-[#171A26] text-[#F8FAFC]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Compare Games
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'products'}
              onClick={() => handleModeSwitch('products')}
              className={`min-h-[38px] rounded-[7px] px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                mode === 'products'
                  ? 'bg-[#171A26] text-[#F8FAFC]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Compare Hardware &amp; Gear
            </button>
          </div>

          <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
            {mode === 'games' ? 'Compare Games Side by Side' : 'Compare Hardware & Gear'}
          </h1>
          <p className="text-base text-[#94A3B8]">
            Select up to {MAX_COMPARE_ITEMS}{' '}
            {mode === 'games'
              ? 'titles to compare platforms, genres, and sample retailer prices.'
              : 'products to compare technical specifications and sample retailer offers.'}
          </p>
        </div>

        {activeSlugs.length < MAX_COMPARE_ITEMS && availableOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            <Dropdown
              options={availableOptions}
              value={candidateSlug}
              onChange={setCandidateSlug}
              ariaLabel={mode === 'games' ? 'Select game to add' : 'Select product to add'}
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleAdd}
              leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
            >
              Add item
            </Button>
          </div>
        )}
      </div>

      {activeCount === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={`No ${mode === 'games' ? 'games' : 'products'} selected`}
            description="Add items from the selector above or load a default comparison pair."
            actionLabel="Load sample comparison"
            onAction={() => {
              const defaults =
                mode === 'games'
                  ? [GAMES_CATALOGUE[0].slug, GAMES_CATALOGUE[1].slug]
                  : [HARDWARE_CATALOGUE[0].slug, HARDWARE_CATALOGUE[1].slug];
              if (mode === 'games') setGameSlugs(defaults);
              else setProductSlugs(defaults);
              syncUrl(mode, defaults);
            }}
          />
        </div>
      ) : mode === 'games' ? (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[680px]">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `180px repeat(${comparedGames.length}, minmax(220px, 1fr))`,
              }}
            >
              <div className="hidden items-end pb-4 text-xs font-medium text-[#64748B] sm:flex">
                Title
              </div>

              {comparedGames.map((game) => (
                <div key={game.id} className="surface-card flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/games/${game.slug}`}
                      className="text-sm font-semibold text-[#F8FAFC] hover:text-[#C4B5FD]"
                    >
                      {game.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(game.slug)}
                      aria-label={`Remove ${game.title} from comparison`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[#94A3B8] transition-colors hover:bg-[#171A26] hover:text-[#F8FAFC]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <ImageWithFallback
                    src={game.coverImage}
                    alt={`${game.title} artwork`}
                    fallbackTitle={game.title}
                    aspectRatioClass="aspect-[4/3]"
                  />
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Lowest sample price
              </div>
              {comparedGames.map((game) => {
                const lowestPrice = getLowestGamePrice(game);
                const bestOffer =
                  game.retailers.find((offer) => offer.price === lowestPrice) ?? game.retailers[0];
                return (
                  <div
                    key={`${game.id}-price`}
                    className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4"
                  >
                    <PriceDisplay
                      amount={lowestPrice}
                      originalAmount={bestOffer?.originalPrice}
                      currency={bestOffer?.currency ?? 'INR'}
                      isSample={bestOffer?.isSampleData ?? true}
                      size="md"
                    />
                  </div>
                );
              })}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Max sample discount
              </div>
              {comparedGames.map((game) => {
                const discount = getMaxGameDiscountPercent(game);
                return (
                  <div
                    key={`${game.id}-discount`}
                    className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 font-mono text-sm tabular-nums text-[#22D3EE]"
                  >
                    {discount > 0 ? `-${discount}%` : 'Standard listing'}
                  </div>
                );
              })}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Platforms
              </div>
              {comparedGames.map((game) => (
                <div
                  key={`${game.id}-platforms`}
                  className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 text-sm text-[#F8FAFC]"
                >
                  {game.platforms.map((p) => PLATFORM_LABELS[p]).join(', ')}
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Genres
              </div>
              {comparedGames.map((game) => (
                <div
                  key={`${game.id}-genres`}
                  className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 text-sm text-[#94A3B8]"
                >
                  {game.genres.join(' · ')}
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Publisher / Release
              </div>
              {comparedGames.map((game) => (
                <div
                  key={`${game.id}-pub`}
                  className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 text-sm text-[#94A3B8]"
                >
                  {game.publisher} · {game.releaseDate}
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Retailer link
              </div>
              {comparedGames.map((game) => {
                const bestOffer = game.retailers[0];
                return (
                  <div
                    key={`${game.id}-cta`}
                    className="flex items-center gap-2 border-t border-[#94A3B8]/12 px-2 py-4"
                  >
                    <Link
                      to={`/games/${game.slug}`}
                      className="inline-flex min-h-[40px] items-center rounded-[8px] border border-[#94A3B8]/25 bg-[#10121A] px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:border-[#8B5CF6]/55"
                    >
                      All offers ({game.retailers.length})
                    </Link>
                    {bestOffer && (
                      <a
                        href={bestOffer.productUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[8px] bg-[#8B5CF6] px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:bg-[#7C3AED]"
                      >
                        <span>Store</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[680px]">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(220px, 1fr))`,
              }}
            >
              <div className="hidden items-end pb-4 text-xs font-medium text-[#64748B] sm:flex">
                Product
              </div>

              {comparedProducts.map((product) => (
                <div key={product.id} className="surface-card flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/products/${product.slug}`}
                      className="text-sm font-semibold text-[#F8FAFC] hover:text-[#C4B5FD]"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(product.slug)}
                      aria-label={`Remove ${product.name} from comparison`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[#94A3B8] transition-colors hover:bg-[#171A26] hover:text-[#F8FAFC]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <ImageWithFallback
                    src={product.image}
                    alt={`${product.name} product view`}
                    fallbackTitle={product.name}
                    aspectRatioClass="aspect-[4/3]"
                  />
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Lowest sample price
              </div>
              {comparedProducts.map((product) => {
                const lowestPrice = getLowestProductPrice(product);
                const bestOffer =
                  product.retailers.find((offer) => offer.price === lowestPrice) ??
                  product.retailers[0];
                return (
                  <div
                    key={`${product.id}-price`}
                    className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4"
                  >
                    <PriceDisplay
                      amount={lowestPrice}
                      originalAmount={bestOffer?.originalPrice}
                      currency={bestOffer?.currency ?? 'INR'}
                      isSample={bestOffer?.isSampleData ?? true}
                      size="md"
                    />
                  </div>
                );
              })}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Max sample discount
              </div>
              {comparedProducts.map((product) => {
                const discount = getMaxProductDiscountPercent(product);
                return (
                  <div
                    key={`${product.id}-discount`}
                    className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 font-mono text-sm tabular-nums text-[#22D3EE]"
                  >
                    {discount > 0 ? `-${discount}%` : 'Standard listing'}
                  </div>
                );
              })}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Brand &amp; Category
              </div>
              {comparedProducts.map((product) => (
                <div
                  key={`${product.id}-brand`}
                  className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 text-sm text-[#F8FAFC]"
                >
                  {product.brand} · {product.category === 'hardware' ? 'Hardware' : 'Accessory'}
                </div>
              ))}

              {mergedSpecLabels.map((specLabel) => (
                <div key={specLabel} className="contents">
                  <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                    {specLabel}
                  </div>
                  {comparedProducts.map((product) => {
                    const match = product.specifications.find((s) => s.label === specLabel);
                    return (
                      <div
                        key={`${product.id}-${specLabel}`}
                        className="flex items-center border-t border-[#94A3B8]/12 px-2 py-4 text-sm text-[#94A3B8]"
                      >
                        {match ? match.value : '—'}
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="flex items-center border-t border-[#94A3B8]/12 py-4 text-xs font-medium text-[#94A3B8]">
                Retailer link
              </div>
              {comparedProducts.map((product) => {
                const bestOffer = product.retailers[0];
                return (
                  <div
                    key={`${product.id}-cta`}
                    className="flex items-center gap-2 border-t border-[#94A3B8]/12 px-2 py-4"
                  >
                    <Link
                      to={`/products/${product.slug}`}
                      className="inline-flex min-h-[40px] items-center rounded-[8px] border border-[#94A3B8]/25 bg-[#10121A] px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:border-[#8B5CF6]/55"
                    >
                      All offers ({product.retailers.length})
                    </Link>
                    {bestOffer && (
                      <a
                        href={bestOffer.productUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[8px] bg-[#8B5CF6] px-3 py-2 text-xs font-medium text-[#F8FAFC] hover:bg-[#7C3AED]"
                      >
                        <span>Store</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
