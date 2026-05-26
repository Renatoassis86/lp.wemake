import { LandingPage } from "@/sections/landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: undefined,
  description:
    "We Make — Tecnologia educacional desenvolvida a partir da cosmovisão reformada. Currículo maker, plataforma, formação docente e assessoria para escolas confessionais cristãs.",
});

export default function Page() {
  return <LandingPage />;
}
