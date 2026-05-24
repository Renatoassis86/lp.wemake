"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as d3geo from "d3-geo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

/* ── Tipos GeoJSON mínimos ─────────────────────────────────── */
interface GeoFeature {
  type: "Feature";
  properties: { codarea?: string; [key: string]: unknown };
  geometry: { type: string; coordinates: unknown[] };
}
interface GeoCollection {
  type: "FeatureCollection";
  features: GeoFeature[];
}

/* ── Estados onde a We Make atua ──────────────────────────── */
const WE_MAKE_STATES = new Set([
  "RN", "PE", "CE", "PB", "SP", "MG", "PR", "SC", "RS", "GO", "DF",
]);

const STATE_CODE_TO_UF: Record<string, string> = {
  "11": "RO", "12": "AC", "13": "AM", "14": "RR", "15": "PA",
  "16": "AP", "17": "TO", "21": "MA", "22": "PI", "23": "CE",
  "24": "RN", "25": "PB", "26": "PE", "27": "AL", "28": "SE",
  "29": "BA", "31": "MG", "32": "ES", "33": "RJ", "35": "SP",
  "41": "PR", "42": "SC", "43": "RS", "50": "MS", "51": "MT",
  "52": "GO", "53": "DF",
};

const UF_LABEL: Record<string, string> = {
  RN: "Rio Grande do Norte", PE: "Pernambuco", CE: "Ceará",
  PB: "Paraíba", SP: "São Paulo", MG: "Minas Gerais",
  PR: "Paraná", SC: "Santa Catarina", RS: "Rio Grande do Sul",
  GO: "Goiás", DF: "Distrito Federal",
};

const W = 720;
const H = 820;

/* ── Mapa real via API de malhas do IBGE ──────────────────── */
function BrazilMap() {
  const [paths, setPaths] = useState<{ d: string; uf: string; active: boolean }[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=estado"
    )
      .then((r) => r.json())
      .then((geo: GeoCollection) => {
        const projection = d3geo
          .geoMercator()
          .fitSize([W, H], geo as Parameters<ReturnType<typeof d3geo.geoMercator>["fitSize"]>[1]);

        const pathGen = d3geo.geoPath().projection(projection);

        setPaths(
          geo.features.map((feat) => {
            const code = String(feat.properties?.codarea ?? "").slice(0, 2);
            const uf = STATE_CODE_TO_UF[code] ?? "";
            return {
              d: pathGen(feat as Parameters<typeof pathGen>[0]) ?? "",
              uf,
              active: WE_MAKE_STATES.has(uf),
            };
          })
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full aspect-[720/820] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-[rgb(var(--color-brand-mint))] border-t-transparent"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      aria-label="Mapa do Brasil destacando estados onde a We Make atua"
    >
      <defs>
        <filter id="active-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g style={{ filter: "drop-shadow(0 12px 32px rgba(0,30,60,0.15))" }}>
        {paths.map(({ d, uf, active }, i) => {
          const isHovered = hovered === uf && active;
          return (
            <motion.path
              key={uf || i}
              d={d}
              fill={
                active
                  ? isHovered
                    ? "rgb(var(--color-brand-royal))"
                    : "rgb(var(--color-brand-sky))"
                  : "#d4e4ef"
              }
              stroke="#ffffff"
              strokeWidth={1.5}
              style={{
                filter: active ? "url(#active-glow)" : undefined,
                cursor: active ? "pointer" : "default",
                transition: "fill 0.2s ease",
              }}
              onMouseEnter={() => active && setHovered(uf)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: (i % 10) * 0.03 }}
            />
          );
        })}
      </g>

      {/* Tooltip ao passar o mouse */}
      {hovered && UF_LABEL[hovered] && (
        <foreignObject x={W / 2 - 120} y={H - 56} width={240} height={44}>
          <div
            style={{
              background: "rgb(var(--color-brand-navy))",
              color: "#fff",
              fontSize: "0.8125rem",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            📍 {UF_LABEL[hovered]}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}

/* ── Componente principal ─────────────────────────────────── */
export function PresenceMap() {
  return (
    <Section id="presenca" bleed className="relative py-20 overflow-hidden bg-white">
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[rgb(var(--color-brand-mint))]/8 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col items-center gap-3 mb-10 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--color-brand-royal))]/10 text-[rgb(var(--color-brand-royal))] font-bold text-sm">
              🇧🇷 PRESENÇA NACIONAL
            </span>
            <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[clamp(2rem,3.5vw,3rem)] leading-tight">
              Um movimento que{" "}
              <span className="text-[rgb(var(--color-brand-royal))]">atravessa o Brasil.</span>
            </h2>
            {/* Legenda */}
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[rgb(var(--color-brand-sky))] inline-block" />
                <span className="text-sm text-[rgb(var(--color-brand-navy))]/60">We Make presente</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#d4e4ef] inline-block" />
                <span className="text-sm text-[rgb(var(--color-brand-navy))]/60">Em expansão</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto max-w-[520px]">
            <BrazilMap />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
