import { CircleCheck } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Modal } from '@/components/ui/Modal';
import { categoryLabel, ProjectLinks } from './ProjectCard';
import { ProjectArtwork } from './ProjectArtwork';

interface ProjectDetailModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

const TITLE_ID = 'project-detail-title';

export function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  return (
    <Modal open={open} onClose={onClose} titleId={TITLE_ID}>
      <div className="relative aspect-[16/8] overflow-hidden border-b border-white/10">
        <ProjectArtwork project={project} />
      </div>
      <div className="p-6 sm:p-10">
        <p className="eyebrow">{categoryLabel[project.category]}</p>
        <h2 id={TITLE_ID} className="mt-3 pr-12 font-display text-2xl font-semibold leading-[1.2] text-fg sm:text-3xl">
          {project.title}
        </h2>
        <p className="mt-5 text-base leading-[1.5] text-fg-muted">{project.details}</p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-fg-muted">Key features</h3>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-fg">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-glow" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xs uppercase tracking-[0.2em] text-fg-muted">Technology</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-fg-muted">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Modal>
  );
}
