import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Glow } from "@/components/ui/glow";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <Glow color="violet" size="xl" intensity={0.22} className="-left-40 top-0" />
      <Container size="lg" className="text-center">
        <Eyebrow className="justify-center">Erro 404</Eyebrow>
        <h1 className="mt-6 font-display font-light text-gradient-cinematic text-[clamp(2.5rem,2rem+3vw,5rem)] leading-[1.05] tracking-[-0.03em]">
          Esta página não existe — <em className="italic">ainda.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-foreground/65">
          O caminho que você buscou não está disponível. Volte ao manifesto ou
          fale com nosso time institucional.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild trailingIcon>
            <Link href="/">Voltar ao início</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/#contato">Falar com a equipe</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
