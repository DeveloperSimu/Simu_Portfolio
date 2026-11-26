import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projectCategories, projects, type Project, type ProjectCategory } from '@/data/projects';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { publishLiveActivity } from '@/lib/liveChannel';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeaturedProjectCard, ProjectCard } from './projects/ProjectCard';
import { ProjectDetailModal } from './projects/ProjectDetailModal';

type ProjectFilter = ProjectCategory | 'all';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const openDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
    void publishLiveActivity('project', project.title);
  }, []);
  const closeDetails = useCallback(() => setDetailOpen(false), []);

  const filtered = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter)),
    [activeFilter],
  );
  const featured = filtered.filter((project) => project.featured);
  const standard = filtered.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Ideas turned into working products."
            description="A selection of full stack, AI and frontend work. Filter by category to explore."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <FilterTabs
            options={projectCategories}
            value={activeFilter}
            onChange={setActiveFilter}
            groupLabel="Filter projects by category"
            indicatorId="project-filter-pill"
          />
        </Reveal>

        <motion.div layout className="mt-10 space-y-8">
          <AnimatePresence mode="popLayout">
            {featured.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturedProjectCard project={project} index={index} onOpenDetails={openDetails} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {standard.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} onOpenDetails={openDetails} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-fg-muted">No projects in this category yet.</p>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} open={detailOpen} onClose={closeDetails} />
      )}
    </section>
  );
}
