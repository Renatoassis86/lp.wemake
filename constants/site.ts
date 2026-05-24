export const siteConfig = {
  name: "We Make",
  tagline: "Tecnologia educacional com cosmovisão reformada",
  description:
    "A We Make é uma editora de soluções tecnológicas para escolas confessionais cristãs, fundada e desenvolvida a partir da cosmovisão reformada. Currículo maker, formação docente, plataforma, espaço maker e assessoria institucional - ancorados em Verdade, Beleza e Bondade e no Mandato Cultural.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wemake.tec.br",
  ogImage: "/og/wemake-og.jpg",
  locale: "pt-BR",
  keywords: [
    "educação cristã reformada",
    "cosmovisão reformada",
    "tecnologia educacional",
    "escolas confessionais",
    "formação humana",
    "currículo maker cristão",
    "espaço maker",
    "robótica educacional",
    "Imago Dei",
    "Mandato Cultural",
    "Dênis Júlio",
    "We Make",
  ],
  founder: {
    name: "Dênis Júlio P. Francisco",
    role: "CEO e Fundador",
    bio:
      "Dênis Júlio Pereira Francisco é graduado em Teologia e especialista em Educação Clássica pela Faculdade Internacional Cidade Viva (FICV), também é mestre pela Universidade Federal do Rio Grande do Norte (UFRN), no Programa de Pós-Graduação em Inovação e Tecnologias Educacionais (PPgITE). Atua diretamente na área da educação há 10 anos, como professor de Educação Tecnológica, Robótica e Educação Maker. Fundou a We Make, primeira editora brasileira de Educação Tecnológica e Maker fundamentada na Cosmovisão Cristã. Casado com Gabi, pai de Luísa e Joaquim, Dênis também exerce a função pastoral, o que confere unidade entre sua vocação ministerial, sua prática educacional e sua produção acadêmica. Seu trabalho também pode ser acompanhado em suas redes sociais, onde compartilha reflexões e conteúdos relacionados à educação, tecnologia, fé e formação humana: no Instagram (@denisjulio) e no Substack \"Sabedoria e Silício\" (https://denisjulio.substack.com).",
    portrait: "/photos/denis_profile.png",
    credentials: [
      { label: "Mestre UFRN (PPgITE)", short: "Mestre UFRN" },
      { label: "Teólogo e Especialista em Educação Clássica", short: "Educação Clássica" },
      { label: "Fundador We Make", short: "Fundador We Make" },
      { label: "Pastor", short: "Pastor" },
    ],
  },
  contact: {
    email: "contato@wemake.tec.br",
    phone: "+55 (83) 98230-1530",
    address: "Natal · Rio Grande do Norte · Brasil",
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
    /** Vídeo institucional gravado pelo Dênis - usado no hero e na seção do CEO. */
    videoHero: "/videos/video1.mp4",
    videoHeroPoster: "/photos/foto6.png",
    videoFull: "/videos/video1.mp4",
    videoPoster: "/photos/foto6.png",
    videoCaption: "/videos/video1.vtt",
    duration: "8 min",
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
  /**
   * Sinais qualitativos para o hero e demais seções.
   * Por decisão institucional, números absolutos (quantas escolas / quantos estados
   * já temos hoje) NÃO devem ser expostos publicamente - apenas marcos comerciais.
   */
  presence: {
    /** Estados onde já há trabalho ativo - usados pelo mapa, sem expor contagem. */
    statesUf: ["PR", "SC", "MG", "PB", "RN"] as const,
    enrollmentStart: "Janeiro de 2027",
    enrollmentDeadline: "30 de setembro de 2026",
    vacancyLabel: "Vagas limitadas por região",
  },
  social: {
    instagram: "https://instagram.com/wemake.tec",
    linkedin: "https://linkedin.com/company/wemake-tec",
    youtube: "https://youtube.com/@wemake.tec",
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
