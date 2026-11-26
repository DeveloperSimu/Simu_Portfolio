import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { personal } from '@/data/portfolio';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { Magnetic } from '@/components/ui/Magnetic';
import { useTypewriter } from '@/hooks/useTypewriter';
import { HeroVisual } from './HeroVisual';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero() {
  const typedRole = useTypewriter(personal.roles);

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-[480px] w-[480px] animate-float-slow rounded-full bg-violet-strong/20 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] animate-float rounded-full bg-cyan-glow/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            {...fadeUp(0.1)}
            className="glass inline-flex items-center gap-3 rounded-full py-2 pl-3 pr-4 text-xs font-medium text-fg"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-glow" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-glow" />
            </span>
            {personal.availability}
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-8 font-heading text-sm uppercase tracking-[0.3em] text-violet-highlight"
          >
            {personal.name}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.3)}
            className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.08] text-fg text-balance sm:text-6xl lg:text-[4.5rem] xl:text-7xl"
          >
            <span className="block">{personal.headline[0]}</span>
            <span className="shimmer-text block pb-1">{personal.headline[1]}</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-7 flex min-h-[2rem] items-center gap-3 font-heading text-lg text-fg sm:text-xl"
            aria-live="polite"
          >
            <span className="text-fg-muted">I am a</span>
            <span className="text-violet-highlight">
              {typedRole}
              <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-blink bg-violet-highlight" aria-hidden />
            </span>
          </motion.div>

          <motion.p {...fadeUp(0.5)} className="mt-6 max-w-xl text-base leading-[1.5] text-fg-muted sm:text-lg">
            {personal.intro}
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className={buttonStyles('primary')}>
                Explore My Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={buttonStyles('secondary')}>
                <Mail className="h-4 w-4" aria-hidden />
                Let&apos;s Connect
              </a>
            </Magnetic>
            <a href={personal.resumeUrl} download className={buttonStyles('ghost', 'px-2')}>
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-fg-muted transition-colors hover:text-violet-highlight sm:flex"
      >
        <span className="font-heading text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-11 w-6 justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-violet-highlight"
            animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  );
}
