"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User2,
  Mail,
  Phone,
  Building2,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { BLOCKS, type Question } from "@/features/diagnostico/maturidade/blocks-config";
import { ROLES_LABEL } from "@/lib/validation";
import { calcStageFromScales } from "@/lib/maturidade-stages";

/**
 * Wizard gamificado de Diagnóstico de Maturidade.
 * - Step 0: Identificação (cadastro da escola)
 * - Step 1-7: Blocos 2-8 do config declarativo
 * - Step 8: tela de envio (loading + sucesso)
 */

type Answers = Record<string, any>;

const TOTAL_STEPS = BLOCKS.length + 1; // +1 = identificação

export function MaturidadeWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = identificação
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const wizardTopRef = useRef<HTMLDivElement>(null);

  // Rola até o topo do wizard (NÃO da página inteira)
  const scrollToWizardTop = () => {
    if (typeof window === "undefined") return;
    const el = wizardTopRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - 24; // 24px de respiro acima da progress bar
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // IDs dos campos OBRIGATÓRIOS da identificação (contam pro percentual)
  const ID_REQUIRED_FIELDS = useMemo(
    () => ["nome_escola", "cidade", "nome_respondente", "email", "whatsapp", "funcao", "segmentos", "consent"],
    [],
  );

  // Total de perguntas no diagnóstico (identificação + todos os blocos 2-8)
  const totalQuestions = useMemo(() => {
    const blocksCount = BLOCKS.reduce((sum, b) => sum + b.questions.length, 0);
    return ID_REQUIRED_FIELDS.length + blocksCount;
  }, [ID_REQUIRED_FIELDS]);

  // Quantas perguntas o usuário JÁ respondeu (real, não por etapa)
  const answeredCount = useMemo(() => {
    const isAnswered = (id: string, v: any, tipo?: "scale" | "checkbox" | "radio" | "text" | "consent" | "list" | "any"): boolean => {
      if (v === undefined || v === null) return false;
      if (tipo === "consent") return v === true;
      if (tipo === "list" || Array.isArray(v)) return Array.isArray(v) && v.length > 0;
      if (typeof v === "number") return !Number.isNaN(v);
      if (typeof v === "boolean") return v === true;
      if (typeof v === "string") return v.trim() !== "";
      return Boolean(v);
    };

    // Identificação
    let n = 0;
    ID_REQUIRED_FIELDS.forEach((id) => {
      const v = answers[id];
      if (id === "consent") {
        if (v === true) n++;
      } else if (id === "segmentos") {
        if (Array.isArray(v) && v.length > 0) n++;
      } else if (isAnswered(id, v)) {
        n++;
      }
    });

    // Blocos 2-8
    BLOCKS.forEach((block) => {
      block.questions.forEach((q) => {
        const v = answers[q.id];
        if (q.tipo === "checkbox") {
          if (Array.isArray(v) && v.length > 0) n++;
        } else if (q.tipo === "scale") {
          if (typeof v === "number" && v >= 1 && v <= 5) n++;
        } else {
          if (typeof v === "string" ? v.trim() !== "" : !!v) n++;
        }
      });
    });

    return n;
  }, [answers, ID_REQUIRED_FIELDS]);

  // Percentual real: 0% no início, cresce conforme responde
  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((answeredCount / totalQuestions) * 100);
  }, [answeredCount, totalQuestions]);

  // Atualiza uma resposta
  const setAnswer = (id: string, value: any) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    if (errors[id]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[id];
        return next;
      });
    }
  };

  // Valida o step atual; retorna lista de IDs com erro
  const validateStep = (): string[] => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      const required = [
        "nome_escola",
        "cidade",
        "nome_respondente",
        "email",
        "whatsapp",
        "funcao",
        "segmentos",
      ];
      required.forEach((id) => {
        const v = answers[id];
        if (Array.isArray(v) ? v.length === 0 : !v) {
          newErrors[id] = "Campo obrigatório";
        }
      });
      if (answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
        newErrors.email = "Email inválido";
      }
      if (!answers.consent) newErrors.consent = "É preciso consentir";
    } else {
      const block = BLOCKS[step - 1];
      if (block) {
        block.questions.forEach((q) => {
          if (!q.required) return;
          const v = answers[q.id];
          if (q.tipo === "checkbox") {
            if (!Array.isArray(v) || v.length === 0) {
              newErrors[q.id] = "Selecione ao menos uma opção";
            }
            if (q.maxSelect && Array.isArray(v) && v.length > q.maxSelect) {
              newErrors[q.id] = `Máximo ${q.maxSelect} opções`;
            }
          } else if (q.tipo === "scale") {
            if (typeof v !== "number" || v < 1 || v > 5) {
              newErrors[q.id] = "Selecione de 1 a 5";
            }
          } else if (!v || (typeof v === "string" && v.trim() === "")) {
            newErrors[q.id] = "Campo obrigatório";
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors);
  };

  const handleNext = () => {
    const bad = validateStep();
    if (bad.length > 0) {
      // Rola pra primeira pergunta com erro
      const el = document.querySelector(`[data-q-id="${bad[0]}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
      scrollToWizardTop();
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      scrollToWizardTop();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Monta payload conforme schema /api/diagnostico/maturidade
    const respostas: any[] = [];
    BLOCKS.forEach((block) => {
      block.questions.forEach((q) => {
        const v = answers[q.id];
        if (v === undefined || v === null || v === "") return;
        const base = { bloco: block.numero, pergunta_id: q.id, tipo: q.tipo };
        if (q.tipo === "checkbox") {
          respostas.push({ ...base, valor_opcoes: Array.isArray(v) ? v : [v] });
        } else if (q.tipo === "scale") {
          respostas.push({ ...base, valor_escala: Number(v) });
        } else {
          respostas.push({ ...base, valor_texto: String(v) });
        }
      });
    });

    const payload = {
      nome_escola: answers.nome_escola,
      cidade: answers.cidade,
      uf: answers.uf || undefined,
      nome_respondente: answers.nome_respondente,
      email: answers.email,
      whatsapp: answers.whatsapp,
      funcao: answers.funcao,
      segmentos: answers.segmentos || [],
      num_alunos: answers.num_alunos ? Number(answers.num_alunos) : null,
      eh_confessional: answers.eh_confessional || undefined,
      tradicao_confessional: answers.tradicao_confessional || null,
      consent: !!answers.consent,
      respostas,
    };

    try {
      const res = await fetch("/api/diagnostico/maturidade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setSubmitError("Não foi possível enviar agora. Tente em instantes.");
        setIsSubmitting(false);
        return;
      }
      // Calcula estágio de maturidade a partir das escalas Likert (1-5)
      const scaleValues: number[] = [];
      BLOCKS.forEach((b) => {
        b.questions.forEach((q) => {
          if (q.tipo === "scale" && typeof answers[q.id] === "number") {
            scaleValues.push(answers[q.id]);
          }
        });
      });
      const { stage, score } = calcStageFromScales(scaleValues);

      const params = new URLSearchParams({
        nome: (answers.nome_respondente || "").split(" ")[0],
        estagio: stage.slug,
        score: String(score),
      });
      router.push(`/obrigado-maturidade?${params.toString()}`);
    } catch {
      setSubmitError("Falha de conexão. Verifique sua internet.");
      setIsSubmitting(false);
    }
  };

  const currentBlock = step === 0 ? null : BLOCKS[step - 1];

  return (
    <Section
      id="maturidade-form"
      bleed
      className="relative py-12 sm:py-16 lg:py-20 bg-[rgb(var(--color-brand-navy))] overflow-hidden min-h-screen"
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--color-brand-mint))]/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto" ref={wizardTopRef}>

          {/* Progress bar sticky */}
          <ProgressBar
            step={step}
            total={TOTAL_STEPS}
            progress={progress}
            answered={answeredCount}
            totalQuestions={totalQuestions}
          />

          {/* Card do passo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl"
            >
              {step === 0 ? (
                <IdentificacaoBlock answers={answers} setAnswer={setAnswer} errors={errors} />
              ) : (
                <BlockRenderer
                  block={currentBlock!}
                  answers={answers}
                  setAnswer={setAnswer}
                  errors={errors}
                />
              )}

              {/* Erro de submit */}
              {submitError && (
                <div className="mt-5 flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Navegação */}
              <div className="mt-8 flex items-center justify-between gap-3 pt-6 border-t border-gray-100">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 h-12 px-5 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-[0.9375rem] hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="size-4" />
                    Voltar
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 h-12 px-6 sm:px-7 rounded-full bg-[rgb(var(--color-brand-mint))] hover:bg-[rgb(var(--color-brand-mint-deep))] text-[rgb(var(--color-brand-navy))] font-bold text-[0.9375rem] transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting
                    ? "Enviando..."
                    : step === TOTAL_STEPS - 1
                      ? "Finalizar diagnóstico"
                      : "Próximo"}
                  {!isSubmitting && <ArrowRight className="size-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Confidencialidade */}
          <p className="text-center text-white/50 text-[0.8125rem] mt-6">
            Suas respostas são confidenciais. Usamos somente para gerar o diagnóstico e
            preparar a conversa com nosso time.
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Progress bar — percentual real baseado em perguntas respondidas ─── */
function ProgressBar({
  step,
  total,
  progress,
  answered,
  totalQuestions,
}: {
  step: number;
  total: number;
  progress: number;
  answered: number;
  totalQuestions: number;
}) {
  const blockLabel = step === 0 ? "Identificação" : BLOCKS[step - 1]?.titulo || "";
  const stepLabel = `Etapa ${step + 1} de ${total}`;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[rgb(var(--color-brand-mint))]/90 font-bold whitespace-nowrap">
            {stepLabel}
          </span>
          <span className="text-white/40 text-[0.75rem]">·</span>
          <span className="text-white/85 text-[0.8125rem] sm:text-sm font-semibold truncate">
            {blockLabel}
          </span>
        </div>
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-white/55 text-[0.75rem] hidden sm:inline">
            {answered}/{totalQuestions}
          </span>
          <span className="text-[rgb(var(--color-brand-mint))] text-[0.875rem] font-bold tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[rgb(var(--color-brand-mint))] to-[rgb(var(--color-brand-sky))] rounded-full"
        />
      </div>
    </div>
  );
}

/* ─── Bloco 1 — Identificação (form especial) ─── */
function IdentificacaoBlock({
  answers,
  setAnswer,
  errors,
}: {
  answers: Answers;
  setAnswer: (id: string, value: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <BlockHeader emoji="📝" titulo="Identificação da escola" subtitulo="Para personalizar seu diagnóstico, precisamos conhecer você e sua escola." />

      <div className="space-y-4">
        <FieldText
          id="nome_escola"
          label="Nome da escola"
          placeholder="Colégio..."
          icon={<Building2 className="size-4" />}
          value={answers.nome_escola || ""}
          onChange={(v) => setAnswer("nome_escola", v)}
          error={errors.nome_escola}
        />

        <div className="grid sm:grid-cols-[1fr_120px] gap-3">
          <FieldText
            id="cidade"
            label="Cidade"
            placeholder="Sua cidade"
            icon={<MapPin className="size-4" />}
            value={answers.cidade || ""}
            onChange={(v) => setAnswer("cidade", v)}
            error={errors.cidade}
          />
          <FieldText
            id="uf"
            label="UF"
            placeholder="PB"
            maxLength={2}
            value={answers.uf || ""}
            onChange={(v) => setAnswer("uf", v.toUpperCase())}
            error={errors.uf}
          />
        </div>

        <FieldText
          id="nome_respondente"
          label="Seu nome"
          placeholder="Nome completo"
          icon={<User2 className="size-4" />}
          value={answers.nome_respondente || ""}
          onChange={(v) => setAnswer("nome_respondente", v)}
          error={errors.nome_respondente}
        />

        <div className="grid sm:grid-cols-2 gap-3">
          <FieldText
            id="email"
            type="email"
            label="E-mail"
            placeholder="voce@escola.com.br"
            icon={<Mail className="size-4" />}
            value={answers.email || ""}
            onChange={(v) => setAnswer("email", v)}
            error={errors.email}
          />
          <FieldText
            id="whatsapp"
            type="tel"
            label="WhatsApp"
            placeholder="(99) 99999-9999"
            icon={<Phone className="size-4" />}
            value={answers.whatsapp || ""}
            onChange={(v) => setAnswer("whatsapp", v)}
            error={errors.whatsapp}
          />
        </div>

        <FieldSelect
          id="funcao"
          label="Sua função na escola"
          icon={<User2 className="size-4" />}
          value={answers.funcao || ""}
          onChange={(v) => setAnswer("funcao", v)}
          error={errors.funcao}
          options={[
            { value: "", label: "Selecione..." },
            { value: "mantenedor", label: "Mantenedor" },
            { value: "diretor", label: "Diretor(a)" },
            { value: "coordenador", label: "Coordenador(a)" },
            { value: "professor", label: "Professor(a)" },
            { value: "outro", label: "Outro" },
          ]}
        />

        <FieldCheckbox
          id="segmentos"
          label="Quais segmentos a escola atende?"
          hint="Selecione todos que se aplicam."
          value={answers.segmentos || []}
          onChange={(v) => setAnswer("segmentos", v)}
          error={errors.segmentos}
          options={[
            { value: "infantil", label: "Educação Infantil" },
            { value: "fund1", label: "Fundamental 1" },
            { value: "fund2", label: "Fundamental 2" },
            { value: "medio", label: "Ensino Médio" },
          ]}
        />

        <FieldText
          id="num_alunos"
          type="number"
          label="Número aproximado de alunos (opcional)"
          placeholder="Ex: 350"
          value={answers.num_alunos || ""}
          onChange={(v) => setAnswer("num_alunos", v)}
        />

        <FieldRadioInline
          id="eh_confessional"
          label="A escola é confessional cristã? (opcional)"
          value={answers.eh_confessional || ""}
          onChange={(v) => setAnswer("eh_confessional", v)}
          options={[
            { value: "sim", label: "Sim" },
            { value: "nao", label: "Não" },
          ]}
        />

        {answers.eh_confessional === "sim" && (
          <FieldText
            id="tradicao_confessional"
            label="Qual tradição confessional? (opcional)"
            placeholder="Ex: Batista, Presbiteriana, Adventista..."
            value={answers.tradicao_confessional || ""}
            onChange={(v) => setAnswer("tradicao_confessional", v)}
          />
        )}

        <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={!!answers.consent}
            onChange={(e) => setAnswer("consent", e.target.checked)}
            className="mt-0.5 size-4 rounded border-gray-300 text-[rgb(var(--color-brand-royal))] focus:ring-[rgb(var(--color-brand-royal))]/30 shrink-0"
          />
          <span>
            Concordo com o tratamento dos meus dados para que a equipe We Make
            entre em contato sobre este diagnóstico (LGPD).
            {errors.consent && <span className="block text-red-500 text-xs mt-1">{errors.consent}</span>}
          </span>
        </label>
      </div>
    </div>
  );
}

/* ─── Renderiza um bloco do config (2-8) ─── */
function BlockRenderer({
  block,
  answers,
  setAnswer,
  errors,
}: {
  block: (typeof BLOCKS)[number];
  answers: Answers;
  setAnswer: (id: string, value: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <BlockHeader emoji={block.emoji} titulo={block.titulo} subtitulo={block.subtitulo} />

      <div className="space-y-7">
        {block.questions.map((q) => (
          <QuestionField
            key={q.id}
            q={q}
            value={answers[q.id]}
            onChange={(v) => setAnswer(q.id, v)}
            error={errors[q.id]}
          />
        ))}
      </div>
    </div>
  );
}

function BlockHeader({ emoji, titulo, subtitulo }: { emoji?: string; titulo: string; subtitulo: string }) {
  return (
    <div className="mb-7 pb-5 border-b border-gray-100">
      <div className="flex items-center gap-3 mb-2.5">
        {emoji && <span className="text-2xl sm:text-3xl">{emoji}</span>}
        <h2 className="font-display text-[rgb(var(--color-brand-navy))] text-[1.5rem] sm:text-[1.75rem] leading-[1.1]">
          {titulo}
        </h2>
      </div>
      <p className="text-gray-600 text-[0.9375rem] leading-relaxed">{subtitulo}</p>
    </div>
  );
}

/* ─── QuestionField dispatch por tipo ─── */
function QuestionField({
  q,
  value,
  onChange,
  error,
}: {
  q: Question;
  value: any;
  onChange: (v: any) => void;
  error?: string;
}) {
  if (q.tipo === "radio") {
    return (
      <FieldRadio
        id={q.id}
        label={q.label}
        value={value || ""}
        onChange={onChange}
        error={error}
        options={q.options}
      />
    );
  }
  if (q.tipo === "checkbox") {
    return (
      <FieldCheckbox
        id={q.id}
        label={q.label}
        hint={q.hint}
        value={value || []}
        onChange={onChange}
        error={error}
        options={q.options}
        maxSelect={q.maxSelect}
      />
    );
  }
  if (q.tipo === "scale") {
    return (
      <FieldScale
        id={q.id}
        label={q.label}
        value={typeof value === "number" ? value : null}
        onChange={onChange}
        error={error}
      />
    );
  }
  // text
  return (
    <FieldText
      id={q.id}
      label={q.label}
      placeholder={q.placeholder}
      multiline={q.multiline}
      maxLength={q.maxLength}
      value={value || ""}
      onChange={onChange}
      error={error}
    />
  );
}

/* ─── Field atoms ─── */

function FieldText({
  id, label, placeholder, type = "text", icon, value, onChange, error, multiline, maxLength,
}: {
  id: string; label: string; placeholder?: string; type?: string; icon?: React.ReactNode;
  value: string; onChange: (v: string) => void; error?: string;
  multiline?: boolean; maxLength?: number;
}) {
  return (
    <div data-q-id={id}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {icon && !multiline && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
        )}
        {multiline ? (
          <textarea
            id={id}
            rows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full px-4 py-3 text-base rounded-xl border ${error ? "border-red-300" : "border-gray-200"} focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all resize-y`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full h-12 ${icon ? "pl-9" : "pl-4"} pr-4 text-base rounded-xl border ${error ? "border-red-300" : "border-gray-200"} focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all`}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FieldSelect({
  id, label, icon, value, onChange, error, options,
}: {
  id: string; label: string; icon?: React.ReactNode;
  value: string; onChange: (v: string) => void; error?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div data-q-id={id}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-12 ${icon ? "pl-9" : "pl-4"} pr-4 text-base rounded-xl border ${error ? "border-red-300" : "border-gray-200"} focus:border-[rgb(var(--color-brand-royal))] focus:ring-2 focus:ring-[rgb(var(--color-brand-royal))]/20 outline-none transition-all appearance-none bg-white text-gray-700`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FieldRadio({
  id, label, value, onChange, error, options,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div data-q-id={id}>
      <p className="text-[0.9375rem] sm:text-[1rem] font-semibold text-gray-800 mb-3 leading-snug">{label}</p>
      <div className="space-y-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                selected
                  ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/8"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "border-[rgb(var(--color-brand-mint))]" : "border-gray-300"}`}>
                {selected && <span className="size-2.5 rounded-full bg-[rgb(var(--color-brand-mint))]" />}
              </span>
              <input
                type="radio"
                name={id}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span className="text-[0.9375rem] text-gray-700">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}

function FieldRadioInline({
  id, label, value, onChange, options,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div data-q-id={id}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-5 h-11 rounded-full border-2 font-semibold text-[0.9375rem] transition-all ${
                selected
                  ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-navy))]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FieldCheckbox({
  id, label, hint, value, onChange, error, options, maxSelect,
}: {
  id: string; label: string; hint?: string;
  value: string[]; onChange: (v: string[]) => void; error?: string;
  options: { value: string; label: string }[]; maxSelect?: number;
}) {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((x) => x !== val));
    } else {
      if (maxSelect && value.length >= maxSelect) return;
      onChange([...value, val]);
    }
  };

  return (
    <div data-q-id={id}>
      <p className="text-[0.9375rem] sm:text-[1rem] font-semibold text-gray-800 mb-1 leading-snug">{label}</p>
      {hint && (
        <p className="text-[0.8125rem] text-gray-500 mb-3">
          {hint}
          {maxSelect && ` (${value.length}/${maxSelect})`}
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt.value);
          const disabled = !selected && !!maxSelect && value.length >= maxSelect;
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                selected
                  ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]/8 cursor-pointer"
                  : disabled
                    ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
              }`}
            >
              <span className={`size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))]" : "border-gray-300"}`}>
                {selected && <CheckCircle2 className="size-3.5 text-white" />}
              </span>
              <input
                type="checkbox"
                checked={selected}
                onChange={() => !disabled && toggle(opt.value)}
                disabled={disabled}
                className="sr-only"
              />
              <span className="text-[0.9375rem] text-gray-700">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}

function FieldScale({
  id, label, value, onChange, error,
}: {
  id: string; label: string; value: number | null; onChange: (v: number) => void; error?: string;
}) {
  return (
    <div data-q-id={id}>
      <p className="text-[0.9375rem] sm:text-[1rem] font-semibold text-gray-800 mb-3 leading-snug">{label}</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`flex-1 h-12 sm:h-14 rounded-xl border-2 font-display text-[1.125rem] sm:text-[1.25rem] font-bold transition-all ${
                selected
                  ? "border-[rgb(var(--color-brand-mint))] bg-[rgb(var(--color-brand-mint))] text-[rgb(var(--color-brand-navy))] shadow-md"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-[0.75rem] text-gray-500 mt-2 px-1">
        <span>Discordo totalmente</span>
        <span>Concordo totalmente</span>
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
