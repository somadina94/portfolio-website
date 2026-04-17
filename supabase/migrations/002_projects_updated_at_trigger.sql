-- Ensure projects can always be sorted by most recently updated.
-- Adds timestamps if missing and keeps updated_at current on every row update.

alter table public.projects
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.set_projects_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_set_updated_at on public.projects;

create trigger trg_projects_set_updated_at
before update on public.projects
for each row
execute function public.set_projects_updated_at();
