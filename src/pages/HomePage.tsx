import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { CategoryCard, DealCard, EditorialCard, GameCard, ProductCard } from '@/components/cards';
import { RevealSection } from '@/components/motion/RevealSection';
import { SeoHead } from '@/components/seo/SeoHead';
import { Button, Container, ImageWithFallback, MetadataRow } from '@/components/ui';
import { MEDIA_ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { GAMING_PLATFORMS, POPULAR_CATEGORIES } from '@/data/categories';
import { DEALS_CATALOGUE } from '@/data/deals';
import { EDITORIAL_ARTICLES } from '@/data/editorial';
import { GAMES_CATALOGUE } from '@/data/games';
import { HARDWARE_CATALOGUE } from '@/data/hardware';
import { fadeSlideUp, MOTION_EASE, staggerContainer } from '@/design-system/motion';
import { ROUTES } from '@/router/routes';

type GameShelfTab = 'featured' | 'trending';
type DirectoryTab = 'platforms' | 'categories';

export function HomePage() {
  const [gameTab, setGameTab] = useState<GameShelfTab>('featured');
  const [directoryTab, setDirectoryTab] = useState<DirectoryTab>('platforms');
  const prefersReducedMotion = useReducedMotion();

  const visibleGames = useMemo(() => {
    const filtered = GAMES_CATALOGUE.filter((game) =>
      gameTab === 'featured' ? Boolean(game.featured) : Boolean(game.trending)
    );
    return filtered.slice(0, 3);
  }, [gameTab]);

  const directoryItems = directoryTab === 'platforms' ? GAMING_PLATFORMS : POPULAR_CATEGORIES;
  const activeDeals = useMemo(
    () => DEALS_CATALOGUE.filter((deal) => !deal.isExpired).slice(0, 4),
    []
  );
  const featuredProducts = useMemo(() => HARDWARE_CATALOGUE.slice(0, 3), []);
  const featuredEditorial = useMemo(() => EDITORIAL_ARTICLES.slice(0, 3), []);

  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  };

  return (
    <div>
      <SeoHead
        title={`${SITE_CONFIG.name} – ${SITE_CONFIG.tagline}`}
        description={SITE_CONFIG.description}
        canonicalPath={ROUTES.home}
        structuredData={homeStructuredData}
      />

      {/* Hero Section */}
      <section className="ambient-hero-glow border-b border-[#94A3B8]/12 py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.div
              variants={fadeSlideUp}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              className="flex flex-col justify-between gap-8 lg:col-span-6"
            >
              <div className="space-y-5">
                <MetadataRow
                  items={['PC, Console & Mobile', 'India & Global Retailers', 'Sample Catalogue']}
                />

                <h1 className="max-w-xl text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.06] text-[#F8FAFC]">
                  Discover verified gaming deals without store clutter.
                </h1>

                <p className="max-w-lg text-base leading-relaxed text-[#94A3B8]">
                  Compare games, hardware, accessories, and official top-ups across authorized
                  retailers. Gaming Deals helps you research offers before checking out on trusted
                  partner stores.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link to={ROUTES.deals}>
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    >
                      Explore Deals
                    </Button>
                  </Link>
                  <Link to={ROUTES.hardware}>
                    <Button variant="secondary" size="lg">
                      Browse Hardware
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#94A3B8]/12 pt-5 text-xs text-[#94A3B8]">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#22D3EE]"
                  aria-hidden="true"
                />
                <p>
                  Affiliate disclosure: Some outbound links may earn a commission at no extra cost
                  to you. Listed prices during this preview are marked as sample data.{' '}
                  <Link to={ROUTES.affiliateDisclosure} className="text-[#F8FAFC] underline">
                    Read disclosure
                  </Link>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: MOTION_EASE }}
              className="surface-card relative overflow-hidden p-2 lg:col-span-6"
            >
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-[10px]">
                <ImageWithFallback
                  src={MEDIA_ASSETS.heroGamingSetup}
                  alt="Flagship PC and console gaming desk setup with OLED display and mechanical keyboard"
                  aspectRatioClass="aspect-[16/9] lg:h-full"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D]/85 via-[#08090D]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5">
                  <div>
                    <div className="text-xs font-medium text-[#94A3B8]">Spotlight Hub</div>
                    <div className="mt-0.5 font-display text-lg font-semibold text-[#F8FAFC]">
                      2026 OLED Monitors &amp; GTA Hub
                    </div>
                  </div>
                  <Link
                    to={ROUTES.gtaHub}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[8px] border border-[#94A3B8]/25 bg-[#10121A]/90 px-3.5 py-2 text-xs font-medium text-[#F8FAFC] whitespace-nowrap transition-colors hover:border-[#8B5CF6]/60 hover:bg-[#171A26]"
                  >
                    <span>Open GTA Hub</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Platforms & Categories Directory */}
      <section className="py-14 lg:py-16">
        <Container className="space-y-7">
          <div className="flex flex-col justify-between gap-4 border-b border-[#94A3B8]/12 pb-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">
                Browse by Platform &amp; Category
              </h2>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Jump directly into curated catalogues across desktop, console, mobile, and gear.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Browse platforms or categories"
              className="inline-flex rounded-[10px] border border-[#94A3B8]/15 bg-[#10121A] p-1 self-start sm:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={directoryTab === 'platforms'}
                onClick={() => setDirectoryTab('platforms')}
                className={`min-h-[38px] rounded-[7px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  directoryTab === 'platforms'
                    ? 'bg-[#171A26] text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                Platforms
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={directoryTab === 'categories'}
                onClick={() => setDirectoryTab('categories')}
                className={`min-h-[38px] rounded-[7px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  directoryTab === 'categories'
                    ? 'bg-[#171A26] text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                Gear &amp; Hubs
              </button>
            </div>
          </div>

          {prefersReducedMotion ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {directoryItems.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <motion.div
              key={directoryTab}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {directoryItems.map((category) => (
                <motion.div key={category.id} variants={fadeSlideUp}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* Featured & Trending Games */}
      <section className="border-t border-[#94A3B8]/12 py-14 lg:py-16">
        <RevealSection>
          <Container className="space-y-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-[#F8FAFC]">
                  {gameTab === 'featured' ? 'Featured Games' : 'Trending Releases'}
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Cross-platform digital editions with transparent sample pricing comparisons.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="tablist"
                  aria-label="Game collection filter"
                  className="inline-flex rounded-[10px] border border-[#94A3B8]/15 bg-[#10121A] p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={gameTab === 'featured'}
                    onClick={() => setGameTab('featured')}
                    className={`min-h-[38px] rounded-[7px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                      gameTab === 'featured'
                        ? 'bg-[#171A26] text-[#F8FAFC]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Featured
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={gameTab === 'trending'}
                    onClick={() => setGameTab('trending')}
                    className={`min-h-[38px] rounded-[7px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                      gameTab === 'trending'
                        ? 'bg-[#171A26] text-[#F8FAFC]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Trending
                  </button>
                </div>

                <Link
                  to={ROUTES.pcGames}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] whitespace-nowrap hover:underline"
                >
                  <span>All catalogues</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </Container>
        </RevealSection>
      </section>

      {/* Latest Sample Deals & Coupons */}
      <section className="border-t border-[#94A3B8]/12 py-14 lg:py-16">
        <RevealSection>
          <Container className="space-y-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-[#F8FAFC]">
                  Latest Deals, Coupons &amp; Top-Ups
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Demonstration offers with copyable sample promo codes and expiration dates.
                </p>
              </div>
              <Link
                to={ROUTES.deals}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] whitespace-nowrap hover:underline"
              >
                <span>View all deals</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {activeDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </Container>
        </RevealSection>
      </section>

      {/* Accessories & Gaming Hardware */}
      <section className="border-t border-[#94A3B8]/12 py-14 lg:py-16">
        <RevealSection>
          <Container className="space-y-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-[#F8FAFC]">
                  Accessories &amp; Gaming Hardware
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Displays, headsets, and zero-drift controllers with side-by-side specification
                  tables.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={ROUTES.accessories}
                  className="text-sm font-medium text-[#94A3B8] whitespace-nowrap hover:text-[#F8FAFC]"
                >
                  Accessories
                </Link>
                <Link
                  to={ROUTES.compare}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] whitespace-nowrap hover:underline"
                >
                  <span>Compare gear</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </RevealSection>
      </section>

      {/* Editorial Reviews & Buying Guides */}
      <section className="border-t border-[#94A3B8]/12 py-14 lg:py-16">
        <RevealSection>
          <Container className="space-y-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-[#F8FAFC]">
                  Reviews &amp; Buying Guides
                </h2>
                <p className="mt-1 text-sm text-[#94A3B8]">
                  Practical hardware breakdowns and store safety guides for smarter purchasing.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={ROUTES.reviews}
                  className="text-sm font-medium text-[#94A3B8] whitespace-nowrap hover:text-[#F8FAFC]"
                >
                  Reviews
                </Link>
                <Link
                  to={ROUTES.guides}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#22D3EE] whitespace-nowrap hover:underline"
                >
                  <span>All guides</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEditorial.map((article) => (
                <EditorialCard key={article.id} article={article} />
              ))}
            </div>
          </Container>
        </RevealSection>
      </section>

      {/* Bottom CTA Band */}
      <section className="border-t border-[#94A3B8]/12 py-14">
        <RevealSection>
          <Container>
            <div className="surface-card flex flex-col items-start justify-between gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-xl font-semibold text-[#F8FAFC] sm:text-2xl">
                  Ready to compare games or hardware across authorized stores?
                </h2>
                <p className="text-sm text-[#94A3B8]">
                  Search by title, filter by platform, or read how Gaming Deals maintains
                  transparent affiliate partnerships.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link to={ROUTES.search}>
                  <Button variant="primary">Search Catalogue</Button>
                </Link>
                <Link to={ROUTES.affiliateDisclosure}>
                  <Button variant="outline">Affiliate Policy</Button>
                </Link>
              </div>
            </div>
          </Container>
        </RevealSection>
      </section>
    </div>
  );
}
