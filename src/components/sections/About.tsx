import { BookOpen, Compass, Lightbulb, Rocket, Target, type LucideIcon } from 'lucide-react';
import { aboutCards, aboutIntro, personal } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/cn';

const cardIcons: Record<string, LucideIcon> = {
  philosophy: Lightbulb,
  journey: BookOpen,
  'problem-solving': Target,
  entrepreneurship: Rocket,
  goals: Compass,
};

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <TiltCard maxTilt={5} className="rounded-[32px]">
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-[32px]">
              {personal.profileImage ? (
                <img
                  src={personal.profileImage}
                  alt={`Portrait of ${personal.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet-deep/50 via-ink-raised to-ink">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-violet/40 bg-ink/60 shadow-glow">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-violet/40" />
                    <span className="font-display text-5xl font-semibold text-violet-highlight">
                      {personal.initials}
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl">
                <div>
                  <p className="font-display text-base font-medium text-fg">{personal.name}</p>
                  <p className="text-xs text-fg-muted">Full Stack Developer</p>
                </div>
                <span className="font-heading text-xs uppercase tracking-[0.2em] text-violet-highlight">
                  {personal.nickname}
                </span>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading eyebrow="About Me" title="Beyond The Code." />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-display text-xl leading-[1.5] text-fg text-balance sm:text-2xl">
              {aboutIntro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {aboutCards.map((card, index) => {
              const Icon = cardIcons[card.id];
              return (
                <Reveal key={card.id} delay={0.05 * index} className={cn(index === 0 && 'sm:col-span-2')}>
                  <article className="glass group h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-violet/40 hover:bg-white/[0.07] sm:p-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-strong/15 text-violet-highlight transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-fg">{card.title}</h3>
                    <p className="mt-3 text-sm leading-[1.5] text-fg-muted">{card.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
