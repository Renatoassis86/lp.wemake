"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ListChecks,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Download,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { href: "/admin/analytics", label: "Analytics & Funil", icon: TrendingUp },
  { href: "/admin/leads-escola", label: "Leads - Reunião Estratégica", icon: Users },
  {
    href: "/admin/diagnostico-escola",
    label: "Respondentes - Diagnóstico",
    icon: ClipboardList,
  },
  {
    href: "/admin/diagnostico-respostas",
    label: "Diagnósticos de Maturidade",
    icon: ListChecks,
  },
  {
    href: "/admin/pdf-downloads",
    label: "Downloads - Ebook 7 Princípios",
    icon: Download,
  },
];

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname?.startsWith(item.href + "/");
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-brand-navy))] text-white">
      {/* Atmosfera */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-[rgb(var(--color-brand-mint))]/[0.05] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[5%] w-[520px] h-[520px] bg-[rgb(var(--color-brand-royal))]/[0.07] blur-[140px] rounded-full" />
      </div>

      {/* ============ HEADER MOBILE ============ */}
      <header className="lg:hidden sticky top-0 z-40 backdrop-blur-md bg-[rgb(var(--color-brand-navy))]/85 border-b border-white/8">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/photos/2.png"
              alt="We Make"
              width={120}
              height={36}
              className="h-7 w-auto object-contain"
            />
            <span className="text-xs font-mono uppercase tracking-widest text-[rgb(var(--color-brand-mint))]/90 font-bold">
              admin
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="size-10 inline-flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* ============ DRAWER MOBILE ============ */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 bottom-0 w-72 bg-[rgb(var(--color-brand-navy))] border-l border-white/10 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[rgb(var(--color-brand-mint))] font-bold">
                Painel admin
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="size-9 inline-flex items-center justify-center rounded-lg hover:bg-white/5"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.9375rem] font-medium transition ${
                      active
                        ? "bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-5 border-t border-white/10">
              <p className="text-[0.75rem] text-white/45 mb-2 px-2">
                Logado como <span className="text-white/85 font-semibold">{username}</span>
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-white/10 hover:bg-white/5 text-[0.875rem] font-medium text-white/80 transition"
              >
                <LogOut className="size-4" />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ============ LAYOUT DESKTOP ============ */}
      <div className="relative z-10 flex">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 min-h-screen border-r border-white/8 bg-[rgb(var(--color-brand-navy))]/60 backdrop-blur-sm p-5 sticky top-0">
          <Link href="/admin" className="flex items-center gap-3 mb-8">
            <Image
              src="/photos/2.png"
              alt="We Make"
              width={140}
              height={42}
              className="h-9 w-auto object-contain"
            />
            <span className="text-[0.6875rem] font-mono uppercase tracking-widest text-[rgb(var(--color-brand-mint))] font-bold pt-1">
              admin
            </span>
          </Link>

          <nav className="flex-1 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.9375rem] font-medium transition ${
                    active
                      ? "bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-5 mt-5 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="size-9 rounded-full bg-[rgb(var(--color-brand-mint))]/15 border border-[rgb(var(--color-brand-mint))]/30 flex items-center justify-center text-[rgb(var(--color-brand-mint))] font-bold text-sm">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white/90 text-[0.875rem] font-semibold truncate">{username}</p>
                <p className="text-white/45 text-[0.6875rem]">Sessão 12h</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-white/10 hover:bg-white/5 text-[0.8125rem] font-medium text-white/75 transition"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
