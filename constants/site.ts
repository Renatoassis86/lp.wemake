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
    name: "Dênis Júlio Pereira Francisco",
    role: "CEO & Fundador",
    bio: "Educador e empreendedor à frente do movimento We Make. Autor do livro fundador “Tecnologia, Virtude e Educação Cristã”.",
    portrait: "/photos/foto6.png",
  },
  contact: {
    email: "institucional@wemake.com.br",
    phone: "+55 (11) 0000-0000",
    address: "São Paulo · Brasil",
  },
  whatsapp: {
    consultor: {
      number: "5583982301530",
      label: "Falar com consultor",
      greeting:
        "Olá! Vim pela landing da We Make e gostaria de conversar com um consultor.",
    },
    /** Link real do grupo VIP no WhatsApp. */
    vipGroupUrl: "https://chat.whatsapp.com/J4giIFuxMFh8vWGBgpAm3z?mode=gi_t",
  },
  ceo: {
    /** Mesmo arquivo é usado como loop do hero (silencioso) e como manifesto principal. */
    videoHero: "/videos/video1.mp4",
    videoHeroPoster: "/photos/foto6.png",
    videoFull: "/videos/video1.mp4",
    videoPoster: "/photos/foto6.png",
    videoCaption: "/videos/video1.vtt",
    duration: "8 min 24s",
    talkTitle: "A pergunta que deu origem à We Make",
    talkChapters: [
      { time: "00:00", seconds: 0,   label: "Introdução" },
      { time: "00:32", seconds: 32,  label: "A pergunta inicial" },
      { time: "02:14", seconds: 134, label: "Onde tudo começou" },
      { time: "03:48", seconds: 228, label: "O encontro com a tradição" },
      { time: "05:22", seconds: 322, label: "O movimento We Make" },
      { time: "06:55", seconds: 415, label: "Convite às escolas" },
      { time: "08:00", seconds: 480, label: "O que vem agora" },
    ],
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

/**
 * URL apropriada para cada canal WhatsApp:
 *  - "consultor" → conversa 1:1 (wa.me)
 *  - "vip"       → link de entrada no grupo
 */
export const whatsappLink = (
  channel: "consultor" | "vip" = "consultor",
): string => {
  if (channel === "vip") return siteConfig.whatsapp.vipGroupUrl;
  const c = siteConfig.whatsapp.consultor;
  return `https://wa.me/${c.number}?text=${encodeURIComponent(c.greeting)}`;
};
