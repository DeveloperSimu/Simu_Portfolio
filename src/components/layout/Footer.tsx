import { ArrowUp, Mail } from 'lucide-react';
import { navItems, personal, socialLinks } from '@/data/portfolio';
import { Logo } from '@/components/ui/Logo';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { LiveSiteStatus } from './LiveSiteStatus';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-soft px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-2xl font-medium leading-[1.2] text-fg text-balance">
            Designed with curiosity. Built with purpose.
          </p>
          <p className="mt-4 max-w-sm text-sm text-fg-muted">{personal.brandTagline}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow mb-5">Navigate</h2>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-fg-muted transition-colors duration-300 hover:text-violet-highlight"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow mb-5">Connect</h2>
          <ul className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:text-violet-highlight"
                >
                  <SocialIcon id={link.id} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
            {personal.email && (
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:text-violet-highlight"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-white/10 pt-8">
        <LiveSiteStatus />
        <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-muted">
            &copy; {year} {personal.name} ({personal.nickname}). All rights reserved.
          </p>
          <a
            href="#home"
            className="glass group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:text-violet-highlight"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
