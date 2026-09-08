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
    case "mapa-ibge":
      return (
        <div className="ra4-map-wrap">
          <h4 className="ra4-visual-title">Presença Territorial e Densidade de Escolas (Base IBGE)</h4>
          <div className="ra4-map-grid">
            <div className="ra4-map-svg-box">
              <svg viewBox="0 0 500 480" className="ra4-svg-map">
                <g fill="#0E2A47" stroke="#76F3CD" strokeWidth="1.5">
                  <circle cx="311" cy="268" r="8" fill="#76F3CD" />
                  <circle cx="313" cy="352" r="8" fill="#FFCC00" />
                  <circle cx="263" cy="439" r="8" fill="#76F3CD" />
                </g>
                <text x="311" y="250" textAnchor="middle" fill="#0E2A47" fontWeight="bold" fontSize="12">HQ DF (12)</text>
                <text x="380" y="355" textAnchor="middle" fill="#D97706" fontWeight="bold" fontSize="12">SP (14)</text>
                <text x="263" y="460" textAnchor="middle" fill="#0E2A47" fontWeight="bold" fontSize="12">RS (10)</text>
              </svg>
            </div>
            <div className="ra4-map-legend">
              <div className="ra4-map-item"><strong>DF (Sede):</strong> 12 Escolas Ativas</div>
              <div className="ra4-map-item"><strong>São Paulo (SP):</strong> 14 Escolas (Projeção)</div>
              <div className="ra4-map-item"><strong>Rio Grande do Sul (RS):</strong> 10 Escolas</div>
              <div className="ra4-map-item"><strong>Paraná (PR):</strong> 8 Escolas</div>
              <div className="ra4-map-item"><strong>Santa Catarina (SC):</strong> 6 Escolas</div>
              <div className="ra4-map-item"><strong>Paraíba (PB):</strong> 5 Escolas</div>
              <div className="ra4-map-item"><strong>Espírito Santo (ES):</strong> 4 Escolas</div>
              <div className="ra4-map-item"><strong>Ceará (CE):</strong> 4 Escolas</div>
              <div className="ra4-map-item"><strong>Maranhão (MA):</strong> 3 Escolas</div>
            </div>
          </div>
        </div>
      );
    case "galeria-livros":
      return (
        <div className="ra4-books-wrap">
          <h4 className="ra4-visual-title">Coleção Livro Maker (1º ao 5º Ano — Cobertura Total)</h4>
          <div className="ra4-books-grid">
            <div className="ra4-book-card">
              <img src="/deck/capa_infantil_3.png" alt="Livro Infantil" className="ra4-book-img" />
              <span>Educação Infantil</span>
            </div>
            <div className="ra4-book-card">
              <img src="/deck/capa_ef1_1ano.png" alt="Livro 1º Ano" className="ra4-book-img" />
              <span>1º Ano EF</span>
            </div>
            <div className="ra4-book-card">
              <img src="/deck/capa_ef1_3ano.png" alt="Livro 3º Ano" className="ra4-book-img" />
              <span>3º Ano EF</span>
            </div>
            <div className="ra4-book-card">
              <img src="/deck/capa_ef1_4ano.png" alt="Livro 4º Ano" className="ra4-book-img" />
              <span>4º Ano EF</span>
            </div>
            <div className="ra4-book-card">
              <img src="/deck/capa_ef1_5ano.png" alt="Livro 5º Ano" className="ra4-book-img" />
              <span>5º Ano EF</span>
            </div>
          </div>
        </div>
      );
    case "ciclo-maker":
      return (
        <div className="ra4-flow-wrap">
          <h4 className="ra4-visual-title">Metodologia Maker: Ciclo de Aprendizagem de 6 Etapas</h4>
          <div className="ra4-flow-steps">
            <div className="ra4-flow-step">
              <span className="ra4-step-num">01</span>
              <strong>Investigar</strong>
            </div>
            <div className="ra4-flow-arrow">→</div>
            <div className="ra4-flow-step">
              <span className="ra4-step-num">02</span>
              <strong>Projetar</strong>
            </div>
            <div className="ra4-flow-arrow">→</div>
            <div className="ra4-flow-step">
              <span className="ra4-step-num">03</span>
              <strong>Construir</strong>
            </div>
            <div className="ra4-flow-arrow">→</div>
            <div className="ra4-flow-step">
              <span className="ra4-step-num">04</span>
              <strong>Testar</strong>
            </div>
            <div className="ra4-flow-arrow">→</div>
            <div className="ra4-flow-step">
              <span className="ra4-step-num">05</span>
              <strong>Refletir</strong>
            </div>
            <div className="ra4-flow-arrow">→</div>
            <div className="ra4-flow-step">
              <span className="ra4-step-num">06</span>
              <strong>Compartilhar</strong>
            </div>
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
      }

      .ra4-capa {
        min-height: 900px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        padding: 4rem 3rem;
        background: linear-gradient(160deg, #002933 0%, #003B49 100%);
        color: #fff;
        page-break-after: always;
        break-after: page;
      }
      .ra4-capa-eyebrow {
        font-size: 0.85rem;
        color: #00CEFF;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      .ra4-capa-titulo {
        font-size: 3rem;
        line-height: 1.1;
        font-weight: 800;
        color: #F4F3EF;
      }
      .ra4-capa-sub {
        font-size: 1.25rem;
        color: #94B4BD;
        max-width: 32ch;
      }
      .ra4-capa-rodape {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.8rem;
        color: rgba(244,243,239,0.6);
      }

      .ra4-org-wrap {
        background: #F0F9FB;
        border: 1px solid #B3ECFF;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ra4-org-ceo {
        background: #002933;
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 520px;
        border-left: 4px solid #00CEFF;
      }
      .ra4-org-badge {
        background: #00CEFF;
        color: #002933;
        font-weight: 900;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
      }
      .ra4-org-line-v {
        width: 2px;
        height: 24px;
        background: #00CEFF;
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
        border-top: 3px solid #002933;
      }
      .ra4-dept-title {
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #00CEFF;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }
      .ra4-org-card strong {
        color: #002933;
        font-size: 0.95rem;
      }
      .ra4-org-card span {
        color: #64748B;
        font-size: 0.8rem;
      }
      /* ELEMENTOS VISUAIS NO RELATÓRIO A4 */
      .ra4-org-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ra4-org-ceo {
        background: #0E2A47;
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        max-width: 480px;
      }
      .ra4-org-badge {
        background: #76F3CD;
        color: #0B1F44;
        font-weight: 900;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8rem;
      }
      .ra4-org-line-v {
        width: 2px;
        height: 24px;
        background: #0E2A47;
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
        padding: 0.75rem 1rem;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
      }
      .ra4-org-card strong {
        color: #0F172A;
        font-size: 0.95rem;
      }
      .ra4-org-card span {
        color: #64748B;
        font-size: 0.8rem;
      }

      .ra4-map-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
      }
      .ra4-map-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        align-items: center;
      }
      .ra4-map-svg-box {
        width: 100%;
        background: #0E2A47;
        border-radius: 8px;
        padding: 1rem;
      }
      .ra4-map-legend {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.85rem;
      }

      .ra4-books-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
      }
      .ra4-books-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
      }
      .ra4-book-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        text-align: center;
      }
      .ra4-book-img {
        width: 100%;
        height: 140px;
        object-fit: contain;
        border-radius: 6px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      }

      .ra4-flow-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
      }
      .ra4-flow-steps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .ra4-flow-step {
        background: #fff;
        border: 1px solid #CBD5E1;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        text-align: center;
        flex: 1;
      }
      .ra4-step-num {
        display: block;
        font-size: 0.7rem;
        font-weight: 800;
        color: #0E2A47;
      }
      .ra4-flow-arrow {
        color: #0E2A47;
        font-weight: 900;
      }

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

      .ra4-rodape-final {
        padding: 2rem 3rem;
        background: #0E2A47;
        color: #A9C2DA;
        font-size: 0.8rem;
        text-align: center;
      }
    `}</style>
  );
}
