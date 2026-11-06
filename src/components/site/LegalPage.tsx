import { Link } from "@tanstack/react-router";
import { useDict, type LangSlug } from "@/i18n";
import { Logo } from "./Header";
import { FloatingWa } from "./SectionsBottom";

export function LegalPage({ slug, kind }: { slug: LangSlug; kind: "privacy" | "terms" }) {
  const { d } = useDict(slug);
  const title = kind === "privacy" ? d.legal.privacyTitle : d.legal.termsTitle;
  const items = kind === "privacy" ? d.legal.privacy : d.legal.terms;
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy px-5 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/$lang" params={{ lang: slug }}><Logo /></Link>
          <Link to="/$lang" params={{ lang: slug }} className="text-sm text-on-dark-soft hover:text-on-dark">← {d.legal.back}</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-4xl font-bold text-ink">{title}</h1>
        <p className="mt-3 font-mono text-xs text-ink-soft">{d.legal.draft}</p>
        <div className="mt-8 space-y-4 text-ink-soft">{items.map((p) => <p key={p}>{p}</p>)}</div>
      </main>
      <FloatingWa slug={slug} />
    </div>
  );
}
