# Prompt Mestre: Apresentação Cinematográfica & Relatório A4 · We Make (2027–2031)

Este documento contém o **Prompt Mestre Definitivo** compilado com todas as orientações, preferências, restrições e requisitos exigidos para a criação da apresentação de 40 slides (HTML/CSS) e do relatório A4 do **Plano de Negócio We Make (2027–2031)**.

---

## 📋 Documentos e Arquivos de Referência Obrigatórios

Ao executar a montagem do deck e do relatório A4, os seguintes documentos **DEVEM** ser lidos e utilizados como única fonte da verdade:

1. **`AGENTS.md`** ([AGENTS.md](file:///c:/repositorio/AGENTS.md))
   - Regras globais de apresentações, proibições de linguagem clichê, tom de voz em Português do Brasil, zona fixa de logomarca e requisitos de exportação/QA visual.
2. **`We_Make_Plano_de_Negocio_2027_2031_rev.pdf`** ([We_Make_Plano_de_Negocio_2027_2031_rev.pdf](file:///c:/repositorio/wemake/projetos_wemake/lp_wemake/docs/plano_negocio/We_Make_Plano_de_Negocio_2027_2031_rev.pdf))
   - Documento oficial da direção estratégica contendo a sequência exata dos 15 capítulos, dados financeiros, metas e premissas.
3. **`brand.css`** ([brand.css](file:///c:/repositorio/wemake/projetos_wemake/lp_wemake/public/deck/brand.css))
   - Tokens oficiais de cores da marca We Make (`--bg: #0B1F44`, `--surface: #0E2A47`, `--accent: #76F3CD`, `--muted: #A9C2DA`).
4. **`deck.css`** ([deck.css](file:///c:/repositorio/wemake/projetos_wemake/lp_wemake/public/deck/deck.css))
   - Sistema de design visual cinematográfico (canvas 1920x1080, tipografia em escala, cartões quadrados com badges flutuantes, animações `data-anim`).
5. **`roteiro.md`** ([roteiro.md](file:///c:/repositorio/decks/wemake-plano/roteiro.md))
   - Guia de narração com a frase falada de cada um dos 40 slides.
6. **`img-prompts.json`** ([img-prompts.json](file:///c:/repositorio/decks/wemake-plano/img-prompts.json))
   - Prompts para geração e validação de imagens realistas no Gemini.

---

## 🚫 O QUE É PROIBIDO E REPROVADO (NÃO FAZER)

- ❌ **TEXTO SOBREPOSTO EM IMAGENS**: É estritamente proibido colocar qualquer caixa de texto, legenda, badge ou banner sobreposto em cima de imagens ilustrativas (fotos de alunos, espaços maker ou ambientes). As imagens devem estar 100% limpas e desobstruídas.
- ❌ **EQUIPE EM CARDS SOLTOS OU GRADE RETANGULAR**: Não agrupar a equipe executiva como uma simples lista ou grade monótona. O Capítulo 07 exige um **Organograma Visual Dinâmico** em árvore hierárquica.
- ❌ **MISTURAR PARCEIROS EXTERNOS NA EQUIPE**: FICV está 100% removida. A ACSI Brasil é uma aliança estratégica institucional/conselho internacional, jamais membro da equipe interna de operações.
- ❌ **MAPA ABSTRATO DO BRASIL**: Proibido usar vetores genéricos ou ilustrativos do Brasil. É obrigatório usar o **Mapa Vetorial Oficial do IBGE** com os contornos reais dos 27 estados.
- ❌ **CAPAS DE LIVROS CORTADAS**: Proibido cortar, mascarar ou recortar as capas da Coleção Livro Maker. As capas devem aparecer 100% inteiras e visíveis (`object-fit: contain`).
- ❌ **CARTÕES MONÓTONOS E ARREDONDADOS SIMPLES**: Proibido utilizar cartões genéricos. Todos os cartões de dados e tópicos devem ser **quadrados** (`.card--square`) com ícone flutuante circular de 52px na borda superior (`margin-top: -38px`).
- ❌ **DESTRUIÇÃO DA LOGO-ZONE**: Proibido permitir que a `.logo-zone` estique verticalmente na lateral direita da tela. Deve possuir obrigatoriamente `top: auto; max-height: 48px; display: inline-flex; bottom: 40px; right: 40px;`.
- ❌ **INVERSÃO DA SEQUÊNCIA DE CAPÍTULOS**: Proibido alterar a ordem dos capítulos. A apresentação deve seguir estritamente a ordem cronológica dos 15 capítulos do Plano de Negócio PDF.
- ❌ **LINGUAGEM DE MARQUETINGUE CLICHÊ**: Proibido utilizar palavras como *"sinergia"*, *"robusto"*, *"alavancar"*, *"solução completa"*, *"de forma estratégica"*.
- ❌ **PONTOS FINAIS E TRAVESSÕES EM TÍTULOS**: Proibido usar travessões `—` ou ponto final ao término de títulos.

---

## ✅ O QUE É EXIGIDO E APROVADO (ELEMENTOS VISUAIS E GRÁFICOS)

### 1. Organograma Visual Dinâmico de Governança (Capítulo 07 · Slide 19 & Relatório A4)
- **Estrutura em Árvore Hierárquica**:
  - **Nível 1 (Topo)**: Card de Destaque CEO (`.org-node--ceo`) com **Dênis Júlio Pereira Francisco** (CEO & Diretor Pedagógico - Estratégia, P&D e Parcerias).
  - **Linhas Conectoras**: Linha vertical e ramificação horizontal em gradiente menta (`#76F3CD`).
  - **Nível 2 (Diretorias/Heads Operacionais)**: 4 cards conectados abaixo:
    1. **Renato Assis**: Gerência Administrativa & Financeira.
    2. **Suzana Bonifazio**: Consultoria Pedagógica & Formação.
    3. **Emanuel Peixoto**: Marketing & Expansão Comercial.
    4. **Equipe P&D / TI**: Plataforma Arkos & Suporte Técnico.
- **Animação Escalonada**: Entrada dinâmica (`data-anim="rise"` com `data-delay="100"`, `"200"`, `"250"`, `"300"`, `"350"`).

### 2. Mapa Vetorial Oficial do IBGE com Densidade de Escolas (Capítulos 05 e 07 · Slides 12/20 & Relatório A4)
- Projetado a partir das coordenadas GeoJSON reais do IBGE (27 estados).
- Rotulagem explícita com pino de destaque e balão de dados por estado:
  - **DF (Sede)**: 12 Escolas Ativas (`#76F3CD`)
  - **São Paulo (SP)**: 14 Escolas (`#FFCC00`)
  - **Rio Grande do Sul (RS)**: 10 Escolas (`#76F3CD`)
  - **Paraná (PR)**: 8 Escolas
  - **Santa Catarina (SC)**: 6 Escolas
  - **Paraíba (PB)**: 5 Escolas
  - **Espírito Santo (ES)**: 4 Escolas
  - **Ceará (CE)**: 4 Escolas
  - **Maranhão (MA)**: 3 Escolas
- Linhas tracejadas de conexão saindo da sede no DF para todos os estados em expansão.

### 3. Coleção Livro Maker Completa — Capas Inteiras (Capítulo 06 · Slide 14 & Relatório A4)
- Exibição de 5 capas dos livros autorais físicas sem cortes (`object-fit: contain; height: 260px`):
  1. `capa_infantil_3.png` — Educação Infantil
  2. `capa_ef1_1ano.png` — 1º Ano EF
  3. `capa_ef1_3ano.png` — 3º Ano EF
  4. `capa_ef1_4ano.png` — 4º Ano EF
  5. `capa_ef1_5ano.png` — 5º Ano EF

### 4. Ciclo Maker de 6 Passos — Fluxo de Aprendizagem (Capítulo 03 · Slide 08 & Relatório A4)
- Processo horizontal encadeado com setas conectoras:
  `01. Investigar` → `02. Projetar` → `03. Construir` → `04. Testar` → `05. Refletir` → `06. Compartilhar`

### 5. Design dos Cartões Quadrados com Ícones Flutuantes
- Formato quadrado (`.card--square`) com proporção 1:1.
- Ícone circular flutuante de 52px no topo (`.card__badge`), extrapolando a borda superior (`margin-top: -38px`).
- Marcadores de verificação (`.card__bullet`) com ícones de checklist SVG.

### 6. Inclusão dos Elementos Visuais no Relatório A4
- O relatório A4 em TSX (`features/admin/relatorio-a4.tsx`) e seu arquivo de dados (`data/plano-negocio-relatorio.ts`) devem conter a renderização nativa em código do **Organograma**, do **Mapa IBGE do Brasil**, da **Galeria das Capas de Livros** e do **Ciclo Maker**.

---

## 🗺️ Estrutura Sequencial Exata de 40 Slides (Capítulos 01 ao 15)

```markdown
- Slide 01: Capa Cinematográfica: We Make Educação Tecnológica (Plano 2027-2031)
- Slide 02: Capítulo 01 : Sumário Executivo — Visão Geral & Métricas de Crescimento
- Slide 03: Capítulo 01 : Sumário Executivo — Solução Integrada do Kit We Make
- Slide 04: Capítulo 02 : Apresentação e Identidade — Missão, Visão e Valores (Verdade, Beleza, Bondade)
- Slide 05: Capítulo 02 : Apresentação e Identidade — Histórico e Consolidação (2023 → 2024 → 2026)
- Slide 06: Capítulo 03 : O Sistema We Make — Os 5 Pilares do Kit We Make
- Slide 07: Capítulo 03 : O Sistema We Make — Cosmovisão Cristã e Mordomia Digital
- Slide 08: Capítulo 03 : O Sistema We Make — Ciclo Maker de 6 Passos
- Slide 09: Capítulo 04 : Análise de Oportunidade — Mercado Confessional e Barreira de Entrada
- Slide 10: Capítulo 04 : Análise de Oportunidade — Ciberética e Alinhamento às Leis Anti-Telas
- Slide 11: Capítulo 05 : Mercado, Legislação e Concorrência — Dimensionamento TAM, SAM, SOM (20.250 alunos)
- Slide 12: Capítulo 05 : Mercado, Legislação e Concorrência — Presença Territorial e Mapa IBGE (DF HQ + 8 Estados)
- Slide 13: Capítulo 05 : Mercado, Legislação e Concorrência — 5 Leis Estaduais de Restrição de Celulares
- Slide 14: Capítulo 06 : Produtos e Serviços — Coleção Livro Maker (Capas Inteiras do Infantil ao 5º Ano)
- Slide 15: Capítulo 06 : Produtos e Serviços — Plataforma Arkos (LMS & Gestão de Aprendizagem)
- Slide 16: Capítulo 06 : Produtos e Serviços — Espaço Maker (Projeto Físico e Ambientação)
- Slide 17: Capítulo 06 : Produtos e Serviços — Formação Docente & Academia We Make
- Slide 18: Capítulo 06 : Produtos e Serviços — Assessoria Institucional Contínua
- Slide 19: Capítulo 07 : Estrutura Organizacional e Operações — ORGANOGRAMA VISUAL DE GOVERNANÇA (CEO Dênis Júlio + Todos os Líderes: Renato Assis, Iran Firmino, Suzana Bonifazio, Emanuela Monteiro, Emanuel Peixoto, Christiano Bonifazio, Atendimento Comercial, 3 Devs Arkos e Cientista de Dados)
- Slide 20: Capítulo 07 : Estrutura Organizacional e Operações — Fluxo de Implantação e Logística
- Slide 21: Capítulo 08 : Pesquisa e Desenvolvimento — P&D, Laboratório Ciberético e Inovação CEC
- Slide 22: Capítulo 09 : Marketing e Estratégia Comercial — Funil B2B Escolas Confessionais
- Slide 23: Capítulo 09 : Marketing e Estratégia Comercial — Estratégia B2C Famílias Educadoras (Homeschooling)
- Slide 24: Capítulo 09 : Marketing e Estratégia Comercial — Modelo de Precificação e Ticket Médio
- Slide 25: Capítulo 10 : Premissas de Crescimento — Evolução da Base de Alunos (4.000 → 20.250)
- Slide 26: Capítulo 10 : Premissas de Crescimento — Detalhamento Orçamentário 2027 (R$ 1,15M Receita / R$ 848k Despesa)
- Slide 27: Capítulo 10 : Premissas de Crescimento — Margem Operacional Real (26,2% em 2027)
- Slide 28: Capítulo 11 : Análise SWOT — Forças e Oportunidades
- Slide 29: Capítulo 11 : Análise SWOT — Fraquezas e Ameaças com Planos de Mitigação
- Slide 30: Capítulo 12 : Plano Financeiro — DRE Projetado Consolidado 2027–2031
- Slide 31: Capítulo 12 : Plano Financeiro — Fluxo de Caixa e Breakeven
- Slide 32: Capítulo 12 : Plano Financeiro — Unit Economics (EBITDA 42,8%, LTV/CAC > 8x)
- Slide 33: Capítulo 13 : Estratégia de Crescimento Futuro — Horizonte 2030: Escola Tecnologia
- Slide 34: Capítulo 13 : Estratégia de Crescimento Futuro — Horizonte 2031+: Faculdade de Tecnologia
- Slide 35: Capítulo 14 : Análise de Riscos — Mitigação do Risco de Liderança Central
- Slide 36: Capítulo 14 : Análise de Riscos — Proteção de Propriedade Intelectual & Marcas
- Slide 37: Capítulo 14 : Análise de Riscos — Governança Preventiva e Centros de Custo
- Slide 38: Capítulo 15 : Considerações Finais — Síntese de Valor para Investidores e Escolas
- Slide 39: Capítulo 15 : Considerações Finais — Cronograma e Milestones de Execução
- Slide 40: Capítulo 15 : Considerações Finais & Fecho — Chamada para Ação, Pedido, Responsável e Prazo
```

---

## 🎯 PROMPT DE EXECUÇÃO PRONTO PARA USO

Copie e utilize a instrução abaixo para gerar a apresentação ou recriar o projeto a partir do zero:

```markdown
Por favor, monte a apresentação de 40 slides (HTML/CSS em canvas 1920x1080) e atualize o relatório A4 para o Plano de Negócio We Make (2027–2031) seguindo rigorosamente o documento `docs/prompt_mestre_apresentacao_wemake.md`.

Regras Inegociáveis:
1. Siga a sequência cronológica dos 15 Capítulos do PDF sem alterar a ordem.
2. Crie o Organograma Visual Dinâmico no Capítulo 07 (Slide 19) com o CEO Dênis Júlio no topo e ramificações conectando os 4 líderes operacionais (Renato Assis, Suzana Bonifazio, Emanuel Peixoto, Equipe TI/Arkos).
3. Utilize o Mapa Vetorial Oficial do IBGE (27 estados SVG) com pins e quantidades por estado nos Capítulos 05 e 07.
4. Exiba as capas dos livros da Coleção Maker 100% inteiras e sem cortes.
5. Nunca coloque caixas de texto ou badges sobrepostos em cima de fotos/imagens ilustrativas.
6. Mantenha os cartões no formato quadrado (.card--square) com ícones flutuantes circulares de 52px.
7. Garanta que a .logo-zone fique fixa no canto inferior direito sem distorção vertical (top: auto; max-height: 48px).
8. Replique todos estes elementos visuais (Organograma, Mapa IBGE, Capas de Livros e Ciclo Maker) no relatório A4 (/admin/plano-de-negocio/relatorio).
```
