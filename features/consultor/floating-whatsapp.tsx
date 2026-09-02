"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Floating WhatsApp shortcut - fixed in the lower-right corner.
 * Shows after the user scrolls past the hero. Honors reduced-motion.
 */
export function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[var(--z-sticky)]"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="
                  absolute bottom-[4.5rem] right-0
                  w-[min(20rem,calc(100vw-2.5rem))]
                  max-h-[min(24rem,calc(100vh-7rem))] overflow-y-auto
                  rounded-2xl border border-white/12 bg-ink-900/90 backdrop-blur-xl
                  p-5
                  shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-base">Consultor We Make</div>
                    <div className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-emerald-400">
                      Online · responde em 8 min
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="-m-2.5 size-11 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-white/10"
                    aria-label="Fechar"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-foreground/70 leading-snug">
                  Olá! Está pensando em adotar tecnologia educacional na sua
                  escola? Posso te ajudar agora mesmo.
                </p>
                <a
                  href={whatsappLink("consultor")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: "cta_click",
                      placement: "floating_whatsapp",
                      label: "WhatsApp consultor",
                    })
                  }
                  className="
                    mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full
                    bg-emerald-500 hover:bg-emerald-400 text-ink-950 font-medium
                    h-11 px-5 text-[0.9375rem]
                    transition-colors
                  "
                >
                  Iniciar conversa
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar WhatsApp" : "Falar com consultor"}
            className="
              relative inline-flex size-14 items-center justify-center rounded-full
              bg-emerald-500 hover:bg-emerald-400 text-ink-950
              shadow-[0_18px_36px_-12px_rgba(16,185,129,0.55)]
              transition-transform duration-300 ease-[var(--ease-cinematic)]
              hover:scale-105
            "
          >
            {!open && (
              <span
                aria-hidden
                className="absolute inline-flex size-full rounded-full bg-emerald-500/40 animate-ping"
              />
            )}
            {open ? <X className="size-5 relative" /> : <MessageCircle className="size-5 relative" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
