import {
  BookOpenText,
  Building2,
  Cpu,
  GraduationCap,
  Wrench,
} from "lucide-react";
import type { Service } from "@/types";

/**
 * Cinco frentes integradas - estrutura completa do portfólio We Make.
 * Substitui o catálogo genérico anterior.
 */
export const services: Service[] = [
  {
    id: "curriculo-maker",
    number: "01",
    category: "curriculo",
    name: "Currículo Maker",
    headline: "Da Educação Infantil ao Ensino Médio",
    description:
      "Material didático integrado e espiralado, articulando filosofia, tecnologia, ciências e artes. Cada caderno editorial é fundamentado a partir da cosmovisão reformada - não como um verniz teológico aplicado depois, mas como o ponto de partida.",
    features: [
      "Cadernos editoriais por segmento",
      "Trilhas integradas BNCC + cosmovisão reformada",
      "Avaliação por competência e portfólio",
      "Guia teórico do professor",
    ],
    icon: BookOpenText,
  },
  {
    id: "formacao-docente",
    number: "02",
    category: "formacao",
    name: "Formação Docente",
    headline: "Educadores que pensam antes de ensinar",
    description:
      "Programa estruturado de formação continuada para professores: fundamentos filosóficos, prática pedagógica e domínio técnico das ferramentas maker.",
    features: [
      "Imersões presenciais semestrais",
      "Mentoria pedagógica contínua",
      "Comunidade nacional de educadores",
      "Certificação institucional",
    ],
    icon: GraduationCap,
  },
  {
    id: "plataforma",
    number: "03",
    category: "plataforma",
    name: "Plataforma We Make",
    headline: "Ambiente digital institucional",
    description:
      "Plataforma proprietária para gestão pedagógica, trilhas do estudante, portfólio criativo e acompanhamento do educador - offline-first em sala.",
    features: [
      "Portfólio digital do estudante",
      "Dashboards pedagógicos por turma",
      "Conteúdo offline-first em sala",
      "Integração com sistemas escolares",
    ],
    icon: Cpu,
  },
  {
    id: "espaco-maker",
    number: "04",
    category: "espaco",
    name: "Espaço Maker",
    headline: "Arquitetura pedagógica do laboratório",
    description:
      "Projeto completo de espaço maker: arquitetura, equipamentos, fluxo pedagógico e protocolos de uso - desenhado para integrar-se ao currículo e à identidade da escola.",
    features: [
      "Projeto arquitetônico e mobiliário",
      "Kit pedagógico de equipamentos",
      "Protocolos de uso por segmento",
      "Acompanhamento de implantação",
    ],
    icon: Wrench,
  },
  {
    id: "assessoria",
    number: "05",
    category: "assessoria",
    name: "Assessoria Institucional",
    headline: "Estratégia para o futuro da sua escola",
    description:
      "Consultoria executiva para diretores e mantenedores: diagnóstico institucional, plano plurianual e implementação de tecnologia educacional com identidade cristã.",
    features: [
      "Diagnóstico institucional 360°",
      "Plano de implementação plurianual",
      "Acompanhamento executivo",
      "Conselho consultivo permanente",
    ],
    icon: Building2,
  },
];
