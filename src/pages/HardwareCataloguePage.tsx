import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GitCompareArrows, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/cards';
import { SearchBar } from '@/components/filters/SearchBar';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Button,
  Container,
  Dropdown,
  EmptyState,
  MetadataRow,
  Pagination,
  type DropdownOption,
} from '@/components/ui';
import { HARDWARE_CATALOGUE } from '@/data/hardware';
import { ROUTES } from '@/router/routes';
import type { ProductCategory } from '@/types/marketplace';
import {
  filterAndSortProducts,
  getUniqueProductBrands,
  type ProductSortOption,
} from '@/utils/productFilters';

type HardwareVariant = 'accessories' | 'hardware';

interface VariantConfig {
  title: string;
  description: string;
  canonicalPath: string;
  category: ProductCategory;
  subtitle: string;
}

const VARIANT_CONFIGS: Record<HardwareVariant, VariantConfig> = {
  accessories: {
    title: 'Gaming Accessories',
    description:
      'Compare low-latency wireless headsets, Hall-effect controllers, gasket keyboards, and ultralight esports mice across authorized partners.',
    canonicalPath: ROUTES.accessories,
    category: 'accessory',
    subtitle: 'Peripherals & Audio (Sample Catalogue)',
  },
  hardware: {
    title: 'Gaming Hardware',
    description:
      'Explore 240Hz OLED monitors, ultrawide QD-OLED displays, PCIe Gen4 SSDs, and portable gaming systems with full specifications.',
    canonicalPath: ROUTES.hardware,
    category: 'hardware',
    subtitle: 'Displays, Storage & Systems (Sample Catalogue)',
  },
};

const SORT_OPTIONS: readonly DropdownOption[] = [
  { value: 'featured', label: 'Featured gear' },
  { value: 'discount-desc', label: 'Biggest sample discount' },
  { value: 'price-asc', label: 'Sample price: Low to high' },
  { value: 'price-desc', label: 'Sample price: High to low' },
];

const PAGE_SIZE = 6;

interface HardwareCataloguePageProps {
  variant: HardwareVariant;
}

export function HardwareCataloguePage({ variant }: HardwareCataloguePageProps) {
  const config = VARIANT_CONFIGS[variant];
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [dealsOnly, setDealsOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ProductSortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryProducts = useMemo(
    () => HARDWARE_CATALOGUE.filter((item) => item.category === config.category),
    [config.category]
  );

  const availableBrands = useMemo(
    () => getUniqueProductBrands(categoryProducts),
    [categoryProducts]
  );

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(HARDWARE_CATALOGUE, {
        query,
        category: config.category,
        brand: selectedBrand,
        dealsOnly,
        sortBy,
      }),
    [query, config.category, selectedBrand, dealsOnly, sortBy]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const hasActiveFilters = query.trim().length > 0 || selectedBrand !== 'all' || dealsOnly;

  function handleResetFilters() {
    setQuery('');
    setSelectedBrand('all');
    setDealsOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
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

      <div className="mt-5 flex flex-col justify-between gap-6 border-b border-[#94A3B8]/12 pb-7 lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-3">
          <MetadataRow items={[config.subtitle, 'Technical Specs Included']} />
          <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
            {config.title}
          </h1>
          <p className="text-base text-[#94A3B8]">{config.description}</p>
        </div>

        <Link to={`${ROUTES.compare}?mode=products`} className="shrink-0">
          <Button
            variant="secondary"
            leftIcon={<GitCompareArrows className="h-4 w-4" aria-hidden="true" />}
          >
            Compare gear
          </Button>
        </Link>
      </div>

      <div className="mt-8 space-y-8">
        <div className="surface-card space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchBar
              value={query}
              onChange={(val) => {
                setQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search models, specs, or brands..."
              className="lg:max-w-md"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={dealsOnly}
                onClick={() => {
                  setDealsOnly((prev) => !prev);
                  setCurrentPage(1);
                }}
                className={`min-h-[42px] rounded-[10px] border px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  dealsOnly
                    ? 'border-[#22D3EE]/50 bg-[#22D3EE]/12 text-[#67E8F9]'
                    : 'border-[#94A3B8]/20 bg-[#08090D] text-[#94A3B8] hover:border-[#94A3B8]/38 hover:text-[#F8FAFC]'
                }`}
              >
                Discounted only
              </button>

              <Dropdown
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(val) => {
                  setSortBy(val as ProductSortOption);
                  setCurrentPage(1);
                }}
                ariaLabel="Sort products"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-[#94A3B8]/12 pt-3.5 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand('all');
                  setCurrentPage(1);
                }}
                className={`min-h-[34px] rounded-[8px] px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedBrand === 'all'
                    ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                    : 'bg-[#171A26]/70 text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                All brands
              </button>
              {availableBrands.map((brand) => {
                const active = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(brand);
                      setCurrentPage(1);
                    }}
                    className={`min-h-[34px] rounded-[8px] px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                      active
                        ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                        : 'bg-[#171A26]/70 text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs tabular-nums text-[#94A3B8]">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-xs font-medium text-[#22D3EE] transition-colors hover:bg-[#171A26]"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
            title="No matching hardware or accessories"
            description="Adjust your search query or brand filters to view available listings."
            actionLabel="Reset all filters"
            onAction={handleResetFilters}
            icon={<SlidersHorizontal className="h-5 w-5" aria-hidden="true" />}
          />
        )}
      </div>
    </Container>
  );
}
