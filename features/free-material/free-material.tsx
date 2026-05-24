"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Download, FileText } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  leadShortSchema,
  ROLES_LABEL,
  UF_OPTIONS,
  type LeadShortInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * Ato IX — Material Gratuito.
 *
 *   esquerda  →  capa real do livro do CEO + descrição + metadados
 *   direita   →  formulário estratégico (mesmos campos qualificadores)
 *                + lista das peças complementares com capa real
 */
export function FreeMaterial() {
  const [sent, setSent] = useState(false);
  /** Capa de destaque (manifesto) + duas peças complementares formam a trilogia. */
  const headline = freeMaterials[0]!;
  const extras = freeMaterials.slice(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadShortInput>({ resolver: zodResolver(leadShortSchema) });

  const onSubmit = async (data: LeadShortInput) => {
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
              <Eyebrow>Capítulo IX · Trilogia gratuita</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.03em]">
                Três materiais derivados{" "}
                <em className="font-display italic text-ivory-100">do livro do CEO.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-prose text-[1rem] leading-[1.65] text-foreground/70">
                Manifesto, diagnóstico institucional e guia prático — uma
                trilogia editorial pensada para mover a direção da sua escola
                do diagnóstico à ação. Acesso gratuito, conteúdo institucional.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-8">
                <BookCover cover={headline.cover} title={headline.title} pages={headline.pages} />
                <div className="space-y-3">
                  <Meta label="Autor"     value={headline.author ?? "Equipe We Make"} />
                  <Meta label="Páginas"   value={String(headline.pages ?? "—")} />
                  <Meta label="Formato"   value="PDF · pt-BR" />
                  <Meta label="Audiência" value={headline.audience ?? "Direção escolar"} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — strategic form + extras */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.2}>
              <div className="rounded-[2rem] border border-white/10 bg-ink-900/70 backdrop-blur-xl p-7 lg:p-9 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]">
                {sent ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="inline-flex size-12 items-center justify-center rounded-full bg-glow-cyan/15 ring-1 ring-glow-cyan/40">
                      <Download className="size-5 text-glow-cyan" aria-hidden />
                    </div>
                    <h3 className="font-display text-2xl">Verifique seu email.</h3>
                    <p className="max-w-sm text-sm text-foreground/65">
                      Acabamos de enviar a biblioteca completa para o seu inbox.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan">
                      Acesso gratuito · trilogia editorial
                    </div>
                    <h3 className="mt-3 font-display text-2xl">
                      Receber os 3 materiais
                    </h3>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mt-5 grid gap-4"
                      noValidate
                    >
                      <SmallField label="Nome completo" error={errors.name?.message}>
                        <Input
                          {...register("name")}
                          placeholder="Como devemos chamar você?"
                          autoComplete="name"
                        />
                      </SmallField>

                      <SmallField label="Seu papel" error={errors.role?.message}>
                        <SelectNative {...register("role")}>
                          <option value="">Selecione…</option>
                          {(Object.keys(ROLES_LABEL) as Array<keyof typeof ROLES_LABEL>).map((r) => (
                            <option key={r} value={r}>{ROLES_LABEL[r]}</option>
                          ))}
                        </SelectNative>
                      </SmallField>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <SmallField label="Email" error={errors.email?.message}>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="seu@email.com"
                            autoComplete="email"
                          />
                        </SmallField>
                        <SmallField label="WhatsApp" error={errors.whatsapp?.message}>
                          <Input
                            {...register("whatsapp")}
                            type="tel"
                            inputMode="tel"
                            placeholder="(00) 00000-0000"
                            autoComplete="tel"
                          />
                        </SmallField>
                      </div>

                      <SmallField label="Nome da escola" error={errors.institution?.message}>
                        <Input
                          {...register("institution")}
                          placeholder="Ex.: Colégio Cristão Esperança"
                          autoComplete="organization"
                        />
                      </SmallField>

                      <div className="grid sm:grid-cols-[1fr_6rem] gap-4">
                        <SmallField label="Cidade" error={errors.city?.message}>
                          <Input
                            {...register("city")}
                            placeholder="Ex.: Natal"
                            autoComplete="address-level2"
                          />
                        </SmallField>
                        <SmallField label="UF" error={errors.state?.message}>
                          <SelectNative {...register("state")}>
                            <option value="">UF</option>
                            {UF_OPTIONS.map((uf) => (
                              <option key={uf} value={uf}>{uf}</option>
                            ))}
                          </SelectNative>
                        </SmallField>
                      </div>

                      <label className="flex items-start gap-2.5 text-[0.75rem] text-foreground/60 leading-snug">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-0.5 size-4 rounded border-white/20 bg-transparent accent-glow-cyan"
                        />
                        <span>
                          Autorizo o uso dos meus dados conforme a{" "}
                          <a href="/privacidade" className="text-foreground underline decoration-white/30">
                            Política de Privacidade
                          </a>.
                        </span>
                      </label>
                      {errors.consent?.message && (
                        <p className="text-[0.75rem] text-red-300/90 -mt-2">
                          {errors.consent.message}
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        trailingIcon={!isSubmitting}
                        disabled={isSubmitting}
                        className="mt-2"
                      >
                        {isSubmitting ? "Enviando…" : "Receber a biblioteca"}
                      </Button>
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
                    className="
                      group flex items-start gap-4
                      rounded-2xl border border-white/[0.08]
                      bg-white/[0.02] hover:bg-white/[0.04]
                      px-5 py-4 transition-colors
                    "
                  >
                    {/* Mini cover */}
                    {m.cover ? (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10">
                        <Image
                          src={m.cover}
                          alt={`Capa de ${m.title}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        {m.kind === "ebook" ? (
                          <BookOpen className="size-4 text-glow-cyan" />
                        ) : (
                          <FileText className="size-4 text-glow-amber" />
                        )}
                      </div>
                    )}

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

function BookCover({
  cover,
  title,
  pages,
}: {
  cover?: string;
  title: string;
  pages?: number;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-3 -z-10 rounded-[1.5rem] bg-glow-amber/15 blur-3xl"
      />
      <div
        className="
          relative w-[200px] sm:w-[220px] aspect-[2/3]
          rounded-[14px] overflow-hidden
          shadow-[12px_24px_60px_-20px_rgba(0,0,0,0.7)]
          ring-1 ring-white/15
        "
      >
        {cover ? (
          <Image
            src={cover}
            alt={`Capa do livro ${title}`}
            fill
            sizes="(min-width: 640px) 220px, 200px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-700 to-ink-950 text-foreground/75">
            <span className="font-display text-lg px-6 text-center">{title}</span>
          </div>
        )}
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

function SmallField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-[0.625rem]">{label}</Label>
      {children}
      {error && <p className="text-[0.75rem] text-red-300/90">{error}</p>}
    </div>
  );
}

function SelectNative({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 px-3 rounded-xl appearance-none",
        "border border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
        "bg-ink-900 text-[0.9375rem] text-foreground",
        "transition-colors duration-300 ease-[var(--ease-cinematic)]",
        "focus:outline-none focus:ring-2 focus:ring-glow-cyan/30",
        className,
      )}
    />
  );
}
