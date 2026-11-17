import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback, MetadataRow, PriceDisplay } from '@/components/ui';
import type { Product } from '@/types/marketplace';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryOffer = product.retailers[0] ?? null;
  const categoryLabel =
    product.category === 'hardware'
      ? 'Hardware'
      : product.category === 'gift-card'
        ? 'Gift Card'
        : 'Accessory';
  const keySpec = product.specifications[0]
    ? `${product.specifications[0].label}: ${product.specifications[0].value}`
    : undefined;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="surface-card group flex h-full flex-col overflow-hidden p-4 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#94A3B8]/32 motion-reduce:hover:translate-y-0"
    >
      <ImageWithFallback
        src={product.image}
        alt={`${product.name} product preview`}
        fallbackTitle={product.name}
        aspectRatioClass="aspect-[4/3]"
      />

      <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <MetadataRow items={[product.brand, categoryLabel]} />
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#F8FAFC] transition-colors group-hover:text-[#C4B5FD]">
            {product.name}
          </h3>
          {keySpec && <p className="text-xs text-[#94A3B8]">{keySpec}</p>}
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-[#94A3B8]/10 pt-3">
          <PriceDisplay
            amount={primaryOffer?.price ?? null}
            originalAmount={primaryOffer?.originalPrice}
            currency={primaryOffer?.currency ?? 'INR'}
            isSample={primaryOffer?.isSampleData ?? true}
            size="sm"
          />
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
            Specs
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
