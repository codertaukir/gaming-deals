import type { Product, ProductCategory } from '@/types/marketplace';

export type ProductSortOption = 'featured' | 'discount-desc' | 'price-asc' | 'price-desc';

export interface ProductFilterCriteria {
  query: string;
  category?: ProductCategory;
  brand: string;
  dealsOnly: boolean;
  sortBy: ProductSortOption;
}

export function getLowestProductPrice(product: Product): number | null {
  let lowest: number | null = null;
  for (const offer of product.retailers) {
    if (offer.price === null) continue;
    if (lowest === null || offer.price < lowest) {
      lowest = offer.price;
    }
  }
  return lowest;
}

export function getMaxProductDiscountPercent(product: Product): number {
  let maxDiscount = 0;
  for (const offer of product.retailers) {
    if (
      offer.price !== null &&
      typeof offer.originalPrice === 'number' &&
      offer.originalPrice > offer.price &&
      offer.originalPrice > 0
    ) {
      const pct = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
      if (pct > maxDiscount) {
        maxDiscount = pct;
      }
    }
  }
  return maxDiscount;
}

export function getUniqueProductBrands(products: readonly Product[]): string[] {
  const brandSet = new Set<string>();
  for (const product of products) {
    brandSet.add(product.brand);
  }
  return Array.from(brandSet).sort((a, b) => a.localeCompare(b));
}

export function filterAndSortProducts(
  products: readonly Product[],
  criteria: ProductFilterCriteria
): Product[] {
  const normalizedQuery = criteria.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (criteria.category && product.category !== criteria.category) {
      return false;
    }

    if (criteria.brand !== 'all' && product.brand !== criteria.brand) {
      return false;
    }

    if (criteria.dealsOnly && getMaxProductDiscountPercent(product) === 0) {
      return false;
    }

    if (normalizedQuery) {
      const specText = product.specifications.map((s) => `${s.label} ${s.value}`).join(' ');
      const haystack =
        `${product.name} ${product.brand} ${product.description} ${specText}`.toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (criteria.sortBy) {
      case 'discount-desc':
        return getMaxProductDiscountPercent(b) - getMaxProductDiscountPercent(a);
      case 'price-asc': {
        const priceA = getLowestProductPrice(a) ?? Number.MAX_SAFE_INTEGER;
        const priceB = getLowestProductPrice(b) ?? Number.MAX_SAFE_INTEGER;
        return priceA - priceB;
      }
      case 'price-desc': {
        const priceA = getLowestProductPrice(a) ?? -1;
        const priceB = getLowestProductPrice(b) ?? -1;
        return priceB - priceA;
      }
      case 'featured':
      default:
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
  });
}
