import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback, MetadataRow } from '@/components/ui';
import type { EditorialArticle } from '@/types/marketplace';

interface EditorialCardProps {
  article: EditorialArticle;
}

export function EditorialCard({ article }: EditorialCardProps) {
  const targetRoute =
    article.type === 'review' ? `/reviews/${article.slug}` : `/guides/${article.slug}`;

  return (
    <Link
      to={targetRoute}
      className="surface-card group flex h-full flex-col overflow-hidden p-4 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#94A3B8]/32 motion-reduce:hover:translate-y-0"
    >
      <ImageWithFallback
        src={article.coverImage}
        alt={article.title}
        fallbackTitle={article.title}
        aspectRatioClass="aspect-[4/3]"
      />

      <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <MetadataRow items={[article.category, article.readTime, article.publishedAt]} />
          <h3 className="text-base font-semibold leading-snug text-[#F8FAFC] transition-colors group-hover:text-[#C4B5FD]">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-sm text-[#94A3B8]">{article.summary}</p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
          <span>Read {article.type === 'review' ? 'review' : 'guide'}</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
