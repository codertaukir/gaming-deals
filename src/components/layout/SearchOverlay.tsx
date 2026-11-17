import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { QUICK_SEARCH_DESTINATIONS } from '@/data/navigation';
import { ROUTES } from '@/router/routes';
import { modalPanelVariants, TRANSITION_FAST } from '@/design-system/motion';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredDestinations = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return QUICK_SEARCH_DESTINATIONS.slice(0, 6);
    }
    return QUICK_SEARCH_DESTINATIONS.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        item.keywords.some((keyword) => keyword.includes(normalized))
    );
  }, [query]);

  function handleSearchSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    onClose();
    if (trimmed) {
      navigate(`${ROUTES.search}?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate(ROUTES.search);
    }
    setQuery('');
  }

  function handleNavigate(to: string) {
    onClose();
    setQuery('');
    navigate(to);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Search Gaming Deals"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION_FAST}
            onClick={onClose}
            className="fixed inset-0 bg-[#08090D]/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            variants={modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="surface-elevated relative z-10 w-full max-w-2xl overflow-hidden"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 border-b border-[#94A3B8]/12 px-4 py-3"
            >
              <Search className="h-4 w-4 shrink-0 text-[#94A3B8]" aria-hidden="true" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search PC games, PlayStation, hardware, or deals..."
                aria-label="Search games, hardware, or deals"
                className="min-h-[40px] w-full bg-transparent text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-[#94A3B8] transition-colors hover:bg-[#10121A] hover:text-[#F8FAFC]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              <div className="px-2.5 pb-2 text-xs font-medium text-[#64748B]">
                {query.trim() ? 'Matching destinations' : 'Quick destinations'}
              </div>

              {filteredDestinations.length > 0 ? (
                <ul className="space-y-1">
                  {filteredDestinations.map((item) => (
                    <li key={item.to}>
                      <button
                        type="button"
                        onClick={() => handleNavigate(item.to)}
                        className="flex min-h-[44px] w-full items-center justify-between gap-4 rounded-[8px] px-3 py-2 text-left transition-colors hover:bg-[#10121A]"
                      >
                        <span className="text-sm font-medium text-[#F8FAFC]">{item.label}</span>
                        <span className="flex items-center gap-2 text-xs text-[#94A3B8]">
                          <span>{item.category}</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-6 text-center text-sm text-[#94A3B8]">
                  Press Enter to search the catalogue for &ldquo;{query.trim()}&rdquo;.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#94A3B8]/12 bg-[#10121A] px-4 py-2.5 text-xs text-[#94A3B8]">
              <span>Press Enter to open full search results</span>
              <button
                type="button"
                onClick={() => handleNavigate(ROUTES.search)}
                className="font-medium text-[#22D3EE] hover:underline"
              >
                Open search page
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
