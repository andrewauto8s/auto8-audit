/**
 * Every word on the page lives here so copy edits never touch layout.
 * Icon names are mapped to components in page.tsx, which keeps this a plain
 * data module a non-developer can safely edit.
 *
 * House style: plain language for a business owner, short sentences, no
 * hype, no fake urgency, and no em dashes.
 */

/**
 * Canonical origin for metadata, Open Graph and the sitemap.
 *
 * Pinned to the custom domain rather than read from the deployment, because
 * two hostnames serve this page: audit.auto8.ai and the project's
 * .vercel.app domain. Both must name the same canonical or search engines
 * treat them as duplicate content and pick a winner themselves, and shares
 * end up advertising whichever host the visitor happened to use.
 *
 * Set NEXT_PUBLIC_SITE_URL to override.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://audit.auto8.ai";

/** The embedded audit tool. Override per environment if the host changes. */
export const AUDIT_EMBED_SRC =
  process.env.NEXT_PUBLIC_AUDIT_EMBED_SRC ??
  "https://audit.gbp.auto8.ai/light-audit/search";

/**
 * Where every call to action sends people.
 *
 * The audit lives on its own route rather than embedded in this page. A cross
 * origin iframe cannot be measured from the parent, so an inline embed has to
 * guess a height, and on a phone that turns the audit into a small scrolling
 * window inside a scrolling page. Its own screen gives the tool the whole
 * viewport and nothing has to be guessed.
 */
export const AUDIT_HREF = "/audit";

export const CTA_LABEL = "Run My Free Audit";

export const CONTACT = {
  phone: "(313) 888-8668",
  phoneHref: "tel:+13138888668",
  email: "hello@auto8.ai",
  emailHref: "mailto:hello@auto8.ai",
  site: "auto8.ai",
  siteHref: "https://auto8.ai",
};

export const META = {
  title: "Free Local Marketing & AI Rank Audit | Auto8",
  description:
    "See exactly where your business ranks on Google, Google Maps and AI platforms like ChatGPT and Gemini. Run a free local visibility audit and see your rankings, competitors, search demand and heat map in minutes.",
  ogTitle: "See Exactly Where Your Business Ranks on Google and AI Search",
  ogDescription:
    "Free Local Marketing & AI Rank Audit. Your rankings, your competitors, your market demand and your AI visibility, in minutes.",
};

export const HERO = {
  eyebrow: "Free Local Marketing & AI Rank Audit",
  heading: "See exactly where your business ranks on Google and AI search.",
  sub: "Run a free audit on your own business and see your Google and Maps rankings, a heat map of your whole service area, the competitors outranking you, and whether AI platforms know you exist.",
  secondary: "Free. No obligation. See your results in minutes.",
  points: [
    "No sales call required",
    "Built for local service businesses",
    "Results in minutes, not days",
  ],
};

export const TOOL_SECTION = {
  eyebrow: "The audit",
  heading: "Run your free local visibility audit",
  sub: "Three steps, a few minutes, and nothing to install.",
  steps: [
    {
      n: "1",
      title: "Find your business",
      body: "Search for your business by name. We pull your real Google listing.",
    },
    {
      n: "2",
      title: "Choose your keywords",
      body: "Pick the services you want to get found for in your area.",
    },
    {
      n: "3",
      title: "See how visible you are",
      body: "Rankings, heat map, competitors, demand and AI visibility.",
    },
  ],
};

export type DiscoverIcon =
  | "demand"
  | "search"
  | "mapPin"
  | "grid"
  | "competitors"
  | "ai"
  | "opportunity";

export const DISCOVER: {
  icon: DiscoverIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: "demand",
    title: "Local search demand",
    body: "See how many people search for your services every month in your market, and what that demand is worth.",
  },
  {
    icon: "search",
    title: "Google rankings",
    body: "See where your business actually appears in traditional Google search for the keywords that bring in work.",
  },
  {
    icon: "mapPin",
    title: "Google Maps rankings",
    body: "See your position inside the Google Maps local pack, which is where most people pick who to call.",
  },
  {
    icon: "grid",
    title: "Local rank heat maps",
    body: "See your rankings across your entire service area, and the neighborhoods where competitors quietly beat you.",
  },
  {
    icon: "competitors",
    title: "Competitor intelligence",
    body: "See which local businesses dominate your keywords, and compare your position against theirs side by side.",
  },
  {
    icon: "ai",
    title: "AI search visibility",
    body: "See whether ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity name your business when someone asks.",
  },
];

/** Rendered as a full width card closing the grid, not as a seventh tile. */
export const DISCOVER_FEATURE = {
  icon: "opportunity" as const,
  title: "Market opportunity",
  body: "Put a number on it. The audit estimates the value of the searches you are not showing up for, and what your competitors are putting behind them to win those customers instead.",
};

export const WHY = {
  eyebrow: "Why this matters",
  heading: "Your next customer might not start with Google.",
  lede: "They might open Google Maps. They might ask ChatGPT who the best company in town is. Your business needs to show up in all of it, and most owners have never checked.",
  channels: [
    {
      title: "Google Search",
      body: "Still the front door for research and comparison.",
    },
    {
      title: "Google Maps",
      body: "Where ready to buy customers pick who gets the call.",
    },
    {
      title: "AI assistants",
      body: "ChatGPT, Claude, Gemini and others now answer the question directly.",
    },
  ],
  close:
    "Rankings used to be one list. Now your visibility is spread across search results, the map, and the answers AI tools give. The audit measures all three in one pass.",
};

export const HEATMAP = {
  eyebrow: "Local rank heat map",
  heading: "Ranking #2 at your front door means nothing three miles away.",
  body: [
    "Most rank checkers measure one point, usually your business address, and that is the spot where you look your best. Your customers are not all standing in your parking lot.",
    "The heat map checks your position from a grid of points across your whole service area. Green is where you win. Red is where a competitor takes the call instead.",
  ],
  caption: "Example heat map. Your audit builds this from your real service area.",
  legend: [
    { label: "Rank 1 to 3", color: "#16a34a" },
    { label: "Rank 4 to 7", color: "#eab308" },
    { label: "Rank 8 to 14", color: "#f97316" },
    { label: "Rank 15+", color: "#dc2626" },
  ],
};

export const AI_SECTION = {
  eyebrow: "AI visibility",
  heading: "Does AI know who your business is?",
  lede: "People are asking AI tools the same questions they used to type into Google. If the answer never names you, you never get the call, and nothing in your Google Analytics will tell you it happened.",
  questions: [
    "Who is the best roofer near me?",
    "Who are the top painters in my area?",
    "What company should I call for pressure washing?",
    "Which contractor has the best reviews in town?",
    "Who serves my city for gutter cleaning?",
  ],
  /** Exactly what the audit checks. Keep this in step with the tool. */
  platforms: ["ChatGPT", "Claude", "Gemini", "Grok", "Meta AI", "Perplexity"],
  close:
    "The audit checks whether these platforms surface your business for your services, and shows you the gaps.",
  /* Required: these are independent products and this must never read as an
     endorsement or partnership. */
  disclaimer:
    "Platform names are referenced for identification only. Auto8 is not affiliated with, partnered with, or endorsed by OpenAI, Anthropic, Google, xAI, Meta or Perplexity.",
};

/**
 * Social proof. Intentionally empty: the section renders only when real
 * entries are added, so the page never ships invented testimonials.
 * Add objects here as results come in.
 */
export const TESTIMONIALS: {
  quote: string;
  name: string;
  business: string;
  location?: string;
}[] = [];

export const FINAL_CTA = {
  heading: "See what your customers see before your competitors do.",
  body: "The audit is free and takes a few minutes. You will know exactly where you stand on Google, on Maps, and in AI search.",
};

export const FOOTER = {
  blurb:
    "Auto8 helps local businesses get found across Google, Google Maps, local search, AI platforms and their own website.",
};
