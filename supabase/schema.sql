-- =============================================================
-- Rehman's Foundation — database schema
-- Paste this whole file into Supabase -> SQL Editor -> Run.
-- =============================================================

-- ---------- 1. PROFILES -------------------------------------
-- One row per registered user, created automatically on signup.

create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  phone       text,
  city        text,
  role        text not null default 'member',   -- 'member' or 'admin'
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Create the profile row whenever a new auth user appears.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------- 2. DONATIONS ------------------------------------
-- Donation intents. No card data is stored here; a real payment
-- gateway can be attached later and write back to payment_ref.

create table if not exists public.donations (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users on delete set null,
  donor_name     text,
  donor_email    text,
  campaign_slug  text not null,
  campaign_name  text,
  amount         numeric(12,2) not null check (amount > 0),
  currency       text not null default 'PKR',
  frequency      text not null default 'one-time',  -- 'one-time' | 'monthly'
  dedication     text,
  status         text not null default 'pending',   -- pending | completed | failed
  payment_ref    text,
  created_at     timestamptz not null default now()
);

alter table public.donations enable row level security;

drop policy if exists "read own donations" on public.donations;
create policy "read own donations" on public.donations
  for select using (auth.uid() = user_id);

drop policy if exists "create donation" on public.donations;
create policy "create donation" on public.donations
  for insert with check (auth.uid() = user_id or user_id is null);


-- ---------- 3. VOLUNTEERS -----------------------------------

create table if not exists public.volunteers (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users on delete set null,
  full_name     text not null,
  email         text not null,
  phone         text,
  city          text,
  cause         text,          -- which cause they want to work on
  availability  text,          -- e.g. 'Volunteer Friday'
  message       text,
  status        text not null default 'new',   -- new | contacted | active
  created_at    timestamptz not null default now()
);

alter table public.volunteers enable row level security;

drop policy if exists "read own volunteer entry" on public.volunteers;
create policy "read own volunteer entry" on public.volunteers
  for select using (auth.uid() = user_id);

drop policy if exists "create volunteer entry" on public.volunteers;
create policy "create volunteer entry" on public.volunteers
  for insert with check (auth.uid() = user_id or user_id is null);


-- ---------- 4. EVENT REGISTRATIONS --------------------------

create table if not exists public.event_registrations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  event_slug  text not null,
  event_name  text,
  note        text,
  created_at  timestamptz not null default now(),
  unique (user_id, event_slug)
);

alter table public.event_registrations enable row level security;

drop policy if exists "read own registrations" on public.event_registrations;
create policy "read own registrations" on public.event_registrations
  for select using (auth.uid() = user_id);

drop policy if exists "create own registration" on public.event_registrations;
create policy "create own registration" on public.event_registrations
  for insert with check (auth.uid() = user_id);

drop policy if exists "delete own registration" on public.event_registrations;
create policy "delete own registration" on public.event_registrations
  for delete using (auth.uid() = user_id);


-- ---------- 5. CONTACT MESSAGES -----------------------------

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  body        text not null,
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.messages enable row level security;

drop policy if exists "anyone can send a message" on public.messages;
create policy "anyone can send a message" on public.messages
  for insert with check (true);


-- ---------- 6. ADMIN ACCESS ---------------------------------
-- Admins can read everything. Mark a user as admin by running:
--   update public.profiles set role = 'admin' where id = '<user-uuid>';

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "admins read all donations" on public.donations;
create policy "admins read all donations" on public.donations
  for select using (public.is_admin());

drop policy if exists "admins read all volunteers" on public.volunteers;
create policy "admins read all volunteers" on public.volunteers
  for select using (public.is_admin());

drop policy if exists "admins read all messages" on public.messages;
create policy "admins read all messages" on public.messages
  for select using (public.is_admin());

drop policy if exists "admins read all registrations" on public.event_registrations;
create policy "admins read all registrations" on public.event_registrations
  for select using (public.is_admin());

drop policy if exists "admins read all profiles" on public.profiles;
create policy "admins read all profiles" on public.profiles
  for select using (public.is_admin());
