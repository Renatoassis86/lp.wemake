"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Download, FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Glow } from "@/components/ui/glow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { freeMaterials } from "@/data/free-materials";
import { fadeUp } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Email inválido."),
});
type Input = z.infer<typeof schema>;

/**
 * Ato IX — Material Gratuito.
 *
 * Layout em duas colunas:
 *   esquerda  →  capa editorial do livro do CEO + descrição
 *   direita   →  formulário curto + lista de materiais incluídos
 */
export function FreeMaterial() {
  const [sent, setSent] = useState(false);
  const livro = freeMaterials.find((m) => m.kind === "livro") ?? freeMaterials[0]!;
  const extras = freeMaterials.filter((m) => m.id !== livro.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Input>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Input) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, channel: "free-material" }),
      }).catch(() => {});
      trackEvent({ name: "lead_submit", channel: "newsletter" });
      setSent(true);
      reset();
    } catch {
      setSent(true);
    }
  };

  return (
    <Section id="material" bleed>
      <Glow color="amber" size="xl" intensity={0.18} className="-left-32 top-1/2 -translate-y-1/2" />
      <Glow color="cyan" size="lg" intensity={0.18} className="-right-32 bottom-0" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left — book showcase */}
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Capítulo IX · Biblioteca aberta</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                Comece pelo livro do{" "}
                <em className="font-display italic text-ivory-100">nosso CEO.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-prose text-[1rem] leading-[1.65] text-foreground/65">
                {livro.description}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-8">
                <BookCover title={livro.title} subtitle="Editorial · We Make" pages={livro.pages} />
                <div className="space-y-3">
                  <Meta label="Autor" value={livro.author ?? "Equipe We Make"} />
                  <Meta label="Páginas" value={String(livro.pages ?? "—")} />
                  <Meta label="Formato" value="PDF · ePub · Kindle" />
                  <Meta label="Idioma" value="Português · pt-BR" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — form + extras */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <div className="rounded-[2rem] border border-white/10 bg-ink-900/70 backdrop-blur-xl p-8 lg:p-10 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]">
                {sent ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="inline-flex size-12 items-center justify-center rounded-full bg-glow-cyan/15 ring-1 ring-glow-cyan/40">
                      <Download className="size-5 text-glow-cyan" aria-hidden />
                    </div>
                    <h3 className="font-display text-2xl">Verifique seu email.</h3>
                    <p className="max-w-sm text-sm text-foreground/65">
                      Acabamos de enviar o livro do CEO e os materiais
                      complementares no seu inbox.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan">
                      Acesso gratuito · inclui livro + 3 materiais
                    </div>
                    <h3 className="mt-3 font-display text-2xl">
                      Receber a biblioteca completa
                    </h3>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mt-6 grid gap-4"
                      noValidate
                    >
                      <div className="grid gap-2">
                        <Label>Nome</Label>
                        <Input
                          {...register("name")}
                          placeholder="Como devemos chamar você?"
                          autoComplete="name"
                        />
                        {errors.name?.message && (
                          <p className="text-xs text-red-300/90">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                          {...register("email")}
                          type="email"
                          placeholder="diretoria@suaescola.com.br"
                          autoComplete="email"
                        />
                        {errors.email?.message && (
                          <p className="text-xs text-red-300/90">{errors.email.message}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        trailingIcon={!isSubmitting}
                        disabled={isSubmitting}
                        className="mt-2"
                      >
                        {isSubmitting ? "Enviando…" : "Receber a biblioteca"}
                      </Button>
                      <p className="text-[0.6875rem] leading-relaxed text-foreground/45">
                        Nada de spam. Você pode descadastrar-se a qualquer
                        momento.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Stagger
                delayChildren={0.05}
                staggerChildren={0.08}
                className="mt-8 space-y-3"
              >
                {extras.map((m) => (
                  <motion.div
                    key={m.id}
                    variants={fadeUp}
                    className={cn(
                      "flex items-start gap-4",
                      "rounded-2xl border border-white/[0.08]",
                      "bg-white/[0.02] hover:bg-white/[0.04]",
                      "px-5 py-4 transition-colors",
                    )}
                  >
                    <div className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      {m.kind === "ebook" ? (
                        <BookOpen className="size-4 text-glow-cyan" />
                      ) : (
                        <FileText className="size-4 text-glow-amber" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
                          {m.kind}
                        </span>
                        {m.pages && (
                          <span className="font-mono text-[0.625rem] tracking-[0.18em] text-foreground/35">
                            · {m.pages}p
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 font-display text-base text-foreground/90">
                        {m.title}
                      </div>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-foreground/55">
                        {m.description}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 mt-1 text-foreground/40 shrink-0" />
                  </motion.div>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BookCover({ title, subtitle, pages }: { title: string; subtitle: string; pages?: number }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-3 -z-10 rounded-[1.5rem] bg-glow-amber/15 blur-3xl"
      />
      <div
        className="
          relative w-[200px] sm:w-[220px] aspect-[2/3]
          rounded-[14px]
          bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950
          border border-white/15
          shadow-[12px_24px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]
          overflow-hidden
        "
      >
        <div
          aria-hidden
          className="absolute inset-y-3 left-2 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div>
            <div className="font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-foreground/55">
              {subtitle}
            </div>
            <div className="mt-1 h-px w-10 bg-glow-amber" />
          </div>
          <div>
            <div className="font-display text-[1.5rem] leading-[1.05] tracking-[-0.02em] text-ivory-100">
              {title}
            </div>
            <div className="mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.28em] text-foreground/45">
              We Make · Volume 01
            </div>
          </div>
        </div>
      </div>
      {pages && (
        <div className="mt-3 text-center font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
          {pages} páginas
        </div>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-foreground/45">
        {label}
      </dt>
      <dd className="mt-0.5 text-[0.9375rem] text-foreground/85">{value}</dd>
    </div>
  );
}
