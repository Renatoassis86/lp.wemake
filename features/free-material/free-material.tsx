"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Download,
  Lock,
  MessageCircle,
  Users,
} from "lucide-react";
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
import { freeMaterialsByGate, type PrinciplePdf } from "@/data/free-materials";
import { fadeUp } from "@/lib/motion";
import { trackEvent } from "@/lib/analytics";
import { whatsappLink } from "@/constants/site";
import {
  leadShortSchema,
  ROLES_LABEL,
  UF_OPTIONS,
  type LeadShortInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * Capítulo IX — Trilha dos 7 Princípios.
 *
 * Funil editorial de desbloqueio progressivo, em 3 blocos:
 *
 *   1. FREE      — princípios 1, 2 e 3 abertos (form curto libera os 3)
 *   2. VIP       — princípio 4 (entra no grupo VIP do WhatsApp p/ liberar)
 *   3. MEETING   — princípios 5, 6 e 7 (agenda reunião p/ liberar)
 *
 * Cada bloco tem cor, identidade e CTA próprios. Os cards trancados
 * mostram a capa com overlay de cadeado e um chip "DESBLOQUEIE NO X".
 */
export function FreeMaterial() {
  return (
    <Section id="material" bleed>
      <Glow color="amber" size="xl" intensity={0.16} className="-left-32 top-1/3" />
      <Glow color="cyan" size="lg" intensity={0.18} className="-right-32 bottom-0" />

      <Container>
        {/* ─── Header ──────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Capítulo IX · Trilha dos 7 Princípios</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display font-light text-gradient-cinematic text-[clamp(2.25rem,1.8rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
              Sete princípios.{" "}
              <em className="font-display italic text-ivory-100">Sete cadernos editoriais.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-foreground/65">
              O livro do CEO Dênis Júlio foi fatiado em sete cadernos
              independentes — um por princípio. Os três primeiros estão
              abertos para download. Os próximos liberam à medida que você se
              aproxima da We Make.
            </p>
          </Reveal>
        </div>

        {/* ─── BLOCO 1 — FREE (3 PDFs + form único) ────────────── */}
        <Reveal delay={0.25}>
          <div className="mt-20">
            <BlockHeader
              tone="cyan"
              eyebrow="Acesso livre · 3 cadernos"
              title="Comece pelos três primeiros."
              subtitle="Princípios fundadores. Preencha uma vez, receba os três no seu email."
            />

            <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
              {/* Cards dos 3 PDFs free */}
              <Stagger delayChildren={0.05} staggerChildren={0.08} className="grid sm:grid-cols-3 gap-4">
                {freeMaterialsByGate.free.map((pdf) => (
                  <PdfCard key={pdf.id} pdf={pdf} />
                ))}
              </Stagger>

              {/* Form único */}
              <FreeForm />
            </div>
          </div>
        </Reveal>

        {/* ─── BLOCO 2 — VIP (1 PDF) ───────────────────────────── */}
        <Reveal delay={0.3}>
          <div className="mt-24">
            <BlockHeader
              tone="mint"
              eyebrow="Desbloqueia no grupo VIP"
              title="Continue lendo — entre no grupo VIP."
              subtitle="No grupo VIP no WhatsApp, você recebe o quarto caderno e o acesso a tudo que publicarmos a seguir."
            />

            <div className="mt-10 grid lg:grid-cols-[1fr_1.4fr] gap-10 items-stretch">
              {/* Card VIP gated */}
              <Stagger delayChildren={0} staggerChildren={0} className="grid">
                {freeMaterialsByGate.vip.map((pdf) => (
                  <PdfCard key={pdf.id} pdf={pdf} large />
                ))}
              </Stagger>

              {/* CTA VIP */}
              <UnlockPanel
                tone="mint"
                badge="GRATUITO · APROVAÇÃO MANUAL"
                title="Quero entrar no grupo VIP da We Make"
                description="Comunidade restrita no WhatsApp para gestores, mantenedores e coordenadores de escolas cristãs. Discussões fechadas com o Dênis e diretores parceiros."
                cta={{
                  label: "Entrar no grupo VIP",
                  href: whatsappLink("vip"),
                  external: true,
                  icon: <Users className="size-4" aria-hidden />,
                  placement: "trilha_vip_unlock",
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* ─── BLOCO 3 — MEETING (3 PDFs) ──────────────────────── */}
        <Reveal delay={0.35}>
          <div className="mt-24">
            <BlockHeader
              tone="amber"
              eyebrow="Desbloqueia na reunião estratégica"
              title="Os três últimos princípios — entregues pessoalmente."
              subtitle="Os princípios mais aplicáveis ao seu currículo. Liberados ao agendar uma conversa com o time da We Make."
            />

            <div className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
              <Stagger delayChildren={0.05} staggerChildren={0.08} className="grid sm:grid-cols-3 gap-4">
                {freeMaterialsByGate.meeting.map((pdf) => (
                  <PdfCard key={pdf.id} pdf={pdf} />
                ))}
              </Stagger>

              <UnlockPanel
                tone="amber"
                badge="REUNIÃO ESTRATÉGICA · 30 MIN"
                title="Quero apresentar a We Make à minha escola"
                description="Uma conversa de 30 minutos com nosso time comercial para entender o momento da sua instituição e apresentar o currículo. Sem compromisso."
                cta={{
                  label: "Agendar reunião",
                  href: "#reuniao",
                  external: false,
                  icon: <Calendar className="size-4" aria-hidden />,
                  placement: "trilha_meeting_unlock",
                }}
                secondaryCta={{
                  label: "Falar com consultor",
                  href: whatsappLink("consultor"),
                  external: true,
                  icon: <MessageCircle className="size-4" aria-hidden />,
                  placement: "trilha_meeting_unlock_secondary",
                }}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ───────────────────────────────────────────────────────────────
   Card de PDF — usa cover quando livre; cadeado + chip quando gated
   ─────────────────────────────────────────────────────────────── */
function PdfCard({ pdf, large = false }: { pdf: PrinciplePdf; large?: boolean }) {
  const gated = pdf.unlock !== "free";

  const gateLabel = pdf.unlock === "vip"
    ? "Grupo VIP"
    : pdf.unlock === "meeting"
    ? "Reunião"
    : null;

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative isolate overflow-hidden",
        "rounded-2xl border border-white/10 bg-ink-900/70 backdrop-blur-md",
        "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]",
        "flex flex-col",
        large ? "min-h-[420px]" : "min-h-[340px]",
      )}
    >
      {/* Cover */}
      <div className={cn("relative w-full overflow-hidden", large ? "aspect-[3/4]" : "aspect-[3/4]")}>
        {pdf.cover ? (
          <Image
            src={pdf.cover}
            alt={`Capa do caderno: ${pdf.title}`}
            fill
            sizes="(min-width: 1024px) 22rem, 100vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-[var(--ease-cinematic)]",
              gated ? "scale-[1.02] blur-[2px] brightness-[0.55]" : "group-hover:scale-[1.04]",
            )}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                pdf.unlock === "meeting"
                  ? "radial-gradient(120% 80% at 50% 30%, rgba(212,165,116,0.35), transparent 60%), linear-gradient(180deg, rgb(28,30,44) 0%, rgb(8,12,28) 100%)"
                  : "radial-gradient(120% 80% at 50% 30%, rgba(94,230,184,0.30), transparent 60%), linear-gradient(180deg, rgb(14,28,52) 0%, rgb(4,8,20) 100%)",
            }}
          />
        )}

        {/* Gradiente inferior para legibilidade do título */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(0deg, rgba(4,8,20,0.95) 0%, rgba(4,8,20,0.5) 50%, rgba(4,8,20,0) 100%)",
          }}
        />

        {/* Cadeado central nos gated */}
        {gated && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "inline-flex size-14 items-center justify-center rounded-full",
                "border backdrop-blur-md",
                pdf.unlock === "vip"
                  ? "border-[rgb(var(--color-brand-mint))]/50 bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                  : "border-glow-amber/50 bg-glow-amber/15 text-glow-amber",
              )}
            >
              <Lock className="size-5" aria-hidden />
            </div>
          </div>
        )}

        {/* Chip superior — número do princípio */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/60 backdrop-blur px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-foreground/75">
            <span className="font-display italic text-glow-cyan">
              {String(pdf.principle).padStart(2, "0")}
            </span>
            Princípio
          </span>
          {gateLabel && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] backdrop-blur",
                pdf.unlock === "vip"
                  ? "border border-[rgb(var(--color-brand-mint))]/40 bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                  : "border border-glow-amber/40 bg-glow-amber/15 text-glow-amber",
              )}
            >
              <Lock className="size-2.5" aria-hidden />
              {gateLabel}
            </span>
          )}
        </div>
      </div>

      {/* Texto */}
      <div className="relative p-5 flex flex-col flex-1 gap-3">
        <h3
          className={cn(
            "font-display tracking-[-0.015em] leading-[1.2]",
            large ? "text-[1.25rem]" : "text-[1.0625rem]",
          )}
        >
          {pdf.title}
        </h3>
        <p className="text-[0.8125rem] leading-snug text-foreground/60 line-clamp-3">
          {pdf.description}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between gap-2 text-[0.625rem] font-mono uppercase tracking-[0.18em] text-foreground/45">
          <span>{pdf.reading}</span>
          <span>{pdf.pages}p</span>
        </div>

        {/* Footer status */}
        {pdf.unlock === "free" ? (
          <div className="flex items-center gap-1.5 text-[0.6875rem] font-mono uppercase tracking-[0.18em] text-glow-cyan">
            <Check className="size-3" aria-hidden />
            Liberado com formulário
          </div>
        ) : (
          <div
            className={cn(
              "text-[0.6875rem] leading-snug",
              pdf.unlock === "vip" ? "text-[rgb(var(--color-brand-mint))]/85" : "text-glow-amber/85",
            )}
          >
            {pdf.unlockHint}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ───────────────────────────────────────────────────────────────
   Cabeçalho de bloco — cinematográfico, ajustado por tom
   ─────────────────────────────────────────────────────────────── */
function BlockHeader({
  tone,
  eyebrow,
  title,
  subtitle,
}: {
  tone: "cyan" | "mint" | "amber";
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const toneClasses = {
    cyan: "text-glow-cyan",
    mint: "text-[rgb(var(--color-brand-mint))]",
    amber: "text-glow-amber",
  } as const;

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-end">
      <div className="lg:col-span-7">
        <div className={cn("font-mono text-[0.6875rem] uppercase tracking-[0.22em]", toneClasses[tone])}>
          {eyebrow}
        </div>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          {title}
        </h3>
      </div>
      <p className="lg:col-span-5 text-[0.9375rem] leading-[1.6] text-foreground/65">
        {subtitle}
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────
   Painel de unlock — usado nos blocos VIP e MEETING
   ─────────────────────────────────────────────────────────────── */
type CtaSpec = {
  label: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
  placement: string;
};

function UnlockPanel({
  tone,
  badge,
  title,
  description,
  cta,
  secondaryCta,
}: {
  tone: "mint" | "amber";
  badge: string;
  title: string;
  description: string;
  cta: CtaSpec;
  secondaryCta?: CtaSpec;
}) {
  const isMint = tone === "mint";
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        "rounded-[2rem] border p-7 lg:p-9",
        "shadow-[0_30px_80px_-32px_rgba(0,0,0,0.7)]",
        "flex flex-col justify-between gap-6",
        isMint
          ? "border-[rgb(var(--color-brand-mint))]/30 bg-[rgb(var(--color-brand-mint))]/[0.08]"
          : "border-glow-amber/30 bg-glow-amber/[0.06]",
      )}
    >
      <div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.22em]",
            isMint
              ? "bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))] border border-[rgb(var(--color-brand-mint))]/30"
              : "bg-glow-amber/15 text-glow-amber border border-glow-amber/30",
          )}
        >
          <Lock className="size-2.5" aria-hidden />
          {badge}
        </span>
        <h4 className="mt-5 font-display text-[clamp(1.35rem,1.05rem+1vw,1.75rem)] leading-[1.15] tracking-[-0.015em] text-foreground">
          {title}
        </h4>
        <p className="mt-4 text-[0.9375rem] leading-[1.6] text-foreground/70">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5">
        <a
          href={cta.href}
          {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() =>
            trackEvent({
              name: "cta_click",
              placement: cta.placement,
              label: cta.label,
            })
          }
          className={cn(
            "inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full font-medium text-[0.9375rem]",
            "transition-all duration-300 ease-[var(--ease-cinematic)] hover:-translate-y-0.5",
            "shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]",
            isMint
              ? "bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] hover:bg-[rgb(var(--color-brand-mint-deep))]"
              : "bg-foreground text-ink-950 hover:bg-foreground/90",
          )}
        >
          {cta.icon}
          {cta.label}
        </a>

        {secondaryCta && (
          <a
            href={secondaryCta.href}
            {...(secondaryCta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() =>
              trackEvent({
                name: "cta_click",
                placement: secondaryCta.placement,
                label: secondaryCta.label,
              })
            }
            className="
              inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full
              border border-white/15 bg-white/[0.04] hover:bg-white/[0.08]
              font-medium text-[0.9375rem] text-foreground
              transition-colors duration-300
            "
          >
            {secondaryCta.icon}
            {secondaryCta.label}
          </a>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────
   Formulário curto que libera os 3 PDFs FREE
   ─────────────────────────────────────────────────────────────── */
function FreeForm() {
  const [sent, setSent] = useState(false);

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
        body: JSON.stringify({ ...data, channel: "free-material-trilha" }),
      }).catch(() => {});
      trackEvent({ name: "lead_submit", channel: "newsletter" });
      setSent(true);
      reset();
    } catch {
      setSent(true);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-ink-900/70 backdrop-blur-xl p-7 lg:p-9 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]">
      {sent ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-glow-cyan/15 ring-1 ring-glow-cyan/40">
            <Download className="size-5 text-glow-cyan" aria-hidden />
          </div>
          <h3 className="font-display text-2xl">Verifique seu email.</h3>
          <p className="max-w-sm text-sm text-foreground/65">
            Acabamos de enviar os 3 primeiros cadernos da trilha para o seu
            inbox. Se quiser desbloquear o quarto, entre agora no grupo VIP.
          </p>
        </div>
      ) : (
        <>
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-glow-cyan">
            Acesso gratuito · 3 cadernos
          </div>
          <h3 className="mt-3 font-display text-2xl">
            Receber os 3 primeiros princípios
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4" noValidate>
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

            <label className="flex items-start gap-3 text-[0.75rem] text-foreground/55">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 size-4 rounded border-white/20 bg-transparent accent-glow-cyan"
              />
              <span>
                Autorizo a We Make a entrar em contato e tratar meus dados.
              </span>
            </label>
            {errors.consent?.message && (
              <p className="text-xs text-red-300/90 -mt-2">{errors.consent.message}</p>
            )}

            <Button
              type="submit"
              size="lg"
              trailingIcon={!isSubmitting}
              disabled={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? "Enviando…" : "Quero receber os 3 cadernos"}
            </Button>
          </form>
        </>
      )}
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
      <Label>{label}</Label>
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
        "h-12 px-4 rounded-xl appearance-none",
        "border border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
        "bg-ink-900 text-[0.9375rem] text-foreground",
        "transition-colors duration-300 ease-[var(--ease-cinematic)]",
        "focus:outline-none focus:ring-2 focus:ring-glow-cyan/30",
        className,
      )}
    />
  );
}
