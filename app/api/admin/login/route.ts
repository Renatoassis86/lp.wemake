import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  createSession,
  fetchAdminUser,
} from "@/lib/admin-auth";
import { verifyPassword } from "@/lib/admin-password";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  username: z.string().min(2).max(40).trim().toLowerCase(),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "ValidationError" }, { status: 422 });
  }

  const { username, password } = parsed.data;

  let user: { username: string; password_hash: string } | null;
  try {
    user = await fetchAdminUser(username);
  } catch (err) {
    console.error("[admin/login] fetchAdminUser error:", err);
    return NextResponse.json({ ok: false, error: "ServerError" }, { status: 500 });
  }

  if (!user) {
    // Mensagem genérica pra não vazar usernames válidos
    return NextResponse.json({ ok: false, error: "InvalidCredentials" }, { status: 401 });
  }

  const ok = verifyPassword(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ ok: false, error: "InvalidCredentials" }, { status: 401 });
  }

  const token = await createSession(user.username);
  const res = NextResponse.json({ ok: true, username: user.username });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 12 * 3600,
  });
  return res;
}
