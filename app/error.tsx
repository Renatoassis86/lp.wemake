"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to your error tracker (Sentry, Highlight, etc.) here.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[80vh] items-center">
      <Container size="md" className="text-center">
        <h1 className="font-display text-4xl">Algo saiu da rota.</h1>
        <p className="mt-4 text-foreground/65">
          Nosso time já está sendo notificado. Tente novamente — ou volte ao início.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Tentar novamente</Button>
          <Button variant="secondary" asChild>
            <a href="/">Voltar ao início</a>
          </Button>
        </div>
      </Container>
    </main>
  );
}
