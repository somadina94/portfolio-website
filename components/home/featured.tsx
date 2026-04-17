import { createClient } from "@/lib/supabase/server";
import { FeaturedProjectsClient } from "@/components/home/featured-projects-client";
import type { ProjectRow } from "@/types/project";

export default async function Featured() {
  const supabase = await createClient();

  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("updated_at", { ascending: false });

  return <FeaturedProjectsClient projects={(featuredProjects ?? []) as ProjectRow[]} />;
}
