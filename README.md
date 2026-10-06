# auto8-audit

Paid-traffic landing page for the **Free Local Marketing & AI Rank Audit**.

One page, one goal: get a local business owner to run the embedded audit. Traffic
comes from Facebook and Instagram ads, so the page is mobile first, has no
navigation to leak clicks, and puts the audit tool directly under the hero.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 and
TypeScript.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local` and fill in what applies. Everything is
optional except the site URL, which only affects canonical and share metadata.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL. Drives canonical, Open Graph and the sitemap. |
| `NEXT_PUBLIC_AUDIT_EMBED_SRC` | The audit tool shown at `/audit`. Only change if the tool moves. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container, `GTM-XXXXXXX`. |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement id, `G-XXXXXXXXXX`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta pixel id. |

Each tag renders only when its variable is set, so a preview deploy stays clean.
If you have GTM, use it on its own and manage GA4 and the Meta pixel inside it.
Loading a tag twice double counts conversions.

## Conversion tracking

Every call to action is the same `CtaButton` component. On click it reports:

- `dataLayer` event `audit_cta_click` with a `cta_location` property
- the same event through `gtag` for installs without GTM
- a Meta `trackCustom` event named `AuditCtaClick`

`cta_location` is one of `header`, `hero`, `steps`, `discover`, `heatmap`,
`footer` or `sticky-mobile`, so you can see which placement actually drives
audits. Add the location to any new CTA you create rather than reusing an
existing one.

`/audit` additionally fires `audit_page_view` on load, which is the conversion
step to optimise campaigns against.

## Editing copy

All page copy lives in `app/content.ts`. Layout lives in `app/page.tsx`. In
normal use you only need the first file.

House style for Auto8 copy: plain language for a business owner, short
sentences, no hype, no fake urgency, and no em dashes.

### Social proof

`TESTIMONIALS` in `app/content.ts` is intentionally empty and the section does
not render while it is. Add real entries as results come in and the section
appears on its own. Do not seed it with placeholders.

## The audit route

The audit lives at `/audit`, on its own screen, and every CTA navigates there.
It is not embedded in the landing page.

That is deliberate. A cross origin iframe cannot be measured from the parent,
so an inline embed has to guess a height. Too short and the tool becomes a
small scrolling window inside a scrolling page, which is poor on a phone and
most of this traffic is phones. Cropping the tool's own header to avoid a
duplicate heading made it worse: the crop has to be a constant, but the tool's
header shrinks as the viewport widens, so a value that hides the header on a
phone clips the first step on a desktop.

On `/audit` there is nothing to guess. A thin bar, then the tool fills the rest
of the viewport exactly and its own responsive layout does the work.

The route is `noindex`, since a near contentless page should not compete with
the landing page in search, and it fires an `audit_page_view` event. Being a
real page load on our own domain, that is the one point after the ad click we
can measure: what happens inside the tool is cross origin and invisible to us.

**Known issue on the tool's side:** that host returns two conflicting framing
headers:

```
content-security-policy: frame-ancestors *
x-frame-options: SAMEORIGIN
```

Browsers ignore `X-Frame-Options` when a CSP `frame-ancestors` directive is
present, which was verified against Chromium with a Facebook in-app browser
user agent, so embedding works. Dropping the `X-Frame-Options` header on the
audit host would remove the ambiguity.

## Structure

```
app/
  layout.tsx                document shell, metadata, analytics
  globals.css               design tokens and layout CSS
  content.ts                all copy and configuration
  opengraph-image.tsx       generated share card
  robots.ts, sitemap.ts     SEO routes
  (site)/
    layout.tsx              header, footer, sticky CTA
    page.tsx                the landing page
  audit/
    page.tsx                the tool, full screen
  components/
    AuditEmbedFull.tsx      the iframe, filling its container
    AuditPageView.tsx       conversion event for /audit
    CtaButton.tsx           trackable CTA, navigates to /audit
    StickyCta.tsx           phone-only sticky bar
    HeatmapDemo.tsx         example heat map illustration
    Analytics.tsx           GTM, GA4 and Meta pixel, each optional
    track.ts                conversion event helper
```

## Design notes

The audit tool owns the visual centre of the page, so everything around it stays
quiet: near-white surfaces, one blue accent matched to the tool's own UI, and the
Auto8 spectrum used only as a hairline. Motion is one CSS scroll-driven fade,
with content visible by default so a browser without support, or a failed
script, never leaves a section blank.
