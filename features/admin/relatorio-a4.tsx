import type { BlocoConteudo, CapituloRelatorio } from "@/data/plano-negocio-relatorio";

function Bloco({ bloco }: { bloco: BlocoConteudo }) {
  switch (bloco.tipo) {
    case "paragrafo":
      return <p className="ra4-p">{bloco.texto}</p>;
    case "subtitulo":
      return <h3 className="ra4-subtitulo">{bloco.texto}</h3>;
    case "lista":
      return (
        <ul className="ra4-lista">
          {bloco.itens.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "tabela":
      return (
        <div className="ra4-tabela-wrap">
          {bloco.legenda && <p className="ra4-tabela-legenda">{bloco.legenda}</p>}
          <table className="ra4-tabela">
            <thead>
              <tr>
                {bloco.cabecalho.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i}>
                  {linha.map((cel, j) => (
                    <td key={j}>{cel}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "stats":
      return (
        <div className="ra4-stats">
          {bloco.itens.map((s, i) => (
            <div key={i} className="ra4-stat">
              <p className="ra4-stat-valor">{s.valor}</p>
              <p className="ra4-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      );
    case "destaque":
      return (
        <div className="ra4-destaque">
          <p className="ra4-destaque-titulo">{bloco.titulo}</p>
          <p className="ra4-destaque-texto">{bloco.texto}</p>
        </div>
      );
    case "citacao":
      return (
        <blockquote className="ra4-citacao">
          <p>{bloco.texto}</p>
          {bloco.atribuicao && <cite>{bloco.atribuicao}</cite>}
        </blockquote>
      );
    default:
      return null;
  }
}

export function RelatorioA4({ capitulos }: { capitulos: CapituloRelatorio[] }) {
  return (
    <div className="ra4-doc">
      <RelatorioA4Estilos />

      <section className="ra4-capa">
        <p className="ra4-capa-eyebrow">Plano de Negócio · 2027–2031</p>
        <h1 className="ra4-capa-titulo">We Make Educação Tecnológica</h1>
        <p className="ra4-capa-sub">
          O primeiro sistema de educação tecnológica com cosmovisão cristã do Brasil
        </p>
        <div className="ra4-capa-rodape">
          <span>We Make Educação Tecnológica LTDA · CNPJ 48.760.895/0001-99</span>
          <span>Documento confidencial · Elaborado pela direção estratégica</span>
        </div>
      </section>

      <section className="ra4-sumario">
        <p className="ra4-sumario-eyebrow">Sumário</p>
        <ol className="ra4-sumario-lista">
          {capitulos.map((cap) => (
            <li key={cap.id}>
              <span className="ra4-sumario-num">{String(cap.numero).padStart(2, "0")}</span>
              <span>{cap.titulo}</span>
            </li>
          ))}
        </ol>
      </section>

      {capitulos.map((cap) => (
        <section key={cap.id} className="ra4-capitulo" id={cap.id}>
          <header className="ra4-capitulo-header">
            <span className="ra4-capitulo-num">{String(cap.numero).padStart(2, "0")}</span>
            <h2 className="ra4-capitulo-titulo">{cap.titulo}</h2>
          </header>

          {cap.secoes.map((secao) => (
            <div key={secao.id} className="ra4-secao">
              {secao.titulo !== cap.titulo && (
                <h3 className="ra4-secao-titulo">{secao.titulo}</h3>
              )}
              {secao.blocos.map((bloco, j) => (
                <Bloco key={j} bloco={bloco} />
              ))}
            </div>
          ))}
        </section>
      ))}

      <footer className="ra4-rodape-final">
        <p>We Make Educação Tecnológica · Plano de Negócio 2027–2031 · Documento Confidencial</p>
      </footer>
    </div>
  );
}

function RelatorioA4Estilos() {
  return (
    <style>{`
      .ra4-doc {
        --ra4-navy: rgb(var(--color-brand-navy));
        --ra4-royal: rgb(var(--color-brand-royal));
        --ra4-mint: rgb(var(--color-brand-mint));
        --ra4-ivory: rgb(var(--color-brand-ivory));
        max-width: 900px;
        margin: 0 auto;
        background: #fff;
        color: #1a2233;
      }

      .ra4-capa {
        min-height: min(100vh, 1000px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        padding: 3rem 1.5rem;
        background: linear-gradient(160deg, var(--ra4-navy) 0%, #0a1730 55%, #081227 100%);
        color: #fff;
        page-break-after: always;
        break-after: page;
        position: relative;
        overflow: hidden;
      }
      .ra4-capa::before {
        content: "";
        position: absolute;
        top: -20%;
        right: -15%;
        width: 60%;
        height: 60%;
        background: radial-gradient(circle, rgba(118,243,205,0.16), transparent 70%);
        pointer-events: none;
      }
      .ra4-capa-eyebrow {
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: 0.75rem;
        color: var(--ra4-mint);
        font-weight: 700;
        position: relative;
      }
      .ra4-capa-titulo {
        font-family: var(--font-display);
        font-size: clamp(2.25rem, 6vw, 3.5rem);
        line-height: 1.05;
        max-width: 14ch;
        position: relative;
      }
      .ra4-capa-sub {
        font-size: clamp(1rem, 2.2vw, 1.25rem);
        color: rgba(255,255,255,0.75);
        max-width: 42ch;
        position: relative;
      }
      .ra4-capa-rodape {
        margin-top: 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: rgba(255,255,255,0.5);
        position: relative;
      }

      .ra4-sumario {
        padding: 3rem 1.5rem;
        page-break-after: always;
        break-after: page;
      }
      .ra4-sumario-eyebrow {
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.75rem;
        color: var(--ra4-royal);
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .ra4-sumario-lista {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
      }
      .ra4-sumario-lista li {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        padding: 0.85rem 0;
        border-bottom: 1px solid #e7e9f0;
        font-family: var(--font-display);
        font-size: 1.15rem;
      }
      .ra4-sumario-num {
        font-family: var(--font-mono);
        color: var(--ra4-royal);
        font-size: 0.85rem;
        font-weight: 700;
        min-width: 2ch;
      }

      .ra4-capitulo {
        padding: 3rem 1.5rem 1rem;
        page-break-before: always;
        break-before: page;
      }
      .ra4-capitulo-header {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        border-bottom: 3px solid var(--ra4-royal);
        padding-bottom: 0.75rem;
        margin-bottom: 1.75rem;
      }
      .ra4-capitulo-num {
        font-family: var(--font-mono);
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--ra4-royal);
      }
      .ra4-capitulo-titulo {
        font-family: var(--font-display);
        font-size: clamp(1.5rem, 3.5vw, 2rem);
        color: var(--ra4-navy);
        line-height: 1.15;
      }

      .ra4-secao { margin-bottom: 1.75rem; break-inside: avoid-page; }
      .ra4-secao-titulo {
        font-family: var(--font-display);
        font-size: 1.15rem;
        color: var(--ra4-navy);
        margin-bottom: 0.75rem;
        font-style: italic;
      }
      .ra4-subtitulo {
        font-family: var(--font-display);
        font-size: 1rem;
        font-weight: 700;
        color: var(--ra4-royal);
        margin: 1.25rem 0 0.5rem;
      }
      .ra4-p {
        font-size: 0.9375rem;
        line-height: 1.7;
        color: #2a3244;
        margin: 0 0 0.9rem;
        max-width: 68ch;
        text-align: justify;
        text-justify: inter-word;
        hyphens: auto;
      }
      .ra4-lista {
        margin: 0 0 0.5rem;
        padding-left: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .ra4-lista li {
        font-size: 0.9375rem;
        line-height: 1.65;
        color: #2a3244;
        text-align: justify;
        text-justify: inter-word;
      }

      .ra4-tabela-wrap { margin: 0.5rem 0 1.25rem; break-inside: avoid-page; overflow-x: auto; }
      .ra4-tabela-legenda {
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.7rem;
        color: #6b7488;
        margin-bottom: 0.4rem;
      }
      .ra4-tabela { width: 100%; border-collapse: collapse; font-size: 0.8125rem; min-width: 480px; }
      .ra4-tabela th {
        text-align: left;
        background: var(--ra4-navy);
        color: #fff;
        padding: 0.5rem 0.65rem;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .ra4-tabela td {
        padding: 0.5rem 0.65rem;
        border-bottom: 1px solid #e7e9f0;
        color: #2a3244;
        vertical-align: top;
      }
      .ra4-tabela tr:last-child td { font-weight: 700; border-bottom: 2px solid var(--ra4-navy); }

      .ra4-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        margin: 0.75rem 0 1.5rem;
        break-inside: avoid-page;
      }
      .ra4-stat {
        border: 1px solid #e2e6ef;
        border-left: 3px solid var(--ra4-mint);
        border-radius: 4px;
        padding: 0.65rem 0.75rem;
        background: #f7f9fc;
      }
      .ra4-stat-valor {
        font-family: var(--font-display);
        font-size: 1.15rem;
        color: var(--ra4-navy);
        font-variant-numeric: tabular-nums;
      }
      .ra4-stat-label {
        font-size: 0.6875rem;
        color: #6b7488;
        margin-top: 0.15rem;
      }

      .ra4-destaque {
        border-left: 3px solid var(--ra4-royal);
        background: #f4f6fc;
        padding: 0.9rem 1.1rem;
        margin: 0.5rem 0 1.25rem;
        border-radius: 0 6px 6px 0;
        break-inside: avoid-page;
      }
      .ra4-destaque-titulo {
        font-family: var(--font-mono);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.6875rem;
        color: var(--ra4-royal);
        font-weight: 700;
        margin-bottom: 0.3rem;
      }
      .ra4-destaque-texto { font-size: 0.875rem; line-height: 1.6; color: #2a3244; text-align: justify; text-justify: inter-word; }

      .ra4-citacao {
        border-left: 3px solid var(--ra4-navy);
        padding-left: 1rem;
        margin: 1rem 0;
        font-style: italic;
        color: #444d61;
      }

      .ra4-rodape-final {
        padding: 2rem 1.5rem;
        text-align: center;
        font-size: 0.75rem;
        color: #9aa1b3;
        border-top: 1px solid #e7e9f0;
      }

      @media (max-width: 640px) {
        .ra4-capa, .ra4-sumario, .ra4-capitulo { padding-left: 1.1rem; padding-right: 1.1rem; }
        .ra4-stats { grid-template-columns: 1fr 1fr; }
        .ra4-tabela { font-size: 0.75rem; }
      }

      @media print {
        .ra4-doc { max-width: none; }
        .ra4-capa, .ra4-sumario, .ra4-capitulo { padding: 1.6cm; }
        @page { size: A4; margin: 0; }
      }
    `}</style>
  );
}
