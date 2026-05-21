"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { primaryNav } from "@/constants/nav";
import { cn } from "@/lib/utils";
import { useUi } from "@/lib/store";
import { trackEvent } from "@/lib/analytics";

/**
 * Institutional top nav.
 * Floating glass capsule that condenses on scroll — Linear/Arc inspired.
 */
export function Nav() {
  const { navOpen, setNavOpen, scrolled, setScrolled } = useUi();
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onHash = () => setActiveHash(window.location.hash);
    onScroll();
    onHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, [setScrolled]);

  return (
    <header
      className={cn(
        "fixed top-3 inset-x-0 z-[var(--z-nav)]",
        "transition-[top] duration-500 ease-[var(--ease-cinematic)]",
        scrolled && "top-2",
      )}
    >
      <Container size="2xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative mx-auto flex items-center justify-between gap-6",
            "rounded-full border px-4 sm:px-5",
            "transition-[max-width,height,background,border-color,box-shadow] duration-500 ease-[var(--ease-cinematic)]",
            scrolled
              ? "max-w-[var(--container-xl)] h-14 border-white/10 bg-ink-900/70 backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
              : "max-w-[var(--container-2xl)] h-16 border-white/5 bg-ink-950/30 backdrop-blur-xl",
          )}
        >
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((link) => {
              const active = activeHash === link.href;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() =>
                    trackEvent({ name: "scroll_section", section: link.id })
                  }
                  className={cn(
                    "relative px-3.5 py-2 rounded-full",
                    "text-[0.875rem] font-medium",
                    "text-foreground/70 hover:text-foreground transition-colors duration-300",
                    active && "text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] border border-white/10"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Button variant="ghost" size="sm" asChild>
              <a href="#reuniao">Acessar</a>
            </Button>
            <Button
              size="sm"
              trailingIcon
              asChild
              onClick={() =>
                trackEvent({ name: "cta_click", placement: "nav", label: "Agendar conversa" })
              }
            >
              <a href="#reuniao">Agendar conversa</a>
            </Button>
          </div>

          <button
            type="button"
            aria-label={navOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setNavOpen(!navOpen)}
            className="lg:hidden inline-flex size-10 items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition"
          >
            {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </motion.div>
      </Container>

      <AnimatePresence>{navOpen && <MobileMenu />}</AnimatePresence>
    </header>
  );
}

function MobileMenu() {
  const setNavOpen = useUi((s) => s.setNavOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="lg:hidden mt-2 mx-3 rounded-3xl border border-white/10 bg-ink-900/90 backdrop-blur-2xl shadow-xl overflow-hidden"
    >
      <nav className="flex flex-col p-2">
        {primaryNav.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => setNavOpen(false)}
            className="flex flex-col gap-1 px-4 py-3 rounded-2xl hover:bg-white/[0.04] transition"
          >
            <span className="font-display text-lg">{link.label}</span>
            {link.description && (
              <span className="text-sm text-foreground/55">{link.description}</span>
            )}
          </a>
        ))}
        <div className="p-2 pt-3">
          <Button className="w-full" size="lg" trailingIcon asChild>
            <a href="#reuniao" onClick={() => setNavOpen(false)}>
              Agendar conversa
            </a>
          </Button>
        </div>
      </nav>
    </motion.div>
  );
}
