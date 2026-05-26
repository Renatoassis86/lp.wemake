/**
 * Modelagem dos 5 estágios de maturidade tecnológica de uma escola cristã,
 * baseado nas respostas do diagnóstico (8 blocos).
 *
 * Cálculo: usa as perguntas tipo "scale" (Likert 1-5) de todos os blocos.
 * Score percentual = (média_real - 1) / 4 × 100  → 0-100%
 *
 * Faixas:
 *   1. Descoberta      0-20%
 *   2. Primeiros Passos 21-40%
 *   3. Estruturação    41-60%
 *   4. Consolidação    61-80%
 *   5. Excelência      81-100%
 */

export type StageNumber = 1 | 2 | 3 | 4 | 5;

export type Stage = {
  number: StageNumber;
  /** Slug usado na URL */
  slug: string;
  /** Nome curto (badge) */
  short: string;
  /** Nome completo (título) */
  name: string;
  /** Faixa percentual de score */
  range: [number, number];
  /** Tagline emocional curta */
  tagline: string;
  /** Descrição mais longa do diagnóstico */
  description: string;
  /** Recomendações práticas (3-4 pontos) */
  recommendations: string[];
  /** Próximo passo sugerido */
  nextStep: string;
  /** Cor de destaque (paleta We Make) */
  color: "mint" | "sky" | "royal" | "orange" | "navy";
};

export const STAGES: Record<StageNumber, Stage> = {
  1: {
    number: 1,
    slug: "descoberta",
    short: "Descoberta",
    name: "Estágio 1 — Descoberta",
    range: [0, 20],
    tagline: "A escola está despertando.",
    description:
      "Sua escola está no início da jornada de educação tecnológica cristã. Existe percepção da importância do tema, mas ainda falta clareza de propósito, currículo, professor dedicado e infraestrutura. Esse é um momento valioso: você ainda pode evitar erros comuns de implantações apressadas e começar com fundamento certo.",
    recommendations: [
      "Defina primeiro o porquê: por que ensinar tecnologia na sua escola?",
      "Forme a liderança antes de investir em equipamentos",
      "Inicie com um projeto piloto pequeno e cristão na intenção",
      "Evite copiar modelos seculares sem adaptação confessional",
    ],
    nextStep:
      "Converse com nosso time para entender por onde começar de forma sustentável. Não precisa de orçamento alto — precisa de visão.",
    color: "orange",
  },
  2: {
    number: 2,
    slug: "primeiros-passos",
    short: "Primeiros Passos",
    name: "Estágio 2 — Primeiros Passos",
    range: [21, 40],
    tagline: "Vocês começaram, agora precisam de método.",
    description:
      "Sua escola já tem iniciativas em educação tecnológica, mas elas ainda são pontuais ou desconectadas. Existem oficinas, recursos ou um professor entusiasta, mas falta currículo estruturado, progressão por faixa etária e integração explícita com a cosmovisão cristã. O risco aqui é que as atividades fiquem percebidas como entretenimento e não como formação.",
    recommendations: [
      "Estruture uma trilha curricular com progressão clara por série",
      "Capacite o(s) professor(es) responsáveis em pedagogia maker + cosmovisão",
      "Crie critérios de avaliação para os projetos (não só engajamento)",
      "Comunique às famílias o propósito formativo, não só o 'novo'",
    ],
    nextStep:
      "Vamos te ajudar a transformar iniciativas soltas em uma proposta pedagógica coerente, com currículo e formação docente.",
    color: "sky",
  },
  3: {
    number: 3,
    slug: "estruturacao",
    short: "Estruturação",
    name: "Estágio 3 — Estruturação",
    range: [41, 60],
    tagline: "Boa base técnica. Falta integrar cosmovisão.",
    description:
      "Sua escola já tem currículo organizado, professores razoavelmente seguros e algum espaço/recursos. O ponto crítico agora é a integração com a cosmovisão cristã: as aulas precisam ir além do 'fazer' e formar virtudes, discernimento e propósito. É comum nesse estágio que a parte técnica funcione, mas a alma do projeto fique sem nome explícito.",
    recommendations: [
      "Integre temas como verdade, beleza, bondade e ética digital nas aulas",
      "Forme o professor para articular fé e tecnologia sem soar forçado",
      "Conecte os projetos a serviço ao próximo e responsabilidade social",
      "Refine os objetivos de aprendizagem para incluir virtudes formadas",
    ],
    nextStep:
      "Nosso time pode te ajudar a colocar a 'alma' que falta — sem perder a estrutura técnica que vocês já têm.",
    color: "royal",
  },
  4: {
    number: 4,
    slug: "consolidacao",
    short: "Consolidação",
    name: "Estágio 4 — Consolidação",
    range: [61, 80],
    tagline: "Vocês estão indo muito bem. Hora de refinar.",
    description:
      "Sua escola tem currículo estruturado, professores capacitados, espaço adequado e a cosmovisão cristã já permeia naturalmente as aulas. O diagnóstico aponta uma boa integração entre técnica, pedagogia e fé. Os ajustes agora são de excelência: refinar avaliação, ampliar trilhas e fortalecer a cultura maker em toda a comunidade escolar.",
    recommendations: [
      "Documente boas práticas para que não dependam de uma pessoa",
      "Crie comunidade de prática entre professores (interna ou em rede)",
      "Amplie projetos integrados com outras disciplinas",
      "Mensure resultados de formação a médio prazo (virtudes, autoria)",
    ],
    nextStep:
      "Vamos pensar com você em como amplificar o que já funciona e influenciar outras escolas confessionais.",
    color: "mint",
  },
  5: {
    number: 5,
    slug: "excelencia",
    short: "Excelência",
    name: "Estágio 5 — Excelência",
    range: [81, 100],
    tagline: "Vocês são uma referência. Vamos amplificar isso.",
    description:
      "Sua escola é um modelo em educação tecnológica fundamentada na cosmovisão cristã. O conjunto — currículo, formação docente, infraestrutura, cultura e integração com a fé — está sólido e coerente. Esse é um chamado para mais do que excelência interna: para se tornar referência e formar outras escolas confessionais.",
    recommendations: [
      "Compartilhe sua jornada com outras escolas confessionais (mentorias)",
      "Aprofunde em fronteiras: IA aplicada, autoria criativa, makerspace público",
      "Documente em formato replicável (curso, livro, podcast)",
      "Mantenha o foco no formativo — o sucesso técnico não é o fim",
    ],
    nextStep:
      "Vamos conversar sobre como amplificar seu impacto além das suas paredes — mentorias, eventos, produção de conteúdo.",
    color: "navy",
  },
};

/**
 * Calcula o estágio a partir de um array de respostas tipo `scale` (1-5).
 * Retorna o Stage correspondente + o score percentual.
 */
export function calcStageFromScales(scales: number[]): { stage: Stage; score: number } {
  if (scales.length === 0) {
    return { stage: STAGES[1], score: 0 };
  }
  const sum = scales.reduce((a, b) => a + b, 0);
  const mean = sum / scales.length; // 1..5
  const score = Math.round(((mean - 1) / 4) * 100); // 0..100
  const clamped = Math.max(0, Math.min(100, score));

  let stageNum: StageNumber = 1;
  if (clamped >= 81) stageNum = 5;
  else if (clamped >= 61) stageNum = 4;
  else if (clamped >= 41) stageNum = 3;
  else if (clamped >= 21) stageNum = 2;

  return { stage: STAGES[stageNum], score: clamped };
}

/** Lookup por slug (usado na URL /obrigado-maturidade?estagio=descoberta) */
export function getStageBySlug(slug?: string | null): Stage | null {
  if (!slug) return null;
  return Object.values(STAGES).find((s) => s.slug === slug) || null;
}

/* ────────────────────────────────────────────────
   MODELAGEM DIMENSIONAL — fiel ao checklist do ebook
   "7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã"
──────────────────────────────────────────────── */

export type DimensionKey =
  | "visao_cosmovisao"
  | "carater_discernimento"
  | "curriculo_progressao"
  | "pratica_maker"
  | "gestao_estrutura";

export type Dimension = {
  key: DimensionKey;
  number: 1 | 2 | 3 | 4 | 5;
  name: string;
  shortName: string;
  description: string;
  /** IDs das perguntas tipo "scale" que compõem esta dimensão */
  questionIds: string[];
};

export const DIMENSIONS: Record<DimensionKey, Dimension> = {
  visao_cosmovisao: {
    key: "visao_cosmovisao",
    number: 1,
    name: "Visão e cosmovisão cristã",
    shortName: "Visão",
    description:
      "Mostra se a escola sabe por que ensina tecnologia e como essa prática se conecta à sua missão cristã.",
    questionIds: ["visao_1", "visao_2", "visao_3", "visao_4", "cosmovisao_1"],
  },
  carater_discernimento: {
    key: "carater_discernimento",
    number: 2,
    name: "Formação do caráter e discernimento",
    shortName: "Caráter",
    description:
      "Revela se as aulas estão formando apenas habilidades técnicas ou também virtudes — prudência, responsabilidade, domínio próprio, honestidade, colaboração e serviço.",
    questionIds: ["cosmovisao_2", "cosmovisao_3", "cosmovisao_4", "cosmovisao_5", "cosmovisao_6"],
  },
  curriculo_progressao: {
    key: "curriculo_progressao",
    number: 3,
    name: "Currículo e progressão",
    shortName: "Currículo",
    description:
      "Mostra se existe um caminho claro, progressivo e coerente para ensinar tecnologia ao longo dos anos escolares.",
    questionIds: ["curriculo_1", "curriculo_2", "curriculo_3", "curriculo_4", "curriculo_5"],
  },
  pratica_maker: {
    key: "pratica_maker",
    number: 4,
    name: "Prática pedagógica e cultura maker",
    shortName: "Prática",
    description:
      "Avalia se os alunos são convidados a criar, testar, errar, melhorar e compartilhar soluções, ou se a tecnologia aparece apenas como consumo ou entretenimento.",
    questionIds: ["visao_5", "professor_4", "infra_1", "infra_3"],
  },
  gestao_estrutura: {
    key: "gestao_estrutura",
    number: 5,
    name: "Gestão, professores e estrutura",
    shortName: "Gestão",
    description:
      "Mostra se a proposta tem sustentação institucional: professores formados, coordenação acompanhando, recursos adequados e liderança com clareza de prioridades.",
    questionIds: [
      "professor_1",
      "professor_2",
      "professor_3",
      "professor_5",
      "professor_6",
      "infra_2",
      "infra_4",
      "infra_5",
    ],
  },
};

export type DimensionLevel = {
  /** 1 (frágil) → 4 (bem desenvolvida) */
  rank: 1 | 2 | 3 | 4;
  label: string;
  /** Cor de destaque na UI */
  color: "orange" | "sky" | "royal" | "mint";
  /** Descrição interpretativa do nível */
  blurb: string;
};

const LEVELS: DimensionLevel[] = [
  {
    rank: 1,
    label: "Frágil",
    color: "orange",
    blurb: "Esta dimensão ainda está pouco desenvolvida. É uma oportunidade clara de crescimento.",
  },
  {
    rank: 2,
    label: "Inicial",
    color: "sky",
    blurb: "Há sinais de movimento, mas a dimensão ainda precisa de estruturação mais firme.",
  },
  {
    rank: 3,
    label: "Estruturação",
    color: "royal",
    blurb: "A dimensão já tem boa base — agora é momento de refinar e aprofundar.",
  },
  {
    rank: 4,
    label: "Bem desenvolvida",
    color: "mint",
    blurb: "Dimensão sólida e madura. Esta é uma força da sua escola para sustentar as outras.",
  },
];

export type DimensionResult = {
  dimension: Dimension;
  score: number; // 0..100
  answered: number; // quantas perguntas dessa dim foram respondidas
  total: number; // total de perguntas da dim
  level: DimensionLevel;
};

/**
 * Recebe um Map de respostas (id da pergunta → valor 1-5 da escala)
 * e retorna um array com o resultado por dimensão (sempre 5 itens em ordem).
 */
export function calcDimensions(answers: Record<string, number | undefined>): DimensionResult[] {
  const order: DimensionKey[] = [
    "visao_cosmovisao",
    "carater_discernimento",
    "curriculo_progressao",
    "pratica_maker",
    "gestao_estrutura",
  ];

  return order.map((key) => {
    const dim = DIMENSIONS[key];
    const values = dim.questionIds
      .map((qid) => answers[qid])
      .filter((v): v is number => typeof v === "number" && v >= 1 && v <= 5);

    const score = values.length === 0
      ? 0
      : Math.round(((values.reduce((a, b) => a + b, 0) / values.length) - 1) / 4 * 100);

    return {
      dimension: dim,
      score,
      answered: values.length,
      total: dim.questionIds.length,
      level: levelForScore(score),
    };
  });
}

export function levelForScore(score: number): DimensionLevel {
  if (score >= 76) return LEVELS[3]!; // Bem desenvolvida
  if (score >= 51) return LEVELS[2]!; // Estruturação
  if (score >= 26) return LEVELS[1]!; // Inicial
  return LEVELS[0]!; // Frágil
}

/**
 * Resultado final completo do diagnóstico — usado para persistir entre
 * a submissão do wizard e a tela /obrigado-maturidade.
 */
export type MaturidadeResult = {
  nome: string;
  globalScore: number;
  stageSlug: string;
  dimensions: DimensionResult[];
};
