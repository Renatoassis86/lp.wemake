import type { FreeMaterial } from "@/types";

export const freeMaterials: FreeMaterial[] = [
  {
    id: "livro-ceo",
    kind: "livro",
    title: "Tecnologia com Raiz",
    description:
      "Livro do CEO Dênis: ensaio fundacional sobre como integrar tecnologia, currículo e cosmovisão cristã em escolas confessionais.",
    pages: 184,
    author: "Dênis · CEO We Make",
  },
  {
    id: "ebook-cosmo",
    kind: "ebook",
    title: "Cosmovisão & Currículo",
    description:
      "Como articular os transcendentais clássicos — Verdade, Beleza e Bondade — no desenho do currículo de tecnologia da Educação Básica.",
    pages: 64,
  },
  {
    id: "guia-maker",
    kind: "guia",
    title: "Guia do Espaço Maker Cristão",
    description:
      "Manual prático com arquitetura, equipamentos, fluxos e protocolos pedagógicos para implantar um laboratório maker com propósito.",
    pages: 48,
  },
  {
    id: "estudo-ia",
    kind: "estudo",
    title: "IA na Escola Cristã",
    description:
      "Estudo institucional com diretrizes para o uso de inteligência artificial no Ensino Fundamental e Médio à luz da cosmovisão cristã.",
    pages: 32,
  },
];
