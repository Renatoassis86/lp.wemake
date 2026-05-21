import { Crown, Flame, Heart, Sparkles } from "lucide-react";
import type { VisionPrinciple } from "@/types";

/**
 * A Visão da We Make.
 * Os três transcendentais clássicos — Verdade, Beleza, Bondade — coroados
 * pelo Mandato Cultural. Substituem o conceito anterior de "pilares".
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
