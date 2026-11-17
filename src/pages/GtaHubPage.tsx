import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { DealCard, GameCard } from '@/components/cards';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Button,
  Container,
  ImageWithFallback,
  MetadataRow,
  PriceDisplay,
} from '@/components/ui';
import { MEDIA_ASSETS } from '@/config/assets';
import { DEALS_CATALOGUE } from '@/data/deals';
import { GAMES_CATALOGUE } from '@/data/games';
import { ROUTES } from '@/router/routes';

const PLATFORM_EDITIONS = [
  {
    platform: 'PC (Steam / Rockstar Launcher)',
    edition: 'Grand Theft Auto V: Enhanced Edition',
    notes: 'Unlocked frame rates, ultrawide monitor support, and GTA Online included.',
    samplePrice: 1249,
    originalPrice: 2499,
    storeUrl: 'https://store.steampowered.com/',
  },
  {
    platform: 'PlayStation 5',
    edition: 'GTA V (PS5) + GTA Online',
    notes: '4K/60fps Fidelity & Performance RT modes with DualSense adaptive triggers.',
    samplePrice: 1599,
    originalPrice: 2999,
    storeUrl: 'https://store.playstation.com/',
  },
  {
    platform: 'Xbox Series X|S',
    edition: 'GTA V (Series X|S) + GTA Online',
    notes: 'Ray-traced shadows, fast SSD switching, and Smart Delivery store editions.',
    samplePrice: 1499,
    originalPrice: 2999,
    storeUrl: 'https://www.xbox.com/',
  },
] as const;

export function GtaHubPage() {
  const navigate = useNavigate();

  const gtaRelatedGames = useMemo(
    () =>
      GAMES_CATALOGUE.filter(
        (game) => game.genres.includes('Open World') || game.slug.includes('grand-theft-auto')
      ).slice(0, 3),
    []
  );

  const gtaDeals = useMemo(
    () =>
      DEALS_CATALOGUE.filter(
        (deal) =>
          !deal.isExpired &&
          (deal.title.toLowerCase().includes('grand theft auto') || deal.category === 'gift-card')
      ).slice(0, 2),
    []
  );

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title="GTA Gaming Hub"
        description="Dedicated Grand Theft Auto editions, platform breakdowns, authorized top-ups, and open-world deals across PC, PS5, and Xbox."
        canonicalPath={ROUTES.gtaHub}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          { label: 'GTA Gaming Hub' },
        ]}
      />

      {/* Hub Hero */}
      <section className="mt-6 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="surface-card flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-6">
          <div className="space-y-4">
            <MetadataRow items={['Special Hub', 'PC · PS5 · Xbox', 'Sample Editions']} />
            <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
              GTA Gaming Hub
            </h1>
            <p className="text-base leading-relaxed text-[#94A3B8]">
              Compare Grand Theft Auto V editions across PC, PlayStation 5, and Xbox Series X|S,
              verify official storefront wallet top-ups, and explore similar open-world titles.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/games/grand-theft-auto-v-enhanced">
              <Button
                variant="primary"
                rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                View GTA V Offers
              </Button>
            </Link>
            <Link to={`${ROUTES.deals}?tab=gift-cards`}>
              <Button variant="secondary">Official Top-Ups</Button>
            </Link>
          </div>
        </div>

        <div className="surface-card p-3 lg:col-span-6">
          <ImageWithFallback
            src={MEDIA_ASSETS.gameCoastalCrime}
            alt="Coastal boulevard grand touring scene representing open-world GTA hub"
            aspectRatioClass="aspect-[4/3] lg:h-full"
            priority
          />
        </div>
      </section>

      {/* Platform Edition Comparison */}
      <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
        <div>
          <h2 className="text-xl font-semibold text-[#F8FAFC]">
            Platform Editions &amp; Sample Pricing
          </h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Side-by-side overview of current-generation features across official storefronts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PLATFORM_EDITIONS.map((item) => (
            <article
              key={item.platform}
              className="surface-card flex flex-col justify-between gap-4 p-5"
            >
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#22D3EE]">{item.platform}</span>
                <h3 className="text-base font-semibold text-[#F8FAFC]">{item.edition}</h3>
                <p className="text-sm text-[#94A3B8]">{item.notes}</p>
              </div>

              <div className="space-y-3 border-t border-[#94A3B8]/10 pt-3.5">
                <PriceDisplay
                  amount={item.samplePrice}
                  originalAmount={item.originalPrice}
                  currency="INR"
                  isSample
                  size="md"
                />
                <a
                  href={item.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#171A26] px-3.5 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:bg-[#8B5CF6]"
                >
                  <span>Check official store</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Matching Deals & Gift Cards */}
      {gtaDeals.length > 0 && (
        <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#F8FAFC]">
              Related Offers &amp; Official Wallet Top-Ups
            </h2>
            <Link to={ROUTES.deals} className="text-sm font-medium text-[#22D3EE] hover:underline">
              All deals
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {gtaDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}

      {/* Open-World Alternatives */}
      <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
        <h2 className="text-xl font-semibold text-[#F8FAFC]">Open-World &amp; Crime Titles</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gtaRelatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <div className="mt-10 flex items-start gap-3 rounded-[14px] border border-[#94A3B8]/15 bg-[#10121A] p-5 text-xs text-[#94A3B8]">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
        <p>
          Buy GTA editions and Shark Cards exclusively through authorized first-party digital stores
          to avoid account suspension risks.
        </p>
      </div>
    </Container>
  );
}
