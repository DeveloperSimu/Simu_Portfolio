import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-heading text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-violet-strong to-violet-deep px-6 py-3.5 text-fg shadow-glow hover:-translate-y-0.5 hover:shadow-[0_0_56px_rgba(139,92,246,0.55)]',
  secondary:
    'glass px-6 py-3.5 text-fg hover:-translate-y-0.5 hover:border-violet/50 hover:bg-white/[0.08]',
  ghost: 'px-4 py-2.5 text-violet-highlight hover:text-fg',
};

export function buttonStyles(variant: ButtonVariant = 'primary', className?: string): string {
  return cn(base, variants[variant], className);
}
