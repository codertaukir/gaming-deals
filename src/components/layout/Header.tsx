import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, Search } from 'lucide-react';
import { Container } from '@/components/ui';
import { PRIMARY_NAV_ITEMS } from '@/data/navigation';
import { TRANSITION_FAST } from '@/design-system/motion';
import { ROUTES } from '@/router/routes';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#94A3B8]/12 bg-[#08090D]/92 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-8">
          <Link
            to={ROUTES.home}
            className="font-display text-lg font-bold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0"
          >
            Gaming Deals
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            {PRIMARY_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive ? 'text-[#F8FAFC]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="header-nav-indicator"
                        transition={TRANSITION_FAST}
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#8B5CF6]"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] border border-[#94A3B8]/20 bg-[#10121A] px-3.5 text-sm font-medium text-[#F8FAFC] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#94A3B8]/40 hover:bg-[#171A26]"
            >
              <Search className="h-4 w-4 text-[#94A3B8]" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#94A3B8]/20 bg-[#10121A] text-[#F8FAFC] transition-colors duration-150 hover:bg-[#171A26] md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
