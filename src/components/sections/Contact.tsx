import { ArrowUpRight, CircleCheck, Mail } from 'lucide-react';
import { personal, socialLinks } from '@/data/portfolio';
import { Reveal } from '@/components/ui/Reveal';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { ContactForm } from './contact/ContactForm';

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-ink-soft/80 p-6 shadow-glass sm:p-10 lg:p-14">
          <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-strong/20 blur-[120px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-cyan-glow/10 blur-[110px]" />

          <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow mb-4">Contact</p>
              <h2 className="font-display text-3xl font-semibold leading-[1.15] text-fg text-balance sm:text-4xl lg:text-5xl">
                Have an Idea? Let&apos;s Build Something Great.
              </h2>
              <p className="mt-6 text-base leading-[1.5] text-fg-muted">
                Share what you are working on, whether it is a new product, an AI feature or a website that needs a
                fresh build. I read every message and reply personally.
              </p>

              <ul className="mt-10 space-y-5">
                {personal.email && (
                  <li>
                    <a
                      href={`mailto:${personal.email}`}
                      className="group flex items-center gap-4 text-fg transition-colors hover:text-violet-highlight"
                    >
                      <span className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                        <Mail className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-sm">{personal.email}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-4 text-sm text-fg-muted">
                  <span className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                    <CircleCheck className="h-4 w-4" aria-hidden />
                  </span>
                  {personal.availability}
                </li>
              </ul>

              <ul className="mt-10 flex flex-wrap gap-3">
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
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
              <div className="glass rounded-[28px] p-6 sm:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
