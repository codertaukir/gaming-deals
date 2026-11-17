import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitCompareArrows, ShieldCheck } from 'lucide-react';
import { DealCard, GameCard } from '@/components/cards';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Button,
  Container,
  EmptyState,
  ImageWithFallback,
  MetadataRow,
  PriceDisplay,
  StatusBadge,
} from '@/components/ui';
import { DEALS_CATALOGUE } from '@/data/deals';
import { GAMES_CATALOGUE } from '@/data/games';
import { ROUTES } from '@/router/routes';
import type { AvailabilityStatus, PlatformId } from '@/types/marketplace';

const PLATFORM_META: Record<PlatformId, { label: string; route: string }> = {
  pc: { label: 'PC', route: ROUTES.pcGames },
  playstation: { label: 'PlayStation', route: ROUTES.playstation },
  xbox: { label: 'Xbox', route: ROUTES.xbox },
  android: { label: 'Android', route: ROUTES.mobileGames },
  ios: { label: 'iOS', route: ROUTES.mobileGames },
};

const AVAILABILITY_LABELS: Record<
  AvailabilityStatus,
  { label: string; tone: 'verified' | 'cyan' | 'sample' | 'expired' }
> = {
  'digital-key': { label: 'Digital Key', tone: 'cyan' },
  'in-stock': { label: 'In Stock', tone: 'verified' },
  'check-retailer': { label: 'Check Store', tone: 'sample' },
  'out-of-stock': { label: 'Out of Stock', tone: 'expired' },
};

export function GameDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const game = useMemo(() => GAMES_CATALOGUE.find((item) => item.slug === slug), [slug]);

  const relatedGames = useMemo(() => {
    if (!game) return [];
    return GAMES_CATALOGUE.filter(
      (candidate) =>
        candidate.id !== game.id &&
        (candidate.genres.some((g) => game.genres.includes(g)) ||
          candidate.platforms.some((p) => game.platforms.includes(p)))
    ).slice(0, 3);
  }, [game]);

  const matchingDeals = useMemo(() => {
    if (!game) return [];
    return DEALS_CATALOGUE.filter(
      (deal) =>
        !deal.isExpired &&
        deal.category === 'game' &&
        (!deal.platform || game.platforms.includes(deal.platform))
    ).slice(0, 2);
  }, [game]);

  if (!game) {
    return (
      <Container className="py-16">
        <SeoHead
          title="Game Not Found"
          description="The requested game listing could not be found in the Gaming Deals catalogue."
        />
        <EmptyState
          title="Game not found"
          description="This title may have been moved or does not exist in the current sample catalogue."
          actionLabel="Browse PC Games"
          onAction={() => navigate(ROUTES.pcGames)}
        />
      </Container>
    );
  }

  const primaryPlatform = game.platforms[0];
  const platformCrumb = primaryPlatform ? PLATFORM_META[primaryPlatform] : null;

  const sortedOffers = [...game.retailers].sort((a, b) => {
    const priceA = a.price ?? Number.MAX_SAFE_INTEGER;
    const priceB = b.price ?? Number.MAX_SAFE_INTEGER;
    return priceA - priceB;
  });

  const bestOffer = sortedOffers[0] ?? null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: game.title,
    description: game.description,
    brand: {
      '@type': 'Organization',
      name: game.publisher,
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={game.title}
        description={game.description}
        canonicalPath={`/games/${game.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          ...(platformCrumb
            ? [{ label: platformCrumb.label, onClick: () => navigate(platformCrumb.route) }]
            : []),
          { label: game.title },
        ]}
      />

      {/* Primary Hero Detail Split */}
      <section className="mt-6 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="surface-card p-3 lg:col-span-6">
          <ImageWithFallback
            src={game.coverImage}
            alt={`${game.title} key art`}
            fallbackTitle={game.title}
            aspectRatioClass="aspect-[4/3] lg:h-full"
            priority
          />
        </div>

        <div className="surface-card flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-6">
          <div className="space-y-4">
            <MetadataRow
              items={[game.publisher, `Released ${game.releaseDate}`, game.genres.join(' / ')]}
            />

            <h1 className="text-[clamp(1.85rem,3vw,2.75rem)] font-bold leading-[1.12] text-[#F8FAFC]">
              {game.title}
            </h1>

            <p className="text-base leading-relaxed text-[#94A3B8]">{game.description}</p>

            <div className="space-y-2 border-t border-[#94A3B8]/12 pt-4">
              <div className="text-xs font-medium text-[#94A3B8]">Available platforms</div>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => {
                  const meta = PLATFORM_META[platform];
                  return (
                    <Link
                      key={platform}
                      to={meta.route}
                      className="inline-flex min-h-[34px] items-center rounded-[8px] border border-[#94A3B8]/20 bg-[#171A26] px-3 py-1 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#8B5CF6]/55"
                    >
                      {meta.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-[#94A3B8]/12 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-[#94A3B8]">Lowest sample offer</div>
                <div className="mt-1">
                  <PriceDisplay
                    amount={bestOffer?.price ?? null}
                    originalAmount={bestOffer?.originalPrice}
                    currency={bestOffer?.currency ?? 'INR'}
                    isSample={bestOffer?.isSampleData ?? true}
                    size="lg"
                  />
                </div>
              </div>
              {bestOffer && (
                <StatusBadge
                  tone={bestOffer.isSampleData ? 'sample' : 'verified'}
                  label={bestOffer.isSampleData ? 'Sample Listing' : 'Verified Offer'}
                />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {bestOffer && (
                <a
                  href={bestOffer.productUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium text-[#F8FAFC] whitespace-nowrap transition-colors hover:bg-[#7C3AED]"
                >
                  <span>Visit {bestOffer.retailerName}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              )}

              <Link to={`${ROUTES.compare}?items=${encodeURIComponent(game.slug)}`}>
                <Button
                  variant="secondary"
                  leftIcon={<GitCompareArrows className="h-4 w-4" aria-hidden="true" />}
                >
                  Compare
                </Button>
              </Link>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
              <span>
                External checkout takes place on the retailer&apos;s official site. Sample prices
                shown are for demonstration and may differ from live store pricing.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer Offers Comparison Table */}
      <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
        <div>
          <h2 className="text-xl font-semibold text-[#F8FAFC]">Retailer Offers &amp; Editions</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Sorted from lowest sample price across listed authorized storefronts.
          </p>
        </div>

        <div className="space-y-3">
          {sortedOffers.map((offer) => {
            const avail = AVAILABILITY_LABELS[offer.availability];
            return (
              <div
                key={offer.id}
                className="surface-card flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-base font-semibold text-[#F8FAFC]">
                      {offer.retailerName}
                    </span>
                    <StatusBadge tone={avail.tone} label={avail.label} />
                  </div>
                  <MetadataRow
                    items={[
                      `Checked ${offer.lastVerified}`,
                      offer.isSampleData ? 'Sample offer' : 'Verified partner',
                    ]}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                  <PriceDisplay
                    amount={offer.price}
                    originalAmount={offer.originalPrice}
                    currency={offer.currency}
                    isSample={offer.isSampleData}
                    size="md"
                  />
                  <a
                    href={offer.productUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-[10px] border border-[#94A3B8]/25 bg-[#171A26] px-4 py-2 text-xs font-medium text-[#F8FAFC] whitespace-nowrap transition-colors hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]"
                  >
                    <span>Go to store</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Matching Deals */}
      {matchingDeals.length > 0 && (
        <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Related Platform Deals</h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Active sample promotions applicable across matching platforms.
              </p>
            </div>
            <Link to={ROUTES.deals} className="text-sm font-medium text-[#22D3EE] hover:underline">
              All deals
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {matchingDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#F8FAFC]">Related Games</h2>
            {platformCrumb && (
              <Link
                to={platformCrumb.route}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to {platformCrumb.label}</span>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedGames.map((related) => (
              <GameCard key={related.id} game={related} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
