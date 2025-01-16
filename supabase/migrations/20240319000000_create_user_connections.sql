-- Create user_connections table
create table if not exists public.user_connections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  provider text not null,
  email text not null,
  access_token text not null,
  refresh_token text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, provider)
);

-- Add RLS policies
alter table public.user_connections enable row level security;

create policy "Users can view their own connections"
  on public.user_connections for select
  using (auth.uid() = user_id);

create policy "Users can insert their own connections"
  on public.user_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own connections"
  on public.user_connections for update
  using (auth.uid() = user_id);

-- Add updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger handle_updated_at
  before update on public.user_connections
  for each row
  execute function public.handle_updated_at(); 