-- ============================================================
-- Admin Panel Setup — execute UMA VEZ no Supabase Studio
-- ============================================================

-- 1) Tabela de usuários admin
create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) Insere os 3 usuários iniciais (senha: admin123 — hash scrypt + salt)
-- Cada um tem salt único, então o hash não se repete mesmo com mesma senha.
insert into public.admin_users (username, password_hash)
values
  ('denis',   'a1712914afe44a52b006e67fd84d20d4:787067289a905804d1b9bc5e28e0a2a9cc0f8aa30af41986ec34a39dee2afc3723a16be8ceea79910aede37e7244dea9d110d659a1d76a65de0d95bae3caa4c0'),
  ('emanuel', 'bc2b2b9172b523837fadbcb839d2b0d3:4f4f302ccc827deb76139e95b67eb60f6bef65b800d9486b957483e797149f8b94896082de9b665619557bbeac889e460d74fdb59f31a82760818a707033eb1b'),
  ('renato',  '34ae28ce3134166cb1b6d877d7c55893:118dd2e4ceb0ddfa0627024cece893cba748fb7d089d3d6d6bf2f7b2132e491ae767d69f2d7f4bfe9a97e4e3259428e213e507ef31e4e3eedebb1f3a5b2655b0')
on conflict (username) do nothing;

-- 3) Adiciona colunas de auditoria nas tabelas existentes
--    (idempotente — só cria se ainda não existir)
alter table public.leads_escola
  add column if not exists updated_at timestamptz default now(),
  add column if not exists updated_by text;

alter table public.diagnostico_escola
  add column if not exists updated_at timestamptz default now(),
  add column if not exists updated_by text,
  add column if not exists observacoes text;

-- 4) RLS — admin_users é SOMENTE acessada via service_role (server-side).
--    Garante que ninguém com chave anon pode ler senhas.
alter table public.admin_users enable row level security;

-- (não criamos policies pra anon — service_role bypassa RLS por padrão)

-- ============================================================
-- PRONTO. Para mudar senhas mais tarde, gere novo hash localmente:
--
--   node -e "const c=require('crypto');const s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync('NOVA_SENHA', s, 64).toString('hex'))"
--
-- E rode:
--   update public.admin_users set password_hash = 'salt:hash' where username = 'denis';
-- ============================================================
