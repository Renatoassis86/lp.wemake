═════════════════════════════════════════════════════════════════
 TRILHA DOS 7 PRINCÍPIOS — pasta de PDFs
═════════════════════════════════════════════════════════════════

Drope aqui os 7 PDFs com EXATAMENTE estes nomes
(sem acento, minúsculas, separados por hífen):

  wemake-principio-01-ferramenta.pdf
  wemake-principio-02-carater.pdf
  wemake-principio-03-imago-dei.pdf
  wemake-principio-04-discernimento.pdf
  wemake-principio-05-queda.pdf
  wemake-principio-06-construir.pdf
  wemake-principio-07-curriculo.pdf

─────────────────────────────────────────────────────────────────
 Gates de desbloqueio (data/free-materials.ts)
─────────────────────────────────────────────────────────────────

  GATE          PDFs                                      Origem
  ─────────────────────────────────────────────────────────────
  free          01 · 02 · 03                              formulário curto na LP
  vip           04                                        ao entrar no grupo VIP
  meeting       05 · 06 · 07                              ao agendar reunião

─────────────────────────────────────────────────────────────────
 Specs sugeridas
─────────────────────────────────────────────────────────────────

  Formato       PDF (versão Acrobat 1.7+, otimizado para web)
  Tamanho ideal ≤ 4 MB cada
  Páginas       ver coluna "pages" em data/free-materials.ts
  Tipografia    serif editorial no corpo; sans-serif no UI
  Capa          fundo navy + tipografia display
  Marca         logo We Make no rodapé de cada página
  Permissões    leitura aberta · impressão permitida · cópia opcional
  Metadados PDF Title, Author (Dênis Júlio P. Francisco),
                Subject (Cosmovisão Reformada · Educação Tecnológica),
                Keywords (we make, cosmovisão reformada, princípio N)

─────────────────────────────────────────────────────────────────
 Como o site usa esses arquivos
─────────────────────────────────────────────────────────────────

  Cada arquivo é referenciado em data/free-materials.ts pelo path
  "/downloads/<nome>.pdf". O Next.js serve direto do filesystem —
  não é preciso configurar nada além de colocar o arquivo aqui.

  Os PDFs FREE (01, 02, 03) são entregues ao usuário por email
  após o preenchimento do formulário da seção "Trilha dos 7 Princípios"
  (na implementação atual, simplesmente direcionamos para o link
  /downloads/...pdf — a regra do envio por email/Resend pode ser
  ligada depois no endpoint app/api/lead/route.ts).

  O PDF VIP (04) e os MEETING (05, 06, 07) ainda existem como
  arquivos públicos nesta pasta — quem souber o nome do arquivo
  pode baixar diretamente. Se quiser fechar o acesso, mova esses
  4 PDFs para fora de /public/ e crie uma rota /api/download/[id]
  com checagem de gate (token de VIP / status de reunião agendada).

─────────────────────────────────────────────────────────────────
 Esta pasta NÃO deve aparecer no git como vazia
─────────────────────────────────────────────────────────────────

  Por isso este README.txt fica versionado.
  Os PDFs reais entram em produção via deploy/upload — recomendo
  ignorá-los no .gitignore se forem grandes (>1MB cada).
