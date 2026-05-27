"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Carrossel auto-rotativo das fotos do espaço maker.
 *
 * Crossfade verdadeiro: ambas as fotos coexistem sobrepostas durante a
 * transição (uma some enquanto a outra aparece), sem nunca expor o fundo
 * entre uma troca e outra.
 */
const PHOTOS = [
  "/photos/salamaker1.png",
  "/photos/salamaker2.png",
  "/photos/salamaker3.png",
  "/photos/salamaker4.png",
  "/photos/salamaker5.png",
  "/photos/salamaker6.png",
  "/photos/salamaker7.png",
  "/photos/salamaker8.png",
];
const INTERVAL = 4500;
const FADE_DURATION = 1.1; // segundos — overlap longo evita "vazio"

export function SalaMakerCarousel({
  alt = "Espaço maker da escola — alunos criando projetos com tecnologia",
}: {
  alt?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % PHOTOS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <>
      {/* Camada base: imagem atual SEMPRE visível, garantindo zero
          'vazio' aparecendo. As outras ficam sobrepostas com opacity 0
          (não montam Image nelas até ser necessário, mas ficam no DOM
          pra cache do browser). */}
      {PHOTOS.map((src, idx) => (
        <motion.div
          key={src}
          initial={false}
          animate={{ opacity: idx === i ? 1 : 0 }}
          transition={{ duration: FADE_DURATION, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ zIndex: idx === i ? 2 : 1 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={idx === 0}
            quality={92}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 540px, 640px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </motion.div>
      ))}

      {/* Indicadores no canto inferior (sobre o blob) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
        {PHOTOS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setI(idx);
              setPaused(true);
              setTimeout(() => setPaused(false), 10000);
            }}
            aria-label={`Ir para foto ${idx + 1} de ${PHOTOS.length}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </>
  );
}
