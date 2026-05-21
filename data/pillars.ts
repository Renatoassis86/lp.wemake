import { BookOpenText, Compass, Microscope, Sparkles } from "lucide-react";
import type { Pillar } from "@/types";

/**
 * Os quatro pilares pedagógicos da We Make.
 * Estruturam o currículo, a formação de educadores e as soluções tecnológicas.
 */
export const pillars: Pillar[] = [
  {
    id: "cosmovisao",
    number: "01",
    title: "Cosmovisão",
    subtitle: "O ponto de partida",
    description:
      "Toda tecnologia é cultural antes de ser técnica. Ensinamos a discernir os pressupostos invisíveis que atravessam ferramentas, linguagens e algoritmos — à luz da tradição cristã.",
    icon: Compass,
    accent: "cyan",
  },
  {
    id: "pensamento",
    number: "02",
    title: "Pensamento",
    subtitle: "Antes do código, o conceito",
    description:
      "Lógica, abstração, modelagem e argumento. Formamos estudantes que pensam antes de programar — e que sabem por que estão programando.",
    icon: BookOpenText,
    accent: "blue",
  },
  {
    id: "criacao",
    number: "03",
    title: "Criação",
    subtitle: "Cultivar o mundo",
    description:
      "Da prancheta ao protótipo. Robótica, design, fabricação digital e desenvolvimento de software como gestos de cultivo — vocação criativa orientada ao bem comum.",
    icon: Sparkles,
    accent: "violet",
  },
  {
    id: "investigacao",
    number: "04",
    title: "Investigação",
    subtitle: "Conhecer com rigor",
    description:
      "Ciência, experimento e leitura crítica. Tecnologia ensinada como prática reflexiva, integrada ao currículo geral e fiel à busca pela verdade.",
    icon: Microscope,
    accent: "amber",
  },
];
