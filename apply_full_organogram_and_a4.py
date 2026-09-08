import urllib.request
import json
import shutil
import os
import re

print("=== STARTING COMPLETE DECK AND A4 VISUAL UPDATE ===")

# 1. FETCH IBGE GEOJSON
print("1. Fetching IBGE official Brazil GeoJSON...")
url = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson'
req = urllib.request.urlopen(url)
data = json.loads(req.read().decode('utf-8'))

min_x, max_x = -73.990238, -32.390875
min_y, max_y = -33.751358, 5.270972

svg_w, svg_h = 500, 500
padding = 20

def project(lon, lat):
    x = padding + (lon - min_x) / (max_x - min_x) * (svg_w - 2 * padding)
    y = padding + (max_y - lat) / (max_y - min_y) * (svg_h - 2 * padding)
    return round(x, 1), round(y, 1)

sigla_map = {
    'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM', 'Bahia': 'BA',
    'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES', 'Goiás': 'GO',
    'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS', 'Minas Gerais': 'MG',
    'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR', 'Pernambuco': 'PE', 'Piauí': 'PI',
    'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN', 'Rio Grande do Sul': 'RS',
    'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC', 'São Paulo': 'SP',
    'Sergipe': 'SE', 'Tocantins': 'TO'
}

state_paths = {}
state_centers = {}

for f in data['features']:
    sigla = f['properties'].get('sigla') or f['properties'].get('postal') or f['properties'].get('cartodb_id')
    name = f['properties'].get('name', '')
    if not sigla or len(sigla) != 2:
        sigla = sigla_map.get(name, sigla)
        
    geom = f['geometry']
    gtype = geom['type']
    coords = geom['coordinates']
    
    path_d = []
    all_pts = []
    
    polys = [coords] if gtype == 'Polygon' else coords
        
    for poly in polys:
        for ring in poly:
            ring_d = []
            for i, pt in enumerate(ring):
                px, py = project(pt[0], pt[1])
                all_pts.append((px, py))
                if i == 0: ring_d.append(f'M {px},{py}')
                else: ring_d.append(f'L {px},{py}')
            ring_d.append('Z')
            path_d.append(' '.join(ring_d))
            
    state_paths[sigla] = ' '.join(path_d)
    if all_pts:
        avg_x = sum(p[0] for p in all_pts) / len(all_pts)
        avg_y = sum(p[1] for p in all_pts) / len(all_pts)
        state_centers[sigla] = (round(avg_x, 1), round(avg_y, 1))

print(f"Generated {len(state_paths)} IBGE state SVG paths!")

# Target density states
target_density = {
    'DF': {'count': 12, 'name': 'Distrito Federal (Sede)', 'color': '#76F3CD'},
    'SP': {'count': 14, 'name': 'São Paulo', 'color': '#FFCC00'},
    'RS': {'count': 10, 'name': 'Rio Grande do Sul', 'color': '#76F3CD'},
    'PR': {'count': 8, 'name': 'Paraná', 'color': '#76F3CD'},
    'SC': {'count': 6, 'name': 'Santa Catarina', 'color': '#76F3CD'},
    'PB': {'count': 5, 'name': 'Paraíba', 'color': '#76F3CD'},
    'ES': {'count': 4, 'name': 'Espírito Santo', 'color': '#76F3CD'},
    'CE': {'count': 4, 'name': 'Ceará', 'color': '#76F3CD'},
    'MA': {'count': 3, 'name': 'Maranhão', 'color': '#76F3CD'},
}

# Slide 15 SVG Map
svg_slide_15 = '<svg viewBox="0 0 500 480" style="width: 100%; max-height: 420px; filter: drop-shadow(0 12px 28px rgba(0,0,0,0.6));">\n  <g class="brazil-states">\n'
for sigla, d_str in state_paths.items():
    if sigla in ['DF', 'SP', 'RS', 'PR', 'MG']:
        fill = "rgba(118, 243, 205, 0.4)" if sigla != 'SP' else "rgba(255, 204, 0, 0.5)"
        stroke = "#76F3CD" if sigla != 'SP' else "#FFCC00"
        stroke_w = "2"
    else:
        fill = "rgba(14, 42, 71, 0.4)"
        stroke = "rgba(118, 243, 205, 0.2)"
        stroke_w = "1"
    svg_slide_15 += f'    <path id="state-{sigla}" d="{d_str}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_w}" />\n'

svg_slide_15 += '''  </g>
  <!-- Highlight Pins for 5 State Laws -->
  <circle cx="311.4" cy="268.8" r="7" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
  <rect x="235" y="240" width="135" height="24" rx="12" fill="#76F3CD"/>
  <text x="302" y="256" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11">DF · 12 ESCOLAS</text>

  <circle cx="313.8" cy="352.2" r="7" fill="#FFCC00" stroke="#0B1F44" stroke-width="2"/>
  <rect x="330" y="340" width="135" height="24" rx="12" fill="#FFCC00"/>
  <text x="397" y="356" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11">SP · 14 ESCOLAS</text>

  <circle cx="263.2" cy="439.4" r="7" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
  <rect x="160" y="426" width="135" height="24" rx="12" fill="#76F3CD"/>
  <text x="227" y="442" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11">RS · 10 ESCOLAS</text>

  <circle cx="280.5" cy="381.1" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
  <text x="200" y="385" fill="#76F3CD" font-weight="800" font-size="12">PR · 8 Escolas</text>

  <circle cx="360.0" cy="310.0" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
  <text x="375" y="314" fill="#76F3CD" font-weight="800" font-size="12">MG · 6 Escolas</text>
</svg>'''

# Slide 20 SVG Map
svg_slide_20 = '<svg viewBox="0 0 500 480" style="width: 100%; max-height: 420px; filter: drop-shadow(0 12px 28px rgba(0,0,0,0.6));">\n  <g class="brazil-states">\n'
for sigla, d_str in state_paths.items():
    if sigla in target_density:
        fill = "rgba(118, 243, 205, 0.45)" if sigla != 'SP' else "rgba(255, 204, 0, 0.55)"
        stroke = "#76F3CD" if sigla != 'SP' else "#FFCC00"
        stroke_w = "2"
    else:
        fill = "rgba(14, 42, 71, 0.4)"
        stroke = "rgba(118, 243, 205, 0.2)"
        stroke_w = "1"
    svg_slide_20 += f'    <path id="state-{sigla}" d="{d_str}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_w}" />\n'

df_x, df_y = state_centers['DF']
svg_slide_20 += '  </g>\n  <!-- Flight lines from HQ DF -->\n'
for sigla in ['SP', 'RS', 'PR', 'SC', 'PB', 'ES', 'CE', 'MA']:
    cx, cy = state_centers[sigla]
    stroke_col = "#FFCC00" if sigla == 'SP' else "rgba(118, 243, 205, 0.6)"
    svg_slide_20 += f'  <line x1="{df_x}" y1="{df_y}" x2="{cx}" y2="{cy}" stroke="{stroke_col}" stroke-width="1.5" stroke-dasharray="4 3" />\n'

svg_slide_20 += f'''  <circle cx="{df_x}" cy="{df_y}" r="9" fill="#76F3CD" stroke="#0B1F44" stroke-width="3"/>
  <rect x="{df_x - 65}" y="{df_y - 32}" width="130" height="26" rx="13" fill="#76F3CD"/>
  <text x="{df_x}" y="{df_y - 15}" text-anchor="middle" fill="#0B1F44" font-weight="900" font-size="11">HQ DF · 12 ESCOLAS</text>
</svg>'''

# 2. UPDATE BRAND.CSS LOGO-ZONE FIX
brand_css_code = '''/* Brand tokens for We Make */
:root {
  --color-brand-navy: 14 42 71;
  --color-brand-royal: 20 62 102;
  --color-brand-mint: 118 243 205;
  --color-brand-ivory: 247 249 252;
  --accent: #76F3CD;
  --bg: #0B1F44;
  --surface: #0E2A47;
  --ink: #FFFFFF;
  --muted: #A9C2DA;
}

.logo-zone {
  position: absolute;
  right: var(--logo-inset, 40px);
  bottom: var(--logo-inset, 40px);
  top: auto !important;
  left: auto !important;
  height: auto !important;
  max-height: 48px !important;
  display: inline-flex !important;
  align-items: center !important;
  z-index: 10;
}

.logo-zone img, .logo-zone svg {
  height: 40px !important;
  width: auto !important;
  object-fit: contain;
}
'''

for path in ['public/deck/brand.css', 'c:/repositorio/decks/wemake-plano/brand.css']:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(brand_css_code)
print("2. Updated brand.css with logo-zone fix!")

# 3. ADD ORGANOGRAM & VISUAL STYLES TO DECK.CSS
extra_deck_css = '''
/* ============================================================
   ORGANOGRAMA VISUAL (SLIDE 04 & RELATÓRIO A4)
   ============================================================ */
.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 16px;
}

.org-level {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.org-node {
  background: rgba(14, 42, 71, 0.85);
  border: 1px solid rgba(118, 243, 205, 0.3);
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.org-node--ceo {
  background: linear-gradient(135deg, rgba(14, 42, 71, 0.95), rgba(11, 31, 68, 0.98));
  border: 2px solid #76F3CD;
  padding: 20px 36px;
  box-shadow: 0 12px 36px rgba(118, 243, 205, 0.2);
}

.org-node__avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(118, 243, 205, 0.15);
  color: #76F3CD;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.org-node__role {
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #76F3CD;
  font-weight: 700;
}

.org-node__name {
  font-family: var(--font-display);
  font-size: 20px;
  color: #FFFFFF;
  margin-top: 2px;
}

.org-node__desc {
  font-size: 13px;
  color: #A9C2DA;
  margin-top: 4px;
}

.org-tree-line {
  width: 2px;
  height: 20px;
  background: linear-gradient(180deg, #76F3CD, rgba(118, 243, 205, 0.3));
}

.org-tree-branch {
  width: 80%;
  height: 2px;
  background: rgba(118, 243, 205, 0.3);
  margin-bottom: -10px;
}

/* CARDS QUADRADOS E LIMPOS */
.card--square {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 24px 24px 24px;
  border-radius: 20px;
  background: rgba(14, 42, 71, 0.7);
  border: 1px solid rgba(118, 243, 205, 0.2);
  position: relative;
  overflow: visible;
}

.card__badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #76F3CD;
  color: #0B1F44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  margin-top: -38px;
  margin-bottom: 12px;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.card__bullet {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #A9C2DA;
  margin-top: 4px;
}

/* IMAGENS ILUSTRATIVAS LIMPAS (SEM TEXTO SOBREPOSTO) */
.img-clean {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
'''

for path in ['public/deck/deck.css', 'c:/repositorio/decks/wemake-plano/deck.css']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if '.org-chart' not in content:
        content += extra_deck_css
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
print("3. Appended organogram and visual styles to deck.css!")

# 4. UPDATE DATA/PLANO-NEGOCIO-RELATORIO.TS TO ADD VISUAL BLOCKS TO A4 DATA
with open('data/plano-negocio-relatorio.ts', 'r', encoding='utf-8') as f:
    ts_code = f.read()

# Update BlocoConteudo type definition
type_target = 'export type BlocoConteudo ='
type_replacement = '''export type BlocoConteudo =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "tabela"; legenda?: string; cabecalho: string[]; linhas: string[][] }
  | { tipo: "stats"; itens: { label: string; valor: string }[] }
  | { tipo: "destaque"; titulo: string; texto: string }
  | { tipo: "citacao"; texto: string; atribuicao?: string }
  | { tipo: "organograma" }
  | { tipo: "mapa-ibge" }
  | { tipo: "galeria-livros" }
  | { tipo: "ciclo-maker" }
  | { tipo: "imagem"; url: string; legenda?: string };'''

if 'tipo: "organograma"' not in ts_code:
    ts_code = ts_code.replace(type_target, type_replacement)

    # Insert organograma into Chapter 2 (Equipe)
    ts_code = ts_code.replace(
        'id: "equipe",\n        titulo: "Equipe",\n        blocos: [',
        'id: "equipe",\n        titulo: "Equipe",\n        blocos: [\n          { tipo: "organograma" },'
    )

    # Insert galeria-livros & ciclo-maker into Chapter 3 (Kit We Make)
    ts_code = ts_code.replace(
        'id: "kit-we-make",\n        titulo: "O que compõe o sistema",\n        blocos: [',
        'id: "kit-we-make",\n        titulo: "O que compõe o sistema",\n        blocos: [\n          { tipo: "galeria-livros" },\n          { tipo: "ciclo-maker" },'
    )

    # Insert mapa-ibge into Chapter 5 (Território)
    ts_code = ts_code.replace(
        'id: "sumario-executivo-corpo",\n        titulo: "Sumário Executivo",\n        blocos: [',
        'id: "sumario-executivo-corpo",\n        titulo: "Sumário Executivo",\n        blocos: [\n          { tipo: "mapa-ibge" },'
    )

    with open('data/plano-negocio-relatorio.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print("4. Updated data/plano-negocio-relatorio.ts with visual blocks!")

# 5. UPDATE FEATURES/ADMIN/RELATORIO-A4.TSX TO RENDER VISUAL BLOCKS
a4_tsx_code = '''import type { BlocoConteudo, CapituloRelatorio } from "@/data/plano-negocio-relatorio";

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
          <h4 className="ra4-visual-title">Organograma de Governança Executiva</h4>
          <div className="ra4-org-ceo">
            <div className="ra4-org-badge">CEO</div>
            <div>
              <strong className="ra4-org-name">Dênis Júlio Pereira Francisco</strong>
              <p className="ra4-org-role">CEO &amp; Diretor Pedagógico (Estratégia, P&amp;D e Parcerias)</p>
            </div>
          </div>
          <div className="ra4-org-line-v"></div>
          <div className="ra4-org-grid">
            <div className="ra4-org-card">
              <strong>Renato Assis</strong>
              <span>Gerente Administrativo &amp; Financeiro</span>
            </div>
            <div className="ra4-org-card">
              <strong>Suzana Bonifazio</strong>
              <span>Consultora Pedagógica &amp; Formação</span>
            </div>
            <div className="ra4-org-card">
              <strong>Emanuel Peixoto</strong>
              <span>Analista de Marketing &amp; Expansão</span>
            </div>
            <div className="ra4-org-card">
              <strong>Equipe P&amp;D / TI</strong>
              <span>Plataforma Arkos &amp; Suporte Técnico</span>
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
        --ra4-navy: #0B1F44;
        --ra4-royal: #0E2A47;
        --ra4-mint: #76F3CD;
        --ra4-ivory: #F7F9FC;
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
        background: linear-gradient(160deg, #0B1F44 0%, #0E2A47 100%);
        color: #fff;
        page-break-after: always;
        break-after: page;
      }
      .ra4-capa-eyebrow {
        font-size: 0.85rem;
        color: #76F3CD;
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      .ra4-capa-titulo {
        font-size: 3rem;
        line-height: 1.1;
        font-weight: 800;
      }
      .ra4-capa-sub {
        font-size: 1.25rem;
        color: #A9C2DA;
        max-width: 32ch;
      }
      .ra4-capa-rodape {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.8rem;
        color: rgba(255,255,255,0.6);
      }

      .ra4-sumario {
        padding: 3rem;
        page-break-after: always;
      }
      .ra4-sumario-eyebrow {
        font-size: 0.9rem;
        font-weight: 700;
        color: #0E2A47;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
      }
      .ra4-sumario-lista {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .ra4-sumario-lista li {
        display: flex;
        gap: 1rem;
        align-items: center;
        border-bottom: 1px solid #E2E8F0;
        padding-bottom: 0.5rem;
      }
      .ra4-sumario-num {
        font-weight: 800;
        color: #0E2A47;
      }

      .ra4-capitulo {
        padding: 3rem;
        border-top: 4px solid #0E2A47;
        margin-bottom: 2rem;
      }
      .ra4-capitulo-header {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 2rem;
      }
      .ra4-capitulo-num {
        font-size: 2.5rem;
        font-weight: 900;
        color: #0E2A47;
      }
      .ra4-capitulo-titulo {
        font-size: 1.75rem;
        font-weight: 800;
        color: #0B1F44;
      }

      .ra4-p {
        font-size: 1rem;
        line-height: 1.6;
        color: #334155;
        margin-bottom: 1rem;
      }
      .ra4-subtitulo {
        font-size: 1.25rem;
        font-weight: 700;
        color: #0E2A47;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
      }
      .ra4-lista {
        margin-bottom: 1.5rem;
        padding-left: 1.25rem;
        color: #334155;
      }
      .ra4-lista li {
        margin-bottom: 0.5rem;
      }

      .ra4-tabela-wrap {
        margin: 1.5rem 0;
        overflow-x: auto;
      }
      .ra4-tabela {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }
      .ra4-tabela th {
        background: #0E2A47;
        color: #fff;
        padding: 0.75rem;
        text-align: left;
      }
      .ra4-tabela td {
        padding: 0.75rem;
        border-bottom: 1px solid #E2E8F0;
        color: #334155;
      }

      .ra4-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
      }
      .ra4-stat {
        background: #F7F9FC;
        border-left: 4px solid #0E2A47;
        padding: 1rem;
        border-radius: 4px;
      }
      .ra4-stat-valor {
        font-size: 1.5rem;
        font-weight: 800;
        color: #0E2A47;
      }
      .ra4-stat-label {
        font-size: 0.8rem;
        color: #64748B;
        margin-top: 0.25rem;
      }

      .ra4-visual-title {
        font-size: 1.1rem;
        font-weight: 800;
        color: #0E2A47;
        margin-bottom: 1rem;
        border-bottom: 2px solid #76F3CD;
        padding-bottom: 0.25rem;
        display: inline-block;
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
'''

with open('features/admin/relatorio-a4.tsx', 'w', encoding='utf-8') as f:
    f.write(a4_tsx_code)

print("5. Updated features/admin/relatorio-a4.tsx with complete visual components rendering!")

print("=== VISUAL UPDATE SCRIPT FINISHED SUCCESSFULLY ===")
