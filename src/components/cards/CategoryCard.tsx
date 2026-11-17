import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { PlatformCategory } from '@/data/categories';

interface CategoryCardProps {
  category: PlatformCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={category.to}
      className="surface-card group flex h-full flex-col justify-between gap-4 p-5 transition-[transform,border-color,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#8B5CF6]/45 hover:bg-[#171A26]/65 motion-reduce:hover:translate-y-0"
    >
      <div className="space-y-2">
        <span className="text-xs font-medium text-[#94A3B8]">{category.itemType}</span>
        <h3 className="text-lg font-semibold text-[#F8FAFC] transition-colors group-hover:text-[#C4B5FD]">
          {category.name}
        </h3>
        <p className="text-sm leading-relaxed text-[#94A3B8]">{category.summary}</p>
      </div>

      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F8FAFC]">
        <span>Explore</span>
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
