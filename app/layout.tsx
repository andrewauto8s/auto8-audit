import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AnalyticsNoScript, AnalyticsScripts } from "@/app/components/Analytics";
import { META, SITE_URL } from "@/app/content";

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

/**
 * Document shell only. The marketing header, footer and sticky CTA live in
 * the (site) layout, so the full screen audit route can leave them out and
 * give the tool the entire viewport.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <AnalyticsNoScript />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
