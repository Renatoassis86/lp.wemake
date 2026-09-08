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
} from "lucide-react";

export interface AnoProjetado {
  ano: number;
  receita: number;
  resultado: number;
  margemPct: number;
}

interface Props {
  anos: AnoProjetado[];
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      className="font-mono text-[0.6875rem] sm:text-xs uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))] font-bold mb-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className="font-display text-white text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] max-w-4xl text-balance"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.08 }}
    >
      {children}
    </motion.h2>
  );
}

function Avatar({ iniciais, cor }: { iniciais: string; cor: string }) {
  return (
    <div
      className="size-11 rounded-full flex items-center justify-center font-display text-[0.9375rem] font-semibold shrink-0"
      style={{ background: `${cor}22`, color: cor, border: `1px solid ${cor}55` }}
    >
      {iniciais}
    </div>
  );
}

/* ---------- Fundo por slide (fundo sobre fundo, tom sobre tom) ---------- */

function Fundo({ variante }: { variante: "navy" | "royal" | "mint" | "dark" }) {
  const mapa: Record<string, string> = {
    navy: "radial-gradient(120% 100% at 100% 0%, rgba(76,138,222,0.16), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(118,243,205,0.10), transparent 55%), rgb(var(--color-brand-navy))",
    royal: "linear-gradient(155deg, rgb(var(--color-brand-royal-deep)) 0%, rgb(var(--color-brand-navy)) 65%)",
    mint: "linear-gradient(155deg, #0d2e28 0%, rgb(var(--color-brand-navy)) 60%)",
    dark: "linear-gradient(180deg, #060d1e 0%, rgb(var(--color-brand-navy)) 100%)",
  };
  return (
    <div aria-hidden className="absolute inset-0 -z-10" style={{ background: mapa[variante] }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
    </div>
  );
}

/* ---------- Slide wrapper ---------- */

function Slide({ children, variante = "navy" }: { children: React.ReactNode; variante?: "navy" | "royal" | "mint" | "dark" }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 sm:py-20 overflow-y-auto">
      <Fundo variante={variante} />
      <div className="max-w-6xl mx-auto w-full">{children}</div>
    </div>
  );
}

/* ================= Dados de apoio ================= */

const EQUIPE = [
  { nome: "Dênis Júlio Pereira Francisco", cargo: "CEO e Diretor Pedagógico", texto: "Estratégia, direção pedagógica e teológica, desenvolvimento do currículo e concepção dos espaços maker.", cor: "rgb(var(--color-brand-mint))" },
  { nome: "Renato Silva de Assis", cargo: "Gerente Administrativo", texto: "Gestão administrativa e financeira, contratos, processos, indicadores e fornecedores.", cor: "rgb(var(--color-brand-royal))" },
  { nome: "Emanuel dos Santos Peixoto", cargo: "Analista de Marketing", texto: "Posicionamento da marca, geração de demanda, conteúdo, campanhas e eventos.", cor: "rgb(var(--color-brand-sky))" },
  { nome: "Suzana Bonifazio", cargo: "Consultora Pedagógica", texto: "Implantação, onboarding, acompanhamento de professores e escolas.", cor: "rgb(var(--color-brand-mint))" },
  { nome: "Emanuela Monteiro", cargo: "Consultora Pedagógica e de Negócios", texto: "Implementação da equipe de consultoria, corresponsável pela Academia We Make.", cor: "rgb(var(--color-brand-royal))" },
  { nome: "Christiano Bonifazio", cargo: "Representante Comercial, São Paulo", texto: "Busca ativa de novas escolas, do primeiro contato ao pós-venda.", cor: "rgb(var(--color-brand-sky))" },
  { nome: "Equipe de tecnologia", cargo: "3 desenvolvedores + 1 cientista de dados", texto: "Construção, evolução e implantação contínua da plataforma tecnológica própria.", cor: "rgb(var(--color-brand-mint))" },
  { nome: "Iran Firmino", cargo: "Contador", texto: "Suporte contábil, fiscal, tributário e societário.", cor: "rgb(var(--color-brand-royal))" },
];

/* ================= Componente principal ================= */

export function ApresentacaoPlano({ anos }: Props) {
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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <Image src="/photos/2.png" alt="We Make" width={180} height={54} className="h-11 sm:h-12 w-auto object-contain" priority />
      </motion.div>
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.3em] text-[rgb(var(--color-brand-mint))] font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        Plano de Negócio · 2027–2031
      </motion.p>
      <motion.h1
        className="font-display text-white text-[clamp(2.25rem,7vw,5rem)] leading-[1.02] max-w-5xl text-balance"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        O primeiro sistema de educação tecnológica com cosmovisão cristã do Brasil.
      </motion.h1>
      <motion.p
        className="text-white/70 text-[clamp(1rem,2.2vw,1.375rem)] max-w-2xl mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65 }}
      >
        We Make Educação Tecnológica.
      </motion.p>
      <motion.div
        className="flex flex-wrap gap-x-8 gap-y-2 mt-10 text-white/40 text-xs font-mono uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <span>We Make Educação Tecnológica LTDA</span>
        <span>CNPJ 48.760.895/0001-99</span>
        <span>Documento confidencial</span>
      </motion.div>
    </Slide>,

    // 1 — tração
    <Slide key="tracao" variante="navy">
      <Eyebrow>Quem somos hoje</Eyebrow>
      <Titulo>De duas escolas parceiras, em 2024, a um sistema em expansão nacional.</Titulo>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
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
            <p className="text-white/50 text-[0.75rem] mt-1.5 leading-snug">{s.label}</p>
          </Cartao>
        ))}
      </div>
      <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-8 leading-relaxed">
        Única empresa brasileira a oferecer um sistema completo de educação tecnológica estruturado a partir de
        uma cosmovisão cristã explícita, reunindo currículo, plataforma, espaço maker, formação docente e
        assessoria institucional em um único contrato.
      </p>
    </Slide>,

    // 2 — o sistema
    <Slide key="sistema" variante="dark">
      <Eyebrow>O Kit We Make</Eyebrow>
      <Titulo>Cinco componentes reunidos em um único contrato, sem preço fracionado entre eles.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
        {[
          { icone: BookOpen, titulo: "Currículo", texto: "Programação, robótica, eletrônica, fabricação digital, IA e cidadania digital, pela metodologia Conhecer, Explorar e Criar." },
          { icone: Cpu, titulo: "Plataforma", texto: "Ambiente digital próprio que distribui e acompanha currículo, formação e dados de implementação." },
          { icone: Wrench, titulo: "Espaço maker", texto: "Concepção do ambiente físico a partir do currículo, não do catálogo de equipamentos." },
          { icone: GraduationCap, titulo: "Academia We Make", texto: "Formação, mentoria e consultoria pedagógica contínua, incluída no contrato, nunca vendida à parte." },
          { icone: Compass, titulo: "Assessoria institucional", texto: "Acompanhamento estratégico de mantenedores e diretores, com dados reais de implementação." },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={i * 0.12} className="flex flex-col">
            <c.icone className="size-6 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
            <p className="font-display text-white text-[1.0625rem] mb-1.5">{c.titulo}</p>
            <p className="text-white/55 text-[0.8125rem] leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 3 — currículo em detalhe
    <Slide key="curriculo" variante="royal">
      <Eyebrow>Capítulo 6 · Produtos e serviços</Eyebrow>
      <Titulo>Um currículo autoral, da Educação Infantil ao Ensino Médio, com progressão real entre as séries.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-9">
        {[
          { icone: Code2, titulo: "Programação, Codificação e Jogos" },
          { icone: CircuitBoard, titulo: "Robótica e Eletrônica" },
          { icone: Hammer, titulo: "Engenharia, Design e Fabricação" },
          { icone: CompassIcon, titulo: "Mordomia e Tecnologias para o Futuro" },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={i * 0.1}>
            <c.icone className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
            <p className="text-white/85 text-[0.9375rem] font-medium leading-snug">{c.titulo}</p>
          </Cartao>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {[
          { et: "Conhecer", texto: "Deslumbramento e conexão inicial com o tema." },
          { et: "Explorar", texto: "Sistematização por explicações, exemplos e discussão." },
          { et: "Criar", texto: "Ciclo de Projeto: identificar, pesquisar, planejar, construir, testar e compartilhar." },
        ].map((e, i) => (
          <Cartao key={e.et} delay={0.4 + i * 0.1}>
            <p className="font-mono text-[rgb(var(--color-brand-mint))] text-[0.75rem] uppercase tracking-wider font-bold mb-2">{e.et}</p>
            <p className="text-white/65 text-[0.8125rem] leading-relaxed">{e.texto}</p>
          </Cartao>
        ))}
      </div>
      <p className="text-white/45 text-xs mt-5 max-w-2xl">
        A partir de 2027, o portfólio incorpora o Livro Maker físico, material de registro, reflexão e portfólio do
        aluno, e a Educação Infantil.
      </p>
    </Slide>,

    // 4 — homeschool
    <Slide key="homeschool" variante="dark">
      <Eyebrow>Segundo mercado</Eyebrow>
      <Titulo>O mesmo currículo, adaptado para famílias educadoras em comunidades de homeschooling.</Titulo>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9">
        {["Programação Criativa", "Robótica e Automação", "Engenharia e Prototipagem", "Modelagem e Impressão 3D"].map((t, i) => (
          <Cartao key={t} delay={i * 0.1}>
            <p className="text-white/85 text-[0.875rem] font-medium leading-snug">{t}</p>
          </Cartao>
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
            <span className="font-mono text-[0.75rem] text-[rgb(var(--color-brand-mint))] uppercase tracking-wider font-bold">
              Nível {i + 1} · {n}
            </span>
          </motion.div>
        ))}
      </div>
      <Cartao delay={0.75} className="mt-5 max-w-2xl">
        <p className="text-white/70 text-sm leading-relaxed">
          Entrega inteiramente digital, sem material físico nessa frente. Venda e cobrança conduzidas por uma
          parceira comercial já estabelecida no mercado de homeschooling, com negociação avançada em curso com a
          Aspen. Primeira venda projetada para 2027: 100 alunos, R$49.890,00.
        </p>
      </Cartao>
    </Slide>,

    // 5 — Academia We Make
    <Slide key="academia" variante="navy">
      <Eyebrow>Capítulo 6 · Formação docente</Eyebrow>
      <Titulo>A Academia We Make garante que o currículo não dependa apenas de bons materiais.</Titulo>
      <p className="text-white/60 text-sm sm:text-base max-w-2xl mt-6 leading-relaxed">
        Trilha de formação, mentoria e consultoria pedagógica incluída em todo contrato, escolar ou de família
        educadora. Opera em ciclo anual, com oito fases sequenciais que acompanham a escola do primeiro contato
        comercial ao fechamento do ano letivo.
      </p>
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
            <p className="font-mono text-[rgb(var(--color-brand-mint))] text-[0.6875rem] mb-1">{String(i + 1).padStart(2, "0")}</p>
            <p className="text-white/75 text-[0.75rem] leading-snug">{f}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-5 max-w-xl">
        Financiada pela mesma receita do Kit We Make, sem cobrança adicional: formação mal feita é tratada como
        risco maior ao negócio do que o custo de formar bem cada professor.
      </p>
    </Slide>,

    // 6 — por que agora (regulatório)
    <Slide key="por-que-agora" variante="royal">
      <Eyebrow>Por que agora</Eyebrow>
      <Titulo>A lei transformou a educação tecnológica de diferencial em exigência curricular.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
        {[
          { lei: "Lei nº 14.533/2023", texto: "Institui a Política Nacional de Educação Digital." },
          { lei: "Resolução CNE/CEB nº 2/2025", texto: "Complemento de Computação da BNCC, obrigatório do 1º ano do Fundamental ao 3º do Médio, a partir de 2026." },
          { lei: "Lei DF nº 7.796/2025", texto: "Cria os Centros Interescolares de Robótica no Distrito Federal, tendência que outros estados devem seguir." },
        ].map((c, i) => (
          <Cartao key={c.lei} delay={i * 0.15} className="border-l-2 border-l-[rgb(var(--color-brand-mint))]">
            <p className="font-mono text-[rgb(var(--color-brand-mint))] text-[0.75rem] uppercase tracking-wider font-bold mb-2">{c.lei}</p>
            <p className="text-white/75 text-sm leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
      <Cartao delay={0.55} className="mt-4">
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          O sistema We Make já incorpora, desde sua concepção curricular, os três eixos exigidos pela norma:
          pensamento computacional, cultura digital e mundo digital. Isso posiciona a empresa como resposta pronta
          a uma obrigatoriedade que a maioria das escolas confessionais ainda está em processo de atender.
        </p>
      </Cartao>
    </Slide>,

    // 7 — mercado / funil
    <Slide key="mercado" variante="navy">
      <Eyebrow>Tamanho de mercado</Eyebrow>
      <Titulo>Um nicho pouco disputado dentro de um setor de tecnologia educacional já maduro.</Titulo>
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
              <span className="text-white/60 text-[0.8125rem]">{f.label}</span>
              <span className={`font-mono font-bold tabular-nums text-sm ${f.destaque ? "text-[rgb(var(--color-brand-mint))]" : "text-white/70"}`}>
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
      <p className="text-white/45 text-xs mt-6 max-w-xl">
        Estimativa de planejamento. Recomenda-se estudo de dimensionamento cruzando microdados do Censo Escolar
        com bases de associações confessionais antes da consolidação definitiva das metas de participação de mercado.
      </p>
    </Slide>,

    // 8 — concorrência
    <Slide key="concorrencia" variante="dark">
      <Eyebrow>Concorrência</Eyebrow>
      <Titulo>Nenhum concorrente mapeado reproduz essa combinação de currículo, tecnologia e cosmovisão.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
        {[
          { cat: "Propostas confessionais", ex: "IDBIRD Educação", limite: "Escopo restrito: material pontual, sem currículo plurianual, plataforma ou assessoria." },
          { cat: "Sistemas seculares", ex: "Nave à Vela, ZOOM, Robomind, MundoMaker, Somai", limite: "Sem proposta confessional." },
          { cat: "Franquias diretas à família", ex: "Código Kid, SuperGeeks, Kodland, BYJU'S", limite: "Sem vínculo institucional com a escola." },
        ].map((c, i) => (
          <Cartao key={c.cat} delay={i * 0.15}>
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-white/40 font-bold mb-2">{c.cat}</p>
            <p className="font-display text-white text-[1.0625rem] mb-3">{c.ex}</p>
            <p className="text-white/55 text-[0.8125rem] leading-relaxed">{c.limite}</p>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 9 — equipe
    <Slide key="equipe" variante="royal">
      <Eyebrow>Capítulo 2 · Equipe</Eyebrow>
      <Titulo>Uma liderança pequena, com presença direta em cada etapa da entrega.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        {EQUIPE.map((p, i) => (
          <Cartao key={p.nome} delay={i * 0.07} className="flex items-start gap-3">
            <Avatar iniciais={p.nome.split(" ").filter((w) => w.length > 2).slice(0, 2).map((w) => w[0]).join("")} cor={p.cor} />
            <div className="min-w-0">
              <p className="text-white/90 text-[0.9375rem] font-medium leading-snug">{p.nome}</p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-wider mb-1.5" style={{ color: p.cor }}>{p.cargo}</p>
              <p className="text-white/55 text-[0.75rem] leading-relaxed">{p.texto}</p>
            </div>
          </Cartao>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-5 max-w-2xl">
        Estrutura hoje concentrada, o que garante agilidade nesta fase, com distribuição progressiva de
        responsabilidade prevista à medida que o sistema cresce.
      </p>
    </Slide>,

    // 10 — operações e tecnologia
    <Slide key="operacoes" variante="dark">
      <Eyebrow>Capítulo 7 · Estrutura e operações</Eyebrow>
      <Titulo>Tecnologia própria já em operação, não uma promessa de roadmap.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-9">
        {[
          { icone: Network, titulo: "CRM próprio", texto: "comercial.wemake.tec.br organiza prospecção, negociação e acompanhamento de contratos." },
          { icone: Layers, titulo: "Plataforma Arkos", texto: "Infraestrutura tecnológica e inteligência de negócio para gestão em tempo real." },
          { icone: Cpu, titulo: "Equipe própria", texto: "3 desenvolvedores e 1 cientista de dados, dedicados à evolução contínua da plataforma." },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={i * 0.12}>
            <c.icone className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
            <p className="font-display text-white text-[1.0625rem] mb-1.5">{c.titulo}</p>
            <p className="text-white/55 text-[0.8125rem] leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <Cartao delay={0.4}>
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Onboarding de escolas</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            12 horas, 2 dias, 3 formações: primeiro fundamentos de cosmovisão, depois metodologia, só então
            operação da plataforma e das ferramentas do espaço maker.
          </p>
        </Cartao>
        <Cartao delay={0.5}>
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Parceiros estratégicos</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            ACSI Brasil para acesso institucional, gráfica parceira em São Paulo para o Livro Maker, Aspen para a
            frente de homeschooling.
          </p>
        </Cartao>
      </div>
    </Slide>,

    // 11 — parcerias locais e repercussão
    <Slide key="parcerias-locais" variante="navy">
      <Eyebrow>Capítulo 7 · Repercussão local</Eyebrow>
      <Titulo>Olimpíadas e hackathons transformam relacionamento comercial em reputação de campo.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        <Cartao delay={0.1}>
          <Trophy className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Olimpíadas de tecnologia</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            Em fase de estruturação, para estimular a excelência técnica entre alunos das escolas parceiras e
            ampliar a visibilidade do sistema para além dos muros de cada instituição.
          </p>
        </Cartao>
        <Cartao delay={0.2}>
          <Trophy className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Hackathons</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            Problemas reais, premiação já testada: cada integrante da equipe vencedora recebe um leitor digital, e
            a equipe recebe uma semana de estágio em empresas de tecnologia parceiras.
          </p>
        </Cartao>
      </div>
      <p className="text-white/40 text-xs mt-5 max-w-2xl">
        A expansão dessas iniciativas segue o mesmo princípio: parcerias locais em troca de exposição da marca
        junto às comunidades escolares atendidas.
      </p>
    </Slide>,

    // 12 — marketing e metas de vendas
    <Slide key="metas-vendas" variante="royal">
      <Eyebrow>Capítulo 8 · Marketing e vendas</Eyebrow>
      <Titulo>Meta comercial única, medida por novas escolas e alunos alcançados a cada ano.</Titulo>
      <div className="mt-9 space-y-2.5 max-w-3xl">
        {[
          { ano: 2027, escolas: 10, largura: 45 },
          { ano: 2028, escolas: 13, largura: 59 },
          { ano: 2029, escolas: 16, largura: 73 },
          { ano: 2030, escolas: 19, largura: 86 },
          { ano: 2031, escolas: 22, largura: 100 },
        ].map((r, i) => (
          <motion.div
            key={r.ano}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <span className="font-mono text-white/50 text-[0.75rem] w-10 shrink-0">{r.ano}</span>
            <div className="flex-1 h-6 rounded-lg bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-lg bg-[rgb(var(--color-brand-mint))] flex items-center justify-end px-2"
                initial={{ width: 0 }}
                whileInView={{ width: `${r.largura}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-[0.6875rem] font-bold text-[rgb(var(--color-brand-navy))]">{r.escolas}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-white/50 text-sm max-w-2xl mt-6 leading-relaxed">
        80 novas escolas entre 2027 e 2031, cenário-base de 5% a 8% do mercado-alvo confessional até 2031, o
        equivalente a 75 a 80 escolas ativas. Funil direto e consultivo, gerido de ponta a ponta pelo CRM próprio,
        sem representantes ou revendedores.
      </p>
    </Slide>,

    // 13 — SWOT
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
                <li key={it} className="text-white/65 text-[0.8125rem] leading-relaxed flex gap-2">
                  <span style={{ color: q.cor }}>·</span>{it}
                </li>
              ))}
            </ul>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 14 — financeiro: gráfico animado
    <Slide key="financeiro" variante="navy">
      <Eyebrow>Projeção financeira</Eyebrow>
      <Titulo>Receita projetada, 2027 a 2031</Titulo>
      <div className="mt-8">
        <GraficoTendencia anos={anos} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        <Cartao delay={0.1}>
          <p className="font-display text-white text-2xl"><NumeroAnimado valor={receitaTotal2027} prefixo="R$ " /></p>
          <p className="text-white/50 text-[0.75rem] mt-1">Receita 2027</p>
        </Cartao>
        <Cartao delay={0.2}>
          <p className="font-display text-[rgb(var(--color-brand-mint))] text-2xl"><NumeroAnimado valor={ultimoAno?.receita ?? 0} prefixo="R$ " /></p>
          <p className="text-white/50 text-[0.75rem] mt-1">Receita 2031, cenário-base</p>
        </Cartao>
        <Cartao delay={0.3}>
          <p className="font-display text-[rgb(var(--color-brand-mint))] text-2xl"><NumeroAnimado valor={ultimoAno?.resultado ?? 0} prefixo="R$ " /></p>
          <p className="text-white/50 text-[0.75rem] mt-1">Resultado 2031, cenário-base</p>
        </Cartao>
        <Cartao delay={0.4}>
          <p className="font-display text-white text-2xl"><NumeroAnimado valor={ultimoAno?.margemPct ?? 0} sufixo="%" casas={1} /></p>
          <p className="text-white/50 text-[0.75rem] mt-1">Margem projetada 2031</p>
        </Cartao>
      </div>
    </Slide>,

    // 15 — despesas 2027
    <Slide key="despesas" variante="dark">
      <Eyebrow>Capítulo 9 · Estrutura de despesas</Eyebrow>
      <Titulo>Onde vai cada real do orçamento de 2027.</Titulo>
      <div className="mt-9 space-y-2.5 max-w-3xl">
        {[
          { cat: "Pessoal, CLT e PJ recorrente", pct: 41.5 },
          { cat: "Produção gráfica e impressão", pct: 21.3 },
          { cat: "Taxas e serviços financeiros", pct: 13.2 },
          { cat: "Tecnologia, inclui Plataforma Arkos", pct: 5.3 },
          { cat: "Infraestrutura e utilidades", pct: 5.3 },
          { cat: "Marketing e publicidade", pct: 4.7 },
          { cat: "Demais categorias", pct: 8.7 },
        ].map((d, i) => (
          <motion.div
            key={d.cat}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="flex items-baseline justify-between mb-1.5 gap-3">
              <span className="text-white/60 text-[0.8125rem]">{d.cat}</span>
              <span className="font-mono font-bold tabular-nums text-sm text-white/70">{d.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[rgb(var(--color-brand-royal))]"
                initial={{ width: 0 }}
                whileInView={{ width: `${d.pct * 2.2}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-6 max-w-xl">
        Despesa total de R$844.365,14 em 2027, já incorporando pró-labore da liderança, equipe de tecnologia
        própria e produção do Livro Maker.
      </p>
    </Slide>,

    // 16 — riscos
    <Slide key="riscos" variante="royal">
      <Eyebrow>Governança e risco</Eyebrow>
      <Titulo>Nenhum risco listado é, isoladamente, impeditivo do plano.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
        {[
          { risco: "Dependência de liderança central", prob: "Alta", impacto: "Alto", prazo: "Imediata" },
          { risco: "Propriedade intelectual sem registro confirmado", prob: "Média", impacto: "Alto", prazo: "Imediata" },
          { risco: "Maturidade desigual entre linhas", prob: "Alta", impacto: "Médio", prazo: "Imediata" },
          { risco: "Uso indevido de conteúdo por IA de terceiros", prob: "Baixa", impacto: "Médio", prazo: "No ciclo de 2027" },
          { risco: "Regulação do homeschooling", prob: "Baixa", impacto: "Alto", prazo: "Monitoramento contínuo" },
          { risco: "Concorrência e pressão de custo", prob: "Média", impacto: "Médio", prazo: "No ciclo de 2027" },
        ].map((r, i) => (
          <Cartao key={r.risco} delay={i * 0.08} className="flex items-start gap-3">
            <ShieldAlert className="size-5 text-[rgb(var(--color-brand-sky))] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-white/85 text-sm font-medium mb-1.5">{r.risco}</p>
              <p className="text-white/45 text-[0.75rem] font-mono">
                Prob. {r.prob} · Impacto {r.impacto} · {r.prazo}
              </p>
            </div>
          </Cartao>
        ))}
      </div>
    </Slide>,

    // 17 — crescimento futuro
    <Slide key="crescimento-futuro" variante="dark">
      <Eyebrow>Capítulo 12 · Estratégia de crescimento futuro</Eyebrow>
      <Titulo>Dois negócios futuros, condicionados à consolidação do sistema atual.</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-9">
        <Cartao delay={0.1}>
          <School className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Escola de tecnologia</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            Abrangência nacional, atende diretamente crianças e adolescentes, sem exigir vínculo com escola
            parceira. Ano 4 do plano, 2030.
          </p>
        </Cartao>
        <Cartao delay={0.2}>
          <Building2 className="size-5 text-[rgb(var(--color-brand-mint))] mb-3" strokeWidth={1.75} />
          <p className="font-display text-white text-[1.0625rem] mb-1.5">Faculdade de tecnologia</p>
          <p className="text-white/55 text-[0.8125rem] leading-relaxed">
            Extensão da proposta em nível superior, possibilidade a ser buscada, não frente já decidida. Depende de
            credenciamento junto ao MEC e sustentada pela parceria com a FICV.
          </p>
        </Cartao>
      </div>
      <Cartao delay={0.4} className="mt-3">
        <p className="text-white/70 text-sm leading-relaxed">
          Toda a receita projetada entre 2027 e 2031 vem do sistema já existente. Os dois negócios futuros são o
          horizonte que esse sistema torna possível a partir do quarto ano, condicionados à consolidação da
          governança, à validação de demanda e à conclusão do registro de propriedade intelectual.
        </p>
      </Cartao>
    </Slide>,

    // 18 — capital externo: aceleração, não sobrevivência
    <Slide key="capital-externo" variante="royal">
      <Eyebrow>Sobre capital externo</Eyebrow>
      <Titulo>Uma trajetória construída sem dívida, em que capital é aceleração, não sobrevivência.</Titulo>

      <motion.div
        className="mt-9 rounded-2xl bg-[rgb(var(--color-brand-ivory))] text-[rgb(var(--color-brand-navy))] p-6 sm:p-8 max-w-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[rgb(var(--color-brand-royal))] font-bold mb-3">
          Ponto de partida
        </p>
        <p className="font-display text-[1.05rem] sm:text-[1.25rem] leading-snug">
          A trajetória descrita neste plano foi construída, até aqui, com recursos próprios, sem dívida ou passivo
          relevante a sustentar. A pergunta não é se a We Make chega ao horizonte de cinco anos deste plano
          sozinha, mas se um investidor deseja antecipar esse horizonte para dois ou três anos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 max-w-3xl">
        {[
          { titulo: "Equipe comercial", texto: "Fortalecimento imediato da estrutura de aquisição, com mais capacidade de busca ativa e qualificação de novas escolas." },
          { titulo: "Consultoria pedagógica", texto: "Investimento mais robusto na Academia We Make, elevando a experiência de pós-venda de escolas e famílias já atendidas." },
        ].map((c, i) => (
          <Cartao key={c.titulo} delay={0.15 + i * 0.12}>
            <p className="font-display text-white text-[1.0625rem] mb-2">{c.titulo}</p>
            <p className="text-white/60 text-[0.8125rem] leading-relaxed">{c.texto}</p>
          </Cartao>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-5 max-w-2xl">
        Prioridades de alocação caso a aceleração se concretize, inspiração, não orçamento aprovado. Devem ser
        tratadas com o mesmo rigor de conciliação já aplicado às demais estimativas deste plano.
      </p>
    </Slide>,

    // 19 — fechamento
    <Slide key="fechamento" variante="dark">
      <div className="flex flex-col items-start">
        <Sparkles className="size-8 text-[rgb(var(--color-brand-mint))] mb-6" strokeWidth={1.5} />
        <Titulo>Educação tecnológica com sabedoria, para a glória de Deus e o bem do próximo.</Titulo>
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
          <Image src="/photos/2.png" alt="We Make" width={150} height={45} className="h-9 w-auto object-contain" />
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

  useEffect(() => {
    function onFsChange() {
      setTelaCheia(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function alternarTelaCheia() {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen().catch(() => {});
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
      className="relative w-full bg-[rgb(var(--color-brand-navy))] text-white select-none"
      style={{ height: telaCheia ? "100vh" : "min(100vh, 780px)" }}
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
        <span className="font-mono text-[0.6875rem] text-white/40 tabular-nums hidden sm:inline">
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
