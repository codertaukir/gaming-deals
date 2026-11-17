import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitCompareArrows, ShieldCheck } from 'lucide-react';
import { ProductCard } from '@/components/cards';
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
import { HARDWARE_CATALOGUE } from '@/data/hardware';
import { ROUTES } from '@/router/routes';
import type { AvailabilityStatus } from '@/types/marketplace';

const AVAILABILITY_LABELS: Record<
  AvailabilityStatus,
  { label: string; tone: 'verified' | 'cyan' | 'sample' | 'expired' }
> = {
  'digital-key': { label: 'Digital Code', tone: 'cyan' },
  'in-stock': { label: 'In Stock', tone: 'verified' },
  'check-retailer': { label: 'Check Store', tone: 'sample' },
  'out-of-stock': { label: 'Out of Stock', tone: 'expired' },
};

export function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => HARDWARE_CATALOGUE.find((item) => item.slug === slug), [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return HARDWARE_CATALOGUE.filter(
      (candidate) => candidate.id !== product.id && candidate.category === product.category
    ).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <Container className="py-16">
        <SeoHead
          title="Product Not Found"
          description="The requested hardware or accessory product could not be found."
        />
        <EmptyState
          title="Product not found"
          description="This item may have been removed or does not exist in the current sample catalogue."
          actionLabel="Browse Hardware"
          onAction={() => navigate(ROUTES.hardware)}
        />
      </Container>
    );
  }

  const isHardware = product.category === 'hardware';
  const parentRoute = isHardware ? ROUTES.hardware : ROUTES.accessories;
  const parentLabel = isHardware ? 'Gaming Hardware' : 'Gaming Accessories';

  const sortedOffers = [...product.retailers].sort((a, b) => {
    const priceA = a.price ?? Number.MAX_SAFE_INTEGER;
    const priceB = b.price ?? Number.MAX_SAFE_INTEGER;
    return priceA - priceB;
  });

  const bestOffer = sortedOffers[0] ?? null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={product.name}
        description={product.description}
        canonicalPath={`/products/${product.slug}`}
        structuredData={structuredData}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          { label: parentLabel, onClick: () => navigate(parentRoute) },
          { label: product.name },
        ]}
      />

      {/* Contiguous Product Detail Split */}
      <section className="mt-6 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="surface-card p-3 lg:col-span-6">
          <ImageWithFallback
            src={product.image}
            alt={`${product.name} studio photograph`}
            fallbackTitle={product.name}
            aspectRatioClass="aspect-[4/3] lg:h-full"
            priority
          />
        </div>

        <div className="surface-card flex flex-col justify-between gap-6 p-6 sm:p-8 lg:col-span-6">
          <div className="space-y-4">
            <MetadataRow items={[product.brand, parentLabel, 'Sample Catalogue']} />

            <h1 className="text-[clamp(1.85rem,3vw,2.75rem)] font-bold leading-[1.12] text-[#F8FAFC]">
              {product.name}
            </h1>

            <p className="text-base leading-relaxed text-[#94A3B8]">{product.description}</p>

            <div className="grid grid-cols-1 gap-3 border-t border-[#94A3B8]/12 pt-4 sm:grid-cols-2">
              {product.specifications.slice(0, 4).map((spec) => (
                <div key={spec.label} className="rounded-[8px] bg-[#171A26]/65 px-3.5 py-2.5">
                  <div className="text-[11px] font-medium text-[#94A3B8]">{spec.label}</div>
                  <div className="mt-0.5 text-sm font-medium text-[#F8FAFC]">{spec.value}</div>
                </div>
              ))}
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

              <Link
                to={`${ROUTES.compare}?mode=products&items=${encodeURIComponent(product.slug)}`}
              >
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
                Purchases complete on the retailer&apos;s site. All sample prices shown are for
                demonstration only.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Full Technical Specifications Table */}
      <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
        <div>
          <h2 className="text-xl font-semibold text-[#F8FAFC]">Technical Specifications</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Verified hardware specifications for {product.name}.
          </p>
        </div>

        <div className="surface-card overflow-hidden">
          <dl className="divide-y divide-[#94A3B8]/12">
            <div className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-3">
              <dt className="text-sm font-medium text-[#94A3B8]">Brand</dt>
              <dd className="text-sm font-medium text-[#F8FAFC] sm:col-span-2">{product.brand}</dd>
            </div>
            {product.specifications.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-3">
                <dt className="text-sm font-medium text-[#94A3B8]">{spec.label}</dt>
                <dd className="text-sm text-[#F8FAFC] sm:col-span-2">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Retailer Offers */}
      <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
        <div>
          <h2 className="text-xl font-semibold text-[#F8FAFC]">Retailer Offers</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Compare availability and sample pricing across authorized sellers.
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 space-y-5 border-t border-[#94A3B8]/12 pt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#F8FAFC]">Related {parentLabel}</h2>
            <Link
              to={parentRoute}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to {parentLabel}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
