import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

/**
 * Protege rotas /admin/*  (exceto /admin/login).
 * Roda em Edge runtime — verifica cookie HMAC-assinado.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page e endpoint de login são públicos
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Logout é público (limpa cookie e redireciona)
  if (pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // Tudo em /admin/* e /api/admin/* requer sessão válida
  const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isProtected) return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const session = await verifySession(cookie);

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
