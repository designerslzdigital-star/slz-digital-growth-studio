import { useState } from "react";
import { Play, ShieldCheck, UserRound } from "lucide-react";
import { useDict, type LangSlug } from "@/i18n";
import { FOUNDER_PHOTO_URL, REFS, SHOW_TEAM, SHOW_TESTIMONIAL, SYSTEMS_VIDEO_ID } from "@/config/site";
import { Eyebrow, ReviewNote, WaButton } from "./ui";
import { Button } from "@/components/ui/button";

type P = { slug: LangSlug };

export function Hero({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="hero" className="hero-bg hero-section relative flex min-h-[100svh] items-center px-5 pb-20 pt-32 text-center">
      <div className="mx-auto max-w-5xl">
        <h1 className="hero-title font-display font-normal leading-[1.3] text-balance text-hero-ink">
          {d.hero.before} <span className="select-mark">{d.hero.mark}{d.hero.after}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl font-subtitle text-lg text-on-dark-soft">{d.hero.sub}</p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <WaButton message={d.wa.message} refCode={REFS.hero}>{d.wa.cta}</WaButton>
          <p className="text-sm text-on-dark-mute">{d.hero.note}</p>
        </div>
      </div>
    </section>
  );
}

export function Numbers({ slug }: P) {
  const { d } = useDict(slug);
  return <section id="numeros" className="numbers-band hidden lg:block"><div className="mx-auto max-w-6xl">
    <div className="numbers-grid">{d.numbers.items.map((it, i) => <div key={it.value} className="min-w-0">
      <div className={i === 2 ? "proof-seal" : "proof-number"}>{i === 2 && <ShieldCheck aria-hidden="true" className="h-9 w-8 shrink-0" />}{it.value}</div>
      <p className="mt-2 text-[14.5px]">{it.label}</p>
    </div>)}</div><ReviewNote>{d.review.numbers}</ReviewNote>
  </div></section>;
}

export function Pain({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section id="dor" className="pain-bg px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="pain-title max-w-3xl font-display text-4xl font-normal leading-[1.05] tracking-[0.02em] md:text-7xl">{d.pain.title}</h2>
        <p className="mt-4 max-w-3xl text-ink-soft">{d.pain.sub}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {d.pain.cards.map((c) => (
            <article key={c.t} className="rounded-[44px] border-[3px] border-dotted border-ink-soft/60 p-3">
              <div className="h-full rounded-[36px] bg-card-ink p-6">
                <h3 className="text-center font-subtitle text-2xl font-normal text-on-dark">{c.t}</h3>
                <p className="mt-4 whitespace-pre-line text-on-dark-mute">{c.d}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl font-heading text-3xl font-semibold leading-tight text-ink md:text-4xl">{d.pain.close}</p>
      </div>
    </section>
  );
}

export function Solutions({ slug }: P) {
  const { d } = useDict(slug);
  return <section id="solucoes" className="bg-light px-5 py-10"><div className="mx-auto max-w-6xl">
    <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.solutions.title}<span className="sr-only"> — {d.solutions.seo}</span></h2>
    <p className="mt-4 max-w-3xl text-ink-soft">{d.solutions.sub}</p>
    <ReviewNote>{d.review.fast}</ReviewNote>
    <p className="mt-6 font-mono text-sm text-ink-soft">{d.solutions.who}</p><ReviewNote>{d.review.publicSector}</ReviewNote>
    <div className="solution-grid mt-8">{d.solutions.items.map((it,i) => <article key={it.tag} className={`solution-card card-dark ${i < 3 ? 'solution-third' : i < 5 ? 'solution-half' : 'solution-wide'}`}>
      <div className="flex flex-wrap items-center gap-3"><span className="solution-number">{String(i+1).padStart(2,'0')}</span><span className="solution-tag">{it.tag}</span></div>
      <h3 className="solution-title mt-6 text-on-dark">{it.t}</h3><p className="mt-4 whitespace-pre-line text-on-dark-soft">{it.d}</p>
      {i === 3 && <ReviewNote>{d.review.erp}</ReviewNote>}{i === 5 && <ReviewNote>{d.review.rescue}</ReviewNote>}
    </article>)}</div>
    <div className="mt-8 flex justify-center"><WaButton message={d.wa.message} refCode={REFS.solucoes}>{d.wa.cta}</WaButton></div>
  </div></section>;
}

export function Services({ slug }: P) {
  const { d } = useDict(slug);
  return <section id="servicos" className="bg-navy px-5 py-10 text-on-dark"><div className="mx-auto max-w-6xl">
    <h2 className="text-4xl font-semibold text-lime md:text-[56px]">{d.services.title}</h2><p className="mt-4 text-on-dark-soft">{d.services.sub}</p>
    <div className="service-grid mt-6 border-t border-on-dark/15 pt-6">{d.services.groups.map(g => <div key={g.label} className="min-w-0 border-t-2 border-lime pt-4"><h3 className="font-mono text-[13px] font-normal uppercase text-on-dark">{g.label}</h3><ul className="mt-3 space-y-2">{g.items.map(item => <li key={item} className="flex gap-2.5 text-[15.5px] text-catalog"><span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-lime" />{item}</li>)}</ul></div>)}</div>
    <WaButton className="mt-6" message={d.services.message} refCode={REFS.servicos}>{d.services.cta}</WaButton><ReviewNote>{d.review.services}</ReviewNote>
  </div></section>;
}

export function Proof({ slug }: P) {
  const { d } = useDict(slug);
  const [playing,setPlaying]=useState(false);
  return <>
    <section id="prova" className="grid-mesh bg-navy px-5 py-10 text-on-dark"><div className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold md:text-5xl">{d.proof.title}</h2><p className="mt-4 max-w-3xl text-lg text-on-dark-soft">{d.proof.sub}</p>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]"><div><h3 className="text-3xl font-semibold text-lime md:text-[40px]">{d.proof.caseTitle}</h3>
      <ul className="mt-6 space-y-5">{d.proof.systems.map((s,i) => <li key={s.name} className="border-l-[3px] border-lime pl-5"><h4 className="font-heading text-xl font-semibold">{s.name}</h4>{i === 1 ? <ReviewNote>{s.text}</ReviewNote> : <p className="mt-2 text-on-dark-soft">{s.text}</p>}</li>)}</ul><ReviewNote>{d.review.video}</ReviewNote></div>
      <div className="video-frame">{playing && SYSTEMS_VIDEO_ID ? <iframe title={d.proof.videoTitle} src={`https://www.youtube-nocookie.com/embed/${SYSTEMS_VIDEO_ID}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <div className="flex h-full flex-col items-center justify-center gap-4"><Button variant="ghost" size="icon" aria-label={d.proof.play} disabled={!SYSTEMS_VIDEO_ID} onClick={() => setPlaying(true)} className="h-16 w-16 rounded-full bg-lime text-ink disabled:opacity-100"><Play className="h-7 w-7" /></Button><p className="text-sm text-on-dark-soft">{d.proof.videoTitle}</p></div>}</div></div>
    </div></section>
    {(SHOW_TESTIMONIAL || SHOW_TEAM) && <div className="bg-background px-5 py-10"><div className="mx-auto max-w-6xl"><ReviewNote>{d.review.proofHidden}</ReviewNote><div className="grid gap-6 md:grid-cols-2">{SHOW_TESTIMONIAL && <p>{d.proof.testimonial}</p>}{SHOW_TEAM && <p>{d.proof.team}</p>}</div></div></div>}
  </>;
}

export function Founder({ slug }: P) {
  const { d } = useDict(slug);
  return <section id="fundador" className="bg-navy-deep px-5 py-10 text-on-dark"><div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
    <div className="founder-photo">{FOUNDER_PHOTO_URL ? <img src={FOUNDER_PHOTO_URL} alt={d.founder.photoAlt} loading="lazy" /> : <div className="flex h-full flex-col items-center justify-center p-8 text-center"><UserRound className="h-16 w-16 text-on-dark-mute" aria-hidden="true" /><ReviewNote>{d.review.photo}</ReviewNote></div>}</div>
    <div><Eyebrow className="text-on-dark-mute">{d.founder.label}</Eyebrow><h2 className="mt-4 text-3xl font-semibold md:text-[42px]">{d.founder.title} <span className="text-lime">{d.founder.mark}</span></h2>
    <div className="mt-7 flex flex-wrap gap-4">{d.founder.years.map((year,i) => <div key={year} className="px-5 py-4"><strong className="font-result text-3xl text-lime">{year}</strong><p className="mt-1 text-sm text-on-dark-soft">{i === 0 ? d.founder.market : d.founder.abroad}</p></div>)}</div>
    <p className="mt-7 whitespace-pre-line text-on-dark-soft">{d.founder.text}</p><ReviewNote>{d.review.founder}</ReviewNote></div>
  </div></section>;
}
