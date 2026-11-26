import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { projectCategories, type Project } from '@/data/projects';
import { buttonStyles } from '@/components/ui/buttonStyles';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/cn';
import { ProjectArtwork } from './ProjectArtwork';

export const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.id, c.label]));

export function ProjectLinks({ project }: { project: Project }) {
  const unavailable = 'glass inline-flex cursor-not-allowed items-center gap-2 rounded-full px-4 py-2.5 text-xs text-fg-muted/70';

  return (
    <div className="flex flex-wrap gap-3">
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles('primary', '!px-4 !py-2.5 text-xs')}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Live Demo
        </a>
      ) : (
        <span className={unavailable} aria-disabled="true">
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Demo coming soon
        </span>
      )}
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles('secondary', '!px-4 !py-2.5 text-xs')}
        >
          <Github className="h-3.5 w-3.5" aria-hidden />
          Repository
        </a>
      ) : (
        <span className={unavailable} aria-disabled="true">
          <Github className="h-3.5 w-3.5" aria-hidden />
          Repo coming soon
        </span>
      )}
    </div>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-fg-muted">
          {tech}
        </li>
      ))}
    </ul>
  );
}

interface CardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export function FeaturedProjectCard({ project, index, onOpenDetails }: CardProps & { index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article className="glass group grid overflow-hidden rounded-[32px] transition-colors duration-500 hover:border-violet/40 lg:grid-cols-12">
      <div className={cn('relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:h-[360px] lg:aspect-auto lg:self-center', reversed && 'lg:order-2')}>
        <ProjectArtwork project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
      <div className={cn('flex flex-col justify-center p-7 sm:p-10 lg:col-span-5', reversed && 'lg:order-1')}>
        <div className="flex items-center gap-3">
          <span className="font-display text-4xl font-semibold text-violet/40">{String(index + 1).padStart(2, '0')}</span>
          <span className="eyebrow !text-[11px]">{categoryLabel[project.category]}</span>
        </div>
        <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.15] text-fg sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-base leading-[1.5] text-fg-muted">{project.description}</p>
        <div className="mt-6">
          <StackList stack={project.stack} />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ProjectLinks project={project} />
        </div>
        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className={buttonStyles('ghost', 'mt-4 !px-0 text-xs')}
        >
          View project details
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </article>
  );
}

export function ProjectCard({ project, onOpenDetails }: CardProps) {
  return (
    <TiltCard maxTilt={6} className="h-full rounded-3xl">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-violet/40">
        <div className="relative aspect-[16/10] overflow-hidden">
          <ProjectArtwork project={project} className="transition-transform duration-700 ease-out group-hover:scale-105" />
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium text-fg">
            {categoryLabel[project.category]}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-semibold text-fg">{project.title}</h3>
          <p className="mt-3 text-sm leading-[1.5] text-fg-muted">{project.description}</p>
          <div className="mt-5">
            <StackList stack={project.stack} />
          </div>
          <div className="mt-auto flex flex-col items-start gap-4 pt-6">
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-highlight transition-colors hover:text-fg"
            >
              View details
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </button>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
