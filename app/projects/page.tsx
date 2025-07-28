import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { GlobeIcon, GithubIcon } from "lucide-react";

export const metadata = {
  title: "Projects | Williams Onuaguluchi",
  description: "Projects page of Williams Onuaguluchi's portfolio",
};

export default async function Projects() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
  }

  return (
    <div className="px-2 md:px-12 border-b border-border py-12">
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-primary">Projects</h2>
        <p className="text-muted-foreground">
          Here are some of the projects I&apos;ve worked on.
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {projects?.map((project) => (
          <div
            className="flex flex-col md:flex-row justify-between gap-12"
            key={project.id}
          >
            <Card className="w-full flex justify-center items-center md:h-[400px]">
              <CardContent>
                <Image
                  src={project.imageurl as string}
                  alt="Featured Project"
                  width={500}
                  height={1000}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4 w-full">
              <h3>{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <span className="border-b text-lg uppercase pb-4">
                Project Info
              </span>
              <div className="flex justify-between border-b border-border pb-4">
                <span>Year</span>
                <span>{project.year}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span>Role</span>
                <span>Full Stack Developer</span>
              </div>
              <div className="flex gap-12">
                <Link
                  href={project.demolink as string}
                  className="flex gap-2 text-primary hover:text-primary/80 border-b border-primary"
                >
                  LIVE DEMO
                  <GlobeIcon />
                </Link>
                <Link
                  href={project.githublink as string}
                  className="flex gap-2 text-primary hover:text-primary/80 border-b border-primary"
                >
                  GITHUB
                  <GithubIcon />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
