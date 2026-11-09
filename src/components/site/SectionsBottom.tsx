import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Mail, MapPin, Phone, Plus, ShieldCheck } from "lucide-react";
import { useDict, type LangSlug } from "@/i18n";
import { CONTACT, REFS, SOURCE_URLS } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Check, Eyebrow, ReviewNote, WaButton, WaIcon } from "./ui";
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
    <section id="requisitos" className="bg-background px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.steps.title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{d.steps.sub}</p>

        <ol ref={ref} className="relative mt-8 space-y-8 md:space-y-10">
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
                    <p className="mt-4 inline-block -rotate-1 rounded-md bg-light px-4 py-3 font-mono text-sm text-ink shadow-md">
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

        <div className="card-dark mt-10 rounded-[20px] p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-on-dark md:text-3xl">{d.steps.diagTitle}</h3>
          <p className="mt-3 max-w-2xl text-on-dark-soft">{d.steps.diagText}</p>
          <WaButton className="mt-6" message={d.steps.message} refCode={REFS.diagnostico}>{d.steps.diagCta}</WaButton>
          <ReviewNote>{d.review.diagnostic}</ReviewNote>
        </div>
      </div>
    </section>
  );
}

export function After({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="pos-entrega" className="pain-bg px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl text-3xl font-bold text-ink md:text-5xl">{d.after.title}</h2>
        <p className="mt-4 text-ink-soft">{d.after.sub}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {d.after.items.map((it, i) => (
            <article key={it.t} className="rounded-[44px] border-[3px] border-dotted border-ink-soft/60 p-3">
              <div className="h-full rounded-[36px] bg-card-ink p-6">
                <span className="block text-center font-mono text-sm text-on-dark-mute">0{i + 1}</span>
                <h3 className="mt-3 text-center font-subtitle text-2xl font-normal text-lime">{it.t}</h3>
                <p className="mt-4 text-on-dark-mute">{it.d}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="doc-band mt-8 flex flex-col gap-4 rounded-[28px] p-6 sm:flex-row sm:items-center md:p-7">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime/10 text-lime">
            <FileText className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-heading text-xl font-semibold text-on-dark md:text-2xl">{d.after.docTitle}</h3>
            <p className="mt-2 max-w-3xl text-on-dark-soft">{d.after.docText}</p>
            <ReviewNote>{d.review.documentation}</ReviewNote>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Security({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="seguranca" className="bg-navy text-on-dark">
      <div className="mx-auto max-w-6xl px-5 py-10 xl:px-0">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <h2 className="max-w-3xl font-display text-3xl font-normal leading-[1.05] md:text-5xl">{d.security.title}</h2>
            <p className="mt-4 max-w-2xl text-on-dark-soft">{d.security.intro}</p>
          </div>
          <div className="flex items-center gap-4 border-l-[3px] border-lime pl-4 lg:flex-col lg:items-start lg:gap-2">
            <ShieldCheck className="h-7 w-7 shrink-0 text-lime" aria-hidden="true" />
            <div><p className="max-w-60 text-sm text-on-dark-soft">{d.security.yearText}</p><p className="font-result text-4xl font-bold text-lime">{d.security.year}</p></div>
          </div>
        </div>
        <ReviewNote>{d.review.securityYear}</ReviewNote>
        <Eyebrow className="mt-6 text-on-dark-soft">{d.security.stageLabel}</Eyebrow>
        <ol className="security-stages mt-4">
          {d.security.stages.map((it, i) => (
            <li key={it.t} className="flex min-w-0 gap-3 border-t border-doc-border pt-3">
              <span className="pt-1 font-mono text-xs text-lime">{String(i + 1).padStart(2, "0")}</span>
              <div><h3 className="text-lg font-semibold">{it.t}</h3><p className="mt-1 text-sm text-on-dark-soft">{it.q}</p></div>
            </li>
          ))}
        </ol>
        <ReviewNote>{d.security.practice}</ReviewNote>
        <p className="mt-6 border-l-2 border-lime pl-4 font-heading text-lg text-on-dark-soft">{d.security.lgpd}</p>
      </div>

      <div id="teste-seguranca" className="border-y border-light-border bg-light text-ink">
        <div className="mx-auto max-w-6xl px-5 py-8 xl:px-0">
          <Eyebrow className="text-blue-ink">{d.securityTest.label}</Eyebrow>
          <h3 className="mt-3 max-w-3xl font-display text-3xl font-normal leading-[1.05] text-ink md:text-5xl">{d.securityTest.title}</h3>
          <p className="mt-3 max-w-3xl text-ink-soft">{d.securityTest.sub}</p>
          <h4 className="mt-6 font-heading text-lg font-semibold">{d.securityTest.how}</h4>
          <ol className="test-grid mt-3">
            {d.securityTest.steps.map((it, i) => (
              <li key={it.t} className="flex min-w-0 gap-3 border-t border-light-border pt-4">
                <span className="font-result text-2xl font-bold text-blue-ink">{String(i + 1).padStart(2, "0")}</span>
                <div><h4 className="font-heading text-lg font-semibold">{it.t}</h4><p className="mt-2 text-sm text-ink-soft">{it.d}</p></div>
              </li>
            ))}
          </ol>
          <ReviewNote>{d.review.testStages}</ReviewNote>
          <div className="mt-6 border-l-2 border-blue-strong pl-4">
            <h4 className="font-heading text-lg font-semibold">{d.securityTest.limitsTitle}</h4>
            <p className="mt-2 max-w-4xl text-sm text-ink-soft">{d.securityTest.limits}</p>
          </div>
          <ReviewNote>{d.review.testMethod}</ReviewNote><ReviewNote>{d.review.testPlatforms}</ReviewNote>
          <div className="mt-6 flex flex-col gap-5 border-l-4 border-lime bg-navy px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-lime" aria-hidden="true" />
              <div><h4 className="font-mono text-xs uppercase text-lime">{d.securityTest.golden}</h4><p className="mt-2 max-w-xl font-heading text-lg text-on-dark">{d.securityTest.authorization}</p></div>
            </div>
            <WaButton className="shrink-0 self-start lg:self-auto" message={d.securityTest.message} refCode={REFS.testeSeguranca}>{d.securityTest.cta}</WaButton>
          </div>
          <p className="mt-5 max-w-3xl text-sm text-ink-soft">{d.securityTest.stat}</p>
          <div className="mt-3 space-y-2 text-xs text-ink-soft">
            <p><a href={SOURCE_URLS.report} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{d.sources.report}</a></p>
            <ReviewNote>{d.review.report}</ReviewNote>
            <p><a href={SOURCE_URLS.law} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{d.sources.law}</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Global({ slug }: P) {
  const { d } = useDict(slug);
  return <section id="global" className="bg-background px-5 py-10"><div className="mx-auto max-w-6xl">
    <h2 className="max-w-3xl text-3xl font-bold text-ink md:text-5xl">{d.global.title}</h2><p className="mt-4 max-w-3xl text-lg text-ink-soft">{d.global.sub}</p>
    <div className="mt-8"><WorldMap label={d.global.mapLabel} names={[d.global.legendBr,d.global.legendIe,d.global.legendUy]} /></div>
    <div className="map-legend mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm text-ink-soft">{[d.global.legendBr,d.global.legendIe,d.global.legendUy,d.global.legendWorld].map((label,i) => <span key={label} className="flex items-center gap-2"><span className={`legend-dots country-${i}`} aria-hidden="true"><i /><i /></span>{label}</span>)}</div>
  </div></section>;
}

export function Faq({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="faq" className="bg-light px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.faq.title}</h2>
        <div className="mt-6 divide-y divide-light-border border-y border-light-border">
          {d.faq.items.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <div className="pb-4 text-ink-soft">
                {f.draft && <span className="mb-2 inline-block rounded bg-light px-2 py-0.5 font-mono text-xs text-ink">{d.faq.draft}</span>}
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-ink-soft">{d.sources.label}: <a href={SOURCE_URLS.study} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{d.sources.study}</a> · <a href={SOURCE_URLS.report} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{d.sources.publisher}</a></p>
      </div>
    </section>
  );
}

export function FinalCta({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="cta-final" className="bg-blue-strong px-5 py-10">
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
  return <footer id="rodape" className="bg-navy-deep px-5 pb-28 pt-12 text-sm text-on-dark-mute"><div className="mx-auto max-w-6xl">
    <div className="border-y border-doc-border py-7"><Eyebrow className="text-on-dark">{d.footer.dataLabel}</Eyebrow><p className="mt-4 max-w-4xl">{d.footer.dataText}</p><ReviewNote>{d.review.privacy}</ReviewNote></div>
    <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row"><div><Logo /><p className="mt-3">{d.footer.location} · {d.footer.company}</p></div><div><Eyebrow className="text-on-dark">{d.footer.contactTitle}</Eyebrow><ul className="mt-3 space-y-2">
      <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-lime" aria-hidden="true" /><span className="sr-only">{d.footer.emailLabel}: </span><a href={CONTACT.email.startsWith("[") ? undefined : `mailto:${CONTACT.email}`} className="inline-flex min-h-11 items-center hover:text-on-dark">{CONTACT.email}</a></li>
      {CONTACT.phones.map((ph) => <li key={ph} className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-lime" aria-hidden="true" /><span className="sr-only">{d.footer.phoneLabel}: </span><a href={ph.startsWith("[") ? undefined : `tel:${ph.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-11 items-center hover:text-on-dark">{ph}</a></li>)}
      <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-lime" aria-hidden="true" /><span>São Luís (MA) · São Paulo (SP)</span></li>
    </ul></div><nav className="flex flex-wrap items-start gap-x-6 gap-y-3">
      <Link to="/$lang/privacidade" params={{lang:slug}} className="inline-flex min-h-11 items-center hover:text-on-dark">{d.footer.privacy}</Link><Link to="/$lang/termos" params={{lang:slug}} className="inline-flex min-h-11 items-center hover:text-on-dark">{d.footer.terms}</Link><Button variant="ghost" onClick={() => window.dispatchEvent(new Event('slz-cookie-preferences'))} className="min-h-11 whitespace-normal p-0 text-on-dark-mute hover:text-on-dark">{d.footer.preferences}</Button>
    </nav></div><p className="mt-8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;© {new Date().getFullYear()} {d.footer.brand}. {d.footer.rights}</p>
  </div></footer>;
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
    const reopen = () => setShow(true);
    window.addEventListener("slz-cookie-preferences", reopen);
    return () => window.removeEventListener("slz-cookie-preferences", reopen);
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
    <div role="region" aria-label={d.cookies.label} className="fixed bottom-5 left-5 right-24 z-40 max-w-md rounded-2xl border border-on-dark/15 bg-navy p-4 text-sm text-on-dark-soft shadow-frame">
      <p>{d.cookies.text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="ghost" type="button" onClick={() => choose("rejected")} className="min-h-11 h-auto flex-1 whitespace-normal rounded-full border border-on-dark/30 px-4 text-on-dark hover:bg-on-dark/10">{d.cookies.reject}</Button>
        <Button variant="ghost" type="button" onClick={() => choose("accepted")} className="min-h-11 h-auto flex-1 whitespace-normal rounded-full border border-on-dark/30 px-4 text-on-dark hover:bg-on-dark/10">{d.cookies.accept}</Button>
      </div>
    </div>
  );
}
