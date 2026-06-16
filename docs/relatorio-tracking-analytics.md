# Relatório: Rastreamento de Conversões — Google Analytics 4 + Meta Pixel

**Projeto:** We Make Landing Page  
**Data:** 16 de junho de 2026  
**Status:** Deploy concluído com sucesso ✅

---

## Contexto

O site `wemake.tec.br` possui um funil de captação de leads em 3 etapas:

1. **Etapa 1 — Captura:** Visitante preenche o formulário na página `/diagnostico` (nome, e-mail, escola, telefone) para baixar o e-book gratuito.
2. **Etapa 2 — Qualificação:** Na página `/obrigado`, o visitante responde 3 perguntas rápidas (cargo, espaço maker, tamanho da escola) para liberar o download.
3. **Etapa 3 — Diagnóstico:** O visitante acessa a página `/diagnostico-maturidade` e completa 8 blocos de perguntas sobre a maturidade tecnológica da escola.

Antes deste trabalho, **nenhum desses eventos era registrado** no Google Analytics nem na Meta — o site "não sabia contar" quando alguém completava cada etapa.

---

## Problema Identificado

### Google Analytics com ID desatualizado
O site estava usando o ID `G-TLS1GNNWFZ` (propriedade antiga). O cliente forneceu o novo ID `G-WJ35VV14D4`, que precisava ser ativado.

### Meta Pixel sem registro de conversões
O Pixel da Meta (ID `1706999140429793`) estava carregado no site, mas registrava apenas visualizações de página (`PageView`). Nenhum evento de conversão era enviado — isso prejudica diretamente a otimização de campanhas no Facebook e Instagram, pois o algoritmo não sabia quem havia realizado ações valiosas no site.

### Formulários sem instrumentação
Dos 6 formulários identificados no site, apenas 1 (o formulário de contato) disparava algum evento de analytics. Os formulários mais importantes do funil — ebook, qualificação e diagnóstico — estavam completamente "mudos" para as ferramentas de marketing.

| Formulário | Rota da API | Evento antes | Evento depois |
|---|---|---|---|
| Captura do ebook | `/api/diagnostico/lead` | nenhum | `Lead` (Meta) + `lead_submit` (GA) |
| Qualificação `/obrigado` | `/api/diagnostico/qualificar` | nenhum | `LeadQualificado` (Meta) + `lead_qualificado` (GA) |
| Diagnóstico completo | `/api/diagnostico/maturidade` | nenhum | `CompleteRegistration` (Meta) + `diagnostico_completo` (GA) |
| Formulário de contato | `/api/lead` | `lead_submit` (GA) | sem alteração (já funcionava) |

---

## O que Foi Feito

### 1. Atualização do ID do Google Analytics

**Arquivo:** `.env.local` e variável de ambiente no Vercel  
**Mudança:** `NEXT_PUBLIC_GA_ID` trocado de `G-TLS1GNNWFZ` para `G-WJ35VV14D4`

Todos os dados de visitantes, sessões e eventos agora chegam na propriedade correta do Google Analytics 4.

---

### 2. Registro oficial do Meta Pixel

**Arquivo:** `.env.local` e variável de ambiente no Vercel  
**Adição:** `NEXT_PUBLIC_FB_PIXEL_ID=1706999140429793`

O Pixel ID estava "hardcoded" (fixo no código) como valor de emergência. Agora está corretamente configurado como variável de ambiente — o padrão profissional que permite trocar sem mexer no código.

---

### 3. Arquitetura de rastreamento duplo (`lib/analytics.ts`)

Foi criada uma função central `fireMetaPixel()` que mapeia os eventos internos do site para os eventos padrão da Meta:

```
lead_submit        →  fbq('track', 'Lead')
lead_qualificado   →  fbq('trackCustom', 'LeadQualificado')
diagnostico_completo → fbq('track', 'CompleteRegistration')
cta_click          →  fbq('trackCustom', 'CTAClick')
```

Toda vez que `trackEvent()` é chamado em qualquer parte do site, ele agora dispara simultaneamente para:
- **Google Analytics 4** (via `dataLayer` / `gtag`)
- **Meta Pixel** (via `fbq`)
- **Plausible** (se configurado)

---

### 4. Evento de qualificação (`obrigado-hero.tsx`)

**Arquivo:** `features/diagnostico/obrigado-hero.tsx`  
Após o envio bem-sucedido do formulário de qualificação, o site agora dispara:

```
trackEvent({ name: "lead_qualificado", cargo: answers.cargo_qualificado })
```

Isso registra no Google Analytics e envia `LeadQualificado` para a Meta.

---

### 5. Evento de diagnóstico completo (`maturidade-wizard.tsx`)

**Arquivo:** `features/diagnostico/maturidade-wizard.tsx`  
Após o envio bem-sucedido do diagnóstico completo, o site agora dispara:

```
trackEvent({ name: "diagnostico_completo", escola: answers.nome_escola })
```

Isso registra no Google Analytics e envia `CompleteRegistration` para a Meta — o evento de maior valor do funil.

---

### 6. Correção de erro de build

Durante o deploy, o TypeScript identificou uma declaração duplicada de `window.fbq`:
- `MetaPixel.tsx` declarava `fbq: any`
- `analytics.ts` declarava `fbq?: (...args: unknown[]) => void`

A declaração redundante foi removida de `MetaPixel.tsx`. O build foi refeito com sucesso.

---

## Commits Realizados

| Commit | Descrição |
|---|---|
| `b82153f` | feat: rastreamento de conversão Google Analytics + Meta Pixel |
| `104dc8b` | fix: remover declaração duplicada de window.fbq |

---

## Variáveis de Ambiente Configuradas no Vercel

| Variável | Valor | Finalidade |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-WJ35VV14D4` | ID da propriedade GA4 correta |
| `NEXT_PUBLIC_FB_PIXEL_ID` | `1706999140429793` | ID do Pixel da Meta |

---

## Como Validar

### Google Analytics
1. Acesse [analytics.google.com](https://analytics.google.com)
2. Selecione a propriedade `G-WJ35VV14D4`
3. Vá em **Relatórios → Tempo Real**
4. Abra `wemake.tec.br` em outra aba — você deve aparecer como usuário ativo

### Meta Pixel
1. Instale a extensão gratuita **Meta Pixel Helper** no Chrome
2. Acesse `wemake.tec.br`
3. Clique no ícone da extensão — deve mostrar o Pixel `1706999140429793` com `PageView` em verde
4. Preencha o formulário do ebook até o fim — o evento `Lead` deve aparecer na extensão

### Gerenciador de Eventos da Meta
1. Acesse o Gerenciador de Negócios da Meta
2. Vá em **Pixels → Gerenciador de Eventos**
3. Selecione o Pixel `1706999140429793`
4. Na aba **Testar Eventos**, cole a URL do site e veja os eventos chegando em tempo real

---

## O que Isso Habilita a Partir de Agora

- **Otimização de campanhas:** O Facebook Ads pode otimizar seus anúncios para o evento `Lead` ou `CompleteRegistration`, encontrando automaticamente pessoas parecidas com quem já converteu
- **Públicos personalizados:** Criar públicos de remarketing (quem visitou o site mas não preencheu o formulário) e públicos semelhantes (lookalike) baseados em quem completou o diagnóstico
- **Funil no GA4:** Visualizar em qual etapa do funil as pessoas abandonam (visita → lead → qualificado → diagnóstico completo)
- **Atribuição de anúncios:** Saber quais campanhas de Instagram/Facebook geraram leads e diagnósticos reais
