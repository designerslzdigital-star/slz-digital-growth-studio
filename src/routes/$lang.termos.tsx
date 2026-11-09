import { createFileRoute } from "@tanstack/react-router";
import { dicts, isLangSlug, langBySlug, type LangSlug } from "@/i18n";
import { langHead } from "@/i18n/head";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/$lang/termos")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    langHead(params.lang, "/termos", isLangSlug(params.lang) ? dicts[langBySlug(params.lang).code].legal.termsTitle : undefined),
  component: () => <LegalPage slug={Route.useParams().lang as LangSlug} kind="terms" />,
});
