import { AlertTriangle, Hammer, Lightbulb } from "lucide-react";
import type { SchoolProblem } from "@/types";

/**
 * "O Problema das Escolas" — diagnóstico honesto.
 * Três falhas estruturais que vemos repetir-se em escolas confessionais
 * ao tentar adotar tecnologia sem direção institucional.
 */
export const problems: SchoolProblem[] = [
  {
    id: "tecnologia",
    number: "α",
    title: "Tecnologia sem cosmovisão",
    diagnosis:
      "Escolas adotam ferramentas digitais como se fossem neutras — esquecendo que cada plataforma carrega uma antropologia, uma estética e uma ética.",
    consequence:
      "O resultado: estudantes tecnicamente competentes e filosoficamente desorientados.",
    icon: AlertTriangle,
  },
  {
    id: "makers",
    number: "β",
    title: "Espaços maker sem propósito",
    diagnosis:
      "Salas equipadas com impressoras 3D, robôs e cortadoras a laser que não conversam com o currículo nem com a identidade da escola.",
    consequence:
      "Ambientes caros, subutilizados — vitrines de inovação que não formam pessoas.",
    icon: Hammer,
  },
  {
    id: "inovacao",
    number: "γ",
    title: "Inovação sem formação humana",
    diagnosis:
      "Projetos de inovação que esquecem o essencial: a tecnologia deve servir à formação integral, não substituí-la.",
    consequence:
      "Escolas que se modernizam por fora e se esvaziam por dentro.",
    icon: Lightbulb,
  },
];
