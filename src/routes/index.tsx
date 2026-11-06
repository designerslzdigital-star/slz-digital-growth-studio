import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { detectSlug } from "@/i18n";
import { langHead } from "@/i18n/head";

// "/" detects the browser language (or saved choice) and redirects; default pt-BR.
export const Route = createFileRoute("/")({
  head: () => {
    const h = langHead("pt-br");
    return { meta: h.meta, links: h.links.filter((l) => l.rel !== "canonical") };
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
