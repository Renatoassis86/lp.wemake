export type NavLink = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  {
    id: "manifesto",
    label: "Manifesto",
    href: "#manifesto",
    description: "Nossa convicção sobre tecnologia, formação e cosmovisão.",
  },
  {
    id: "pilares",
    label: "Pilares",
    href: "#pilares",
    description: "Os quatro pilares pedagógicos que estruturam o currículo.",
  },
  {
    id: "solucoes",
    label: "Soluções",
    href: "#solucoes",
    description: "Editora de soluções tecnológicas para escolas cristãs.",
  },
  {
    id: "escolas",
    label: "Escolas",
    href: "#escolas",
    description: "Instituições parceiras em todo o Brasil.",
  },
  {
    id: "contato",
    label: "Conversar",
    href: "#contato",
    description: "Agendar reunião com o time institucional.",
  },
];

export const footerNav = {
  institucional: [
    { label: "Sobre a We Make", href: "/sobre" },
    { label: "Manifesto", href: "/manifesto" },
    { label: "Conselho consultivo", href: "/conselho" },
    { label: "Carreiras", href: "/carreiras" },
  ],
  solucoes: [
    { label: "Currículo & Material", href: "/solucoes/curriculo" },
    { label: "Plataforma", href: "/solucoes/plataforma" },
    { label: "Formação de educadores", href: "/solucoes/formacao" },
    { label: "Consultoria institucional", href: "/solucoes/consultoria" },
  ],
  recursos: [
    { label: "Biblioteca", href: "/biblioteca" },
    { label: "Casos de escola", href: "/casos" },
    { label: "Documentação", href: "/docs" },
    { label: "Imprensa", href: "/imprensa" },
  ],
  legal: [
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos", href: "/termos" },
    { label: "Cookies", href: "/cookies" },
  ],
} as const;
