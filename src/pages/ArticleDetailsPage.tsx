import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { EditorialCard } from '@/components/cards';
import { SeoHead } from '@/components/seo/SeoHead';
import {
  Breadcrumbs,
  Container,
  EmptyState,
  ImageWithFallback,
  MetadataRow,
} from '@/components/ui';
import { EDITORIAL_ARTICLES } from '@/data/editorial';
import { ROUTES } from '@/router/routes';

interface ArticleDetailsPageProps {
  expectedType: 'review' | 'guide';
}

export function ArticleDetailsPage({ expectedType }: ArticleDetailsPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = useMemo(
    () => EDITORIAL_ARTICLES.find((item) => item.slug === slug && item.type === expectedType),
    [slug, expectedType]
  );

  const moreArticles = useMemo(() => {
    if (!article) return [];
    return EDITORIAL_ARTICLES.filter((item) => item.id !== article.id).slice(0, 3);
  }, [article]);

  const parentRoute = expectedType === 'review' ? ROUTES.reviews : ROUTES.guides;
  const parentLabel = expectedType === 'review' ? 'Reviews' : 'Guides';

  if (!article) {
    return (
      <Container className="py-16">
        <SeoHead
          title="Article Not Found"
          description="The requested review or guide could not be found."
        />
        <EmptyState
          title="Article not found"
          description="This editorial piece may have moved or is not available."
          actionLabel={`Back to ${parentLabel}`}
          onAction={() => navigate(parentRoute)}
        />
      </Container>
    );
  }

  const canonicalPath =
    expectedType === 'review' ? `/reviews/${article.slug}` : `/guides/${article.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Gaming Deals',
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <SeoHead
        title={article.title}
        description={article.summary}
        canonicalPath={canonicalPath}
        ogType="article"
        structuredData={structuredData}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate(ROUTES.home) },
          { label: parentLabel, onClick: () => navigate(parentRoute) },
          { label: article.title },
        ]}
      />

      <article className="mx-auto mt-8 max-w-3xl">
        <header className="space-y-4">
          <MetadataRow items={[article.category, article.publishedAt, article.readTime]} />
          <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.12] text-[#F8FAFC]">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-[#94A3B8]">{article.summary}</p>
        </header>

        <div className="mt-7 surface-card p-2">
          <ImageWithFallback
            src={article.coverImage}
            alt={article.title}
            aspectRatioClass="aspect-[16/9]"
            priority
          />
        </div>

        {/* Key Takeaways */}
        <section className="surface-card mt-8 space-y-3 p-6">
          <h2 className="text-base font-semibold text-[#F8FAFC]">Key Takeaways</h2>
          <ul className="space-y-2.5">
            {article.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#22D3EE]"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Long-form Sections */}
        <div className="mt-10 space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">{section.heading}</h2>
              <p className="text-base leading-[1.75] text-[#94A3B8]">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 border-t border-[#94A3B8]/12 pt-6">
          <Link
            to={parentRoute}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#22D3EE] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to all {parentLabel.toLowerCase()}</span>
          </Link>
        </div>
      </article>

      {moreArticles.length > 0 && (
        <section className="mt-14 space-y-6 border-t border-[#94A3B8]/12 pt-10">
          <h2 className="text-xl font-semibold text-[#F8FAFC]">More Reviews &amp; Guides</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((item) => (
              <EditorialCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
