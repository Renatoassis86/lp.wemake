"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, animate } from "framer-motion";
import {
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Cpu,
  Wrench,
  Compass,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  Code2,
  CircuitBoard,
  Hammer,
  Compass as CompassIcon,
  Layers,
  Network,
  Trophy,
  Building2,
  School,
  Search,
  Lightbulb,
  ClipboardCheck,
  TestTube,
  Share2,
  Puzzle,
  LayoutGrid,
  Scale,
  Coins,
  Newspaper,
  Landmark,
  Box,
  Percent,
  Repeat,
  Clock,
  TrendingUp,
} from "lucide-react";
import { MapaBrasil, Organograma, FluxoCurriculo, CicloEtapas, MatrizRisco, Donut, type GeoBrasil } from "./visuais";

export interface AnoProjetado {
  ano: number;
  receita: number;
  resultado: number;
  margemPct: number;
}

interface Props {
  anos: AnoProjetado[];
  geoBrasil: GeoBrasil | null;
  escolasPorEstado: Record<string, number>;
  estadosComLeiPropria: Record<string, number>;
}

function formatBRL(v: number, casas = 0): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: casas });
}
function formatCompactoBRL(v: number): string {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")} mi`;
  if (v >= 1_000) return `R$ ${Math.round(v / 1000)} mil`;
  return formatBRL(v);
}

/* ---------- Blocos animados reutilizáveis ---------- */

function NumeroAnimado({ valor, prefixo = "", sufixo = "", casas = 0 }: { valor: number; prefixo?: string; sufixo?: string; casas?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-10% 0px" });
  const [exibido, setExibido] = useState(0);

  useEffect(() => {
    if (!emVista) return;
    const controls = animate(0, valor, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setExibido(v),
    });
    return () => controls.stop();
  }, [emVista, valor]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefixo}
      {exibido.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas })}
      {sufixo}
    </span>
  );
}

function GraficoTendencia({ anos }: { anos: AnoProjetado[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-15% 0px" });
  const width = 760;
  const height = 280;
  const padX = 36;
  const padY = 28;
  const max = Math.max(...anos.map((a) => a.receita)) * 1.08;
  const min = 0;

  const pontos = anos.map((a, i) => {
    const x = padX + (i / (anos.length - 1)) * (width - padX * 2);
    const y = height - padY - ((a.receita - min) / (max - min)) * (height - padY * 2);
    return { x, y, ano: a };
  });

  const linha = pontos.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const primeiroPonto = pontos[0];
  const ultimoPonto = pontos[pontos.length - 1];
  const area = primeiroPonto && ultimoPonto
    ? `${linha} L ${ultimoPonto.x} ${height - padY} L ${primeiroPonto.x} ${height - padY} Z`
    : "";

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
      <defs>
        <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--color-brand-mint))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(var(--color-brand-mint))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={padX}
          x2={width - padX}
          y1={height - padY - f * (height - padY * 2)}
          y2={height - padY - f * (height - padY * 2)}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}

      <motion.path
        d={area}
        fill="url(#gradArea)"
        initial={{ opacity: 0 }}
        animate={emVista ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
      />

      <motion.path
        d={linha}
        fill="none"
        stroke="rgb(var(--color-brand-mint))"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={emVista ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />

      {pontos.map((p, i) => (
        <g key={p.ano.ano}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={i === pontos.length - 1 ? 7 : 4.5}
            fill={i === pontos.length - 1 ? "rgb(var(--color-brand-mint))" : "rgb(var(--color-brand-navy))"}
            stroke="rgb(var(--color-brand-mint))"
            strokeWidth={i === pontos.length - 1 ? 0 : 2}
            initial={{ scale: 0, opacity: 0 }}
            animate={emVista ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.28, duration: 0.4, ease: "backOut" }}
          />
          {i === pontos.length - 1 && (
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={7}
              fill="none"
              stroke="rgb(var(--color-brand-mint))"
              strokeWidth={2}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={emVista ? { scale: [1, 2.4], opacity: [0.7, 0] } : {}}
              transition={{ delay: 1.9, duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
            />
          )}
          <motion.text
            x={p.x}
            y={p.y - 16}
            textAnchor="middle"
            fontSize="12"
            fontFamily="var(--font-mono)"
            fill="rgba(255,255,255,0.85)"
            initial={{ opacity: 0, y: p.y - 8 }}
            animate={emVista ? { opacity: 1, y: p.y - 16 } : {}}
            transition={{ delay: 0.45 + i * 0.28, duration: 0.4 }}
          >
            {formatCompactoBRL(p.ano.receita)}
          </motion.text>
          <text x={p.x} y={height - 6} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.45)">
            {p.ano.ano}
          </text>
        </g>
      ))}

      {ultimoPonto && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={emVista ? { opacity: 1 } : {}}
          transition={{ delay: 2.1, duration: 0.5 }}
        >
          <text
            x={ultimoPonto.x}
            y={ultimoPonto.y - 34}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="rgb(var(--color-brand-mint))"
            fontWeight={700}
            letterSpacing="0.08em"
          >
            ALVO 2031
          </text>
        </motion.g>
      )}
    </svg>
  );
}

function Cartao({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-sm p-5 sm:p-6 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Tons tom-sobre-tom por variante de fundo, para não repetir o mesmo cartão de vidro branco em toda a apresentação. */
const TONS_CARTAO_TOPICO = {
  dark: {
    bg: "rgba(255,255,255,0.05)",
    borda: "rgba(255,255,255,0.12)",
    iconeFundo: "rgba(118,243,205,0.14)",
    iconeCor: "rgb(var(--color-brand-mint))",
    titulo: "#ffffff",
    texto: "rgba(255,255,255,0.6)",
  },
  royal: {
    bg: "rgba(255,255,255,0.10)",
    borda: "rgba(255,255,255,0.24)",
    iconeFundo: "rgba(255,255,255,0.18)",
    iconeCor: "#ffffff",
    titulo: "#ffffff",
    texto: "rgba(255,255,255,0.8)",
  },
  sky: {
    bg: "rgba(11,31,68,0.12)",
    borda: "rgba(11,31,68,0.3)",
    iconeFundo: "rgba(11,31,68,0.2)",
    iconeCor: "rgb(var(--color-brand-navy))",
    titulo: "rgb(var(--color-brand-navy))",
    texto: "rgba(11,31,68,0.75)",
  },
} as const;

/** Cartão quadrado, com ícone em selo e tom derivado do próprio fundo do slide — para tópicos e partes de um todo. */
function CartaoTopico({
  icone: Icone,
  titulo,
  texto,
  delay = 0,
  variante = "dark",
}: {
  icone: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  titulo: string;
  texto?: string;
  delay?: number;
  variante?: keyof typeof TONS_CARTAO_TOPICO;
}) {
  const t = TONS_CARTAO_TOPICO[variante];
  return (
    <motion.div
      className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[11rem] sm:min-h-[12rem]"
      style={{ background: t.bg, border: `1px solid ${t.borda}` }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="size-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: t.iconeFundo }}>
        <Icone className="size-6" strokeWidth={1.75} style={{ color: t.iconeCor }} />
      </div>
      <div className="mt-4">
        <p className="font-display text-[1.0625rem] leading-snug" style={{ color: t.titulo }}>{titulo}</p>
        {texto && (
          <p className="text-base leading-relaxed mt-1.5" style={{ color: t.texto }}>{texto}</p>
        )}
      </div>
    </motion.div>
  );
}

function Eyebrow({ children, tom = "mint" }: { children: React.ReactNode; tom?: "mint" | "navy" }) {
  return (
    <motion.p
      className={`font-mono text-base uppercase tracking-[0.25em] font-bold mb-3 ${tom === "navy" ? "text-[rgb(var(--color-brand-navy))]" : "text-[rgb(var(--color-brand-mint))]"}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}

/** Título com construção cinética: cada palavra entra com seu próprio delay. */
function Titulo({ children, tom = "claro" }: { children: string; tom?: "claro" | "escuro" }) {
  const palavras = children.split(" ");
  return (
    <h2
      className={`text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.12] max-w-4xl text-balance font-bold ${tom === "escuro" ? "text-[rgb(var(--color-brand-navy))]" : "text-white"}`}
      style={{ fontFamily: "var(--font-wemake)" }}
    >
      {palavras.map((p, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
        >
          {p}
        </motion.span>
      ))}
    </h2>
  );
}

function Avatar({ iniciais, cor }: { iniciais: string; cor: string }) {
  return (
    <div
      className="size-11 rounded-full flex items-center justify-center font-display text-base font-semibold shrink-0"
      style={{ background: `${cor}22`, color: cor, border: `1px solid ${cor}55` }}
    >
      {iniciais}
    </div>
  );
}

/** Painel de foto real, em cartão próprio — mais confiável que blend em fundo de tela cheia. */
function FotoPainel({ src, className = "" }: { src: string; className?: string }) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden border border-white/15 ${className}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image src={src} alt="" width={520} height={640} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(11,31,68,0.85) 100%)" }} />
    </motion.div>
  );
}

/* ---------- Fundo por slide (fundo sobre fundo, tom sobre tom) ---------- */

type VarianteFundo = "navy" | "royal" | "sky" | "dark";

function Fundo({ variante }: { variante: VarianteFundo }) {
  const mapa: Record<VarianteFundo, string> = {
    navy: "radial-gradient(120% 100% at 100% 0%, rgba(76,138,222,0.16), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(118,243,205,0.10), transparent 55%), rgb(var(--color-brand-navy))",
    royal: "linear-gradient(155deg, rgb(var(--color-brand-royal)) 0%, rgb(var(--color-brand-royal-deep)) 55%, rgb(var(--color-brand-navy)) 100%)",
    sky: "linear-gradient(155deg, rgb(var(--color-brand-sky)) 0%, rgb(224, 172, 0) 62%, rgb(var(--color-brand-navy)) 100%)",
    dark: "linear-gradient(180deg, #060d1e 0%, rgb(var(--color-brand-navy)) 100%)",
  };
  return (
    <div aria-hidden className="absolute inset-0 -z-10" style={{ background: mapa[variante] }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
    </div>
  );
}

/* ---------- Slide wrapper ---------- */

function Slide({
  children, variante = "navy",
}: {
  children: React.ReactNode;
  variante?: VarianteFundo;
}) {
  const tomTexto = variante === "sky" ? "escuro" : "claro";
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-24 sm:pb-28 overflow-y-auto" data-tom={tomTexto}>
      <Fundo variante={variante} />
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </div>
  );
}

/* ================= Dados de apoio ================= */

const EQUIPE_FILHOS = [
  { nome: "Renato Silva de Assis", cargo: "Gerente Administrativo", cor: "rgb(var(--color-brand-royal))", iniciais: "RA", foto: "/renato.jpeg" },
  { nome: "Emanuel Peixoto", cargo: "Marketing", cor: "rgb(var(--color-brand-sky))", iniciais: "EP" },
  { nome: "Suzana Bonifazio", cargo: "Consultora Pedagógica", cor: "rgb(var(--color-brand-mint))", iniciais: "SB" },
  { nome: "Emanuela Monteiro", cargo: "Consultoria e Negócios", cor: "rgb(var(--color-brand-mint))", iniciais: "EM" },
  { nome: "Christiano Bonifazio", cargo: "Comercial, SP", cor: "rgb(var(--color-brand-sky))", iniciais: "CB" },
  { nome: "Equipe de tecnologia", cargo: "3 devs + 1 dados", cor: "rgb(var(--color-brand-royal))", iniciais: "TI" },
  { nome: "Iran Firmino", cargo: "Contador", cor: "rgb(var(--color-brand-mint))", iniciais: "IF" },
];

/* ================= Componente principal ================= */

export function ApresentacaoPlano({ anos, geoBrasil, escolasPorEstado, estadosComLeiPropria }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [telaCheia, setTelaCheia] = useState(false);

  const ultimoAno = anos[anos.length - 1];
  const primeiroAno = anos[0];
  const receitaTotal2027 = primeiroAno ? primeiroAno.receita : 0;

  const slides = [
    // 0 — capa
    <Slide key="capa" variante="dark">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-8">
            <Image src="/logo-wemake.png" alt="We Make" width={197} height={60} className="h-11 sm:h-12 w-auto object-contain" priority />
          </motion.div>
          <motion.p
            className="font-mono text-base uppercase tracking-[0.3em] text-[rgb(var(--color-brand-mint))] font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Plano de Negócio · 2027–2031
          </motion.p>
          <motion.h1
            className="font-bold text-white text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.1] text-balance"
            style={{ fontFamily: "var(--font-wemake)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            O primeiro sistema de educação tecnológica com cosmovisão cristã do Brasil
          </motion.h1>
          <motion.div
            className="flex flex-wrap gap-x-8 gap-y-2 mt-10 text-white/40 text-base font-mono uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span>We Make Educação Tecnológica LTDA</span>
            <span>CNPJ 48.760.895/0001-99</span>
            <span>Documento confidencial</span>
          </motion.div>
        </div>
        <FotoPainel src="/photos/maker_student.png" className="aspect-[4/5] hidden lg:block" />
      </div>
    </Slide>,

    // 1 — tração
    <Slide key="tracao" variante="navy">
      <Eyebrow>Quem somos hoje</Eyebrow>
      <Titulo>De duas escolas parceiras, em 2024, a um sistema em expansão nacional</Titulo>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl mt-5">
        A trajetória começou em 2023, quando a empresa foi formalizada e apresentada ao mercado. A operação
        comercial abriu no ano seguinte, com duas escolas parceiras dispostas a testar um currículo ainda em
        formação. Três anos depois, a carteira soma doze escolas e cerca de dois mil alunos atendidos, crescimento
        que a direção atribui à integração do sistema, não à expansão isolada de um único produto.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
        {[
          { label: "Escolas parceiras (2026)", valor: 12 },
          { label: "Alunos atendidos (2026)", valor: 2000, sufixo: "+" },
          { label: "Crescimento em escolas, 2024 a 2026", valor: 500, sufixo: "%" },
          { label: "Ano de fundação", valor: 2023, semAnimacao: true },
        ].map((s, i) => (
          <Cartao key={s.label} delay={i * 0.1}>
            <p className="font-display text-white text-[clamp(1.75rem,4vw,2.5rem)]">
              {s.semAnimacao ? s.valor : <NumeroAnimado valor={s.valor} sufixo={s.sufixo} />}
            </p>
            <p className="text-white/50 text-base mt-1.5 leading-snug">{s.label}</p>
          </Cartao>
        ))}
      </div>
      <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl mt-8">
        O sistema entrega currículo, plataforma digital, espaço maker, formação docente e assessoria institucional
        num único contrato, sem cobrança separada por serviço. É essa integração, não um componente isolado, que
        a empresa aponta como diferencial diante de fornecedores que vendem apenas um pedaço do problema: um kit
        de robótica aqui, uma plataforma de gestão ali, sem relação entre as partes.
      </p>
    </Slide>,

    // 1b — orçamento 2027
    <Slide key="orcamento-2027" variante="royal">
      <Eyebrow>Capítulo 1 · Sumário executivo</Eyebrow>
      <Titulo>O orçamento de 2027 já está em grande parte contratado, não projetado</Titulo>
      <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mt-5">
        Dos R$1.100.000,00 previstos em receita escolar, R$951.961,90 já estão assinados. Os R$148.038,10
        restantes dependem de escolas em fase final de negociação, não de prospecção ainda por começar. Somada à
        primeira venda da trilha de currículo para famílias educadoras, a receita total projetada chega a
        R$1.149.890,00. A despesa do exercício soma R$848.913,14, o que deixa um resultado operacional de
        R$300.976,86, margem de 26,2%, positivo mesmo no cenário mais conservador, em que nenhuma das escolas
        hoje em negociação venha a fechar contrato.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
        {[
          { label: "Já contratado para o ano", valor: 951962, prefixo: "R$ " },
          { label: "Em negociação avançada", valor: 148038, prefixo: "R$ " },
          { label: "Resultado operacional", valor: 300977, prefixo: "R$ " },
          { label: "Margem operacional", valor: 26.2, sufixo: "%", casas: 1 },
        ].map((s, i) => (
          <Cartao key={s.label} delay={i * 0.1} className="border-[rgb(var(--color-brand-mint))]/30">
            <p className="font-display text-[rgb(var(--color-brand-mint))] text-[clamp(1.5rem,3.5vw,2rem)]">
              <NumeroAnimado valor={s.valor} prefixo={s.prefixo} sufixo={s.sufixo} casas={s.casas} />
            </p>
            <p className="text-white/60 text-base mt-1.5 leading-snug">{s.label}</p>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 2 — visão, missão, valores
    <Slide key="visao-missao" variante="royal">
      <Eyebrow>Capítulo 2 · Identidade institucional</Eyebrow>
      <Titulo>Beleza, Verdade e Bondade orientam toda decisão de produto</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        <Cartao delay={0.1}>
          <p className="font-mono text-base uppercase tracking-wider text-white/50 font-bold mb-2">Visão</p>
          <p className="text-white/85 text-base leading-relaxed">
            Ser referência em educação tecnológica fundamentada na cosmovisão cristã, formando uma geração capaz
            de compreender, criar e utilizar tecnologia com sabedoria.
          </p>
        </Cartao>
        <Cartao delay={0.2}>
          <p className="font-mono text-base uppercase tracking-wider text-white/50 font-bold mb-2">Missão</p>
          <p className="text-white/85 text-base leading-relaxed">
            Conduzir pessoas ao deslumbramento a partir de uma educação cristã de excelência, educando mentes e corações
            para aprender a criar tecnologia em vez de apenas consumir.
          </p>
        </Cartao>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
        {["Fidelidade à Verdade", "Beleza e Bondade", "Excelência", "Liberdade com responsabilidade", "Serviço e mordomia", "Comunidade e parceria"].map((v, i) => (
          <motion.div
            key={v}
            className="rounded-lg border border-white/15 bg-black/10 px-3 py-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
          >
            <p className="text-white/80 text-base font-medium">{v}</p>
          </motion.div>
        ))}
      </div>
    </Slide>,

    // 3 — o sistema
    <Slide key="sistema" variante="dark">
      <Eyebrow>O Kit We Make</Eyebrow>
      <Titulo>Cinco componentes reunidos em um único contrato, com preço unificado para o conjunto</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {[
          { icone: BookOpen, titulo: "Currículo", texto: "Programação, robótica, eletrônica, fabricação digital, IA e cidadania digital." },
          { icone: Cpu, titulo: "Plataforma", texto: "Ambiente digital próprio que distribui e acompanha currículo e formação." },
          { icone: Wrench, titulo: "Espaço maker", texto: "Concepção do ambiente físico a partir das necessidades do currículo." },
          { icone: GraduationCap, titulo: "Academia We Make", texto: "Formação, mentoria e consultoria pedagógica contínua." },
          { icone: Compass, titulo: "Assessoria institucional", texto: "Acompanhamento estratégico de mantenedores e diretores." },
        ].map((c, i) => (
          <CartaoTopico key={c.titulo} delay={i * 0.12} icone={c.icone} titulo={c.titulo} texto={c.texto} variante="dark" />
        ))}
      </div>
    </Slide>,

    // 4 — fluxo do sistema (hub e satélites)
    <Slide key="fluxo-sistema" variante="dark">
      <Eyebrow>Capítulo 3 · Como o sistema se conecta</Eyebrow>
      <Titulo>O currículo alimenta e é alimentado por cada um dos outros quatro componentes</Titulo>
      <div className="mt-6">
        <FluxoCurriculo
          centro="Kit We Make"
          satelites={[
            { titulo: "Currículo", texto: "Define o que ensinar", icone: BookOpen },
            { titulo: "Plataforma", texto: "Distribui e acompanha", icone: Cpu },
            { titulo: "Formação", texto: "Prepara o professor", icone: GraduationCap },
            { titulo: "Espaço maker", texto: "Traduz em ambiente", icone: Wrench },
            { titulo: "Assessoria", texto: "Integra a estratégia", icone: Compass },
          ]}
        />
      </div>
    </Slide>,

    // 5 — currículo em detalhe
    <Slide key="curriculo" variante="royal">
      <Eyebrow>Capítulo 6 · Produtos e serviços</Eyebrow>
      <Titulo>Um currículo autoral, da Educação Infantil ao Ensino Médio, com progressão real entre séries</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
        {[
          { icone: Code2, titulo: "Programação, Codificação e Jogos", texto: "Lógica computacional aplicada à criação de jogos e aplicativos." },
          { icone: CircuitBoard, titulo: "Robótica e Eletrônica", texto: "Montagem, sensores e circuitos que unem hardware e software." },
          { icone: Hammer, titulo: "Engenharia, Design e Fabricação", texto: "Prototipagem, modelagem e fabricação digital de soluções reais." },
          { icone: CompassIcon, titulo: "Mordomia e Tecnologias para o Futuro", texto: "Uso responsável da tecnologia à luz da cosmovisão cristã." },
        ].map((c, i) => (
          <CartaoTopico key={c.titulo} delay={i * 0.1} icone={c.icone} titulo={c.titulo} texto={c.texto} variante="royal" />
        ))}
      </div>
    </Slide>,

    // 6 — Ciclo de Projeto (fluxo circular)
    <Slide key="ciclo-projeto" variante="dark">
      <Eyebrow>Metodologia Conhecer, Explorar e Criar</Eyebrow>
      <Titulo>O Momento Criar segue um ciclo de projeto estruturado em seis etapas</Titulo>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center mt-8">
        <div>
          <p className="text-white/55 text-base leading-relaxed max-w-md">
            As seis etapas se repetem a cada novo desafio proposto em sala, do primeiro contato com o problema
            até a apresentação da solução para a turma.
          </p>
          <p className="text-white/45 text-base mt-4 max-w-md">
            Etapas não rigidamente lineares: o processo permite retornar, ajustar e refinar soluções ao longo do
            projeto.
          </p>
        </div>
        <CicloEtapas
          centro="Momento Criar"
          etapas={[
            { icone: Search, titulo: "Identificar" },
            { icone: Lightbulb, titulo: "Imaginar" },
            { icone: ClipboardCheck, titulo: "Planejar" },
            { icone: Hammer, titulo: "Construir" },
            { icone: TestTube, titulo: "Testar" },
            { icone: Share2, titulo: "Compartilhar" },
          ]}
        />
      </div>
    </Slide>,

    // 7 — livro maker e precificação
    <Slide key="livro-preco" variante="navy">
      <Eyebrow>Capítulo 6 · Livro Maker e precificação</Eyebrow>
      <Titulo>A partir de 2027, o currículo ganha um componente físico e um valor de referência único</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        <Cartao delay={0.1}>
          <BookOpen className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Livro Maker físico</p>
          <p className="text-white/55 text-base leading-relaxed">
            Material de registro, reflexão e portfólio do aluno, produzido por gráfica parceira em São Paulo.
            Complementa a entrega digital já feita pela plataforma.
          </p>
        </Cartao>
        <Cartao delay={0.2}>
          <p className="font-display text-white text-2xl mb-1">R$ 420</p>
          <p className="text-white/50 text-base mb-3">Valor de referência por aluno ao ano</p>
          <p className="text-white/55 text-base leading-relaxed">
            Ponderado por porte, ticket já cobrado das famílias e natureza da instituição. Carteira atual pratica
            entre R$180 e R$420 por aluno ao ano.
          </p>
        </Cartao>
      </div>
    </Slide>,

    // 8 — homeschool
    <Slide key="homeschool" variante="dark">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <div>
          <Eyebrow>Segundo mercado</Eyebrow>
          <Titulo>O mesmo currículo, adaptado para famílias educadoras em comunidades de homeschooling</Titulo>
          <div className="grid grid-cols-2 gap-3 mt-9">
            {[
              { icone: Code2, titulo: "Programação Criativa" },
              { icone: CircuitBoard, titulo: "Robótica e Automação" },
              { icone: Hammer, titulo: "Engenharia e Prototipagem" },
              { icone: Box, titulo: "Modelagem e Impressão 3D" },
            ].map((c, i) => (
              <CartaoTopico key={c.titulo} delay={i * 0.1} icone={c.icone} titulo={c.titulo} variante="dark" />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {["Gramática", "Lógica", "Retórica"].map((n, i) => (
              <motion.div
                key={n}
                className="rounded-full border border-[rgb(var(--color-brand-mint))]/40 px-4 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
              >
                <span className="font-mono text-base text-[rgb(var(--color-brand-mint))] uppercase tracking-wider font-bold">
                  Nível {i + 1} · {n}
                </span>
              </motion.div>
            ))}
          </div>
          <Cartao delay={0.75} className="mt-5">
            <p className="text-white/70 text-base leading-relaxed">
              Cobrança realizada por aluno (com acesso gratuito aos pais/responsáveis). Venda e distribuição conduzidas por
              parceira comercial já estabelecida (Aspen). Primeira venda projetada para 2027: 100 alunos, R$49.890,00.
            </p>
          </Cartao>
        </div>
        <FotoPainel src="/photos/salamaker3.png" className="aspect-[4/5] hidden lg:block" />
      </div>
    </Slide>,

    // 9 — Academia We Make
    <Slide key="academia" variante="navy">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <div>
          <Eyebrow>Capítulo 6 · Formação docente</Eyebrow>
          <Titulo>A Academia We Make garante que o currículo dependa de professores preparados, não só de bons materiais</Titulo>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-8">
            {["Apresentação", "Onboarding", "Diagnóstico de entrada", "Implantação intensiva", "Acompanhamento contínuo", "Formação temática", "Diagnóstico de meio de ciclo", "Prescrição de resultados"].map((f, i) => (
              <motion.div
                key={f}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <p className="font-mono text-[rgb(var(--color-brand-mint))] text-base mb-1">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-white/75 text-base leading-snug">{f}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-white/40 text-base mt-5 max-w-xl">
            Financiada pela mesma receita do Kit We Make, sem cobrança adicional.
          </p>
        </div>
        <FotoPainel src="/photos/formacao_docente.png" className="aspect-[4/5] hidden lg:block" />
      </div>
    </Slide>,

    // 10 — por que agora (federal)
    <Slide key="por-que-agora" variante="royal">
      <Eyebrow>Por que agora</Eyebrow>
      <Titulo>A lei transformou a educação tecnológica de diferencial em exigência curricular</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {[
          { icone: Scale, lei: "Lei nº 14.533/2023", texto: "Institui a Política Nacional de Educação Digital." },
          { icone: Landmark, lei: "Resolução CNE/CEB nº 2/2025", texto: "Complemento de Computação da BNCC, obrigatório do 1º ano do Fundamental ao 3º do Médio, a partir de 2026." },
          { icone: Coins, lei: "Fundeb, 5 de março de 2026", texto: "Repasse do Valor Aluno Ano com base em Resultados condicionado à comprovação da adequação curricular até agosto de 2026." },
        ].map((c, i) => (
          <CartaoTopico key={c.lei} delay={i * 0.15} icone={c.icone} titulo={c.lei} texto={c.texto} variante="royal" />
        ))}
      </div>
    </Slide>,

    // 11 — mapa: estados com lei própria
    <Slide key="mapa-leis" variante="dark">
      <Eyebrow>Cinco estados foram além do piso federal</Eyebrow>
      <Titulo>DF, São Paulo, Minas Gerais, Paraná e Rio Grande do Sul já têm lei ou resolução própria</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 items-center">
        {geoBrasil ? (
          <MapaBrasil geo={geoBrasil} porEstado={estadosComLeiPropria} width={460} height={460} corAtiva="rgb(var(--color-brand-mint))" />
        ) : (
          <div className="text-white/40 text-base">Mapa indisponível</div>
        )}
        <div className="space-y-2">
          {[
            ["DF", "Lei nº 7.796/2025 — Centros Interescolares de Robótica"],
            ["SP", "Deliberação CEE nº 233/2025 — Educação Digital, Midiática e Computação"],
            ["MG", "Parecer CEE/MG nº 1.588/2025 — Referencial Curricular de Computação"],
            ["PR", "Deliberação CEE/PR nº 04/2025"],
            ["RS", "Resolução CEEd nº 382/2024, a mais antiga identificada"],
          ].map(([uf, texto], i) => (
            <motion.div
              key={uf}
              className="flex gap-3 items-baseline"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className="font-mono text-[rgb(var(--color-brand-mint))] text-base font-bold w-7 shrink-0">{uf}</span>
              <span className="text-white/65 text-base leading-snug">{texto}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>,

    // 12 — mercado / funil
    <Slide key="mercado" variante="navy">
      <Eyebrow>Tamanho de mercado</Eyebrow>
      <Titulo>Um nicho pouco disputado dentro de um setor de tecnologia educacional já maduro</Titulo>
      <div className="mt-10 space-y-3 max-w-3xl">
        {[
          { label: "Escolas privadas de Educação Básica no Brasil (Censo 2025)", valor: 41746, largura: 100 },
          { label: "Escolas com Ensino Fundamental", valor: 24683, largura: 68 },
          { label: "Mercado confessional endereçável (estimativa de trabalho)", valor: 5000, largura: 22, destaque: true },
          { label: "Mercado acessível, perfil compatível com a We Make", valor: 1400, largura: 9, destaque: true },
        ].map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <div className="flex items-baseline justify-between mb-1.5 gap-3">
              <span className="text-white/60 text-base">{f.label}</span>
              <span className={`font-mono font-bold tabular-nums text-base ${f.destaque ? "text-[rgb(var(--color-brand-mint))]" : "text-white/70"}`}>
                {f.valor.toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${f.destaque ? "bg-[rgb(var(--color-brand-mint))]" : "bg-[rgb(var(--color-brand-royal))]"}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${f.largura}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>,

    // 13 — a dor do cliente
    <Slide key="dor-cliente" variante="sky">
      <Eyebrow tom="navy">Capítulo 5 · Por que ele compra</Eyebrow>
      <Titulo tom="escuro">Sem a We Make, a escola fragmenta a compra entre vários fornecedores diferentes</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-9">
        {[
          { icone: Puzzle, titulo: "Um fornecedor de robótica ou programação", texto: "Contrato isolado, sem currículo plurianual nem integração com o restante da grade." },
          { icone: LayoutGrid, titulo: "Uma plataforma de gestão genérica", texto: "Organiza dados administrativos, mas não ensina nem acompanha aprendizagem." },
          { icone: GraduationCap, titulo: "Formação pontual para professores", texto: "Capacitação isolada, sem assessoria estratégica que sustente o resultado ao longo do ano." },
        ].map((c, i) => (
          <CartaoTopico key={c.titulo} delay={i * 0.12} icone={c.icone} titulo={c.titulo} texto={c.texto} variante="sky" />
        ))}
      </div>
      <p className="text-[rgb(var(--color-brand-navy))]/70 text-base max-w-xl mt-5">
        Essa fragmentação é, ao mesmo tempo, o padrão do mercado e a principal oportunidade que o sistema We
        Make explora.
      </p>
    </Slide>,

    // 14 — concorrência
    <Slide key="concorrencia" variante="dark">
      <Eyebrow>Concorrência</Eyebrow>
      <Titulo>Nenhum concorrente mapeado reproduz essa combinação de currículo, tecnologia e cosmovisão</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
        {[
          { cat: "Propostas confessionais", ex: "IDBIRD Educação", limite: "Escopo restrito: material pontual, sem currículo plurianual, plataforma ou assessoria." },
          { cat: "Sistemas seculares", ex: "Nave à Vela, ZOOM, Robomind, MundoMaker, Somai", limite: "Sem proposta confessional." },
          { cat: "Franquias diretas à família", ex: "Código Kid, SuperGeeks, Kodland, BYJU'S", limite: "Sem vínculo institucional com a escola." },
        ].map((c, i) => (
          <Cartao key={c.cat} delay={i * 0.15}>
            <p className="font-mono text-base uppercase tracking-wider text-white/40 font-bold mb-2">{c.cat}</p>
            <p className="font-display text-white text-[1.0625rem] mb-3">{c.ex}</p>
            <p className="text-white/55 text-base leading-relaxed">{c.limite}</p>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 15 — futuros concorrentes
    <Slide key="futuros-concorrentes" variante="navy">
      <Eyebrow>A ameaça mais provável já tem distribuição</Eyebrow>
      <Titulo>A ameaça mais provável já tem acesso às mesmas escolas que nós</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
        {[
          { icone: BookOpen, titulo: "Sistemas de ensino cristãos", texto: "Já têm a base de clientes e a confiança das mantenedoras confessionais." },
          { icone: Newspaper, titulo: "Grandes grupos editoriais", texto: "Distribuição nacional consolidada e capital para lançar um módulo de tecnologia." },
          { icone: Landmark, titulo: "Mackenzie e ACSI", texto: "Credibilidade institucional acumulada junto às mesmas escolas confessionais." },
          { icone: Cpu, titulo: "Google e Microsoft", texto: "Plataformas já presentes no dia a dia de boa parte das escolas parceiras." },
        ].map((c, i) => (
          <CartaoTopico key={c.titulo} delay={i * 0.1} icone={c.icone} titulo={c.titulo} texto={c.texto} variante="dark" />
        ))}
      </div>
      <p className="text-white/50 text-base max-w-xl mt-5">
        A defesa competitiva se apoia em especialização no mercado cristão, propriedade intelectual protegida e
        integração profunda entre os cinco componentes do sistema.
      </p>
    </Slide>,

    // 16 — mapa: onde estão nossos alunos
    <Slide key="mapa-alunos" variante="royal">
      <Eyebrow>Onde estamos hoje</Eyebrow>
      <Titulo>Presença em 9 estados, do Sul ao Nordeste</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 items-center">
        {geoBrasil ? (
          <MapaBrasil geo={geoBrasil} porEstado={escolasPorEstado} width={460} height={460} />
        ) : (
          <div className="text-white/40 text-base">Mapa indisponível</div>
        )}
        <div>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Escolas parceiras identificadas por estado no cadastro comercial, entre as 23 que compõem o
            orçamento de 2027. Concentração no Paraná, com presença já em São Paulo, Santa Catarina,
            Paraíba, Espírito Santo, Maranhão, Rio Grande do Sul, Rio Grande do Norte e Ceará.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(escolasPorEstado).sort((a, b) => b[1] - a[1]).map(([uf, qtd], i) => (
              <motion.div
                key={uf}
                className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <p className="font-display text-white text-lg">{qtd}</p>
                <p className="font-mono text-white/50 text-base">{uf}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>,

    // 17 — equipe (organograma)
    <Slide key="equipe" variante="dark">
      <Eyebrow>Capítulo 2 · Equipe</Eyebrow>
      <Titulo>Oito pessoas sustentam hoje toda a operação da We Make</Titulo>
      <div className="mt-10">
        <Organograma
          topo={{
            nome: "Dênis Júlio Pereira Francisco",
            cargo: "CEO e Diretor Pedagógico",
            cor: "rgb(var(--color-brand-mint))",
            iniciais: "DJ",
            foto: "/Dênis.PNG",
          }}
          filhos={EQUIPE_FILHOS}
        />
      </div>
      <p className="text-white/40 text-base mt-8 max-w-2xl">
        Estrutura hoje concentrada, o que garante agilidade nesta fase, com distribuição progressiva de
        responsabilidade prevista à medida que o sistema cresce.
      </p>
    </Slide>,

    // 18 — operações e tecnologia
    <Slide key="operacoes" variante="navy">
      <Eyebrow>Capítulo 7 · Estrutura e operações</Eyebrow>
      <Titulo>A tecnologia própria já sustenta a operação diária da empresa</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-9">
        {[
          { icone: Network, titulo: "CRM próprio", texto: "comercial.wemake.tec.br organiza prospecção, negociação e acompanhamento de contratos." },
          { icone: Layers, titulo: "Plataforma Arkos", texto: "Infraestrutura tecnológica e inteligência de negócio para gestão em tempo real." },
          { icone: Cpu, titulo: "Equipe própria", texto: "3 desenvolvedores e 1 cientista de dados, dedicados à evolução contínua da plataforma." },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={i * 0.12}>
            <c.icone className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
            <p className="font-display text-white text-[1.0625rem] mb-1.5">{c.titulo}</p>
            <p className="text-white/55 text-base leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <Cartao delay={0.4}>
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Onboarding de escolas</p>
          <p className="text-white/55 text-base leading-relaxed">
            12 horas, 2 dias, 3 formações: primeiro fundamentos, depois metodologia, só então operação da
            plataforma e do espaço maker.
          </p>
        </Cartao>
        <Cartao delay={0.5}>
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Parceiros estratégicos</p>
          <p className="text-white/55 text-base leading-relaxed">
            ACSI Brasil para acesso institucional, gráfica parceira em São Paulo para o Livro Maker, Aspen para a
            frente de homeschooling.
          </p>
        </Cartao>
      </div>
    </Slide>,

    // 19 — parcerias locais
    <Slide key="parcerias-locais" variante="sky">
      <Eyebrow tom="navy">Capítulo 7 · Repercussão local</Eyebrow>
      <Titulo tom="escuro">Olimpíadas e hackathons transformam relacionamento comercial em reputação de campo</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        <Cartao delay={0.1} className="bg-[rgb(var(--color-brand-navy))]/10 border-[rgb(var(--color-brand-navy))]/25">
          <Trophy className="size-5 text-[rgb(var(--color-brand-navy))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-[rgb(var(--color-brand-navy))] text-[1.0625rem] mb-1.5">Olimpíadas de tecnologia</p>
          <p className="text-[rgb(var(--color-brand-navy))]/70 text-base leading-relaxed">
            Em fase de estruturação, para estimular a excelência técnica entre alunos das escolas parceiras.
          </p>
        </Cartao>
        <Cartao delay={0.2} className="bg-[rgb(var(--color-brand-navy))]/10 border-[rgb(var(--color-brand-navy))]/25">
          <Trophy className="size-5 text-[rgb(var(--color-brand-navy))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-[rgb(var(--color-brand-navy))] text-[1.0625rem] mb-1.5">Hackathons</p>
          <p className="text-[rgb(var(--color-brand-navy))]/70 text-base leading-relaxed">
            Premiação já testada: cada vencedor recebe um leitor digital, e a equipe recebe uma semana de
            estágio em empresas de tecnologia parceiras.
          </p>
        </Cartao>
      </div>
    </Slide>,

    // 20 — posicionamento
    <Slide key="posicionamento" variante="dark">
      <div className="relative">
        <Image
          src="/photos/we-make-emblem.png"
          alt=""
          width={640}
          height={640}
          aria-hidden
          className="pointer-events-none select-none absolute -right-16 -top-24 w-[26rem] h-auto opacity-[0.07] hidden sm:block"
        />
        <div className="relative">
          <Eyebrow>Capítulo 8 · Posicionamento</Eyebrow>
          <Titulo>Um sistema pedagógico integral, estruturado a partir de uma antropologia cristã</Titulo>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl mt-6">
            Sequenciado e alinhado à Base Nacional Comum Curricular, entregando currículo, plataforma, espaço
            maker, formação docente e assessoria institucional como partes de uma mesma proposta contratada de
            uma só vez.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icone: BookOpen, titulo: "Currículo" },
              { icone: Cpu, titulo: "Plataforma" },
              { icone: Wrench, titulo: "Espaço maker" },
              { icone: GraduationCap, titulo: "Formação docente" },
              { icone: Compass, titulo: "Assessoria institucional" },
            ].map((c, i) => (
              <motion.div
                key={c.titulo}
                className="flex items-center gap-2.5 rounded-full border border-[rgb(var(--color-brand-mint))]/30 bg-white/[0.04] pl-2.5 pr-4 py-2"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="size-8 rounded-full bg-[rgb(var(--color-brand-mint))]/15 flex items-center justify-center shrink-0">
                  <c.icone className="size-4 text-[rgb(var(--color-brand-mint))]" strokeWidth={1.75} />
                </span>
                <span className="text-white text-base font-medium">{c.titulo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>,

    // 21 — metas de vendas
    <Slide key="metas-vendas" variante="royal">
      <Eyebrow>Capítulo 8 · Marketing e vendas</Eyebrow>
      <Titulo>Metas de alunos: 4.000 em 2027 crescendo até 13.500 em 2030</Titulo>
      <div className="mt-9 space-y-2.5 max-w-3xl">
        {[
          { ano: 2027, alunos: "4.000 alunos (10 novas escolas)", largura: 30 },
          { ano: 2028, alunos: "6.000 alunos (+10 escolas)", largura: 45 },
          { ano: 2029, alunos: "8.000 alunos (+10 escolas)", largura: 60 },
          { ano: 2030, alunos: "13.500 alunos (+10 escolas)", largura: 100 },
        ].map((r, i) => (
          <motion.div
            key={r.ano}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <span className="font-mono text-white/60 text-base w-10 shrink-0">{r.ano}</span>
            <div className="flex-1 h-6 rounded-lg bg-black/15 overflow-hidden">
              <motion.div
                className="h-full rounded-lg bg-white flex items-center justify-end px-3"
                initial={{ width: 0 }}
                whileInView={{ width: `${r.largura}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-base font-bold text-[rgb(var(--color-brand-royal-deep))]">{r.alunos}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-white/60 text-base max-w-2xl mt-6 leading-relaxed">
        Adição constante de 10 novas escolas parceiras por ano, construindo uma operação sólida com recursos próprios.
      </p>
    </Slide>,

    // 22 — SWOT
    <Slide key="swot" variante="dark">
      <Eyebrow>Leitura estratégica</Eyebrow>
      <Titulo>Análise SWOT</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        {[
          { titulo: "Forças", cor: "rgb(var(--color-brand-mint))", itens: ["Integração das cinco frentes em um sistema único", "Currículo autoral consolidado, 1º ao 9º ano", "Cosmovisão cristã incorporada ao produto", "Entrega 100% digital do currículo escolar"] },
          { titulo: "Fraquezas", cor: "rgb(var(--color-brand-sky))", itens: ["Dependência da presença pessoal do fundador", "Formação, espaço maker e assessoria ainda não produtizados", "Plataforma menos madura que concorrentes maiores", "TAM/SAM ainda em estimativa preliminar"] },
          { titulo: "Oportunidades", cor: "rgb(var(--color-brand-royal))", itens: ["Curricularização da educação digital", "Fragmentação do mercado atual", "Parceria avançada com a Aspen, homeschooling", "Escola técnica e faculdade de tecnologia, 2030"] },
          { titulo: "Ameaças", cor: "#e8607a", itens: ["Entrada de players com distribuição já consolidada", "Comoditização por IA generativa", "Incerteza regulatória do homeschooling no Brasil", "Pressão orçamentária das escolas clientes"] },
        ].map((q, i) => (
          <Cartao key={q.titulo} delay={i * 0.1}>
            <p className="font-display text-[1.0625rem] mb-3" style={{ color: q.cor }}>{q.titulo}</p>
            <ul className="space-y-1.5">
              {q.itens.map((it) => (
                <li key={it} className="text-white/65 text-base leading-relaxed flex gap-2">
                  <span style={{ color: q.cor }}>·</span>{it}
                </li>
              ))}
            </ul>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 23 — financeiro
    <Slide key="financeiro" variante="navy">
      <Eyebrow>Projeção financeira</Eyebrow>
      <Titulo>Receita projetada, 2027 a 2031</Titulo>
      <div className="mt-8">
        <GraficoTendencia anos={anos} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        <Cartao delay={0.1}>
          <p className="font-display text-white text-2xl"><NumeroAnimado valor={receitaTotal2027} prefixo="R$ " /></p>
          <p className="text-white/50 text-base mt-1">Receita 2027</p>
        </Cartao>
        <Cartao delay={0.2}>
          <p className="font-display text-[rgb(var(--color-brand-mint))] text-2xl"><NumeroAnimado valor={ultimoAno?.receita ?? 0} prefixo="R$ " /></p>
          <p className="text-white/50 text-base mt-1">Receita 2031, cenário-base</p>
        </Cartao>
        <Cartao delay={0.3}>
          <p className="font-display text-[rgb(var(--color-brand-mint))] text-2xl"><NumeroAnimado valor={ultimoAno?.resultado ?? 0} prefixo="R$ " /></p>
          <p className="text-white/50 text-base mt-1">Resultado 2031, cenário-base</p>
        </Cartao>
        <Cartao delay={0.4}>
          <p className="font-display text-white text-2xl"><NumeroAnimado valor={ultimoAno?.margemPct ?? 0} sufixo="%" casas={1} /></p>
          <p className="text-white/50 text-base mt-1">Margem projetada 2031</p>
        </Cartao>
      </div>
    </Slide>,

    // 24 — despesas (donut)
    <Slide key="despesas" variante="dark">
      <Eyebrow>Capítulo 9 · Estrutura de despesas</Eyebrow>
      <Titulo>Onde vai cada real do orçamento de 2027</Titulo>
      <div className="mt-9">
        <Donut
          fatias={[
            { label: "Pessoal, CLT e PJ", pct: 41.5, cor: "rgb(var(--color-brand-mint))" },
            { label: "Produção gráfica", pct: 21.3, cor: "rgb(var(--color-brand-royal))" },
            { label: "Taxas e serviços financeiros", pct: 13.2, cor: "rgb(var(--color-brand-sky))" },
            { label: "Tecnologia", pct: 5.3, cor: "#8b7ce8" },
            { label: "Infraestrutura", pct: 5.3, cor: "#e8607a" },
            { label: "Demais categorias", pct: 13.4, cor: "rgba(255,255,255,0.3)" },
          ]}
        />
      </div>
      <p className="text-white/40 text-base mt-6 max-w-xl">
        Despesa total de R$844.365,14 em 2027, já incorporando pró-labore da liderança e equipe de tecnologia
        própria.
      </p>
    </Slide>,

    // 25 — indicadores de retorno
    <Slide key="indicadores" variante="royal">
      <Eyebrow>Capítulo 11 · Indicadores de retorno</Eyebrow>
      <Titulo>Seis indicadores acompanham se o crescimento vem com margem, não só com volume</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-9">
        {[
          { icone: Percent, titulo: "Margem bruta por aluno e por escola" },
          { icone: Repeat, titulo: "Retenção e renovação contratual" },
          { icone: TrendingUp, titulo: "LTV sobre CAC" },
          { icone: Clock, titulo: "Custo por hora de formação" },
          { icone: Building2, titulo: "Custo de infraestrutura por instituição ativa" },
          { icone: Wrench, titulo: "Margem por projeto de espaço maker" },
        ].map((c, i) => (
          <CartaoTopico key={c.titulo} delay={i * 0.08} icone={c.icone} titulo={c.titulo} variante="royal" />
        ))}
      </div>
    </Slide>,

    // 26 — riscos (matriz)
    <Slide key="riscos" variante="dark">
      <Eyebrow>Governança e risco</Eyebrow>
      <Titulo>Nenhum risco listado é, isoladamente, impeditivo do plano</Titulo>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 items-center">
        <MatrizRisco
          pontos={[
            { label: "Liderança central", x: 0.82, y: 0.85, cor: "#e8607a" },
            { label: "PI sem registro", x: 0.55, y: 0.85, cor: "rgb(var(--color-brand-sky))" },
            { label: "Maturidade desigual", x: 0.82, y: 0.5, cor: "rgb(var(--color-brand-sky))" },
            { label: "IA de terceiros", x: 0.25, y: 0.5, cor: "rgb(var(--color-brand-royal))" },
            { label: "Homeschooling", x: 0.25, y: 0.85, cor: "rgb(var(--color-brand-royal))" },
            { label: "Concorrência", x: 0.55, y: 0.5, cor: "rgb(var(--color-brand-royal))" },
          ]}
        />
        <ul className="space-y-2">
          {[
            "Dependência de liderança central — prioridade imediata",
            "Propriedade intelectual sem registro confirmado — prioridade imediata",
            "Maturidade desigual entre linhas — prioridade imediata",
            "Regulação do homeschooling — monitoramento contínuo",
          ].map((r, i) => (
            <motion.li
              key={r}
              className="flex items-start gap-2 text-white/65 text-base leading-relaxed"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <ShieldAlert className="size-4 text-[rgb(var(--color-brand-sky))] shrink-0 mt-0.5" strokeWidth={1.75} />
              {r}
            </motion.li>
          ))}
        </ul>
      </div>
    </Slide>,

    // 27 — crescimento futuro
    <Slide key="crescimento-futuro" variante="navy">
      <Eyebrow>Capítulo 12 · Estratégia de crescimento futuro</Eyebrow>
      <Titulo>Dois negócios futuros, condicionados à consolidação do sistema atual</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        <Cartao delay={0.1}>
          <School className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Escola de tecnologia</p>
          <p className="text-white/55 text-base leading-relaxed">
            Abrangência nacional, atende diretamente crianças e adolescentes, sem exigir vínculo com escola
            parceira. Ano 4 do plano, 2030.
          </p>
        </Cartao>
        <Cartao delay={0.2}>
          <Building2 className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Faculdade de tecnologia</p>
          <p className="text-white/55 text-base leading-relaxed">
            Extensão da proposta em nível superior, possibilidade a ser buscada, sustentada pela parceria com a
            FICV. Depende de credenciamento junto ao MEC.
          </p>
        </Cartao>
      </div>
      <Cartao delay={0.4} className="mt-3">
        <p className="text-white/70 text-base leading-relaxed">
          Toda a receita projetada entre 2027 e 2031 vem do sistema já existente. Os dois negócios futuros
          dependem da consolidação da governança, da validação de demanda e do registro de propriedade
          intelectual.
        </p>
      </Cartao>
    </Slide>,

    // 28 — capital externo
    <Slide key="capital-externo" variante="royal">
      <Eyebrow>Sobre capital externo</Eyebrow>
      <Titulo>Uma trajetória construída sem dívida, pronta para ser acelerada por capital externo</Titulo>
      <motion.div
        className="mt-9 rounded-2xl bg-[rgb(var(--color-brand-ivory))] text-[rgb(var(--color-brand-navy))] p-6 sm:p-8 max-w-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-base uppercase tracking-[0.2em] text-[rgb(var(--color-brand-royal))] font-bold mb-3">
          Ponto de partida
        </p>
        <p className="font-display text-[1.05rem] sm:text-[1.25rem] leading-snug">
          Construída até aqui com recursos próprios, sem dívida ou passivo relevante a sustentar. A pergunta não
          é se a We Make chega ao horizonte de cinco anos deste plano sozinha, mas se um investidor deseja
          antecipar esse horizonte para dois ou três anos.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 max-w-3xl">
        {[
          { titulo: "Equipe comercial", texto: "Fortalecimento imediato da estrutura de aquisição, com mais capacidade de busca ativa e qualificação de novas escolas." },
          { titulo: "Consultoria pedagógica", texto: "Investimento mais robusto na Academia We Make, elevando a experiência de pós-venda de escolas e famílias já atendidas." },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={0.15 + i * 0.12}>
            <p className="font-display text-white text-[1.0625rem] mb-2">{c.titulo}</p>
            <p className="text-white/60 text-base leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
      <p className="text-white/40 text-base mt-5 max-w-2xl">
        Prioridades de alocação caso a aceleração se concretize, inspiração, não orçamento aprovado.
      </p>
    </Slide>,

    // 29 — fechamento
    <Slide key="fechamento" variante="dark">
      <div className="flex flex-col items-start">
        <Sparkles className="size-8 text-[rgb(var(--color-brand-mint))] mb-6" strokeWidth={1.5} />
        <Titulo>Educação tecnológica com sabedoria, para a glória de Deus e o bem do próximo</Titulo>
        <p className="text-white/55 text-base max-w-2xl mt-6 leading-relaxed">
          We Make Educação Tecnológica LTDA · CNPJ 48.760.895/0001-99 · Documento confidencial, elaborado pela
          direção estratégica da empresa.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <Image src="/logo-wemake.png" alt="We Make" width={164} height={50} className="h-9 w-auto object-contain" />
        </motion.div>
      </div>
    </Slide>,
  ];

  const total = slides.length;

  const irPara = useCallback(
    (i: number) => {
      const alvo = Math.max(0, Math.min(total - 1, i));
      setDirecao(alvo > atual ? 1 : -1);
      setAtual(alvo);
    },
    [atual, total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); irPara(atual + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); irPara(atual - 1); }
      if (e.key === "Escape" && document.fullscreenElement) document.exitFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [atual, irPara]);

  // A Fullscreen API nativa não existe em elementos arbitrários no Safari/iOS. O estado "tela cheia"
  // é controlado por CSS (fixed inset-0) e funciona em qualquer navegador; a API nativa é só um bônus
  // quando disponível, nunca uma dependência para o modo cheio funcionar.
  useEffect(() => {
    function onFsChange() {
      if (!document.fullscreenElement) setTelaCheia(false);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function alternarTelaCheia() {
    if (telaCheia) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      setTelaCheia(false);
    } else {
      setTelaCheia(true);
      containerRef.current?.requestFullscreen?.().catch(() => {});
    }
  }

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    const t = e.changedTouches[0];
    if (!touchStart.current || !t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) irPara(atual + (dx < 0 ? 1 : -1));
    touchStart.current = null;
  }

  const variante = motionVariant(direcao);

  return (
    <div
      ref={containerRef}
      className={`w-full bg-[rgb(var(--color-brand-navy))] text-white select-none ${telaCheia ? "fixed inset-0 z-[100]" : "relative"}`}
      style={{ height: telaCheia ? "100dvh" : "min(100dvh, 780px)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence custom={direcao} mode="wait">
        <motion.div
          key={atual}
          custom={direcao}
          variants={variante}
          initial="entra"
          animate="centro"
          exit="sai"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {slides[atual]}
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
        <span className="font-mono text-base text-white/40 tabular-nums hidden sm:inline">
          {String(atual + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={alternarTelaCheia}
          aria-label={telaCheia ? "Sair da tela cheia" : "Tela cheia"}
          className="size-10 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition"
        >
          {telaCheia ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
        </button>
      </div>

      <button
        type="button"
        onClick={() => irPara(atual - 1)}
        disabled={atual === 0}
        aria-label="Slide anterior"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition disabled:opacity-0"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => irPara(atual + 1)}
        disabled={atual === total - 1}
        aria-label="Próximo slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 size-10 sm:size-12 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition disabled:opacity-0"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 max-w-[85vw] overflow-x-auto px-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all shrink-0 ${i === atual ? "w-6 bg-[rgb(var(--color-brand-mint))]" : "w-1.5 bg-white/25 hover:bg-white/45"}`}
          />
        ))}
      </div>
    </div>
  );
}

function motionVariant(direcao: number) {
  return {
    entra: { opacity: 0, x: direcao > 0 ? 40 : -40 },
    centro: { opacity: 1, x: 0 },
    sai: { opacity: 0, x: direcao > 0 ? -40 : 40 },
  };
}
