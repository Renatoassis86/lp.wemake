import urllib.request
import json
import shutil
import os

print("=== STARTING FULL DECK AND A4 UPDATE SCRIPT ===")

# 1. FETCH IBGE BRAZIL GEOJSON FOR SVG MAP
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

# SVG Map for A4 Report (Light background version)
svg_a4_map = '<svg viewBox="0 0 500 480" style="width: 100%; max-width: 500px; height: auto; margin: 0 auto; display: block; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));">\n  <g class="brazil-states">\n'
for sigla, d_str in state_paths.items():
    if sigla in target_density:
        fill = "#0E2A47" if sigla != 'SP' else "#D97706"
        stroke = "#1E3A8A"
        stroke_w = "1.5"
    else:
        fill = "#E2E8F0"
        stroke = "#94A3B8"
        stroke_w = "1"
    svg_a4_map += f'    <path d="{d_str}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_w}" />\n'

svg_a4_map += f'''  </g>
  <circle cx="{df_x}" cy="{df_y}" r="8" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
  <rect x="{df_x - 65}" y="{df_y - 30}" width="130" height="22" rx="11" fill="#0E2A47"/>
  <text x="{df_x}" y="{df_y - 15}" text-anchor="middle" fill="#76F3CD" font-weight="800" font-size="10">DF (SEDE) · 12 ESCOLAS</text>
</svg>'''

print("Generated SVG Maps for Slides and A4 Report!")

print("=== UPDATE FINISHED SUCCESSFULLY ===")
