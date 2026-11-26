import { Boxes, Layers, LayoutTemplate, Palette, Server, Sparkles, type LucideIcon } from 'lucide-react';
import { services, type ServiceIconId } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';

const serviceIcons: Record<ServiceIconId, LucideIcon> = {
  layers: Layers,
  layout: LayoutTemplate,
  server: Server,
  sparkles: Sparkles,
  boxes: Boxes,
  palette: Palette,
};

export function Services() {
  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="Services"
              title="How I can help bring your idea to life."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-[1.5] text-fg-muted sm:text-lg">
              From a single landing page to a full product with a backend, I focus on clean code, thoughtful design and
              clear communication at every step.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.id} delay={(index % 3) * 0.08}>
                <TiltCard maxTilt={4} className="h-full rounded-3xl">
                  <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-violet/40">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-violet-strong/0 blur-3xl transition-all duration-700 group-hover:bg-violet-strong/30"
                    />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/30 bg-violet-strong/10 text-violet-highlight transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="relative mt-6 font-heading text-lg font-semibold text-fg">{service.title}</h3>
                    <p className="relative mt-3 text-sm leading-[1.5] text-fg-muted">{service.description}</p>
                    <ul className="relative mt-6 space-y-2.5 border-t border-white/10 pt-5">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2.5 text-xs text-fg">
                          <span className="h-1 w-1 rounded-full bg-violet" aria-hidden />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
