export type ProjectRow = {
  id: string | number;
  title: string;
  description: string | null;
  year: string | number | null;
  demolink: string | null;
  githublink: string | null;
  featured: boolean | null;
  /** @deprecated Prefer `images`; kept for rows not migrated yet */
  imageurl?: string | null;
  images?: string[] | null;
};
