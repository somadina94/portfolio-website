"use client";

import Link from "next/link";
import { GlobeIcon, GithubIcon } from "lucide-react";
import * as motion from "motion/react-client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProjectImageCarousel } from "@/components/projects/project-image-carousel";
import { projectImageUrls } from "@/lib/project-images";
import type { ProjectRow } from "@/types/project";
import { container, item } from "@/utils/motion-config";

type Props = {
  project: ProjectRow;
};

export function ProjectCard({ project }: Props) {
  const images = projectImageUrls(project);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-14"
    >
      <motion.div variants={item} className="w-full md:max-w-xl md:flex-1">
        <Card className="overflow-hidden border-border/70 bg-card/60 shadow-sm backdrop-blur-sm">
          <CardContent className="p-3 sm:p-4">
            <ProjectImageCarousel images={images} title={project.title} />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex w-full flex-col gap-5 md:max-w-md md:flex-1">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl tracking-tight md:text-3xl">{project.title}</h3>
          <p className="text-pretty text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        <Separator className="bg-border/80" />

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Project details</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="secondary" className="font-normal">
              Year · {project.year ?? "—"}
            </Badge>
            <Badge variant="outline" className="font-normal">
              Full Stack Developer
            </Badge>
          </div>
        </div>

        <Separator className="bg-border/80" />

        <div className="flex flex-wrap gap-8">
          {project.demolink ? (
            <Link
              href={project.demolink}
              className="group inline-flex items-center gap-2 border-b border-primary pb-0.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <GlobeIcon className="size-4 transition-transform group-hover:-translate-y-px" />
            </Link>
          ) : null}
          {project.githublink ? (
            <Link
              href={project.githublink}
              className="group inline-flex items-center gap-2 border-b border-primary pb-0.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
              <GithubIcon className="size-4 transition-transform group-hover:-translate-y-px" />
            </Link>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
