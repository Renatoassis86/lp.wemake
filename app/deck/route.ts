import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public/deck/index.html");
    const html = readFileSync(filePath, "utf8");
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new NextResponse("Deck presentation file not found", { status: 404 });
  }
}
