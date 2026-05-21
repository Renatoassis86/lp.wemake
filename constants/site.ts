export const siteConfig = {
  name: "We Make",
  tagline: "Tecnologia educacional com cosmovisão cristã",
  description:
    "A We Make é uma editora de soluções tecnológicas para escolas cristãs. Formamos pessoas para o futuro com profundidade filosófica, excelência técnica e fidelidade à cosmovisão cristã.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wemake.com.br",
  ogImage: "/og/wemake-og.jpg",
  locale: "pt-BR",
  keywords: [
    "educação cristã",
    "tecnologia educacional",
    "escolas confessionais",
    "cosmovisão cristã",
    "formação humana",
    "robótica educacional",
    "currículo de tecnologia",
    "We Make",
  ],
  contact: {
    email: "institucional@wemake.com.br",
    phone: "+55 (11) 0000-0000",
    address: "São Paulo · Brasil",
  },
  social: {
    instagram: "https://instagram.com/wemake.education",
    linkedin: "https://linkedin.com/company/wemake-education",
    youtube: "https://youtube.com/@wemake-education",
  },
} as const;

export type SiteConfig = typeof siteConfig;
