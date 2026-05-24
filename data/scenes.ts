/**
 * Roteiro visual da seção cinematográfica "Por trás da tecnologia".
 *
 * 7 cenas (abertura + 5 cenas humanas + encerramento) usando as
 * fotografias institucionais já entregues em /public/photos/.
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
    headline: "Por trás da tecnologia, sempre uma pessoa.",
    caption:
      "Uma sequência em cinco momentos sobre quem realmente carrega o futuro da educação cristã.",
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
      "Aprender começa com a capacidade de admirar - e crianças que se admiram são crianças que pensam.",
    src: "/photos/foto1.png",
    alt: "Criança brasileira observando uma placa Arduino com LED azul aceso em um espaço maker",
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
    headline: "Aprender não é consumir - é construir.",
    caption:
      "Adolescentes que escrevem código aprendem mais do que sintaxe: aprendem a ordenar o pensamento.",
    src: "/photos/foto2.png",
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
    headline: "Antes da técnica, a oração.",
    caption:
      "Não há formação humana sem silêncio diante da Palavra - e é desse silêncio que nasce qualquer trabalho que valha a pena.",
    src: "/photos/foto3.png",
    alt: "Grupo de estudantes em silhueta diante de janela arqueada dourada",
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
      "Arquitetura, equipamento, fluxo e protocolo - tudo desenhado para que o estudante experimente o gesto de criar.",
    src: "/photos/foto4.png",
    alt: "Laboratório maker em atividade com impressora 3D, bancadas e estudantes ao fundo",
    focal: "center",
    tone: "violet",
    position: "lower-left",
    parallax: -110,
  },
  {
    id: "colaboracao",
    number: "VI",
    kind: "scene",
    eyebrow: "05 · Coletivo",
    headline: "Construir juntos - como fomos feitos para fazer.",
    caption:
      "Tecnologia que reúne. Pessoas que se reconhecem como criadoras. Esse é o gesto que a We Make tenta proteger todos os dias.",
    src: "/photos/foto5.png",
    alt: "Estudantes colaborando em torno de um protótipo robótico",
    focal: "center",
    tone: "ivory",
    position: "upper-left",
    parallax: -100,
  },
  {
    id: "closing",
    number: "VII",
    kind: "closing",
    eyebrow: "Final do Capítulo VIII",
    headline: "Tecnologia redimida. Pessoas formadas.",
    caption:
      "É isso que perseguimos - escola por escola, sala por sala, estudante por estudante.",
    tone: "ink",
    position: "centered",
  },
];
