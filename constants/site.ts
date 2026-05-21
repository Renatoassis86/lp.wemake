export const siteConfig = {
  name: "We Make",
  tagline: "Tecnologia educacional com cosmovisão cristã",
  description:
    "A We Make é uma editora de soluções tecnológicas para escolas cristãs. Currículo maker, formação docente, plataforma, espaço maker e assessoria institucional ancorados em Verdade, Beleza e Bondade.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wemake.com.br",
  ogImage: "/og/wemake-og.jpg",
  locale: "pt-BR",
  keywords: [
    "educação cristã",
    "tecnologia educacional",
    "escolas confessionais",
    "cosmovisão cristã",
    "formação humana",
    "currículo maker",
    "espaço maker",
    "robótica educacional",
    "Dênis We Make",
    "We Make",
  ],
  founder: {
    name: "Dênis",
    role: "CEO & Fundador",
    bio: "Educador e empreendedor à frente do movimento We Make.",
    portrait: "/people/denis-portrait.jpg",
  },
  contact: {
    email: "institucional@wemake.com.br",
    phone: "+55 (11) 0000-0000",
    address: "São Paulo · Brasil",
  },
  whatsapp: {
    consultor: {
      number: "5511999999999",
      label: "Falar com consultor",
      greeting:
        "Olá! Vim pela landing da We Make e gostaria de conversar com um consultor.",
    },
    vip: {
      number: "5511999999999",
      label: "Entrar no grupo VIP",
      greeting:
        "Olá! Quero entrar no grupo VIP da We Make para receber conteúdos exclusivos.",
    },
  },
  ceo: {
    videoHero: "/videos/ceo-hero-loop.mp4",
    videoHeroPoster: "/videos/ceo-hero-poster.jpg",
    videoFull: "/videos/ceo-manifesto-1080.mp4",
    videoPoster: "/videos/ceo-manifesto-poster.jpg",
    videoCaption: "/videos/ceo-manifesto-pt-BR.vtt",
    duration: "8 min 24s",
  },
  presence: {
    schools: 180,
    states: 19,
    students: 42000,
    educators: 2400,
  },
  social: {
    instagram: "https://instagram.com/wemake.education",
    linkedin: "https://linkedin.com/company/wemake-education",
    youtube: "https://youtube.com/@wemake-education",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappLink = (
  channel: "consultor" | "vip" = "consultor",
): string => {
  const ch = siteConfig.whatsapp[channel];
  const text = encodeURIComponent(ch.greeting);
  return `https://wa.me/${ch.number}?text=${text}`;
};
