import type { Project, ProjectAccent } from '@/data/projects';
import { cn } from '@/lib/cn';

const accentGradients: Record<ProjectAccent, string> = {
  violet: 'from-violet-deep/70 via-violet-strong/30 to-ink',
  cyan: 'from-cyan-glow/25 via-violet-strong/35 to-ink',
  emerald: 'from-emerald-glow/20 via-ink-raised to-ink',
  amber: 'from-amber-glow/20 via-rose-glow/10 to-ink',
  rose: 'from-rose-glow/25 via-violet-strong/20 to-ink',
};

const skeletonRows = ['w-3/4', 'w-full', 'w-5/6', 'w-2/3'];

interface ProjectArtworkProps {
  project: Project;
  className?: string;
}

export function ProjectArtwork({ project, className }: ProjectArtworkProps) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    );
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-gradient-to-br', accentGradients[project.accent], className)} aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(248,250,252,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,250,252,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="glass absolute inset-[12%] rounded-2xl p-4 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:-rotate-1 sm:p-5">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-glow/70" />
          <span className="h-2 w-2 rounded-full bg-amber-glow/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-glow/70" />
        </div>
        <div className="space-y-3">
          {skeletonRows.map((width) => (
            <div key={width} className={cn('h-2.5 rounded-full bg-white/15', width)} />
          ))}
          <div className="mt-5 h-16 rounded-xl bg-gradient-to-r from-violet-strong/40 to-cyan-glow/20" />
        </div>
      </div>
    </div>
  );
}
