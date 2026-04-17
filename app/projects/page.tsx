import { createClient } from "@/lib/supabase/server";
import PageTransition from "@/components/general/page-transition";
import { ProjectsPageClient } from "@/components/projects/projects-page-client";
import type { ProjectRow } from "@/types/project";
import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williams-onuaguluchi.vercel.app";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects by Williams Onuaguluchi — full-stack web and mobile work with demos and repositories.",
  alternates: { canonical: `${site}/projects` },
  openGraph: {
    title: "Projects | Williams Onuaguluchi",
    description: "Portfolio projects with live demos, GitHub links, and image galleries.",
    url: `${site}/projects`,
  },
};

export default async function Projects() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <PageTransition>
      <div className="px-4 md:px-8 lg:px-12">
        <ProjectsPageClient projects={(projects ?? []) as ProjectRow[]} />
      </div>
    </PageTransition>
  );
}
