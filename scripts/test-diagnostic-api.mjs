#!/usr/bin/env node

/**
 * 🤖 Robô de teste do diagnóstico
 * Envia dados, monitora, e fica em loop até conseguir
 */

const SUPABASE_URL = "https://vpacgvqkrkzskrzpsydg.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwYWNndnFrcmt6c2tyenBzeWRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MjI2MCwiZXhwIjoyMDk0MTY4MjYwfQ.oQK6ILLnyu-MIC-J240rl26DIK7U84qGpCyrduO5DFU";
const WEMAKE_URL = "https://wemake.tec.br";

let attemptCount = 0;
const maxAttempts = 10;

async function checkDatabaseBefore() {
  console.log("\n📊 Verificando banco ANTES de enviar...");
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/diagnostico_escola?select=email&order=created_at.desc&limit=1`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    const data = await res.json();
    console.log("✅ Último email em diagnostico_escola:", data[0]?.email || "NENHUM");
    return data[0]?.email;
  } catch (err) {
    console.error("❌ Erro ao verificar banco:", err.message);
    return null;
  }
}

async function sendDiagnosticData() {
  attemptCount++;
  console.log(`\n🚀 TENTATIVA ${attemptCount}/${maxAttempts}`);
  console.log("═".repeat(60));

  const testEmail = `robo-test-${Date.now()}@test.com`;

  const payload = {
    nome_escola: "Escola Robô Teste",
    cidade: "São Paulo",
    uf: "SP",
    nome_respondente: "Robô Testador",
    email: testEmail,
    whatsapp: "11999999999",
    funcao: "diretor",
    segmentos: ["infantil", "fund1"],
    num_alunos: 100,
    maior_turma: 30,
    eh_confessional: "sim",
    tradicao_confessional: "católica",
    consent: true,
    respostas: [
      // Bloco 2
      { bloco: 2, pergunta_id: "momento_operacao", tipo: "radio", valor_texto: "expansao" },
      { bloco: 2, pergunta_id: "pressao_familias", tipo: "radio", valor_texto: "muita" },
      // Bloco 3
      { bloco: 3, pergunta_id: "visao_1", tipo: "scale", valor_escala: 4 },
      { bloco: 3, pergunta_id: "visao_2", tipo: "scale", valor_escala: 5 },
      // Bloco 8
      { bloco: 8, pergunta_id: "dores", tipo: "checkbox", valor_opcoes: ["falta_curriculo", "falta_professor"] },
      { bloco: 8, pergunta_id: "dor_principal", tipo: "text", valor_texto: "Teste automático" },
    ],
  };

  console.log(`📧 Enviando para: ${testEmail}`);
  console.log(`🔗 URL: ${WEMAKE_URL}/api/diagnostico/maturidade`);

  try {
    const res = await fetch(`${WEMAKE_URL}/api/diagnostico/maturidade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(`📍 Status: ${res.status}`);

    if (!res.ok) {
      const errData = await res.json();
      console.error("❌ Erro da API:", errData);
      return { success: false, email: testEmail, error: errData };
    }

    const result = await res.json();
    console.log("✅ Resposta da API:", result);
    return { success: true, email: testEmail, result };
  } catch (err) {
    console.error("❌ Erro ao enviar:", err.message);
    return { success: false, email: testEmail, error: err.message };
  }
}

async function checkDatabaseAfter(testEmail) {
  console.log("\n⏳ Aguardando 2 segundos para o banco processar...");
  await new Promise((r) => setTimeout(r, 2000));

  console.log("\n📊 Verificando banco DEPOIS de enviar...");
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/diagnostico_escola?select=*&email=eq.${encodeURIComponent(testEmail)}`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
        },
      }
    );
    const data = await res.json();

    if (data.length > 0) {
      console.log("✅ DADOS ENCONTRADOS em diagnostico_escola!");
      console.log("   ID:", data[0].id);
      console.log("   Email:", data[0].email);
      console.log("   Escola:", data[0].nome_escola);
      return true;
    } else {
      console.log("❌ Dados NÃO encontrados no banco!");
      return false;
    }
  } catch (err) {
    console.error("❌ Erro ao verificar banco:", err.message);
    return false;
  }
}

async function main() {
  console.log("🤖 ROBÔ DE TESTE DO DIAGNÓSTICO");
  console.log("═".repeat(60));

  const beforeEmail = await checkDatabaseBefore();

  while (attemptCount < maxAttempts) {
    const sendResult = await sendDiagnosticData();

    if (sendResult.success) {
      const found = await checkDatabaseAfter(sendResult.email);

      if (found) {
        console.log("\n🎉 SUCESSO! Dados chegaram no banco!");
        console.log("═".repeat(60));
        process.exit(0);
      } else {
        console.log("⚠️ API respondeu OK, mas dados não chegaram ao banco!");
        console.log("Tentando novamente...");
        await new Promise((r) => setTimeout(r, 1000));
      }
    } else {
      console.log("⚠️ Erro ao enviar, tentando novamente...");
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.log("\n❌ FALHOU após", maxAttempts, "tentativas!");
  console.log("═".repeat(60));
  process.exit(1);
}

main();
