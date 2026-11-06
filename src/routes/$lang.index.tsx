import { createFileRoute } from "@tanstack/react-router";
import type { LangSlug } from "@/i18n";
import { langHead } from "@/i18n/head";
import { Header } from "@/components/site/Header";
import { Hero, Hook, Pain, Proof, Solutions } from "@/components/site/SectionsTop";
import { After, CookieBanner, Diff, Faq, FinalCta, FloatingWa, Footer, Global, Myth, Security, Steps, Tech } from "@/components/site/SectionsBottom";

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
        <Hook slug={slug} />
        <Pain slug={slug} />
        <Solutions slug={slug} />
        <Proof slug={slug} />
        <Steps slug={slug} />
        <After slug={slug} />
        <Diff slug={slug} />
        <Security slug={slug} />
        <Tech slug={slug} />
        <Global slug={slug} />
        <Faq slug={slug} />
        <Myth slug={slug} />
        <FinalCta slug={slug} />
      </main>
      <Footer slug={slug} />
      <FloatingWa slug={slug} />
      <CookieBanner slug={slug} />
    </>
  );
}
