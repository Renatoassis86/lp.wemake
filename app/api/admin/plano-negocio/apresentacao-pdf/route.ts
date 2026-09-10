import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await verifySession(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const targetUrl = `${request.nextUrl.origin}/apresentacao-plano-print`;

  let browser;
  try {
    if (process.env.VERCEL) {
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      const puppeteer = await import("puppeteer-core");
      const executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
      browser = await puppeteer.launch({ executablePath, headless: true });
    }

    const page = await browser.newPage();

    const sessionCookies = request.cookies
      .getAll()
      .filter((c) => c.name === ADMIN_COOKIE)
      .map((c) => ({ name: c.name, value: c.value, domain: request.nextUrl.hostname, path: "/" }));
    if (sessionCookies.length) await page.setCookie(...sessionCookies);

    // Largura já em tela cheia desde o início: os slides usam animação de
    // entrada disparada por IntersectionObserver (whileInView), que só roda
    // quando o elemento entra na área visível. Com o viewport largo desde o
    // primeiro carregamento, tudo já nasce "visível" e as animações resolvem
    // sem precisar simular rolagem.
    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 1 });

    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);

    // Reforça o viewport pra cobrir a altura real do documento inteiro (todos
    // os slides empilhados), garantindo que cada whileInView, em qualquer
    // slide, tenha entrado na área "visível" do navegador headless antes da
    // impressão — sem isso, o conteúdo abaixo da dobra ficaria com opacidade
    // zero no PDF (a animação nunca teria dado o gatilho).
    const alturaTotal = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewport({ width: 1600, height: Math.max(1200, alturaTotal), deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 700));

    await page.emulateMediaType("print");
    const pdf = await page.pdf({
      width: "1600px",
      height: "1000px",
      printBackground: true,
    });

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="we-make-apresentacao-plano-de-negocio-2027-2031.pdf"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao gerar PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await browser?.close();
  }
}
