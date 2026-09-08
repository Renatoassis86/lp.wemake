# Inventário de elementos visuais — Apresentação We Make para investidor

Documento de pesquisa e referência, produzido antes de qualquer código novo. Objetivo: mapear, com base em quem hoje constrói as apresentações mais premiadas do mercado, todo o repertório visual disponível, para então desenhar a arquitetura da apresentação We Make (próxima etapa) e só depois construir.

---

## 1. Autodiagnóstico honesto do que já existe

| Frente | Estado atual | Gap identificado |
|---|---|---|
| Cor | Tokens corretos (`--color-brand-mint/royal/sky/navy/ivory`), mas usados só como acento sobre fundo navy em quase todo slide | Cor deveria ser o fundo inteiro de blocos de seção em pelo menos metade da apresentação, não um detalhe |
| Movimento | Entrada/saída de slide inteiro + cartões em cascata | Falta coreografia *dentro* do tempo de permanência em cada slide: nada se desenha, nada se conecta, nada morfa |
| Dados | Um gráfico de linha animado (receita) | Falta mapa, organograma, árvore de hierarquia, diagrama de fluxo do currículo, contadores em mais lugares |
| Tipografia | Estática, só fade+translate | Falta tipografia cinética (palavras que constroem, pesos que mudam, ênfase por escala) |

---

## 2. Quem define o padrão de "apresentação que causa deslumbramento" hoje

Pesquisa feita agora (setembro de 2026), com fontes:

- **Agências de pitch deck de referência**: Superside, Slidebean, Buffalo 7 (Dell, Sony, BBC, F1), Waveup, Pitch Deck Fire — o padrão comum entre elas não é decoração, é *clareza extrema com um dispositivo visual dominante por slide*. ([Superside — 10 Best Pitch Deck Design Agencies](https://www.superside.com/blog/pitch-deck-design-agencies), [Waveup](https://waveup.com/blog/top-pitch-deck-design-agencies/))
- **Ferramentas nativas de apresentação premium**: Gamma (formato web-fluido, quebra o conceito de slide fixo), Pitch.com (colaboração + templates de marca rígidos), Beautiful.ai (motor de animação e transição automático, considerado o mais suave do mercado). ([comparação Gamma × Pitch × Beautiful.ai](https://plusai.com/blog/beautiful-ai-vs-gamma/))
- **Pitch decks reais mais estudados do mundo**: Airbnb (2008, 10-14 slides, três verdades incômodas, zero jargão), Uber (preto e branco, "Everyone's Private Driver", TAM enorme sem soar delirante). O padrão: investidor gasta 2 a 5 minutos na primeira leitura, então clareza vence sobre densidade de informação. ([teardown Airbnb/Uber](https://www.capitaly.vc/blog/pitch-deck-teardown-slide-by-slide-lessons-from-uber-airbnb), [15 unicórnios](https://www.slidegmm.ai/en/blog/15-unicorn-pitch-decks-breakdown-2026))
- **Jornalismo de dados / scrollytelling** (o padrão-ouro de "slide que se desenrola sozinho"): New York Times "Snow Fall" (pioneiro), Apple iPhone product pages (features reveladas por scroll), The Pudding (histórias 100% dirigidas por dado). Técnicas centrais: parallax, revelação progressiva, texto que aparece/some no ritmo do scroll. ([guia scrollytelling Webflow](https://webflow.com/blog/scrollytelling-guide), [exemplos Shorthand](https://shorthand.com/the-craft/scrollytelling-examples/index.html))
- **Sites premiados por motion design** (Awwwards 2026, categoria Framer Motion): uso de `useScroll`/`useTransform` para mapear posição de scroll direto em `scaleX`, `y`, `clipPath`; GSAP ScrollTrigger + Lenis para scroll suave sincronizado com animação. ([Awwwards Framer Motion](https://www.awwwards.com/websites/motion/), [guia scroll React](https://ogblocks.dev/blog/react-scroll-animation-in-framer-motion))

**Conclusão da pesquisa, direto:** nenhuma dessas referências usa "muita animação". Usam *um dispositivo visual certo por momento*, executado com precisão, sobre uma paleta de cor assumida sem medo. É exatamente o oposto do que construí até agora, que é seguro/uniforme demais.

---

## 3. Inventário de elementos por categoria

Cada item: o que é → por que serve à We Make especificamente → como construiríamos no nosso stack (Next.js + Framer Motion, já instalado no projeto).

### 3.1 Cor e fundo (a frente mais urgente de corrigir)

- **Bloco de seção em cor sólida/gradiente saturado** (não só navy): 3-4 slides inteiros em royal blue saturado, 2-3 em amarelo/sky como fundo dominante (com texto navy, não branco), mantendo navy só como "base neutra" entre eles. É o que educacross faz e nós ainda não fizemos de verdade.
- **Fundo sobre fundo real**: um cartão claro (ivory) flutuando sobre bloco de cor saturada — já fizemos isso uma vez (slide de capital externo). Deveria se repetir em mais 2-3 momentos-chave (não em todos, para não perder o impacto).
- **Duotone em fotos/ilustrações**: se usarmos fotos reais de alunos/escola, tratadas em duotone navy+mint, mantém a marca mesmo em conteúdo fotográfico.

### 3.2 Tipografia cinética

- **Palavra por palavra / linha por linha**: título constrói-se progressivamente (cada palavra com seu próprio delay), não aparece inteiro de uma vez.
- **Peso variável on-scroll**: uma palavra-chave do título ganha peso/tamanho maior conforme entra em foco (efeito usado em site da Apple e Stripe).
- **Número que morfa em vez de só contar**: já temos contador numérico; podemos adicionar troca de unidade (ex.: "2.000" vira "2 mil" com crossfade) para dar textura.

### 3.3 Gráficos e dados animados (além do gráfico de linha que já existe)

- **Funil animado** (já esboçado como barras) → evoluir para funil de verdade com formas trapezoidais que se estreitam.
- **Gráfico de rosca (donut) para despesas** com fatias que se desenham em sequência, mais legível que a lista de barras atual.
- **Matriz 2×2** (ex.: probabilidade × impacto dos riscos, hoje é só lista) com os riscos plotados como pontos que "pousam" na posição certa.

### 3.4 Mapa — pedido novo, ainda não existe

- **`@react-map/brazil`**: componente React pronto, SVG interativo do mapa do Brasil, leve, sem dependência de tile externo (bom para apresentação offline/tela cheia). ([npm](https://www.npmjs.com/package/@react-map/brazil))
- **Alternativa mais customizável**: SVG do Brasil por UF (arquivo estático, já usávamos um padrão parecido no CRM comercial) + `d3-geo`/TopoJSON para projeção, com bolhas de tamanho proporcional ao número de alunos por estado, animadas com `scale` entrando em sequência. Mais trabalho, mais controle de estilo (dá para pintar exatamente com os tokens da marca).
- **Uso na apresentação**: um slide "Onde estão nossos alunos hoje" com os estados das 12 escolas parceiras destacados, bolhas proporcionais, e um segundo estado "mercado endereçável" (5.000 escolas confessionais) sobreposto em tom mais fraco, mostrando visualmente a distância entre onde estamos e o mercado total.

### 3.5 Hierarquias, árvores e organogramas — pedido novo, ainda não existe

- **`react-organizational-chart`**: mais simples, aceita qualquer JSX como nó, ótimo para o organograma da equipe (hoje é só uma lista de cartões, poderia virar árvore de verdade com Dênis no topo). ([npm](https://www.npmjs.com/package/react-organizational-chart))
- **`react-d3-tree`**: mais robusto, layout hierárquico automático, ótimo se quisermos mostrar a árvore de decisão comercial (ex.: Currículo → gera → Formação/Plataforma/Espaço Maker/Assessoria) ou a estrutura societária.
- **Uso na apresentação**: organograma real da liderança (não cartões soltos) e uma "árvore do sistema" mostrando o Kit We Make no topo se ramificando nos 5 componentes, cada um com seus subelementos.

### 3.6 Fluxo dos elementos do currículo — pedido novo, ainda não existe

- **Diagrama de fluxo Conhecer → Explorar → Criar → Ciclo de Projeto**, hoje é 3 cartões lado a lado sem conexão visual. Deveria ser um fluxo real: setas ou linhas conectando as etapas, desenhando-se em sequência (`pathLength` do Framer Motion, a mesma técnica já usada no gráfico de receita).
- **React Flow**: biblioteca "padrão-ouro" atual para diagramas de fluxo interativos em React, canvas infinito, muito usada para builders visuais. Seria a ferramenta certa se quisermos o fluxo completo do sistema (Currículo → Plataforma → Formação → Espaço Maker → Assessoria, com setas de retroalimentação entre eles, exatamente como o Capítulo 3 do plano descreve em texto). ([Syncfusion/comparativo bibliotecas](https://awplife.com/top-10-javascript-diagramming-libraries/))
- **Mermaid** também apareceu na pesquisa como opção leve baseada em texto, mas tem menos controle de estilo de marca — melhor para diagramas internos, não para uma peça de investidor.

### 3.7 Cartões e composição

- Já usamos bem. Evoluir para **cartões com profundidade real** (sombra + leve rotação 3D on-hover, técnica comum em decks Beautiful.ai) nos momentos de maior impacto (tração, financeiro).

### 3.8 Transições e coreografia de scroll

- Trocar o modelo atual (slide inteiro entra/sai) por **scroll-driven dentro do slide**: usar `useScroll`+`useTransform` do Framer Motion para que elementos dentro de um mesmo slide se revelem conforme a pessoa avança (equivalente ao scrollytelling, mas cabendo no formato slide-a-slide que a Promisse usa).
- **Parallax leve** no fundo (camada de textura/gradiente se move mais devagar que o conteúdo) para dar profundidade sem exagero.

### 3.9 Fotografia e ícones

- Hoje 100% ícones Lucide (linha fina, consistente, mas genérico). Vale avaliar se existem fotos reais de alunos/escolas parceiras (autorizadas) para pelo menos 2-3 slides (capa, equipe, fechamento) — fotografia real pesa mais emocionalmente que ícone em pitch de investidor.

---

## 4. Como isso vira uma apresentação de 2026, não um catálogo de efeitos

Ponto crítico da pesquisa: **nenhuma referência boa usa todos os efeitos ao mesmo tempo**. O padrão Airbnb/Uber é o oposto: um dispositivo visual dominante por slide, executado com precisão, resto do slide quieto. Isso significa que a próxima etapa (o "projeto de apresentação") precisa decidir, slide a slide, **qual é o UM elemento visual que carrega aquele momento** — mapa aqui, organograma ali, fluxo lá — em vez de eu simplesmente empilhar tudo deste inventário em cada slide.

---

## 5. Próximos passos (conforme combinado)

1. Você revisa este inventário e me diz o que entra e o que fica de fora.
2. Eu desenho o "projeto de apresentação": slide a slide, qual elemento visual carrega cada momento, qual cor domina, qual conteúdo de cada capítulo entra em qual slide (incluindo o que você já sinalizou como faltante: mais profundidade por capítulo).
3. Só então construo.

## Fontes consultadas

- [Superside — 10 Best Pitch Deck Design Agencies 2026](https://www.superside.com/blog/pitch-deck-design-agencies)
- [Waveup — Top Pitch Deck Design Agencies](https://waveup.com/blog/top-pitch-deck-design-agencies/)
- [Beautiful.ai vs Gamma — comparação de animação](https://plusai.com/blog/beautiful-ai-vs-gamma/)
- [Gamma vs Pitch.com — NextDocs](https://www.nextdocs.io/compare/gamma-vs-pitch)
- [Webflow — Guia de Scrollytelling](https://webflow.com/blog/scrollytelling-guide)
- [Shorthand — Exemplos de Scrollytelling](https://shorthand.com/the-craft/scrollytelling-examples/index.html)
- [Pitch Deck Teardown — Uber/Airbnb](https://www.capitaly.vc/blog/pitch-deck-teardown-slide-by-slide-lessons-from-uber-airbnb)
- [15 Unicorn Pitch Decks 2026](https://www.slidegmm.ai/en/blog/15-unicorn-pitch-decks-breakdown-2026)
- [Awwwards — Melhores sites com Framer Motion](https://www.awwwards.com/websites/motion/)
- [React Scroll Animation em Framer Motion — 5 técnicas](https://ogblocks.dev/blog/react-scroll-animation-in-framer-motion)
- [@react-map/brazil — npm](https://www.npmjs.com/package/@react-map/brazil)
- [react-organizational-chart — npm](https://www.npmjs.com/package/react-organizational-chart)
- [react-d3-tree — npm](https://www.npmjs.com/package/react-d3-tree)
- [Top 10 JavaScript Diagramming Libraries 2026](https://awplife.com/top-10-javascript-diagramming-libraries/)
