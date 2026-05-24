import { Crown, Flame, Heart, Sparkles } from "lucide-react";
import type { VisionPrinciple } from "@/types";

/**
 * A Visão da We Make.
 *
 * Verdade, Beleza e Bondade — lidas a partir da cosmovisão reformada — e
 * coroadas pelo Mandato Cultural (Gn 1:28) e pela doutrina da Imago Dei.
 *
 * Não tratamos os transcendentais como esquema tomista neutro: são lidos
 * sob a soberania de Cristo sobre todas as esferas da vida (Kuyper) e
 * encarnados pedagogicamente em cada princípio do nosso currículo.
 */
export const vision: VisionPrinciple[] = [
  {
    id: "verdade",
    number: "I",
    title: "Verdade",
    greek: "Veritas",
    subtitle: "Aquilo que é",
    description:
      "Educar é alinhar o intelecto à realidade. Antes do código, do design ou do produto, ensinamos a reconhecer o que é verdadeiro — porque sem verdade não há ciência, não há arte e não há vocação.",
    icon: Sparkles,
    accent: "cyan",
  },
  {
    id: "beleza",
    number: "II",
    title: "Beleza",
    greek: "Pulchritudo",
    subtitle: "Aquilo que atrai",
    description:
      "A beleza é a forma como a verdade chega ao coração. Por isso desenhamos material, plataforma e espaço maker com excelência estética — formando estudantes capazes de criar com sensibilidade e rigor.",
    icon: Flame,
    accent: "violet",
  },
  {
    id: "bondade",
    number: "III",
    title: "Bondade",
    greek: "Bonitas",
    subtitle: "Aquilo que orienta",
    description:
      "Tecnologia sem ética é poder sem direção. A bondade nos lembra que toda criação é também uma decisão moral — e que formar engenheiros, designers e cientistas é, antes, formar pessoas.",
    icon: Heart,
    accent: "amber",
  },
  {
    id: "mandato",
    number: "IV",
    title: "Mandato Cultural",
    greek: "Imago Dei",
    subtitle: "Cultivar o mundo",
    description:
      "O ser humano foi criado para cultivar. Tecnologia, arte e ciência são gestos de cultivo — e a sala de aula cristã é onde aprendemos a exercer esse mandato com excelência e fidelidade.",
    icon: Crown,
    accent: "blue",
  },
];
