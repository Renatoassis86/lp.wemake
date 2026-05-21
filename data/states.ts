import type { StatePresence } from "@/types";

/**
 * Estados brasileiros com presença We Make.
 * Coordenadas aproximadas posicionadas em um canvas SVG 1000×1100
 * que representa o Brasil de forma estilizada (não cartograficamente fiel).
 * Substitua `partners` pelos números reais quando disponíveis.
 */
export const statePresence: StatePresence[] = [
  { uf: "AC", name: "Acre",                x: 130, y: 460, partners: 0 },
  { uf: "AM", name: "Amazonas",            x: 260, y: 360, partners: 2 },
  { uf: "RR", name: "Roraima",             x: 310, y: 200, partners: 0 },
  { uf: "RO", name: "Rondônia",            x: 280, y: 510, partners: 1 },
  { uf: "PA", name: "Pará",                x: 460, y: 350, partners: 3 },
  { uf: "AP", name: "Amapá",               x: 510, y: 230, partners: 0 },
  { uf: "TO", name: "Tocantins",           x: 560, y: 510, partners: 2 },
  { uf: "MA", name: "Maranhão",            x: 620, y: 380, partners: 3, highlight: true },
  { uf: "PI", name: "Piauí",               x: 680, y: 460, partners: 2 },
  { uf: "CE", name: "Ceará",               x: 760, y: 380, partners: 6, highlight: true },
  { uf: "RN", name: "Rio Grande do Norte", x: 820, y: 400, partners: 3 },
  { uf: "PB", name: "Paraíba",             x: 830, y: 440, partners: 2 },
  { uf: "PE", name: "Pernambuco",          x: 800, y: 480, partners: 5, highlight: true },
  { uf: "AL", name: "Alagoas",             x: 800, y: 520, partners: 1 },
  { uf: "SE", name: "Sergipe",             x: 780, y: 550, partners: 1 },
  { uf: "BA", name: "Bahia",               x: 700, y: 580, partners: 8, highlight: true },
  { uf: "MT", name: "Mato Grosso",         x: 410, y: 600, partners: 4 },
  { uf: "DF", name: "Distrito Federal",    x: 580, y: 660, partners: 5, highlight: true },
  { uf: "GO", name: "Goiás",               x: 540, y: 690, partners: 6 },
  { uf: "MS", name: "Mato Grosso do Sul",  x: 460, y: 760, partners: 4 },
  { uf: "MG", name: "Minas Gerais",        x: 620, y: 740, partners: 14, highlight: true },
  { uf: "ES", name: "Espírito Santo",      x: 720, y: 760, partners: 4 },
  { uf: "RJ", name: "Rio de Janeiro",      x: 680, y: 810, partners: 12, highlight: true },
  { uf: "SP", name: "São Paulo",           x: 580, y: 820, partners: 32, highlight: true },
  { uf: "PR", name: "Paraná",              x: 510, y: 880, partners: 11, highlight: true },
  { uf: "SC", name: "Santa Catarina",      x: 520, y: 940, partners: 8 },
  { uf: "RS", name: "Rio Grande do Sul",   x: 480, y: 1010, partners: 9, highlight: true },
];

export const presenceTotals = {
  partners: statePresence.reduce((sum, s) => sum + s.partners, 0),
  statesActive: statePresence.filter((s) => s.partners > 0).length,
  totalStates: statePresence.length,
};
