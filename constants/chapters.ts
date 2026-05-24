/**
 * Os 14 atos do arco narrativo da landing.
 *
 * Cada capítulo é amarrado a um anchor real no DOM. O <ChapterRail />
 * usa esta lista como fonte da verdade para o indicador lateral e
 * para detectar o capítulo ativo via IntersectionObserver.
 *
 * Mantenha em ordem narrativa - a ordem é o storytelling.
 */

export type Chapter = {
  id: string;
  number: string;
  title: string;
  /** Anchor ID rendered no DOM. */
  anchor: string;
};

export const chapters: Chapter[] = [
  { id: "hero",        number: "I",    title: "Manifesto cinematográfico", anchor: "topo" },
  { id: "world",       number: "II",   title: "O mundo mudou",             anchor: "mundo" },
  { id: "problem",     number: "III",  title: "O problema das escolas",    anchor: "problema" },
  { id: "vision",      number: "IV",   title: "A visão da We Make",        anchor: "visao" },
  { id: "ceo",         number: "V",    title: "Mensagem do CEO",           anchor: "ceo" },
  { id: "services",    number: "VI",   title: "Soluções institucionais",   anchor: "solucoes" },
  { id: "presence",    number: "VII",  title: "Presença nacional",         anchor: "presenca" },
  { id: "humans",      number: "VIII", title: "Humanizar a tecnologia",    anchor: "galeria" },
  { id: "material",    number: "IX",   title: "Material gratuito",         anchor: "material" },
  { id: "vip",         number: "X",    title: "Grupo VIP",                 anchor: "vip" },
  { id: "consultor",   number: "XI",   title: "Consultor comercial",       anchor: "consultor" },
  { id: "faq",         number: "XII",  title: "Perguntas estratégicas",    anchor: "faq" },
  { id: "cta",         number: "XIII", title: "Próximo passo",             anchor: "reuniao" },
  { id: "contact",     number: "XIV",  title: "Reunião estratégica",       anchor: "reuniao" },
];
