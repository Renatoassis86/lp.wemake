"use client";

import { useMemo, useRef, useState } from "react";
import type { PlanoSecao } from "@/data/plano-negocio-perguntas";

type SaveState = "idle" | "saving" | "saved" | "error";

function useAutosave() {
  const [states, setStates] = useState<Record<string, SaveState>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  function schedule(questionId: string, resposta: string) {
    setStates((s) => ({ ...s, [questionId]: "saving" }));
    if (timers.current[questionId]) clearTimeout(timers.current[questionId]);
    timers.current[questionId] = setTimeout(async () => {
      try {
        const res = await fetch("/api/admin/plano-negocio/respostas", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question_id: questionId, resposta }),
        });
        setStates((s) => ({ ...s, [questionId]: res.ok ? "saved" : "error" }));
      } catch {
        setStates((s) => ({ ...s, [questionId]: "error" }));
      }
    }, 700);
  }

  return { states, schedule };
}

function SaveBadge({ state }: { state: SaveState | undefined }) {
  if (!state || state === "idle") return null;
  const label = state === "saving" ? "Salvando…" : state === "saved" ? "Salvo" : "Erro ao salvar";
  const color =
    state === "saving"
      ? "text-white/40"
      : state === "saved"
        ? "text-[rgb(var(--color-brand-mint))]"
        : "text-red-400";
  return <span className={`text-[0.6875rem] font-mono ${color}`}>{label}</span>;
}

export function PlanoNegocioForm({
  secoes,
  respostasIniciais,
}: {
  secoes: PlanoSecao[];
  respostasIniciais: Record<string, string>;
}) {
  const [respostas, setRespostas] = useState<Record<string, string>>(respostasIniciais);
  const [secaoAtiva, setSecaoAtiva] = useState(secoes[0]?.id ?? "");
  const { states, schedule } = useAutosave();

  const secao = useMemo(() => secoes.find((s) => s.id === secaoAtiva) ?? secoes[0], [secoes, secaoAtiva]);

  const totalPerguntas = useMemo(
    () => secoes.reduce((acc, s) => acc + s.subsecoes.reduce((a, sub) => a + sub.perguntas.length, 0), 0),
    [secoes],
  );
  const totalRespondidas = useMemo(
    () => Object.values(respostas).filter((v) => v && v.trim().length > 0).length,
    [respostas],
  );

  function respondidasNaSecao(s: PlanoSecao) {
    const perguntas = s.subsecoes.flatMap((sub) => sub.perguntas);
    const respondidas = perguntas.filter((p) => respostas[p.id]?.trim()).length;
    return { respondidas, total: perguntas.length };
  }

  function handleChange(questionId: string, value: string) {
    setRespostas((r) => ({ ...r, [questionId]: value }));
    schedule(questionId, value);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      {/* Navegação por capítulo */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="mb-3 px-1">
          <p className="text-white/45 text-[0.75rem] font-mono">
            {totalRespondidas}/{totalPerguntas} respondidas
          </p>
          <div className="h-1.5 rounded-full bg-white/10 mt-1.5 overflow-hidden">
            <div
              className="h-full bg-[rgb(var(--color-brand-mint))] transition-all"
              style={{ width: `${totalPerguntas ? (totalRespondidas / totalPerguntas) * 100 : 0}%` }}
            />
          </div>
        </div>
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {secoes.map((s, i) => {
            const { respondidas, total } = respondidasNaSecao(s);
            const ativo = s.id === secaoAtiva;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSecaoAtiva(s.id)}
                className={`text-left shrink-0 lg:shrink min-h-11 px-3 py-2.5 rounded-xl text-[0.8125rem] font-medium transition whitespace-nowrap lg:whitespace-normal ${
                  ativo
                    ? "bg-[rgb(var(--color-brand-mint))]/15 text-[rgb(var(--color-brand-mint))]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="font-mono text-[0.6875rem] opacity-60 mr-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.titulo}
                <span className="ml-1.5 text-white/35 text-[0.6875rem]">
                  ({respondidas}/{total})
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Perguntas da seção ativa */}
      <div className="min-w-0">
        {secao && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
            <h2 className="font-display text-white text-[1.375rem] sm:text-[1.625rem] leading-tight">
              {secao.titulo}
            </h2>
            {secao.intro && <p className="text-white/55 text-[0.875rem] mt-2 max-w-3xl">{secao.intro}</p>}

            <div className="mt-6 space-y-8">
              {secao.subsecoes.map((sub, subIdx) => (
                <div key={subIdx}>
                  {sub.titulo && (
                    <h3 className="text-[rgb(var(--color-brand-mint))]/90 font-mono uppercase tracking-wider text-[0.75rem] font-bold mb-3">
                      {sub.titulo}
                    </h3>
                  )}
                  <div className="space-y-6">
                    {sub.perguntas.map((p) => (
                      <div key={p.id}>
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <label htmlFor={p.id} className="text-white/90 text-[0.9375rem] font-medium leading-snug">
                            {p.pergunta}
                          </label>
                          <SaveBadge state={states[p.id]} />
                        </div>
                        {p.explicacao && <p className="text-white/45 text-[0.8125rem] mb-2">{p.explicacao}</p>}
                        <textarea
                          id={p.id}
                          rows={3}
                          value={respostas[p.id] ?? ""}
                          onChange={(e) => handleChange(p.id, e.target.value)}
                          placeholder="Sua resposta…"
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-white/90 text-base sm:text-[0.875rem] placeholder:text-white/30 focus:outline-none focus:border-[rgb(var(--color-brand-mint))]/50 resize-y"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
