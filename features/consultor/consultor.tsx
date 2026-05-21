"use client";

import { motion } from "framer-motion";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Reveal } from "@/components/motion/reveal";
import { whatsappLink } from "@/constants/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Ato XI — Consultor Comercial (WhatsApp direto).
 * Conversa 1:1 imediata, com tom institucional e tempo de resposta visível.
 */
export function Consultor() {
  return (
    <Section id="consultor" bleed tight>
      <Container size="lg">
        <Reveal>
          <div
            className="
              relative isolate overflow-hidden
              rounded-[2rem] border border-white/12
              bg-gradient-to-b from-white/[0.05] to-white/[0.01]
              p-8 sm:p-12
            "
          >
            <Glow color="cyan" size="lg" intensity={0.22} className="-top-32 -right-20" />

            <div className="grid sm:grid-cols-[auto_1fr_auto] items-center gap-6 sm:gap-10">
              {/* Avatar */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-glow-cyan/25 blur-xl"
                />
                <div
                  className="
                    relative size-16 sm:size-20 rounded-full
                    bg-gradient-to-br from-ink-300/30 to-glow-cyan/30
                    ring-2 ring-white/15
                    flex items-center justify-center
                  "
                >
                  <PhoneCall className="size-6 text-foreground/80" aria-hidden />
                </div>
                <span className="absolute bottom-1 right-1 inline-flex">
                  <motion.span
                    className="absolute inline-flex size-3 rounded-full bg-emerald-400/60"
                    animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  <span className="relative inline-flex size-3 rounded-full bg-emerald-400 ring-2 ring-ink-900" />
                </span>
              </div>

              {/* Copy */}
              <div className="min-w-0">
                <Eyebrow>Capítulo XI · Conversa imediata</Eyebrow>
                <h2 className="mt-3 font-display font-light text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
                  Falar agora com um{" "}
                  <em className="italic text-ivory-100">consultor</em>{" "}
                  da We Make.
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-snug text-foreground/65">
                  Tempo médio de resposta · <span className="text-foreground">8 minutos</span> em horário comercial.
                </p>
              </div>

              {/* CTA */}
              <Button
                size="xl"
                asChild
                onClick={() =>
                  trackEvent({
                    name: "cta_click",
                    placement: "consultor",
                    label: "WhatsApp consultor",
                  })
                }
              >
                <a
                  href={whatsappLink("consultor")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-[1.05em] mr-1 opacity-80" aria-hidden />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
