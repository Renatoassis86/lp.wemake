/**
 * Conteúdo estruturado do Plano de Negócio We Make 2027-2031.
 * Fonte: We_Make_Plano_de_Negocio_2027_2031 (4).pdf, documento oficial da direção estratégica.
 * Usado tanto pelo relatório A4 (/admin/plano-de-negocio/relatorio) quanto, futuramente,
 * como base de dados para a apresentação em tela cheia.
 */

export type BlocoConteudo =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "tabela"; legenda?: string; cabecalho: string[]; linhas: string[][] }
  | { tipo: "stats"; itens: { label: string; valor: string }[] }
  | { tipo: "destaque"; titulo: string; texto: string }
  | { tipo: "citacao"; texto: string; atribuicao?: string };

export interface SecaoRelatorio {
  id: string;
  titulo: string;
  blocos: BlocoConteudo[];
}

export interface CapituloRelatorio {
  numero: number;
  id: string;
  titulo: string;
  secoes: SecaoRelatorio[];
}

export const CAPITULOS_RELATORIO: CapituloRelatorio[] = [
  {
    numero: 1,
    id: "sumario-executivo",
    titulo: "Sumário Executivo",
    secoes: [
      {
        id: "sumario-executivo-corpo",
        titulo: "Sumário Executivo",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make é o primeiro sistema de educação tecnológica com cosmovisão cristã do Brasil. Fundada em 2023, iniciou operação comercial em 2024 com duas escolas parceiras e alcança, em 2026, 12 escolas parceiras e cerca de 2.000 estudantes atendidos.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A empresa entrega um sistema único, o Kit We Make, que reúne currículo, plataforma digital, espaço maker, formação docente e assessoria institucional em um único contrato. Esses componentes não são vendidos separadamente: ao adquirir o Kit We Make, a escola ou a família educadora tem acesso a todo o sistema, sem custo adicional por serviço, salvo quando deseja algo além do que já está previsto no plano letivo contratado. Essa integração é o que diferencia a We Make de qualquer concorrente que ofereça apenas um desses componentes isoladamente.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O sistema atende hoje dois mercados que compartilham a mesma estrutura pedagógica: escolas confessionais cristãs e famílias educadoras organizadas em comunidades de homeschooling. A partir do quarto ano deste plano, 2030, a empresa pretende lançar dois novos negócios, autônomos em relação ao sistema escolar: a escola técnica de tecnologia para crianças e adolescentes em geral e a faculdade de tecnologia, ambos voltados a atender indivíduos independentemente de vínculo com uma escola parceira.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O planejamento orçamentário de 2027, já consolidado mês a mês, projeta receita de escolas de R$1.100.000,00, sendo R$951.961,90 já contratados e R$148.038,10 de escolas em fase final de negociação, com fechamento previsto para as próximas semanas. A isso se soma, como receita adicional e distinta, R$49.890,00 da primeira venda da trilha de currículo para famílias educadoras, totalizando R$1.149.890,00 de receita no exercício. A despesa total soma R$844.365,14, resultando em resultado operacional positivo de R$305.524,86, margem de 26,6%.",
          },
          {
            tipo: "stats",
            itens: [
              { label: "Escolas parceiras (2026)", valor: "12" },
              { label: "Alunos atendidos (2026)", valor: "~2.000" },
              { label: "Receita total 2027 (escolas + homeschool)", valor: "R$ 1.149.890" },
              { label: "Resultado operacional 2027", valor: "R$ 305.525" },
              { label: "Margem operacional 2027", valor: "26,6%" },
              { label: "Meta de alunos 2027 → 2031", valor: "4.000 → 8.000" },
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Este plano organiza premissas, metas e projeções em torno do sistema integrado que a empresa já entrega a escolas e famílias educadoras, e trata a escola técnica e a faculdade de tecnologia como horizonte de expansão claramente delimitado no tempo, condicionado à consolidação do sistema atual.",
          },
        ],
      },
    ],
  },
  {
    numero: 2,
    id: "identidade",
    titulo: "Apresentação e Identidade Institucional",
    secoes: [
      {
        id: "visao-missao",
        titulo: "Visão, missão e valores",
        blocos: [
          { tipo: "subtitulo", texto: "Visão" },
          {
            tipo: "paragrafo",
            texto:
              "Ser referência em educação tecnológica fundamentada na cosmovisão cristã, formando uma geração capaz de compreender, criar e utilizar tecnologia com sabedoria, excelência e responsabilidade para a glória de Deus e o bem do próximo.",
          },
          { tipo: "subtitulo", texto: "Missão" },
          {
            tipo: "paragrafo",
            texto:
              "Pensar, estudar, desenvolver e ensinar educação tecnológica com excelência, liberdade e responsabilidade em resposta a Deus, equipando escolas, educadores, famílias e comunidades com currículo, formação, tecnologia, ambientes e orientação para formar crianças e adolescentes com sabedoria para o mundo tecnológico.",
          },
          { tipo: "subtitulo", texto: "Valores" },
          {
            tipo: "lista",
            itens: [
              "Fidelidade à Verdade: a empresa reconhece que educação e tecnologia não são neutras. Busca pensar, ensinar e criar a partir da verdade revelada nas Escrituras e percebida na criação.",
              "Beleza e Bondade: uma tecnologia não é avaliada apenas pela eficiência ou pela novidade. A empresa busca aquilo que é belo, verdadeiro e bom, submetendo a inovação a fins que contribuam para uma formação verdadeiramente humana.",
              "Excelência como resposta ao chamado: rigor acadêmico, qualidade pedagógica, cuidado editorial, competência tecnológica e melhoria contínua são tratados como expressão de responsabilidade diante da vocação recebida.",
              "Liberdade com responsabilidade: o potencial criativo da tecnologia é reconhecido junto com a exigência de que a liberdade caminhe com sabedoria, limites, ética e responsabilidade pelas consequências das escolhas.",
              "Serviço e mordomia: a tecnologia é compreendida como instrumento para desenvolver responsavelmente os potenciais da criação, servir ao próximo, cuidar do mundo criado e contribuir para aliviar os efeitos da queda.",
              "Comunidade e parceria: educação e criação são tratadas como empreendimentos comunitários. A empresa caminha ao lado de escolas, professores, famílias, estudantes e parceiros, valorizando relações duradouras, expressão do princípio que dá nome à We Make: nós fazemos.",
            ],
          },
          {
            tipo: "destaque",
            titulo: "Critério de decisão",
            texto:
              "Em toda a atuação da empresa, o tripé formado por Beleza, Verdade e Bondade orienta a avaliação de qualquer produto, conteúdo ou tecnologia antes de sua adoção pedagógica.",
          },
        ],
      },
      {
        id: "historico",
        titulo: "Histórico",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A empresa foi formalizada e apresentada publicamente ao mercado no final de 2023, com início da operação comercial em 2024 e duas escolas parceiras. Em 2026, a We Make soma 12 escolas parceiras e aproximadamente 2.000 estudantes atendidos, e é, até o momento, a primeira e única empresa brasileira a oferecer um sistema completo de educação tecnológica estruturado a partir de uma cosmovisão cristã explícita.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O currículo evoluiu para atender Ensino Fundamental I, Ensino Fundamental II e Ensino Médio como componente curricular, cobrindo programação, robótica educacional, eletrônica, modelagem e fabricação 3D, projetos de engenharia, inteligência artificial e cidadania digital, sob a metodologia própria Conhecer, Explorar e Criar. Para o ciclo de 2027, o portfólio passa a incorporar o Livro Maker físico e a Educação Infantil.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A plataforma tecnológica própria tornou-se a principal camada digital de distribuição e acompanhamento do sistema, disponibilizando currículo, planos de aula e recursos a professores, além de instrumentos de acompanhamento à coordenação. A empresa também acumulou experiência em concepção e orientação de ambientes físicos de aprendizagem, incluindo projeto arquitetônico, memorial descritivo, dimensionamento e especificação de recursos, e desenvolveu um modelo próprio de acompanhamento institucional contínuo às escolas parceiras.",
          },
        ],
      },
      {
        id: "equipe",
        titulo: "Equipe",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Pessoa", "Função"],
            linhas: [
              ["Dênis Júlio Pereira Francisco", "CEO e Diretor Pedagógico. Estratégia, direção pedagógica e teológica, desenvolvimento do currículo, arquitetura das formações, visão pedagógica da plataforma e concepção dos espaços maker. Corresponsável, com Emanuela Monteiro, pelo cronograma da Academia We Make."],
              ["Renato Silva de Assis", "Gerente Administrativo. Gestão administrativa e financeira, contratos, processos, indicadores, organização das implantações, fornecedores e apoio operacional ao sistema."],
              ["Emanuel dos Santos Peixoto", "Analista de Marketing. Posicionamento da marca, geração de demanda, conteúdo, campanhas, eventos e comunicação institucional."],
              ["Suzana Bonifazio", "Consultora Pedagógica. Implantação, onboarding, acompanhamento de professores e escolas, formações e suporte pedagógico."],
              ["Emanuela Monteiro", "Consultora Pedagógica e de Negócios. Implementação da equipe de consultoria pedagógica; conduz, com Suzana, implantação, acompanhamento, formação, diagnóstico e prescrição de resultados. Corresponsável pelo cronograma da Academia We Make."],
              ["Christiano Bonifazio", "Representante Comercial, São Paulo. Busca ativa de novas escolas, mas não é o único ponto de contato comercial: toda a equipe estratégica participa do processo de venda, cada membro em sua fase."],
              ["Equipe de tecnologia", "Três desenvolvedores e um cientista de dados para negócios, responsáveis pela construção, evolução e implantação contínua da plataforma tecnológica própria."],
              ["Iran Firmino", "Contador. Suporte contábil, fiscal, tributário e societário."],
              ["Atendente Comercial", "Posição em contratação: primeiro atendimento, gestão do CRM, qualificação inicial e follow-up comercial."],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "A estrutura de liderança é hoje concentrada, o que garante agilidade na fase atual, mas exige, à medida que o sistema cresce, distribuição progressiva de conhecimento e responsabilidade entre a equipe, ponto tratado no Capítulo 7.",
          },
        ],
      },
      {
        id: "ficv",
        titulo: "Parceria com a FICV",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make mantém parceria com a Faculdade Integrada de Ciências e Valores (FICV) para viabilizar bolsas de estudo de até 80% em cursos de teologia e em pós-graduações em educação cristã clássica, gestão de escolas cristãs e psicopedagogia, destinadas a colaboradores, professores parceiros e lideranças das escolas atendidas pelo sistema. Essa parceria sustenta, no médio prazo, a formação continuada da própria equipe de consultoria pedagógica e, no longo prazo, integra a proposta de faculdade de tecnologia descrita no Capítulo 12, que pretende oferecer também graduações em pedagogia e psicologia.",
          },
        ],
      },
    ],
  },
  {
    numero: 3,
    id: "conceito",
    titulo: "O Sistema We Make: Conceito de Negócio",
    secoes: [
      {
        id: "kit-we-make",
        titulo: "O que compõe o sistema",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make entrega um sistema único de educação tecnológica, comercializado sob a unidade Kit We Make. O sistema reúne currículo pedagógico, plataforma digital, espaço maker, formação docente e assessoria institucional em um único contrato, sem fracionamento de preço entre esses componentes. Ao adquirir o currículo do sistema, a escola ou a família educadora passa a ter direito a todos os demais serviços já previstos no plano letivo contratado, sem cobrança adicional. Serviços fora desse escopo, quando solicitados pela instituição, são tratados como demanda extraordinária e negociados à parte.",
          },
          {
            tipo: "tabela",
            cabecalho: ["Componente", "O que é"],
            linhas: [
              ["Currículo", "Estrutura pedagógica que define o que ensinar, por que ensinar e como organizar a progressão da aprendizagem em educação tecnológica: programação, robótica, eletrônica, fabricação digital, engenharia, inteligência artificial, cultura maker e cidadania digital, sob a metodologia Conhecer, Explorar e Criar. O Livro Maker complementa a experiência como material físico de registro, reflexão e portfólio do estudante."],
              ["Plataforma tecnológica", "Ambiente digital próprio que organiza, distribui e acompanha currículo, recursos pedagógicos, formação, projetos e dados de implementação, conectando professores, coordenadores, estudantes e famílias. Sustenta também a coleta de indicadores e a análise de dados que alimentam a assessoria institucional."],
              ["Espaço maker", "Consultoria de concepção do ambiente físico de aprendizagem: proposta arquitetônica, acompanhamento da construção ou adaptação do espaço e orientação sobre equipamentos, a partir das experiências previstas pelo currículo e das necessidades reais da instituição."],
              ["Assessoria institucional", "Acompanhamento estratégico de mantenedores, diretores e lideranças: gestão pedagógica e administrativa, pesquisa de satisfação pela própria plataforma, análise de indicadores de implementação e recomendações fundamentadas em dados."],
              ["Formação docente e Academia We Make", "Trilha de formação, mentoria e consultoria pedagógica incluída no Kit We Make, não comercializada separadamente. Inicia assim que o contrato é firmado, com operacionalização contínua ao longo do ano letivo."],
            ],
          },
        ],
      },
      {
        id: "dois-mercados",
        titulo: "Dois mercados, o mesmo sistema",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O sistema We Make atende hoje dois mercados que compartilham a mesma estrutura pedagógica: escolas confessionais cristãs e famílias educadoras organizadas em comunidades de homeschooling. Em ambos os casos, a família ou a instituição tem acesso ao mesmo conjunto de currículo, plataforma, formação e acompanhamento. A adesão ao espaço maker e ao desenvolvimento institucional tende a ser menor entre famílias educadoras, dada a natureza doméstica do ambiente de aprendizagem, mas os demais componentes do sistema se aplicam integralmente a esse público.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A distribuição do sistema a famílias educadoras conta hoje com parceiros que já atuam nesse mercado, organizados em comunidades e redes de educação domiciliar, o que permite à We Make alcançar famílias sem depender de prospecção individual.",
          },
        ],
      },
      {
        id: "dois-negocios-futuros",
        titulo: "Dois negócios futuros, fora do sistema escolar",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A partir do quarto ano deste plano, 2030, a empresa pretende lançar dois negócios que não dependem de vínculo com uma escola parceira: uma escola de tecnologia voltada a crianças e adolescentes em geral, e uma faculdade de tecnologia. Diferentemente do sistema atual, vendido a instituições e famílias, esses dois negócios atendem diretamente o indivíduo, independentemente de sua escola de origem. Por essa razão, são tratados neste plano como linhas de negócio distintas, com modelo comercial próprio a ser desenvolvido, e não como extensão do Kit We Make.",
          },
          {
            tipo: "destaque",
            titulo: "Até lá",
            texto:
              "O negócio da We Make permanece organizado em torno de um único sistema, vendido de forma integral a escolas e a famílias educadoras, com um único ciclo de venda e um único contrato por cliente.",
          },
        ],
      },
    ],
  },
  {
    numero: 4,
    id: "oportunidade",
    titulo: "Análise de Oportunidade",
    secoes: [
      {
        id: "publico-alvo",
        titulo: "Público-alvo e acessibilidade",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O público do sistema We Make é composto por escolas privadas confessionais cristãs, redes educacionais, e famílias educadoras organizadas em comunidades de homeschooling. Em ambos os casos, o processo de decisão concentra mantenedores, diretores ou responsáveis pela família, com professores, coordenadores ou tutores como mediadores da experiência, e alunos como beneficiários diretos da formação.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Os canais em uso incluem prospecção direta, participação em eventos de educação cristã, indicações, relacionamento institucional, redes sociais, produção de conteúdo, palestras e expansão dentro da própria base de clientes. O sistema completo permite padronização de funil, da geração de leads à proposta comercial, sem exigir prospecção separada para cada componente do Kit We Make, já que a venda é única. Para famílias educadoras, a distribuição conta com parceiros já estabelecidos nesse mercado.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A base instalada de clientes é, ela mesma, o principal canal de expansão: escolas satisfeitas geram indicação para outras instituições da mesma rede ou região. O desafio comercial do ciclo 2027-2031 é transformar os canais existentes em sistema previsível e mensurável de aquisição, com CRM, segmentação de base e acompanhamento de conversão por canal.",
          },
        ],
      },
      {
        id: "barreiras",
        titulo: "Barreiras de entrada",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A principal vantagem competitiva da We Make decorre da integração entre currículo autoral, metodologia própria, plataforma tecnológica, propriedade intelectual, dados de implementação, relacionamento institucional e marca, entregues como sistema único. Um concorrente pode reproduzir isoladamente um currículo de robótica, uma plataforma de gestão ou um serviço de consultoria pedagógica. É mais difícil reproduzir, ao mesmo tempo, todos esses componentes funcionando de forma integrada e coerente com uma cosmovisão cristã.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Quatro ativos transversais devem se consolidar até 2031: dados acumulados de implementação, relacionamentos institucionais, força de marca e integração do ecossistema. A meta declarada não é impedir que concorrentes reproduzam elementos isolados, e sim tornar progressivamente mais difícil reproduzir o valor do sistema completo.",
          },
        ],
      },
      {
        id: "ciclo-retorno",
        titulo: "Ciclo de vida, retenção e retorno do investimento",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O sistema opera por contrato anual renovável, com meta estratégica de estender o relacionamento para além de quatro ou cinco anos, incentivando expansão entre séries e segmentos dentro da mesma instituição. Para famílias educadoras, o ciclo acompanha a trajetória educacional da família, com potencial de relacionamento plurianual à medida que novos filhos ingressam no sistema.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O sistema apresenta, em geral, condições de recuperação do investimento em menos de dois anos por nova escola, dado o baixo custo marginal de atender um cliente adicional frente ao custo fixo de produção de conteúdo já amortizado. A frente de famílias educadoras, ainda em fase de validação, é tratada com postura mais conservadora, com horizonte preliminar de recuperação entre 18 e 36 meses.",
          },
        ],
      },
      {
        id: "mercado-emergente",
        titulo: "Um mercado maduro em geral, emergente no nicho",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O setor brasileiro de tecnologia educacional já não é um mercado nascente: reúne centenas de empresas ativas e soluções maduras em diferentes categorias. Dentro desse contexto amplo, o segmento específico da We Make, um sistema completo de educação tecnológica fundamentado em cosmovisão cristã, ainda apresenta características de mercado emergente, com baixa densidade de soluções equivalentes.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O potencial de crescimento é impulsionado pela obrigatoriedade curricular da computação na Educação Básica, detalhada no Capítulo 5, pela disseminação da inteligência artificial no ambiente educacional e pela necessidade de instituições confessionais desenvolverem essas competências sem abrir mão de sua identidade. A expansão para famílias educadoras amplia esse potencial para um público fora do mercado escolar tradicional.",
          },
        ],
      },
      {
        id: "tamanho-mercado",
        titulo: "Tamanho do mercado",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O Censo Escolar de 2025 registra 41.746 escolas privadas de Educação Básica no Brasil, das quais 24.683 oferecem Ensino Fundamental, um teto amplo que não corresponde ao mercado efetivamente endereçável. Para o recorte confessional, este plano adota como referência de trabalho um mercado total entre 3.500 e 5.000 escolas confessionais cristãs no Brasil, com mercado acessível entre 900 e 1.400 escolas de perfil econômico e institucional compatível com a proposta da We Make.",
          },
          {
            tipo: "destaque",
            titulo: "Pendência de pesquisa",
            texto:
              "Esses números devem ser tratados como estimativa de planejamento, não como dado consolidado. Um estudo específico de dimensionamento de mercado, cruzando microdados do Censo Escolar com bases de associações confessionais, é recomendado antes da consolidação definitiva das metas de participação de mercado do Capítulo 8.",
          },
        ],
      },
    ],
  },
  {
    numero: 5,
    id: "mercado-concorrencia",
    titulo: "Mercado, Legislação e Concorrência",
    secoes: [
      {
        id: "dor-do-cliente",
        titulo: "O que o cliente compra hoje, e por quê",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Na ausência do sistema We Make, escolas raramente ficam sem comprar nada. Elas substituem o sistema integrado por fornecedores fragmentados: um fornecedor de robótica ou programação, uma plataforma de gestão genérica, formação pontual para professores, e nenhuma assessoria estratégica de fato integrada. Essa fragmentação é, ao mesmo tempo, o padrão de mercado e a principal oportunidade que o sistema We Make explora.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A dor central que motiva a contratação é a ausência de um caminho estruturado, coerente e tecnicamente sólido para ensinar tecnologia ao longo dos anos escolares, sem abrir mão da identidade confessional da instituição. Escolas costumam já ter tentado soluções fragmentadas, um professor de robótica aqui, uma plataforma ali, e buscam no sistema We Make a integração que essas soluções isoladas não entregam.",
          },
        ],
      },
      {
        id: "legislacao",
        titulo: "Legislação: a obrigatoriedade curricular da computação",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A Lei nº 14.533/2023, que instituiu a Política Nacional de Educação Digital, e a Resolução CNE/CEB nº 2/2025, que estabeleceu o Complemento de Computação da Base Nacional Comum Curricular, tornam obrigatória, a partir de 2026, a inclusão de pensamento computacional, cultura digital e mundo digital no currículo de todas as escolas brasileiras, públicas e privadas, do primeiro ano do Ensino Fundamental ao terceiro ano do Ensino Médio. As redes tiveram até o final de 2025 para adequar seus currículos, e a implementação efetiva já está em curso em 2026. Em 5 de março de 2026, a Comissão Intergovernamental de Financiamento para a Educação Básica de Qualidade condicionou o repasse do Valor Aluno Ano com base em Resultados, uma das modalidades do Fundeb, à comprovação dessa adequação curricular até agosto de 2026, com efeito direto nos repasses de 2027. Embora esse mecanismo financeiro se aplique à rede pública, a pressão regulatória alcança igualmente as escolas privadas, que precisam demonstrar conformidade curricular às famílias e aos órgãos de supervisão educacional.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Cinco estados já foram além do piso federal, com instrumento próprio identificado nesta pesquisa: lei aprovada pelo Legislativo ou resolução do Conselho Estadual de Educação, aplicável tanto à rede pública quanto à privada.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Para escolas privadas, essa obrigatoriedade transforma a educação tecnológica de diferencial competitivo em exigência curricular. O sistema We Make já incorpora, desde sua concepção curricular, os três eixos estruturantes exigidos pela norma federal: pensamento computacional, cultura digital e mundo digital. Isso posiciona a empresa como resposta pronta a uma obrigatoriedade que a maioria das escolas confessionais ainda está em processo de atender, independentemente de o estado em que operam já possuir instrumento próprio.",
          },
        ],
      },
      {
        id: "legislacao-estados",
        titulo: "O que cada estado já fez além do piso federal",
        blocos: [
          {
            tipo: "tabela",
            legenda: "Cinco estados com instrumento próprio identificado nesta pesquisa",
            cabecalho: ["Estado", "Instrumento", "Conteúdo"],
            linhas: [
              ["Distrito Federal", "Lei nº 7.796/2025", "Aprovada pela Câmara Legislativa após os deputados derrubarem veto do governador. Cria os Centros Interescolares de Robótica."],
              ["São Paulo", "Deliberação CEE nº 233/2025", "Institui a Educação Digital, Midiática e Computação como complemento obrigatório e progressivo ao Currículo Paulista, da Educação Infantil ao Ensino Médio, incluindo instituições particulares."],
              ["Minas Gerais", "Parecer CEE/MG nº 1.588/2025 e Resolução SEE nº 5.234/2026", "Homologa o Referencial Curricular de Computação na Educação Básica, obrigatório a partir de 2026."],
              ["Paraná", "Deliberação CEE/PR nº 04/2025", "Obrigatoriedade da Educação Digital e Computação no Ensino Fundamental e Médio, incluindo instituições particulares."],
              ["Rio Grande do Sul", "Resolução CEEd nº 382/2024", "A mais antiga identificada nesta pesquisa, de 20 de dezembro de 2024. Institui a Computação na Educação Básica como complemento ao Referencial Curricular Gaúcho."],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Nos demais 22 entes federativos, a pesquisa não identificou instrumento estadual próprio equivalente: a obrigatoriedade em vigor decorre diretamente da norma federal, sem complemento local documentado. Essa ausência não significa necessariamente inação, apenas que nenhum ato estadual específico foi localizado nas fontes consultadas.",
          },
        ],
      },
      {
        id: "concorrencia",
        titulo: "Concorrência",
        blocos: [
          {
            tipo: "tabela",
            legenda: "Concorrentes mapeados, por categoria",
            cabecalho: ["Categoria", "Exemplos identificados"],
            linhas: [
              ["Propostas confessionais", "IDBIRD Educação, com o kit The Maker, de escopo mais restrito, material pontual para uma faixa etária específica, sem currículo plurianual, plataforma digital nem assessoria institucional integrada."],
              ["Sistemas seculares vendidos a escolas", "Nave à Vela, Mind Makers, ZOOM Education, Robomind, MundoMaker, Somai, todos sem proposta confessional."],
              ["Franquias e plataformas diretas à família", "Código Kid, SuperGeeks, Ctrl+Play, Kodland, e a atuação pontual da BYJU'S no Brasil, todos com cobrança direta da família, sem vínculo institucional com a escola."],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "A We Make é a primeira empresa brasileira a reunir, em um único sistema, currículo plurianual, plataforma tecnológica própria, espaço maker, formação docente e assessoria institucional, fundamentados de forma explícita na cosmovisão cristã. Nenhum concorrente mapeado reproduz essa combinação: os concorrentes confessionais têm escopo mais restrito, os sistemas seculares não adotam cosmovisão religiosa, e as franquias e plataformas de maior escala vendem diretamente à família, sem a estrutura de contrato institucional que caracteriza o sistema We Make.",
          },
        ],
      },
      {
        id: "futuros-concorrentes",
        titulo: "Futuros concorrentes",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A ameaça mais relevante de médio prazo provavelmente não virá de uma nova startup, e sim de um agente que já possui distribuição consolidada: sistemas de ensino cristãos já estabelecidos, grandes grupos editoriais criando produtos confessionais, redes como Mackenzie e ACSI incorporando tecnologia à sua proposta, ou big techs como Google e Microsoft avançando de ferramentas digitais para apoio pedagógico.",
          },
          {
            tipo: "destaque",
            titulo: "Defesa competitiva",
            texto:
              "A defesa competitiva da We Make deve se apoiar em especialização no mercado cristão, propriedade intelectual protegida, metodologia própria, relacionamento consolidado com as escolas e integração profunda entre os componentes do sistema.",
          },
        ],
      },
    ],
  },
  {
    numero: 6,
    id: "produtos-servicos",
    titulo: "Produtos e Serviços",
    secoes: [
      {
        id: "curriculo-escolar",
        titulo: "O Kit We Make",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O Kit We Make é a unidade comercial única do sistema. Reúne currículo autoral de educação tecnológica para Ensino Fundamental I, Ensino Fundamental II e Ensino Médio, com Educação Infantil incorporada a partir de 2027, estruturado pela metodologia Conhecer, Explorar e Criar. O currículo se organiza em quatro categorias de experiência: Programação, Codificação e Jogos; Robótica e Eletrônica; Engenharia, Design e Fabricação; e Mordomia e Tecnologias para o Futuro, esta última dedicada a discutir de forma direta o uso responsável e o propósito da tecnologia à luz da cosmovisão cristã, para além da competência técnica em si.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Cada aula segue os três momentos da metodologia: Conhecer, que provoca deslumbramento e conexão inicial com o tema; Explorar, que sistematiza o conteúdo por meio de explicações, exemplos e discussão; e Criar, conduzido pelo Ciclo de Projeto: identificar o problema, pesquisar, imaginar soluções, planejar, construir, testar, identificar erros, aperfeiçoar e compartilhar o resultado. A avaliação acompanha todo esse percurso, não apenas o resultado final.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O contrato inclui também acesso à plataforma tecnológica própria, consultoria de espaço maker quando aplicável, assessoria institucional contínua e a Academia We Make. Nenhum desses componentes é cobrado à parte da escola ou família que já contratou o currículo. A cobrança adicional só ocorre quando a instituição solicita algo além do que está previsto no plano letivo já contratado.",
          },
        ],
      },
      {
        id: "homeschool",
        titulo: "O currículo para famílias educadoras",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Para famílias educadoras, o mesmo acervo curricular do Kit We Make é entregue em formato adaptado, hoje a frente de negócio mais madura e mais bem definida do sistema ao lado do currículo escolar, ambas já operando com produto, preço e canal de distribuição estabelecidos para 2027. O currículo se organiza em quatro trilhas: Programação Criativa, Robótica e Automação, Engenharia e Prototipagem, e Modelagem e Impressão 3D. Cada trilha é dividida em três níveis, nomeados segundo o percurso clássico do Trivium: Gramática, Lógica e Retórica. O público é de adolescentes de 12 a 16 anos.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Um nível equivale a um semestre completo, com encontro semanal entre tutor e aluno e acesso contínuo ao conteúdo prático da trilha pela plataforma digital. No ritmo esperado, a família conclui dois níveis por ano dentro da mesma trilha, e a trilha completa em cerca de um ano e meio. O acesso à plataforma é organizado por família, não por aluno isolado: o responsável tem acesso único, capaz de acompanhar mais de um filho matriculado, sem cobrança duplicada.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A venda, cobrança e parcelamento junto à família ficam a cargo de uma parceira comercial que já atua nesse mercado. A We Make não emite boleto nem intermedia esse pagamento, recebendo da parceria um valor líquido por nível concluído. A entrega é inteiramente digital, sem o Livro Maker físico que passa a integrar o Kit We Make escolar a partir de 2027. É uma diferença deliberada de escopo, não uma limitação, pois elimina estoque, logística e risco de capital de giro justamente na frente ainda em fase de validação de escala.",
          },
          {
            tipo: "tabela",
            legenda: "Primeira venda projetada, 2027 (Trilha 1)",
            cabecalho: ["Item", "Alunos", "Valor unitário", "Receita"],
            linhas: [
              ["Trilha 1, Nível 1", "100", "R$ 249,90", "R$ 24.990,00"],
              ["Trilha 1, Nível 2", "100", "R$ 249,00", "R$ 24.900,00"],
              ["Total", "", "", "R$ 49.890,00"],
            ],
          },
        ],
      },
      {
        id: "academia",
        titulo: "A Academia We Make",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A Academia We Make, nome ainda em definição, é a trilha de formação, mentoria e consultoria pedagógica oferecida a toda escola que adquire o Kit We Make e a toda família educadora atendida pelo sistema. Não é um produto vendido separadamente. Assim que o contrato de currículo é firmado, sua implantação é iniciada, organizada em oito fases sequenciais: apresentação pré-contratual, onboarding inicial, diagnóstico de entrada, implantação intensiva no primeiro bimestre, acompanhamento contínuo, formação continuada temática, diagnóstico de meio de ciclo e prescrição de resultados no fechamento do ano.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A responsabilidade pela implantação do cronograma é de Dênis Júlio e Emanuela Monteiro, com Suzana Bonifazio atuando na implantação, no acompanhamento e no suporte pedagógico recorrente. O detalhamento completo de cada fase está descrito em documento normativo próprio.",
          },
        ],
      },
      {
        id: "livro-precificacao",
        titulo: "O livro físico e a precificação",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A partir de 2027, o sistema passa a incluir o Livro Maker físico, com produção e distribuição realizadas por meio de gráfica parceira sediada em São Paulo. O livro complementa a entrega digital já realizada pela plataforma, funcionando como material de registro, reflexão e portfólio do aluno ao longo do ano letivo.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O valor de referência do Kit We Make é R$420,00 por aluno ao ano. A partir desse valor, a precificação final de cada contrato é ponderada por critérios técnicos e comerciais próprios de cada instituição: porte da escola, ticket médio cobrado das famílias, segmentos atendidos e natureza da instituição, incluindo casos de escolas sem fins lucrativos. A carteira atual reflete essa ponderação: contratos vigentes praticam valores entre R$180,00 e R$420,00 por aluno ao ano.",
          },
        ],
      },
    ],
  },
  {
    numero: 7,
    id: "operacoes",
    titulo: "Estrutura Organizacional e Operações",
    secoes: [
      {
        id: "onboarding",
        titulo: "Onboarding de escolas parceiras",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O onboarding de cada escola opera como processo documentado, estruturado em dois dias de formação presencial, carga horária de referência de 12 horas, distribuídas em três formações que seguem uma sequência deliberada: primeiro os fundamentos de cosmovisão, educação e tecnologia; depois a metodologia Conhecer, Explorar e Criar; e só então a operacionalização pela plataforma, pelo planejamento de aulas e pelas ferramentas do espaço maker. Essa ordem evita que a formação se reduza ao domínio técnico de equipamentos antes que o professor compreenda o propósito pedagógico e teológico que orienta seu uso.",
          },
          {
            tipo: "tabela",
            cabecalho: ["Bloco formativo", "Dia", "Carga horária"],
            linhas: [
              ["Cosmovisão, Educação e Tecnologia", "1", "2h45"],
              ["Conhecer, Explorar e Criar", "1", "2h30"],
              ["Plataforma, Planejamento e Ferramentas", "2", "5h15"],
              ["Abertura, retomadas, intervalos e sínteses", "1 e 2", "1h30"],
              ["Total", "", "12h"],
            ],
          },
        ],
      },
      {
        id: "tecnologia-propria",
        titulo: "Tecnologia própria",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make já opera um conjunto de tecnologias desenvolvidas internamente. A gestão comercial é realizada por um CRM próprio, disponível em comercial.wemake.tec.br, que organiza todo o processo de prospecção, negociação e acompanhamento de contratos. A empresa também mantém plataformas próprias de customização e acompanhamento do plano de negócio em tempo real, e uma estrutura de inteligência de negócio para acompanhamento da gestão financeira. Essas três camadas, comercial, planejamento e financeira, são construídas e mantidas pela equipe de três desenvolvedores e um cientista de dados para negócios já incorporada à empresa.",
          },
        ],
      },
      {
        id: "fornecedores",
        titulo: "Fornecedores e parceiros",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O fornecedor mais crítico da operação é a gráfica parceira em São Paulo, responsável pela produção e distribuição do Livro Maker a partir de 2027. Entre os parceiros estratégicos de acesso e legitimidade institucional, destaca-se a ACSI Brasil, hoje o principal parceiro institucional já consolidado, com acesso qualificado a mantenedores e diretores por meio de congressos e da Academia de Liderança.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Para a frente de famílias educadoras, a We Make mantém negociação avançada com a Aspen, parceria estratégica ainda em fase de estruturação, mas já com grandes avanços na definição do modelo de negócio conjunto.",
          },
        ],
      },
      {
        id: "regulamentacao-pi",
        titulo: "Regulamentação e propriedade intelectual",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O currículo já incorpora os principais referenciais normativos: a Base Nacional Comum Curricular, o Complemento de Computação e a Política Nacional de Educação Digital, detalhados no Capítulo 5. Na plataforma, aplicam-se a Lei Geral de Proteção de Dados, as normas da Autoridade Nacional de Proteção de Dados e o ECA Digital, exigindo governança contínua sobre bases legais de tratamento, retenção de dados e proteção específica de menores.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A marca We Make já foi encaminhada para registro e segue em processo de proteção de novas frentes autorais junto aos órgãos competentes, à medida que o portfólio curricular se expande. Os materiais do currículo possuem aviso de direitos autorais e cláusulas contratuais de restrição à reprodução em todos os contratos vigentes. Para autores terceirizados, a empresa trabalha com cessão de direitos de obra, sem direito a royalties, o que garante à We Make a titularidade plena e a liberdade de atualização contínua do material produzido.",
          },
        ],
      },
      {
        id: "parcerias-locais",
        titulo: "Parcerias locais e geração de repercussão",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Além da operação recorrente de implantação e acompanhamento, a We Make deve estruturar iniciativas que gerem visibilidade e repercussão local em cada região onde atua, aproximando a empresa de escolas, famílias e comunidades para além do contrato já firmado. Duas frentes concretas orientam esse esforço: olimpíadas de tecnologia e hackathons voltados aos alunos do sistema.",
          },
          {
            tipo: "paragrafo",
            texto:
              "As olimpíadas de tecnologia ainda estão em fase de estruturação, mas já integram o horizonte de iniciativas da empresa como forma de estimular a excelência técnica entre os alunos das escolas parceiras e ampliar a visibilidade do sistema We Make para além dos muros de cada instituição.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Os hackathons devem trabalhar problemas reais, exigindo soluções inovadoras alinhadas ao princípio que fundamenta o sistema We Make: tecnologia a serviço do desenvolvimento dos potenciais da criação e do alívio dos efeitos da Queda. A premiação já testada combina reconhecimento material e oportunidade concreta de carreira: cada integrante da equipe vencedora recebe um leitor digital, e a equipe como um todo recebe uma semana de estágio em empresas de tecnologia parceiras do projeto. Esse formato de prêmio direciona o aluno vencedor para uma experiência real de mercado de trabalho em tecnologia, e não apenas para um reconhecimento simbólico.",
          },
          {
            tipo: "destaque",
            titulo: "Lógica de expansão",
            texto:
              "A expansão dessas iniciativas para novas escolas e regiões deve seguir o mesmo princípio: parcerias locais que ofereçam projetos, prêmios ou oportunidades de estágio concretas em troca de exposição da marca We Make junto às comunidades escolares atendidas, fortalecendo o relacionamento comercial por meio de reputação construída em campo, não apenas por prospecção direta.",
          },
        ],
      },
    ],
  },
  {
    numero: 8,
    id: "marketing-comercial",
    titulo: "Marketing e Estratégia Comercial",
    secoes: [
      {
        id: "posicionamento",
        titulo: "Posicionamento",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make quer ser percebida como um sistema completo de educação tecnológica fundamentado na cosmovisão cristã, não como fornecedora de um componente isolado, seja robótica, plataforma ou consultoria. O posicionamento central é o de um sistema pedagógico integral, sequenciado e alinhado à Base Nacional Comum Curricular, estruturado a partir de uma antropologia cristã, que entrega currículo, plataforma, espaço maker, formação docente e assessoria institucional como partes de uma mesma proposta contratada de uma só vez.",
          },
        ],
      },
      {
        id: "forca-vendas-canais",
        titulo: "Força de vendas, canais e calendário comercial",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A venda do sistema We Make não é responsabilidade de uma única função isolada. O representante comercial, baseado em São Paulo, atua de forma integral na busca ativa de novas escolas, mas o processo comercial é conduzido por toda a equipe estratégica, cada membro atuando na fase que lhe é própria, da apresentação pedagógica às tratativas comerciais e contratuais, até o pós-venda pela Academia We Make. Essa característica torna a retenção de clientes parte do mesmo processo de venda, não uma etapa posterior e desconectada dele.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O modelo de distribuição é direto, consultivo e nacional, sem representantes ou revendedores. O funil típico percorre evento, indicação ou contato direto, reunião de diagnóstico, apresentação institucional, proposta comercial, apresentação ao conselho ou mantenedora e assinatura, gerido de ponta a ponta pelo CRM próprio da empresa.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O processo de compra acompanha o calendário escolar: fevereiro a abril concentram relacionamento, conteúdo e diagnóstico; maio e junho abrem a janela comercial forte para o ano seguinte; agosto a dezembro concentram o maior volume de fechamentos; dezembro e janeiro são dedicados a implantação e onboarding. O ciclo de venda do Kit We Make costuma levar entre 60 e 120 dias, da primeira apresentação à assinatura.",
          },
        ],
      },
      {
        id: "metas-vendas",
        titulo: "Meta de vendas do sistema, 2027-2031",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Indicador", "2027", "2028", "2029", "2030", "2031"],
            linhas: [
              ["Novas escolas contratantes", "10", "13", "16", "19", "22"],
              ["Alunos atendidos (meta)", "4.000", "5.000", "6.000", "7.000", "8.000"],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Como cenário-base, a empresa pretende alcançar entre 5% e 8% do mercado-alvo confessional até 2031, o equivalente a 75 a 80 escolas ativas. Essas metas devem ser revisadas anualmente à medida que o estudo de dimensionamento de mercado recomendado no Capítulo 4 seja concluído.",
          },
        ],
      },
    ],
  },
  {
    numero: 9,
    id: "premissas-financeiras",
    titulo: "Premissas de Crescimento: Receitas e Despesas",
    secoes: [
      {
        id: "orcamento-2027",
        titulo: "Orçamento operacional 2027",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A meta de receita da frente escolar para 2027 é R$1.100.000,00. Os 23 contratos já identificados somam R$951.961,90 (86,5% da meta), e a diferença até a meta, R$148.038,10 (13,5%), corresponde a escolas novas em fase final de negociação desde janeiro, com fechamento previsto para as próximas semanas.",
          },
          {
            tipo: "paragrafo",
            texto:
              "À meta escolar soma-se, como receita adicional e distinta, a venda da trilha de currículo para famílias educadoras: R$49.890,00 em 2027, referentes a 100 alunos adquirindo os dois níveis iniciais da Trilha 1. Somando as duas frentes, a receita total projetada para 2027 é R$1.149.890,00. A despesa total soma R$844.365,14, resultando em resultado operacional positivo de R$305.524,86, margem de 26,6%.",
          },
          {
            tipo: "destaque",
            titulo: "Piso do exercício",
            texto:
              "Considerando apenas os 23 contratos escolares hoje assinados, sem a receita ainda em negociação e sem a venda à frente de famílias educadoras, o resultado do exercício seria de R$107.596,76, margem de 11,3%, positivo em todos os cenários avaliados.",
          },
          {
            tipo: "stats",
            itens: [
              { label: "Já fechado (23 contratos)", valor: "R$ 951.962 · 86,5%" },
              { label: "A fechar (negociação avançada)", valor: "R$ 148.038 · 13,5%" },
              { label: "Homeschool 2027 (100 alunos)", valor: "R$ 49.890" },
              { label: "Receita total 2027", valor: "R$ 1.149.890" },
              { label: "Despesa total 2027", valor: "R$ 844.365" },
              { label: "Resultado operacional 2027", valor: "R$ 305.525 · 26,6%" },
            ],
          },
        ],
      },
      {
        id: "despesas-categoria",
        titulo: "Estrutura de despesas por categoria",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Categoria", "Valor anual", "% da despesa"],
            linhas: [
              ["Pessoal (CLT e PJ recorrente)", "R$ 350.172,00", "41,5%"],
              ["Produção gráfica e impressão", "R$ 180.000,00", "21,9%"],
              ["Taxas e serviços financeiros", "R$ 111.772,38", "13,6%"],
              ["Tecnologia (inclui Plataforma Arkos)", "R$ 44.390,76", "5,4%"],
              ["Infraestrutura e utilidades (inclui sede própria)", "R$ 44.760,00", "5,4%"],
              ["Marketing e publicidade", "R$ 39.500,00", "4,8%"],
              ["Viagens e representação", "R$ 29.400,00", "3,6%"],
              ["Comercial e relacionamento", "R$ 20.000,00", "2,4%"],
              ["Produção audiovisual", "R$ 11.500,00", "1,4%"],
              ["Logística e distribuição", "R$ 9.000,00", "1,1%"],
              ["Regulatórios, PI e taxas legais", "R$ 3.870,00", "0,5%"],
              ["Total", "R$ 844.365,14", "100%"],
            ],
          },
        ],
      },
      {
        id: "pessoal-detalhe",
        titulo: "Detalhamento de pessoal",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Função", "Mensal", "Anual"],
            linhas: [
              ["CEO, Dênis Júlio", "R$ 15.000,00", "R$ 180.000,00"],
              ["Gerente Administrativo, Renato Assis", "R$ 6.000,00", "R$ 72.000,00"],
              ["Analista de Marketing, Emanuel Peixoto", "R$ 3.000,00", "R$ 36.000,00"],
              ["Consultora Pedagógica, Suzana Bonifazio", "R$ 2.000,00", "R$ 24.000,00"],
              ["Consultora Pedagógica e de Negócios, Emanuela Monteiro", "R$ 1.000,00", "R$ 12.000,00"],
              ["Representante Comercial, Christiano Bonifazio (fixo)", "R$ 1.621,00", "R$ 19.452,00"],
              ["Contador", "R$ 400,00", "R$ 4.800,00"],
              ["Pós-graduação (Suzana e Christiano)", "·", "R$ 1.920,00"],
              ["Total de pessoal", "", "R$ 350.172,00"],
            ],
          },
          {
            tipo: "destaque",
            titulo: "Comissão comercial",
            texto:
              "O valor acima cobre apenas o componente fixo da remuneração de Christiano Bonifazio. A comissão de 1% sobre os contratos escolares por ele fechados ainda não tem valor estimado neste orçamento, por depender do volume real de fechamentos ao longo do ano.",
          },
        ],
      },
      {
        id: "reprecificacao",
        titulo: "Cenário contrafactual: reprecificação da base legada",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Este é um exercício contrafactual, não um componente do orçamento de 2027 nem da meta escolar de R$1.100.000,00. O objetivo é mostrar até onde a receita poderia chegar, além do que já está orçado, caso nove contratos legados decidam aderir ao Livro Maker, hoje ausente de seus contratos. São clientes já ativos. Avalia-se apenas a inclusão de um componente adicional ao contrato vigente.",
          },
          {
            tipo: "tabela",
            legenda: "Nove contratos legados: situação atual e com adoção do Livro Maker",
            cabecalho: ["Escola", "Alunos", "Ticket atual", "Receita atual", "Ticket c/ livro", "Receita c/ livro"],
            linhas: [
              ["Colégio Cristão Amar", "234", "R$ 345,00", "R$ 80.730,00", "R$ 380,00", "R$ 88.920,00"],
              ["Colégio Journey", "348", "R$ 288,00", "R$ 100.224,00", "R$ 360,00", "R$ 125.280,00"],
              ["Escola Cristã do Reino", "19", "R$ 249,00", "R$ 4.731,00", "R$ 310,00", "R$ 5.890,00"],
              ["Educar Londrina", "322", "R$ 198,00", "R$ 63.756,00", "R$ 350,00", "R$ 112.700,00"],
              ["CESE", "210", "R$ 180,00", "R$ 37.800,00", "R$ 300,00", "R$ 63.000,00"],
              ["CEA", "20", "R$ 180,00", "R$ 3.600,00", "R$ 280,00", "R$ 5.600,00"],
              ["Sagrados Corações", "60", "R$ 210,00", "R$ 12.600,00", "R$ 350,00", "R$ 21.000,00"],
              ["ACR Classical Christian School", "42", "R$ 279,00", "R$ 11.718,00", "R$ 350,00", "R$ 14.700,00"],
              ["Escola Cristã Paz", "180", "R$ 250,80", "R$ 45.144,00", "R$ 350,00", "R$ 63.000,00"],
              ["Total", "1.435", "", "R$ 360.303,00", "", "R$ 500.090,00"],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Se as nove escolas migrarem integralmente para o formato com livro, a receita conjunta desse grupo sobe de R$360.303,00 para R$500.090,00, ganho potencial de R$139.787,00 ao ano, adicional à receita total já projetada para 2027. Para viabilizar essa migração, provisiona-se R$50.000,00 destinado à produção do primeiro lote de Livro Maker para as escolas que aderirem, condicionado à efetiva adesão, não como custo fixo automático de 2027.",
          },
        ],
      },
      {
        id: "cenario-alunos",
        titulo: "Cenário de crescimento por meta de alunos, 2027-2031",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Este é um terceiro exercício numérico, distinto do orçamento operacional por contrato e do exercício de valuation. Parte da meta de 4.000 alunos em 2027 e projeta crescimento de 1.000 alunos ao ano até 2031 no cenário-base, alcançando 8.000 alunos no último ano do plano. É uma leitura por número de alunos, distinta da leitura por meta de receita, mas convergente: ambas confirmam que 2027 fecha com margem operacional positiva.",
          },
          {
            tipo: "tabela",
            cabecalho: ["Ano", "Alunos", "Ticket médio", "Receita projetada", "Despesa total", "Resultado"],
            linhas: [
              ["2027", "4.000", "R$ 293,82", "R$ 1.175.261,60", "R$ 888.806", "R$ 286.456"],
              ["2028", "5.000", "R$ 305,57", "R$ 1.527.840,09", "R$ 1.039.886", "R$ 487.954"],
              ["2029", "6.000", "R$ 317,79", "R$ 1.906.744,43", "R$ 1.199.601", "R$ 707.144"],
              ["2030", "7.000", "R$ 330,50", "R$ 2.313.516,57", "R$ 1.368.697", "R$ 944.819"],
              ["2031", "8.000", "R$ 343,72", "R$ 2.749.779,70", "R$ 1.547.992", "R$ 1.201.787"],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Nesse cenário, a margem operacional passa de aproximadamente 24,4% em 2027 para cerca de 43,7% em 2031, porque a receita cresce por dois motores ao mesmo tempo: mais alunos e ticket reajustado pela inflação, enquanto a despesa cresce sobretudo pelo bloco estrutural, com incremento inferior ao crescimento da receita.",
          },
        ],
      },
    ],
  },
  {
    numero: 10,
    id: "swot",
    titulo: "Análise SWOT",
    secoes: [
      {
        id: "swot-matriz",
        titulo: "Forças, fraquezas, oportunidades e ameaças",
        blocos: [
          { tipo: "subtitulo", texto: "Forças" },
          {
            tipo: "lista",
            itens: [
              "Integração entre currículo, plataforma, formação, espaço maker e assessoria em um único sistema, difícil de reproduzir por concorrentes especializados em apenas um componente.",
              "Currículo autoral consolidado do 1º ao 9º ano, com Ensino Médio e Educação Infantil em expansão.",
              "Cosmovisão cristã incorporada ao produto, não apenas ao discurso comercial.",
              "Relacionamento próximo e recorrente com as escolas parceiras.",
              "Entrega do Currículo Maker inteiramente digital, sem custo de logística física.",
              "Modelo de precificação com calculadora e planos de adesão, adaptável ao porte e à natureza de cada escola.",
            ],
          },
          { tipo: "subtitulo", texto: "Fraquezas" },
          {
            tipo: "lista",
            itens: [
              "Dependência elevada da presença pessoal do fundador para vendas de maior complexidade.",
              "Formação Docente, Espaço Maker e Assessoria Institucional ainda não produtizados como linhas independentes.",
              "Processo de registro de marca e de novas frentes autorais ainda em andamento junto aos órgãos competentes.",
              "Plataforma tecnologicamente menos madura que a de concorrentes de maior porte.",
              "Presença digital e participação em grandes eventos de EdTech ainda incipiente.",
              "TAM e SAM ainda baseados em estimativa preliminar, sem estudo de dimensionamento consolidado.",
            ],
          },
          { tipo: "subtitulo", texto: "Oportunidades" },
          {
            tipo: "lista",
            itens: [
              "Curricularização da educação digital e da computação na Educação Básica.",
              "Fragmentação do mercado atual: escolas compram de vários fornecedores diferentes para currículo, formação, software e equipamentos.",
              "Negociação avançada com a Aspen como possível porta de entrada para comunidades de homeschooling.",
              "Assessoria Institucional como linha de menor concorrência direta no recorte confessional.",
              "Potencial de expansão para escola técnica nacional e faculdade de tecnologia.",
              "Modelos de licenciamento ou distribuição OEM com redes confessionais já estabelecidas.",
            ],
          },
          { tipo: "subtitulo", texto: "Ameaças" },
          {
            tipo: "lista",
            itens: [
              "Entrada de sistemas de ensino cristãos, grandes editoras ou big techs no mesmo nicho.",
              "Comoditização de planos de aula e conteúdo por ferramentas de inteligência artificial generativa.",
              "Pressão orçamentária das escolas clientes em cenários de deterioração macroeconômica.",
              "Incerteza regulatória sobre o homeschooling no Brasil.",
              "Risco de uso indevido de conteúdo proprietário para treinamento de IA de terceiros.",
            ],
          },
          {
            tipo: "destaque",
            titulo: "Leitura cruzada",
            texto:
              "A prioridade é clara: transformar a integração do sistema, hoje sustentada em grande parte pelo conhecimento pessoal da liderança, em processo documentado e replicável, antes que a dependência de liderança central se torne restrição ativa ao crescimento projetado.",
          },
        ],
      },
    ],
  },
  {
    numero: 11,
    id: "plano-financeiro",
    titulo: "Plano Financeiro",
    secoes: [
      {
        id: "estrutura-custos",
        titulo: "Estrutura de custos",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Os custos específicos do conteúdo curricular cobrem autoria, revisão, diagramação, ilustração e, a partir do Livro Maker, gráfica, estoque e frete. Na Academia We Make, o custo principal é o tempo da equipe de consultoria pedagógica. Na plataforma, os custos concentram-se em desenvolvimento, hospedagem, manutenção e segurança. No espaço maker, predominam custos por projeto, já que equipamentos e obras são normalmente adquiridos diretamente pela escola. Na assessoria institucional, o principal custo é o tempo dos consultores e a infraestrutura de dados que sustenta a análise entregue às escolas.",
          },
        ],
      },
      {
        id: "indicadores-retorno",
        titulo: "Indicadores de retorno",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Indicador", "O que mede"],
            linhas: [
              ["Margem bruta por aluno e por escola", "Rentabilidade do sistema integral entregue a cada cliente"],
              ["Retenção e renovação contratual", "Capacidade de manter a base de escolas e famílias educadoras ano após ano"],
              ["LTV sobre CAC", "Retorno do investimento comercial ao longo do relacionamento com cada cliente"],
              ["Custo por hora de formação e de consultoria", "Eficiência da Academia We Make e da assessoria institucional"],
              ["Custo de infraestrutura da plataforma por instituição ativa", "Eficiência tecnológica à medida que a base cresce"],
              ["Margem de contribuição por projeto de espaço maker", "Rentabilidade da consultoria de ambiente físico quando solicitada"],
            ],
          },
        ],
      },
    ],
  },
  {
    numero: 12,
    id: "crescimento-futuro",
    titulo: "Estratégia de Crescimento Futuro",
    secoes: [
      {
        id: "hoje-vs-futuro",
        titulo: "O que opera hoje e o que compõe o ecossistema futuro",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["", "Funciona hoje", "A partir do ano 4 (2030)"],
            linhas: [
              ["O que é", "O sistema We Make, vendido de forma integral a escolas confessionais e a famílias educadoras", "Escola de tecnologia para crianças e adolescentes em geral, e eventual faculdade de tecnologia, ambas voltadas ao indivíduo, independentemente de vínculo com escola parceira. A faculdade, em particular, é possibilidade a ser buscada, não frente já decidida"],
              ["Status", "Gera receita real, contratada e projetada até 2031", "Sem receita, sem contrato, sem operação até o momento"],
              ["Investimento", "Já orçado: receita total de R$1.149.890,00 (meta escolar mais famílias educadoras) e R$844.365,14 em despesa operacional para 2027, detalhados no Capítulo 9", "Ainda não orçado. Depende de business case próprio"],
              ["Condição de avanço", "Execução do roadmap de consolidação", "Consolidação prévia do sistema atual, validação de demanda e conclusão do registro de propriedade intelectual"],
            ],
          },
          {
            tipo: "destaque",
            titulo: "Em outras palavras",
            texto:
              "Toda a receita que este plano projeta entre 2027 e 2031 vem do sistema já existente, vendido a escolas e famílias educadoras. A escola de tecnologia e a faculdade são o horizonte que esse sistema torna possível a partir do quarto ano do plano, não um compromisso financeiro dos três primeiros anos.",
          },
        ],
      },
      {
        id: "roadmap",
        titulo: "Roadmap de consolidação",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O período entre setembro e dezembro de 2026 é dedicado a preparar produtos, processos, tecnologia, equipe, contratos, preços e logística para o ciclo seguinte. Em 2027, o foco é consolidação do sistema já entregue. Em 2028, replicação e delegação, reduzindo a dependência direta da liderança central. Em 2029, escala orientada por dados. Em 2030, início da operação dos dois negócios futuros. Em 2031, consolidação da We Make como referência nacional em educação tecnológica fundamentada na cosmovisão cristã.",
          },
        ],
      },
      {
        id: "escola-faculdade",
        titulo: "Escola de tecnologia e faculdade de tecnologia",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "O sistema We Make já detém o currículo, a metodologia de ensino em três etapas e a experiência de formação de tutores leigos que sustentam uma escola de tecnologia própria, de abrangência nacional, dedicada à formação de crianças e adolescentes em programação, robótica e áreas correlatas, sob a mesma cosmovisão cristã que já fundamenta o sistema atual. Diferentemente do sistema escolar e do sistema de famílias educadoras, essa escola atende diretamente o indivíduo, sem exigir vínculo com uma escola parceira.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A faculdade de tecnologia é a extensão, no nível de ensino superior, da mesma proposta que a We Make já pratica da Educação Infantil ao Ensino Médio. Depende de etapas regulatórias que extrapolam o controle direto da empresa, entre elas o credenciamento junto ao Ministério da Educação e a definição do arranjo institucional. A parceria com a FICV sustenta também esse horizonte de longo prazo, que pretende oferecer também graduações em pedagogia e psicologia.",
          },
        ],
      },
      {
        id: "condicoes-sucesso",
        titulo: "Condições de sucesso",
        blocos: [
          {
            tipo: "lista",
            itens: [
              "Consolidação prévia da governança e da estrutura organizacional descrita no Capítulo 7, sem a qual a ampliação de escopo institucional multiplicaria a dependência de liderança central.",
              "Validação de demanda real por meio da execução das metas comerciais de 2027 a 2029 antes de comprometer capital relevante nos dois negócios futuros.",
              "Conclusão do registro da propriedade intelectual do currículo e da marca.",
              "Estruturação de capital, próprio ou externo, dimensionado especificamente para a escola de tecnologia e para a faculdade.",
            ],
          },
        ],
      },
      {
        id: "capital-externo",
        titulo: "Papel de um eventual capital externo",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A trajetória descrita neste plano foi construída, até aqui, com recursos próprios, sem dívida ou passivo relevante a sustentar. Essa é a base a partir da qual qualquer conversa sobre capital externo deve partir: não como suprimento de uma operação em dificuldade, mas como aceleração de uma trajetória que a empresa já demonstrou ser capaz de percorrer sozinha. A pergunta que orienta essa conversa não é se a We Make consegue chegar ao horizonte de cinco anos deste plano, mas se um eventual investidor deseja antecipar esse horizonte para dois ou três anos.",
          },
          {
            tipo: "destaque",
            titulo: "Prioridades, se a aceleração se concretizar",
            texto:
              "Fortalecimento imediato da equipe comercial e investimento mais robusto na consultoria pedagógica, para elevar a experiência de pós-venda das escolas e famílias atendidas. Essas prioridades são inspiração de alocação, não orçamento aprovado, e devem ser tratadas com o mesmo rigor de conciliação já aplicado às demais estimativas deste plano antes de qualquer decisão de captação.",
          },
        ],
      },
    ],
  },
  {
    numero: 13,
    id: "riscos",
    titulo: "Análise de Riscos",
    secoes: [
      {
        id: "riscos-principais",
        titulo: "Principais riscos identificados",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "Grande parte do conhecimento comercial, pedagógico e de relacionamento institucional da empresa está concentrada no CEO e, em menor grau, no Gerente Administrativo. A venda da Assessoria Institucional e do Espaço Maker, em particular, ainda depende diretamente da participação do fundador nas negociações mais complexas, padrão comum em empresas em fase de crescimento acelerado, que exige documentação sistemática de processos, delegação progressiva e formação de uma segunda camada de liderança.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O currículo é o componente mais maduro do sistema. A Academia We Make, o espaço maker e a assessoria institucional ainda dependem de maior padronização interna para operar de forma escalável, e a plataforma exige investimento tecnológico contínuo para não ficar atrás de concorrentes de maior porte. Essa maturidade desigual cria risco de que a venda do sistema avance mais rápido do que a capacidade operacional de entregar todos os seus componentes com o mesmo padrão de qualidade.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O homeschooling não possui regulamentação federal consolidada no Brasil. Uma família de Blumenau, em Santa Catarina, mantida em regime de educação domiciliar havia treze anos, foi condenada em primeira instância em agosto de 2026, com multa de aproximadamente R$65 mil e determinação de matrícula obrigatória na rede regular. O precedente confirma que a exposição legal recai sobre a família, não sobre o fornecedor de currículo, o que já orienta a estruturação do modelo de negócio em negociação com a Aspen: a relação direta com a família fica a cargo da parceira, com a We Make fornecendo conteúdo e plataforma. A empresa deve monitorar a tramitação do PL 1.338/2022.",
          },
        ],
      },
      {
        id: "matriz-riscos",
        titulo: "Matriz de probabilidade e impacto",
        blocos: [
          {
            tipo: "tabela",
            cabecalho: ["Risco", "Probabilidade", "Impacto", "Prioridade de tratamento"],
            linhas: [
              ["Dependência de liderança central", "Alta", "Alto", "Imediata"],
              ["Propriedade intelectual sem registro confirmado", "Média", "Alto", "Imediata"],
              ["Maturidade desigual entre linhas", "Alta", "Médio", "Imediata"],
              ["Uso indevido por IA de terceiros", "Baixa", "Médio", "No prazo do ciclo 2027"],
              ["Regulação do homeschooling", "Baixa", "Alto", "Monitoramento contínuo"],
              ["Concorrência e pressão de custo", "Média", "Médio", "No prazo do ciclo 2027"],
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Nenhum dos riscos listados é, isoladamente, impeditivo do plano de crescimento apresentado. Em conjunto, justificam que a consolidação de governança e a padronização dos componentes do sistema precedam o avanço para os dois negócios futuros descritos no Capítulo 12.",
          },
        ],
      },
    ],
  },
  {
    numero: 14,
    id: "consideracoes-finais",
    titulo: "Considerações Finais",
    secoes: [
      {
        id: "consideracoes-finais-corpo",
        titulo: "Considerações Finais",
        blocos: [
          {
            tipo: "paragrafo",
            texto:
              "A We Make entrega hoje um sistema único de educação tecnológica, fundamentado na cosmovisão cristã, a escolas confessionais e a famílias educadoras. Currículo, plataforma, espaço maker, formação docente e assessoria institucional funcionam de forma integrada, contratados de uma só vez, sem fracionamento de preço ou de decisão comercial entre esses componentes.",
          },
          {
            tipo: "paragrafo",
            texto:
              "O ano de 2027 é, por desenho, um ano de reinvestimento: a receita mais que dobra frente a 2025, e a empresa amplia remuneração da liderança, tecnologia própria e estrutura física mantendo resultado operacional positivo de R$305.524,86, margem de 26,6%, considerando a meta escolar já contratada, a receita em negociação avançada e a primeira venda à frente de famílias educadoras.",
          },
          {
            tipo: "paragrafo",
            texto:
              "A partir do quarto ano deste plano, a empresa pretende lançar dois negócios que atendem o indivíduo diretamente, sem vínculo com escola parceira: a escola de tecnologia para crianças e adolescentes em geral, e a faculdade de tecnologia, sustentada em parte pela parceria com a Faculdade Integrada de Ciências e Valores. Esses dois negócios permanecem condicionados à consolidação do sistema atual, e não competem por recurso ou atenção com a operação já contratada para os próximos anos.",
          },
          {
            tipo: "destaque",
            titulo: "Natureza do documento",
            texto:
              "Este plano organiza premissas, metas e projeções em torno do sistema já entregue, com metas e indicadores construídos a partir de dados reais de contrato e de orçamento, e deve ser revisado à medida que o realizado financeiro e comercial de cada ciclo avance.",
          },
        ],
      },
    ],
  },
];
