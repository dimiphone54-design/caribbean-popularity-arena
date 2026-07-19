-- Link-out payment platform schema
-- Platform NEVER processes payments; stores only external payment_url sellers control.

create table if not exists sellers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null,
  country text,
  payment_url text,
  status text not null default 'pending',
  is_public boolean not null default false,
  product_title text,
  product_description text,
  price_label text
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null,
  country text,
  payment_url text,
  status text not null default 'pending',
  is_public boolean not null default false,
  university text,
  subject text
);

create table if not exists creators (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null,
  country text,
  payment_url text,
  status text not null default 'pending',
  is_public boolean not null default false,
  lane text,
  project_description text
);

-- Row Level Security
alter table sellers enable row level security;
alter table teachers enable row level security;
alter table creators enable row level security;

-- Public SELECT only where is_public = true
create policy "public can view public sellers"
  on sellers for select
  using (is_public = true);

create policy "public can view public teachers"
  on teachers for select
  using (is_public = true);

create policy "public can view public creators"
  on creators for select
  using (is_public = true);
