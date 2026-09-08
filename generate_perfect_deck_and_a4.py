import urllib.request
import json
import shutil
import os

print("Fetching IBGE official Brazil GeoJSON...")
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

# Construct SVG map string for Slide 15 (5 State Laws)
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

# Construct SVG map string for Slide 20 (9 States Density with Flight Lines from HQ DF)
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

# Generate complete HTML string
deck_template = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Make · Plano de Negócio 2027–2031</title>
  
  <link rel="stylesheet" href="/deck/deck.css">
  <link rel="stylesheet" href="/deck/brand.css">
</head>
<body data-theme="wemake" data-paginate="1">

  <script src="/deck/icons.js"></script>

  <div class="deck">

    <!-- SLIDE 01: CAPA CINEMATOGRÁFICA -->
    <section class="slide slide--tight" data-theme="wemake">
      <div class="stack stack--sm" style="margin-top: auto; margin-bottom: auto;">
        <div style="display: flex; align-items: center; gap: 12px;" data-anim="rise">
          <span class="badge" style="font-size: 14px; padding: 6px 16px; border-radius: 999px;">PLANO DE NEGÓCIO 2027–2031</span>
          <span style="color: var(--accent); font-family: var(--font-mono); font-size: 14px; font-weight: 700;">VISÃO ESTRATÉGICA DE 5 ANOS</span>
        </div>
        <h1 class="display balance" data-anim="rise" data-delay="100" style="font-size: 80px; line-height: 1.05; margin-top: 16px;">
          Educação Tecnológica &amp; Maker com Cosmovisão Cristã
        </h1>
        <p class="lede balance" data-anim="rise" data-delay="200" style="margin-top: 16px; font-size: 26px; max-width: 32ch;">
          Transformando a educação básica no Brasil através de um ecossistema autoral, regulado e altamente rentável
        </p>
      </div>
      <div class="footer" data-anim="fade" data-delay="300">
        <span>We Make Educação Tecnológica LTDA</span>
        <span>•</span>
        <span>CEO : Dênis Júlio Pereira Francisco</span>
        <span>•</span>
        <span>Documento Estritamente Confidencial</span>
      </div>
    </section>

    <!-- SLIDE 02: RESUMO EXECUTIVO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 01 : Resumo Executivo</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Um sistema autoral consolidado pronto para escalar no mercado privado</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-building-2"></use></svg></div>
          <div class="card__body">
            <p class="stat__value" style="font-size: 42px; color: var(--accent);">12 Escolas</p>
            <h3 class="card__title">Carteira Ativa DF</h3>
            <p class="small muted" style="margin-top: 6px;">Base real contratada e operando no modelo B2B no Distrito Federal</p>
            <div class="card__bullet"><svg class="icon" style="color:var(--accent);"><use href="#i-check"></use></svg> Contratos recorrentes</div>
            <div class="card__bullet"><svg class="icon" style="color:var(--accent);"><use href="#i-check"></use></svg> 2.000 alunos atendidos</div>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="250">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-trending-up"></use></svg></div>
          <div class="card__body">
            <p class="stat__value" style="font-size: 42px; color: #0B1F44;">R$ 1,15M</p>
            <h3 class="card__title" style="color: #0B1F44;">Receita Bruta 2027</h3>
            <p class="small" style="color: rgba(11,31,68,0.8); margin-top: 6px;">Meta escolar contratada somada às famílias educadoras</p>
            <div class="card__bullet" style="color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg> R$ 951k B2B Escolas</div>
            <div class="card__bullet" style="color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg> R$ 200k B2C Homeschooling</div>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="350">
          <div class="card__badge"><svg class="icon"><use href="#i-pie-chart"></use></svg></div>
          <div class="card__body">
            <p class="stat__value accent-sky" style="font-size: 42px;">26,2%</p>
            <h3 class="card__title">Margem Líquida</h3>
            <p class="small muted" style="margin-top: 6px;">Lucratividade líquida real em regime de velocidade de cruzeiro</p>
            <div class="card__bullet"><svg class="icon" style="color:var(--accent);"><use href="#i-check"></use></svg> Alta margem editorial</div>
            <div class="card__bullet"><svg class="icon" style="color:var(--accent);"><use href="#i-check"></use></svg> Baixo custo de aquisição</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 03: A DOR DO CLIENTE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 01 : A Dor do Cliente</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Escola parceira fragmenta compras entre três fornecedores sem integração</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" data-anim="rise" data-delay="200" style="border-top: 4px solid #FF6B6B;">
          <div class="card__badge" style="background: rgba(255,100,100,0.2); color: #FF6B6B;"><svg class="icon"><use href="#i-alert-triangle"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: #FF6B6B;">Dor 01</span>
            <h3 class="card__title">Robótica Isolada</h3>
            <p class="small muted" style="margin-top: 6px;">Kits de peças sem currículo plurianual, sem LMS nem alinhamento confessional</p>
            <div class="card__bullet" style="color: #FF6B6B;"><svg class="icon"><use href="#i-x"></use></svg> Sem acompanhamento docente</div>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="300" style="border-top: 4px solid #78C8FF;">
          <div class="card__badge" style="background: rgba(120,200,255,0.2); color: #78C8FF;"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: #78C8FF;">Dor 02</span>
            <h3 class="card__title">Plataforma Fria</h3>
            <p class="small muted" style="margin-top: 6px;">Software administrativo que guarda notas, mas não oferece trilha de aprendizagem</p>
            <div class="card__bullet" style="color: #78C8FF;"><svg class="icon"><use href="#i-x"></use></svg> Sem engajamento do aluno</div>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="400" style="border-top: 4px solid #FFCC00;">
          <div class="card__badge" style="background: rgba(255,204,0,0.2); color: #FFCC00;"><svg class="icon"><use href="#i-clock"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: #FFCC00;">Dor 03</span>
            <h3 class="card__title">Treinamento Rápido</h3>
            <p class="small muted" style="margin-top: 6px;">Cursos pontuais de poucas horas sem acompanhamento contínuo no ano letivo</p>
            <div class="card__bullet" style="color: #FFCC00;"><svg class="icon"><use href="#i-x"></use></svg> Abandono do professor</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 04: EQUIPE EXECUTIVA -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 02 : Governança &amp; Liderança</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Liderança multidisciplinar alinhada com autoridade acadêmica e gestão</h2>
      </div>
      <div class="grid grid-4" style="margin-top: 28px; gap: 16px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-user"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 20px;">Dênis Francisco</h3>
            <p class="small accent" style="margin-top: 2px;">CEO &amp; Diretor Estratégico</p>
            <p class="small muted" style="margin-top: 6px;">Mestre em Inovação Tecnológica (UFRN), autor da dissertação Ciberética e líder de P&amp;D</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="250">
          <div class="card__badge"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 20px;">Gabriel Santos</h3>
            <p class="small accent" style="margin-top: 2px;">CTO &amp; Arquitetura TI</p>
            <p class="small muted" style="margin-top: 6px;">Engenheiro de software responsável pela Plataforma Arkos e infraestrutura em nuvem</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="350">
          <div class="card__badge"><svg class="icon"><use href="#i-graduation-cap"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 20px;">Suzana Bonifazio</h3>
            <p class="small accent" style="margin-top: 2px;">Head Pedagógica &amp; Mentoria</p>
            <p class="small muted" style="margin-top: 6px;">Formação docente continuada, materiais autorais e pós-graduação em Educação Clássica</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="450">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-briefcase"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 20px; color: #0B1F44;">Renato &amp; Emanuela</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 2px;">Gestão &amp; Consultoria</p>
            <p class="small" style="color: rgba(11,31,68,0.75); margin-top: 6px;">Administração de contratos, acompanhamento financeiro e expansão comercial</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 05: PROPÓSITO E COSMOVISÃO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 03 : Propósito &amp; Fundamento</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Tecnologia como mordomia e ferramenta para formar criadores éticos</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Cosmovisão Cristã</h3>
            <p class="small muted" style="margin-top: 6px;">Ensino tecnológico fundamentado no mandamento cultural e no discernimento espiritual para a era da IA</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="250">
          <div class="card__badge"><svg class="icon"><use href="#i-heart"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Mordomia Digital</h3>
            <p class="small muted" style="margin-top: 6px;">Formação de postura ética diante das telas, uso consciente da tecnologia e proteção da infância</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="350">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-star"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Postura Autoral</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Alunos deixam de ser meros consumidores passivos para se tornarem inventores de soluções reais</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 06: COMPONENTES DO KIT WE MAKE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 03 : Proposta de Valor Única</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Cinco componentes essenciais reunidos em um único contrato escolar</h2>
      </div>
      <div class="split split--60" style="margin-top: 24px; align-items: center; gap: 24px;">
        <div class="grid grid-2" style="gap: 16px;" data-anim="rise" data-delay="200">
          <div class="card card--square" style="padding: 16px;">
            <div class="card__badge" style="width:40px;height:40px;margin-top:-20px;"><svg class="icon"><use href="#i-book-open"></use></svg></div>
            <div class="card__body">
              <h3 class="card__title" style="font-size: 18px;">01. Currículo Autoral</h3>
              <p class="small muted" style="font-size: 13px; margin-top: 4px;">Do 1º EF ao 3º EM: programação, robótica e cidadania</p>
            </div>
          </div>
          <div class="card card--square" style="padding: 16px;">
            <div class="card__badge" style="width:40px;height:40px;margin-top:-20px;"><svg class="icon"><use href="#i-cpu"></use></svg></div>
            <div class="card__body">
              <h3 class="card__title" style="font-size: 18px;">02. Plataforma Arkos</h3>
              <p class="small muted" style="font-size: 13px; margin-top: 4px;">LMS próprio para gestão e acompanhamento em tempo real</p>
            </div>
          </div>
          <div class="card card--square card--accent" style="padding: 16px;">
            <div class="card__badge" style="width:40px;height:40px;margin-top:-20px;background:rgba(11,31,68,0.15);color:#0B1F44;"><svg class="icon"><use href="#i-wrench"></use></svg></div>
            <div class="card__body">
              <h3 class="card__title" style="font-size: 18px; color: #0B1F44;">03. Espaço Maker</h3>
              <p class="small" style="color: rgba(11,31,68,0.85); font-size: 13px; margin-top: 4px;">Ambiente físico de criação prática institucionalizado</p>
            </div>
          </div>
          <div class="card card--square" style="padding: 16px;">
            <div class="card__badge" style="width:40px;height:40px;margin-top:-20px;"><svg class="icon"><use href="#i-graduation-cap"></use></svg></div>
            <div class="card__body">
              <h3 class="card__title" style="font-size: 18px;">04. Academia We Make</h3>
              <p class="small muted" style="font-size: 13px; margin-top: 4px;">Formação e mentoria continuada para professores</p>
            </div>
          </div>
        </div>

        <div class="card card--square" data-anim="scale" data-delay="350" style="padding: 10px; background: rgba(20,43,89,0.9); border: 1px solid rgba(118,243,205,0.3);">
          <div style="width: 100%; height: 260px; overflow: hidden; border-radius: 12px; position: relative;">
            <img src="/deck/img/capa_aluno_maker.jpg" alt="Aluno no Espaço Maker We Make" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; inset-x: 0; padding: 12px; background: linear-gradient(0deg, rgba(11,31,68,0.95), transparent);">
              <span class="badge" style="font-size: 11px; padding: 2px 8px;">Espaço Maker Prático</span>
              <p style="font-size: 13px; color: #FFF; font-weight: 600; margin-top: 2px;">Projetos autorais em ambiente físico estruturado</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 07: ARQUITETURA HUB -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 03 : Arquitetura do Sistema</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">O Kit We Make é o hub central que interliga software e espaço físico</h2>
      </div>
      <div class="flow" style="margin-top: 40px; gap: 10px;" data-anim="rise" data-delay="200">
        <div class="flow__step" style="padding: 18px;">
          <div class="icon-badge" style="width:36px;height:36px;margin:0 auto 8px;"><svg class="icon"><use href="#i-compass"></use></svg></div>
          <span class="eyebrow">Entrada</span>
          <h3 class="h3" style="font-size: 20px;">Assessoria</h3>
        </div>
        <div class="flow__arrow">→</div>
        <div class="flow__step flow__step--key" style="padding: 18px; background: var(--accent);">
          <div class="icon-badge" style="width:36px;height:36px;margin:0 auto 8px;background:rgba(11,31,68,0.15);color:#0B1F44;"><svg class="icon"><use href="#i-box"></use></svg></div>
          <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Coração</span>
          <h3 class="h3" style="font-size: 20px; color: #0B1F44;">Kit We Make</h3>
        </div>
        <div class="flow__arrow">→</div>
        <div class="flow__step" style="padding: 18px;">
          <div class="icon-badge" style="width:36px;height:36px;margin:0 auto 8px;"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <span class="eyebrow">Software</span>
          <h3 class="h3" style="font-size: 20px;">Plataforma</h3>
        </div>
        <div class="flow__arrow">→</div>
        <div class="flow__step" style="padding: 18px;">
          <div class="icon-badge" style="width:36px;height:36px;margin:0 auto 8px;"><svg class="icon"><use href="#i-award"></use></svg></div>
          <span class="eyebrow">Docência</span>
          <h3 class="h3" style="font-size: 20px;">Academia</h3>
        </div>
        <div class="flow__arrow">→</div>
        <div class="flow__step" style="padding: 18px;">
          <div class="icon-badge" style="width:36px;height:36px;margin:0 auto 8px;"><svg class="icon"><use href="#i-wrench"></use></svg></div>
          <span class="eyebrow">Prática</span>
          <h3 class="h3" style="font-size: 20px;">Espaço Maker</h3>
        </div>
      </div>
    </section>

    <!-- SLIDE 08: TRILOGIA PEDAGÓGICA -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 06 : Trilogia Pedagógica</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Conhecer, Explorar e Criar : a jornada de transformação do aluno</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-lightbulb"></use></svg></div>
          <div class="card__body">
            <span class="num">01</span>
            <h3 class="card__title" style="font-size: 24px; margin-top: 4px;">Conhecer</h3>
            <p class="small muted" style="margin-top: 6px;">Apreensão inicial dos fundamentos lógicos e conceituais do mundo digital</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="250">
          <div class="card__badge"><svg class="icon"><use href="#i-search"></use></svg></div>
          <div class="card__body">
            <span class="num">02</span>
            <h3 class="card__title" style="font-size: 24px; margin-top: 4px;">Explorar</h3>
            <p class="small muted" style="margin-top: 6px;">Experimentação guiada e domínio técnico das ferramentas de criação</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="350">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-star"></use></svg></div>
          <div class="card__body">
            <span class="num" style="background: #0B1F44; color: var(--accent);">03</span>
            <h3 class="card__title" style="font-size: 24px; margin-top: 4px; color: #0B1F44;">Criar</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Desenvolvimento autoral de projetos práticos voltados a problemas reais</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 09: CICLO MAKER 6 ETAPAS -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 06 : Ciclo de Projeto Maker</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Metodologia prática em seis etapas para a criação autoral</h2>
      </div>
      <div class="flow" style="margin-top: 36px; gap: 8px;" data-anim="rise" data-delay="200">
        <div class="flow__step" style="padding: 14px 10px; text-align: center; flex: 1;">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px;"><svg class="icon"><use href="#i-search"></use></svg></div>
          <span class="eyebrow" style="font-size: 10px;">01</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px;">Identificar</h3>
        </div>
        <div class="flow__arrow" style="font-size: 14px; color: var(--accent);">→</div>
        <div class="flow__step" style="padding: 14px 10px; text-align: center; flex: 1;">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px;"><svg class="icon"><use href="#i-lightbulb"></use></svg></div>
          <span class="eyebrow" style="font-size: 10px;">02</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px;">Imaginar</h3>
        </div>
        <div class="flow__arrow" style="font-size: 14px; color: var(--accent);">→</div>
        <div class="flow__step" style="padding: 14px 10px; text-align: center; flex: 1;">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px;"><svg class="icon"><use href="#i-calendar"></use></svg></div>
          <span class="eyebrow" style="font-size: 10px;">03</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px;">Planejar</h3>
        </div>
        <div class="flow__arrow" style="font-size: 14px; color: var(--accent);">→</div>
        <div class="flow__step" style="padding: 14px 10px; text-align: center; flex: 1;">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px;"><svg class="icon"><use href="#i-wrench"></use></svg></div>
          <span class="eyebrow" style="font-size: 10px;">04</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px;">Construir</h3>
        </div>
        <div class="flow__arrow" style="font-size: 14px; color: var(--accent);">→</div>
        <div class="flow__step" style="padding: 14px 10px; text-align: center; flex: 1;">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <span class="eyebrow" style="font-size: 10px;">05</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px;">Testar</h3>
        </div>
        <div class="flow__arrow" style="font-size: 14px; color: var(--accent);">→</div>
        <div class="flow__step flow__step--key" style="padding: 14px 10px; text-align: center; flex: 1; background: var(--accent);">
          <div class="icon-badge" style="width: 36px; height: 36px; margin: 0 auto 6px; background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-flag"></use></svg></div>
          <span class="eyebrow" style="color: rgba(11,31,68,0.8); font-size: 10px;">06</span>
          <h3 class="h3" style="font-size: 15px; margin-top: 2px; color: #0B1F44;">Compartilhar</h3>
        </div>
      </div>
    </section>

    <!-- SLIDE 10: MATRIZ CURRICULAR -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 06 : Matriz Curricular</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Progressão pedagógica real estruturada em quatro eixos práticos</h2>
      </div>
      <div class="grid grid-4" style="margin-top: 28px; gap: 16px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <span class="num">01</span>
            <h3 class="card__title" style="font-size: 18px;">Programação &amp; Jogos</h3>
            <p class="small muted" style="margin-top: 4px;">Lógica voltada à criação autoral</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="250">
          <div class="card__badge"><svg class="icon"><use href="#i-wrench"></use></svg></div>
          <div class="card__body">
            <span class="num">02</span>
            <h3 class="card__title" style="font-size: 18px;">Robótica &amp; Automação</h3>
            <p class="small muted" style="margin-top: 4px;">Circuitos e microcontroladores</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="350">
          <div class="card__badge"><svg class="icon"><use href="#i-layers"></use></svg></div>
          <div class="card__body">
            <span class="num">03</span>
            <h3 class="card__title" style="font-size: 18px;">Engenharia &amp; 3D</h3>
            <p class="small muted" style="margin-top: 4px;">Prototipagem e impressão 3D</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="450">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <span class="num" style="background: #0B1F44; color: var(--accent);">04</span>
            <h3 class="card__title" style="font-size: 18px; color: #0B1F44;">Mordomia Digital</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 4px;">Uso ético de IA e tecnologia</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 11: CAPAS INTEIRAS DOS LIVROS MAKER (FULL UNCROPPED) -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 06 : Coleção Editorial Autoral</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Coleção didática física com o Pelicano We Make unificando o aprendizado</h2>
      </div>
      
      <div class="grid grid-3" style="margin-top: 16px; gap: 16px;">
        <div class="card card--square" data-anim="rise" data-delay="150" style="padding: 14px;">
          <div class="card__badge" style="width:34px;height:34px;margin-top:-18px;"><svg class="icon"><use href="#i-book"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 16px;">Pelicano We Make</h3>
            <p class="small muted" style="font-size: 12px; margin-top: 2px;">Personagem unificador em todas as capas</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="250" style="padding: 14px;">
          <div class="card__badge" style="width:34px;height:34px;margin-top:-18px;background:rgba(11,31,68,0.15);color:#0B1F44;"><svg class="icon"><use href="#i-coins"></use></svg></div>
          <div class="card__body">
            <p class="stat__value" style="font-size: 28px; color: #0B1F44; line-height: 1;">R$ 420</p>
            <p class="stat__label" style="color: rgba(11,31,68,0.9); font-weight: 700; font-size: 12px; margin-top: 2px;">Ticket médio por aluno ao ano</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="350" style="padding: 14px;">
          <div class="card__badge" style="width:34px;height:34px;margin-top:-18px;"><svg class="icon"><use href="#i-truck"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="font-size: 16px;">R$ 55,56 COGS Unitário</h3>
            <p class="small muted" style="font-size: 12px; margin-top: 2px;">Produção gráfica especializada em SP</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 14px;" data-anim="rise" data-delay="400">
        <p class="eyebrow" style="margin-bottom: 6px; font-size: 12px; color: var(--accent);">Amostra de Capas Inteiras da Coleção Didática We Make</p>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
          <div class="card card--square" style="padding: 6px; text-align: center; background: rgba(20,43,89,0.85); border: 1px solid rgba(118,243,205,0.3);">
            <div style="width: 100%; height: 210px; border-radius: 8px; margin-bottom: 4px; background: rgba(11,31,68,0.4); padding: 4px; display: flex; align-items: center; justify-content: center;">
              <img src="/deck/img/livros/capa_infantil_3.png" alt="Capa Livro Infantil III" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            <span class="badge" style="font-size: 10px; padding: 2px 6px;">Ed. Infantil</span>
            <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px; color: #FFF;">Infantil III</h4>
          </div>
          <div class="card card--square" style="padding: 6px; text-align: center; background: rgba(20,43,89,0.85); border: 1px solid rgba(118,243,205,0.3);">
            <div style="width: 100%; height: 210px; border-radius: 8px; margin-bottom: 4px; background: rgba(11,31,68,0.4); padding: 4px; display: flex; align-items: center; justify-content: center;">
              <img src="/deck/img/livros/capa_ef1_1ano.png" alt="Capa Livro 1º Ano" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            <span class="badge" style="font-size: 10px; padding: 2px 6px;">Fundamental I</span>
            <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px; color: #FFF;">1º Ano EF</h4>
          </div>
          <div class="card card--square" style="padding: 6px; text-align: center; background: rgba(20,43,89,0.85); border: 1px solid rgba(118,243,205,0.3);">
            <div style="width: 100%; height: 210px; border-radius: 8px; margin-bottom: 4px; background: rgba(11,31,68,0.4); padding: 4px; display: flex; align-items: center; justify-content: center;">
              <img src="/deck/img/livros/capa_ef1_3ano.png" alt="Capa Livro 3º Ano" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            <span class="badge" style="font-size: 10px; padding: 2px 6px;">Fundamental I</span>
            <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px; color: #FFF;">3º Ano EF</h4>
          </div>
          <div class="card card--square" style="padding: 6px; text-align: center; background: rgba(20,43,89,0.85); border: 1px solid rgba(118,243,205,0.3);">
            <div style="width: 100%; height: 210px; border-radius: 8px; margin-bottom: 4px; background: rgba(11,31,68,0.4); padding: 4px; display: flex; align-items: center; justify-content: center;">
              <img src="/deck/img/livros/capa_ef1_4ano.png" alt="Capa Livro 4º Ano" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            <span class="badge" style="font-size: 10px; padding: 2px 6px;">Fundamental I</span>
            <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px; color: #FFF;">4º Ano EF</h4>
          </div>
          <div class="card card--square" style="padding: 6px; text-align: center; background: rgba(20,43,89,0.85); border: 1px solid rgba(118,243,205,0.3);">
            <div style="width: 100%; height: 210px; border-radius: 8px; margin-bottom: 4px; background: rgba(11,31,68,0.4); padding: 4px; display: flex; align-items: center; justify-content: center;">
              <img src="/deck/img/livros/capa_ef1_5ano.png" alt="Capa Livro 5º Ano" style="width: 100%; height: 100%; object-fit: contain; border-radius: 6px;">
            </div>
            <span class="badge" style="font-size: 10px; padding: 2px 6px;">Fundamental I</span>
            <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px; color: #FFF;">5º Ano EF</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 12: HOMESCHOOLING ASPEN -->
    <section class="slide">
      <div class="split split--60" style="align-items: center; gap: 28px;">
        <div class="stack stack--sm">
          <p class="eyebrow" data-anim="rise">Capítulo 06 : Homeschooling</p>
          <h2 class="h2 balance" data-anim="rise" data-delay="100">Cobrança por aluno com acesso gratuito aos pais no modelo famílias</h2>
          <p class="small muted" data-anim="rise" data-delay="200" style="margin-top: 8px;">Trilhas no Trívio (Gramática, Lógica e Retórica). Cobrança individual por aluno matriculado (R$ 249/nível) via parceria comercial Aspen</p>
          <div class="card card--ghost" style="border: 1px dashed var(--accent); margin-top: 16px; padding: 14px;" data-anim="fade" data-delay="300">
            <p class="small accent"><svg class="icon" style="width:16px;height:16px;"><use href="#i-home"></use></svg> <strong>Projeção 2027 :</strong> 100 alunos iniciais com receita de R$ 49.890,00</p>
          </div>
        </div>
        <div class="media media--4x5" data-anim="scale" data-delay="250" style="height: 480px; border-radius: 16px; overflow: hidden;">
          <img src="/deck/img/homeschooling_maker.jpg" alt="Prática de estudo maker em ambiente familiar">
          <div class="scrim"></div>
        </div>
      </div>
    </section>

    <!-- SLIDE 13: ACADEMIA WE MAKE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 06 : Formação Docente</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">A Academia We Make garante suporte proativo e capacitação contínua</h2>
      </div>
      <div class="grid grid-4" style="margin-top: 28px; gap: 16px;" data-anim="rise" data-delay="200">
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">01</span><h3 class="card__title" style="font-size: 16px;">Apresentação</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">02</span><h3 class="card__title" style="font-size: 16px;">Onboarding</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">03</span><h3 class="card__title" style="font-size: 16px;">Diagnóstico</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">04</span><h3 class="card__title" style="font-size: 16px;">Implantação</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">05</span><h3 class="card__title" style="font-size: 16px;">Acompanhamento</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">06</span><h3 class="card__title" style="font-size: 16px;">Formação Temática</h3></div>
        <div class="card card--square" style="padding: 16px;"><span class="eyebrow">07</span><h3 class="card__title" style="font-size: 16px;">Avaliação Ciclo</h3></div>
        <div class="card card--square card--accent" style="padding: 16px;"><span class="eyebrow" style="color: rgba(11,31,68,0.8);">08</span><h3 class="card__title" style="font-size: 16px; color: #0B1F44;">Prescrição</h3></div>
      </div>
    </section>

    <!-- SLIDE 14: MARCO REGULATÓRIO FEDERAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 05 : Marco Regulatório Federal</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Legislação transforma a educação digital em exigência curricular obrigatória</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" data-anim="rise" data-delay="150">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Resolução CNE/CP nº 1/2022</h3>
            <p class="small muted" style="margin-top: 6px;">Pensamento computacional obrigatório em todas as séries da educação básica</p>
          </div>
        </div>
        <div class="card card--square" data-anim="rise" data-delay="250">
          <div class="card__badge"><svg class="icon"><use href="#i-file-text"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">BNCC Computação</h3>
            <p class="small muted" style="margin-top: 6px;">Diretrizes para programação, robótica e cultura maker desde a infância</p>
          </div>
        </div>
        <div class="card card--square card--accent" data-anim="rise" data-delay="350">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Obrigatoriedade 2027</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Escolas privadas que não implantarem o sistema correm risco de sanção</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 15: MARCO ESTADUAL COM MAPA IBGE VETORIAL OFICIAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Mercado Regulado : Leis Estaduais</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Cinco estados estratégicos anteciparam a legislação federal com regras próprias</h2>
      </div>
      <div class="split split--50" style="margin-top: 20px; align-items: center; gap: 24px;">
        <div class="stack stack--sm" data-anim="rise" data-delay="200">
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 12px; font-weight: 800; padding: 4px 8px;">DF · 12 ESCOLAS</span>
            <div><h4 style="font-size: 14px; font-weight: 700; color: #FFF;">Lei nº 7.796/2025</h4><p style="font-size: 12px; color: var(--muted);">Centros de Robótica nas escolas</p></div>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid var(--accent-2);">
            <span class="badge badge--yellow" style="font-size: 12px; font-weight: 800; padding: 4px 8px;">SP · 14 ESCOLAS</span>
            <div><h4 style="font-size: 14px; font-weight: 700; color: #FFF;">Deliberação CEE nº 233/2025</h4><p style="font-size: 12px; color: var(--muted);">Educação Digital obrigatória</p></div>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 12px; font-weight: 800; padding: 4px 8px;">RS · 10 ESCOLAS</span>
            <div><h4 style="font-size: 14px; font-weight: 700; color: #FFF;">Resolução CEEd nº 382/2024</h4><p style="font-size: 12px; color: var(--muted);">Exigência no Ensino Fundamental</p></div>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; gap: 14px; border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 12px; font-weight: 800; padding: 4px 8px;">PR · 8 ESCOLAS</span>
            <div><h4 style="font-size: 14px; font-weight: 700; color: #FFF;">Deliberação CEE nº 04/2025</h4><p style="font-size: 12px; color: var(--muted);">Pensamento computacional privado</p></div>
          </div>
          <div class="card card--accent" style="padding: 14px 18px; display: flex; align-items: center; gap: 14px;">
            <span class="badge" style="font-size: 12px; font-weight: 800; padding: 4px 8px; background: #0B1F44; color: #76F3CD;">MG · 6 ESCOLAS</span>
            <div><h4 style="font-size: 14px; font-weight: 800; color: #0B1F44;">Parecer CEE nº 1.588/2025</h4><p style="font-size: 12px; color: rgba(11,31,68,0.9); font-weight: 600;">Referencial Tecnologias Maker</p></div>
          </div>
        </div>

        <div class="map" data-anim="scale" data-delay="300">
{svg_slide_15}
        </div>
      </div>
    </section>

    <!-- SLIDE 16: TAM / SAM / SOM -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">TAM / SAM / SOM : Oportunidade de Mercado</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Nicho rentável em um mercado de 5.000 escolas confessionais no Brasil</h2>
      </div>
      <div class="stack stack--sm" style="margin-top: 24px;" data-anim="rise" data-delay="200">
        <div class="card" style="padding: 16px 20px; background: rgba(20,43,89,0.75);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div><span class="eyebrow" style="color: var(--accent); font-size: 11px;">TAM : Mercado Total Privado</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">41.746 Escolas Privadas no Brasil</h4></div>
            <span class="stat__value" style="font-size: 22px; font-weight: 800; color: #FFF;">100%</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;"><div style="width: 100%; height: 100%; background: linear-gradient(90deg, #4C8ADE, #76F3CD); border-radius: 999px;"></div></div>
        </div>
        <div class="card" style="padding: 16px 20px; background: rgba(20,43,89,0.75); margin-left: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div><span class="eyebrow" style="color: var(--accent); font-size: 11px;">Segmento de Referência</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">24.683 Escolas de Ensino Fundamental</h4></div>
            <span class="stat__value" style="font-size: 22px; font-weight: 800; color: #FFF;">59%</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;"><div style="width: 59%; height: 100%; background: linear-gradient(90deg, #4C8ADE, #76F3CD); border-radius: 999px;"></div></div>
        </div>
        <div class="card card--accent" style="padding: 16px 20px; margin-left: 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div><span class="eyebrow" style="color: rgba(11,31,68,0.8); font-size: 11px;">SAM : Mercado Confessional Alvo</span><h4 style="font-size: 15px; font-weight: 800; color: #0B1F44;">5.000 Escolas Confessionais no Brasil</h4></div>
            <span class="stat__value" style="font-size: 26px; font-weight: 800; color: #0B1F44;">12%</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(11,31,68,0.15); border-radius: 999px; overflow: hidden;"><div style="width: 100%; height: 100%; background: #0B1F44; border-radius: 999px;"></div></div>
        </div>
        <div class="card" style="padding: 16px 20px; background: rgba(20,43,89,0.9); border: 2px solid var(--accent-2); margin-left: 60px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div><span class="eyebrow" style="color: var(--accent-2); font-size: 11px;">SOM : Meta de Captura We Make 2031</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">1.400 Escolas no Perfil We Make (Penetração 28%)</h4></div>
            <span class="stat__value accent-sky" style="font-size: 22px; font-weight: 800;">5%–8%</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;"><div style="width: 65%; height: 100%; background: #FFCC00; border-radius: 999px;"></div></div>
        </div>
      </div>
    </section>

    <!-- SLIDE 17: ANÁLISE DE CONCORRÊNCIA -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 05 : Análise Competitiva</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Matriz de diferenciação frente aos fornecedores tradicionais</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 20px;">
          <div class="card__badge"><svg class="icon"><use href="#i-box"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Sistemas Genéricos</h3>
            <p class="small muted" style="margin-top: 6px;">Soluções sem cosmovisão cristã, focadas apenas em vendas sem mentoria docente</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 20px;">
          <div class="card__badge"><svg class="icon"><use href="#i-dollar-sign"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Big Techs / Franquias</h3>
            <p class="small muted" style="margin-top: 6px;">Custos elevados de franquia e suporte distante sem adequação confessional</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 20px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-sparkles"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Posição We Make</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Ecossistema completo com valor acessível, suporte proativo e chancela institucional</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 18: PARCERIAS ESTRATÉGICAS -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 04 : Alianças Estratégicas</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Canais de distribuição com entidades representativas do setor</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">ACSI Brasil</h3>
            <p class="small muted" style="margin-top: 6px;">Aliança estratégica para chancela e acesso às escolas confessionais associadas</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-users"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">AXE Brasil</h3>
            <p class="small muted" style="margin-top: 6px;">Canal institucional para capacitação e engajamento das lideranças educacionais</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-truck"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Gráfica Especializada SP</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Produção em escala de livros didáticos físicos garantindo baixo custo unitário</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 19: PROPOSTA DE VALOR & VANTAGEM COMPETITIVA -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 03 : Vantagem Competitiva</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Barreiras de entrada que protegem o crescimento da empresa</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-book-open"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Propriedade Intelectual</h3>
            <p class="small muted" style="margin-top: 6px;">Currículo autoral registrado com 5 anos de desenvolvimento e testagem em sala</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Plataforma Autoral Arkos</h3>
            <p class="small muted" style="margin-top: 6px;">Software próprio desenvolvido para a metodologia We Make, criando custo de troca elevado</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-heart"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Confiança dos Mantenedores</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Relacionamento direto e reputação sólida junto à comunidade escolar confessional</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 20: DENSIDADE NACIONAL COM MAPA VETORIAL IBGE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 04 : Densidade &amp; Distribuição de Escolas</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Densidade de escolas parceiras por estado com rótulos e quantidades exatas</h2>
      </div>
      <div class="split split--50" style="margin-top: 20px; align-items: center; gap: 24px;">
        <div class="grid grid-3" style="gap: 10px;" data-anim="rise" data-delay="200">
          <div class="card card--square card--accent" style="padding: 10px; text-align: center;">
            <span class="stat__value" style="font-size: 22px; color: #0B1F44; font-weight: 800;">DF</span>
            <p class="small" style="color:rgba(11,31,68,0.9);font-weight:800;font-size:11px;">12 Escolas (Sede)</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent-sky" style="font-size: 22px; font-weight: 800;">SP</span>
            <p class="small" style="color: var(--accent-2); font-weight: 700; font-size:11px;">14 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">RS</span>
            <p class="small accent" style="font-weight: 700; font-size:11px;">10 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">PR</span>
            <p class="small muted" style="font-size:11px;">8 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">SC</span>
            <p class="small muted" style="font-size:11px;">6 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">PB</span>
            <p class="small muted" style="font-size:11px;">5 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">ES</span>
            <p class="small muted" style="font-size:11px;">4 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">CE</span>
            <p class="small muted" style="font-size:11px;">4 Escolas Alvo</p>
          </div>
          <div class="card card--square" style="padding: 10px; text-align: center;">
            <span class="stat__value accent" style="font-size: 22px; font-weight: 800;">MA</span>
            <p class="small muted" style="font-size:11px;">3 Escolas Alvo</p>
          </div>
        </div>

        <div class="map" data-anim="scale" data-delay="300">
{svg_slide_20}
        </div>
      </div>
    </section>

    <!-- SLIDE 21: GO-TO-MARKET E CANAIS -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 08 : Go-To-Market</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Estrutura comercial com prospeção ativa e representantes PJ</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-users"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Modelo de Venda</span>
            <h3 class="card__title">Representantes PJ</h3>
            <p class="small muted" style="margin-top: 6px;">Fixo inicial de R$ 2.000,00 + comissão escalonada por contrato fechado</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-clock"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Ciclo de Vendas</span>
            <h3 class="card__title">4 a 8 Semanas</h3>
            <p class="small muted" style="margin-top: 6px;">Reunião com mantenedor, apresentação do Kit e envio de proposta formal</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-calendar"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Eventos Setoriais</span>
            <h3 class="card__title" style="color: #0B1F44;">Congressos ACSI</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Presença em estandes e palestras técnicas nos eventos de educação cristã</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 22: FUNIL DE VENDAS METRIFICADO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 08 : Metrificação Comercial</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Funil de conversão projetado para captação constante de 10 novas escolas por ano</h2>
      </div>
      <div class="stack stack--sm" style="margin-top: 24px;" data-anim="rise" data-delay="200">
        <div class="card" style="padding: 14px 20px; background: rgba(20,43,89,0.75);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div><span class="eyebrow" style="color: var(--accent);">Topo : 100 Escolas Prospectadas</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Abordagem inicial e qualificação com mantenedores</h4></div>
            <span class="stat__value" style="font-size: 20px; font-weight: 800; color: #FFF;">100%</span>
          </div>
        </div>
        <div class="card" style="padding: 14px 20px; background: rgba(20,43,89,0.75); margin-left: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div><span class="eyebrow" style="color: var(--accent);">Meio : 40 Reuniões Apresentação</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Apresentação presencial do Kit We Make e degustação</h4></div>
            <span class="stat__value" style="font-size: 20px; font-weight: 800; color: #FFF;">40%</span>
          </div>
        </div>
        <div class="card" style="padding: 14px 20px; background: rgba(20,43,89,0.75); margin-left: 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div><span class="eyebrow" style="color: var(--accent);">Fundo : 20 Propostas Enviadas</span><h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Envio de proposta orçamentária e minutas de contrato</h4></div>
            <span class="stat__value" style="font-size: 20px; font-weight: 800; color: #FFF;">20%</span>
          </div>
        </div>
        <div class="card card--accent" style="padding: 14px 20px; margin-left: 60px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div><span class="eyebrow" style="color: rgba(11,31,68,0.8);">Fechamento : 10 Novas Escolas Fechadas</span><h4 style="font-size: 15px; font-weight: 800; color: #0B1F44;">Assinatura do Kit We Make e início do onboarding</h4></div>
            <span class="stat__value" style="font-size: 22px; font-weight: 800; color: #0B1F44;">10%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 23: MODELO DE RECEITA INTEGRADO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 07 : Modelo de Receita</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Monetização recorrente ancorada na venda do Kit por aluno ao ano</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-book-open"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Componente 01</span>
            <h3 class="card__title">Kit por Aluno</h3>
            <p class="small muted" style="margin-top: 6px;">R$ 420/ano de ticket de referência cobrado da escola ou famílias</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-home"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Componente 02</span>
            <h3 class="card__title">Homeschooling B2C</h3>
            <p class="small muted" style="margin-top: 6px;">R$ 249 por nível matriculado com acesso gratuito aos pais</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-refresh-cw"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Retenção</span>
            <h3 class="card__title" style="color: #0B1F44;">Renovação Anual</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Retenção projetada de 90% a 95% sustentada pela mentoria proativa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 24: ESTRUTURA DE CUSTOS E MARGEM EDITORIAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 07 : Estrutura de Custos</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Margem bruta editorial superior a 80% viabiliza suporte presencial</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-dollar-sign"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">COGS R$ 55,56</h3>
            <p class="small muted" style="margin-top: 6px;">Custo unitário de impressão e transporte dos livros didáticos físicos</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-award"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">86,7% Margem Bruta</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Alta rentabilidade bruta cobrindo mentoria docente e consultoria</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-users"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Folha R$ 354,7k/ano</h3>
            <p class="small muted" style="margin-top: 6px;">Custo fixo enxuto da equipe executiva, pedagógica e comercial</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 25: DADOS FINANCEIROS HISTÓRICOS 2024-2026 -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 09 : Histórico Financeiro</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Multiplicamos por seis a presença em escolas em dois anos de operação</h2>
      </div>
      <div class="grid grid-4" style="margin-top: 28px; gap: 16px;">
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-building-2"></use></svg></div>
          <div class="card__body">
            <p class="stat__value accent" style="font-size: 32px;">2 → 12</p>
            <h3 class="card__title" style="font-size: 16px;">Escolas Parcerias</h3>
            <p class="small muted" style="margin-top: 4px;">Crescimento de 500% em 2 anos</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-users"></use></svg></div>
          <div class="card__body">
            <p class="stat__value accent-sky" style="font-size: 32px;">2.000</p>
            <h3 class="card__title" style="font-size: 16px;">Alunos Atendidos</h3>
            <p class="small muted" style="margin-top: 4px;">Atendidos na rede parceira</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-dollar-sign"></use></svg></div>
          <div class="card__body">
            <p class="stat__value accent" style="font-size: 32px;">R$ 951k</p>
            <h3 class="card__title" style="font-size: 16px;">Contratado 2027</h3>
            <p class="small muted" style="margin-top: 4px;">86,5% da meta contratada</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 18px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <p class="stat__value" style="font-size: 32px; color: #0B1F44;">100%</p>
            <h3 class="card__title" style="font-size: 16px; color: #0B1F44;">Validação Real</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 4px;">Operação autossustentável</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 26: PROJEÇÕES DRE DENSAS 2027-2031 -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 09 : Projeção Financeira DRE</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Progressão financeira de 5 anos com metas de receita e margem operacional</h2>
      </div>
      <div style="margin-top: 20px; overflow-x: auto;" data-anim="rise" data-delay="200">
        <table class="table" style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid var(--accent); text-align: left;">
              <th style="padding: 10px;">Indicador (R$)</th>
              <th style="padding: 10px;">2027</th>
              <th style="padding: 10px;">2028</th>
              <th style="padding: 10px;">2029</th>
              <th style="padding: 10px;">2030</th>
              <th style="padding: 10px;">2031</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 10px; font-weight: 700; color: #FFF;">Escolas Contratantes</td>
              <td style="padding: 10px;">22</td>
              <td style="padding: 10px;">32</td>
              <td style="padding: 10px;">42</td>
              <td style="padding: 10px;">52</td>
              <td style="padding: 10px;">62</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 10px; font-weight: 700; color: #FFF;">Alunos Atendidos (Meta)</td>
              <td style="padding: 10px;">4.000</td>
              <td style="padding: 10px;">6.000</td>
              <td style="padding: 10px;">9.000</td>
              <td style="padding: 10px;">13.500</td>
              <td style="padding: 10px;">20.250</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">Receita Bruta Total</td>
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">R$ 1.149.890</td>
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">R$ 1.764.835</td>
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">R$ 2.684.753</td>
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">R$ 4.064.629</td>
              <td style="padding: 10px; font-weight: 700; color: var(--accent);">R$ 6.134.444</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
              <td style="padding: 10px; color: var(--muted);">Despesas Operacionais</td>
              <td style="padding: 10px;">R$ 848.330</td>
              <td style="padding: 10px;">R$ 1.250.000</td>
              <td style="padding: 10px;">R$ 1.850.000</td>
              <td style="padding: 10px;">R$ 2.750.000</td>
              <td style="padding: 10px;">R$ 4.100.000</td>
            </tr>
            <tr style="background: rgba(118,243,205,0.15);">
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">EBITDA / Lucro Líquido</td>
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">R$ 301.560 (26,2%)</td>
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">R$ 514.835 (29,2%)</td>
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">R$ 834.753 (31,1%)</td>
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">R$ 1.314.629 (32,3%)</td>
              <td style="padding: 10px; font-weight: 800; color: #76F3CD;">R$ 2.034.444 (33,2%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SLIDE 27: ALOCAÇÃO ORÇAMENTÁRIA (SEPARATED SPLIT LAYOUT WITH ZERO OVERLAP) -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 09 : Alocação Orçamentária</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Distribuição eficiente dos custos operacionais no orçamento 2027</h2>
      </div>
      <div class="split split--50" style="margin-top: 24px; align-items: center; gap: 32px;">
        <div class="stack stack--sm" data-anim="rise" data-delay="200">
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;"><div style="width:12px;height:12px;border-radius:50%;background:#76F3CD;"></div><span style="font-weight:700;color:#FFF;">Folha de Pessoal</span></div>
            <span style="font-weight:800;color:#76F3CD;">R$ 354,7k (41,8%)</span>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;"><div style="width:12px;height:12px;border-radius:50%;background:#FFCC00;"></div><span style="font-weight:700;color:#FFF;">COGS Impressão Livros</span></div>
            <span style="font-weight:800;color:#FFCC00;">R$ 222,2k (26,2%)</span>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;"><div style="width:12px;height:12px;border-radius:50%;background:#4C8ADE;"></div><span style="font-weight:700;color:#FFF;">Comercial &amp; Viagens SP</span></div>
            <span style="font-weight:800;color:#4C8ADE;">R$ 150,0k (17,7%)</span>
          </div>
          <div class="card" style="padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;"><div style="width:12px;height:12px;border-radius:50%;background:#A8C4E6;"></div><span style="font-weight:700;color:#FFF;">TI &amp; Operações Arkos</span></div>
            <span style="font-weight:800;color:#A8C4E6;">R$ 121,4k (14,3%)</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; position: relative;" data-anim="scale" data-delay="300">
          <svg viewBox="0 0 240 240" style="width: 240px; height: 240px;">
            <circle cx="120" cy="120" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="26"/>
            <!-- Folha 41.8% -->
            <circle cx="120" cy="120" r="90" fill="none" stroke="#76F3CD" stroke-width="26" stroke-dasharray="236 330" stroke-dashoffset="0"/>
            <!-- COGS 26.2% -->
            <circle cx="120" cy="120" r="90" fill="none" stroke="#FFCC00" stroke-width="26" stroke-dasharray="148 418" stroke-dashoffset="-236"/>
            <!-- Comercial 17.7% -->
            <circle cx="120" cy="120" r="90" fill="none" stroke="#4C8ADE" stroke-width="26" stroke-dasharray="100 466" stroke-dashoffset="-384"/>
            <!-- TI 14.3% -->
            <circle cx="120" cy="120" r="90" fill="none" stroke="#A8C4E6" stroke-width="26" stroke-dasharray="81 485" stroke-dashoffset="-484"/>
          </svg>
          <div style="position: absolute; text-anchor: middle; text-align: center;">
            <p style="font-size: 24px; font-weight: 900; color: #FFF; line-height: 1;">R$ 848k</p>
            <p style="font-size: 12px; color: var(--accent); font-weight: 700; margin-top: 4px;">Despesas 2027</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 28: NECESSIDADE DE CAPITAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 10 : Necessidade de Capital</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Investimento estratégico para acelerar o motor de expansão comercial</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-target"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Destino 01</span>
            <h3 class="card__title">Força Comercial SP</h3>
            <p class="small muted" style="margin-top: 6px;">Contratação e suporte de representantes em São Paulo e regiões chave</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-book"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Destino 02</span>
            <h3 class="card__title">Estoque Editorial</h3>
            <p class="small muted" style="margin-top: 6px;">Capital de giro para lote inicial de impressão e logística de distribuição</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Destino 03</span>
            <h3 class="card__title" style="color: #0B1F44;">Evolução Arkos</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Aprimoramento da inteligência pedagógica e dashboards no LMS</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 29: ANÁLISE DE SENSIBILIDADE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 10 : Gestão de Riscos</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Análise de sensibilidade garante resiliência mesmo em cenários adversos</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-alert-circle"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Cenário Conservador</span>
            <h3 class="card__title">5 Escolas / Ano</h3>
            <p class="small muted" style="margin-top: 6px;">Captando 50% da meta, a operação mantém ponto de equilíbrio financeiro</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Cenário Base</span>
            <h3 class="card__title" style="color: #0B1F44;">10 Escolas / Ano</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Cumprimento do plano de negócios com 26,2% a 33,2% de margem líquida</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-zap"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Cenário Otimista</span>
            <h3 class="card__title">15 Escolas / Ano</h3>
            <p class="small muted" style="margin-top: 6px;">Aceleração via parcerias com redes confessionais estaduais</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 30: FACULDADE DE TECNOLOGIA FASE 2 -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 13 : Visão de Longo Prazo</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Faculdade de Tecnologia We Make como topo do funil de autoridade no futuro</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-graduation-cap"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Graduação &amp; Pós</h3>
            <p class="small muted" style="margin-top: 6px;">Formação de novos docentes e engenheiros com cosmovisão cristã</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-award"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Pesquisa Aplicada</h3>
            <p class="small muted" style="margin-top: 6px;">Consolidação do braço de P&amp;D e publicação científica sobre ciberética</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Chancela de Marca</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Elevação máxima do valor percebido das escolas que adotam o Kit We Make</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 31: PLANO DE IMPLANTAÇÃO PASSO A PASSO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 11 : Execução Operacional</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Cronograma detalhado de implantação em quatro fases estratégicas</h2>
      </div>
      <div class="grid grid-4" style="margin-top: 28px; gap: 16px;">
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-calendar"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Fase 01</span>
            <h3 class="card__title" style="font-size: 18px;">Assinatura &amp; Kit</h3>
            <p class="small muted" style="margin-top: 4px;">Formalização e envio do acervo</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-wrench"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Fase 02</span>
            <h3 class="card__title" style="font-size: 18px;">Espaço Maker</h3>
            <p class="small muted" style="margin-top: 4px;">Adequação do laboratório físico</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 18px;">
          <div class="card__badge"><svg class="icon"><use href="#i-graduation-cap"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Fase 03</span>
            <h3 class="card__title" style="font-size: 18px;">Onboarding Docente</h3>
            <p class="small muted" style="margin-top: 4px;">Imersão de 12 horas presenciais</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 18px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Fase 04</span>
            <h3 class="card__title" style="font-size: 18px; color: #0B1F44;">Mentoria Contínua</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 4px;">Acompanhamento semanal</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 32: CONSOLIDAÇÃO DE CAPACIDADE OPERACIONAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 07 : Escala Operacional</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Capacidade de atendimento para expansão nacional com qualidade</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-truck"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Logística Nacional</h3>
            <p class="small muted" style="margin-top: 6px;">Contratos com transportadoras garantindo entrega do Kit em todo o Brasil</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-cpu"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Servidores em Nuvem</h3>
            <p class="small muted" style="margin-top: 6px;">Infraestrutura Arkos preparada para suportar até 50.000 alunos simultâneos</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-award"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Rede de Mentores</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Corpo de tutores treinados pela Academia We Make sob supervisão da Suzana</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 33: GOVERNANÇA E CONTROLE DE QUALIDADE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 02 : Garantia de Qualidade</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Auditoria pedagógica e acompanhamento direto da liderança executiva</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Avaliação por Ciclo</h3>
            <p class="small muted" style="margin-top: 6px;">Relatórios semestrais de evolução dos alunos enviados aos mantenedores</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Fidelidade Doutrinária</h3>
            <p class="small muted" style="margin-top: 6px;">Revisão rigorosa dos materiais garantindo alinhamento confessional integral</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-star"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">NPS das Escolas</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Pesquisas de satisfação periódicas com direção, professores e pais</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 34: ESTRATÉGIA DE RETENÇÃO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 08 : Retenção de Clientes</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Mentoria proativa cria relacionamentos de longo prazo com as escolas</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-heart"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Postura Propositiva</h3>
            <p class="small muted" style="margin-top: 6px;">Consultoria pedagógica que antecipa necessidades da escola em vez de ser reativa</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-refresh-cw"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Custo de Troca Elevado</h3>
            <p class="small muted" style="margin-top: 6px;">Integração profunda do currículo e plataforma no dia a dia da instituição</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-award"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Certificação Anual</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Selo de referência em tecnologia maker concedido às escolas ativas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 35: RESUMO EXECUTIVO DE IMPACTO SOCIAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 03 : Impacto Educacional</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Transformando tempo de tela em capacidade de criação e liderança</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Proteção Infantojuvenil</h3>
            <p class="small muted" style="margin-top: 6px;">Combate ao vício passivo em redes sociais através do trabalho criativo</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-lightbulb"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Formação do Caráter</h3>
            <p class="small muted" style="margin-top: 6px;">Estímulo às virtudes morais, perseverança e sabedoria prática</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-star"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Preparo para o Futuro</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Capacitação real para os desafios da inteligência artificial e novas carreiras</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 36: MATRIZ DE RISCOS E MITIGAÇÃO -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 10 : Matriz de Riscos</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Identificação proativa e plano de mitigação para a operação</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-alert-triangle"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: #FF6B6B;">Risco 01</span>
            <h3 class="card__title">Turnover Docente</h3>
            <p class="small muted" style="margin-top: 6px;">Mitigação: Academia We Make com repositório gravado e onboarding contínuo</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-truck"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: #FFCC00;">Risco 02</span>
            <h3 class="card__title">Atraso Gráfico</h3>
            <p class="small muted" style="margin-top: 6px;">Mitigação: Impressão antecedente do lote anual em SP com margem de segurança</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Risco 03</span>
            <h3 class="card__title" style="color: #0B1F44;">Inadimplência</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Mitigação: Faturamento B2B faturado direto com o mantenedor escolar</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 37: ESTRUTURA JURÍDICA E PATENTES -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 02 : Proteção Jurídica</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Ativos intelectuais e estrutura corporativa totalmente regularizados</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Marca Registrada</h3>
            <p class="small muted" style="margin-top: 6px;">Marca We Make e slogan registrados junto ao INPI</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-book-open"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Direitos Autorais</h3>
            <p class="small muted" style="margin-top: 6px;">Coleção didática e projetos autorais protegidos pela Lei de Direitos Autorais</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-file-text"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">CNPJ Regular</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">CNPJ 48.760.895/0001-99 ativo em situação cadastral regularizada</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 38: METAS DE EXPANSÃO 2027-2031 -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 04 : Metas de Expansão</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Visão de futuro : 62 escolas parceiras e mais de 20.000 alunos em 2031</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-target"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Meta 2027</span>
            <h3 class="card__title">22 Escolas · 4.000 Alunos</h3>
            <p class="small muted" style="margin-top: 6px;">Consolidação do DF e entrada oficial nos mercados de SP e RS</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-trending-up"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow">Meta 2029</span>
            <h3 class="card__title">42 Escolas · 9.000 Alunos</h3>
            <p class="small muted" style="margin-top: 6px;">Expansão regional estruturada nos polos Sul e Sudeste</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-flag"></use></svg></div>
          <div class="card__body">
            <span class="eyebrow" style="color: rgba(11,31,68,0.8);">Meta 2031</span>
            <h3 class="card__title" style="color: #0B1F44;">62 Escolas · 20.250 Alunos</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Liderança absoluta em educação tecnológica confessional no Brasil</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 39: POR QUE A WE MAKE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Síntese Estratégica : Por Que a We Make</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">O único sistema que une autoridade intelectual, software autoral e chancela</h2>
      </div>
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-check"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Produto Validado</h3>
            <p class="small muted" style="margin-top: 6px;">12 escolas ativas, 2.000 alunos e R$ 951k já contratados para 2027</p>
          </div>
        </div>
        <div class="card card--square" style="padding: 22px;">
          <div class="card__badge"><svg class="icon"><use href="#i-shield"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title">Alinhamento Confessional</h3>
            <p class="small muted" style="margin-top: 6px;">Chancela e parceria institucional permanente com as redes confessionais</p>
          </div>
        </div>
        <div class="card card--square card--accent" style="padding: 22px;">
          <div class="card__badge" style="background: rgba(11,31,68,0.15); color: #0B1F44;"><svg class="icon"><use href="#i-star"></use></svg></div>
          <div class="card__body">
            <h3 class="card__title" style="color: #0B1F44;">Rentabilidade Altíssima</h3>
            <p class="small" style="color: rgba(11,31,68,0.85); margin-top: 6px;">Margem bruta de 86,7% e margem líquida sustentável de 26,2% a 33,2%</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SLIDE 40: FECHO E CHAMADA PARA AÇÃO COM CONTATO -->
    <section class="slide slide--tight" data-theme="wemake">
      <div class="stack stack--sm" style="margin-top: auto; margin-bottom: auto; text-align: center;">
        <span class="badge" style="font-size: 14px; padding: 6px 20px; border-radius: 999px; margin: 0 auto;" data-anim="rise">PRÓXIMOS PASSOS · 2027–2031</span>
        <h2 class="display balance" data-anim="rise" data-delay="100" style="font-size: 64px; line-height: 1.1; margin-top: 16px;">
          Junte-se a nós na transformação da educação tecnológica no Brasil
        </h2>
        <p class="lede balance" data-anim="rise" data-delay="200" style="margin: 16px auto 0; font-size: 24px; max-width: 30ch;">
          Reunião de alinhamento com a diretoria executiva e agendamento de degustação do Kit
        </p>

        <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 36px;" data-anim="scale" data-delay="300">
          <div class="card card--accent" style="padding: 16px 28px; border-radius: 999px; display: flex; align-items: center; gap: 12px;">
            <svg class="icon" style="width:24px;height:24px;color:#0B1F44;"><use href="#i-mail"></use></svg>
            <span style="font-weight: 800; color: #0B1F44; font-size: 18px;">denis@wemake.tec.br</span>
          </div>
          <div class="card" style="padding: 16px 28px; border-radius: 999px; display: flex; align-items: center; gap: 12px; background: rgba(20,43,89,0.9);">
            <svg class="icon" style="width:24px;height:24px;color:var(--accent);"><use href="#i-globe"></use></svg>
            <span style="font-weight: 800; color: #FFF; font-size: 18px;">wemake.tec.br</span>
          </div>
        </div>
      </div>
      <div class="footer" data-anim="fade" data-delay="400">
        <span>We Make Educação Tecnológica LTDA</span>
        <span>•</span>
        <span>Prazo de Resposta : 48 Horas</span>
        <span>•</span>
        <span>Responsável : Dênis Júlio Pereira Francisco</span>
      </div>
    </section>

  </div>

  <script src="/deck/motion.js"></script>
</body>
</html>
'''

with open(r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\index.html', 'w', encoding='utf-8') as f:
    f.write(deck_template)

shutil.copyfile(r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\index.html', r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\deck.html')
shutil.copyfile(r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\index.html', r'C:\repositorio\decks\wemake-plano\index.html')
shutil.copyfile(r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\index.html', r'C:\repositorio\decks\wemake-plano\deck.html')
shutil.copyfile(r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\brand.css', r'C:\repositorio\decks\wemake-plano\brand.css')

print("Successfully generated perfect 40-slide presentation deck with IBGE vector map and square cards!")
