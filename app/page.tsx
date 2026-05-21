import { LandingPage } from "@/sections/landing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: undefined,
  description:
    "We Make — Tecnologia educacional com cosmovisão cristã. Currículo, plataforma, formação e consultoria para escolas confessionais brasileiras.",
});

export default function Page() {
  return <LandingPage />;
}
