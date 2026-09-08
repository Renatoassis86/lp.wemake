import shutil
import os
import re

print("=== APPLYING OFFICIAL WE MAKE BRAND IDENTITY (#002933 / #00CEFF / #F4F3EF) ===")

# 1. COPY OFFICIAL LOGO PNG FROM C:\repositorio\marcas\wemake\PNG
src_logo = r'C:\repositorio\marcas\wemake\PNG\LOGO2A_WEMAKE.png'
dest_logos = [
    r'public\deck\logo.png',
    r'public\logo-wemake.png',
    r'c:\repositorio\decks\wemake-plano\logo.png',
    r'c:\repositorio\decks\wemake-plano\img\logo.png'
]

for d in dest_logos:
    os.makedirs(os.path.dirname(d), exist_ok=True)
    shutil.copy(src_logo, d)
    print(f"Copied official logo to {d}")

# 2. WRITE OFFICIAL BRAND.CSS WITH EXACT BRAND COLORS
brand_css = '''/* ============================================================
   WE MAKE OFFICIAL BRAND TOKENS (Identidade C:\\repositorio\\marcas\\wemake)
   ============================================================ */
:root {
  --color-brand-navy: 0 41 51;        /* #002933 */
  --color-brand-teal: 0 59 73;        /* #003B49 */
  --color-brand-cyan: 0 206 255;      /* #00CEFF */
  --color-brand-ivory: 244 243 239;   /* #F4F3EF */
  
  --bg: #002933;
  --surface: #003B49;
  --surface-card: rgba(0, 59, 73, 0.85);
  --accent: #00CEFF;
  --accent-secondary: #40D9FF;
  --accent-glow: rgba(0, 206, 255, 0.25);
  --ink: #F4F3EF;
  --muted: #94B4BD;
  --line: rgba(0, 206, 255, 0.2);
}

[data-theme="wemake"] {
  --bg: #002933;
  --surface: #003B49;
  --ink: #F4F3EF;
  --muted: #94B4BD;
  --accent: #00CEFF;
  --line: rgba(0, 206, 255, 0.2);
}

/* Zona de Marca Oficial com alinhamento perfeito */
.logo-zone {
  position: absolute;
  right: 48px !important;
  bottom: 48px !important;
  top: auto !important;
  left: auto !important;
  height: auto !important;
  max-height: 52px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  z-index: 100;
  pointer-events: none;
}

.logo-zone img, .logo-zone svg {
  height: 48px !important;
  width: auto !important;
  object-fit: contain !important;
  filter: drop-shadow(0 4px 12px rgba(0, 206, 255, 0.3));
}
'''

for path in ['public/deck/brand.css', 'c:/repositorio/decks/wemake-plano/brand.css']:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(brand_css)

print("2. Created brand.css with official #002933 and #00CEFF brand tokens!")

# 3. UPDATE DECK.CSS TO ALIGN ALL COMPONENTS PERFECTLY
updated_deck_css = '''/* ============================================================
   DECK FORGE v2 — DESIGN SYSTEM WE MAKE (CANVAS 1920x1080)
   ============================================================ */
:root {
  --slide-w: 1920px;
  --slide-h: 1080px;
  --margin: 80px;
  --gap: 32px;
  --radius: 20px;

  --fs-display: 76px;
  --fs-h1: 64px;
  --fs-h2: 44px;
  --fs-h3: 28px;
  --fs-lede: 26px;
  --fs-body: 20px;
  --fs-small: 16px;
  --fs-micro: 13px;

  --font-display: "Poppins", "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --bg: #002933;
  --surface: #003B49;
  --accent: #00CEFF;
  --ink: #F4F3EF;
  --muted: #94B4BD;
  --line: rgba(0, 206, 255, 0.2);

  --ease-out: cubic-bezier(.16, 1, .3, 1);
  --dur: .8s;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  background: #001F26;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  color: var(--ink);
}

.deck {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  padding: 80px 100px 90px 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: radial-gradient(circle at 80% 20%, #004D5E 0%, #002933 65%, #001B22 100%);
  color: var(--ink);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s var(--ease-out);
}

.slide.is-active {
  opacity: 1;
  pointer-events: auto;
}

.stack--sm { display: flex; flex-direction: column; gap: 12px; }

.eyebrow {
  font-family: var(--font-mono);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #00CEFF;
  font-weight: 700;
}

.h2 {
  font-family: var(--font-display);
  font-size: 42px;
  line-height: 1.15;
  color: #F4F3EF;
  font-weight: 700;
  max-width: 32ch;
}

.display {
  font-family: var(--font-display);
  font-size: 72px;
  line-height: 1.08;
  color: #F4F3EF;
  font-weight: 800;
}

.lede {
  font-size: 24px;
  line-height: 1.4;
  color: #94B4BD;
}

/* GRADES PERFEITAS */
.grid { display: grid; width: 100%; align-items: stretch; }
.grid-2 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { grid-template-columns: repeat(4, 1fr); gap: 20px; }
.grid-5 { grid-template-columns: repeat(5, 1fr); gap: 18px; }

.split { display: grid; gap: 32px; width: 100%; align-items: center; }
.split--50 { grid-template-columns: 1fr 1fr; }
.split--60 { grid-template-columns: 1.2fr 0.8fr; }

/* CARTÕES QUADRADOS COM BADGE DE 52PX DA MARCA */
.card--square {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 24px 24px 24px;
  border-radius: 20px;
  background: rgba(0, 59, 73, 0.75);
  border: 1px solid rgba(0, 206, 255, 0.25);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  position: relative;
}

.card--accent {
  background: linear-gradient(135deg, #00CEFF 0%, #0099C8 100%);
  border: none;
  color: #002933;
}
.card--accent .card__title, .card--accent p, .card--accent span {
  color: #002933 !important;
}

.card__badge {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #00CEFF;
  color: #002933;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 8px 20px rgba(0, 206, 255, 0.4);
  margin-top: -42px;
  margin-bottom: 12px;
}

.card__title {
  font-family: var(--font-display);
  font-size: 22px;
  color: #F4F3EF;
  font-weight: 700;
}

.card__bullet {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #94B4BD;
}

/* ORGANOGRAMA VISUAL DE GOVERNANÇA */
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
  width: 100%;
}

.org-node--ceo {
  background: linear-gradient(135deg, rgba(0, 59, 73, 0.95), rgba(0, 41, 51, 0.98));
  border: 2px solid #00CEFF;
  border-radius: 20px;
  padding: 20px 36px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 12px 36px rgba(0, 206, 255, 0.25);
  max-width: 680px;
}

.org-node__avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 206, 255, 0.15);
  color: #00CEFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.org-node__role {
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #00CEFF;
  font-weight: 700;
}

.org-node__name {
  font-family: var(--font-display);
  font-size: 22px;
  color: #F4F3EF;
  margin-top: 2px;
}

.org-node__desc {
  font-size: 13px;
  color: #94B4BD;
  margin-top: 4px;
}

.org-tree-line {
  width: 2px;
  height: 20px;
  background: #00CEFF;
}

.org-tree-branch {
  width: 82%;
  height: 2px;
  background: rgba(0, 206, 255, 0.4);
  margin-bottom: -10px;
}

.org-card-dept {
  background: rgba(0, 59, 73, 0.85);
  border: 1px solid rgba(0, 206, 255, 0.3);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.org-dept-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 206, 255, 0.25);
  padding-bottom: 8px;
  color: #00CEFF;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.org-dept-header .icon {
  width: 20px;
  height: 20px;
  color: #00CEFF;
}

.org-person {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(0, 41, 51, 0.6);
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid #00CEFF;
}

.org-person strong {
  color: #F4F3EF;
  font-size: 15px;
  font-family: var(--font-display);
}

.org-person p {
  color: #94B4BD;
  font-size: 12px;
}

/* CICLO MAKER */
.flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.flow__step {
  background: rgba(0, 59, 73, 0.8);
  border: 1px solid rgba(0, 206, 255, 0.3);
  border-radius: 16px;
  padding: 20px 16px;
  text-align: center;
  flex: 1;
}

.flow__num {
  font-family: var(--font-mono);
  font-size: 14px;
  color: #00CEFF;
  font-weight: 800;
  display: block;
  margin-bottom: 4px;
}

.flow__arrow {
  color: #00CEFF;
  font-size: 24px;
  font-weight: 900;
}

/* IMAGENS LIMPAS SEM TEXTO SOBREPOSTO */
.img-clean {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  border: 1px solid rgba(0, 206, 255, 0.2);
}

/* ANIMAÇÕES */
[data-anim] { opacity: 0; transform: translateY(30px); transition: all 0.6s var(--ease-out); }
.is-active [data-anim] { opacity: 1; transform: translateY(0); }

/* FOOTER */
.footer {
  position: absolute;
  left: 100px;
  bottom: 48px;
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #94B4BD;
  font-family: var(--font-mono);
}
'''

for path in ['public/deck/deck.css', 'c:/repositorio/decks/wemake-plano/deck.css']:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(updated_deck_css)

print("3. Updated deck.css with official brand colors and alignment rules!")

# 4. UPDATE RELATORIO-A4.TSX STYLES FOR OFFICIAL BRAND IDENTITY
a4_styles_fix = '''
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
'''

with open('features/admin/relatorio-a4.tsx', 'r', encoding='utf-8') as f:
    a4_code = f.read()

pattern_styles = r'\.ra4-doc \{.*?\/\* ELEMENTOS VISUAIS'
a4_code = re.sub(pattern_styles, a4_styles_fix.strip() + '\n      /* ELEMENTOS VISUAIS', a4_code, flags=re.DOTALL)

with open('features/admin/relatorio-a4.tsx', 'w', encoding='utf-8') as f:
    f.write(a4_code)

print("4. Updated relatorio-a4.tsx with official brand colors!")
print("=== FINISHED BRAND IDENTITY UPDATE ===")
