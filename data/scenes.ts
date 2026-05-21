/**
 * Roteiro visual da seção cinematográfica "Por trás da tecnologia".
 *
 * 8 cenas:
 *   I.    Cartela de abertura
 *   II.   Crianças — o assombro
 *   III.  Adolescentes — a construção
 *   IV.   Oração — a contemplação
 *   V.    Espaço maker — o ofício
 *   VI.   Professores — a transmissão
 *   VII.  Colaboração — o coletivo
 *   VIII. Cartela de encerramento
 *
 * Quando as fotografias institucionais entrarem, basta substituir os
 * paths em `src`. Enquanto isso, cada cena renderiza um fallback
 * atmosférico baseado em `tone`.
 */

export type SceneTone = "cool" | "warm" | "violet" | "amber" | "ink" | "ivory";
export type ScenePosition = "centered" | "lower-left" | "lower-right" | "upper-left" | "upper-right";
export type SceneFocal = "center" | "top" | "bottom" | "left" | "right";
export type SceneKind = "title" | "scene" | "closing";

export type Scene = {
  id: string;
  number: string;
  kind: SceneKind;
  eyebrow?: string;
  headline: string;
  caption?: string;
  src?: string;
  alt?: string;
  focal?: SceneFocal;
  tone: SceneTone;
  position?: ScenePosition;
  /** Pixels of vertical parallax travel (negative = pulls up). */
  parallax?: number;
};

export const scenes: Scene[] = [
  {
    id: "opening",
    number: "I",
    kind: "title",
    eyebrow: "Capítulo VIII · Humanizar a tecnologia",
    headline:
      "Por trás da tecnologia, sempre uma pessoa.",
    caption:
      "Uma sequência cinematográfica em sete momentos — sobre quem realmente carrega o futuro da educação cristã.",
    tone: "ink",
    position: "centered",
  },
  {
    id: "criancas",
    number: "II",
    kind: "scene",
    eyebrow: "01 · Educação Infantil",
    headline: "Antes do código, o assombro.",
    caption:
      "Aprender começa com a capacidade de admirar. Crianças que se admiram são crianças que pensam.",
    src: "/photos/01-criancas-programando.jpg",
    alt: "Crianças explorando um projeto maker com olhar de descoberta",
    focal: "center",
    tone: "warm",
    position: "lower-left",
    parallax: -70,
  },
  {
    id: "adolescentes",
    number: "III",
    kind: "scene",
    eyebrow: "02 · Fundamental II · Ensino Médio",
    headline: "Aprender não é consumir — é construir.",
    caption:
      "Adolescentes que escrevem código aprendem mais do que sintaxe: aprendem a ordenar o pensamento.",
    src: "/photos/02-adolescentes-codigo.jpg",
    alt: "Adolescente em estação de trabalho escrevendo código",
    focal: "left",
    tone: "cool",
    position: "lower-right",
    parallax: -90,
  },
  {
    id: "oracao",
    number: "IV",
    kind: "scene",
    eyebrow: "03 · Espiritualidade",
    headline: "Antes da técnica, a contemplação.",
    caption:
      "Não há formação humana sem silêncio. Não há silêncio sem espaço para o sagrado.",
    src: "/photos/03-oracao-em-grupo.jpg",
    alt: "Grupo de estudantes em momento de oração",
    focal: "center",
    tone: "amber",
    position: "centered",
    parallax: -40,
  },
  {
    id: "maker",
    number: "V",
    kind: "scene",
    eyebrow: "04 · Espaço maker",
    headline: "Espaços que ensinam a fazer.",
    caption:
      "Arquitetura, equipamento, fluxo e protocolo — tudo desenhado para que o estudante experimente o gesto de criar.",
    src: "/photos/04-espaco-maker.jpg",
    alt: "Laboratório maker moderno com bancadas, impressoras 3D e ferramentas",
    focal: "center",
    tone: "violet",
    position: "lower-left",
    parallax: -110,
  },
  {
    id: "professores",
    number: "VI",
    kind: "scene",
    eyebrow: "05 · Educadores",
    headline: "Quem ensina, primeiro pensa.",
    caption:
      "Professores formados na tradição clássica e na prática maker. A diferença está sempre no educador.",
    src: "/photos/05-professores-ensinando.jpg",
    alt: "Professor orientando estudantes em projeto colaborativo",
    focal: "right",
    tone: "warm",
    position: "lower-right",
    parallax: -80,
  },
  {
    id: "colaboracao",
    number: "VII",
    kind: "scene",
    eyebrow: "06 · Coletivo",
    headline: "Construir juntos — como fomos feitos para fazer.",
    caption:
      "Tecnologia que reúne. Pessoas que se reconhecem como criadoras. Esse é o gesto que a We Make tenta proteger todos os dias.",
    src: "/photos/06-colaboracao-criatividade.jpg",
    alt: "Estudantes colaborando em um projeto criativo em conjunto",
    focal: "center",
    tone: "ivory",
    position: "upper-left",
    parallax: -100,
  },
  {
    id: "closing",
    number: "VIII",
    kind: "closing",
    eyebrow: "Final do Capítulo VIII",
    headline: "Tecnologia redimida. Pessoas formadas.",
    caption:
      "É isso que perseguimos — escola por escola, sala por sala, estudante por estudante.",
    tone: "ink",
    position: "centered",
  },
];
