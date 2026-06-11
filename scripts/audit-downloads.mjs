#!/usr/bin/env node
// Script para auditoria completa de downloads de PDF

const SUPABASE_URL = "https://vpacgvqkrkzskrzpsydg.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwYWNndnFrcmt6c2tyenBzeWRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MjI2MCwiZXhwIjoyMDk0MTY4MjYwfQ.oQK6ILLnyu-MIC-J240rl26DIK7U84qGpCyrduO5DFU";

const headers = {
  "apikey": SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "count=exact"
};

async function fetchTable(table, filter = "") {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc&limit=1000${filter}`;
  try {
    const res = await fetch(url, { headers });
    const data = await res.json();

    if (res.ok && Array.isArray(data)) {
      return { success: true, count: data.length, rows: data };
    } else if (data.message) {
      return { success: false, error: data.message };
    }
    return { success: true, count: 0, rows: [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("🔍 AUDITORIA COMPLETA - VARREDURA DE DOWNLOADS DE PDF");
  console.log("═══════════════════════════════════════════════════════════\n");

  // 1. PDF Downloads
  console.log("1️⃣  Buscando em: pdf_downloads");
  const pdfDownloads = await fetchTable("pdf_downloads");
  if (pdfDownloads.success) {
    console.log(`   ✅ Total encontrado: ${pdfDownloads.count}`);
    if (pdfDownloads.count > 0) {
      console.log("   Dados:");
      pdfDownloads.rows.forEach((row, i) => {
        console.log(`   ${i + 1}. ${row.nome_contato} (${row.email}) - ${row.created_at}`);
      });
    }
  } else {
    console.log(`   ❌ Erro: ${pdfDownloads.error}`);
  }

  // 2. Leads Escola com 'material'
  console.log("\n2️⃣  Buscando em: leads_escola (origem contendo 'material')");
  const leadsWithMaterial = await fetchTable("leads_escola", "&origem=ilike.*material*");
  if (leadsWithMaterial.success) {
    console.log(`   ✅ Total encontrado: ${leadsWithMaterial.count}`);
    if (leadsWithMaterial.count > 0) {
      console.log("   Dados:");
      leadsWithMaterial.rows.forEach((row, i) => {
        console.log(`   ${i + 1}. ${row.nome} (${row.rep_legal_email}) - ${row.origem} - ${row.created_at}`);
      });
    }
  } else {
    console.log(`   ❌ Erro: ${leadsWithMaterial.error}`);
  }

  // 3. Leads Escola com 'ebook'
  console.log("\n3️⃣  Buscando em: leads_escola (origem contendo 'ebook')");
  const leadsWithEbook = await fetchTable("leads_escola", "&origem=ilike.*ebook*");
  if (leadsWithEbook.success) {
    console.log(`   ✅ Total encontrado: ${leadsWithEbook.count}`);
    if (leadsWithEbook.count > 0) {
      console.log("   Dados:");
      leadsWithEbook.rows.forEach((row, i) => {
        console.log(`   ${i + 1}. ${row.nome} (${row.rep_legal_email}) - ${row.origem} - ${row.created_at}`);
      });
    }
  } else {
    console.log(`   ❌ Erro: ${leadsWithEbook.error}`);
  }

  // 4. Diagnostico Escola com 'ebook'
  console.log("\n4️⃣  Buscando em: diagnostico_escola (origem contendo 'ebook')");
  const diagEbook = await fetchTable("diagnostico_escola", "&origem=ilike.*ebook*");
  if (diagEbook.success) {
    console.log(`   ✅ Total encontrado: ${diagEbook.count}`);
    if (diagEbook.count > 0) {
      console.log("   Dados:");
      diagEbook.rows.forEach((row, i) => {
        console.log(`   ${i + 1}. ${row.nome_escola} (${row.email}) - ${row.origem} - ${row.created_at}`);
      });
    }
  } else {
    console.log(`   ❌ Erro: ${diagEbook.error}`);
  }

  // 5. Resumo total
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📊 RESUMO TOTAL:");
  const totalPdfDownloads = pdfDownloads.success ? pdfDownloads.count : 0;
  const totalLeadsMaterial = leadsWithMaterial.success ? leadsWithMaterial.count : 0;
  const totalLeadsEbook = leadsWithEbook.success ? leadsWithEbook.count : 0;
  const totalDiagEbook = diagEbook.success ? diagEbook.count : 0;
  const totalGeral = totalPdfDownloads + totalLeadsMaterial + totalLeadsEbook + totalDiagEbook;

  console.log(`  📄 pdf_downloads: ${totalPdfDownloads}`);
  console.log(`  📋 leads_escola (material): ${totalLeadsMaterial}`);
  console.log(`  📋 leads_escola (ebook): ${totalLeadsEbook}`);
  console.log(`  📋 diagnostico_escola (ebook): ${totalDiagEbook}`);
  console.log(`  ────────────────`);
  console.log(`  🎯 TOTAL GERAL: ${totalGeral}`);
  console.log("═══════════════════════════════════════════════════════════");
}

main().catch(console.error);
