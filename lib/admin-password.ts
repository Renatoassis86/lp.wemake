/**
 * Hash/verificação de senha — Node-only (usa scrypt do node:crypto).
 * Importado APENAS por rotas de API com `runtime = "nodejs"`.
 * NÃO importe daqui no middleware (Edge runtime).
 */
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

export function hashPassword(plaintext: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(plaintext, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(plaintext: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(plaintext, salt, 64).toString("hex");
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(hash, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
