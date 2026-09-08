import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PUBLIC_INDEX_PATH = path.join(process.cwd(), "public", "deck", "index.html");
const PUBLIC_DECK_PATH = path.join(process.cwd(), "public", "deck", "deck.html");
const EXTERNAL_DECK_DIR = path.resolve(process.cwd(), "..", "..", "decks", "wemake-plano");

export async function GET() {
  try {
    if (!fs.existsSync(PUBLIC_INDEX_PATH)) {
      return NextResponse.json(
        { success: false, error: "Arquivo index.html da apresentação não encontrado" },
        { status: 404 }
      );
    }

    const html = fs.readFileSync(PUBLIC_INDEX_PATH, "utf-8");
    return NextResponse.json({ success: true, html });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao ler a apresentação" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { html } = body;

    if (!html || typeof html !== "string" || html.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: "Conteúdo HTML inválido ou muito curto" },
        { status: 400 }
      );
    }

    // 1. Escreve no public/deck/index.html
    fs.writeFileSync(PUBLIC_INDEX_PATH, html, "utf-8");

    // 2. Escreve no public/deck/deck.html
    fs.writeFileSync(PUBLIC_DECK_PATH, html, "utf-8");

    // 3. Tenta sincronizar com a pasta externa de decks se existir
    if (fs.existsSync(EXTERNAL_DECK_DIR)) {
      fs.writeFileSync(path.join(EXTERNAL_DECK_DIR, "deck.html"), html, "utf-8");
      fs.writeFileSync(path.join(EXTERNAL_DECK_DIR, "index.html"), html, "utf-8");
    }

    return NextResponse.json({
      success: true,
      message: "Apresentação salva e sincronizada com sucesso em todos os ambientes!",
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Erro ao salvar a apresentação" },
      { status: 500 }
    );
  }
}
