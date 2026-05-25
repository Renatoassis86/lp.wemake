"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function CeoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Section id="ceo" className="pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[rgb(var(--color-brand-navy))] relative overflow-hidden">
      {/* Watermark W — canto inferior direito, escondido em mobile pra evitar scroll horizontal */}
      <div
        aria-hidden
        className="hidden md:block absolute -bottom-16 -right-20 w-[320px] md:w-[380px] lg:w-[420px] aspect-square opacity-[0.09] pointer-events-none select-none rotate-[12deg] z-0"
      >
        <Image src="/photos/3.png" alt="" fill className="object-contain" sizes="380px" />
      </div>

      <Container>
        <Reveal>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[rgb(var(--color-brand-mint))]/80 mb-4">
              Ciência e Fé
            </p>
            <h2 className="font-display text-white text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] mb-6">
              Ciência e fé estão<br className="hidden sm:block" /> fundamentalmente em conflito?
            </h2>
            <p className="text-white/70 text-[1.125rem] leading-relaxed">
              Manter raízes confessionais profundas e abraçar a tecnologia de ponta realmente gera tensão? Dênis Júlio discute como a cultura maker e a sabedoria cristã cooperam para formar alunos prudentes, justos e responsáveis no mundo digital.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div 
            className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video group cursor-pointer border border-white/10" 
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/videos/video1.mp4"
              poster="/videos/thumbnail-manifesto.png"
              className="w-full h-full object-cover"
              controls={false}
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Play/Pause Overlay */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <button 
                className="w-20 h-20 bg-[rgb(var(--color-brand-mint))] rounded-full flex items-center justify-center text-[rgb(var(--color-brand-navy))] shadow-lg hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
              >
                {isPlaying ? <Pause className="size-8" /> : <Play className="size-8 ml-1" />}
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
