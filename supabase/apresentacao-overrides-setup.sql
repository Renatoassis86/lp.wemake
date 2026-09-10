-- ==============================================================================
-- OVERRIDES DE SLIDE DA APRESENTAÇÃO — WE MAKE
-- Rodar UMA VEZ no SQL Editor do projeto Supabase da We Make.
--
-- Substitui o armazenamento anterior (arquivo data/apresentacao-overrides.json
-- gravado via fs.writeFileSync), que não sobrevive a um ambiente de deploy
-- serverless — cada novo deploy substitui o sistema de arquivos, então edições
-- feitas pelo editor de slide (botão Editar/Salvar, fora do modo tela cheia)
-- se perdiam ao republicar. Guardando no Supabase, a edição fica permanente.
-- ==============================================================================

create table if not exists public.apresentacao_overrides (
  chave text primary key,
  html text not null,
  updated_by text,
  updated_at timestamptz default now()
);
alter table public.apresentacao_overrides enable row level security;
-- (sem policies pra anon/authenticated — só service_role acessa, mesmo padrão
-- do restante do painel admin)
