import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface FilterOption<T extends string> {
  id: T;
  label: string;
}

interface FilterTabsProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  groupLabel: string;
  indicatorId: string;
}

export function FilterTabs<T extends string>({ options, value, onChange, groupLabel, indicatorId }: FilterTabsProps<T>) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const isActive = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative shrink-0 rounded-full px-4 py-2 font-heading text-sm transition-colors duration-300',
              isActive ? 'text-ink' : 'glass text-fg-muted hover:text-fg',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={indicatorId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-highlight to-violet"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
