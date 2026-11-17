import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { MOBILE_NAV_GROUPS } from '@/data/navigation';
import { MOTION_EASE, TRANSITION_FAST } from '@/design-system/motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
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

          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
            aria-label="Mobile menu"
            className="fixed inset-y-0 right-0 z-10 flex w-full max-w-xs flex-col border-l border-[#94A3B8]/15 bg-[#10121A] shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-[#94A3B8]/12 px-5">
              <span className="font-display text-base font-bold text-[#F8FAFC]">Gaming Deals</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-[10px] text-[#94A3B8] transition-colors hover:bg-[#171A26] hover:text-[#F8FAFC]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex min-h-[44px] w-full items-center gap-3 rounded-[10px] border border-[#94A3B8]/18 bg-[#171A26] px-3.5 text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
              >
                <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Search games, gear &amp; deals</span>
              </button>

              {MOBILE_NAV_GROUPS.map((group) => (
                <div key={group.heading} className="space-y-2">
                  <div className="px-2 text-xs font-medium text-[#64748B]">{group.heading}</div>
                  <ul className="space-y-1">
                    {group.links.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex min-h-[44px] items-center rounded-[8px] px-3 text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-[#8B5CF6]/16 text-[#F8FAFC]'
                                : 'text-[#94A3B8] hover:bg-[#171A26] hover:text-[#F8FAFC]'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
