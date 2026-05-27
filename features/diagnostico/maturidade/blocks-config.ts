/**
 * Configuração declarativa dos 8 blocos do diagnóstico de maturidade.
 * Fonte da verdade — qualquer mudança de pergunta acontece aqui.
 */

export type RadioQ = {
  id: string;
  tipo: "radio";
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

export type CheckboxQ = {
  id: string;
  tipo: "checkbox";
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  maxSelect?: number;
};

export type ScaleQ = {
  id: string;
  tipo: "scale";
  label: string;
  /** "discordo / concordo" labels nas extremidades */
  scaleLabels?: [string, string];
  required?: boolean;
};

export type TextQ = {
  id: string;
  tipo: "text";
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  maxLength?: number;
};

export type Question = RadioQ | CheckboxQ | ScaleQ | TextQ;

export type Block = {
  numero: number;
  titulo: string;
  subtitulo: string;
  questions: Question[];
};

/** Bloco 1 é o cadastro (campos especiais via wizard-form). Aqui só blocos 2 a 8. */
export const BLOCKS: Block[] = [
  {
    numero: 2,
    titulo: "Momento atual da escola",
    subtitulo: "Queremos entender se a escola está começando, expandindo ou reorganizando.",
    questions: [
      {
        id: "momento_operacao",
        tipo: "radio",
        label: "A escola está em qual momento?",
        required: true,
        options: [
          { value: "inicio", label: "Início de operação" },
          { value: "expansao", label: "Expansão" },
          { value: "consolidacao", label: "Consolidação" },
          { value: "reestruturacao", label: "Reestruturação" },
          { value: "revisao_curricular", label: "Revisão curricular" },
          { value: "outro", label: "Outro" },
        ],
      },
      {
        id: "pressao_familias",
        tipo: "radio",
        label: "Hoje, a escola sente pressão das famílias por mais tecnologia?",
        required: true,
        options: [
          { value: "muita", label: "Sim, muita" },
          { value: "moderada", label: "Sim, moderada" },
          { value: "pouca", label: "Pouca" },
          { value: "nao", label: "Não" },
        ],
      },
      {
        id: "preocupacao_telas",
        tipo: "radio",
        label: "A escola tem alguma preocupação com excesso de telas?",
        required: true,
        options: [
          { value: "central", label: "Sim, é uma preocupação central" },
          { value: "sem_politica", label: "Sim, mas ainda sem política clara" },
          { value: "pouca", label: "Pouca" },
          { value: "nao", label: "Não" },
        ],
      },
      {
        id: "frase_descritiva",
        tipo: "radio",
        label: "Qual frase descreve melhor o momento atual?",
        required: true,
        options: [
          { value: "queremos_comecar", label: "Queremos começar, mas não sabemos por onde." },
          { value: "iniciativas_sem_estrutura", label: "Já temos algumas iniciativas, mas falta estrutura." },
          { value: "recursos_sem_curriculo", label: "Temos recursos, mas falta currículo." },
          { value: "curriculo_sem_cosmovisao", label: "Temos currículo, mas falta integração com cosmovisão cristã." },
          { value: "professor_sem_apoio", label: "Temos professor, mas ele precisa de apoio." },
        ],
      },
    ],
  },
  {
    numero: 3,
    titulo: "Visão sobre tecnologia",
    subtitulo: "Avalie de 1 (discordo totalmente) a 5 (concordo totalmente).",
    questions: [
      { id: "visao_1", tipo: "scale", required: true, label: "Nossa escola sabe explicar por que deseja ensinar tecnologia." },
      { id: "visao_2", tipo: "scale", required: true, label: "A tecnologia é vista como ferramenta de formação, não como fim em si mesma." },
      { id: "visao_3", tipo: "scale", required: true, label: "A liderança possui uma visão cristã clara sobre tecnologia." },
      { id: "visao_4", tipo: "scale", required: true, label: "A escola evita tanto o medo da tecnologia quanto a fascinação acrítica pela inovação." },
      { id: "visao_5", tipo: "scale", required: true, label: "Sabemos comunicar às famílias o valor formativo da educação tecnológica." },
      { id: "visao_papel", tipo: "text", multiline: true, maxLength: 400, label: "Em uma frase, qual você acredita ser o maior papel da tecnologia dentro da missão da sua escola?", placeholder: "Sua resposta..." },
    ],
  },
  {
    numero: 4,
    titulo: "Currículo e progressão",
    subtitulo: "Como a tecnologia está estruturada hoje?",
    questions: [
      {
        id: "curriculo_formato",
        tipo: "checkbox",
        label: "A escola possui aulas regulares de tecnologia?",
        hint: "Pode marcar mais de uma opção.",
        required: true,
        options: [
          { value: "nao", label: "Não" },
          { value: "oficinas", label: "Oficinas pontuais" },
          { value: "extracurriculares", label: "Aulas extracurriculares" },
          { value: "disciplina", label: "Disciplina curricular" },
          { value: "projetos_integrados", label: "Projetos integrados" },
          { value: "outro", label: "Outro" },
        ],
      },
      {
        id: "curriculo_areas",
        tipo: "checkbox",
        label: "Quais áreas já são trabalhadas?",
        hint: "Pode marcar mais de uma opção.",
        required: true,
        options: [
          { value: "programacao", label: "Programação" },
          { value: "robotica", label: "Robótica" },
          { value: "eletronica", label: "Eletrônica" },
          { value: "maker", label: "Cultura maker" },
          { value: "engenharia", label: "Engenharia" },
          { value: "modelagem_3d", label: "Modelagem 3D" },
          { value: "impressao_3d", label: "Impressão 3D" },
          { value: "ia", label: "Inteligência Artificial" },
          { value: "assistiva", label: "Tecnologia assistiva" },
          { value: "nenhuma", label: "Nenhuma ainda" },
        ],
      },
      { id: "curriculo_1", tipo: "scale", required: true, label: "Temos progressão clara por faixa etária." },
      { id: "curriculo_2", tipo: "scale", required: true, label: "Sabemos quais habilidades cada série deve desenvolver." },
      { id: "curriculo_3", tipo: "scale", required: true, label: "Os projetos se conectam dentro de uma trilha formativa." },
      { id: "curriculo_4", tipo: "scale", required: true, label: "As aulas possuem objetivos de aprendizagem claros." },
      { id: "curriculo_5", tipo: "scale", required: true, label: "Temos critérios de avaliação consistentes." },
    ],
  },
  {
    numero: 5,
    titulo: "Cosmovisão cristã e formação de virtudes",
    subtitulo: "O diferencial central da educação confessional. Avalie de 1 a 5.",
    questions: [
      { id: "cosmovisao_1", tipo: "scale", required: true, label: "A cosmovisão cristã orienta as aulas de tecnologia de forma natural." },
      { id: "cosmovisao_2", tipo: "scale", required: true, label: "Os alunos são ensinados a discernir usos bons e maus da tecnologia." },
      { id: "cosmovisao_3", tipo: "scale", required: true, label: "As aulas desenvolvem virtudes (prudência, responsabilidade, domínio próprio, colaboração e perseverança)." },
      { id: "cosmovisao_4", tipo: "scale", required: true, label: "Os projetos ajudam os alunos a pensar em serviço ao próximo." },
      { id: "cosmovisao_5", tipo: "scale", required: true, label: "A escola trata temas como IA, autoria, verdade, beleza e ética digital." },
      { id: "cosmovisao_6", tipo: "scale", required: true, label: "Os professores sabem integrar tecnologia e fé cristã sem parecer forçado." },
      { id: "cosmovisao_dificuldade", tipo: "text", multiline: true, maxLength: 500, label: "Qual é a maior dificuldade da sua escola para integrar tecnologia e cosmovisão cristã?", placeholder: "Sua resposta..." },
    ],
  },
  {
    numero: 6,
    titulo: "Professores e acompanhamento",
    subtitulo: "Capacidade de execução pedagógica.",
    questions: [
      {
        id: "professor_responsavel",
        tipo: "radio",
        label: "Quem hoje ensina ou ensinaria tecnologia?",
        required: true,
        options: [
          { value: "interno", label: "Professor interno" },
          { value: "contratado", label: "Professor contratado" },
          { value: "informatica", label: "Equipe de informática" },
          { value: "nao_sabemos", label: "Ainda não sabemos" },
          { value: "outro", label: "Outro" },
        ],
      },
      { id: "professor_1", tipo: "scale", required: true, label: "O professor possui segurança técnica." },
      { id: "professor_2", tipo: "scale", required: true, label: "O professor possui segurança pedagógica." },
      { id: "professor_3", tipo: "scale", required: true, label: "O professor possui segurança para integrar cosmovisão cristã." },
      { id: "professor_4", tipo: "scale", required: true, label: "A coordenação acompanha as aulas." },
      { id: "professor_5", tipo: "scale", required: true, label: "O professor recebe formação contínua." },
      { id: "professor_6", tipo: "scale", required: true, label: "O professor tem tempo e recursos para preparar as aulas." },
      { id: "professor_necessidade", tipo: "text", multiline: true, maxLength: 400, label: "Qual seria hoje a maior necessidade do professor responsável pela área?", placeholder: "Sua resposta..." },
    ],
  },
  {
    numero: 7,
    titulo: "Infraestrutura e recursos",
    subtitulo: "O que a escola já tem disponível.",
    questions: [
      {
        id: "infra_espaco",
        tipo: "radio",
        label: "A escola possui sala maker ou laboratório?",
        required: true,
        options: [
          { value: "estruturado", label: "Sim, estruturado" },
          { value: "pouco_utilizado", label: "Sim, mas pouco utilizado" },
          { value: "informatica", label: "Temos sala de informática" },
          { value: "adaptavel", label: "Temos espaço adaptável" },
          { value: "sem_espaco", label: "Ainda não temos espaço" },
        ],
      },
      {
        id: "infra_recursos",
        tipo: "checkbox",
        label: "Quais recursos a escola já possui?",
        hint: "Marque todos que se aplicam.",
        required: true,
        options: [
          { value: "computadores", label: "Computadores/notebooks" },
          { value: "tablets", label: "Tablets" },
          { value: "robotica", label: "Kits de robótica" },
          { value: "eletronica", label: "Componentes eletrônicos" },
          { value: "impressora_3d", label: "Impressora 3D" },
          { value: "laser", label: "Cortadora laser" },
          { value: "manuais", label: "Ferramentas manuais" },
          { value: "construcao", label: "Materiais simples de construção" },
          { value: "nenhum", label: "Nenhum recurso específico ainda" },
        ],
      },
      { id: "infra_1", tipo: "scale", required: true, label: "Os recursos atuais são usados com intencionalidade." },
      { id: "infra_2", tipo: "scale", required: true, label: "A escola sabe quais investimentos são prioritários." },
      { id: "infra_3", tipo: "scale", required: true, label: "A infraestrutura atual permite começar de forma simples." },
      { id: "infra_4", tipo: "scale", required: true, label: "Há orçamento previsto para tecnologia/maker." },
      { id: "infra_5", tipo: "scale", required: true, label: "A escola precisa de orientação para investir bem." },
    ],
  },
  {
    numero: 8,
    titulo: "Dores principais",
    subtitulo: "Onde você sente que precisa de mais apoio agora.",
    questions: [
      {
        id: "dores",
        tipo: "checkbox",
        label: "Quais são hoje as maiores dores da escola?",
        hint: "Marque até 5 opções.",
        required: true,
        maxSelect: 5,
        options: [
          { value: "falta_curriculo", label: "Falta de currículo" },
          { value: "falta_professor", label: "Falta de professor" },
          { value: "falta_formacao", label: "Falta de formação docente" },
          { value: "falta_acompanhamento", label: "Falta de acompanhamento" },
          { value: "falta_cosmovisao", label: "Falta de integração com cosmovisão cristã" },
          { value: "telas", label: "Falta de clareza sobre uso de telas" },
          { value: "espaco_fisico", label: "Falta de espaço físico" },
          { value: "recursos", label: "Falta de recursos" },
          { value: "subuso", label: "Recursos existem, mas são pouco usados" },
          { value: "entretenimento", label: "Aulas parecem entretenimento" },
          { value: "cobranca_familias", label: "Famílias cobram inovação" },
          { value: "lideranca_sem_norte", label: "Liderança quer começar, mas não sabe por onde" },
          { value: "professor_sozinho", label: "Professor se sente sozinho" },
          { value: "avaliacao", label: "Dificuldade de avaliar projetos" },
          { value: "medo_investir", label: "Medo de investir errado" },
        ],
      },
      {
        id: "dor_principal",
        tipo: "text",
        multiline: true,
        maxLength: 500,
        label: "Se você pudesse resolver apenas uma coisa nos próximos 6 meses, o que seria?",
        placeholder: "Sua resposta...",
      },
    ],
  },
];

export const TOTAL_BLOCKS = BLOCKS.length + 1; // +1 = bloco 1 (identificação)
