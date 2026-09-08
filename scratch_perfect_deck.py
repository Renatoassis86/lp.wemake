import re
import os

index_path = r'C:\repositorio\wemake\projetos_wemake\lp_wemake\public\deck\index.html'

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# ----------------------------------------------------------------------
# 1. REMOVE TRAVESSÕES (—) & CLEAN BUZZWORDS
# ----------------------------------------------------------------------
# Replace em-dashes with colons or commas
content = content.replace(' — ', ': ')
content = content.replace('— ', ': ')
content = content.replace(' —', ': ')

# Clean buzzwords
content = content.replace('robusto', 'sólido')
content = content.replace('robusta', 'sólida')
content = content.replace('robustez', 'consistência')
content = content.replace('alavancar', 'impulsionar')
content = content.replace('de forma estratégica', 'de maneira planejada')
content = content.replace('solução completa', 'solução integrada')

# ----------------------------------------------------------------------
# 2. FIX HEADLINES - REMOVE PERIODS FROM HEADINGS
# ----------------------------------------------------------------------
def remove_period_from_headers(html):
    # Matches <h1...>, <h2...>, <h3...>, <p class="eyebrow"...> that end with a period before closing tag
    def clean_tag(match):
        open_tag = match.group(1)
        text = match.group(2)
        close_tag = match.group(3)
        if text.endswith('.'):
            text = text[:-1]
        return f"{open_tag}{text}{close_tag}"
    
    pattern = re.compile(r'(<(?:h1|h2|h3|h4|p\s+class="eyebrow")[^>]*>)(.*?)(</(?:h1|h2|h3|h4|p)>)', re.DOTALL)
    return pattern.sub(clean_tag, html)

content = remove_period_from_headers(content)

# ----------------------------------------------------------------------
# 3. REBUILD SLIDES WITH ALL VISUAL SCHEMAS & MAPS
# ----------------------------------------------------------------------

# Slide 03: A Dor do Cliente (High Impact Cards + Icons)
old_slide_03 = re.compile(r'<!-- SLIDE 03:.*?-->.*?</section>', re.DOTALL)
new_slide_03 = '''<!-- SLIDE 03: CAPÍTULO 01 · A DOR DO CLIENTE -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 01 : A Dor do Cliente</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Escola parceira fragmenta compras entre três fornecedores sem integração</h2>
      </div>
      
      <div class="grid grid-3" style="margin-top: 28px; gap: 20px;">
        
        <!-- Dor 01 -->
        <div class="card" data-anim="rise" data-delay="200" style="padding: 26px; background: rgba(20,43,89,0.75); border: 1px solid rgba(255,100,100,0.3); border-radius: 16px;">
          <div class="icon-badge" style="width: 52px; height: 52px; margin-bottom: 14px; background: rgba(255,100,100,0.15); color: #FF6B6B; border: 1px solid rgba(255,100,100,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <svg class="icon" style="width:28px;height:28px;"><use href="#i-alert-triangle"></use></svg>
          </div>
          <span class="eyebrow" style="color: #FF6B6B; font-weight: 700;">Dor 01</span>
          <h3 class="h3" style="font-size: 22px; margin-top: 6px; color: #FFF;">Robótica Isolada</h3>
          <p class="small muted" style="margin-top: 8px; font-size: 14px;">Kits de peças sem currículo plurianual, sem plataforma digital e desvinculados da cosmovisão cristã</p>
        </div>

        <!-- Dor 02 -->
        <div class="card" data-anim="rise" data-delay="300" style="padding: 26px; background: rgba(20,43,89,0.75); border: 1px solid rgba(120,200,255,0.3); border-radius: 16px;">
          <div class="icon-badge" style="width: 52px; height: 52px; margin-bottom: 14px; background: rgba(120,200,255,0.15); color: #78C8FF; border: 1px solid rgba(120,200,255,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <svg class="icon" style="width:28px;height:28px;"><use href="#i-cpu"></use></svg>
          </div>
          <span class="eyebrow" style="color: #78C8FF; font-weight: 700;">Dor 02</span>
          <h3 class="h3" style="font-size: 22px; margin-top: 6px; color: #FFF;">Plataforma Fria</h3>
          <p class="small muted" style="margin-top: 8px; font-size: 14px;">Software administrativo que guarda notas, mas não oferece trilha de aprendizagem nem engaja os alunos</p>
        </div>

        <!-- Dor 03 -->
        <div class="card" data-anim="rise" data-delay="400" style="padding: 26px; background: rgba(20,43,89,0.75); border: 1px solid rgba(255,204,0,0.3); border-radius: 16px;">
          <div class="icon-badge" style="width: 52px; height: 52px; margin-bottom: 14px; background: rgba(255,204,0,0.15); color: #FFCC00; border: 1px solid rgba(255,204,0,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
            <svg class="icon" style="width:28px;height:28px;"><use href="#i-clock"></use></svg>
          </div>
          <span class="eyebrow" style="color: #FFCC00; font-weight: 700;">Dor 03</span>
          <h3 class="h3" style="font-size: 22px; margin-top: 6px; color: #FFF;">Treinamento Pontual</h3>
          <p class="small muted" style="margin-top: 8px; font-size: 14px;">Cursos rápidos de poucas horas sem acompanhamento pedagógico nem mentoria contínua para os professores</p>
        </div>

      </div>

      <!-- Solução Unificada -->
      <div class="card card--accent" data-anim="rise" data-delay="500" style="margin-top: 24px; padding: 22px 28px; display: flex; align-items: center; gap: 20px; border-radius: 16px;">
        <div class="icon-badge" style="width: 48px; height: 48px; background: rgba(11,31,68,0.15); color: #0B1F44; shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 12px;">
          <svg class="icon" style="width:28px;height:28px;"><use href="#i-sparkles"></use></svg>
        </div>
        <div>
          <h3 class="h3" style="font-size: 20px; color: #0B1F44;">Solução Integrada We Make</h3>
          <p class="body" style="font-size: 15px; color: rgba(11,31,68,0.9); margin-top: 2px;">Integramos currículo, plataforma, espaço físico e formação docente em um único contrato com economia de 30%</p>
        </div>
      </div>
    </section>'''

# Slide 14: Leis Estaduais + MAPA DO BRASIL
old_slide_14 = re.compile(r'<!-- SLIDE 14:.*?-->.*?</section>', re.DOTALL)
new_slide_14 = '''<!-- SLIDE 14: CAPÍTULO 05 · MARCO REGULATÓRIO ESTADUAL -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Mercado Regulado : Leis Estaduais</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Cinco estados estratégicos anteciparam a legislação federal com regras próprias</h2>
      </div>

      <div class="split split--50" style="margin-top: 24px; align-items: center; gap: 28px;">
        
        <!-- Lista das 5 Leis Estaduais -->
        <div class="stack stack--sm" data-anim="rise" data-delay="200">
          
          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; background: rgba(20,43,89,0.85); border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 13px; font-weight: 800; padding: 4px 10px;">DF</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Lei nº 7.796/2025</h4>
              <p style="font-size: 13px; color: var(--muted);">Criação de Centros de Robótica e Computação nas escolas</p>
            </div>
          </div>

          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; background: rgba(20,43,89,0.85); border-left: 4px solid var(--accent-2);">
            <span class="badge badge--yellow" style="font-size: 13px; font-weight: 800; padding: 4px 10px;">SP</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Deliberação CEE nº 233/2025</h4>
              <p style="font-size: 13px; color: var(--muted);">Educação Digital e Robótica obrigatórias no currículo</p>
            </div>
          </div>

          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; background: rgba(20,43,89,0.85); border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 13px; font-weight: 800; padding: 4px 10px;">MG</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Parecer CEE nº 1.588/2025</h4>
              <p style="font-size: 13px; color: var(--muted);">Referencial Curricular de Tecnologias Maker</p>
            </div>
          </div>

          <div class="card" style="padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px; background: rgba(20,43,89,0.85); border-left: 4px solid var(--accent);">
            <span class="badge" style="font-size: 13px; font-weight: 800; padding: 4px 10px;">PR</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #FFF;">Deliberação CEE nº 04/2025</h4>
              <p style="font-size: 13px; color: var(--muted);">Regra de Pensamento Computacional em redes privadas</p>
            </div>
          </div>

          <div class="card card--accent" style="padding: 16px 20px; display: flex; align-items: center; gap: 16px; border-radius: 12px;">
            <span class="badge" style="font-size: 13px; font-weight: 800; padding: 4px 10px; background: #0B1F44; color: #76F3CD;">RS</span>
            <div>
              <h4 style="font-size: 15px; font-weight: 800; color: #0B1F44;">Resolução CEEd nº 382/2024</h4>
              <p style="font-size: 13px; color: rgba(11,31,68,0.9); font-weight: 600;">Exigência pioneira que acelera adesão das escolas</p>
            </div>
          </div>

        </div>

        <!-- Mapa Vetorial Dinâmico do Brasil com 5 Estados -->
        <div class="map" data-anim="scale" data-delay="300" style="text-align: center;">
          <svg viewBox="0 0 500 440" style="width: 100%; max-height: 380px; filter: drop-shadow(0 12px 28px rgba(0,0,0,0.5));">
            <!-- Silhueta Vetorial do Brasil -->
            <path d="M 180,40 L 220,35 L 260,30 L 300,45 L 340,65 L 380,85 L 420,110 L 440,145 L 430,175 L 400,200 L 380,225 L 360,255 L 330,285 L 300,320 L 280,360 L 260,400 L 240,420 L 220,410 L 200,380 L 190,340 L 180,300 L 170,260 L 140,240 L 110,230 L 80,210 L 60,180 L 50,150 L 70,130 L 100,110 L 130,90 L 160,65 Z" 
                  fill="rgba(118, 243, 205, 0.05)" 
                  stroke="rgba(118, 243, 205, 0.35)" 
                  stroke-width="2" 
                  stroke-dasharray="6 4" />

            <!-- Pinos nos 5 Estados Pioneiros -->
            <!-- DF -->
            <circle cx="260" cy="210" r="12" fill="rgba(118, 243, 205, 0.3)"/>
            <circle cx="260" cy="210" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
            <rect x="210" y="175" width="100" height="24" rx="12" fill="#76F3CD"/>
            <text x="260" y="191" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11" font-family="var(--font-mono)">DF · Lei 7.796</text>

            <!-- SP -->
            <circle cx="275" cy="285" r="10" fill="rgba(255, 204, 0, 0.3)"/>
            <circle cx="275" cy="285" r="6" fill="#FFCC00" stroke="#0B1F44" stroke-width="2"/>
            <rect x="285" y="273" width="105" height="24" rx="12" fill="#FFCC00"/>
            <text x="337" y="289" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11" font-family="var(--font-mono)">SP · CEE 233</text>

            <!-- MG -->
            <circle cx="310" cy="245" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
            <text x="322" y="249" fill="#A8C4E6" font-weight="700" font-size="12" font-family="var(--font-mono)">MG · CEE 1.588</text>

            <!-- PR -->
            <circle cx="255" cy="315" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
            <text x="175" y="320" fill="#A8C4E6" font-weight="700" font-size="12" font-family="var(--font-mono)">PR · CEE 04</text>

            <!-- RS -->
            <circle cx="235" cy="375" r="10" fill="rgba(118, 243, 205, 0.3)"/>
            <circle cx="235" cy="375" r="6" fill="#76F3CD" stroke="#0B1F44" stroke-width="2"/>
            <rect x="125" y="363" width="100" height="24" rx="12" fill="#76F3CD"/>
            <text x="175" y="379" text-anchor="middle" fill="#0B1F44" font-weight="800" font-size="11" font-family="var(--font-mono)">RS · CEEd 382</text>

            <!-- Card Rodapé -->
            <rect x="30" y="395" width="440" height="40" rx="10" fill="rgba(11, 31, 68, 0.9)" stroke="rgba(118, 243, 205, 0.3)" stroke-width="1"/>
            <text x="250" y="419" text-anchor="middle" fill="#76F3CD" font-weight="800" font-size="13">5 Estados Pioneiros Antecipam Obrigatoriedade Tecnológica</text>
          </svg>
        </div>

      </div>
    </section>'''

# Slide 15: TAM / SAM / SOM (Fix Screenshot 2)
old_slide_15 = re.compile(r'<!-- SLIDE 15:.*?-->.*?</section>', re.DOTALL)
new_slide_15 = '''<!-- SLIDE 15: CAPÍTULO 05 · MERCADO ENDEREÇÁVEL (TAM / SAM / SOM) -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">TAM / SAM / SOM : Oportunidade de Mercado</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Nicho rentável em um mercado de 5.000 escolas confessionais no Brasil</h2>
      </div>

      <div class="stack stack--sm" style="margin-top: 28px;" data-anim="rise" data-delay="200">
        
        <!-- TAM -->
        <div class="card" style="padding: 18px 24px; background: rgba(20,43,89,0.7); border: 1px solid rgba(244,246,251,0.15); border-radius: 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-badge" style="width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;"><svg class="icon" style="width:20px;height:20px;"><use href="#i-globe"></use></svg></div>
              <div>
                <span class="eyebrow" style="color: var(--accent); font-size: 11px;">TAM : Mercado Total Privado</span>
                <h4 style="font-size: 16px; font-weight: 700; color: #FFF;">41.746 Escolas Privadas no Brasil</h4>
              </div>
            </div>
            <span class="stat__value" style="font-size: 24px; font-weight: 800; color: #FFF;">100%</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;">
            <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #4C8ADE, #76F3CD); border-radius: 999px;"></div>
          </div>
        </div>

        <!-- Segmento Fundamental -->
        <div class="card" style="padding: 18px 24px; background: rgba(20,43,89,0.7); border: 1px solid rgba(244,246,251,0.15); border-radius: 14px; margin-left: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-badge" style="width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;"><svg class="icon" style="width:20px;height:20px;"><use href="#i-building-2"></use></svg></div>
              <div>
                <span class="eyebrow" style="color: var(--accent); font-size: 11px;">Segmento de Referência</span>
                <h4 style="font-size: 16px; font-weight: 700; color: #FFF;">24.683 Escolas de Ensino Fundamental</h4>
              </div>
            </div>
            <span class="stat__value" style="font-size: 24px; font-weight: 800; color: #FFF;">59%</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;">
            <div style="width: 59%; height: 100%; background: linear-gradient(90deg, #4C8ADE, #76F3CD); border-radius: 999px;"></div>
          </div>
        </div>

        <!-- SAM -->
        <div class="card card--accent" style="padding: 18px 24px; border-radius: 14px; margin-left: 40px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-badge" style="width: 36px; height: 36px; background: rgba(11,31,68,0.15); color: #0B1F44; border-radius: 10px; display: flex; align-items: center; justify-content: center;"><svg class="icon" style="width:20px;height:20px;"><use href="#i-target"></use></svg></div>
              <div>
                <span class="eyebrow" style="color: rgba(11,31,68,0.8); font-size: 11px;">SAM : Mercado Confessional Alvo</span>
                <h4 style="font-size: 16px; font-weight: 800; color: #0B1F44;">5.000 Escolas Confessionais no Brasil</h4>
              </div>
            </div>
            <span class="stat__value" style="font-size: 28px; font-weight: 800; color: #0B1F44;">12%</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(11,31,68,0.15); border-radius: 999px; overflow: hidden;">
            <div style="width: 100%; height: 100%; background: #0B1F44; border-radius: 999px;"></div>
          </div>
        </div>

        <!-- SOM -->
        <div class="card" style="padding: 18px 24px; background: rgba(20,43,89,0.9); border: 2px solid var(--accent-2); border-radius: 14px; margin-left: 60px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="icon-badge" style="width: 36px; height: 36px; background: rgba(255,204,0,0.15); color: #FFCC00; border-radius: 10px; display: flex; align-items: center; justify-content: center;"><svg class="icon" style="width:20px;height:20px;"><use href="#i-flag"></use></svg></div>
              <div>
                <span class="eyebrow" style="color: var(--accent-2); font-size: 11px;">SOM : Meta de Captura We Make 2031</span>
                <h4 style="font-size: 16px; font-weight: 700; color: #FFF;">1.400 Escolas no Perfil We Make (Penetração 28%)</h4>
              </div>
            </div>
            <span class="stat__value accent-sky" style="font-size: 24px; font-weight: 800;">5%–8%</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden;">
            <div style="width: 65%; height: 100%; background: #FFCC00; border-radius: 999px;"></div>
          </div>
        </div>

      </div>
    </section>'''

# Apply pattern replacements
content = old_slide_03.sub(new_slide_03, content)
content = old_slide_14.sub(new_slide_14, content)
content = old_slide_15.sub(new_slide_15, content)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully applied perfect deck fixes!')
