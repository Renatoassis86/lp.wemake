import type { FreeMaterial } from "@/types";

/**
 * Trilha dos 7 Princípios - fatiamento do livro do CEO
 * "Tecnologia, Virtude e Educação Cristã" em 7 PDFs (um por princípio).
 *
 * Cada princípio do livro vira um caderno editorial independente, que pode
 * ser lido em sequência ou isoladamente.
 *
 * Sistema de desbloqueio progressivo:
 *
 *    FREE     →  acesso direto ao baixar (após preencher o formulário curto)
 *    VIP      →  desbloqueia ao entrar no grupo VIP no WhatsApp
 *    MEETING  →  desbloqueia ao agendar reunião com o time comercial
 *
 * A trilha cria um funil natural - quem quer continuar lendo é levado para
 * o próximo passo de conversão (VIP → reunião estratégica).
 */

export type UnlockGate = "free" | "vip" | "meeting";

export type PrinciplePdf = FreeMaterial & {
  principle: number;
  unlock: UnlockGate;
  cover?: string;
  file?: string;
  reading?: string;
  audience?: string;
  /** Frase curta usada quando o card está trancado. */
  unlockHint?: string;
};

export const freeMaterials: PrinciplePdf[] = [
  {
    id: "principio-1",
    principle: 1,
    kind: "ebook",
    title: "Tecnologia como ferramenta, não como fim",
    description:
      "O primeiro princípio. A tecnologia serve à formação humana - não o contrário. Por que toda escola cristã precisa interrogar o propósito antes de adotar uma ferramenta.",
    pages: 18,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    cover: "/photos/foto7.png",
    file: "/downloads/wemake-principio-01-ferramenta.pdf",
    reading: "22 min de leitura",
    audience: "Direção e mantenedores",
    unlock: "free",
  },
  {
    id: "principio-2",
    principle: 2,
    kind: "ebook",
    title: "Caráter antes da habilidade técnica",
    description:
      "Em um mundo que premia a competência amoral, a escola cristã forma pessoas em quem se possa confiar - mesmo quando ninguém estiver olhando o código.",
    pages: 20,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    cover: "/photos/foto8.png",
    file: "/downloads/wemake-principio-02-carater.pdf",
    reading: "25 min de leitura",
    audience: "Coordenadores pedagógicos",
    unlock: "free",
  },
  {
    id: "principio-3",
    principle: 3,
    kind: "ebook",
    title: "Criar como expressão da Imago Dei",
    description:
      "Quem cria, espelha o Criador. O ato de fazer - código, peças 3D, circuitos - é antes de tudo um gesto teológico. A escola cristã não pode ensiná-lo de qualquer jeito.",
    pages: 22,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    cover: "/photos/foto9.png",
    file: "/downloads/wemake-principio-03-imago-dei.pdf",
    reading: "28 min de leitura",
    audience: "Professores e coordenadores",
    unlock: "free",
  },

  /* ─── DESBLOQUEIA PELO GRUPO VIP ─────────────────────────────── */
  {
    id: "principio-4",
    principle: 4,
    kind: "ebook",
    title: "Discernimento diante da inovação",
    description:
      "Nem tudo o que é novo precisa ser adotado. Como formar discernimento para saber o que abraçar, o que adiar e o que recusar - diante de IA, redes sociais e novas plataformas.",
    pages: 24,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    cover: "/photos/foto10.png",
    file: "/downloads/wemake-principio-04-discernimento.pdf",
    reading: "30 min de leitura",
    audience: "Liderança institucional",
    unlock: "vip",
    unlockHint: "Entre no grupo VIP no WhatsApp para liberar este caderno.",
  },

  /* ─── DESBLOQUEIA NA REUNIÃO ESTRATÉGICA ─────────────────────── */
  {
    id: "principio-5",
    principle: 5,
    kind: "ebook",
    title: "Tecnologia para aliviar os efeitos da Queda",
    description:
      "Engenharia, design e código têm um papel pastoral: aliviar sofrimento, restaurar dignidade, abrir possibilidades - sem substituir o encontro humano.",
    pages: 26,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    file: "/downloads/wemake-principio-05-queda.pdf",
    reading: "32 min de leitura",
    audience: "Diretores e mantenedores",
    unlock: "meeting",
    unlockHint: "Agende uma reunião com o time da We Make para receber este caderno.",
  },
  {
    id: "principio-6",
    principle: 6,
    kind: "ebook",
    title: "Construir, não apenas consumir",
    description:
      "A cultura digital nos transformou em consumidores passivos. Devolver aos estudantes o gesto ativo de construir - robôs, software, ideias, instituições.",
    pages: 28,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    file: "/downloads/wemake-principio-06-construir.pdf",
    reading: "34 min de leitura",
    audience: "Coordenadores e professores",
    unlock: "meeting",
    unlockHint: "Disponível para escolas que avançam para a reunião estratégica.",
  },
  {
    id: "principio-7",
    principle: 7,
    kind: "ebook",
    title: "Intencionalidade curricular",
    description:
      "Tecnologia integrada à escola, não anexada a ela. O sétimo princípio fecha o livro mostrando como articular tudo no currículo, com sequência, fundamentação e propósito.",
    pages: 32,
    author: "Dênis Júlio P. Francisco · Editora We Make",
    file: "/downloads/wemake-principio-07-curriculo.pdf",
    reading: "38 min de leitura",
    audience: "Direção e equipe pedagógica",
    unlock: "meeting",
    unlockHint: "Caderno entregue após a apresentação do currículo We Make.",
  },
];

/** Agrupamentos prontos para a UI. */
export const freeMaterialsByGate = {
  free: freeMaterials.filter((m) => m.unlock === "free"),
  vip: freeMaterials.filter((m) => m.unlock === "vip"),
  meeting: freeMaterials.filter((m) => m.unlock === "meeting"),
};
