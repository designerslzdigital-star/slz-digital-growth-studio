import gcp from "@/assets/Google-Cloud-Simbolio.jpg.asset.json";
import aws from "@/assets/Amazon_Web_Services_Logo.svg.webp.asset.json";
import azure from "@/assets/lg-66d961335f8b5-Microsoft-Azure.webp.asset.json";
import oracle from "@/assets/Oracle-Logo.png.asset.json";
const PARTNERS: [string, string][] = [["Google Cloud", gcp.url], ["AWS", aws.url], ["Microsoft Azure", azure.url], ["Oracle", oracle.url]];
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Plus } from "lucide-react";
import { useDict, type LangSlug } from "@/i18n";
import { REFS } from "@/config/site";
import { Check, Eyebrow, WaButton, WaIcon } from "./ui";
import { WorldMap } from "./WorldMap";
import { Logo } from "./Header";
import { whatsappUrl } from "@/config/site";

type P = { slug: LangSlug };

export function Steps({ slug }: P) {
  const { d } = useDict(slug);
  const ref = useRef<HTMLOListElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setActive(d.steps.items.length);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mark = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      setProgress(p);
      setActive(nodes.current.filter((n) => n && n.getBoundingClientRect().top + 22 <= mark).length);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [d.steps.items.length]);

  return (
    <section id="requisitos" className="bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.steps.title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{d.steps.sub}</p>

        <ol ref={ref} className="relative mt-14 space-y-12 md:space-y-16">
          <span aria-hidden="true" className="absolute bottom-0 left-[21px] top-0 w-0 border-l-2 border-dashed border-light-border md:left-[27px]" />
          <span
            aria-hidden="true"
            style={{ height: `${progress * 100}%` }}
            className="absolute left-[20px] top-0 w-1 rounded bg-blue-strong md:left-[26px]"
          >
            <span className="absolute -bottom-1.5 -left-1 h-3 w-3 rounded-full bg-blue-strong" />
          </span>
          {d.steps.items.map((s, i) => {
            const on = i < active;
            return (
              <li key={s.t} ref={(n) => { nodes.current[i] = n; }} className="relative flex gap-5 md:gap-8">
                <div
                  className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold transition-colors md:h-14 md:w-14 ${on ? "bg-navy text-on-dark" : "border border-light-border bg-light text-ink-soft"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={`min-w-0 pt-1 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-50"}`}>
                  <Eyebrow className="text-blue-ink">{s.eyebrow}</Eyebrow>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-ink-soft">{s.d}</p>
                  {i === 0 && (
                    <p className="mt-4 inline-block -rotate-1 rounded-md bg-lime-soft px-4 py-3 font-mono text-sm text-ink shadow-md">
                      “{d.steps.postit}”
                    </p>
                  )}
                  <p className="mt-4 flex w-fit items-center gap-2 rounded-full border border-light-border bg-light px-3 py-1.5 text-sm text-ink">
                    <Check className="h-4 w-4" />
                    <span><strong>{d.steps.deliveryLabel}:</strong> {s.e}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="card-dark mt-16 rounded-[20px] p-8 md:p-10">
          <h3 className="text-2xl font-semibold text-on-dark md:text-3xl">{d.steps.diagTitle}</h3>
          <p className="mt-3 max-w-2xl text-on-dark-soft">{d.steps.diagText}</p>
          <WaButton className="mt-6" message={d.wa.message} refCode={REFS.diagnostico}>{d.steps.diagCta}</WaButton>
        </div>
      </div>
    </section>
  );
}

export function After({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="pos-entrega" className="pain-bg px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-3xl font-bold text-ink md:text-5xl">{d.after.title}</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {d.after.items.map((it, i) => (
            <article key={it.t} className="rounded-[44px] border-[3px] border-dotted border-ink-soft/60 p-3">
              <div className="h-full rounded-[36px] bg-card-ink p-7">
                <span className="block text-center font-mono text-sm text-on-dark-mute">0{i + 1}</span>
                <h3 className="mt-3 text-center font-subtitle text-2xl font-normal text-on-dark">{it.t}</h3>
                <p className="mt-4 text-on-dark-mute">{it.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-5 doc-band rounded-[28px] p-7 sm:flex-row sm:items-center md:p-9">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime/10 text-lime">
            <FileText className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading text-xl font-semibold text-on-dark md:text-2xl">{d.after.docTitle}</h3>
            <p className="mt-2 max-w-3xl text-on-dark-soft">{d.after.docText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const DIFF_LINKS = ["requisitos", "solucoes", "prova", "seguranca", "seguranca", "global", "global"];
const DIFF_VALS: ["depends" | "notAlways", "depends" | "notAlways"][] = [
  ["notAlways", "depends"], ["depends", "notAlways"], ["notAlways", "depends"], ["notAlways", "notAlways"],
  ["notAlways", "notAlways"], ["notAlways", "depends"], ["notAlways", "notAlways"],
];

export function Diff({ slug }: P) {
  const { d } = useDict(slug);
  const [slzCol, freeCol, otherCol] = d.diff.cols;
  return (
    <section id="diferenciais" className="bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-3xl font-bold text-ink md:text-5xl">{d.diff.title}</h2>

        {/* Desktop table */}
        <table className="mt-14 hidden w-full border-separate border-spacing-0 md:table">
          <caption className="sr-only">{d.diff.title}</caption>
          <thead>
            <tr>
              <th scope="col" className="pb-4 text-left font-mono text-xs uppercase tracking-widest text-ink-soft">{d.diff.criterion}</th>
              <th scope="col" className="relative w-48 rounded-t-[20px] bg-navy px-4 pb-4 pt-8 font-heading text-lg text-on-dark">{slzCol}</th>
              <th scope="col" className="w-52 px-4 pb-4 text-sm font-medium text-ink-soft">{freeCol}</th>
              <th scope="col" className="w-52 px-4 pb-4 text-sm font-medium text-ink-soft">{otherCol}</th>
            </tr>
          </thead>
          <tbody>
            {d.diff.rows.map((r, i) => (
              <tr key={r}>
                <th scope="row" className="border-t border-light-border py-4 pr-4 text-left font-normal">
                  <a href={`#${DIFF_LINKS[i]}`} className="text-ink underline decoration-light-border underline-offset-4 hover:decoration-blue-ink">{r}</a>
                </th>
                <td className={`border-t border-on-dark/10 bg-navy text-center ${i === d.diff.rows.length - 1 ? "rounded-b-[20px] pb-8" : ""}`}>
                  <span className="inline-flex justify-center"><Check /><span className="sr-only">{d.diff.yes}</span></span>
                </td>
                <td className="border-t border-light-border text-center text-sm text-ink-soft">{d.diff[DIFF_VALS[i]![0]]}</td>
                <td className="border-t border-light-border text-center text-sm text-ink-soft">{d.diff[DIFF_VALS[i]![1]]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <ul className="mt-10 space-y-3 md:hidden">
          {d.diff.rows.map((r, i) => (
            <li key={r} className="rounded-[20px] border border-light-border bg-light p-5">
              <a href={`#${DIFF_LINKS[i]}`} className="font-semibold text-ink underline underline-offset-4">{r}</a>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-navy px-3 py-2 text-on-dark">
                  <dt>{slzCol}</dt><dd className="flex items-center gap-1"><Check className="h-4 w-4" />{d.diff.yes}</dd>
                </div>
                <div className="flex justify-between gap-3 px-3"><dt className="text-ink-soft">{freeCol}</dt><dd className="text-ink">{d.diff[DIFF_VALS[i]![0]]}</dd></div>
                <div className="flex justify-between gap-3 px-3"><dt className="text-ink-soft">{otherCol}</dt><dd className="text-ink">{d.diff[DIFF_VALS[i]![1]]}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Security({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="seguranca" className="bg-navy-deep px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-3xl font-bold text-on-dark md:text-5xl">{d.security.title}</h2>
        <p className="mt-6 max-w-3xl text-lg text-on-dark-soft">{d.security.intro}</p>

        <div className="card-dark-lime mt-12 grid items-center gap-6 rounded-[20px] p-8 md:grid-cols-[auto_1fr] md:p-12">
          <p className="font-display text-7xl leading-none text-lime md:text-9xl">{d.security.year}</p>
          <p className="font-heading text-2xl font-semibold text-on-dark md:text-3xl">{d.security.yearText}</p>
        </div>

        <ol className="mt-12 grid gap-3 md:grid-cols-5">
          {d.security.stages.map((s, i) => (
            <li key={s.t} className="card-dark rounded-[20px] p-5">
              <span className="font-mono text-xs text-blue">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-on-dark">{s.t}</h3>
              <p className="mt-2 text-sm text-on-dark-soft">{s.q}</p>
              <p className="mt-3 text-xs italic text-on-dark-mute">{d.security.practice}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-center gap-3 text-on-dark"><Check />{d.security.lgpd}</p>
      </div>
    </section>
  );
}

const TECH = [
  ["JavaScript", "JS"], ["TypeScript", "TS"], ["React", "Re"], ["Next.js", "Nx"], ["Node.js", "No"], ["Python", "Py"],
  ["PHP", "PH"], ["Flutter", "Fl"], ["React Native", "RN"], ["PostgreSQL", "PG"], ["Docker", "Dk"], ["AWS", "AW"],
];

export function Tech({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="tecnologias" className="bg-light px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink md:text-4xl">{d.tech.title}</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TECH.map(([n, m]) => (
            <li key={n} className="flex min-h-14 items-center gap-3 rounded-xl border border-light-border bg-background px-3">
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-navy font-mono text-xs text-on-dark">{m}</span>
              <span className="truncate text-sm font-medium text-ink">{n}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-soft">{d.tech.note}</p>
      </div>
    </section>
  );
}

export function Global({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="global" className="bg-navy px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-3xl font-bold text-on-dark md:text-5xl">{d.global.title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-on-dark-soft">{d.global.sub}</p>
        <div className="mt-10"><WorldMap label={d.global.mapLabel} /></div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-on-dark-soft">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-blue" />{d.global.legendBr}</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-on-dark-mute/40" />{d.global.legendWorld}</span>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="card-dark rounded-[20px] p-6">
            <h3 className="text-xl font-semibold text-on-dark">{d.global.teamTitle}</h3>
            <ul className="mt-4 space-y-2 text-on-dark-soft">{d.global.team.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="card-dark rounded-[20px] p-6">
            <h3 className="text-xl font-semibold text-on-dark">{d.global.partnersTitle}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {PARTNERS.map(([name, src]) => (
                <li key={name} className="flex h-20 items-center justify-center rounded-2xl bg-white p-3">
                  <img src={src} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="faq" className="bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.faq.title}</h2>
        <div className="mt-10 divide-y divide-light-border border-y border-light-border">
          {d.faq.items.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <div className="pb-4 text-ink-soft">
                {f.draft && <span className="mb-2 inline-block rounded bg-lime-soft px-2 py-0.5 font-mono text-xs text-ink">{d.faq.draft}</span>}
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <WaButton message={d.wa.message} refCode={REFS.ctaFinal} variant="blue">{d.wa.cta}</WaButton>
        </div>
      </div>
    </section>
  );
}

export function Myth({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="mito" className="bg-light px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.myth.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {d.myth.items.map((m) => (
            <article key={m.m} className="rounded-[20px] border border-light-border bg-background p-6">
              <span className="rounded bg-lime px-2 py-0.5 font-mono text-xs font-semibold uppercase text-ink">{d.myth.mythLabel}</span>
              <p className="mt-3 text-lg text-ink-soft line-through">{m.m}</p>
              <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-widest text-blue-ink">{d.myth.factLabel}</p>
              <p className="mt-2 text-ink">{m.f}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          <a href="https://icml.cc/virtual/2026/poster/61427" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{d.myth.source}</a>
        </p>
      </div>
    </section>
  );
}

export function FinalCta({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section className="bg-blue-strong px-5 py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-on-dark md:text-5xl">{d.final.title}</h2>
          <p className="mt-2 text-on-dark">{d.final.sub}</p>
        </div>
        <WaButton message={d.wa.message} refCode={REFS.ctaFinal}>{d.wa.cta}</WaButton>
      </div>
    </section>
  );
}

export function Footer({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <footer className="bg-navy-deep px-5 pb-28 pt-12 text-sm text-on-dark-mute">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2">{d.footer.location}</p>
          <p className="mt-1">{d.footer.company}</p>
        </div>
        <nav className="flex gap-6">
          <Link to="/$lang/privacidade" params={{ lang: slug }} className="hover:text-on-dark">{d.footer.privacy}</Link>
          <Link to="/$lang/termos" params={{ lang: slug }} className="hover:text-on-dark">{d.footer.terms}</Link>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl">© {new Date().getFullYear()} SLZ Digital. {d.footer.rights}</p>
    </footer>
  );
}

export function FloatingWa({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <a
      href={whatsappUrl(d.wa.message, REFS.flutuante)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.wa.floating}
      className="wa-pulse fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ink shadow-frame transition-transform hover:scale-105"
    >
      <WaIcon className="h-7 w-7" />
    </a>
  );
}

export function CookieBanner({ slug }: P) {
  const { d } = useDict(slug);
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem("slz-consent"));
    } catch {
      setShow(true);
    }
  }, []);
  const choose = (v: "accepted" | "rejected") => {
    try {
      localStorage.setItem("slz-consent", v);
    } catch {
      /* ignore */
    }
    // Measurement scripts (pixels/analytics) would be loaded here only when v === "accepted". None configured yet.
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="region" aria-label="Cookies" className="fixed bottom-5 left-5 right-24 z-40 max-w-md rounded-2xl border border-on-dark/15 bg-navy p-4 text-sm text-on-dark-soft shadow-frame">
      <p>{d.cookies.text}</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose("rejected")} className="min-h-11 flex-1 rounded-full border border-on-dark/30 px-4 text-on-dark hover:bg-on-dark/10">{d.cookies.reject}</button>
        <button type="button" onClick={() => choose("accepted")} className="min-h-11 flex-1 rounded-full border border-on-dark/30 px-4 text-on-dark hover:bg-on-dark/10">{d.cookies.accept}</button>
      </div>
    </div>
  );
}
