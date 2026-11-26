import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { navItems, personal, socialLinks } from '@/data/portfolio';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn } from '@/lib/cn';

interface MobileMenuProps {
  open: boolean;
  activeId: string;
  onClose: () => void;
}

export function MobileMenu({ open, activeId, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-2xl xl:hidden"
          initial={{ opacity: 0, clipPath: 'circle(0px at 100% 0%)' }}
          animate={{
            opacity: 1,
            clipPath: 'circle(150% at 100% 0%)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            clipPath: 'circle(0px at 100% 0%)',
            transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <div className="flex items-center justify-end px-5 pt-5 sm:px-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg transition-transform duration-300 hover:rotate-90"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.25 + index * 0.06, duration: 0.5 } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={activeId === item.id ? 'true' : undefined}
                    className={cn(
                      'group flex items-baseline gap-4 py-2 font-display text-4xl font-medium transition-colors duration-300 sm:text-5xl',
                      activeId === item.id ? 'text-violet-highlight' : 'text-fg hover:text-violet-highlight',
                    )}
                  >
                    <span className="font-heading text-xs text-fg-muted">0{index + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6 px-8 pb-10">
            <a
              href={personal.resumeUrl}
              download
              onClick={onClose}
              className={buttonStyles('primary', 'w-full')}
            >
              Download Resume
            </a>
            <ul className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors duration-300 hover:text-violet-highlight"
                  >
                    <SocialIcon id={link.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
