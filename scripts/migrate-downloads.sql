-- ============================================================
-- MIGRAÇÃO: Copiar dados de quem fez download para pdf_downloads
-- ============================================================
-- Este script copia os usuários qualificados de diagnostico_escola
-- (que fizeram download do ebook) para a tabela pdf_downloads

-- 1. Verificar quantos registros serão copiados
SELECT COUNT(*) as total_para_copiar
FROM diagnostico_escola
WHERE status = 'lead_qualificado'
  AND origem = 'wemake-landing-ebook'
  AND cargo_qualificado IS NOT NULL
  AND email NOT IN (SELECT email FROM pdf_downloads);

-- 2. EXECUTAR MIGRAÇÃO (remova o comentário abaixo para executar)
-- INSERT INTO pdf_downloads (
--   nome_contato, email, telefone, cargo, nome_escola, cidade, uf, material, fluxo, created_at
-- )
-- SELECT
--   nome_respondente as nome_contato,
--   email,
--   whatsapp as telefone,
--   cargo_qualificado as cargo,
--   nome_escola,
--   CASE WHEN cidade = '—' THEN NULL ELSE cidade END as cidade,
--   uf,
--   '7-principios' as material,
--   'ebook-page' as fluxo,
--   created_at
-- FROM diagnostico_escola
-- WHERE status = 'lead_qualificado'
--   AND origem = 'wemake-landing-ebook'
--   AND cargo_qualificado IS NOT NULL
--   AND email NOT IN (SELECT email FROM pdf_downloads)
-- ON CONFLICT (email) DO NOTHING;

-- 3. Verificar resultado após migração
-- SELECT COUNT(*) FROM pdf_downloads;
