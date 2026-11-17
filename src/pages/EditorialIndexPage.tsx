import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { EditorialCard } from '@/components/cards';
import { SearchBar } from '@/components/filters/SearchBar';
import { SeoHead } from '@/components/seo/SeoHead';
import { Breadcrumbs, Container, EmptyState, MetadataRow } from '@/components/ui';
import { EDITORIAL_ARTICLES } from '@/data/editorial';
import { ROUTES } from '@/router/routes';

type EditorialVariant = 'reviews' | 'guides';

interface EditorialIndexPageProps {
  variant: EditorialVariant;
}

export function EditorialIndexPage({ variant }: EditorialIndexPageProps) {
  const navigate = useNavigate();
  const isReviews = variant === 'reviews';

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const baseArticles = useMemo(
    () =>
      EDITORIAL_ARTICLES.filter((article) =>
        isReviews ? article.type === 'review' : article.type === 'guide'
      ),
    [isReviews]
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of baseArticles) {
      set.add(item.category);
    }
    return Array.from(set);
  }, [baseArticles]);

  const filteredArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return baseArticles.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (normalized) {
        const haystack = `${article.title} ${article.summary} ${article.category}`.toLowerCase();
        if (!haystack.includes(normalized)) return false;
      }
      return true;
    });
  }, [baseArticles, selectedCategory, query]);

  const pageTitle = isReviews ? 'Editorial Reviews & Impressions' : 'Gaming & Buying Guides';
  const pageDescription = isReviews
    ? 'Hands-on hardware evaluations and qualitative game impressions without fabricated numeric scores.'
    : 'Practical buying guides and buyer-safety walkthroughs for monitors, controllers, SSDs, and authorized digital stores.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDescription,
  };

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        canonicalPath={isReviews ? ROUTES.reviews : ROUTES.guides}
        structuredData={structuredData}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          { label: isReviews ? 'Reviews' : 'Guides' },
        ]}
      />

      <div className="mt-5 space-y-3 border-b border-[#94A3B8]/12 pb-7">
        <MetadataRow
          items={[
            isReviews ? 'Qualitative Evaluations' : 'Buying & Gaming Guides',
            'Independent Editorial',
          ]}
        />
        <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#F8FAFC]">
          {pageTitle}
        </h1>
        <p className="max-w-2xl text-base text-[#94A3B8]">{pageDescription}</p>
      </div>

      <div className="surface-card mt-8 flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[36px] rounded-[8px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                : 'bg-[#08090D] text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            All {isReviews ? 'reviews' : 'guides'}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[36px] rounded-[8px] px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#8B5CF6] text-[#F8FAFC]'
                  : 'bg-[#08090D] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={`Search ${isReviews ? 'reviews' : 'guides'}...`}
          className="lg:max-w-xs"
        />
      </div>

      <div className="mt-8">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <EditorialCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching articles found"
            description="Clear your search term or category filter to view all editorial articles."
            actionLabel="Reset filters"
            onAction={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
          />
        )}
      </div>
    </Container>
  );
}
