import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { detectSlug } from "@/i18n";
import { langHead } from "@/i18n/head";

// "/" detects the browser language (or saved choice) and redirects; default pt-BR.
export const Route = createFileRoute("/")({
  staticData: { sitemap: false },
  head: () => {
    const h = langHead("pt-br");
    // Root canonical points at the default language page.
    return { meta: h.meta, links: h.links };
  },
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/$lang", params: { lang: detectSlug() }, replace: true });
  }, [navigate]);
  return <div className="hero-bg min-h-screen" />;
}
