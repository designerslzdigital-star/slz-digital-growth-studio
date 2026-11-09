import { createFileRoute } from "@tanstack/react-router";
import type { LangSlug } from "@/i18n";
import { langHead } from "@/i18n/head";
import { Header } from "@/components/site/Header";
import { Founder, Hero, Numbers, Pain, Proof, Services, Solutions } from "@/components/site/SectionsTop";
import { After, CookieBanner, Faq, FinalCta, FloatingWa, Footer, Global, Security, Steps } from "@/components/site/SectionsBottom";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => langHead(params.lang),
  component: Home,
});

function Home() {
  const slug = Route.useParams().lang as LangSlug;
  return (
    <>
      <Header slug={slug} />
      <main>
        <Hero slug={slug} />
        <Numbers slug={slug} />
        <Pain slug={slug} />
        <Solutions slug={slug} />
        <Services slug={slug} />
        <Proof slug={slug} />
        <Founder slug={slug} />
        <Steps slug={slug} />
        <After slug={slug} />
        <Security slug={slug} />
        <Global slug={slug} />
        <Faq slug={slug} />
        <FinalCta slug={slug} />
      </main>
      <Footer slug={slug} />
      <FloatingWa slug={slug} />
      <CookieBanner slug={slug} />
    </>
  );
}
