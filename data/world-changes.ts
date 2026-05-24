import { Brain, MonitorSmartphone, Network, Sparkles } from "lucide-react";
import type { WorldShift } from "@/types";

/**
 * "O Mundo Mudou" — quatro forças que reconfiguram a educação contemporânea.
 * Apresentadas como diagnóstico cultural sóbrio, não como medo.
 */
export const worldChanges: WorldShift[] = [
  {
    id: "ia",
    number: "01",
    signal: "Inteligência Artificial",
    headline:
      "A IA passou a escrever, desenhar e calcular — em segundos, ao alcance de qualquer estudante.",
    body:
      "Não basta proibir nem encantar-se. É preciso formar discernimento: o que delegar à máquina, o que pertence ao humano e o que só o humano pode julgar.",
    icon: Brain,
  },
  {
    id: "telas",
    number: "02",
    signal: "Excesso de Telas",
    headline:
      "Crianças crescem em ambientes saturados de estímulos digitais e empobrecidos em silêncio.",
    body:
      "A escola precisa devolver tempo, atenção e silêncio diante da Palavra — não como nostalgia, mas como condição para qualquer aprendizado profundo.",
    icon: MonitorSmartphone,
  },
  {
    id: "crise",
    number: "03",
    signal: "Crise Educacional",
    headline:
      "Modelos pedagógicos do século XX não respondem mais às perguntas do século XXI.",
    body:
      "A geração atual exige escolas que pensem por princípios — não por modismos —, capazes de articular tradição e inovação sem perder identidade.",
    icon: Sparkles,
  },
  {
    id: "cultura",
    number: "04",
    signal: "Cultura Digital",
    headline:
      "A formação humana acontece, hoje, dentro de uma cultura mediada por algoritmos.",
    body:
      "Educar implica, agora, ler essa cultura criticamente — e formar pessoas capazes de criar dentro dela sem serem moldadas por ela.",
    icon: Network,
  },
];
