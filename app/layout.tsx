import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { AnalyticsNoScript, AnalyticsScripts } from "@/app/components/Analytics";
import CtaButton from "@/app/components/CtaButton";
import StickyCta from "@/app/components/StickyCta";
import { CONTACT, CTA_LABEL, FOOTER, META, SITE_URL } from "@/app/content";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: META.title,
  description: META.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: META.ogTitle,
    description: META.ogDescription,
    url: SITE_URL,
    siteName: "Auto8",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: META.ogTitle,
    description: META.ogDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  // Paid traffic lands on phones. Let people zoom; capping it is an
  // accessibility failure and buys nothing.
  width: "device-width",
  initialScale: 1,
};

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] w-full max-w-6xl items-center justify-between px-5 sm:px-6">
        {/* No navigation by design. Every exit from this page is a lost audit. */}
        <Image
          src="/auto8-wordmark.webp"
          alt="Auto8"
          width={2000}
          height={569}
          priority
          className="h-[22px] w-auto sm:h-[26px]"
        />
        <CtaButton location="header" className="btn btn-primary btn-sm">
          {CTA_LABEL}
        </CtaButton>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="on-dark bg-[var(--dark)] text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Image
              src="/auto8-logo-dark.png"
              alt="Auto8"
              width={360}
              height={98}
              className="h-[26px] w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {FOOTER.blurb}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white/90">Talk to a human</p>
            <ul className="mt-3 space-y-2 text-white/60">
              <li>
                <a className="hover:text-white" href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={CONTACT.emailHref}>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white"
                  href={CONTACT.siteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CONTACT.site}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Auto8. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="has-sticky-cta">
        <AnalyticsNoScript />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCta />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
