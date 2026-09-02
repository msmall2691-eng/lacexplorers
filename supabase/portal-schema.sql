-- =============================================================================
-- Arrowhead Explorers — Parent Portal schema (Supabase / Postgres)
-- =============================================================================
-- Run this once in the Supabase SQL editor (or apply it as a migration).
-- All portal tables are prefixed portal_ so they coexist with anything else
-- in the project (e.g. the interest_inquiries table from the marketing site).
--
-- Access model: the app talks to the database ONLY from the server using the
-- service role key. Row Level Security is enabled with no policies, which
-- blocks the anon/public keys entirely — parents never touch the database
-- directly; the app enforces who sees what.

create extension if not exists pgcrypto;

-- ---- families ---------------------------------------------------------------
create table if not exists portal_families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  display_name text,
  pin text not null unique check (pin ~ '^[0-9]{4}$'),
  badge_code text not null unique default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz not null default now()
);

-- ---- children ---------------------------------------------------------------
create table if not exists portal_children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references portal_families (id) on delete cascade,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists portal_children_family_idx on portal_children (family_id);

-- ---- daily logs -------------------------------------------------------------
create table if not exists portal_daily_logs (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references portal_children (id) on delete cascade,
  date date not null,
  mood text not null default '',
  focus text not null default '',
  note text not null default '',
  nap text not null default '',
  meals jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  unique (child_id, date)
);

-- ---- attendance -------------------------------------------------------------
create table if not exists portal_attendance (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references portal_children (id) on delete cascade,
  date date not null,
  time_in timestamptz,
  time_out timestamptz,
  dropped_by text,
  picked_up_by text,
  unique (child_id, date)
);
create index if not exists portal_attendance_date_idx on portal_attendance (date);

-- ---- weekly schedule --------------------------------------------------------
create table if not exists portal_schedule (
  weekday int primary key check (weekday between 1 and 5),
  theme text not null default '',
  detail text not null default ''
);

-- ---- photos -----------------------------------------------------------------
create table if not exists portal_photos (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  caption text not null default '',
  storage_path text,
  family_id uuid references portal_families (id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists portal_photos_date_idx on portal_photos (date desc);

-- ---- lock the tables down (server-only access via service role) -------------
alter table portal_families enable row level security;
alter table portal_children enable row level security;
alter table portal_daily_logs enable row level security;
alter table portal_attendance enable row level security;
alter table portal_photos enable row level security;
alter table portal_schedule enable row level security;

-- ---- private storage bucket for photos --------------------------------------
insert into storage.buckets (id, name, public)
values ('portal-photos', 'portal-photos', false)
on conflict (id) do nothing;
