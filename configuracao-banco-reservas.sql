-- ============================================================
-- Pousada Constelação — configuração do banco de reservas
-- Rode este script inteiro em: Supabase > SQL Editor > New query
-- ============================================================

-- 1) Tabela de reservas
create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_contact text not null,
  check_in date not null,
  check_out date not null,
  guests text,
  created_at timestamptz not null default now()
);

-- 2) Liga a segurança em nível de linha (obrigatório)
alter table public.reservas enable row level security;

-- 3) Qualquer visitante do site pode CRIAR uma reserva (formulário público)
create policy "Qualquer pessoa pode enviar uma reserva"
on public.reservas
for insert
to anon
with check (true);

-- 4) Só um administrador autenticado pode LER as reservas
create policy "Somente administradores logados podem ver as reservas"
on public.reservas
for select
to authenticated
using (true);

-- ============================================================
-- Depois de rodar este script, crie o usuário administrador:
-- Supabase > Authentication > Users > Add user
--   - Marque a opção "Auto Confirm User"
--   - Use o e-mail e a senha que o dono da pousada vai usar
--     para entrar em admin-reservas.html
-- ============================================================
