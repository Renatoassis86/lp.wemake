/**
 * Auth do /admin — Edge-compatible.
 *
 * Sessão por cookie HttpOnly assinado com HMAC-SHA256 (Web Crypto).
 * Funciona em Edge runtime (middleware) E em Node (API routes).
 *
 * Hash de senha vive em lib/admin-password.ts (node:crypto, scrypt).
 */

export const ADMIN_COOKIE = "wm_admin_session";
const SESSION_TTL_HOURS = 12;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET nao definido ou muito curto (precisa >= 32 chars).",
    );
  }
  return secret;
}

/* ─────────────────────────────────────────────
   SESSION COOKIE (Web Crypto — Edge-compatible)
───────────────────────────────────────────── */

export type AdminSession = {
  username: string;
  exp: number;
};

function base64urlEncode(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array;
  if (typeof input === "string") {
    bytes = new TextEncoder().encode(input);
  } else if (input instanceof ArrayBuffer) {
    bytes = new Uint8Array(input);
  } else {
    bytes = input;
  }
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]!);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice(0, (4 - (s.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  // Garante ArrayBuffer "puro" pra satisfazer BufferSource em TS strict
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

async function importKey(): Promise<CryptoKey> {
  const secretBytes = new TextEncoder().encode(getSessionSecret());
  return crypto.subtle.importKey(
    "raw",
    toArrayBuffer(secretBytes),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function hmacSign(payload: string): Promise<string> {
  const key = await importKey();
  const data = new TextEncoder().encode(payload);
  const sig = await crypto.subtle.sign("HMAC", key, toArrayBuffer(data));
  return base64urlEncode(sig);
}

async function hmacVerify(payload: string, signature: string): Promise<boolean> {
  const key = await importKey();
  try {
    return await crypto.subtle.verify(
      "HMAC",
      key,
      toArrayBuffer(base64urlDecode(signature)),
      toArrayBuffer(new TextEncoder().encode(payload)),
    );
  } catch {
    return false;
  }
}

export async function signSession(session: AdminSession): Promise<string> {
  const payload = base64urlEncode(JSON.stringify(session));
  const sig = await hmacSign(payload);
  return `${payload}.${sig}`;
}

export async function verifySession(token: string | undefined | null): Promise<AdminSession | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const valid = await hmacVerify(payload, sig);
    if (!valid) return null;
    const bytes = base64urlDecode(payload);
    const decoded = JSON.parse(new TextDecoder().decode(bytes)) as AdminSession;
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null;
    if (!decoded.username) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function createSession(username: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_HOURS * 3600;
  return signSession({ username, exp });
}

/* ─────────────────────────────────────────────
   SUPABASE: buscar admin_user por username
───────────────────────────────────────────── */

export async function fetchAdminUser(username: string): Promise<{
  username: string;
  password_hash: string;
} | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase nao configurado (URL ou SERVICE_ROLE_KEY ausentes).");
  }

  const url = `${supabaseUrl}/rest/v1/admin_users?username=eq.${encodeURIComponent(username)}&select=username,password_hash&limit=1`;
  const res = await fetch(url, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[admin-auth] supabase fetch failed:", res.status, await res.text());
    return null;
  }
  const rows = (await res.json()) as Array<{ username: string; password_hash: string }>;
  return rows[0] ?? null;
}
