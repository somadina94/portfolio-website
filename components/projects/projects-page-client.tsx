"use client";

import * as motion from "motion/react-client";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRow } from "@/types/project";

type Props = {
  projects: ProjectRow[];
};

export function ProjectsPageClient({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="border-b border-border/80 py-16 text-center md:py-24">
        <p className="mx-auto max-w-md font-serif text-xl text-muted-foreground">
          No projects published yet. Add rows in Supabase to populate this gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="border-b border-border/80 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex flex-col gap-4 md:mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Work</p>
        <h1 className="font-serif text-3xl tracking-tight md:text-5xl">Projects</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground leading-relaxed">
          Case studies and shipped products — each with live demos, repositories, and visual walkthroughs.
        </p>
      </motion.div>

      <div className="flex flex-col gap-20 md:gap-24">
        {projects.map((project) => (
          <ProjectCard key={String(project.id)} project={project} />
        ))}
      </div>
    </div>
  );
}
