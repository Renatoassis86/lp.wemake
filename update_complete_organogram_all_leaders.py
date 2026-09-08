import re
import os

print("=== UPDATING COMPLETE ORGANOGRAM WITH ALL LEADERS IN DECK, A4 & PROMPT MESTRE ===")

# 1. Update deck.css with styles for .org-card-dept, .org-dept-header, .org-person
dept_css = '''
/* Organograma Completo Multidepartamental com Todos os Líderes */
.org-card-dept {
  background: rgba(14, 42, 71, 0.85);
  border: 1px solid rgba(118, 243, 205, 0.3);
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
  border-bottom: 1px solid rgba(118, 243, 205, 0.25);
  padding-bottom: 8px;
  color: #76F3CD;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.org-dept-header .icon {
  width: 20px;
  height: 20px;
  color: #76F3CD;
}

.org-person {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(11, 31, 68, 0.5);
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid #76F3CD;
}

.org-person strong {
  color: #FFFFFF;
  font-size: 15px;
  font-family: var(--font-display);
}

.org-person p {
  color: #A9C2DA;
  font-size: 12px;
  margin: 0;
}
'''

for path in ['public/deck/deck.css', 'c:/repositorio/decks/wemake-plano/deck.css']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if '.org-card-dept' not in content:
        content += dept_css
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("1. Added multi-departmental organogram styles to deck.css!")

# 2. Construct updated Slide 19 HTML with ALL Leaders
slide_19_html = '''    <!-- SLIDE 19: CAPÍTULO 07 - ESTRUTURA ORGANIZACIONAL E OPERAÇÕES (ORGANOGRAMA COMPLETO) -->
    <section class="slide">
      <div class="stack stack--sm">
        <p class="eyebrow" data-anim="rise">Capítulo 07 : Estrutura Organizacional &amp; Operações</p>
        <h2 class="h2 balance" data-anim="rise" data-delay="100">Organograma Executivo de Governança com Todos os Líderes de Área</h2>
      </div>
      
      <div class="org-chart" data-anim="rise" data-delay="150">
        <!-- CEO LEVEL -->
        <div class="org-level">
          <div class="org-node org-node--ceo">
            <div class="org-node__avatar">
              <svg class="icon"><use href="#i-crown"></use></svg>
            </div>
            <div>
              <span class="org-node__role">CEO &amp; Diretor Pedagógico (Fundador)</span>
              <h3 class="org-node__name">Dênis Júlio Pereira Francisco</h3>
              <p class="org-node__desc">Mestre em Inovação (UFRN) · P&amp;D, Estratégia, Visão Teológica e Relações Institucionais</p>
            </div>
          </div>
        </div>

        <div class="org-tree-line"></div>
        <div class="org-tree-branch"></div>

        <!-- LEVEL 2: 4 DEPARTAMENTOS COM TODOS OS LÍDERES -->
        <div class="grid grid-4" style="gap: 14px; width: 100%; margin-top: 10px;">
          
          <!-- GESTÃO & FINANÇAS -->
          <div class="org-card-dept" data-anim="rise" data-delay="200">
            <div class="org-dept-header">
              <svg class="icon"><use href="#i-briefcase"></use></svg>
              <span>Gestão &amp; Operações</span>
            </div>
            <div class="org-person">
              <strong>Renato Assis</strong>
              <p>Gerente Administrativo &amp; Financeiro</p>
            </div>
            <div class="org-person">
              <strong>Iran Firmino</strong>
              <p>Contabilidade &amp; Compliance Fiscal</p>
            </div>
          </div>

          <!-- PEDAGOGIA & FORMAÇÃO -->
          <div class="org-card-dept" data-anim="rise" data-delay="250">
            <div class="org-dept-header">
              <svg class="icon"><use href="#i-graduation-cap"></use></svg>
              <span>Pedagogia &amp; Formação</span>
            </div>
            <div class="org-person">
              <strong>Suzana Bonifazio</strong>
              <p>Consultora Pedagógica &amp; Onboarding</p>
            </div>
            <div class="org-person">
              <strong>Emanuela Monteiro</strong>
              <p>Consultora Pedagógica &amp; Negócios</p>
            </div>
          </div>

          <!-- MARKETING & EXPANSÃO COMERCIAL -->
          <div class="org-card-dept" data-anim="rise" data-delay="300">
            <div class="org-dept-header">
              <svg class="icon"><use href="#i-megaphone"></use></svg>
              <span>Marketing &amp; Vendas</span>
            </div>
            <div class="org-person">
              <strong>Emanuel Peixoto</strong>
              <p>Analista de Marketing &amp; Campanhas</p>
            </div>
            <div class="org-person">
              <strong>Christiano Bonifazio</strong>
              <p>Rep. Comercial SP &amp; Expansão B2B</p>
            </div>
            <div class="org-person">
              <strong>Atendimento Comercial</strong>
              <p>Qualificação &amp; Gestão de CRM</p>
            </div>
          </div>

          <!-- TECNOLOGIA & PLATAFORMA -->
          <div class="org-card-dept" data-anim="rise" data-delay="350">
            <div class="org-dept-header">
              <svg class="icon"><use href="#i-cpu"></use></svg>
              <span>Tecnologia &amp; P&amp;D</span>
            </div>
            <div class="org-person">
              <strong>Engenharia Arkos (3 Devs)</strong>
              <p>Plataforma LMS &amp; Nuvem</p>
            </div>
            <div class="org-person">
              <strong>Cientista de Dados</strong>
              <p>Analytics &amp; Métricas de Negócios</p>
            </div>
          </div>

        </div>
      </div>
    </section>'''

# Replace Slide 19 in deck.html files
for path in ['public/deck/index.html', 'public/deck/deck.html', 'c:/repositorio/decks/wemake-plano/index.html', 'c:/repositorio/decks/wemake-plano/deck.html']:
    with open(path, 'r', encoding='utf-8') as f:
        html_code = f.read()
    
    # Replace slide 19 section
    pattern = r'<!-- SLIDE 19:.*?<\/section>'
    html_code = re.sub(pattern, slide_19_html, html_code, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html_code)

print("2. Updated Slide 19 HTML with all leaders in deck files!")

# 3. Update relatorio-a4.tsx Organograma block with ALL leaders
a4_org_component = '''    case "organograma":
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
      );'''

with open('features/admin/relatorio-a4.tsx', 'r', encoding='utf-8') as f:
    a4_code = f.read()

pattern_a4_org = r'case "organograma":.*?break;' if 'break;' in a4_code else r'case "organograma":.*?(?=case "mapa-ibge":)'
a4_code = re.sub(pattern_a4_org, a4_org_component + '\n    ', a4_code, flags=re.DOTALL)

with open('features/admin/relatorio-a4.tsx', 'w', encoding='utf-8') as f:
    f.write(a4_code)

print("3. Updated relatorio-a4.tsx with complete organogram containing all leaders!")

# 4. Update prompt_mestre_apresentacao_wemake.md with full list of leaders
with open('docs/prompt_mestre_apresentacao_wemake.md', 'r', encoding='utf-8') as f:
    prompt_md = f.read()

prompt_md_updated = prompt_md.replace(
    'CEO Dênis Júlio + 4 Heads',
    'CEO Dênis Júlio + Todos os Líderes: Renato Assis, Iran Firmino, Suzana Bonifazio, Emanuela Monteiro, Emanuel Peixoto, Christiano Bonifazio, Atendimento Comercial, 3 Devs Arkos e Cientista de Dados'
).replace(
    'CEO Dênis Júlio + 4 líderes',
    'CEO Dênis Júlio + Todos os Líderes de cada área'
)

with open('docs/prompt_mestre_apresentacao_wemake.md', 'w', encoding='utf-8') as f:
    f.write(prompt_md_updated)

with open('C:/Users/Usuario/.gemini/antigravity-ide/brain/5db090e0-3979-40dc-9b4f-e34acf4e405d/prompt_mestre_apresentacao_wemake.md', 'w', encoding='utf-8') as f:
    f.write(prompt_md_updated)

print("4. Updated prompt_mestre_apresentacao_wemake.md!")
print("=== FINISHED ALL LEADERS ORGANOGRAM UPDATE ===")
