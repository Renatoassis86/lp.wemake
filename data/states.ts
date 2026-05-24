import type { StatePresence } from "@/types";

/**
 * Estados brasileiros — presença atual da We Make.
 *
 * Apenas 5 estados têm presença ativa hoje (PR, SC, MG, PB, RN) com 11 escolas
 * parceiras no total. Os demais aparecem no mapa como nós apagados,
 * sinalizando a expansão da campanha 2026.
 *
 * Coordenadas em canvas SVG 1000×1100 estilizado do Brasil (não cartograficamente fiel).
 */
export const statePresence: StatePresence[] = [
  { uf: "AC", name: "Acre",                x: 130, y: 460, partners: 0 },
  { uf: "AM", name: "Amazonas",            x: 260, y: 360, partners: 0 },
  { uf: "RR", name: "Roraima",             x: 310, y: 200, partners: 0 },
  { uf: "RO", name: "Rondônia",            x: 280, y: 510, partners: 0 },
  { uf: "PA", name: "Pará",                x: 460, y: 350, partners: 0 },
  { uf: "AP", name: "Amapá",               x: 510, y: 230, partners: 0 },
  { uf: "TO", name: "Tocantins",           x: 560, y: 510, partners: 0 },
  { uf: "MA", name: "Maranhão",            x: 620, y: 380, partners: 0 },
  { uf: "PI", name: "Piauí",               x: 680, y: 460, partners: 0 },
  { uf: "CE", name: "Ceará",               x: 760, y: 380, partners: 0 },
  { uf: "RN", name: "Rio Grande do Norte", x: 820, y: 400, partners: 2, highlight: true },
  { uf: "PB", name: "Paraíba",             x: 830, y: 440, partners: 2, highlight: true },
  { uf: "PE", name: "Pernambuco",          x: 800, y: 480, partners: 0 },
  { uf: "AL", name: "Alagoas",             x: 800, y: 520, partners: 0 },
  { uf: "SE", name: "Sergipe",             x: 780, y: 550, partners: 0 },
  { uf: "BA", name: "Bahia",               x: 700, y: 580, partners: 0 },
  { uf: "MT", name: "Mato Grosso",         x: 410, y: 600, partners: 0 },
  { uf: "DF", name: "Distrito Federal",    x: 580, y: 660, partners: 0 },
  { uf: "GO", name: "Goiás",               x: 540, y: 690, partners: 0 },
  { uf: "MS", name: "Mato Grosso do Sul",  x: 460, y: 760, partners: 0 },
  { uf: "MG", name: "Minas Gerais",        x: 620, y: 740, partners: 2, highlight: true },
  { uf: "ES", name: "Espírito Santo",      x: 720, y: 760, partners: 0 },
  { uf: "RJ", name: "Rio de Janeiro",      x: 680, y: 810, partners: 0 },
  { uf: "SP", name: "São Paulo",           x: 580, y: 820, partners: 0 },
  { uf: "PR", name: "Paraná",              x: 510, y: 880, partners: 3, highlight: true },
  { uf: "SC", name: "Santa Catarina",      x: 520, y: 940, partners: 2, highlight: true },
  { uf: "RS", name: "Rio Grande do Sul",   x: 480, y: 1010, partners: 0 },
];

export const presenceTotals = {
  partners: statePresence.reduce((sum, s) => sum + s.partners, 0),
  statesActive: statePresence.filter((s) => s.partners > 0).length,
  totalStates: statePresence.length,
};
