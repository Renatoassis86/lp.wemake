"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Carrossel auto-rotativo das fotos do espaço maker.
 * Crossfade entre 8 imagens a cada 4.5s, com indicadores discretos.
 * Pausa o auto-rotate quando o usuário interage (clica num indicador).
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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={PHOTOS[i]!}
            alt={alt}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores no canto inferior (sobre o blob) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md">
        {PHOTOS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setI(idx);
              setPaused(true);
              // Retoma auto-play após 10s sem interação
              setTimeout(() => setPaused(false), 10000);
            }}
            aria-label={`Ir para foto ${idx + 1} de ${PHOTOS.length}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i
                ? "w-5 bg-white"
                : "w-1.5 bg-white/45 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </>
  );
}
