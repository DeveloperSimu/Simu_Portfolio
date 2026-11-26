import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Braces, Layout, Server, Wrench, type LucideIcon } from 'lucide-react';
import { skillCategories, type SkillCategoryId } from '@/data/skills';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

type SkillFilter = SkillCategoryId | 'all';

const categoryIcons: Record<SkillCategoryId, LucideIcon> = {
  frontend: Layout,
  backend: Server,
  fundamentals: Braces,
  tools: Wrench,
  ai: Brain,
};

const filterOptions: { id: SkillFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...skillCategories.map((category) => ({ id: category.id, label: category.title })),
];

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('all');

  const visibleCategories =
    activeFilter === 'all' ? skillCategories : skillCategories.filter((category) => category.id === activeFilter);

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Skills & Technology"
            title="A technology ecosystem, built piece by piece."
            description="The tools and languages I use to design, build and ship, grouped by how I use them."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <FilterTabs
            options={filterOptions}
            value={activeFilter}
            onChange={setActiveFilter}
            groupLabel="Filter skills by category"
            indicatorId="skill-filter-pill"
          />
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, index) => {
              const Icon = categoryIcons[category.id];
              const isWide = activeFilter === 'all' && index === 0;
              return (
                <motion.article
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'glass group relative overflow-hidden rounded-3xl p-6 transition-colors duration-500 hover:border-violet/40 sm:p-7',
                    isWide && 'md:col-span-2 lg:col-span-2',
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-strong/0 blur-3xl transition-all duration-700 group-hover:bg-violet-strong/25"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-strong/15 text-violet-highlight transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="font-heading text-xs text-fg-muted">
                      {String(category.skills.length).padStart(2, '0')} skills
                    </span>
                  </div>
                  <h3 className="relative mt-6 font-heading text-xl font-semibold text-fg">{category.title}</h3>
                  <p className="relative mt-2 text-sm leading-[1.5] text-fg-muted">{category.description}</p>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-xl border border-white/10 bg-ink/50 px-3 py-1.5 text-xs font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-violet/50 hover:text-violet-highlight"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
