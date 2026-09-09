import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Guarda edições feitas slide a slide na apresentação React (fora do modo tela
 * cheia), num JSON simples { [chaveDoSlide]: htmlEditado }. O componente troca
 * o JSX original do slide por esse HTML salvo quando existe uma entrada para
 * a chave. Escreve direto no sistema de arquivos: funciona com o processo
 * Node rodando de forma persistente, não sobrevive a um ambiente serverless.
 */
const OVERRIDES_PATH = path.join(process.cwd(), "data", "apresentacao-overrides.json");

function lerOverrides(): Record<string, string> {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, overrides: lerOverrides() });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao ler as edições salvas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chave, html } = body;

    if (!chave || typeof chave !== "string") {
      return NextResponse.json({ success: false, error: "Chave do slide ausente" }, { status: 400 });
    }
    if (typeof html !== "string" || html.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Conteúdo HTML vazio" }, { status: 400 });
    }

    const overrides = lerOverrides();
    overrides[chave] = html;
    fs.mkdirSync(path.dirname(OVERRIDES_PATH), { recursive: true });
    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2), "utf-8");

    return NextResponse.json({ success: true, updatedAt: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao salvar a edição do slide" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chave = searchParams.get("chave");
    if (!chave) {
      return NextResponse.json({ success: false, error: "Chave do slide ausente" }, { status: 400 });
    }
    const overrides = lerOverrides();
    delete overrides[chave];
    fs.mkdirSync(path.dirname(OVERRIDES_PATH), { recursive: true });
    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao descartar a edição do slide" },
      { status: 500 }
    );
  }
}
