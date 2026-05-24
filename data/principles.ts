import {
  BookOpenText,
  Compass,
  Eye,
  Hammer,
  HeartHandshake,
  Lightbulb,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Os 7 Princípios para Ensinar Tecnologia com Coerência e Fidelidade
 * - núcleo do livro do Dênis Júlio P. Francisco (Editora We Make).
 *
 * Estes princípios estruturam o currículo, a formação docente
 * e a assessoria pedagógica oferecidos às escolas parceiras.
 */

export type Principle = {
  id: string;
  number: string;
  title: string;
  brief: string;
  body: string;
  icon: LucideIcon;
};

export const principles: Principle[] = [
  {
    id: "ferramenta",
    number: "01",
    title: "Tecnologia como ferramenta - não como fim.",
    brief: "A tecnologia serve ao humano, e o humano serve a Deus.",
    body:
      "Ensinar a usar é fácil. Ensinar para quê é o que distingue uma escola cristã reformada. Nossos estudantes aprendem a interrogar o propósito antes da técnica, lembrando que toda criação humana é coram Deo - diante de Deus.",
    icon: Wrench,
  },
  {
    id: "carater",
    number: "02",
    title: "Caráter antes da habilidade técnica.",
    brief: "O programador sábio é primeiro uma pessoa íntegra.",
    body:
      "Em um mundo que premia a competência amoral, formamos pessoas em quem se possa confiar - mesmo quando ninguém estiver olhando o código.",
    icon: HeartHandshake,
  },
  {
    id: "imago-dei",
    number: "03",
    title: "Criar como expressão da Imago Dei.",
    brief: "Quem cria, reflete o Criador.",
    body:
      "Criar é vocação dada por Deus - derivada da nossa condição de portadores da Sua imagem (Gn 1:26-28). Escrever código, imprimir em 3D ou projetar um circuito são atos teológicos antes de técnicos. A escola cristã reformada não pode ensiná-los de qualquer jeito.",
    icon: Lightbulb,
  },
  {
    id: "discernimento",
    number: "04",
    title: "Discernimento diante da inovação.",
    brief: "Nem tudo o que é novo precisa ser adotado.",
    body:
      "A queda atinge também a cultura tecnológica - toda inovação carrega pressupostos que precisam ser provados (1Ts 5:21). Formamos estudantes capazes de discernir o que abraçar, o que adiar e o que recusar diante de IA, redes e novas plataformas.",
    icon: Eye,
  },
  {
    id: "queda",
    number: "05",
    title: "Tecnologia para aliviar os efeitos da Queda.",
    brief: "Criar para servir e restaurar.",
    body:
      "Vivemos entre a Queda e a Consumação. Tecnologia bem aplicada participa do trabalho restaurador de Cristo: alivia sofrimento, devolve dignidade, abre possibilidades - sem nunca substituir o encontro humano nem assumir o lugar de Deus.",
    icon: Compass,
  },
  {
    id: "construir",
    number: "06",
    title: "Construir, não apenas consumir.",
    brief: "Da audiência ao fazer.",
    body:
      "A cultura digital nos transformou em consumidores passivos. A We Make devolve aos estudantes o gesto ativo de construir - robôs, software, objetos, ideias.",
    icon: Hammer,
  },
  {
    id: "curriculo",
    number: "07",
    title: "Intencionalidade curricular.",
    brief: "Tecnologia integrada à escola - não anexada a ela.",
    body:
      "Nada de robótica como apêndice. Tecnologia entra no currículo articulada à BNCC, à teologia e à formação humana - com sequência, fundamentação e propósito.",
    icon: BookOpenText,
  },
];
