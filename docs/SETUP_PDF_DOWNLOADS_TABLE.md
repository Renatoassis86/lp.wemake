# Setup: Tabela PDF Downloads

Execute o SQL abaixo no Supabase para criar a tabela de rastreamento de downloads de PDF.

## SQL para criar a tabela

```sql
-- Criar tabela pdf_downloads (rastreia downloads de ebooks/materiais)
CREATE TABLE IF NOT EXISTS pdf_downloads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  nome_contato TEXT,
  email TEXT,
  telefone TEXT,
  cargo TEXT,
  nome_escola TEXT,
  cidade TEXT,
  uf TEXT,
  material TEXT DEFAULT '7-principios',
  fluxo TEXT DEFAULT 'free-material',
  utm_source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  fbclid TEXT
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_created_at ON pdf_downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_email ON pdf_downloads(email);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_nome_contato ON pdf_downloads(nome_contato);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_fluxo ON pdf_downloads(fluxo);

-- RLS (Row Level Security) — Desabilitar para acesso via service role
ALTER TABLE pdf_downloads DISABLE ROW LEVEL SECURITY;
```

## Campos da tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | BIGSERIAL | Identificador único |
| `created_at` | TIMESTAMP | Data/hora do download |
| `nome_contato` | TEXT | Nome da pessoa que baixou |
| `email` | TEXT | Email corporativo |
| `telefone` | TEXT | WhatsApp com DDD |
| `cargo` | TEXT | Cargo na escola (mantenedor, gestor, diretor, coordenador, professor) |
| `nome_escola` | TEXT | Nome da instituição |
| `cidade` | TEXT | Cidade |
| `uf` | TEXT | Estado (UF) |
| `material` | TEXT | Identificador do material (ex: 7-principios) |
| `fluxo` | TEXT | Origem do download: `free-material` (landing) ou `ebook-page` (/ebook_7_principios) |
| `utm_source` | TEXT | Fonte do tráfego (Google Ads, Facebook, etc) |
| `utm_campaign` | TEXT | Campanha de marketing |
| `utm_medium` | TEXT | Meio do tráfego (cpc, organic, social) |
| `fbclid` | TEXT | ID do clique do Facebook (para remarketing) |

## Integração com o Admin

Após criar a tabela, a aba **"Downloads de PDF"** aparecerá automaticamente no painel admin em `/admin/pdf-downloads`.

### Funcionalidades disponíveis:
- ✅ Visualizar todos os downloads em tabela paginada
- ✅ Buscar por nome, email, escola, cidade
- ✅ Exportar dados em Excel
- ✅ Deletar registros
- ✅ Ver timestamps de download
- ✅ Rastrear origem do tráfego (UTM)

## Fluxos de captura

### Fluxo 1: Seção "Free Material" na Landing (novo)
1. Usuário preenche formulário em seção `#material-gratuito` da landing
2. Dados completos: nome, email, telefone, cargo, escola, cidade, UF
3. Form envia POST para `/api/lead` com `type: "material"`
4. API insere em `pdf_downloads` com `fluxo = 'free-material'`
5. Link de download aparece imediatamente
6. Admin acompanha em `/admin/pdf-downloads`

### Fluxo 2: Página `/ebook_7_principios` (existente)
1. Usuário preenche form simplificado (4 campos)
2. Dados: nome, email, telefone, escola
3. Form envia POST para `/api/diagnostico/lead`
4. API insere em `diagnostico_escola` com `origem = 'wemake-landing-ebook'`
5. Redireciona para `/obrigado` para qualificação adicional
6. Após qualificação, libera download
7. Admin acompanha em `/admin/diagnostico-escola`

## Diferença entre as tabelas

| Aspecto | `pdf_downloads` | `diagnostico_escola` |
|--------|-----------------|----------------------|
| **Propósito** | Rastrear downloads rápidos de material | Rastrear leads qualificados |
| **Fluxo** | Imediato (1 form) | Longo (2 etapas + qualificação) |
| **Campos** | Nome, email, telefone, cargo, localização | Nome, email, telefone, escola, função, respostas |
| **Página** | Landing principal | `/ebook_7_principios` |
| **Admin** | `/admin/pdf-downloads` | `/admin/diagnostico-escola` |

## Testes

Após criar a tabela:

1. Acesse http://localhost:3000/
2. Role até a seção "Material Gratuito" (Free Material)
3. Preencha o formulário e clique em "Quero baixar agora"
4. Acesse http://localhost:3000/admin/pdf-downloads
5. Verifique se seu registro aparece na tabela
