import { TiltCard } from '@/components/ui/TiltCard';

const orbitChips = ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Django', 'Tailwind', 'Git', 'AI'];

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  size: 2 + ((index * 7) % 3),
  delay: (index * 0.73) % 9,
  duration: 8 + ((index * 3) % 7),
}));

const codeLines = [
  { text: 'const simu = {', tone: 'text-fg-muted' },
  { text: '  role: "Full Stack Developer",', tone: 'text-violet-highlight' },
  { text: '  stack: ["Django", "React", "AI"],', tone: 'text-cyan-glow' },
  { text: '  mindset: "curious, ambitious",', tone: 'text-emerald-glow' },
  { text: '  focus: "digital futures",', tone: 'text-amber-glow' },
  { text: '};', tone: 'text-fg-muted' },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 animate-float-slow rounded-full bg-violet-strong/25 blur-3xl" />
      <div className="absolute right-[4%] top-[8%] h-28 w-28 animate-float rounded-full bg-cyan-glow/15 blur-2xl" />

      <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[9%] rounded-full border border-dashed border-violet/25" />

      <div className="absolute inset-0 animate-orbit">
        {orbitChips.map((chip, index) => {
          const angle = (index / orbitChips.length) * Math.PI * 2;
          const left = 50 + Math.sin(angle) * 50;
          const top = 50 - Math.cos(angle) * 50;
          return (
            <div
              key={chip}
              className="absolute animate-[orbit_38s_linear_infinite_reverse]"
              style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="glass animate-float rounded-2xl px-3 py-1.5 font-heading text-[11px] font-medium text-fg sm:text-xs">
                {chip}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <TiltCard className="w-[78%] rounded-[28px]" maxTilt={9}>
          <div className="glass rounded-[28px] p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-glow/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-glow/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-glow/80" />
              <span className="ml-auto font-heading text-[10px] uppercase tracking-[0.2em] text-fg-muted">
                simu.ts
              </span>
            </div>
            <pre className="overflow-hidden font-mono text-[11px] leading-[1.7] sm:text-[13px]">
              {codeLines.map((line) => (
                <span key={line.text} className={`block whitespace-pre ${line.tone}`}>
                  {line.text}
                </span>
              ))}
              <span className="inline-block h-4 w-2 animate-blink bg-violet-highlight align-middle" />
            </pre>
          </div>
        </TiltCard>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden>
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute bottom-0 rounded-full bg-violet-highlight animate-drift"
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
