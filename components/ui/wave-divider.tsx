/* ──────────────────────────────────────────────────────────
   WaveDivider — A onda É A COR DE CIMA, sobre o fundo de baixo.
   Lógica: container bg = toColor (abaixo), path fill = fromColor (acima).
   Cada variante tem uma forma diferente para não repetir.
────────────────────────────────────────────────────────── */

type Props = {
  /** Cor de fundo da seção ACIMA */
  fromColor: string;
  /** Cor de fundo da seção ABAIXO */
  toColor: string;
  /** Variante de forma (1–6) */
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Altura da onda em px */
  height?: number;
  /** Cor sólida opcional para a onda de sobretom (sombra/brilho de transição) */
  shadowColor?: string;
};

/* Paths diferentes — todos com viewBox 0 0 1440 80 */
const WAVE_PATHS: Record<number, string> = {
  // Curva suave dupla — S clássico
  1: "M0,48 C240,80 480,0 720,40 C960,80 1200,8 1440,48 L1440,80 L0,80 Z",

  // Curva profunda assimétrica
  2: "M0,16 C200,72 450,0 700,56 C850,88 1100,4 1440,32 L1440,80 L0,80 Z",

  // Onda lenta e larga — quase senoidal
  3: "M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,56 L1440,80 L0,80 Z",

  // Dois picos — mais agitado
  4: "M0,40 C120,80 300,0 480,48 C660,80 840,8 1020,56 C1200,88 1360,16 1440,40 L1440,80 L0,80 Z",

  // Suave inclinado — quase diagonal com bump
  5: "M0,72 C180,40 420,80 720,32 C1020,-16 1260,64 1440,24 L1440,80 L0,80 Z",

  // Três ondas curtas — mais dinâmico
  6: "M0,32 C120,64 240,8 400,48 C560,80 680,16 880,52 C1080,88 1260,20 1440,44 L1440,80 L0,80 Z",
};

export function WaveDivider({
  fromColor,
  toColor,
  variant = 1,
  height = 80,
  shadowColor,
}: Props) {
  const d = WAVE_PATHS[variant] ?? WAVE_PATHS[1];
  
  // Usa uma variante diferente para a onda de sobretom para criar um efeito orgânico de dupla camada
  const shadowVariant = (variant % 6) + 1;
  const dShadow = WAVE_PATHS[shadowVariant];

  // Se shadowColor for passada explicitamente, usamos com 100% de opacidade (cor sólida de sobretom).
  // Caso contrário, usamos um fallback sutil baseado na opacidade.
  const hasCustomShadow = typeof shadowColor === "string" && shadowColor !== "";
  
  const isDark = 
    fromColor.toLowerCase() === "#0b1f44" || 
    fromColor.toLowerCase() === "#021014" || 
    fromColor.toLowerCase() === "#010c12" || 
    fromColor.toLowerCase() === "#2a69ba";

  const shadowFill = hasCustomShadow ? shadowColor! : (isDark ? "white" : "black");
  const shadowOpacity = hasCustomShadow ? 1 : (isDark ? 0.04 : 0.08);

  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden leading-[0] pointer-events-none"
      style={{
        backgroundColor: fromColor,   // O fundo do container AGORA É A COR DE CIMA (transição perfeita)
        height,
        marginTop: -1,
        marginBottom: -1,
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
      >
        {/* Camada 1: Sobretom orgânico (onda secundária por trás) */}
        <path 
          d={dShadow} 
          fill={shadowFill} 
          opacity={shadowOpacity} 
        />
        
        {/* Camada 2: Onda principal com a COR DE BAIXO (fecha o fluxo visual) */}
        <path d={d} fill={toColor} />
      </svg>
    </div>
  );
}
