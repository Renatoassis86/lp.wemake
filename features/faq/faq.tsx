"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Editorial FAQ - typographic accordion, no surprise icons.
 */
export function Faq() {
  return (
    <Section id="faq" bleed>
      <Container size="lg">
        <Reveal>
          <Eyebrow>Perguntas estratégicas</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(1.875rem,1.5rem+1.8vw,3rem)] leading-[1.1] tracking-[-0.025em]">
            O que diretores e mantenedores costumam nos perguntar.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-white/10">
          {faq.map((item, i) => (
            <FaqRow key={item.id} index={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FaqRow({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-start gap-6 py-7 text-left"
      >
        <span className="font-mono text-[0.75rem] tracking-[0.22em] text-foreground/35 mt-1.5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-[clamp(1.125rem,0.95rem+0.5vw,1.5rem)] leading-[1.25] tracking-[-0.015em] text-foreground/90">
          {question}
        </span>
        <Plus
          className={cn(
            "size-5 mt-1 text-foreground/55 transition-transform duration-500 ease-[var(--ease-cinematic)]",
            open && "rotate-45 text-glow-cyan",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-[3rem] pr-12 max-w-prose text-[0.9375rem] leading-[1.65] text-foreground/65">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
