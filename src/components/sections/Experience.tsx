import { GraduationCap, Sparkles } from 'lucide-react';
import { journeyEntries } from '@/data/journey';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Experience & Learning Journey"
            title="Education, practice and continuous growth."
            description="How I got here: the academic foundation, the skills I built along the way, and the projects that brought them together."
          />
        </Reveal>

        <ol className="relative mt-20 space-y-10 before:absolute before:bottom-2 before:left-[18px] before:top-2 before:w-px before:bg-gradient-to-b before:from-violet-strong before:via-violet/30 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
          {journeyEntries.map((entry, index) => {
            const isRight = index % 2 === 1;
            const isEducation = entry.kind === 'education';
            const Icon = isEducation ? GraduationCap : Sparkles;

            return (
              <li
                key={entry.id}
                className={cn(
                  'relative pl-12 md:w-1/2 md:pl-0',
                  isRight ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-violet/50 bg-ink text-violet-highlight shadow-glow md:top-8',
                    isRight
                      ? 'md:left-0 md:-translate-x-1/2'
                      : 'md:left-auto md:right-0 md:translate-x-1/2',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <Reveal>
                  <article className="glass group rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-violet/40 sm:p-7">
                    <p className="font-heading text-xs uppercase tracking-[0.2em] text-violet-highlight">
                      {isEducation ? 'Education' : `Milestone ${String(index).padStart(2, '0')}`}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-fg sm:text-2xl">{entry.title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{entry.subtitle}</p>
                    <p className="mt-4 text-sm leading-[1.5] text-fg-muted">{entry.body}</p>
                    <ul className={cn('mt-5 flex flex-wrap gap-2', !isRight && 'md:justify-end')}>
                      {entry.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-fg">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
