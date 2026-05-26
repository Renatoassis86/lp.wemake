import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

/**
 * Header minimalista para LPs de captura.
 * Logo centralizada e grande, sem menu — foco total no objetivo da LP.
 * Link "Voltar ao site" sutil no canto direito (desktop apenas).
 */
export function LpHeader() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 pt-6 sm:pt-8">
      <Container size="2xl">
        <div className="relative flex items-center justify-center">
          {/* Logo centralizada e maior */}
          <Link
            href="/"
            aria-label="We Make — voltar ao início"
            className="inline-flex items-center transition-opacity duration-300 hover:opacity-85"
          >
            <Image
              src="/photos/2.png"
              alt="We Make"
              width={280}
              height={84}
              priority
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain pointer-events-none select-none"
            />
          </Link>

          {/* Link voltar — absolute no canto direito */}
          <Link
            href="/"
            className="hidden sm:inline-flex absolute right-0 items-center text-[0.8125rem] font-medium text-white/70 hover:text-white transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </Container>
    </header>
  );
}
