-- Projects: store multiple screenshot URLs as a PostgreSQL text array.
-- Run this in the Supabase SQL editor (or via supabase db push) before relying on the carousel.

alter table public.projects
  add column if not exists images text[];

-- Backfill: one image per row from the legacy single column
update public.projects
set images = array[imageurl]::text[]
where imageurl is not null
  and imageurl <> ''
  and (images is null or cardinality(images) = 0);

-- After you verify rows in the dashboard, you can drop the old column:
-- alter table public.projects drop column if exists imageurl;

comment on column public.projects.images is 'Ordered list of project image URLs (e.g. Supabase Storage public URLs).';
