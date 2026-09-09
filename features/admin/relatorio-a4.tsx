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
            case "organograma":
      return (
        <div className="ra4-org-wrap">
          <h4 className="ra4-visual-title">Organograma de Governança Executiva &amp; Líderes de Área</h4>
          <div className="ra4-org-ceo">
            <div className="ra4-org-badge">CEO</div>
            <div>
              <strong className="ra4-org-name">Dênis Júlio Pereira Francisco</strong>
              <p className="ra4-org-role">CEO &amp; Diretor Pedagógico (Estratégia, P&amp;D, Cosmovisão e Parcerias)</p>
            </div>
          </div>
          <div className="ra4-org-line-v"></div>
          <div className="ra4-org-grid">
            <div className="ra4-org-card">
              <span className="ra4-dept-title">Gestão &amp; Operações</span>
              <strong>Renato Assis</strong>
              <span>Gerente Administrativo &amp; Financeiro</span>
              <strong style={{ marginTop: '6px' }}>Iran Firmino</strong>
              <span>Contabilidade &amp; Compliance Fiscal</span>
            </div>
            <div className="ra4-org-card">
              <span className="ra4-dept-title">Pedagogia &amp; Formação</span>
              <strong>Suzana Bonifazio</strong>
              <span>Consultora Pedagógica &amp; Onboarding</span>
              <strong style={{ marginTop: '6px' }}>Emanuela Monteiro</strong>
              <span>Consultora Pedagógica &amp; Negócios</span>
            </div>
            <div className="ra4-org-card">
              <span className="ra4-dept-title">Marketing &amp; Expansão</span>
              <strong>Emanuel Peixoto</strong>
              <span>Analista de Marketing &amp; Campanhas</span>
              <strong style={{ marginTop: '6px' }}>Christiano Bonifazio</strong>
              <span>Rep. Comercial SP (Expansão B2B)</span>
              <strong style={{ marginTop: '6px' }}>Atendimento Comercial</strong>
              <span>CRM &amp; Qualificação de Leads</span>
            </div>
            <div className="ra4-org-card">
              <span className="ra4-dept-title">Tecnologia &amp; P&amp;D</span>
              <strong>Engenharia Arkos (3 Devs)</strong>
              <span>Plataforma LMS &amp; Nuvem</span>
              <strong style={{ marginTop: '6px' }}>Cientista de Dados</strong>
              <span>Analytics &amp; Métricas de Negócio</span>
            </div>
          </div>
        </div>
      );
    case "mapa-ibge": {
      const estados = [
        { uf: "Paraná", sigla: "PR", escolas: 8 },
        { uf: "São Paulo", sigla: "SP", escolas: 3 },
        { uf: "Santa Catarina", sigla: "SC", escolas: 2 },
        { uf: "Paraíba", sigla: "PB", escolas: 2 },
        { uf: "Espírito Santo", sigla: "ES", escolas: 1 },
        { uf: "Maranhão", sigla: "MA", escolas: 1 },
        { uf: "Rio Grande do Sul", sigla: "RS", escolas: 1 },
        { uf: "Rio Grande do Norte", sigla: "RN", escolas: 1 },
        { uf: "Ceará", sigla: "CE", escolas: 1 },
      ];
      const max = Math.max(...estados.map((e) => e.escolas));
      return (
        <div className="ra4-map-wrap">
          <h4 className="ra4-visual-title">Distribuição geográfica das escolas contratantes</h4>
          <p className="ra4-map-nota">
            20 das 23 escolas do orçamento de 2027 têm cidade e UF confirmados no cadastro comercial; as 3
            restantes ainda não entram nesta distribuição.
          </p>
          <div className="ra4-map-legend">
            {estados.map((e) => (
              <div key={e.sigla} className="ra4-map-item">
                <span className="ra4-map-item-label"><strong>{e.uf}</strong> ({e.sigla})</span>
                <div className="ra4-map-bar-track">
                  <div className="ra4-map-bar-fill" style={{ width: `${(e.escolas / max) * 100}%` }} />
                </div>
                <span className="ra4-map-item-valor">{e.escolas}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "galeria-livros":
      return (
        <div className="ra4-books-wrap">
          <h4 className="ra4-visual-title">Coleção Livro Maker, amostras da Educação Infantil ao Ensino Médio</h4>
          <div className="ra4-books-grid">
            <div className="ra4-book-card">
              <img src="/img/livros/infantil-5.jpg" alt="Capa do Livro Maker, Educação Infantil" className="ra4-book-img" />
              <span>Educação Infantil</span>
            </div>
            <div className="ra4-book-card">
              <img src="/img/livros/1ano-ef.jpg" alt="Capa do Livro Maker, 1º Ano do Ensino Fundamental" className="ra4-book-img" />
              <span>1º Ano, Ensino Fundamental</span>
            </div>
            <div className="ra4-book-card">
              <img src="/img/livros/6ano.jpg" alt="Capa do Livro Maker, 6º Ano, Anos Finais" className="ra4-book-img" />
              <span>6º Ano, Anos Finais</span>
            </div>
            <div className="ra4-book-card">
              <img src="/img/livros/1ano-em.jpg" alt="Capa do Livro Maker, 1º Ano do Ensino Médio" className="ra4-book-img" />
              <span>1º Ano, Ensino Médio</span>
            </div>
          </div>
        </div>
      );
    case "ciclo-maker":
      return (
        <div className="ra4-flow-wrap">
          <h4 className="ra4-visual-title">Momento Criar: ciclo de aprendizagem de 6 etapas</h4>
          <div className="ra4-flow-steps">
            {["Identificar", "Imaginar", "Planejar", "Construir", "Testar", "Compartilhar"].map((etapa, i, arr) => (
              <div key={etapa} className="ra4-flow-step-group">
                <div className="ra4-flow-step">
                  <span className="ra4-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{etapa}</strong>
                </div>
                {i < arr.length - 1 && <div className="ra4-flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      );
    case "imagem":
      return (
        <div className="ra4-img-box">
          <img src={bloco.url} alt={bloco.legenda || "Imagem ilustrativa"} className="ra4-clean-img" />
          {bloco.legenda && <p className="ra4-img-caption">{bloco.legenda}</p>}
        </div>
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
        --ra4-navy: #002933;
        --ra4-teal: #003B49;
        --ra4-cyan: #00CEFF;
        --ra4-ivory: #F4F3EF;
        max-width: 900px;
        margin: 0 auto;
        background: #fff;
        color: #1a2233;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: clamp(0.9rem, 0.86rem + 0.2vw, 1rem);
        line-height: 1.6;
      }

      /* ===== Capa ===== */
      .ra4-capa {
        min-height: clamp(420px, 70vh, 900px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        padding: clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3rem);
        background: linear-gradient(160deg, #002933 0%, #003B49 100%);
        color: #fff;
        page-break-after: always;
        break-after: page;
      }
      .ra4-capa-eyebrow {
        font-size: clamp(0.7rem, 0.65rem + 0.2vw, 0.85rem);
        color: #00CEFF;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .ra4-capa-titulo {
        font-size: clamp(1.75rem, 1.3rem + 3.5vw, 3rem);
        line-height: 1.1;
        font-weight: 800;
        color: #F4F3EF;
      }
      .ra4-capa-sub {
        font-size: clamp(1rem, 0.9rem + 0.6vw, 1.25rem);
        color: #94B4BD;
        max-width: 32ch;
      }
      .ra4-capa-rodape {
        margin-top: clamp(2rem, 5vw, 4rem);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.75rem;
        color: rgba(244,243,239,0.6);
      }

      /* ===== Sumário ===== */
      .ra4-sumario {
        padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 3rem);
        background: var(--ra4-ivory);
        page-break-after: always;
        break-after: page;
      }
      .ra4-sumario-eyebrow {
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ra4-teal);
        margin-bottom: 1rem;
      }
      .ra4-sumario-lista {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.65rem;
      }
      .ra4-sumario-lista li {
        display: flex;
        align-items: baseline;
        gap: 0.85rem;
        padding-bottom: 0.65rem;
        border-bottom: 1px solid rgba(0,41,51,0.12);
        font-size: clamp(0.85rem, 0.8rem + 0.2vw, 1rem);
        color: var(--ra4-navy);
      }
      .ra4-sumario-num {
        font-family: ui-monospace, monospace;
        font-weight: 700;
        color: var(--ra4-cyan);
        background: var(--ra4-navy);
        border-radius: 4px;
        padding: 0.1rem 0.4rem;
        font-size: 0.75rem;
        flex-shrink: 0;
      }

      /* ===== Capítulo e seção ===== */
      .ra4-capitulo {
        padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 3rem);
        page-break-before: always;
        break-before: page;
      }
      .ra4-capitulo:first-of-type {
        page-break-before: auto;
        break-before: auto;
      }
      .ra4-capitulo-header {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        border-bottom: 3px solid var(--ra4-navy);
        padding-bottom: 0.85rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .ra4-capitulo-num {
        font-family: ui-monospace, monospace;
        font-size: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
        font-weight: 800;
        color: var(--ra4-cyan);
        -webkit-text-stroke: 1px var(--ra4-navy);
      }
      .ra4-capitulo-titulo {
        font-size: clamp(1.15rem, 1rem + 1vw, 1.75rem);
        font-weight: 800;
        color: var(--ra4-navy);
        line-height: 1.2;
      }
      .ra4-secao {
        margin-bottom: 2rem;
      }
      .ra4-secao-titulo {
        font-size: clamp(1rem, 0.92rem + 0.4vw, 1.15rem);
        font-weight: 700;
        color: var(--ra4-teal);
        margin: 0 0 0.85rem;
        padding-left: 0.75rem;
        border-left: 3px solid var(--ra4-cyan);
      }

      /* ===== Blocos de conteúdo ===== */
      .ra4-p {
        margin: 0 0 1rem;
        color: #29323F;
        line-height: 1.7;
      }
      .ra4-subtitulo {
        font-size: clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem);
        font-weight: 800;
        color: var(--ra4-navy);
        margin: 1.25rem 0 0.5rem;
      }
      .ra4-lista {
        margin: 0 0 1rem;
        padding-left: 1.25rem;
        display: grid;
        gap: 0.4rem;
      }
      .ra4-lista li {
        color: #29323F;
        line-height: 1.6;
      }
      .ra4-lista li::marker {
        color: var(--ra4-cyan);
      }

      .ra4-tabela-wrap {
        margin: 0 0 1.25rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border-radius: 10px;
        border: 1px solid #E2E8F0;
      }
      .ra4-tabela-legenda {
        font-size: 0.8rem;
        color: #64748B;
        padding: 0.6rem 0.85rem 0;
      }
      .ra4-tabela {
        width: 100%;
        min-width: 480px;
        border-collapse: collapse;
        font-size: clamp(0.75rem, 0.7rem + 0.15vw, 0.85rem);
      }
      .ra4-tabela thead th {
        background: var(--ra4-navy);
        color: #fff;
        text-align: left;
        padding: 0.6rem 0.85rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .ra4-tabela tbody td {
        padding: 0.55rem 0.85rem;
        border-bottom: 1px solid #E2E8F0;
        color: #29323F;
      }
      .ra4-tabela tbody tr:last-child td {
        border-bottom: none;
      }
      .ra4-tabela tbody tr:nth-child(even) {
        background: #F8FAFC;
      }
      .ra4-tabela tbody tr:last-child {
        font-weight: 700;
        background: var(--ra4-ivory);
      }

      .ra4-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 0.75rem;
        margin: 0 0 1.25rem;
      }
      .ra4-stat {
        background: var(--ra4-ivory);
        border: 1px solid #E2E8F0;
        border-radius: 10px;
        padding: 0.85rem 1rem;
        border-top: 3px solid var(--ra4-cyan);
      }
      .ra4-stat-valor {
        margin: 0;
        font-size: clamp(1.1rem, 1rem + 0.5vw, 1.4rem);
        font-weight: 800;
        color: var(--ra4-navy);
      }
      .ra4-stat-label {
        margin: 0.2rem 0 0;
        font-size: 0.75rem;
        color: #64748B;
      }

      .ra4-destaque {
        margin: 0 0 1.25rem;
        background: var(--ra4-navy);
        color: #fff;
        border-radius: 12px;
        padding: 1.1rem 1.35rem;
        border-left: 4px solid var(--ra4-cyan);
      }
      .ra4-destaque-titulo {
        margin: 0 0 0.4rem;
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ra4-cyan);
      }
      .ra4-destaque-texto {
        margin: 0;
        line-height: 1.6;
        color: rgba(255,255,255,0.9);
      }

      .ra4-citacao {
        margin: 0 0 1.25rem;
        padding: 0.25rem 0 0.25rem 1.25rem;
        border-left: 3px solid var(--ra4-cyan);
        font-style: italic;
        color: #334155;
      }
      .ra4-citacao p {
        margin: 0 0 0.4rem;
      }
      .ra4-citacao cite {
        display: block;
        font-style: normal;
        font-size: 0.8rem;
        color: #64748B;
      }

      /* ===== Rodapé final ===== */
      .ra4-rodape-final {
        padding: 2rem clamp(1.25rem, 5vw, 3rem);
        background: #0E2A47;
        color: #A9C2DA;
        font-size: 0.8rem;
        text-align: center;
      }

      /* ===== Organograma ===== */
      .ra4-org-wrap {
        background: #F0F9FB;
        border: 1px solid #B3ECFF;
        border-radius: 12px;
        padding: clamp(1rem, 3vw, 1.5rem);
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ra4-org-ceo {
        background: var(--ra4-navy);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 520px;
        border-left: 4px solid var(--ra4-cyan);
      }
      .ra4-org-badge {
        background: var(--ra4-cyan);
        color: var(--ra4-navy);
        font-weight: 900;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
        flex-shrink: 0;
      }
      .ra4-org-line-v {
        width: 2px;
        height: 24px;
        background: var(--ra4-cyan);
        margin: 0.5rem 0;
      }
      .ra4-org-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        width: 100%;
      }
      .ra4-org-card {
        background: #fff;
        border: 1px solid #CBD5E1;
        padding: 0.85rem 1rem;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        border-top: 3px solid var(--ra4-navy);
      }
      .ra4-dept-title {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #0891B2;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }
      .ra4-org-card strong {
        color: var(--ra4-navy);
        font-size: 0.9rem;
      }
      .ra4-org-card span {
        color: #64748B;
        font-size: 0.78rem;
      }

      /* ===== Mapa por estado ===== */
      .ra4-map-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: clamp(1rem, 3vw, 1.5rem);
        margin: 1.5rem 0;
      }
      .ra4-map-nota {
        font-size: 0.78rem;
        color: #64748B;
        margin: -0.25rem 0 1rem;
        line-height: 1.5;
      }
      .ra4-map-legend {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
      }
      .ra4-map-item {
        display: grid;
        grid-template-columns: minmax(120px, 9rem) 1fr auto;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.8rem;
      }
      .ra4-map-item-label {
        color: #334155;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ra4-map-bar-track {
        height: 10px;
        border-radius: 999px;
        background: #E2E8F0;
        overflow: hidden;
      }
      .ra4-map-bar-fill {
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--ra4-teal), var(--ra4-cyan));
      }
      .ra4-map-item-valor {
        font-weight: 800;
        color: var(--ra4-navy);
        min-width: 1.5rem;
        text-align: right;
      }

      /* ===== Galeria de livros ===== */
      .ra4-books-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: clamp(1rem, 3vw, 1.5rem);
        margin: 1.5rem 0;
      }
      .ra4-books-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
      .ra4-book-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.72rem;
        font-weight: 700;
        text-align: center;
        color: var(--ra4-navy);
      }
      .ra4-book-img {
        width: 100%;
        height: 140px;
        object-fit: contain;
        border-radius: 6px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        background: #fff;
      }

      /* ===== Ciclo Momento Criar ===== */
      .ra4-flow-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: clamp(1rem, 3vw, 1.5rem);
        margin: 1.5rem 0;
      }
      .ra4-flow-steps {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .ra4-flow-step-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1 1 auto;
      }
      .ra4-flow-step {
        background: #fff;
        border: 1px solid #CBD5E1;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        text-align: center;
        flex: 1;
        min-width: 84px;
      }
      .ra4-step-num {
        display: block;
        font-size: 0.68rem;
        font-weight: 800;
        color: var(--ra4-cyan);
      }
      .ra4-flow-step strong {
        color: var(--ra4-navy);
        font-size: 0.82rem;
      }
      .ra4-flow-arrow {
        color: #94A3B8;
        font-weight: 900;
        flex-shrink: 0;
      }

      /* ===== Imagem ilustrativa ===== */
      .ra4-img-box {
        margin: 1.5rem 0;
      }
      .ra4-clean-img {
        width: 100%;
        max-height: 380px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .ra4-img-caption {
        font-size: 0.8rem;
        color: #64748B;
        margin-top: 0.5rem;
        text-align: center;
      }

      /* ===== Responsivo: tablet ===== */
      @media (max-width: 820px) {
        .ra4-books-grid { grid-template-columns: repeat(2, 1fr); }
      }

      /* ===== Responsivo: celular ===== */
      @media (max-width: 560px) {
        .ra4-org-grid { grid-template-columns: 1fr; }
        .ra4-org-ceo { flex-wrap: wrap; }
        .ra4-map-item { grid-template-columns: 1fr; gap: 0.3rem; }
        .ra4-map-item-valor { text-align: left; }
        .ra4-flow-steps { flex-direction: column; align-items: stretch; }
        .ra4-flow-step-group { flex-direction: column; }
        .ra4-flow-arrow { transform: rotate(90deg); }
        .ra4-capitulo-header { gap: 0.5rem; }
      }

      /* ===== Impressão ===== */
      @media print {
        .ra4-doc { max-width: none; }
        .ra4-tabela-wrap { overflow-x: visible; }
        .ra4-tabela { min-width: 0; }
      }
    `}</style>
  );
}
