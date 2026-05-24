import type { FreeMaterial } from "@/types";

export type FreeMaterialWithCover = FreeMaterial & {
  cover?: string;
};

export const freeMaterials: FreeMaterialWithCover[] = [
  {
    id: "livro-ceo",
    kind: "livro",
    title: "Tecnologia, Virtude e Educação Cristã",
    description:
      "Sete princípios para ensinar tecnologia com coerência e fidelidade. Livro fundacional do CEO Dênis sobre como integrar tecnologia, currículo e cosmovisão cristã em escolas confessionais.",
    pages: 184,
    author: "Dênis Júlio Pereira Francisco",
    cover: "/photos/foto7.png",
  },
  {
    id: "ebook-cosmo",
    kind: "ebook",
    title: "Cosmovisão & Currículo",
    description:
      "Como articular os três transcendentais — Verdade, Beleza e Bondade — no desenho do currículo de tecnologia da Educação Básica.",
    pages: 64,
    cover: "/photos/foto8.png",
  },
  {
    id: "guia-maker",
    kind: "guia",
    title: "Guia do Espaço Maker Cristão",
    description:
      "Manual prático com arquitetura, equipamentos, fluxos e protocolos pedagógicos para implantar um laboratório maker com propósito.",
    pages: 48,
    cover: "/photos/foto9.png",
  },
  {
    id: "estudo-ia",
    kind: "estudo",
    title: "IA na Escola Cristã",
    description:
      "Estudo institucional com diretrizes para o uso de inteligência artificial no Fundamental e Médio à luz da cosmovisão cristã.",
    pages: 32,
    cover: "/photos/foto10.png",
  },
];
