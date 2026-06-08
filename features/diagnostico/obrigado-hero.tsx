"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Download,
  MessageCircle,
  Sparkles,
  CalendarDays,
  ArrowRight,
  AlertCircle,
  Loader2,
  X,
  Phone
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { EBOOK_COMPLETO_PDF, EBOOK_COMPLETO_FILENAME, WHATSAPP_VIP_LINK } from "@/constants/ebooks";
import { siteConfig } from "@/constants/site";

/**
 * Página /obrigado — Etapa 2 do fluxo do ebook.
 * - Inicial: 4 perguntas de qualificação rápidas
 * - Após submit OK: libera o ebook completo + CTAs WhatsApp/Consultor
 */
export function ObrigadoHero({ nome, email }: { nome: string; email: string }) {
  const primeiroNome = nome ? `, ${nome}` : "";
  const [phase, setPhase] = useState<"qualifying" | "ready">("qualifying");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [answers, setAnswers] = useState({
    cargo_qualificado: "",
    espaco_maker: "",
    tamanho_escola: "",
  });
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  // Após liberação, dispara o download automaticamente
  useEffect(() => {
    if (phase === "ready") {
      // pequeno delay pra usuário ler "está chegando" antes do browser abrir o PDF
      const t = setTimeout(() => {
        downloadLinkRef.current?.click();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isComplete =
    answers.cargo_qualificado &&
    answers.espaco_maker &&
    answers.tamanho_escola;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) {
      setSubmitError("Responda as 3 perguntas para liberar o ebook.");
      return;
    }
    if (!email) {
      setSubmitError("Identificação perdida. Volte ao formulário inicial.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/diagnostico/qualificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...answers }),
      });
      if (!res.ok) {
        setSubmitError("Não conseguimos registrar agora. Tente novamente em instantes.");
        setIsSubmitting(false);
        return;
      }
      setPhase("ready");
    } catch {
      setSubmitError("Falha de conexão. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      bleed
      className="relative pt-[7rem] sm:pt-[10rem] md:pt-[11rem] pb-16 sm:pb-24 lg:pb-28 bg-[rgb(var(--color-brand-royal-deep))] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[rgb(var(--color-brand-mint))]/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--color-brand-sky))]/15 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "qualifying" ? (
            <motion.div
              key="qualifying"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <QualificationView
                primeiroNome={primeiroNome}
                answers={answers}
                setAnswers={setAnswers}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
                isComplete={!!isComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ReadyView
                primeiroNome={primeiroNome}
                downloadLinkRef={downloadLinkRef}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}

/* ─── FASE 1: Qualificação (4 perguntas rápidas) ─── */
type QualAnswers = {
  cargo_qualificado: string;
  espaco_maker: string;
  tamanho_escola: string;
};

function QualificationView({
  primeiroNome,
  answers,
  setAnswers,
  onSubmit,
  isSubmitting,
  submitError,
  isComplete,
}: {
  primeiroNome: string;
  answers: QualAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<QualAnswers>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submitError: string | null;
  isComplete: boolean;
}) {
  const setAnswer = (key: keyof QualAnswers, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <Reveal>
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center justify-center size-16 sm:size-20 rounded-full bg-[rgb(var(--color-brand-mint))]/20 border-2 border-[rgb(var(--color-brand-mint))]/40 mb-5"
          >
            <CheckCircle2 className="size-8 sm:size-10 text-[rgb(var(--color-brand-mint))]" />
          </motion.div>

          <h1 className="font-display text-white text-[clamp(1.875rem,3.5vw+0.5rem,3rem)] leading-[1.05] mb-3 text-balance">
            Seu e-book está chegando em poucos segundos{primeiroNome}...
          </h1>
          <p className="text-white/80 text-[1rem] sm:text-[1.125rem] leading-relaxed max-w-xl mx-auto">
            Antes disso, <strong className="text-white">3 perguntas rápidas</strong> para
            personalizar sua jornada com a We Make:
          </p>
        </div>
      </Reveal>

      {/* Form de 4 perguntas */}
      <Reveal delay={0.1}>
        <form onSubmit={onSubmit} className="bg-white rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl space-y-7">
          <Pergunta
            n={1}
            label="Você é gestor/diretor/coordenador?"
            value={answers.cargo_qualificado}
            onChange={(v) => setAnswer("cargo_qualificado", v)}
            options={[
              { value: "gestor", label: "Sim, sou gestor / diretor / coordenador" },
              { value: "professor", label: "Sou professor" },
              { value: "mantenedor", label: "Sou mantenedor / dono" },
              { value: "outro", label: "Outro" },
            ]}
          />

          <Pergunta
            n={2}
            label="Sua escola tem espaço / laboratório maker / robótica?"
            value={answers.espaco_maker}
            onChange={(v) => setAnswer("espaco_maker", v)}
            options={[
              { value: "tem_funciona", label: "Já tem e funciona bem" },
              { value: "tem_melhorar", label: "Tem mas precisa melhorar" },
              { value: "planejando", label: "Está planejando construir" },
              { value: "nao_tem", label: "Não tem (caro demais)" },
            ]}
          />

          <Pergunta
            n={3}
            label="Qual é o tamanho da sua escola?"
            value={answers.tamanho_escola}
            onChange={(v) => setAnswer("tamanho_escola", v)}
            options={[
              { value: "pequena", label: "Pequena (< 200 alunos)" },
              { value: "media", label: "Média (200 — 500 alunos)" },
              { value: "grande", label: "Grande (500+ alunos)" },
            ]}
          />

          {submitError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isComplete}
            className="w-full h-14 rounded-xl bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] flex items-center justify-center gap-3 card-hover-lift shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Liberando seu ebook...
              </>
            ) : (
              <>
                Próximo · Desbloquear E-book
                <ArrowRight className="size-5" />
              </>
            )}
          </button>
        </form>
      </Reveal>
    </div>
  );
}

/* ─── FASE 2: Liberado (download automático + CTAs) ─── */
function ReadyView({
  primeiroNome,
  downloadLinkRef,
}: {
  primeiroNome: string;
  downloadLinkRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowPopup(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const waMessage = "Olá! Acabei de baixar o e-book e gostaria de saber mais sobre as soluções da We Make para escolas confessionais.";
  const waLink = `https://wa.me/${siteConfig.whatsapp.consultor.number}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div>
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 text-center overflow-hidden"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
              >
                <X className="size-4" />
              </button>
              
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#25D366]/15 mb-5">
                <Phone className="size-8 text-[#25D366]" />
              </div>
              
              <h3 className="font-display text-[rgb(var(--color-brand-navy))] text-2xl mb-3">
                Que tal darmos o próximo passo?
              </h3>
              <p className="text-gray-600 text-[0.9375rem] leading-relaxed mb-6">
                Enquanto o seu e-book baixa, que tal falar direto com o nosso time institucional pelo WhatsApp para entender como a We Make pode ajudar a sua escola?
              </p>
              
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowPopup(false)}
                className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-[1.0625rem] shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="size-5" />
                Falar no WhatsApp
              </a>
              
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 text-[0.875rem] font-medium text-gray-400 hover:text-gray-600 transition"
              >
                Agora não, obrigado
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto text-center mb-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center size-20 sm:size-24 rounded-full bg-[rgb(var(--color-brand-mint))]/20 border-2 border-[rgb(var(--color-brand-mint))]/40 mb-6"
        >
          <CheckCircle2 className="size-10 sm:size-12 text-[rgb(var(--color-brand-mint))]" />
        </motion.div>

        <h1 className="font-display text-white text-[clamp(2rem,4vw+1rem,3.75rem)] leading-[1.05] mb-5 text-balance">
          Ebook liberado{primeiroNome}!
        </h1>
        <p className="text-white/85 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed max-w-2xl mx-auto">
          O download começa em instantes. Caso não inicie automaticamente,{" "}
          <a
            ref={downloadLinkRef}
            href={EBOOK_COMPLETO_PDF}
            download={EBOOK_COMPLETO_FILENAME}
            target="_blank"
            rel="noreferrer"
            className="text-[rgb(var(--color-brand-mint))] hover:underline font-semibold"
          >
            clique aqui para baixar o PDF
          </a>
          .
        </p>
      </div>

      {/* Card grande de download (visível mesmo após autostart) */}
      <Reveal delay={0.1}>
        <div className="max-w-2xl mx-auto mb-8">
          <a
            href={EBOOK_COMPLETO_PDF}
            download={EBOOK_COMPLETO_FILENAME}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 p-6 sm:p-7 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold shadow-2xl hover:shadow-[0_16px_48px_-12px_rgba(118,243,205,0.6)] hover:-translate-y-0.5 card-hover-lift"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 sm:size-14 rounded-xl bg-[rgb(var(--color-brand-navy))]/10 flex items-center justify-center shrink-0">
                <Download className="size-6 sm:size-7" />
              </div>
              <div className="text-left">
                <div className="text-[1rem] sm:text-[1.125rem] font-bold leading-tight">
                  Baixar o ebook (PDF)
                </div>
                <div className="text-[0.8125rem] sm:text-sm opacity-80 font-medium mt-0.5">
                  7 Princípios para Ensinar Tecnologia com Cosmovisão Cristã
                </div>
              </div>
            </div>
            <ArrowRight className="size-5 sm:size-6 shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Reveal>

      {/* Faixa VIP WhatsApp */}
      <Reveal delay={0.18}>
        <div className="max-w-2xl mx-auto mb-10">
          <a
            href={WHATSAPP_VIP_LINK}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#25D366]/15 to-[#25D366]/5 border-2 border-[#25D366]/40 hover:border-[#25D366]/70 hover:-translate-y-0.5 card-hover-lift backdrop-blur-sm shadow-lg"
          >
            <div aria-hidden className="absolute inset-0 bg-[#25D366]/15 blur-2xl rounded-2xl animate-pulse pointer-events-none -z-10" />
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="size-12 sm:size-14 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="size-6 sm:size-7 text-white" fill="white" />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#25D366] text-white text-[0.625rem] font-bold tracking-wider uppercase">
                    VIP
                  </span>
                  <div className="text-white text-[1rem] sm:text-[1.0625rem] font-bold leading-tight">
                    Entre no grupo de líderes
                  </div>
                </div>
                <div className="text-white/75 text-[0.8125rem] sm:text-sm leading-snug">
                  Networking com diretores, materiais exclusivos e atualizações em primeira mão.
                </div>
              </div>
            </div>
            <ArrowRight className="size-5 shrink-0 text-[#25D366] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Reveal>

      {/* CTA Falar com consultor */}
      <Reveal delay={0.25}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-white text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] mb-3 text-balance">
            Quer aprofundar e levar para sua escola?
          </h2>
          <p className="text-white/70 text-[0.9375rem] sm:text-[1rem] leading-relaxed max-w-xl mx-auto mb-6">
            Agende uma conversa direta com nosso time e descubra como aplicar os 7
            princípios na realidade da sua escola.
          </p>
          <a
            href="/#reuniao"
            className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] font-bold text-[1.0625rem] tracking-tight hover:brightness-110 hover:-translate-y-0.5 card-hover-lift shadow-[0_8px_28px_-6px_rgba(118,243,205,0.45)] ring-1 ring-[rgb(var(--color-brand-mint))]/40"
          >
            <CalendarDays className="size-5" />
            Falar com consultor
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
            <Sparkles className="size-4 text-[rgb(var(--color-brand-mint))]" />
            Também enviamos uma cópia do ebook por e-mail.
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ─── Pergunta com radio cards ─── */
function Pergunta({
  n,
  label,
  value,
  onChange,
  options,
}: {
  n: number;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="flex items-baseline gap-2 mb-3">
        <span className="inline-flex items-center justify-center size-6 rounded-full bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint-deep))] font-bold text-[0.75rem] shrink-0">
          {n}
        </span>
        <span className="font-display text-[rgb(var(--color-brand-navy))] text-[1.0625rem] sm:text-[1.125rem] leading-snug">
          {label}
        </span>
      </legend>
      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer card-hover-lift ${
                selected
                  ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/8"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  selected ? "border-[rgb(var(--color-brand-mint))]" : "border-gray-300"
                }`}
              >
                {selected && <span className="size-2.5 rounded-full bg-[rgb(var(--color-brand-mint))]" />}
              </span>
              <input
                type="radio"
                name={`pergunta-${n}`}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className="text-[0.9375rem] text-gray-700 leading-snug">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
