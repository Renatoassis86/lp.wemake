-- ==============================================================================
-- PLANO DE NEGÓCIO — WE MAKE (2027–2031)
-- Rodar UMA VEZ no SQL Editor do projeto Supabase da We Make.
-- Pressupõe que supabase/admin-setup.sql já rodou antes (tabela admin_users com
-- renato, denis e emanuel já existe — nenhuma senha é alterada por este script).
-- ==============================================================================

-- 1) Respostas do questionário — uma linha por (usuário, pergunta). Cada sócio só
--    enxerga/edita as próprias respostas; isso é garantido pela API (o username
--    vem sempre da sessão, nunca do client), não por RLS — igual ao resto do painel.
create table if not exists public.plano_negocio_respostas (
  id uuid default gen_random_uuid() primary key,
  username text not null references public.admin_users(username),
  question_id text not null,
  resposta text,
  updated_at timestamptz default now(),
  unique (username, question_id)
);
create index if not exists idx_plano_negocio_respostas_username on public.plano_negocio_respostas (username);
alter table public.plano_negocio_respostas enable row level security;
-- (sem policies pra anon/authenticated — só service_role acessa, mesmo padrão do admin_users)

-- 2) Configuração geral da projeção financeira (1 linha só, compartilhada pelos 3 sócios).
create table if not exists public.plano_financas_config (
  id uuid default gen_random_uuid() primary key,
  investimento_inicial numeric(14,2) not null default 0,
  updated_by text,
  updated_at timestamptz default now()
);
alter table public.plano_financas_config enable row level security;

-- 3) Linhas da planilha financeira (receita / custo fixo / custo variável), uma
--    tabela só, compartilhada — qualquer sócio logado pode ler e editar.
create table if not exists public.plano_financas_linhas (
  id uuid default gen_random_uuid() primary key,
  tipo text not null check (tipo in ('receita','custo_fixo','custo_variavel')),
  modo text not null default 'valor' check (modo in ('valor','clientes_x_ticket','percentual_receita')),
  macro_area text not null,
  rubrica text not null,
  linha_negocio text check (linha_negocio in ('curriculo-maker','formacao-docente','plataforma','espaco-maker','assessoria')),
  ticket_medio numeric(12,2),
  reajuste_ticket_pct numeric(6,3) default 0,
  percentual_receita_pct numeric(6,3),
  valores_por_ano jsonb not null default '{}'::jsonb,
  ordem integer not null default 0,
  updated_by text,
  updated_at timestamptz default now()
);
create index if not exists idx_plano_financas_linhas_ordem on public.plano_financas_linhas (ordem);
alter table public.plano_financas_linhas enable row level security;

-- ==============================================================================
-- 4) SEED — estrutura de receitas e custos rotineiros para este tipo de negócio,
-- a partir do que já está registrado em docs/Plano de negocios_We Make.xlsx
-- (produto = licença anual por turma/escola, 3 selos: Christian/Standard/Home
-- Education; equipe hoje enxuta: estagiário de mecatrônica, dev, social media,
-- contador). Nenhum valor é chutado — tudo entra zerado, pronto pra edição.
-- Podem renomear a área/rubrica e preencher valor a qualquer momento na tela.
-- ==============================================================================

-- Receitas — uma linha por linha de negócio (todas com valores zerados)
insert into public.plano_financas_linhas (tipo, modo, macro_area, rubrica, linha_negocio, ticket_medio, reajuste_ticket_pct, ordem)
select 'receita', v.modo, v.macro_area, v.rubrica, v.linha_negocio, v.ticket_medio, v.reajuste, v.ordem
from (values
  ('clientes_x_ticket', 'Receita — Currículo Maker',       'Licenciamento anual — Christian Education (EF1/EF2)', 'curriculo-maker',   0::numeric, 0::numeric, 1),
  ('clientes_x_ticket', 'Receita — Currículo Maker',       'Licenciamento anual — Standard Education',             'curriculo-maker',   0::numeric, 0::numeric, 2),
  ('clientes_x_ticket', 'Receita — Currículo Maker',       'Licenciamento anual — Home Education (famílias)',      'curriculo-maker',   0::numeric, 0::numeric, 3),
  ('valor',             'Receita — Formação Docente',      'Formação e capacitação avulsa (workshops, eventos)',   'formacao-docente',  null,       null,       4),
  ('valor',             'Receita — Plataforma We Make',    'Assinatura da Plataforma We Make',                     'plataforma',        null,       null,       5),
  ('valor',             'Receita — Espaço Maker',          'Projetos de implantação/otimização de sala maker',     'espaco-maker',      null,       null,       6),
  ('valor',             'Receita — Assessoria Institucional', 'Assessoria institucional plurianual',                'assessoria',        null,       null,       7)
) as v(modo, macro_area, rubrica, linha_negocio, ticket_medio, reajuste, ordem)
where not exists (
  select 1 from public.plano_financas_linhas existente
  where existente.macro_area = v.macro_area and existente.rubrica = v.rubrica
);

-- Custos fixos — equipe e estrutura de sustentação das 5 linhas
insert into public.plano_financas_linhas (tipo, modo, macro_area, rubrica, ordem)
select 'custo_fixo', 'valor', v.macro_area, v.rubrica, v.ordem
from (values
  ('Pessoal e Gestão',        'Pró-labore — direção executiva',                        10),
  ('Pessoal e Gestão',        'Pró-labore — direção comercial e institucional',        11),
  ('Pessoal e Gestão',        'Pró-labore — direção pedagógica',                       12),
  ('Pessoal e Gestão',        'Estagiário de mecatrônica',                             13),
  ('Pessoal e Gestão',        'Desenvolvedor / manutenção da plataforma',              14),
  ('Serviços terceirizados',  'Contabilidade',                                         15),
  ('Serviços terceirizados',  'Social media e produção de conteúdo',                   16),
  ('Tecnologia',              'Hospedagem, domínio e ferramentas da Plataforma We Make', 17),
  ('Comercial e Marketing',   'Presença em congressos e eventos (ACSI, CNEC, ANEC)',   18),
  ('Administrativo',          'Jurídico, registro de marca e propriedade intelectual', 19),
  ('Administrativo',          'Site, domínio institucional e assinaturas de software', 20)
) as v(macro_area, rubrica, ordem)
where not exists (
  select 1 from public.plano_financas_linhas existente
  where existente.macro_area = v.macro_area and existente.rubrica = v.rubrica
);

-- Custos variáveis — ligados diretamente ao volume de escolas/turmas atendidas
insert into public.plano_financas_linhas (tipo, modo, macro_area, rubrica, percentual_receita_pct, ordem)
select 'custo_variavel', v.modo, v.macro_area, v.rubrica, v.percentual, v.ordem
from (values
  ('valor',             'Custos variáveis', 'Produção e impressão de material didático',        null::numeric, 30),
  ('valor',             'Custos variáveis', 'Kits e componentes maker por turma',                null::numeric, 31),
  ('percentual_receita','Custos variáveis', 'Impostos sobre serviços',                            0::numeric,    32),
  ('percentual_receita','Custos variáveis', 'Comissão comercial sobre novos contratos fechados',  0::numeric,    33)
) as v(modo, macro_area, rubrica, percentual, ordem)
where not exists (
  select 1 from public.plano_financas_linhas existente
  where existente.macro_area = v.macro_area and existente.rubrica = v.rubrica
);

-- ==============================================================================
-- PRONTO. As três telas ficam em /admin/plano-de-negocio (questionário),
-- /admin/plano-de-negocio/financeiro (esta planilha) e
-- /admin/plano-de-negocio/apresentacao (consolidado, somente leitura).
-- Renato, Denis e Emanuel já têm login em /admin/login (mesma senha de sempre);
-- cada um só grava as próprias respostas do questionário, e os três podem
-- editar a planilha financeira e ver a apresentação juntos.
-- ==============================================================================
