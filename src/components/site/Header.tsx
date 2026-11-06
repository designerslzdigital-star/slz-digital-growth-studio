import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { LANGS, langBySlug, saveSlug, useDict, type LangSlug } from "@/i18n";
import { REFS } from "@/config/site";
import { WaButton } from "./ui";
import logoAsset from "@/assets/SLZ-DIGITAL_SemFundoo_1.png.asset.json";

export const ANCHORS = ["solucoes", "requisitos", "pos-entrega", "diferenciais", "seguranca", "tecnologias", "global", "faq"];

export function Logo() {
  return (
    <img src={logoAsset.url} alt="SLZ Digital" className="h-10 w-auto md:h-12" />
  );
}

function LangSelect({ slug }: { slug: LangSlug }) {
  const { d } = useDict(slug);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cur = langBySlug(slug);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        aria-label={d.lang.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 items-center gap-1.5 rounded-xl border border-on-dark/15 bg-on-dark/5 px-3 text-sm text-on-dark hover:bg-on-dark/10"
      >
        <span aria-hidden="true">{cur.flag}</span>
        <span className="sr-only">{cur.name}</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {open && (
        <ul role="listbox" aria-label={d.lang.label} className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-on-dark/15 bg-navy p-1 shadow-frame">
          {LANGS.map((l) => (
            <li key={l.slug} role="option" aria-selected={l.slug === slug}>
              <button
                type="button"
                lang={l.code}
                onClick={() => {
                  saveSlug(l.slug);
                  setOpen(false);
                  navigate({ to: "/$lang", params: { lang: l.slug }, hash: true });
                }}
                className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm text-on-dark hover:bg-on-dark/10 aria-selected:bg-blue-strong"
              >
                <span aria-hidden="true">{l.flag}</span>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header({ slug }: { slug: LangSlug }) {
  const { d } = useDict(slug);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-4 z-40 w-[calc(100%-24px)] max-w-6xl -translate-x-1/2">
      <div className="pill-nav flex h-16 items-center justify-between gap-3 rounded-2xl pl-6 pr-3">
        <Link to="/$lang" params={{ lang: slug }} aria-label="SLZ Digital" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label={d.nav.main} className="hidden min-[1100px]:block">
          <ul className="flex items-center gap-1">
            {d.nav.items.map((label, i) => (
              <li key={ANCHORS[i]}>
                <a href={`#${ANCHORS[i]}`} className="rounded-full px-2.5 py-2 font-subtitle text-sm font-medium text-on-dark hover:text-lime">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangSelect slug={slug} />
          <WaButton message={d.wa.message} refCode={REFS.header} variant="limeOutline" className="hidden">
            WhatsApp
          </WaButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-on-dark hover:bg-on-dark/10 min-[1100px]:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            {d.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 min-[1100px]:hidden" role="dialog" aria-modal="true" aria-label={d.nav.main}>
          <button type="button" aria-label={d.nav.close} className="absolute inset-0 bg-navy-deep/70" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-6 bg-navy p-6">
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label={d.nav.close} className="grid h-11 w-11 place-items-center rounded-full text-on-dark hover:bg-on-dark/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            <LangSelect slug={slug} />
            <ul className="flex flex-col">
              {d.nav.items.map((label, i) => (
                <li key={ANCHORS[i]}>
                  <a href={`#${ANCHORS[i]}`} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-on-dark/10 text-lg text-on-dark">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <WaButton message={d.wa.message} refCode={REFS.header}>{d.wa.cta}</WaButton>
          </div>
        </div>
      )}
    </header>
  );
}
