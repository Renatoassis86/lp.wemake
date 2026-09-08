"use client";

import { useRef } from "react";
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

/* ================= Organograma ================= */

interface NoOrganograma {
  nome: string;
  cargo: string;
  cor: string;
}

export function Organograma({ topo, filhos }: { topo: NoOrganograma; filhos: NoOrganograma[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const width = 760;
  const rowTopoY = 34;
  const rowFilhosY = 150;
  const n = filhos.length;
  const stepX = width / n;

  return (
    <div className="relative">
      <svg ref={ref} viewBox={`0 0 ${width} 190`} className="w-full h-auto overflow-visible">
        {filhos.map((_, i) => {
          const x = stepX * i + stepX / 2;
          const midY = (rowTopoY + rowFilhosY) / 2;
          const d = `M ${width / 2} ${rowTopoY + 14} L ${width / 2} ${midY} L ${x} ${midY} L ${x} ${rowFilhosY - 14}`;
          return (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={emVista ? { pathLength: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0">
        <motion.div
          className="absolute -translate-x-1/2 flex flex-col items-center text-center"
          style={{ left: "50%", top: 0 }}
          initial={{ opacity: 0, y: -10 }}
          animate={emVista ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div
            className="rounded-xl px-4 py-2 border"
            style={{ background: `${topo.cor}1a`, borderColor: `${topo.cor}66` }}
          >
            <p className="text-white text-[0.8125rem] font-medium whitespace-nowrap">{topo.nome}</p>
            <p className="font-mono text-[0.625rem] uppercase tracking-wider mt-0.5" style={{ color: topo.cor }}>{topo.cargo}</p>
          </div>
        </motion.div>

        {filhos.map((f, i) => {
          const leftPct = ((stepX * i + stepX / 2) / width) * 100;
          return (
            <motion.div
              key={f.nome}
              className="absolute -translate-x-1/2 flex flex-col items-center text-center w-[6.4rem]"
              style={{ left: `${leftPct}%`, top: 116 }}
              initial={{ opacity: 0, y: 10 }}
              animate={emVista ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
            >
              <div className="rounded-lg px-2 py-1.5 border w-full" style={{ background: `${f.cor}14`, borderColor: `${f.cor}55` }}>
                <p className="text-white/85 text-[0.6875rem] font-medium leading-snug">{f.nome}</p>
                <p className="font-mono text-[0.5625rem] uppercase tracking-wider mt-0.5 leading-snug" style={{ color: f.cor }}>{f.cargo}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Fluxo do Kit We Make (hub e satélites) ================= */

interface NoFluxo {
  titulo: string;
  cor: string;
}

export function FluxoCurriculo({ centro, satelites }: { centro: string; satelites: NoFluxo[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10%" });
  const size = 460;
  const cx = size / 2;
  const cy = size / 2;
  const rOrbita = 172;
  const n = satelites.length;

  return (
    <div className="relative mx-auto" style={{ maxWidth: size }}>
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
        {satelites.map((_, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(ang) * rOrbita;
          const y = cy + Math.sin(ang) * rOrbita;
          return (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgb(var(--color-brand-mint))"
              strokeWidth={1.5}
              strokeDasharray="3 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={emVista ? { pathLength: 1, opacity: 0.55 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
            />
          );
        })}
        <motion.circle
          cx={cx}
          cy={cy}
          r={58}
          fill="rgb(var(--color-brand-mint))"
          initial={{ scale: 0 }}
          animate={emVista ? { scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "backOut" }}
        />
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center"
          style={{ left: "50%", top: "50%", width: 108 }}
        >
          <p className="font-display text-[rgb(var(--color-brand-navy))] text-[0.9375rem] leading-tight font-semibold">{centro}</p>
        </div>
        {satelites.map((s, i) => {
          const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
          const leftPct = ((cx + Math.cos(ang) * rOrbita) / size) * 100;
          const topPct = ((cy + Math.sin(ang) * rOrbita) / size) * 100;
          return (
            <motion.div
              key={s.titulo}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-center pointer-events-auto"
              style={{ left: `${leftPct}%`, top: `${topPct}%`, background: `${s.cor}1f`, borderColor: `${s.cor}66`, width: 118 }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={emVista ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: "backOut" }}
            >
              <p className="text-white text-[0.75rem] font-medium leading-snug">{s.titulo}</p>
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
  const size = 420;
  const pad = 46;

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-md overflow-visible">
      <line x1={pad} y1={pad} x2={pad} y2={size - pad} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <line x1={pad} y1={size - pad} x2={size - pad} y2={size - pad} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      <line x1={(size) / 2} y1={pad} x2={size / 2} y2={size - pad} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={pad} y1={size / 2} x2={size - pad} y2={size / 2} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="3 4" />

      <text x={pad - 10} y={size / 2} textAnchor="end" fontFamily="var(--font-mono)" fontSize={9} fill="rgba(255,255,255,0.4)" transform={`rotate(-90 ${pad - 10} ${size / 2})`}>
        IMPACTO
      </text>
      <text x={size / 2} y={size - pad + 20} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="rgba(255,255,255,0.4)">
        PROBABILIDADE
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
            <circle cx={x} cy={y} r={7} fill={p.cor} />
            <text x={x} y={y - 13} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={9.5} fill="rgba(255,255,255,0.8)">
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
  const size = 220;
  const r = 78;
  const stroke = 30;
  const c = 2 * Math.PI * r;
  let acumulado = 0;

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <svg ref={ref} viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="shrink-0">
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
                strokeDasharray={`${len} ${c - len}`}
                initial={{ strokeDashoffset: c, opacity: 0 }}
                animate={emVista ? { strokeDashoffset: offset, opacity: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </g>
      </svg>
      <div className="flex flex-col gap-1.5">
        {fatias.map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: f.cor }} />
            <span className="text-white/70 text-[0.75rem]">{f.label}</span>
            <span className="font-mono text-white/40 text-[0.6875rem]">{f.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
