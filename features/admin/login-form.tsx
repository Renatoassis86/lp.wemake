"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User2, AlertCircle, ArrowRight } from "lucide-react";

export function LoginForm({
  redirectTo,
  initialError,
}: {
  redirectTo: string;
  initialError?: string;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(
          res.status === 401
            ? "Usuário ou senha incorretos."
            : "Não foi possível entrar agora. Tente em instantes.",
        );
        setLoading(false);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Falha de conexão. Verifique sua internet.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[rgb(var(--color-brand-navy))] relative overflow-hidden">
      {/* Atmosfera de fundo */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[rgb(var(--color-brand-mint))]/[0.08] blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[420px] h-[420px] bg-[rgb(var(--color-brand-royal))]/[0.10] blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/photos/2.png"
            alt="We Make"
            width={200}
            height={60}
            priority
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>

        <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl">
          <div className="text-center mb-7">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-[rgb(var(--color-brand-mint))]/90 font-bold mb-2">
              Painel privado
            </p>
            <h1 className="font-display text-white text-[1.75rem] sm:text-[2rem] leading-[1.1]">
              Entrar no admin
            </h1>
            <p className="text-white/55 text-sm mt-2">
              Acesso restrito ao time We Make.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[0.8125rem] font-semibold text-white/80 mb-1.5">
                Usuário
              </label>
              <div className="relative">
                <User2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className="w-full h-12 pl-10 pr-4 text-[0.9375rem] rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.08] focus:border-[rgb(var(--color-brand-mint))]/50 focus:ring-2 focus:ring-[rgb(var(--color-brand-mint))]/20 outline-none transition-all"
                  placeholder="seu usuário"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[0.8125rem] font-semibold text-white/80 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-4 text-[0.9375rem] rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.08] focus:border-[rgb(var(--color-brand-mint))]/50 focus:ring-2 focus:ring-[rgb(var(--color-brand-mint))]/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-200 text-[0.8125rem]">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[0.9375rem] tracking-tight shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait"
            >
              {loading ? "Entrando..." : "Entrar"}
              {!loading && <ArrowRight className="size-4" />}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-[0.75rem] mt-6">
          Sessão expira em 12 horas.
        </p>
      </div>
    </main>
  );
}
