import type { ProjectRow } from "@/types/project";

/** Resolves gallery URLs from `images[]` or legacy `imageurl`. */
export function projectImageUrls(project: ProjectRow): string[] {
  const fromArray = project.images;
  if (Array.isArray(fromArray) && fromArray.length > 0) {
    return fromArray.filter((u): u is string => typeof u === "string" && u.length > 0);
  }
  const legacy = project.imageurl;
  if (typeof legacy === "string" && legacy.length > 0) {
    return [legacy];
  }
  return [];
}
