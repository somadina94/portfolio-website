"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectRow } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  projects: ProjectRow[];
};

export function FeaturedProjectsClient({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="border-b border-border/80 py-16 text-center md:py-24">
        <p className="font-serif text-xl text-muted-foreground">Featured projects will appear here soon.</p>
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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Portfolio</p>
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">Featured work</h2>
        <p className="max-w-2xl text-pretty text-muted-foreground leading-relaxed">
          A curated set of builds that blend performance, accessibility, and thoughtful product design.
        </p>
      </motion.div>

      <div className="flex flex-col gap-20 md:gap-24">
        {projects.map((project) => (
          <ProjectCard key={String(project.id)} project={project} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 flex justify-start md:mt-20"
      >
        <Button asChild variant="outline" className="group gap-2 border-primary/40">
          <Link href="/projects">
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
