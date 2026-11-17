import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-[8px] border border-[#94A3B8]/18 bg-[#10121A] px-2.5 text-sm text-[#94A3B8] transition-colors hover:border-[#94A3B8]/35 hover:text-[#F8FAFC] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-[8px] border px-3 font-mono text-xs font-medium tabular-nums transition-colors ${
              isCurrent
                ? 'border-[#8B5CF6] bg-[#8B5CF6] text-[#F8FAFC]'
                : 'border-[#94A3B8]/18 bg-[#10121A] text-[#94A3B8] hover:border-[#94A3B8]/35 hover:text-[#F8FAFC]'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-[8px] border border-[#94A3B8]/18 bg-[#10121A] px-2.5 text-sm text-[#94A3B8] transition-colors hover:border-[#94A3B8]/35 hover:text-[#F8FAFC] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
