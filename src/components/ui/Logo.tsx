import { Hexagon } from 'lucide-react';
import { personal } from '@/data/portfolio';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative flex h-9 w-9 items-center justify-center">
        <Hexagon
          className="absolute inset-0 h-9 w-9 fill-violet-strong/20 stroke-violet transition-transform duration-500 group-hover:rotate-90"
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="font-display text-sm font-semibold text-violet-highlight">S</span>
      </span>
      <span className="font-heading text-lg font-semibold tracking-[0.18em] text-fg">
        {personal.brand}
      </span>
    </span>
  );
}
