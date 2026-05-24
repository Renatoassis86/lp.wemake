# Roteiro de Produção Audiovisual

**Landing institucional · We Make Educação Tecnológica · Campanha de captação 2027**

> _"Como preparar nossos alunos para um mundo profundamente tecnológico sem entregá‑los ao espírito deste mundo?"_
> — fio condutor da campanha, do livro do CEO

---

## 1 · Contexto e direção de arte

A landing é estruturada como um **documentário interativo em 14 atos**. Os assets audiovisuais não são "ilustração" — eles **carregam o argumento institucional**. Cada peça precisa transmitir simultaneamente:

- **Autoridade intelectual** (não é startup, é editora pensante)
- **Profundidade espiritual** (cosmovisão cristã reformada)
- **Excelência técnica** (escolas que escolhem We Make estão escolhendo qualidade)
- **Humanidade** (formamos pessoas, não usuários)

### Referências obrigatórias

| Disciplina         | Referências                                     |
| ------------------ | ----------------------------------------------- |
| Direção de fotografia | Cinematografia da Apple keynote · Documentários Netflix (*Abstract*, *Chef's Table*) · TED Talks premium |
| Iluminação         | Natural soft, golden hour, janela lateral, luz de Caravaggio em retratos |
| Color grade        | Sombras navy/azul-noite profundo · highlights creme/marfim · saturação **baixa**, contraste **médio-alto** |
| Composição         | Espaço negativo generoso · regra dos terços · profundidade de campo rasa em retratos |
| Movimento          | Câmera **lenta e deliberada** · dolly, gimbal, slider · zero handheld nervoso |

### O que evitar

- ❌ Stock photo genérico (qualquer escola cristã reconhece em 2 segundos)
- ❌ Sorriso forçado para câmera
- ❌ "Posed" — pessoas paradas olhando para a lente
- ❌ Cores saturadas (especialmente verde/amarelo de "escola moderna")
- ❌ Lente fish-eye / GoPro / drone agressivo
- ❌ Música/voz off motivacional clichê

### O que perseguir

- ✅ Fly-on-the-wall: a pessoa absorvida no que está fazendo
- ✅ Detalhes (mãos, ferramentas, expressão concentrada)
- ✅ Luz natural lateral com sombra rica
- ✅ Crianças e adolescentes em movimento de criação real
- ✅ Tempo de silêncio nos vídeos (deixe respirar)
- ✅ Bíblia, livro, prancheta, ferro de solda, peça impressa em 3D — objetos como personagens

---

## 2 · Especificações técnicas gerais

### Vídeo

| Item             | Spec                                                            |
| ---------------- | --------------------------------------------------------------- |
| Codec entrega    | **H.264 main profile** (MP4) — máxima compatibilidade           |
| Resolução master | **3840 × 2160** (4K UHD) — sempre. Deliver final em 1080p.      |
| Aspect ratio     | **16:9** sempre — sem cinemascope, sem vertical                 |
| Frame rate       | **24 fps** (cinematic) — opcional 25 fps se gravado em Europa   |
| Bitrate entrega  | ≤ 6 Mbps em 1080p · ≤ 2 Mbps no loop ambient                    |
| Áudio            | AAC 192 kbps · 48 kHz · estéreo                                 |
| Captions         | **WebVTT (`.vtt`)** em pt-BR — obrigatório no manifesto         |
| Color space      | Rec. 709 (não usar HDR, ainda)                                  |
| LUT sugerido     | Cinematic teal-and-cream sutil; **NÃO** orange-and-teal pesado  |

### Foto

| Item             | Spec                                                            |
| ---------------- | --------------------------------------------------------------- |
| Formato entrega  | **JPEG q88** ou **AVIF** (o Next.js negocia automaticamente)    |
| Resolução master | **3840 × 2160** mínimo (4K horizontal)                          |
| Aspect ratio     | **16:9** dominante para cenas full-bleed; alguns retratos 4:5   |
| Peso pós-otimização | ≤ 480 kB por imagem (Next/Image cuida do resto)              |
| Color profile    | sRGB                                                            |
| Bits             | 8-bit é suficiente; 10-bit se houver gradação                   |
| Naming           | **kebab-case minúsculo** — `01-criancas-programando.jpg`        |

### Aspectos legais

- **Termo de imagem assinado** para toda pessoa identificável (especialmente menores — pais/responsáveis precisam assinar)
- Para crianças sem termo: enquadramento de costas, lateral, mãos, ou desfocado
- Arquivar termos em pasta separada com mesmo prefixo do nome do arquivo

---

## 3 · Roteiro completo dos assets

Cada item lista: **código do arquivo · prioridade · tipo · onde aparece · descrição cinematográfica · quote da landing que ancora o sentido**.

> **Prioridades**: **P0** = bloqueia o lançamento · **P1** = cobre lacuna importante · **P2** = enriquecimento futuro

---

### ATO I · Hero cinematográfica

#### 🎬 1.1 — Loop ambient do CEO no fundo do hero — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/videos/ceo-hero-loop.mp4`                                    |
| Poster           | `/public/videos/ceo-hero-poster.jpg`                                  |
| Duração          | **8 a 14 segundos** — loop perfeito                                   |
| Som              | **Sem som** (será silenciado no DOM)                                  |
| Peso             | ≤ 4 MB                                                                |

**Direção**: plano médio-fechado de Dênis falando para alguém fora do quadro (não olhar para câmera). Luz lateral natural, fundo desfocado de espaço maker. Movimento sutil de gimbal (mini-orbit). A primeira e a última frame precisam combinar para o loop fechar sem cut visível.

**Mood**: contemplativo, sério, mas humano. **Não** é "pose de fundador" — é um educador no meio de uma ideia.

**Quote ancorada**: _"Formamos pessoas para o futuro, com raiz."_

---

### ATO II · O Mundo Mudou

Sem assets fotográficos — design tipográfico puro. Ícones já cobertos.

---

### ATO III · O Problema das Escolas

Sem assets fotográficos — design tipográfico puro.

---

### ATO IV · A Visão da We Make (Verdade · Beleza · Bondade · Mandato Cultural)

Sem assets fotográficos — design tipográfico puro.

> **Nota de continuidade**: o livro do CEO trabalha com **7 princípios**, mas a landing condensa em **3 transcendentais + Mandato Cultural** para velocidade narrativa. Os 7 princípios devem aparecer no livro/PDF gratuito, não nesta ato.

---

### ATO V · Manifesto filmado do CEO (a peça mais importante)

#### 🎬 5.1 — Vídeo institucional completo do CEO — **P0 CRÍTICO**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/videos/ceo-manifesto-1080.mp4`                               |
| Poster           | `/public/videos/ceo-manifesto-poster.jpg`                             |
| Captions         | `/public/videos/ceo-manifesto-pt-BR.vtt`                              |
| Duração ideal    | **8 min 24 s** (referenciado em `constants/site.ts`)                  |
| Som              | Mono ou estéreo — voz na frente, fundo silencioso                     |
| Peso             | ≤ 60 MB em 1080p H.264                                                |

**Estrutura narrativa em 7 capítulos** (já codificada em `siteConfig.ceo.talkChapters`):

| #  | Timestamp | Capítulo                            | O que Dênis fala                                            |
| -- | --------- | ----------------------------------- | ----------------------------------------------------------- |
| 01 | 00:00     | Introdução                          | Apresentação pessoal · de onde vem · por que está aqui      |
| 02 | 00:32     | A pergunta inicial                  | "Como sua escola está respondendo à pergunta sobre tecnologia?" |
| 03 | 02:14     | Onde tudo começou                   | A história fundacional da We Make                           |
| 04 | 03:48     | O encontro com a tradição cristã    | Cosmovisão reformada e os 3 transcendentais                 |
| 05 | 05:22     | O movimento We Make                 | O que é a editora hoje · escala · presença                  |
| 06 | 06:55     | Convite às escolas                  | "Vocês não precisam fazer isso sozinhas"                    |
| 07 | 08:00     | O que vem agora                     | CTA suave para reunião                                      |

**Direção de fotografia**:

- **Dois ângulos** alternados: plano americano (cintura para cima) + close (rosto, conforme a fala se aprofunda)
- **Câmera A**: tripé fixo, plano americano, ligeiramente abaixo da linha dos olhos (autoridade sem soberba)
- **Câmera B**: gimbal com micro-movimento, close-up nos momentos emocionais
- **B-roll obrigatório** (corta entre falas): mãos folheando o livro · estante com livros teológicos e técnicos · prancheta com diagrama · vista de um espaço maker em atividade · uma criança ou adolescente concentrado no fundo
- **Cenário**: escritório/biblioteca pessoal de Dênis OU um espaço maker premium (preferir o primeiro — mais íntimo)
- **Vestuário**: camisa social sem gravata, tom terra/marinho · evitar branco puro (estoura) e logos de marca

**Iluminação**:

- Key light: janela lateral grande, difusor leve
- Fill: rebatedor dourado fraco
- Back: hair light sutil que separa a silhueta do fundo
- Fundo: profundidade — não parede chapada · livros, peça impressa em 3D, planta

**Áudio**:

- **Lapela cardióide** + boom como backup
- Gravar **30 s de room tone** para edição
- Evitar ar-condicionado, geladeira, ventilador

**Captions `.vtt`**:

- Gerar em pt-BR
- Quebras curtas (≤ 42 caracteres por linha, ≤ 2 linhas por cue)
- Marcadores de ênfase usando `<i>...</i>` (renderizam em italic editorial via `::cue` já estilizado)
- Marcador de fala importante com `<b>` (renderiza em azul claro)

**Quote ancorada**: _"A pergunta que deu origem à We Make."_

#### 🖼️ 5.2 — Retrato editorial do CEO — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/people/denis-portrait.jpg`                                   |
| Resolução        | 1200 × 1200 mínimo (será usado como avatar circular de 80px)          |
| Crop             | Quadrado, rosto centralizado, ombros visíveis                         |

**Direção**: retrato de Caravaggio digital. Olhar direto ou ligeiramente para fora do quadro (3/4). Fundo navy/preto profundo, sem distração. Iluminação Rembrandt clássica (triângulo de luz na bochecha oposta). Sem sorriso forçado — expressão serena, presente. Pós: clarity baixa, blacks profundos, NÃO vinheta exagerada.

**Mood**: o educador-pensador. Não o vendedor sorridente. Não o pastor com Bíblia. **Editor de tradição.**

---

### ATO VI · Soluções institucionais (5 frentes)

Atualmente o design usa **apenas ícones** — funciona muito bem assim. Fotos seriam **P2 opcionais** apenas se quiser enriquecer cada card com uma imagem de contexto.

Se for produzir (recomendo **adiar**):

- `/public/photos/service-01-curriculo.jpg` — pilha de cadernos We Make abertos em uma mesa, foco em ilustração interna
- `/public/photos/service-02-formacao.jpg` — sala com educadores em formação (vista de costas, cabeças e luz)
- `/public/photos/service-03-plataforma.jpg` — close em um tablet/notebook mostrando a interface real (precisa existir antes)
- `/public/photos/service-04-espaco.jpg` — espaço maker em planta baixa renderizada OU foto wide de um espaço já entregue
- `/public/photos/service-05-assessoria.jpg` — duas pessoas conversando sobre um plano em uma mesa (Dênis + diretor, idealmente)

**Prioridade**: **P2** — a iconografia atual sustenta a seção.

---

### ATO VII · Presença Nacional

Mapa SVG procedural — **sem assets externos necessários**. Apenas confirmar/corrigir números em `data/states.ts` quando tiver a lista real de escolas parceiras por estado.

---

### ATO VIII · Humans (sequência cinematográfica de 6 cenas) ★

**Esta é a segunda peça mais importante do site depois do manifesto do CEO.** São 6 fotografias em larga escala que carregam o argumento de que a We Make forma **pessoas**.

#### 🖼️ 8.1 — Crianças programando — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/01-criancas-programando.jpg`                          |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Centro                                                                |
| Tom (paleta)     | **Warm** — laranja-âmbar suave + sombras navy                         |

**Shot**: criança de 7–9 anos (Educação Infantil tardia ou Fundamental I) olhando para um projeto maker — uma placa Arduino com LED aceso, ou um Lego programável piscando. Captar o **momento do assombro**: olhos focados, ligeiramente arregalados, boca semiaberta. NÃO posada — capturar de verdade, com o objeto **emitindo a luz que ilumina o rosto**.

**Quote ancorada**: _"Antes do código, o assombro."_

#### 🖼️ 8.2 — Adolescentes em construção — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/02-adolescentes-codigo.jpg`                           |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Esquerda                                                              |
| Tom              | **Cool** — azul-noite, monitor como única fonte de luz                |

**Shot**: adolescente (13–17) em uma estação de trabalho, lateralmente em relação à câmera, monitor lateral com **código real visível** (não Lorem ipsum), mão na mesa próxima do teclado, expressão concentrada. Idealmente um terço do quadro à esquerda mostrando o ambiente da estação (sketchbook, post-its, caneca), dois terços à direita para a tipografia respirar.

**Quote ancorada**: _"Aprender não é consumir — é construir."_

#### 🖼️ 8.3 — Oração em grupo — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/03-oracao-em-grupo.jpg`                               |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Centro                                                                |
| Tom              | **Amber** — luz dourada baixa, contemplativa                          |

**Shot**: grupo de 4–8 estudantes (idades variadas) em círculo, mãos dadas ou cabeças levemente inclinadas. **Sem closes de rosto** — captar a cena de cima ou de longe, em silhueta. Ambiente sóbrio, possivelmente capela ou sala silenciosa com janela alta entrando luz cálida. Esta é a foto mais delicada do conjunto — **menos é mais**.

**Quote ancorada**: _"Antes da técnica, a contemplação."_

#### 🖼️ 8.4 — Espaço maker — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/04-espaco-maker.jpg`                                  |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Centro                                                                |
| Tom              | **Violet** — luz mista, neon sutil dos equipamentos                   |

**Shot**: wide-shot de um laboratório maker premium em **atividade real**. Vê-se: bancada com peças impressas 3D, ferro de solda em uso, monitor com modelagem CAD aberta, prancheta com esboços, estudantes ao fundo desfocados. **NÃO** é foto de catálogo de móveis — é cena viva. Arquitetura limpa, madeira clara, paredes neutras, equipamentos visíveis mas não obstruindo.

**Quote ancorada**: _"Espaços que ensinam a fazer."_

#### 🖼️ 8.5 — Professores ensinando — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/05-professores-ensinando.jpg`                         |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Direita                                                               |
| Tom              | **Warm** — luz de janela lateral                                      |

**Shot**: educador de 30–55 anos inclinado próximo a um estudante, mostrando algo numa tela ou peça. O educador deve **olhar para o estudante**, não para a câmera. Profundidade de campo rasa — foco no educador, estudante levemente desfocado em primeiro plano. Mão do educador gesticulando ou apontando.

**Tom institucional**: **autoridade calorosa**. Não é o "professor jovem maker descolado" — é o **mestre**.

**Quote ancorada**: _"Quem ensina, primeiro pensa."_

#### 🖼️ 8.6 — Colaboração / criatividade — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/photos/06-colaboracao-criatividade.jpg`                      |
| Resolução        | 3840 × 2160 (16:9)                                                    |
| Focal point      | Centro                                                                |
| Tom              | **Ivory** — luz natural ampla, atmosfera marfim                       |

**Shot**: 3–5 estudantes em volta de uma mesa, trabalhando juntos num protótipo (robô, maquete, projeto físico). Mãos no centro do quadro, rostos parcialmente visíveis em segundo plano. **Energia colaborativa real** — alguém apontando, outro segurando uma peça, outro com o caderno aberto. Wide shot. A peça que estão construindo deve ser **identificável** (não abstrata).

**Quote ancorada**: _"Construir juntos — como fomos feitos para fazer."_

---

### ATO IX · Material gratuito (livro do CEO)

#### 📕 9.1 — Capa do livro renderizada — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | A capa atual é **desenhada em CSS** dentro de `free-material.tsx`     |
| Substituir por   | `/public/books/tecnologia-virtude-educacao-crista-cover.jpg`          |
| Resolução        | 1200 × 1800 (proporção 2:3 — formato livro)                           |
| Formato          | Mockup em ângulo OU capa plana frontal — escolher um e ser consistente |

**Direção**: capa real do livro **"Tecnologia, Virtude e Educação Cristã: Sete Princípios para Ensinar Tecnologia com Coerência e Fidelidade"** de Dênis Júlio Pereira Francisco. Renderização do livro impresso em vista frontal, sombra suave projetada para baixo-direita, fundo transparente OU navy escuro para harmonizar com a seção.

**Nota**: o livro existe (referenciado no guia comercial). Pegar a capa diagramada do projeto gráfico original e exportar em alta.

#### 📄 9.2 — Capas dos 3 e-books complementares — **P1**

Cada um em formato 600 × 800 (2:3):

- `/public/books/cosmovisao-curriculo.jpg` — "Cosmovisão & Currículo"
- `/public/books/guia-espaco-maker-cristao.jpg` — "Guia do Espaço Maker Cristão"
- `/public/books/ia-na-escola-crista.jpg` — "IA na Escola Cristã"

**Direção**: design de capa minimalista, série editorial coerente. Tipografia display em capa única branca/marfim, marca We Make no rodapé.

---

### ATO X · Grupo VIP

#### 📱 10.1 — Mockup de conversa WhatsApp — **P1**

Atualmente desenhado em CSS dentro de `vip-group.tsx`. **Funciona perfeitamente** com o mock atual e provavelmente é melhor que screenshots reais (sem questões de privacidade dos membros).

Se desejar substituir por screenshot real anonimizado:
- `/public/screens/vip-whatsapp-preview.png` — 800 × 1200 (vertical mobile)
- Anonimizar todos os nomes/avatares

**Recomendação**: manter o mock CSS. Mais limpo, mais controlável, sem questões legais.

---

### ATO XI · Consultor comercial

Sem assets — o ícone de telefone + ping verde já comunica.

---

### ATO XII–XIV · FAQ, CTA final, Reunião

Sem assets fotográficos. Tipografia pura.

---

### Brand assets gerais (em qualquer ato)

#### 🎨 BR.1 — Logo SVG oficial — **P0** (existe)

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Existe em        | `doc/we-make_cor-1.svg` — versão colorida (mint + blue)               |
| Falta criar      | `/public/brand/wemake-logo.svg` — versão para uso no site             |
| Versões          | Colorida (cabeçalho) · monocromática branca (footer/dark) · símbolo isolado (favicon) |

**Nota**: o logo atual usado no header (`components/ui/logo.tsx`) é um **monograma desenhado em código**. Considerar substituir pelo logo real ou mantê-lo como ícone secundário enquanto a marca segue convivendo.

#### 🌐 BR.2 — Open Graph image — **P0**

| Campo            | Valor                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Código           | `/public/og/wemake-og.jpg`                                            |
| Resolução        | **1200 × 630** (padrão OG)                                            |
| Conteúdo         | Logo We Make + headline _"Tecnologia, formação humana e cosmovisão cristã"_ + retrato pequeno de Dênis ou imagem ambient |

**Direção**: peça gráfica única, dark navy gradient, tipografia display branca. Será o thumbnail no WhatsApp, LinkedIn, Twitter, etc — **alta importância** porque é a primeira impressão da landing.

#### 🪙 BR.3 — Favicons — **P0**

| Código                              | Tamanho        |
| ----------------------------------- | -------------- |
| `/public/favicon.ico`               | 32 × 32        |
| `/public/favicon.svg`               | vetor (existe) |
| `/public/apple-touch-icon.png`      | 180 × 180      |
| `/public/icons/icon-192.png`        | 192 × 192      |
| `/public/icons/icon-512.png`        | 512 × 512      |
| `/public/icons/icon-maskable.png`   | 512 × 512 maskable |

---

## 4 · Direção sonora (apenas para o vídeo manifesto)

- **Trilha**: peça orquestral mínima · piano + cordas em pp · entra no segundo 0:08 e some quando Dênis fala
- **NÃO usar**: música cinematográfica "épica" tipo trailer Hollywood · sample loops genéricos · qualquer faixa com batida marcada
- **Referência**: trilha do *Chef's Table* (Netflix) · *The Social Dilemma* (partes contemplativas)
- **Licenciamento**: usar **Musicbed** ou **Artlist** (ambos têm licença comercial broad) · evitar YouTube Audio Library (saturado)
- **Sound design**: room tone próprio · sem stingers · sem foley dramático
- **Mixagem**: voz em -14 LUFS · trilha duckada para -26 dB durante fala

---

## 5 · Cronograma sugerido de produção

| Fase                                        | Duração ideal | Output                                                  |
| ------------------------------------------- | ------------- | ------------------------------------------------------- |
| **0** Pré-produção: lista de escolas piloto · termos de imagem · scouting de espaços | 1 semana | Termos assinados · espaços confirmados · cronograma de gravação |
| **1** Captação P0: 6 fotos humanas + retrato CEO + loop hero | 2 a 3 dias de gravação em até 2 escolas | Pasta de raws |
| **2** Captação manifesto CEO (vídeo principal de 8 min) | 1 dia de gravação dedicado | Bruto do manifesto + B-roll |
| **3** Edição, color grade, sound design, legendas | 2 a 3 semanas | Arquivos finais nos códigos esperados |
| **4** Capa do livro renderizada + OG image + favicons | 1 semana paralela | Brand assets |
| **5** Drop dos arquivos no `/public/` + commit | 1 dia | Landing ao vivo com os assets reais |

---

## 6 · Checklist final de entregas

### Vídeos

- [ ] `/public/videos/ceo-hero-loop.mp4` — loop ambient (8–14 s, sem áudio, ≤ 4 MB)
- [ ] `/public/videos/ceo-hero-poster.jpg` — frame do loop como fallback
- [ ] `/public/videos/ceo-manifesto-1080.mp4` — manifesto completo (~8 min 24 s)
- [ ] `/public/videos/ceo-manifesto-poster.jpg` — frame editorial do manifesto
- [ ] `/public/videos/ceo-manifesto-pt-BR.vtt` — legendas WebVTT em pt-BR

### Fotos humanas (sequência cinematográfica do Ato VIII)

- [ ] `/public/photos/01-criancas-programando.jpg`
- [ ] `/public/photos/02-adolescentes-codigo.jpg`
- [ ] `/public/photos/03-oracao-em-grupo.jpg`
- [ ] `/public/photos/04-espaco-maker.jpg`
- [ ] `/public/photos/05-professores-ensinando.jpg`
- [ ] `/public/photos/06-colaboracao-criatividade.jpg`

### Retrato e brand

- [ ] `/public/people/denis-portrait.jpg` — retrato editorial do CEO
- [ ] `/public/books/tecnologia-virtude-educacao-crista-cover.jpg` — capa do livro
- [ ] `/public/og/wemake-og.jpg` — Open Graph 1200 × 630
- [ ] `/public/favicon.ico`, `/public/apple-touch-icon.png`, ícones PWA

### Opcionais (P1/P2)

- [ ] Capas dos 3 e-books complementares
- [ ] Fotos de apoio das 5 frentes (Ato VI)
- [ ] Foto institucional para footer

---

## 7 · Observações de alinhamento (não relacionadas à produção)

Durante a leitura dos documentos institucionais, identifiquei dados que o código atual ainda não reflete. Não são obstáculos para a produção, mas precisam ser ajustados antes do go-live:

| Item               | No código hoje                | Real (segundo `Guia_Comercial_We_Make_2027.pdf`) |
| ------------------ | ----------------------------- | ------------------------------------------------ |
| Domínio            | `wemake.com.br`               | **`wemake.tec.br`**                              |
| Email institucional| `institucional@wemake.com.br` | **`contato@wemake.tec.br`**                      |
| Telefone           | placeholder `+55 (11) 0000-0000` | **(83) 98230-1530**                           |
| Cidade-sede        | São Paulo                     | **Natal · Rio Grande do Norte**                  |
| Nome completo CEO  | "Dênis"                       | **Dênis Júlio Pereira Francisco**                |
| Tradição teológica | "cristã clássica"             | **Cosmovisão Cristã Reformada** (explicitar)     |

Avisar quando quiser que eu aplique essas correções em `constants/site.ts` e nos textos das features — é uma alteração de 15 minutos.

---

**Documento mantido em** `doc/ROTEIRO_AUDIOVISUAL.md` · **revisão 1** · We Make · Campanha 2027
