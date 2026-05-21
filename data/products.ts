import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "curriculo",
    category: "curriculo",
    name: "Currículo We Make",
    headline: "Da Educação Infantil ao Ensino Médio",
    description:
      "Material didático integrado, alinhado à BNCC e ancorado em cosmovisão cristã. Sequência espiralada que cresce com o estudante ao longo de doze anos.",
    features: [
      "Cadernos editoriais por segmento",
      "Trilhas integradas a Filosofia, Teologia e Artes",
      "Avaliações formativas e por competência",
      "Guia do professor com fundamentação teórica",
    ],
    audience: ["fundamental-1", "fundamental-2", "medio"],
  },
  {
    id: "plataforma",
    category: "plataforma",
    name: "Plataforma We Make",
    headline: "Ambiente digital institucional",
    description:
      "Plataforma proprietária para gestão pedagógica, trilhas do estudante, portfólio criativo e acompanhamento do educador.",
    features: [
      "Portfólio digital do estudante",
      "Dashboards pedagógicos por turma",
      "Conteúdo offline-first em sala",
      "Integração com sistemas escolares",
    ],
    audience: ["institucional"],
  },
  {
    id: "formacao",
    category: "formacao",
    name: "Formação Continuada",
    headline: "Educadores que pensam antes de ensinar",
    description:
      "Programa estruturado de formação de professores: fundamentos filosóficos, prática pedagógica e domínio técnico das ferramentas.",
    features: [
      "Imersões presenciais semestrais",
      "Mentoria pedagógica contínua",
      "Comunidade nacional de educadores",
      "Certificação institucional",
    ],
    audience: ["institucional"],
  },
  {
    id: "consultoria",
    category: "consultoria",
    name: "Consultoria Institucional",
    headline: "Estratégia para o futuro da sua escola",
    description:
      "Consultoria executiva para diretores e mantenedores: diagnóstico, plano plurianual e implementação de tecnologia educacional com identidade cristã.",
    features: [
      "Diagnóstico institucional 360°",
      "Plano de implementação plurianual",
      "Acompanhamento executivo",
      "Conselho consultivo permanente",
    ],
    audience: ["institucional"],
  },
];
