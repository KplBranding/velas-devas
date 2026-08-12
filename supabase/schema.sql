-- Esquema de la base de datos del panel /admin (Supabase).
-- Ejecutar UNA vez en Supabase → SQL Editor → New query → pegar → Run.
--
-- Escritura/lectura se hacen SOLO desde el servidor con la service_role key
-- (bypasea RLS), así que dejamos RLS activado sin políticas públicas: nadie con
-- la anon key puede leer estos datos. Los leads no quedan expuestos.

create table if not exists public.leads (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  tipo       text not null,          -- 'pdf' | 'contacto'
  nombre     text,
  empresa    text,
  rut        text,
  email      text,
  telefono   text,
  rubro      text,
  categoria  text,
  mensaje    text
);

create table if not exists public.eventos (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  tipo       text not null,          -- 'enviar_pedido' | 'descargar_pdf' | 'enviar_formulario'
  params     jsonb
);

create index if not exists leads_created_at_idx   on public.leads   (created_at desc);
create index if not exists eventos_created_at_idx on public.eventos (created_at desc);

alter table public.leads   enable row level security;
alter table public.eventos enable row level security;
-- Sin políticas: solo la service_role (servidor) accede. Correcto para datos privados.
