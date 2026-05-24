"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";

/**
 * Cartão editorial do palestrante.
 *
 *   - Retrato (com fallback elegante caso a foto institucional não esteja
 *     disponível ainda — gera um monograma a partir das iniciais do nome).
 *   - Nome em display, cargo em mono, bio editorial.
 *   - Pin "Falando agora" com glow vivo durante a sequência.
 */
export function SpeakerCard({ live = false }: { live?: boolean }) {
  const { name, role, bio, portrait, credentials } = siteConfig.founder;
  const [portraitOk, setPortraitOk] = useState(true);

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article
      className="
        relative isolate overflow-hidden
        rounded-[2rem] border border-white/10
        bg-gradient-to-b from-white/[0.04] to-white/[0]
        p-7 sm:p-9
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
      "
    >
      <div className="flex items-start gap-5">
        {/* Portrait */}
        <div className="relative shrink-0">
          <div
            aria-hidden
            className="absolute -inset-2 rounded-full bg-glow-cyan/22 blur-2xl"
          />
          <div
            className={cn(
              "relative size-16 sm:size-20 overflow-hidden rounded-full",
              "ring-2 ring-white/15",
              "bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950",
            )}
          >
            {portrait && portraitOk ? (
              <Image
                src={portrait}
                alt={`Retrato de ${name}, ${role}`}
                fill
                sizes="80px"
                className="object-cover"
                onError={() => setPortraitOk(false)}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-xl text-foreground/85 tracking-[-0.02em]">
                  {initials}
                </span>
              </div>
            )}
          </div>

          {live && (
            <span className="absolute -bottom-1 -right-1 inline-flex">
              <span className="absolute inline-flex size-3 rounded-full bg-glow-cyan/55 animate-ping" />
              <span className="relative inline-flex size-3 rounded-full bg-glow-cyan ring-2 ring-ink-900" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="font-display text-xl sm:text-2xl tracking-[-0.015em]">{name}</h4>
            {live && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-glow-cyan/30 bg-glow-cyan/10 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-glow-cyan">
                <span className="size-1 rounded-full bg-glow-cyan" />
                Falando agora
              </span>
            )}
          </div>
          <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/55">
            {role} · We Make
          </p>
          <p className="mt-4 text-[0.9375rem] leading-[1.65] text-foreground/70">
            {bio}
          </p>

          {/* Tags de credenciais — autoridade reconhecida */}
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {credentials.map((c) => (
              <li
                key={c.short}
                className="
                  inline-flex items-center gap-1 rounded-full
                  border border-glow-cyan/25 bg-glow-cyan/10
                  px-2.5 py-0.5
                  font-mono text-[0.625rem] uppercase tracking-[0.16em] text-glow-cyan
                "
              >
                <span className="size-1 rounded-full bg-glow-cyan" />
                {c.short}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Métricas institucionais */}
      <dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
        <Credential label="escolas parceiras" value={`${siteConfig.presence.schools}`} />
        <Credential label="estados ativos"    value={`${siteConfig.presence.states}`} />
        <Credential label="meta 2026"         value={`${siteConfig.presence.goalSchools}`} />
      </dl>
    </article>
  );
}

function Credential({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink-900/80 px-3 py-3 text-center">
      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-foreground/45">
        {label}
      </dt>
      <dd className="mt-1 font-display text-base tracking-[-0.02em] text-foreground">
        {value}
      </dd>
    </div>
  );
}
