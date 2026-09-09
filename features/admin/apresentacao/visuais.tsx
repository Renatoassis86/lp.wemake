"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ================= Mapa do Brasil (coroplético, sem lib externa) ================= */

type Geometry =
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

interface GeoFeature {
  type: "Feature";
  properties: { codarea: string };
  geometry: Geometry;
}
export interface GeoBrasil {
  type: "FeatureCollection";
  features: GeoFeature[];
}

const CODAREA_UF: Record<string, string> = {
  "11": "RO", "12": "AC", "13": "AM", "14": "RR", "15": "PA", "16": "AP", "17": "TO",
  "21": "MA", "22": "PI", "23": "CE", "24": "RN", "25": "PB", "26": "PE", "27": "AL", "28": "SE", "29": "BA",
  "31": "MG", "32": "ES", "33": "RJ", "35": "SP",
  "41": "PR", "42": "SC", "43": "RS",
  "50": "MS", "51": "MT", "52": "GO", "53": "DF",
};

function walkCoords(geometry: Geometry, fn: (pt: number[]) => void) {
  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) for (const pt of ring) fn(pt);
  } else {
    for (const poly of geometry.coordinates) for (const ring of poly) for (const pt of ring) fn(pt);
  }
}
function ringToPath(ring: number[][], project: (pt: number[]) => [number, number]) {
  return ring.map((pt, i) => {
    const [x, y] = project(pt);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + "Z";
}
function geometryToPath(geometry: Geometry, project: (pt: number[]) => [number, number]) {
  if (geometry.type === "Polygon") return geometry.coordinates.map((r) => ringToPath(r, project)).join(" ");
  return geometry.coordinates.map((poly) => poly.map((r) => ringToPath(r, project)).join(" ")).join(" ");
}
function centroid(geometry: Geometry, project: (pt: number[]) => [number, number]): [number, number] | null {
  let maiorAnel: [number, number][] | null = null;
  let maiorArea = -1;
  const rings = geometry.type === "Polygon" ? [geometry.coordinates[0]] : geometry.coordinates.map((p) => p[0]);
  for (const ring of rings) {
    if (!ring) continue;
    const pts = ring.map(project);
    let area = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (!a || !b) continue;
      area += a[0] * b[1] - b[0] * a[1];
    }
    area = Math.abs(area / 2);
    if (area > maiorArea) { maiorArea = area; maiorAnel = pts; }
  }
  if (!maiorAnel || maiorAnel.length === 0) return null;
  let cx = 0, cy = 0;
  for (const [x, y] of maiorAnel) { cx += x; cy += y; }
  return [cx / maiorAnel.length, cy / maiorAnel.length];
}

export function MapaBrasil({
  geo, porEstado, width = 380, height = 380, corAtiva = "rgb(var(--color-brand-mint))",
}: {
  geo: GeoBrasil;
  porEstado: Record<string, number>;
  width?: number;
  height?: number;
  corAtiva?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });

  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const f of geo.features) {
    walkCoords(f.geometry, ([lon, lat]) => {
      if (lon !== undefined && lon < minLon) minLon = lon;
      if (lon !== undefined && lon > maxLon) maxLon = lon;
      if (lat !== undefined && lat < minLat) minLat = lat;
      if (lat !== undefined && lat > maxLat) maxLat = lat;
    });
  }
  const latRef = (minLat + maxLat) / 2;
  const cosRef = Math.cos((latRef * Math.PI) / 180);
  const lonSpan = (maxLon - minLon) * cosRef;
  const latSpan = maxLat - minLat;
  const pad = 14;
  const scale = Math.min((width - pad * 2) / lonSpan, (height - pad * 2) / latSpan);
  const offX = pad + (width - pad * 2 - lonSpan * scale) / 2;
  const offY = pad + (height - pad * 2 - latSpan * scale) / 2;
  const project = ([lon, lat]: number[]): [number, number] => [
    ((lon ?? 0) - minLon) * cosRef * scale + offX,
    (maxLat - (lat ?? 0)) * scale + offY,
  ];

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", maxWidth: width, display: "block" }}>
      {geo.features.map((f, i) => {
        const uf = CODAREA_UF[f.properties.codarea];
        const qtd = (uf && porEstado[uf]) || 0;
        const d = geometryToPath(f.geometry, project);
        return (
          <motion.path
            key={f.properties.codarea}
            d={d}
            fill={qtd > 0 ? corAtiva : "rgba(255,255,255,0.06)"}
            fillOpacity={qtd > 0 ? 0.15 + 0.5 * Math.min(1, qtd / 3) : 1}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={0.6}
            fillRule="evenodd"
            initial={{ opacity: 0 }}
            animate={emVista ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.006, duration: 0.4 }}
          />
        );
      })}
      {geo.features.map((f) => {
        const uf = CODAREA_UF[f.properties.codarea];
        const qtd = (uf && porEstado[uf]) || 0;
        if (qtd === 0) return null;
        const c = centroid(f.geometry, project);
        if (!c) return null;
        return (
          <motion.g
            key={`label-${f.properties.codarea}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={emVista ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4, ease: "backOut" }}
          >
            <circle cx={c[0]} cy={c[1]} r={9} fill={corAtiva} />
            <text x={c[0]} y={c[1] + 3.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fontWeight={700} fill="rgb(var(--color-brand-navy))">
              {qtd}
            </text>
            <text x={c[0]} y={c[1] - 13} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={7} fontWeight={700} fill="rgba(255,255,255,0.55)">
              {uf}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ================= Organograma (flexbox puro, sem matemática de viewBox) ================= */

interface NoOrganograma {
  nome: string;
  cargo: string;
  cor: string;
  iniciais: string;
  foto?: string;
  miniBio?: string;
}

export function Organograma({ topo, filhos }: { topo: NoOrganograma; filhos: NoOrganograma[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Nó do topo — visualmente maior, para marcar hierarquia real */}
      <motion.div
        className="flex items-center gap-3 rounded-2xl border-2 px-5 py-3.5"
        style={{ background: `${topo.cor}1f`, borderColor: topo.cor }}
        initial={{ opacity: 0, y: -14 }}
        animate={emVista ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {topo.foto ? (
          <div className="size-12 rounded-full overflow-hidden shrink-0 ring-2" style={{ boxShadow: `0 0 0 2px ${topo.cor}` }}>
            <Image src={topo.foto} alt={topo.nome} width={48} height={48} className="size-full object-cover" />
          </div>
        ) : (
          <div
            className="size-11 rounded-full flex items-center justify-center font-display text-lg font-bold shrink-0"
            style={{ background: topo.cor, color: "rgb(var(--color-brand-navy))" }}
          >
            {topo.iniciais}
          </div>
        )}
        <div className="text-left">
          <p className="text-white text-lg font-semibold leading-snug break-words">{topo.nome}</p>
          <p className="font-mono text-lg uppercase tracking-wider break-words" style={{ color: topo.cor }}>{topo.cargo}</p>
        </div>
      </motion.div>

      {/* Tronco vertical até a linha de distribuição */}
      <motion.div
        className="w-px bg-white/25"
        initial={{ height: 0 }}
        animate={emVista ? { height: 40 } : {}}
        transition={{ delay: 0.35, duration: 0.35 }}
      />
      <motion.div
        className="h-px bg-white/25"
        style={{ maxWidth: 720 }}
        initial={{ width: 0 }}
        animate={emVista ? { width: "100%" } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Filhos, cada um com seu próprio galho vertical */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-8 mt-0 max-w-6xl pt-2">
        {filhos.map((f, i) => (
          <div key={f.nome} className="flex flex-col items-center w-[13rem]">
            <motion.div
              className="w-px bg-white/25"
              initial={{ height: 0 }}
              animate={emVista ? { height: 20 } : {}}
              transition={{ delay: 0.55 + i * 0.06, duration: 0.3 }}
            />
            <motion.div
              className="rounded-xl border px-3 py-3 text-center w-full"
              style={{ background: `${f.cor}14`, borderColor: `${f.cor}55` }}
              initial={{ opacity: 0, y: 10 }}
              animate={emVista ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
            >
              {f.foto ? (
                <div className="size-11 rounded-full overflow-hidden mx-auto mb-1.5" style={{ boxShadow: `0 0 0 2px ${f.cor}` }}>
                  <Image src={f.foto} alt={f.nome} width={44} height={44} className="size-full object-cover" />
                </div>
              ) : (
                <div
                  className="size-8 rounded-full flex items-center justify-center font-display text-lg font-bold mx-auto mb-1.5"
                  style={{ background: `${f.cor}33`, color: f.cor }}
                >
                  {f.iniciais}
                </div>
              )}
              <p className="text-white/85 text-lg font-medium leading-snug break-words">{f.nome}</p>
              <p className="font-mono text-lg uppercase tracking-wider mt-0.5 leading-snug break-words" style={{ color: f.cor }}>{f.cargo}</p>
              {f.miniBio && (
                <p className="text-white/45 text-lg leading-snug mt-1.5 pt-1.5 border-t" style={{ borderColor: `${f.cor}30` }}>
                  {f.miniBio}
                </p>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Fluxo do Kit We Make (hub e satélites) ================= */

interface NoFluxo {
  titulo: string;
  texto: string;
  icone: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export function FluxoCurriculo({ centro, satelites }: { centro: string; satelites: NoFluxo[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const size = 760;
  const cx = size / 2;
  const cy = size / 2;
  const rOrbita = 255;
  const n = satelites.length;

  return (
    <div className="relative mx-auto" style={{ maxWidth: size }}>
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
        <defs>
          <marker id="seta-fluxo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(var(--color-brand-mint))" />
          </marker>
        </defs>
        {satelites.map((_, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(ang) * 76;
          const y1 = cy + Math.sin(ang) * 76;
          const x2 = cx + Math.cos(ang) * (rOrbita - 66);
          const y2 = cy + Math.sin(ang) * (rOrbita - 66);
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgb(var(--color-brand-mint))"
              strokeWidth={2}
              markerEnd="url(#seta-fluxo)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={emVista ? { pathLength: 1, opacity: 0.8 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            />
          );
        })}
        <motion.circle
          cx={cx}
          cy={cy}
          r={70}
          fill="rgb(var(--color-brand-mint))"
          initial={{ scale: 0 }}
          animate={emVista ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "backOut" }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={70}
          fill="none"
          stroke="rgb(var(--color-brand-mint))"
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={emVista ? { scale: [1, 1.35], opacity: [0.6, 0] } : {}}
          transition={{ delay: 1.2, duration: 1.8, repeat: Infinity, repeatDelay: 0.8 }}
        />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center"
          style={{ left: "50%", top: "50%", width: 130 }}
        >
          <p className="font-display text-[rgb(var(--color-brand-navy))] text-[1.0625rem] leading-tight font-semibold">{centro}</p>
        </div>
        {satelites.map((s, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          const leftPct = ((cx + Math.cos(ang) * rOrbita) / size) * 100;
          const topPct = ((cy + Math.sin(ang) * rOrbita) / size) * 100;
          const Icone = s.icone;
          return (
            <motion.div
              key={s.titulo}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-[rgb(var(--color-brand-navy))]/70 backdrop-blur-sm px-4 py-3 text-center pointer-events-auto"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, borderColor: "rgba(255,255,255,0.25)", width: 172 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={emVista ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.65 + i * 0.1, duration: 0.4, ease: "backOut" }}
            >
              <Icone className="size-5 text-[rgb(var(--color-brand-mint))] mx-auto mb-1.5" strokeWidth={1.75} />
              <p className="text-white text-lg font-semibold leading-snug break-words">{s.titulo}</p>
              <p className="text-white/50 text-lg leading-snug mt-0.5">{s.texto}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Ciclo circular de etapas ================= */

interface EtapaCiclo {
  titulo: string;
  icone: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

export function CicloEtapas({ centro, etapas }: { centro: string; etapas: EtapaCiclo[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const size = 760;
  const cx = size / 2;
  const cy = size / 2;
  const r = 270;
  const n = etapas.length;

  const pontos = etapas.map((_, i) => {
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { ang, x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r };
  });

  return (
    <div className="relative mx-auto" style={{ maxWidth: size }}>
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={emVista ? { pathLength: 1 } : {}}
          transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
        />
        {pontos.map((p, i) => {
          const prox = pontos[(i + 1) % n]!;
          const varredura = ((prox.ang - p.ang + Math.PI * 2) % (Math.PI * 2)) || Math.PI * 2;
          const midAng = p.ang + varredura / 2;
          const mx = cx + Math.cos(midAng) * r;
          const my = cy + Math.sin(midAng) * r;
          const tangDeg = (Math.atan2(Math.cos(midAng), -Math.sin(midAng)) * 180) / Math.PI;
          return (
            <motion.path
              key={`seta-${i}`}
              d="M -6 -6 L 6 0 L -6 6"
              stroke="rgb(var(--color-brand-mint))"
              strokeWidth={2.25}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${mx} ${my}) rotate(${tangDeg})`}
              initial={{ opacity: 0 }}
              animate={emVista ? { opacity: 0.9 } : {}}
              transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <span className="font-mono text-lg uppercase tracking-[0.25em] text-white/25 text-center max-w-[8.5rem] leading-relaxed">
          {centro}
        </span>
      </div>

      <div className="absolute inset-0">
        {pontos.map((p, i) => {
          const etapa = etapas[i]!;
          const Icone = etapa.icone;
          const leftPct = (p.x / size) * 100;
          const topPct = (p.y / size) * 100;
          return (
            <motion.div
              key={etapa.titulo}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, width: 136 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={emVista ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.45, ease: "backOut" }}
            >
              <div className="size-14 rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm flex items-center justify-center shrink-0">
                <Icone className="size-6 text-[rgb(var(--color-brand-mint))]" strokeWidth={1.75} />
              </div>
              <p className="text-white text-lg font-semibold text-center leading-snug">{etapa.titulo}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Matriz 2x2 (probabilidade × impacto) ================= */

interface PontoMatriz {
  label: string;
  x: number; // 0 a 1
  y: number; // 0 a 1
  cor: string;
}

export function MatrizRisco({ pontos }: { pontos: PontoMatriz[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const size = 620;
  const pad = 64;
  const meio = (size + pad) / 2;

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
      {/* Quadrantes sombreados: mais forte no canto de alta prob. x alto impacto */}
      <rect x={pad} y={pad} width={(size - pad * 2) / 2} height={(size - pad * 2) / 2} fill="rgba(232,96,122,0.10)" />
      <rect x={meio - pad / 2} y={pad} width={(size - pad * 2) / 2} height={(size - pad * 2) / 2} fill="rgba(255,204,0,0.09)" />
      <rect x={pad} y={meio - pad / 2} width={(size - pad * 2) / 2} height={(size - pad * 2) / 2} fill="rgba(255,255,255,0.03)" />
      <rect x={meio - pad / 2} y={meio - pad / 2} width={(size - pad * 2) / 2} height={(size - pad * 2) / 2} fill="rgba(118,243,205,0.06)" />

      <line x1={pad} y1={pad} x2={pad} y2={size - pad} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />
      <line x1={pad} y1={size - pad} x2={size - pad} y2={size - pad} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} />
      <line x1={size / 2} y1={pad} x2={size / 2} y2={size - pad} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={pad} y1={size / 2} x2={size - pad} y2={size / 2} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 4" />

      <text x={pad - 16} y={size / 2} textAnchor="end" fontFamily="var(--font-mono)" fontSize={13} fontWeight={700} letterSpacing="0.08em" fill="rgba(255,255,255,0.55)" transform={`rotate(-90 ${pad - 16} ${size / 2})`}>
        IMPACTO →
      </text>
      <text x={size / 2} y={size - pad + 28} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fontWeight={700} letterSpacing="0.08em" fill="rgba(255,255,255,0.55)">
        PROBABILIDADE →
      </text>

      {pontos.map((p, i) => {
        const x = pad + p.x * (size - pad * 2);
        const y = size - pad - p.y * (size - pad * 2);
        return (
          <motion.g
            key={p.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={emVista ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: "backOut" }}
          >
            <circle cx={x} cy={y} r={23} fill={p.cor} fillOpacity={0.18} />
            <circle cx={x} cy={y} r={10} fill={p.cor} />
            <text x={x} y={y - 30} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={14} fontWeight={600} fill="rgba(255,255,255,0.9)">
              {p.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ================= Donut ================= */

export function Donut({ fatias }: { fatias: { label: string; pct: number; cor: string }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const size = 440;
  const r = 165;
  const stroke = 48;
  const c = 2 * Math.PI * r;
  const maior = fatias.reduce((m, f) => (f.pct > m.pct ? f : m), fatias[0]!);
  let acumulado = 0;

  return (
    <div className="flex items-center gap-10 flex-wrap">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg ref={ref} viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
          <g transform={`translate(${size / 2},${size / 2}) rotate(-90)`}>
            {fatias.map((f, i) => {
              const len = (f.pct / 100) * c;
              const offset = c - (acumulado / 100) * c;
              acumulado += f.pct;
              return (
                <motion.circle
                  key={f.label}
                  r={r}
                  fill="none"
                  stroke={f.cor}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  strokeDasharray={`${len} ${c - len}`}
                  initial={{ strokeDashoffset: c, opacity: 0 }}
                  animate={emVista ? { strokeDashoffset: offset, opacity: 1 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </g>
        </svg>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={emVista ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="font-display text-white text-4xl font-semibold">{maior.pct}%</p>
          <p className="text-white/45 text-lg max-w-[8.5rem] text-center leading-snug mt-1">{maior.label}</p>
        </motion.div>
      </div>
      <div className="flex flex-col gap-2.5">
        {fatias.map((f, i) => (
          <motion.div
            key={f.label}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          >
            <span className="size-3 rounded-full shrink-0" style={{ background: f.cor }} />
            <span className="text-white/75 text-lg">{f.label}</span>
            <span className="font-mono text-white/45 text-lg tabular-nums">{f.pct}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
