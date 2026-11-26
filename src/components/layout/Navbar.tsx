import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu } from 'lucide-react';
import { navItems, personal } from '@/data/portfolio';
import { Logo } from '@/components/ui/Logo';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/cn';
import { MobileMenu } from './MobileMenu';

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav
        aria-label="Primary"
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5',
          scrolled
            ? 'border-white/10 bg-ink/70 shadow-glass backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <a href="#home" aria-label="Simu, back to top" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-3.5 py-2 font-heading text-sm transition-colors duration-300',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-violet/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={personal.resumeUrl}
            download
            className={buttonStyles('secondary', 'hidden !px-5 !py-2.5 text-xs md:inline-flex')}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg xl:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} activeId={activeId} onClose={closeMenu} />
    </header>
  );
}
