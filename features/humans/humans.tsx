"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { CinematicImage } from "@/components/cinematic/cinematic-image";
import { SceneFrame } from "@/components/cinematic/scene-frame";
import { TitleCard } from "@/components/cinematic/title-card";
import { SceneCounter } from "@/components/cinematic/scene-counter";
import { scenes } from "@/data/scenes";

/**
 * Capítulo VIII — "Por trás da tecnologia".
 *
 * Sequência cinematográfica vertical em 8 atos:
 *   I.    Cartela de abertura
 *   II–VII. Seis cenas humanas (crianças, adolescentes, oração,
 *           espaço maker, professores, colaboração)
 *   VIII. Cartela de encerramento
 *
 * Cada cena é renderizada por <SceneFrame /> com parallax + ken-burns
 * + reveal de tipografia ligados ao scroll. Um <SceneCounter /> fixo
 * acompanha a posição no eixo direito (md+).
 *
 * Substitua os arquivos em /public/photos/ para ativar as fotografias.
 */
export function Humans() {
  const [active, setActive] = useState<string | null>(null);
  const [seqRef, seqInView] = useInView<HTMLDivElement>({
    once: false,
    threshold: 0,
    rootMargin: "0px 0px -10% 0px",
  });

  const photoScenes = scenes.filter((s) => s.kind === "scene");
  const opening = scenes[0]!;
  const closing = scenes[scenes.length - 1]!;

  return (
    <div
      id="galeria"
      ref={seqRef}
      className="
        relative isolate
        bg-ink-950
      "
    >
      <TitleCard scene={opening} variant="opening" />

      {photoScenes.map((scene, i) => (
        <SceneFrame
          key={scene.id}
          scene={scene}
          index={i}
          total={photoScenes.length}
          priority={i === 0}
          onActive={setActive}
        />
      ))}

      <TitleCard scene={closing} variant="closing" />

      <SceneCounter
        active={active}
        scenes={photoScenes.map((s) => ({ id: s.id, number: s.number, eyebrow: s.eyebrow }))}
        visible={seqInView}
      />

      <FilmStripPreview />
    </div>
  );
}

/**
 * Rodapé editorial — uma "tira de filme" horizontal com miniaturas
 * de todas as cenas, ligada por uma hairline. Encerra a sequência
 * com um aceno cinematográfico antes do próximo capítulo.
 */
function FilmStripPreview() {
  const photoScenes = scenes.filter((s) => s.kind === "scene");
  return (
    <section className="relative py-[var(--space-section-tight)] border-t border-white/[0.06] bg-ink-950">
      <div className="container-rail">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-foreground/45">
            Storyboard
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
          <span className="font-mono text-[0.6875rem] tabular-nums tracking-[0.22em] text-foreground/45">
            06 cenas
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {photoScenes.map((scene) => (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              className="
                group relative aspect-[4/5] overflow-hidden rounded-xl
                border border-white/10 bg-ink-900
                transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-cinematic)]
                hover:-translate-y-1 hover:border-white/25
                hover:shadow-[0_24px_40px_-20px_rgba(0,0,0,0.7)]
              "
            >
              <CinematicImage
                src={scene.src}
                alt={scene.alt ?? scene.headline}
                tone={scene.tone}
                focal={scene.focal}
                overrender={0}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-foreground/55">
                  {scene.number}
                </div>
                <div className="mt-1 font-display text-[0.875rem] leading-tight text-foreground/95">
                  {scene.headline.split(",")[0]}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
