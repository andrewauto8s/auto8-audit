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
| `NEXT_PUBLIC_AUDIT_EMBED_SRC` | The embedded audit tool. Only change if the tool moves. |
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

`cta_location` is one of `header`, `hero`, `heatmap`, `footer` or
`sticky-mobile`, so you can see which placement actually drives audits. Add the
location to any new CTA you create rather than reusing an existing one.

## Editing copy

All page copy lives in `app/content.ts`. Layout lives in `app/page.tsx`. In
normal use you only need the first file.

House style for Auto8 copy: plain language for a business owner, short
sentences, no hype, no fake urgency, and no em dashes.

### Social proof

`TESTIMONIALS` in `app/content.ts` is intentionally empty and the section does
not render while it is. Add real entries as results come in and the section
appears on its own. Do not seed it with placeholders.

## The audit embed

The tool is iframed from `audit.gbp.auto8.ai`. The wrapper in `app/globals.css`
draws the iframe taller than its frame and pulls it up by 115px so the tool's
own header is cropped and the page heading is not duplicated.

**Known issue on the tool's side:** that host currently returns two conflicting
framing headers:

```
content-security-policy: frame-ancestors *
x-frame-options: SAMEORIGIN
```

Modern browsers ignore `X-Frame-Options` when a CSP `frame-ancestors` directive
is present, so embedding works. Older browsers and some in-app webviews honour
`X-Frame-Options` instead and will refuse to render the frame. Dropping the
`X-Frame-Options` header on the audit host removes that risk entirely, and is
worth doing before spending on ads that land in the Facebook in-app browser.

## Structure

```
app/
  page.tsx                  section layout
  layout.tsx                metadata, header, footer, analytics
  content.ts                all copy and configuration
  globals.css               design tokens and the audit embed CSS
  opengraph-image.tsx       generated share card
  robots.ts, sitemap.ts     SEO routes
  components/
    AuditEmbed.tsx          the iframe
    CtaButton.tsx           trackable CTA, scrolls to the tool
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
