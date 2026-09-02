export interface PlanoPergunta {
  id: string;
  pergunta: string;
  explicacao?: string;
}

export interface PlanoSubsecao {
  titulo?: string;
  perguntas: PlanoPergunta[];
}

export interface PlanoSecao {
  id: string;
  titulo: string;
  intro?: string;
  subsecoes: PlanoSubsecao[];
}

/**
 * Metodologia de dez capítulos (mesma estrutura usada no plano de negócios da Promisse).
 * Cada sócio responde individualmente; a apresentação final cruza as três respostas.
 *
 * Toda pergunta remete explicitamente às cinco linhas de negócio da We Make hoje:
 * Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria
 * Institucional. Nenhuma pergunta traz "exemplo de resposta" pra não sugerir números
 * ou fatos que ainda não foram levantados pela equipe — quem preenche é o sócio.
 */
export const PLANO_NEGOCIO_SECOES: PlanoSecao[] = [
  {
    id: "oportunidade",
    titulo: "Análise de Oportunidade",
    intro: "Perguntas rápidas, sem necessidade de detalhar demais nessa fase. Servem para checar se vale a pena seguir em frente com o plano.",
    subsecoes: [
      {
        perguntas: [
          { id: "oportunidade.publico-alvo", pergunta: "Qual é o público-alvo da We Make, considerando as cinco linhas de negócio?", explicacao: "Mapeie o decisor e o usuário final para cada linha: Currículo Maker e Formação Docente (coordenação pedagógica e professores), Plataforma We Make (professores, pais e coordenação), Espaço Maker (mantenedor/direção, orçamento de infraestrutura) e Assessoria Institucional (diretores e mantenedores)." },
          { id: "oportunidade.ciclo-vida", pergunta: "Qual a durabilidade do relacionamento com o cliente em cada linha (ciclo de vida)?", explicacao: "Currículo Maker costuma ser um contrato anual renovável por série; Formação Docente é recorrente por ciclo letivo; Plataforma We Make é uma assinatura contínua; Espaço Maker é um projeto pontual com possível expansão; Assessoria Institucional pode ser plurianual." },
          { id: "oportunidade.acesso-clientes", pergunta: "Os clientes estão acessíveis? Como a We Make chega até eles hoje, linha por linha?", explicacao: "Liste os canais atuais (prospecção direta, eventos de educação cristã, indicação, redes sociais, conteúdo) e se algum deles é exclusivo de uma linha específica (ex.: Espaço Maker e Assessoria tendem a exigir venda mais consultiva que Currículo Maker)." },
          { id: "oportunidade.potencial-crescimento", pergunta: "Existe potencial de crescimento desse mercado nos próximos anos? Ele é alto em todas as cinco linhas ou mais em algumas?", explicacao: "Pense na obrigatoriedade crescente de letramento digital nas escolas e na demanda por soluções com identidade cristã, e se esse potencial é parelho entre Currículo, Formação, Plataforma, Espaço Maker e Assessoria." },
          { id: "oportunidade.retorno-investimento", pergunta: "O investimento realizado pode ser recuperado no curto prazo (menos de 2 anos)? Isso varia por linha?", explicacao: "Estimativa qualitativa por enquanto — o cálculo automático de payback consolidado fica no capítulo Finanças." },
          { id: "oportunidade.mercado-crescendo", pergunta: "O mercado está crescendo? É emergente? É fragmentado (muitos concorrentes)?", explicacao: "Caracterize o momento do mercado de tecnologia educacional para escolas confessionais em cada uma das cinco linhas — pode haver mais concorrência em Currículo Maker do que em Assessoria Institucional com cosmovisão cristã, por exemplo." },
          { id: "oportunidade.barreiras-entrada", pergunta: "Existem barreiras proprietárias de entrada no mercado? A We Make tem estratégia para se proteger delas?", explicacao: "Considere o currículo autoral, a metodologia própria, a plataforma proprietária, o relacionamento com escolas e a marca — o que protege cada uma das cinco linhas de uma cópia rápida por concorrentes." },
          { id: "oportunidade.tamanho-mercado", pergunta: "Qual é o tamanho estimado do mercado (em número de escolas confessionais ou em reais) para cada linha, e qual fatia a We Make pretende capturar?", explicacao: "Se ainda não há uma estimativa confiável para alguma das cinco linhas, registre isso como pendência em vez de arriscar um número." },
        ],
      },
    ],
  },
  {
    id: "conceito",
    titulo: "Conceito do Negócio",
    subsecoes: [
      {
        perguntas: [
          { id: "conceito.o-que-e", pergunta: "O que é a We Make? Como as cinco linhas — Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria Institucional — se articulam num único conceito de negócio?", explicacao: "Descreva o conceito central na sua própria formulação, explicando como uma linha sustenta ou alimenta as outras (ex.: o Currículo justifica a Formação Docente, que por sua vez se apoia na Plataforma)." },
          { id: "conceito.visao-missao", pergunta: "Qual é a visão, a missão e os valores da We Make?", explicacao: "Se já existe uma formulação oficial (ex.: material institucional), registre-a e comente se ela ainda representa fielmente as cinco linhas de negócio hoje." },
          { id: "conceito.o-que-vende", pergunta: "O que a We Make vende, exatamente, em cada uma das cinco linhas?", explicacao: "Para Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria Institucional, diga o que está de fato disponível para venda hoje versus o que ainda está em desenvolvimento." },
          { id: "conceito.para-quem-vende", pergunta: "Para quem a We Make vende em cada linha? Quem é o comprador e quem é o usuário final?", explicacao: "Numa escola, o comprador (mantenedor/direção) muitas vezes não é quem usa o material no dia a dia (professor/aluno) — isso muda de peso entre Currículo Maker, Formação Docente, Plataforma, Espaço Maker e Assessoria." },
          { id: "conceito.historico", pergunta: "Apresente um breve histórico: principais realizações, escolas atendidas, tamanho da equipe e diferenciais conquistados até aqui em cada linha.", explicacao: "Use números reais que vocês já têm (escolas parceiras, anos de atuação, adesão à Plataforma) em vez de estimativas." },
          { id: "conceito.estrutura-legal", pergunta: "Qual é a estrutura legal da empresa hoje (tipo societário, sócios, participação)? Há certificações, registros de marca ou licenças necessárias para operar cada uma das cinco linhas?", explicacao: "Registre também o que ainda precisa ser regularizado — por exemplo, direitos autorais do currículo ou termos de uso da plataforma." },
        ],
      },
    ],
  },
  {
    id: "mercado",
    titulo: "Mercado e Competidores",
    subsecoes: [
      {
        titulo: "Análise do setor",
        perguntas: [
          { id: "mercado.tendencias", pergunta: "Quais são as principais tendências no setor, para cada uma das cinco linhas de negócio da We Make?", explicacao: "Ex.: obrigatoriedade de letramento digital (Currículo Maker), escassez de professores capacitados em tecnologia (Formação Docente), demanda por ambientes digitais de gestão pedagógica (Plataforma), procura por diferencial físico/institucional (Espaço Maker), busca por planejamento plurianual (Assessoria)." },
          { id: "mercado.fatores-projecoes", pergunta: "Quais fatores (normativos, culturais, tecnológicos) estão influenciando as projeções desse mercado, linha por linha?" },
          { id: "mercado.porque-promissor", pergunta: "Por que esse mercado se mostra promissor para a We Make, considerando as cinco linhas juntas?" },
          { id: "mercado.tamanho-numeros", pergunta: "Qual o tamanho do mercado em número de escolas confessionais no Brasil e quantos concorrentes relevantes existem, em cada uma das cinco linhas?" },
        ],
      },
      {
        titulo: "Mercado-alvo",
        perguntas: [
          { id: "mercado.perfil-comprador", pergunta: "Qual o perfil da escola-cliente ideal (porte, região, tradição confessional, orçamento) para cada uma das cinco linhas?", explicacao: "O perfil ideal pode variar: uma escola pequena pode comprar só Currículo Maker, enquanto Espaço Maker e Assessoria Institucional tendem a exigir orçamento e porte maiores." },
          { id: "mercado.o-que-compra-hoje", pergunta: "O que essas escolas compram hoje, na ausência de cada linha da We Make?" },
          { id: "mercado.porque-compra", pergunta: "Por que a escola compra de cada uma das cinco linhas? Qual é a dor real por trás da decisão em cada caso?" },
          { id: "mercado.quando-como-compra", pergunta: "Quando, como e com que periodicidade a escola decide e fecha a compra de cada linha?", explicacao: "Sazonalidade do calendário escolar, ciclo orçamentário, quem assina o contrato — Currículo Maker e Formação Docente costumam fechar antes do início do ano letivo; Espaço Maker e Assessoria podem ter ciclo de decisão mais longo." },
          { id: "mercado.necessidades-nao-atendidas", pergunta: "Quais necessidades dessas escolas ainda não são bem atendidas por ninguém no mercado, em cada uma das cinco linhas?" },
        ],
      },
      {
        titulo: "Análise de concorrência",
        perguntas: [
          { id: "concorrencia.quem-sao", pergunta: "Quem são os concorrentes diretos e indiretos da We Make em cada uma das cinco linhas?", explicacao: "Podem ser concorrentes diferentes para Currículo Maker (editoras/sistemas de ensino), Formação Docente (cursos e workshops), Plataforma We Make (EdTechs genéricas), Espaço Maker (empresas de mobiliário/robótica) e Assessoria Institucional (consultorias educacionais)." },
          { id: "concorrencia.comparacao", pergunta: "Como o que a We Make entrega em cada linha se compara ao que os concorrentes entregam?" },
          { id: "concorrencia.vantagens-competitivas", pergunta: "Quais são as vantagens competitivas da We Make e dos concorrentes, linha por linha?" },
          { id: "concorrencia.futuros-concorrentes", pergunta: "Quem pode vir a se tornar concorrente no futuro, mesmo não sendo hoje, em alguma das cinco linhas?" },
          { id: "concorrencia.quadro-comparativo", pergunta: "Como a We Make se compara à concorrência em: material didático, presença digital, suporte, plataforma, preço e presença em eventos — para cada linha relevante?" },
        ],
      },
    ],
  },
  {
    id: "equipe",
    titulo: "Equipe de Gestão",
    subsecoes: [
      {
        perguntas: [
          { id: "equipe.organograma", pergunta: "Qual é o organograma funcional que estrutura a We Make hoje, e como ele cobre as cinco linhas de negócio?" },
          { id: "equipe.principais-envolvidos", pergunta: "Quem são os principais envolvidos no negócio hoje (comercial, pedagógico, tecnológico, financeiro) e de quais linhas cada um cuida?" },
          { id: "equipe.responsabilidades", pergunta: "Quais são as responsabilidades de cada sócio na operação do dia a dia — Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria Institucional?" },
          { id: "equipe.o-que-falta", pergunta: "O que (ou quem) está faltando na equipe hoje para sustentar o crescimento planejado em cada uma das cinco linhas?" },
          { id: "equipe.previsao-rh", pergunta: "Qual a previsão de contratações, política de remuneração e custo de pessoal para os próximos anos, por linha de negócio?", explicacao: "O detalhamento numérico entra no capítulo Finanças; aqui registre o raciocínio." },
        ],
      },
    ],
  },
  {
    id: "produtos",
    titulo: "Produtos e Serviços",
    subsecoes: [
      {
        titulo: "Benefícios e diferenciais",
        perguntas: [
          { id: "produtos.beneficios", pergunta: "Quais os principais benefícios que cada uma das cinco linhas entrega à escola, e o que as torna especiais?" },
          { id: "produtos.tecnologia-pd", pergunta: "Há inovação ou propriedade intelectual relevante em cada linha (currículo autoral, metodologia de formação, plataforma proprietária, projeto de espaço maker)? A We Make domina esse conteúdo/tecnologia internamente?" },
          { id: "produtos.ciclo-vida", pergunta: "Em que estágio de maturidade está cada uma das cinco linhas?", explicacao: "Ex.: validado e em operação / em piloto / ainda em desenho — para Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria Institucional." },
        ],
      },
      {
        titulo: "Portfólio",
        perguntas: [
          { id: "produtos.portfolio", pergunta: "Qual é o portfólio completo de produtos e serviços hoje, detalhado nas cinco linhas?" },
          { id: "produtos.plano-desenvolvimento", pergunta: "Existe um plano de desenvolvimento de novos produtos em cada linha, com prazos para lançar ou atualizar?" },
          { id: "produtos.categorias", pergunta: "Como os produtos de cada linha se dividem por modelo comercial (licenciamento anual, mensalidade, projeto avulso) e prazo de retorno?" },
        ],
      },
    ],
  },
  {
    id: "estrutura-operacoes",
    titulo: "Estrutura e Operações",
    subsecoes: [
      {
        perguntas: [
          { id: "operacoes.aliancas", pergunta: "Quais parceiros são chave para a We Make prosperar em cada linha (associações de escolas cristãs, fornecedores de equipamento maker, provedores de infraestrutura de tecnologia)?" },
          { id: "operacoes.producao-distribuicao", pergunta: "Como funciona a produção e a distribuição em cada linha — material do Currículo Maker, conteúdo da Formação Docente, acesso à Plataforma We Make, execução do Espaço Maker e entregas da Assessoria Institucional?" },
          { id: "operacoes.pos-venda", pergunta: "Existe uma estrutura dedicada a suporte e acompanhamento pós-venda, e ela cobre as cinco linhas igualmente?" },
          { id: "operacoes.propriedade-intelectual", pergunta: "A marca, o currículo, os materiais de formação e a plataforma estão protegidos (registro de marca, direitos autorais)? O que ainda precisa ser regularizado em cada linha?" },
          { id: "operacoes.regulamentacoes", pergunta: "Há exigências legais ou regulatórias críticas para operar cada linha (BNCC para o Currículo Maker, LGPD para a Plataforma, normas do MEC)? A We Make já atende a elas?" },
          { id: "operacoes.processo-negocio", pergunta: "Como é o processo do negócio do primeiro contato com a escola até a entrega e renovação, em cada uma das cinco linhas?" },
          { id: "operacoes.fornecedores", pergunta: "Quais são os principais fornecedores por linha (gráfica para o Currículo Maker, infraestrutura de tecnologia para a Plataforma, equipamentos para o Espaço Maker, serviços contábeis/jurídicos)?" },
          { id: "operacoes.infraestrutura-tech", pergunta: "Qual é a infraestrutura tecnológica atual (site, Plataforma We Make, ferramentas internas de gestão) que sustenta as cinco linhas?" },
        ],
      },
    ],
  },
  {
    id: "marketing-vendas",
    titulo: "Marketing e Vendas",
    intro: "Estruturado nos 4 Ps: posicionamento, preço, praça e promoção — considerando as cinco linhas de negócio.",
    subsecoes: [
      { titulo: "Posicionamento", perguntas: [
        { id: "marketing.posicionamento", pergunta: "Como a We Make quer ser percebida pelas escolas em cada uma das cinco linhas? Como isso a diferencia da concorrência?" },
      ]},
      { titulo: "Preço", perguntas: [
        { id: "marketing.preco", pergunta: "Qual é a política de preços praticada hoje em cada linha (Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker, Assessoria Institucional) e a lógica por trás dela?", explicacao: "Registre os valores reais já praticados; se ainda não há uma política formal para alguma linha, sinalize isso." },
      ]},
      { titulo: "Praça", perguntas: [
        { id: "marketing.praca", pergunta: "Como cada linha chega até a escola (canal comercial, entrega do material, acesso à plataforma, execução do projeto de espaço maker, condução da assessoria)?" },
      ]},
      { titulo: "Promoção", perguntas: [
        { id: "marketing.propaganda", pergunta: "Como as escolas ficam sabendo de cada uma das cinco linhas hoje (canais de aquisição)?" },
      ]},
      { titulo: "Modelo de negócio e vendas", perguntas: [
        { id: "marketing.modelo-venda", pergunta: "Qual é o modelo de venda (consultiva, inbound, indicação) para cada linha, e quanto a We Make investe hoje em marketing e vendas no total?" },
        { id: "marketing.forcas-vendas", pergunta: "Quem hoje é responsável pela prospecção e fechamento de contratos, e essa responsabilidade muda entre as cinco linhas?" },
        { id: "marketing.parceiros-vendas", pergunta: "Quais parceiros estratégicos (associações de escolas cristãs, igrejas, influenciadores educacionais) ajudam ou podem ajudar nas vendas de cada linha?" },
      ]},
      { titulo: "Projeção de vendas", perguntas: [
        { id: "marketing.quanto-vender", pergunta: "Quantas escolas/contratos a We Make pretende fechar por ano, por linha de negócio, no horizonte deste plano?", explicacao: "Esses números alimentam diretamente a tabela do capítulo Finanças, linha por linha." },
        { id: "marketing.participacao-mercado", pergunta: "Que participação de mercado a We Make pretende alcançar em cada linha, e em quanto tempo?" },
      ]},
    ],
  },
  {
    id: "crescimento",
    titulo: "Estratégia de Crescimento",
    subsecoes: [
      {
        perguntas: [
          { id: "crescimento.razao-de-ser", pergunta: "Qual é a razão de ser da We Make? O que as cinco linhas juntas devem se tornar nos próximos anos?" },
          { id: "crescimento.forcas", pergunta: "Quais são as forças da We Make hoje, linha por linha? (Matriz SWOT — Forças)" },
          { id: "crescimento.fraquezas", pergunta: "Quais são as fraquezas da We Make hoje em cada linha e como podem ser superadas? (Matriz SWOT — Fraquezas)" },
          { id: "crescimento.oportunidades", pergunta: "Quais são as principais oportunidades externas para cada uma das cinco linhas? (Matriz SWOT — Oportunidades)" },
          { id: "crescimento.riscos", pergunta: "Quais são os principais riscos por linha e como a We Make pretende enfrentá-los? (Matriz SWOT — Ameaças)" },
          { id: "crescimento.estrategias-cronograma", pergunta: "Quais estratégias a We Make vai usar para atingir seus objetivos em cada linha? Apresente um cronograma com as principais ações dos próximos meses/anos." },
        ],
      },
    ],
  },
  {
    id: "financas",
    titulo: "Finanças",
    intro: "Os números calculados automaticamente (receita projetada, margem, breakeven, payback) ficam na tabela do capítulo financeiro, aberta por linha de negócio. Use estas perguntas para o raciocínio qualitativo por trás dos números.",
    subsecoes: [
      {
        perguntas: [
          { id: "financas.premissas", pergunta: "Quais são as premissas centrais por trás da projeção financeira de cada linha (nº de escolas/contratos por ano, ticket médio, reajuste anual, retenção)?" },
          { id: "financas.custos-despesas", pergunta: "Qual é a composição de custos fixos e variáveis do negócio hoje, e quanto disso é específico de cada linha versus custo compartilhado (equipe, tecnologia, administrativo)?" },
          { id: "financas.investimentos-retornos", pergunta: "Que investimento é necessário para executar este plano e como ele se distribui entre as cinco linhas?" },
          { id: "financas.metricas-retorno", pergunta: "Além de breakeven e payback consolidados (calculados automaticamente), que outros indicadores mostram a viabilidade financeira de cada linha?" },
        ],
      },
    ],
  },
  {
    id: "sumario",
    titulo: "Sumário Executivo",
    intro: "Responda por último — é a síntese do restante do plano, mas é a primeira seção lida no documento final.",
    subsecoes: [
      {
        perguntas: [
          { id: "sumario.quem-voce-e", pergunta: "Quem é a We Make? O que é o negócio, como as cinco linhas se articulam num modelo só, e por que esta equipe é a certa para executá-lo?" },
          { id: "sumario.estrategia-visao", pergunta: "Qual é a estratégia e a visão de futuro da We Make para Currículo Maker, Formação Docente, Plataforma We Make, Espaço Maker e Assessoria Institucional? Onde ela quer chegar?" },
          { id: "sumario.mercado", pergunta: "Qual é a oportunidade de mercado em cada linha e por que ela é promissora?" },
          { id: "sumario.investimento", pergunta: "Quanto de investimento a We Make precisa, para quê (por linha) e quando?" },
          { id: "sumario.vantagens-competitivas", pergunta: "Quais são os diferenciais e as vantagens competitivas da We Make, linha por linha e no conjunto?" },
        ],
      },
    ],
  },
];

export const PLANO_NEGOCIO_USERNAMES = ["renato", "denis", "emanuel"] as const;
export type PlanoNegocioUsername = (typeof PLANO_NEGOCIO_USERNAMES)[number];

/** As cinco linhas de negócio da We Make hoje (data/services.ts), usadas para dar
 *  contexto às perguntas e para segmentar a tabela financeira do capítulo 09. */
export const LINHAS_DE_NEGOCIO = [
  { id: "curriculo-maker", label: "Currículo Maker" },
  { id: "formacao-docente", label: "Formação Docente" },
  { id: "plataforma", label: "Plataforma We Make" },
  { id: "espaco-maker", label: "Espaço Maker" },
  { id: "assessoria", label: "Assessoria Institucional" },
] as const;
export type LinhaDeNegocioId = (typeof LINHAS_DE_NEGOCIO)[number]["id"];
