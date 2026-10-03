import AuditEmbed from "@/app/components/AuditEmbed";
import CtaButton from "@/app/components/CtaButton";
import HeatmapDemo from "@/app/components/HeatmapDemo";
import {
  IconCheck,
  IconGrid,
  IconMapPin,
  IconSearch,
  IconSparkles,
  IconTarget,
  IconTrend,
  IconUsers,
} from "@/app/icons";
import {
  AI_SECTION,
  AUDIT_ANCHOR,
  CTA_LABEL,
  DISCOVER,
  DISCOVER_FEATURE,
  FINAL_CTA,
  HEATMAP,
  HERO,
  TESTIMONIALS,
  TOOL_SECTION,
  WHY,
  type DiscoverIcon,
} from "@/app/content";

const DISCOVER_ICONS: Record<DiscoverIcon, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  demand: IconTrend,
  search: IconSearch,
  mapPin: IconMapPin,
  grid: IconGrid,
  competitors: IconUsers,
  ai: IconSparkles,
  opportunity: IconTarget,
};

const FeatureIcon = DISCOVER_ICONS[DISCOVER_FEATURE.icon];

/** Shared horizontal rhythm. Every section uses it, so edges always line up. */
function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--soft)]">
        {/* One soft wash, no animation. Enough to lift the headline off the
            surface without turning the page into a gradient. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[-30%] h-[70%]"
          style={{
            background:
              "radial-gradient(60rem 28rem at 50% 50%, rgb(0 102 255 / 0.10), transparent 70%)",
          }}
        />
        <Container className="relative py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">{HERO.eyebrow}</p>

            <h1 className="h-display mt-5 text-balance">{HERO.heading}</h1>

            <p className="lede mx-auto mt-6 max-w-2xl text-pretty">{HERO.sub}</p>

            <div className="mt-9 flex flex-col items-center gap-3">
              <CtaButton
                location="hero"
                className="btn btn-primary w-full sm:w-auto sm:px-9 sm:py-[1.05rem] sm:text-[1.0625rem]"
              >
                {CTA_LABEL}
              </CtaButton>
              <p className="text-sm text-[var(--ink-3)]">{HERO.secondary}</p>
            </div>

            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {HERO.points.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-2)]"
                >
                  <IconCheck className="h-4 w-4 shrink-0 text-[var(--blue)]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ========================= AUDIT TOOL ==========================
          Second thing on the page, by design. Everything below it exists
          only to send people back up here. */}
      <section
        id={AUDIT_ANCHOR}
        className="scroll-mt-[60px] bg-[var(--soft)] pb-16 pt-14 sm:pb-20 sm:pt-16"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">{TOOL_SECTION.eyebrow}</p>
            <h2 className="h-section mt-4 text-balance">{TOOL_SECTION.heading}</h2>
            <p className="lede mt-4">{TOOL_SECTION.sub}</p>
          </div>

          <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {TOOL_SECTION.steps.map((s) => (
              <li key={s.n} className="card p-5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-[0.8125rem] font-bold text-white">
                  {s.n}
                </span>
                <p className="h-card mt-3">{s.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-2)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <AuditEmbed />
          </div>
        </Container>
      </section>

      {/* ====================== WHAT YOU DISCOVER ====================== */}
      <section className="border-t border-[var(--line)] py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">What you will discover</p>
            <h2 className="h-section mt-4 text-balance">
              Everything the audit shows you, in one pass.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISCOVER.map((d) => {
              const Icon = DISCOVER_ICONS[d.icon];
              return (
                <article key={d.title} className="card card-hover rise h-full p-6">
                  <span className="tile">
                    <Icon />
                  </span>
                  <h3 className="h-card mt-4">{d.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                    {d.body}
                  </p>
                </article>
              );
            })}

            {/* The seventh item would orphan itself in a three column grid and
                leave a block of dead space. It is also the payoff item, so it
                spans the row and carries a CTA instead. */}
            <article className="card card-hover rise p-6 sm:col-span-2 lg:col-span-3 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                <span className="tile shrink-0">
                  <FeatureIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="h-card">{DISCOVER_FEATURE.title}</h3>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                    {DISCOVER_FEATURE.body}
                  </p>
                </div>
                <CtaButton
                  location="discover"
                  className="btn btn-primary btn-sm shrink-0 self-start sm:self-auto"
                >
                  {CTA_LABEL}
                </CtaButton>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* ========================= WHY IT MATTERS ====================== */}
      <section className="border-t border-[var(--line)] bg-[var(--soft)] py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">{WHY.eyebrow}</p>
              <h2 className="h-section mt-4 text-balance">{WHY.heading}</h2>
              <p className="lede mt-5">{WHY.lede}</p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                {WHY.close}
              </p>
            </div>

            <ul className="grid content-start gap-3">
              {WHY.channels.map((c) => (
                <li key={c.title} className="card flex items-start gap-4 p-5">
                  <span className="mt-0.5 h-8 w-[3px] shrink-0 rounded-full bg-[var(--blue)]" />
                  <div>
                    <p className="h-card">{c.title}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                      {c.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ============================ HEAT MAP ========================= */}
      <section className="border-t border-[var(--line)] py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">{HEATMAP.eyebrow}</p>
              <h2 className="h-section mt-4 text-balance">{HEATMAP.heading}</h2>
              {HEATMAP.body.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--ink-2)]"
                >
                  {p}
                </p>
              ))}
              <div className="mt-8">
                <CtaButton location="heatmap">{CTA_LABEL}</CtaButton>
              </div>
            </div>

            <div className="rise">
              <HeatmapDemo />
            </div>
          </div>
        </Container>
      </section>

      {/* ========================== AI VISIBILITY ====================== */}
      <section className="on-dark bg-[var(--dark)] py-16 text-white sm:py-24">
        <div className="rule-spectrum -mt-16 mb-16 sm:-mt-24 sm:mb-24" />
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">{AI_SECTION.eyebrow}</p>
            <h2 className="h-section mt-4 text-balance">{AI_SECTION.heading}</h2>
            <p className="lede mt-5 text-white/80">{AI_SECTION.lede}</p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
                What people are asking
              </p>
              <ul className="mt-5 space-y-3">
                {AI_SECTION.questions.map((q) => (
                  <li
                    key={q}
                    className="card px-5 py-3.5 text-[0.9375rem] text-white/85"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
                Platforms the audit checks
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AI_SECTION.platforms.map((p) => (
                  <li
                    key={p}
                    className="card grid place-items-center px-3 py-5 text-center text-[0.9375rem] font-semibold text-white/90"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/80">
                {AI_SECTION.close}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/40">
                {AI_SECTION.disclaimer}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================= SOCIAL PROOF ========================
          Renders only once real testimonials are added to content.ts.
          Shipping invented proof is not an option, so the section simply
          does not exist until there is something true to put in it. */}
      {TESTIMONIALS.length > 0 ? (
        <section className="border-t border-[var(--line)] py-16 sm:py-24">
          <Container>
            <h2 className="h-section max-w-2xl text-balance">
              What business owners say after the audit
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure key={t.quote.slice(0, 32)} className="card h-full p-6">
                  <blockquote className="text-[0.9375rem] leading-relaxed text-[var(--ink-2)]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold">
                    {t.name}
                    <span className="block font-normal text-[var(--ink-3)]">
                      {t.business}
                      {t.location ? `, ${t.location}` : ""}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* =========================== FINAL CTA ========================= */}
      <section className="border-t border-[var(--line)] bg-[var(--soft)] py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-section text-balance">{FINAL_CTA.heading}</h2>
            <p className="lede mt-5">{FINAL_CTA.body}</p>
            <div className="mt-9 flex flex-col items-center gap-3">
              <CtaButton
                location="footer"
                className="btn btn-primary w-full sm:w-auto sm:px-9 sm:py-[1.05rem] sm:text-[1.0625rem]"
              >
                {CTA_LABEL}
              </CtaButton>
              <p className="text-sm text-[var(--ink-3)]">{HERO.secondary}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
