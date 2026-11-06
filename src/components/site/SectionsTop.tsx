import { useDict, type LangSlug } from "@/i18n";
import { REFS, SHOW_RESULTS, SHOW_TEAM, SHOW_TESTIMONIAL } from "@/config/site";
import { Check, Eyebrow, WaButton } from "./ui";

type P = { slug: LangSlug };

export function Hero({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section className="hero-bg relative flex min-h-[100svh] items-center px-5 pb-20 pt-32 text-center">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-[clamp(2.4rem,7vw,5.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-hero-ink">
          {d.hero.before} <span className="select-mark">{d.hero.mark}</span> {d.hero.after}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg text-on-dark-soft">{d.hero.sub}</p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <WaButton message={d.wa.message} refCode={REFS.hero}>{d.wa.cta}</WaButton>
          <p className="text-sm text-on-dark-mute">{d.hero.note}</p>
        </div>
      </div>
    </section>
  );
}

export function Hook({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <div className="bg-lime-soft px-5 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-ink">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest">{d.hook.label}</span>
        <s className="text-ink-soft">{d.hook.myth}</s>
        <a href="#mito" className="font-semibold text-blue-ink underline underline-offset-4">{d.hook.link} →</a>
      </div>
    </div>
  );
}

export function Pain({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <section className="bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-ink md:text-5xl">{d.pain.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {d.pain.cards.map((c) => (
            <article key={c.t} className="rounded-[20px] border border-light-border bg-light p-6">
              <h3 className="text-xl font-semibold text-ink">{c.t}</h3>
              <p className="mt-3 text-ink-soft">{c.d}</p>
            </article>
          ))}
        </div>
        <p className="mt-14 max-w-3xl font-heading text-3xl font-semibold leading-tight text-ink md:text-4xl">{d.pain.close}</p>
      </div>
    </section>
  );
}

function IlloTable() {
  return (
    <div aria-hidden="true" className="mt-8 space-y-2">
      {[0, 1, 2, 3].map((r) => (
        <div key={r} className="flex gap-2">
          <div className="h-3 w-1/4 rounded bg-blue/40" />
          <div className="h-3 flex-1 rounded bg-on-dark/10" />
          <div className="h-3 w-1/6 rounded bg-on-dark/15" />
        </div>
      ))}
    </div>
  );
}
function IlloBars() {
  return (
    <div aria-hidden="true" className="mt-8 flex h-20 items-end gap-2">
      {[30, 45, 40, 60, 72, 90].map((h, i) => (
        <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t bg-gradient-to-t from-blue-strong to-blue" />
      ))}
    </div>
  );
}
function IlloPhone() {
  return (
    <div aria-hidden="true" className="mt-8 flex justify-center">
      <div className="h-28 w-16 rounded-2xl border-2 border-on-dark/25 p-1.5">
        <div className="h-2 w-6 mx-auto rounded bg-on-dark/20" />
        <div className="mt-2 h-8 rounded bg-blue/40" />
        <div className="mt-1.5 h-3 rounded bg-on-dark/10" />
        <div className="mt-1.5 h-3 rounded bg-lime/60" />
      </div>
    </div>
  );
}
function IlloNodes() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 70" className="mt-8 h-16 w-full">
      <path d="M30 35 H120 M150 35 L240 15 M150 35 L240 55" className="stroke-blue/60" strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <circle cx="30" cy="35" r="12" className="fill-blue-strong" />
      <circle cx="135" cy="35" r="14" className="fill-lime" />
      <circle cx="252" cy="15" r="10" className="fill-blue" />
      <circle cx="252" cy="55" r="10" className="fill-blue" />
    </svg>
  );
}

export function Solutions({ slug }: P) {
  const { d, t } = useDict(slug);
  type Item = (typeof d.solutions.items)[number];
  const [sys, saas, app, integ] = d.solutions.items as [Item, Item, Item, Item];
  const Card = ({ it, className, children, lime }: { it: typeof sys; className: string; children: React.ReactNode; lime?: boolean }) => (
    <article className={`${lime ? "card-dark-lime" : "card-dark"} flex flex-col justify-between rounded-[20px] p-6 md:p-8 ${className}`}>
      <div>
        <Eyebrow className="text-blue">{it.tag}</Eyebrow>
        <h3 className="mt-3 text-2xl font-semibold text-on-dark md:text-3xl">{it.t}</h3>
        <p className="mt-3 text-on-dark-soft">{it.d}</p>
      </div>
      {children}
    </article>
  );
  return (
    <section id="solucoes" className="bg-navy-deep px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-on-dark md:text-5xl">{d.solutions.title}</h2>
        <p className="mt-4 font-mono text-sm text-on-dark-mute">{d.solutions.who}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <Card it={sys} className="md:col-span-7 md:row-span-2"><IlloTable /></Card>
          <Card it={saas} className="md:col-span-5" lime><IlloBars /></Card>
          <article className="card-dark rounded-[20px] p-6 md:col-span-5 md:p-8">
            <h3 className="text-2xl font-semibold text-on-dark">{d.solutions.pickTitle}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {d.solutions.picks.map((p, i) => (
                <WaButton key={p} variant="chip" message={t("solutions.pickMsg", { item: p })} refCode={REFS.card(i + 1)}>
                  {p}
                </WaButton>
              ))}
            </div>
          </article>
          <Card it={app} className="md:col-span-5"><IlloPhone /></Card>
          <Card it={integ} className="md:col-span-7"><IlloNodes /></Card>
        </div>
        <div className="mt-12 flex justify-center">
          <WaButton message={d.wa.message} refCode={REFS.solucoes}>{d.wa.cta}</WaButton>
        </div>
      </div>
    </section>
  );
}

function FlowMock({ slug }: P) {
  const { d } = useDict(slug);
  const cards = [["A", "B"], ["C"], ["B", "D"], ["A"]];
  return (
    <div role="img" aria-label={d.proof.frameAlt} className="shadow-frame overflow-hidden rounded-t-2xl border border-on-dark/10 border-b-0">
      <div className="flex h-9 items-center gap-1.5 bg-navy-deep px-4">
        <span className="h-3 w-3 rounded-full bg-on-dark/25" />
        <span className="h-3 w-3 rounded-full bg-on-dark/25" />
        <span className="h-3 w-3 rounded-full bg-on-dark/25" />
      </div>
      <div className="flex bg-light">
        <aside className="hidden w-44 shrink-0 bg-navy p-4 text-on-dark sm:block">
          <p className="font-heading font-bold">SLZ Flow</p>
          <p className="text-[11px] text-on-dark-mute">by SLZ Digital</p>
          <ul className="mt-6 space-y-2 text-sm text-on-dark-soft">
            {d.proof.menu.map((m, i) => (
              <li key={m} className={i === 1 ? "rounded-lg bg-blue-strong px-2 py-1 text-on-dark" : "px-2 py-1"}>{m}</li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 p-4 md:p-6">
          <p className="font-heading text-lg font-semibold text-ink">{d.proof.board}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {d.proof.cols.map((c, i) => (
              <div key={c} className="rounded-xl bg-background p-3">
                <p className="text-xs font-semibold text-ink-soft">{c}</p>
                <div className="mt-2 space-y-2">
                  {(cards[i] ?? []).map((x) => (
                    <div key={x} className="rounded-lg border border-light-border p-2">
                      <p className="text-xs font-medium text-ink">{d.proof.client} {x}</p>
                      <div className="mt-1.5 h-1.5 w-3/4 rounded bg-light-border" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Proof({ slug }: P) {
  const { d } = useDict(slug);
  return (
    <>
      <section id="prova" className="grid-mesh bg-navy px-5 pt-20 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-on-dark md:text-5xl">{d.proof.title}</h2>
          <p className="mt-4 max-w-2xl text-lg text-on-dark-soft">{d.proof.sub}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold text-on-dark">{d.proof.caseTitle}</h3>
              <p className="mt-3 text-on-dark-soft">{d.proof.caseText}</p>
              {SHOW_RESULTS && <p className="mt-4 text-lime">{d.proof.results}</p>}
            </div>
            <ul className="space-y-3">
              {d.proof.checks.map((c) => (
                <li key={c} className="flex gap-3 text-on-dark"><Check />{c}</li>
              ))}
            </ul>
          </div>
          <div className="mt-14"><FlowMock slug={slug} /></div>
        </div>
      </section>
      {(SHOW_TESTIMONIAL || SHOW_TEAM) && (
        <section className="bg-background px-5 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {SHOW_TESTIMONIAL && <div className="rounded-[20px] border p-6">{d.proof.testimonial}</div>}
            {SHOW_TEAM && <div className="rounded-[20px] border p-6">{d.proof.team}</div>}
          </div>
        </section>
      )}
    </>
  );
}
