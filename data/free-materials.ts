import type { FreeMaterial } from "@/types";

export type FreeMaterialWithCover = FreeMaterial & {
  cover?: string;
  file?: string;
  reading?: string;
  audience?: string;
};

/**
 * Trilogia gratuita derivada do livro do CEO
 * "Tecnologia, Virtude e Educação Cristã — Sete Princípios para Ensinar
 * Tecnologia com Coerência e Fidelidade" (Dênis Júlio P. Francisco).
 *
 * Estrutura editorial pensada para mover o leitor por três níveis:
 *
 *   1. Manifesto      — apresenta as ideias-chave (topo de funil)
 *   2. Diagnóstico    — provoca autoavaliação (meio de funil)
 *   3. Guia prático   — ensina a aplicar (fundo de funil, próximo da reunião)
 *
 * As capas usam fotografias institucionais já entregues em /public/photos/
 * enquanto a arte editorial definitiva é finalizada.
 */
export const freeMaterials: FreeMaterialWithCover[] = [
  {
    id: "manifesto-7-principios",
    kind: "ebook",
    title: "Os 7 Princípios — Manifesto",
    description:
      "Síntese editorial dos sete princípios que estruturam a educação tecnológica cristã na We Make. Leitura curta, fundamento profundo — ponto de partida para conversas internas na direção da escola.",
    pages: 16,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    cover: "/photos/foto7.png",
    file: "/downloads/wemake-manifesto-7-principios.pdf",
    reading: "20 min de leitura",
    audience: "Diretores, mantenedores e coordenadores",
  },
  {
    id: "diagnostico",
    kind: "guia",
    title: "Diagnóstico — Como está a educação tecnológica da sua escola?",
    description:
      "Instrumento autoaplicável com perguntas organizadas pelos sete princípios. Devolve um retrato honesto da maturidade pedagógica e tecnológica da instituição — e indica os próximos passos.",
    pages: 24,
    author: "Equipe pedagógica We Make",
    cover: "/photos/foto8.png",
    file: "/downloads/wemake-diagnostico-institucional.pdf",
    reading: "35 min para responder",
    audience: "Coordenação pedagógica + direção",
  },
  {
    id: "guia-aplicacao",
    kind: "guia",
    title: "Guia de Aplicação — Os 7 Princípios no currículo",
    description:
      "Caderno prático com sugestões pedagógicas, exemplos por segmento e checklist de implantação. Tradução direta dos princípios em decisões curriculares para a sala de aula.",
    pages: 32,
    author: "Equipe pedagógica We Make",
    cover: "/photos/foto9.png",
    file: "/downloads/wemake-guia-aplicacao-7-principios.pdf",
    reading: "Leitura por blocos · 7 capítulos",
    audience: "Coordenadores e professores",
  },
];
