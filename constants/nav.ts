export type NavLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

/**
 * 14-act narrative - surfaced as 5 nav anchors for clarity.
 * Each anchor lands on the opening act of a chapter.
 */
export const primaryNav: NavLink[] = [
  {
    id: "visao",
    label: "Visão",
    href: "#visao",
    description: "Verdade, Beleza, Bondade e o Mandato Cultural.",
  },
  {
    id: "ceo",
    label: "Manifesto",
    href: "#ceo",
    description: "Mensagem do CEO - apresentação institucional.",
  },
  {
    id: "solucoes",
    label: "Soluções",
    href: "#solucoes",
    description: "Currículo maker, formação, plataforma, espaço, assessoria.",
  },
  {
    id: "jornada",
    label: "Jornada",
    href: "#jornada",
    description: "Trilha contínua de aprendizagem: Maker, Programação, Robótica e Pensamento Computacional.",
  },
  {
    id: "reuniao",
    label: "Fale conosco",
    href: "#reuniao",
    description: "Agendar conversa estratégica.",
  },
  {
    id: "ebook",
    label: "Ebook gratuito",
    href: "/diagnostico",
    description: "Baixe o ebook 7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã.",
  },
  {
    id: "diagnostico-maturidade",
    label: "Diagnóstico",
    href: "/diagnostico/maturidade",
    description: "Avalie a maturidade tecnológica da sua escola em 8 blocos.",
  },
];

export const footerNav = {
  institucional: [
    { label: "Manifesto", href: "#ceo" },
    { label: "Visão", href: "#visao" },
    { label: "Presença nacional", href: "#presenca" },
    { label: "Carreiras", href: "/carreiras" },
  ],
  solucoes: [
    { label: "Currículo Maker", href: "#solucoes" },
    { label: "Formação Docente", href: "#solucoes" },
    { label: "Plataforma", href: "#solucoes" },
    { label: "Espaço Maker", href: "#solucoes" },
    { label: "Assessoria Institucional", href: "#solucoes" },
  ],
  recursos: [
    { label: "Material gratuito", href: "#material" },
    { label: "Grupo VIP", href: "#vip" },
    { label: "Falar com consultor", href: "#consultor" },
    { label: "Imprensa", href: "/imprensa" },
  ],
  legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos", href: "/termos" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;
